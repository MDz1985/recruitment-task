import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageComponent } from './form-page.component';
import { FormBuilder } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { HeaderComponent } from '../../../core/components/header/header.component';

describe('FormComponent', () => {
  let component: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule],
      declarations: [FormPageComponent],
      providers: [FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(FormPageComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.form-card__title')?.textContent).toContain('Form');
  });
});
