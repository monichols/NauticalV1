import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VirtualcardPage } from './virtualcard';

@NgModule({
  declarations: [
    VirtualcardPage,
  ],
  imports: [
    IonicPageModule.forChild(VirtualcardPage),
  ],
})
export class VirtualcardPageModule {}
