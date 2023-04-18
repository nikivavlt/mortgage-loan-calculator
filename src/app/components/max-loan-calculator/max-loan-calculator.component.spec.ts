import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxLoanCalculatorComponent } from './max-loan-calculator.component';

describe('MaxLoanCalculatorComponent', () => {
  let component: MaxLoanCalculatorComponent;
  let fixture: ComponentFixture<MaxLoanCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaxLoanCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaxLoanCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
