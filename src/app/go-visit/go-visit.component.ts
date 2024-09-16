import { Component } from '@angular/core';
import { environment } from '@environment';

console.log({ environment });

@Component({
  selector: 'app-go-visit',
  template:
    '<frame-app appPrefix="/govisit" [frameUrl]="frameUrl"></frame-app>',
})
export class GoVisitComponent {
  get frameUrl(): string {
    return environment.frameUrl;
  }
}
