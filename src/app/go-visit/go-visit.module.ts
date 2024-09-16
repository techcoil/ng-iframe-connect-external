import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoVisitRoutingModule } from './go-visit-routing.module';
import { GoVisitComponent } from './go-visit.component';

@NgModule({
  declarations: [GoVisitComponent],
  imports: [CommonModule, GoVisitRoutingModule],
})
export class GoVisitModule {}
