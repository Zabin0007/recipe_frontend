import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, FooterComponent, HeaderComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  testimonyForm:FormGroup  //group creation

  constructor(private fb:FormBuilder,private api:ApiService){
    this.testimonyForm=this.fb.group({
      name:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],//array creation
      email:['',[Validators.required,Validators.email]],
      message:['',[Validators.required,Validators.pattern("[a-zA-Z ]*")]]
    })
  }

  //control passes through html

  addTestimony(){
    if(this.testimonyForm.valid){
      let name = this.testimonyForm.value.name
      let email = this.testimonyForm.value.email
      let message = this.testimonyForm.value.message
      this.api.addTestimony({name,email,message}).subscribe({
       next:(res:any)=>{
        console.log(res);
        alert("Thank you for valuable feedback")
       },
       error:(err:any)=>{
        console.log(err);  
       }
      })
    }
    else{
      alert('invalid form')
    }
  }

}
