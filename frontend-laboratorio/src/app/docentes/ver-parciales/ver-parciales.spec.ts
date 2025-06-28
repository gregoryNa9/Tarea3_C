import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerParciales } from './ver-parciales';

describe('VerParciales', () => {
  let component: VerParciales;
  let fixture: ComponentFixture<VerParciales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerParciales]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerParciales);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
