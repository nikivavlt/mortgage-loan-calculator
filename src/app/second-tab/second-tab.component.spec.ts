import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondTabComponent } from './second-tab.component';

describe('SecondTabComponent', () => {
  let component: SecondTabComponent;
  let fixture: ComponentFixture<SecondTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecondTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecondTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
