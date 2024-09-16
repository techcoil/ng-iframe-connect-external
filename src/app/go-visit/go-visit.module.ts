import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoVisitRoutingModule } from './go-visit-routing.module';
import { GoVisitComponent } from './go-visit.component';
import { FrameAppModule } from 'src/frame-app/frame-app.module';

@NgModule({
  declarations: [GoVisitComponent],
  imports: [CommonModule, GoVisitRoutingModule, FrameAppModule],
})
export class GoVisitModule {}
