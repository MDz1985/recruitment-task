import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageComponent } from './form-page.component';
import { FormBuilder } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatCardHarness } from '@angular/material/card/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { FormModule } from '../../form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputHarness } from '@angular/material/input/testing';


let loader: HarnessLoader;

describe('FormComponent', () => {
  let component: FormPageComponent;
  let fixture: ComponentFixture<FormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatMenuModule, FormModule, BrowserAnimationsModule],
      declarations: [FormPageComponent],
      providers: [FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FormPageComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load matCard', async () => {
    const card = await loader.getHarness(MatCardHarness);
    expect(!!card).toBe(true);
  });

  it('should load 3 form fields', async () => {
    const fields = await loader.getAllHarnesses(MatFormFieldHarness);
    expect(fields.length).toBe(3);
  });

  it('should load first field', async () => {
    const usernameField = await loader.getHarness(MatFormFieldHarness.with({selector: '.form-field'}));
    expect(!!usernameField).toBe(true);
  });

  describe('#changePasswordVisibility', () => {
    it('should change password input type', async () => {
      const inputs = await loader.getAllHarnesses(MatInputHarness);
      const passwordInput = await inputs[2];
      const visibilityBefore = await passwordInput.getType();
      await component.changePasswordVisibility();
      const visibilityAfter = await passwordInput.getType();
      expect(visibilityBefore === visibilityAfter).toBe(false);
    });

  });

  it('should have right form-control', () => {
    const controls = component.formGroup!.controls;
    const controlsKeysArray = Object.keys(controls);
    expect(!!controls['name'] && !!controls['surname'] &&
      !!controls['password'] && controlsKeysArray.length === 3).toBe(true);
  });

});
