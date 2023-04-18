import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThankYouPopUpComponent } from './thank-you-pop-up.component';

describe('ThankYouPopUpComponent', () => {
  let component: ThankYouPopUpComponent;
  let fixture: ComponentFixture<ThankYouPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThankYouPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThankYouPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
