import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-saved-recipe',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './saved-recipe.component.html',
  styleUrl: './saved-recipe.component.css'
})
export class SavedRecipeComponent implements OnInit{

  savedRecipe:any=[]

constructor(private api:ApiService){}
  ngOnInit(): void {
    this.viewSaved()
  }

viewSaved(){
  this.api.viewSaved().subscribe({
    next:(res:any)=>{
      console.log(res);
      this.savedRecipe=res   
    },
    error:(err:any)=>{
      console.log(err);    
    }
  })
}

deleteRecipe(id:any){
  this.api.deleterecipe(id).subscribe({
    next:(res:any)=>{
      console.log(res)
      alert(res);
      this.viewSaved()
    },
    error:(err:any)=>{
      console.log(err);    
    }
  })
}

}
