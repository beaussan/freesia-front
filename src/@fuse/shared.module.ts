import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        TranslateModule,

        FuseDirectivesModule,
        FusePipesModule,
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        TranslateModule,

        FuseDirectivesModule,
        FusePipesModule,
    ],
})
export class FuseSharedModule
{
}
