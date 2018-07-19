import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  providers:[{
    provide:'Storage',
    useValue: window.localStorage
  }],
  declarations: []
})
export class SecurityModule { }
