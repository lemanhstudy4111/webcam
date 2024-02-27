import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyVideoComponent } from './my-video.component';

describe('MyVideoComponent', () => {
  let component: MyVideoComponent;
  let fixture: ComponentFixture<MyVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyVideoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
