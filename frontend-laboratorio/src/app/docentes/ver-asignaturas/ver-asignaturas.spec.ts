import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAsignaturas } from './ver-asignaturas';

describe('VerAsignaturas', () => {
  let component: VerAsignaturas;
  let fixture: ComponentFixture<VerAsignaturas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAsignaturas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerAsignaturas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
