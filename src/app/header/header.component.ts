import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  
  isLoggedIn:boolean=false
  loggedUser:any={} //to hold sessionstorage key
  loggedusername:string=''//to hold sessionstorge value
  ngOnInit(): void {
    if(sessionStorage.getItem('token')){
      this.isLoggedIn=true
      this.loggedUser = JSON.parse(sessionStorage.getItem('user')||'')
      this.loggedusername=this.loggedUser.name
    }
  }


}
