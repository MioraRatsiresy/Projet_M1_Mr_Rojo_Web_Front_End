import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUnavailabilityModalComponent } from './add-unavailability-modal.component';

describe('AddUnavailabilityModalComponent', () => {
  let component: AddUnavailabilityModalComponent;
  let fixture: ComponentFixture<AddUnavailabilityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUnavailabilityModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUnavailabilityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
