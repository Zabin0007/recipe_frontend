import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  loginForm:FormGroup 

  constructor(private fb:FormBuilder,private api:ApiService,private route:Router){
  this.loginForm=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-z,A-Z ]*')]]
  })
  }

  login(){
      if(this.loginForm.valid){
        let email = this.loginForm.value.email
        let password = this.loginForm.value.password
        this.api.loginAPI({email,password}).subscribe({
          next:(res:any)=>{
            console.log(res);
            alert("Login Successfull")
            sessionStorage.setItem('user',JSON.stringify(res.ExisitngUser))
            sessionStorage.setItem('token',res.token)
            this.route.navigateByUrl('/')
          },
          error:(err:any)=>{
            console.log(err);
            
          }
        })
      }
      else{

      }
  }

}
