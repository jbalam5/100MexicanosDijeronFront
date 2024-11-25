import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlGameComponent } from './control-game.component';

describe('ControlGameComponent', () => {
  let component: ControlGameComponent;
  let fixture: ComponentFixture<ControlGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
