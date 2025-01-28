  import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { DatePipe } from '@angular/common';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [DatePipe,SearchPipe,FormsModule,NgxPaginationModule],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {

  p: number=1

  searchKey:string='' //to implement seach value from input box

  today = new Date()

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

  constructor(private api:ApiService,private route:Router){}
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
//filter recipes either mealtype or cuisine
  filterRecipe(key:string,value:string){
    this.recipeList=this.dummyRecipe.filter((item:any)=>
    item[key].includes(value)
    )
    console.log(this.recipeList);
  }

  viewRecipe(id:any){   
      if(sessionStorage.getItem('token')){
        this.route.navigateByUrl(`view-recipe/${id}`)
      }else{
        alert("please login")
      }
  }

}
