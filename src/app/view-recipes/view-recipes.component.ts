import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-view-recipes',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './view-recipes.component.html',
  styleUrl: './view-recipes.component.css'
})
export class ViewRecipesComponent implements OnInit{
  
  relatedecipe:any=[]//to avoid repeated data
  recipeId:any=[]//hold data of id
  recipe:any={}                      //like useParams
  constructor(private route:Router,private ar:ActivatedRoute,private api:ApiService){}

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
        this.recipe=res
        this.viewRelatedRecipe(res.cuisine)
      },
      error:(err:any)=>{
        console.log(err);  
      }
    })
  }

  viewRelatedRecipe(cuisine:any){
    this.api.getRelatedRecipe(cuisine).subscribe({
      next:(res:any)=>{
        console.log(res);  
        this.relatedecipe=res.filter((item:any)=>item.name!=this.recipe.name)
        console.log(this.relatedecipe);
      },
      error:(err:any)=>{
        console.log(err);  
      }
    })
  }

  toDownload(){
    this.api.addToDownload(this.recipeId,this.recipe).subscribe({
      next:(res:any)=>{
        console.log(res); 
        this.generatePDF()
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  toSaved(){
    this.api.addToSaved(this.recipeId,this.recipe).subscribe({
      next:(res:any)=>{
        console.log(res); 
        alert("Saved")
      },
      error:(err:any)=>{
        console.log(err);
        alert(err.error)
      }
    })
  }

  generatePDF(){
    const pdf = new jsPDF()
    pdf.setFontSize(16)
    pdf.setTextColor("red")
    pdf.text(this.recipe.name,10,10)
    pdf.setFontSize(12)
    pdf.setTextColor("black")
    pdf.text(`Cuisine : ${this.recipe.cuisine}`,10,20)
    pdf.text(`Servings : ${this.recipe.servings}`,10,25)
    pdf.text(`Mode of Cooking : ${this.recipe.difficulty}`,10,30)
    pdf.text(`Total Preparation Time : ${this.recipe.prepTimeMinutes} Minutes`,10,35)
    pdf.text(`Total Cooking Time : ${this.recipe.cookTimeMinutes} Minutes`,10,40)
    pdf.text(`Total Calorie Per Servings : ${this.recipe.caloriesPerServing}`,10,45)
    let head = [['Ingredients Needed','Cooking Instructions']]
    let body = []
    body.push([this.recipe.ingredients,this.recipe.instructions])
    autoTable(pdf,{head,body,startY:50})
    pdf.output('dataurlnewwindow')
    pdf.save('download-recipe.pdf')
  }

back(){
  this.route.navigateByUrl('recipe')
}

}
