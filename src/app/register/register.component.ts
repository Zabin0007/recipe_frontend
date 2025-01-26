import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm:FormGroup

  constructor(private fb:FormBuilder,private api:ApiService){
    this.registerForm = this.fb.group({
      name:['',[Validators.required,Validators.pattern('[a-z,A-Z ]*')]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.pattern('[a-z,A-Z ]*')]]
    })
  }

  addRegister(){
    if(this.registerForm.valid){
      let name = this.registerForm.value.name
      let email = this.registerForm.value.email
      let password = this.registerForm.value.password
      this.api.registerAPI({name,email,password}).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert('Register succesfull')  
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }else{
      alert('invalid')
    }
  }

}
