import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  recipeList:any=[]

  limitRecipes:any=[]

  constructor(private api:ApiService){}
  ngOnInit(): void {
    this.getRecipes()
  }


  getRecipes(){
    this.api.getAllRecipes().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.recipeList=res
        this.limitRecipes=this.recipeList.slice(0,6)
        console.log(this.limitRecipes);
        
      },
      error:(err:any)=>{
        console.log(err); 
      }
    })
  }

}
