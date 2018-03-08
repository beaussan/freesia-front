import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpLink } from './HttpLink';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ HttpLink ]
})
export class AppoloCustumLinkModule { }
