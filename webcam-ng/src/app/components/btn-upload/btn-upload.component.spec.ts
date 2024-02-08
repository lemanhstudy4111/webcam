import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnUploadComponent } from './btn-upload.component';

describe('BtnUploadComponent', () => {
  let component: BtnUploadComponent;
  let fixture: ComponentFixture<BtnUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
