import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'frame-app',
  template: `<iframe
    #iframe
    width="100%"
    [height]="height"
    style="border: 0"
    allowfullscreen=""
  ></iframe>`,
  styles: [
    `
      iframe {
        overflow: hidden;
        outline: 2px solid red; /* Here for demoing only */
      }
    `,
  ],
})
export class FrameAppComponent implements AfterViewInit {
  @ViewChild('iframe') iframe!: ElementRef<HTMLIFrameElement>;

  height = '0';
  private subscription?: Subscription;
  private ready = false;

  constructor(private readonly router: Router) {}

  @Input()
  appPrefix: string = '';

  @Input()
  frameUrl: string = '';

  get frameOrigin() {
    return new URL(this.frameUrl).origin;
  }

  ngAfterViewInit(): void {
    this.iframe.nativeElement.src = this.frameUrl + this.normalizedUrl;
    this.subscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.notifyRoute();
      }
    });
    window.addEventListener('message', (event) => {
      if (event.data.type === 'resize') {
        this.height = event.data.height + 50;
      }
      if (event.data.type === 'route-changed') {
        const navigateTo = `${this.appPrefix}/${event.data.route}`;
        if (this.router.url !== navigateTo) {
          this.router.navigate([navigateTo]);
        }
      }
    });
    this.resize();
    this.iframe.nativeElement.addEventListener(
      'load',
      () => {
        this.ready = true;
        this.notifyRoute();
      },
      { once: true }
    );

    window.addEventListener('resize', () => this.resize());
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  get normalizedUrl() {
    return this.router.url.replace(new RegExp(`^\/?${this.appPrefix}`), '');
  }

  notifyRoute() {
    this.send({
      type: 'route-changed',
      route: this.normalizedUrl,
    });
  }

  resize() {
    this.send({ type: 'resize-request' });
  }

  send(data: any) {
    if (!this.ready) {
      return;
    }
    this.iframe?.nativeElement.contentWindow?.postMessage(
      data,
      this.frameOrigin
    );
  }
}
