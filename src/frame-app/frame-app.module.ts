import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrameAppComponent } from './frame-app.component';

@NgModule({
  declarations: [FrameAppComponent],
  exports: [FrameAppComponent],
  imports: [CommonModule],
})
export class FrameAppModule {}
