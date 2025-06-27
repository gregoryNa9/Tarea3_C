import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDocente } from './panel-docente';

describe('PanelDocente', () => {
  let component: PanelDocente;
  let fixture: ComponentFixture<PanelDocente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDocente]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDocente);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
