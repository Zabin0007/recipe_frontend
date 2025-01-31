import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit{
  constructor(private api:ApiService){}
  recipeList:any=[]
  p: number = 1;
  
  searchKey:string=""
  
    ngOnInit(): void {
      this.allRecipes()
    }
    
     
    allRecipes(){
      this.api.getAllRecipes().subscribe({
        next:(res:any)=>{
          console.log(res);
          this.recipeList=res;
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
    }

    handleDelete(id:any){
      this.api.deleteRecipeAPI(id).subscribe({
        next:(res:any)=>{
          console.log(res);
          alert("Deleted Successfully")
          this.allRecipes()
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
    }
}
