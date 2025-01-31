import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-manage-recipe',
  templateUrl: './manage-recipe.component.html',
  styleUrl: './manage-recipe.component.css'
})
export class ManageRecipeComponent implements OnInit{
 //to hold all recipe
 recipeList:any=[]
    
 //to hold all cuisine type details
 cuisineList:any=[]

 //to hold all mealtype details
 nestedMealList:any=[]

 //to hold single array details
 singleMealtist:any=[]

 //without duplication meallist
 meallist:any=[]

 //duplicate value to hold data
 dummyRecipe:any=[]

 constructor(private api:ApiService){}
 ngOnInit(): void {
   this.getAllRecipe()
 }

 getAllRecipe(){
   this.api.getAllRecipes().subscribe({
     next:(res:any)=>{
     console.log(res);
     this.recipeList=res
     this.dummyRecipe=res
       //cuisine filter
     this.recipeList.forEach((item:any) => {
       !this.cuisineList.includes(item.cuisine) &&
       this.cuisineList.push(item.cuisine)
     });
     console.log(this.cuisineList);
       //mealtype filter
      this.nestedMealList = this.recipeList.map((item:any)=>
         item.mealType
       )//[[],[],[]]
       console.log(this.nestedMealList);
       this.singleMealtist=this.nestedMealList.flat()
       console.log(this.singleMealtist);
       //without duplication
     this.singleMealtist.forEach((item:any) => {
         !this.meallist.includes(item) &&
         this.meallist.push(item)
       });
       console.log(this.meallist);
       
   },
   error:(err:any)=>{
     console.log(err);
   }
 })
 }

}
