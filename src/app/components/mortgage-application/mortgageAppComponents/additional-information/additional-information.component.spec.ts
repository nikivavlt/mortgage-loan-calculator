import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInformationComponent } from './additional-information.component';

describe('AdditionalInformationComponent', () => {
  let component: AdditionalInformationComponent;
  let fixture: ComponentFixture<AdditionalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditionalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
