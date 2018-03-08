import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  ApolloLink,
  Observable as LinkObservable,
  Operation,
  RequestHandler,
} from 'apollo-link';
import {print} from 'graphql/language/printer';
import {ExecutionResult} from 'graphql';
import {
  fetch,
  Options,
  Body,
  Request,
  Context,
  mergeHeaders,
  prioritize,
} from 'apollo-angular-link-http-common';

// XXX find a better name for it
// https://blog.beeaweso.me/refreshing-token-based-authentication-with-apollo-client-2-0-7d45c20dc703
// https://github.com/apollographql/apollo-angular/blob/master/packages/apollo-angular-link-http/src/HttpLink.ts
// OR
// https://www.intertech.com/Blog/angular-4-tutorial-handling-refresh-token-with-new-httpinterceptor/
// Don't know yet, maybe the second one is better... I'm gonna have to take a closer look.

export class HttpLinkHandler extends ApolloLink {
  public requester: RequestHandler;

  constructor(private httpClient: HttpClient, private options: Options) {
    super();

    this.requester = (operation: Operation) =>
      new LinkObservable((observer: any) => {
        const context: Context = operation.getContext();

        // decides which value to pick, Context, Options or to just use the default
        const pick = <K extends keyof Context | keyof Options>(
          key: K,
          init?: Context[K] | Options[K],
        ): Context[K] | Options[K] => {
          return prioritize(context[key], this.options[key], init);
        };

        const includeQuery = pick('includeQuery', true);
        const includeExtensions = pick('includeExtensions', false);
        const method = pick('method', 'POST');
        const url = pick('uri', 'graphql');
        const withCredentials = pick('withCredentials');

        const req: Request = {
          method,
          url,
          body: {
            operationName: operation.operationName,
            variables: operation.variables,
          },
          options: {
            withCredentials,
            headers: this.options.headers,
          },
        };

        if (includeExtensions) {
          (req.body as Body).extensions = operation.extensions;
        }

        if (includeQuery) {
          (req.body as Body).query = print(operation.query);
        }

        if (context.headers) {
          req.options.headers = mergeHeaders(
            req.options.headers,
            context.headers,
          );
        }

        const sub = fetch(req, this.httpClient).subscribe({
          next: result => observer.next(result.body),
          error: err => observer.error(err),
          complete: () => observer.complete(),
        });

        return () => {
          if (!sub.closed) {
            sub.unsubscribe();
          }
        };
      });
  }

  public request(op: Operation): LinkObservable<ExecutionResult> | null {
    return this.requester(op);
  }
}

@Injectable()
export class HttpLink {
  constructor(private httpClient: HttpClient) {}

  public create(options: Options): HttpLinkHandler {
    return new HttpLinkHandler(this.httpClient, options);
  }
}
