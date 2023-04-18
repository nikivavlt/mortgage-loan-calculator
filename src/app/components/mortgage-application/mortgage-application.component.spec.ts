import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MortgageApplicationComponent } from './mortgage-application.component';

describe('MortgageApplicationComponent', () => {
  let component: MortgageApplicationComponent;
  let fixture: ComponentFixture<MortgageApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MortgageApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MortgageApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
