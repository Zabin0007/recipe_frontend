import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.css'
})
export class RequestListComponent implements OnInit{

  request:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.getTestimonies()
  }
  getTestimonies(){
    this.api.getTestimonies().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.request=res 
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  updateTestimony(id:any,status:string){
    this.api.updateTestimoney(id,status).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getTestimonies()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

}



