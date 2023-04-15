import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageSubmitComponent } from './mortgage-submit.component';

describe('MortgageSubmitComponent', () => {
  let component: MortgageSubmitComponent;
  let fixture: ComponentFixture<MortgageSubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageSubmitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgageSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
