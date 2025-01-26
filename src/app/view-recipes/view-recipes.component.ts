import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent implements OnInit{
  
  recipeId:any=[]//hold data of id
                          //like useParams
  constructor(private ar:ActivatedRoute,private api:ApiService){}

  ngOnInit(): void {
    this.ar.params.subscribe((res:any)=>{
      console.log(res);  
      this.recipeId=res.id
      console.log(this.recipeId);
      this.viewRecipe()
    })
  }

  viewRecipe(){
    this.api.getSingleRecipe(this.recipeId).subscribe({
      next:(res:any)=>{
        console.log(res);  
      },
      error:(err:any)=>{
        console.log(err);  
      }
    })
  }

}
