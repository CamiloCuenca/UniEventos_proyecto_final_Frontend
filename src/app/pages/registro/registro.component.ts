import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators,AbstractControlOptions } from '@angular/forms';


@Component({
 selector: 'app-registro',
 standalone: true,
 imports: [ReactiveFormsModule],
 templateUrl: './registro.component.html',
 styleUrl: './registro.component.css'
})
export class RegistroComponent{


 registroForm!: FormGroup;

 private crearFormulario() {
  this.registroForm = this.formBuilder.group(
    {
      cedula: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]],
      confirmaPassword : ['', [Validators.required, Validators.maxLength(10), Validators.minLength(7)]]
     },
    { validators: this.passwordsMatchValidator } as AbstractControlOptions
  );
 }

 passwordsMatchValidator(formGroup: FormGroup) {
  const password = formGroup.get('password')?.value;
  const confirmaPassword = formGroup.get('confirmaPassword')?.value;
 
 
  // Si las contraseñas no coinciden, devuelve un error, de lo contrario, null
  return password == confirmaPassword ? null : { passwordsMismatch: true };
 }
 

 public registrar() {
  console.log(this.registroForm.value);
}

 constructor(private formBuilder: FormBuilder) {
  this.crearFormulario();
  this.registrar();
  }


}
