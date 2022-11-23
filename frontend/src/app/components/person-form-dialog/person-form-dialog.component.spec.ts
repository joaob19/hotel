import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFormDialogComponent } from './person-form-dialog.component';

describe('PersonFormComponent', () => {
  let component: PersonFormDialogComponent;
  let fixture: ComponentFixture<PersonFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonFormDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
