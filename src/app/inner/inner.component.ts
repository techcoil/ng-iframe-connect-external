import { Component } from '@angular/core';
import { environment } from '@environment';

console.log({ environment });

@Component({
  selector: 'app-inner',
  template: '<frame-app appPrefix="/inner" [frameUrl]="frameUrl"></frame-app>',
})
export class InnerComponent {
  get frameUrl(): string {
    return environment.frameUrl;
  }
}
