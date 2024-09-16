import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoVisitComponent } from './go-visit.component';

describe('GoVisitComponent', () => {
  let component: GoVisitComponent;
  let fixture: ComponentFixture<GoVisitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoVisitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
