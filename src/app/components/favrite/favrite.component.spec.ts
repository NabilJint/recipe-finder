import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavriteComponent } from './favrite.component';

describe('FavriteComponent', () => {
  let component: FavriteComponent;
  let fixture: ComponentFixture<FavriteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavriteComponent]
    });
    fixture = TestBed.createComponent(FavriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
