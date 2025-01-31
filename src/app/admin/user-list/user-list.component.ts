import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit{

  user:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.getUser()
  }
  getUser(){
    this.api.getUsers().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.user=res 
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }
}
