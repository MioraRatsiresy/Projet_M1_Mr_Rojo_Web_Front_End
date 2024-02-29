import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelRdvModalComponent } from './cancel-rdv-modal.component';

describe('CancelRdvModalComponent', () => {
  let component: CancelRdvModalComponent;
  let fixture: ComponentFixture<CancelRdvModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CancelRdvModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelRdvModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
