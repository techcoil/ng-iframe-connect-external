import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-go-visit',
  templateUrl: './go-visit.component.html',
  styleUrls: ['./go-visit.component.css'],
})
export class GoVisitComponent implements AfterViewInit {
  @ViewChild('iframe') iframe!: ElementRef<HTMLIFrameElement>;
  private readonly appPrefix = '/govisit';

  height = '100%';
  private subscription?: Subscription;

  constructor(
    private readonly router: Router,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngAfterViewInit(): void {
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
        this.router.navigate([`${this.appPrefix}/${event.data.route}`]);
      }
    });
    window.addEventListener('resize', () => this.resize());
    this.resize();
    this.iframe.nativeElement.addEventListener(
      'load',
      () => {
        this.notifyRoute();
      },
      { once: true }
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  notifyRoute() {
    this.iframe?.nativeElement.contentWindow?.postMessage(
      {
        type: 'route-changed',
        route: this.router.url.replace(new RegExp(`^\/?${this.appPrefix}`), ''),
      },
      '*'
    );
  }

  resize() {
    this.iframe?.nativeElement.contentWindow?.postMessage(
      'resize-request',
      '*'
    );
  }
}
