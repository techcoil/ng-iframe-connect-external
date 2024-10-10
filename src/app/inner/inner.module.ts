import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InnerRoutingModule } from './inner-routing.module';
import { InnerComponent } from './inner.component';
import { FrameAppModule } from 'src/frame-app/frame-app.module';

@NgModule({
  declarations: [InnerComponent],
  imports: [CommonModule, InnerRoutingModule, FrameAppModule],
})
export class InnerModule {}
