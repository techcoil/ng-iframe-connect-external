import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InnerComponent } from './inner.component';

const routes: Routes = [
  {
    path: '**',
    component: InnerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InnerRoutingModule {}
