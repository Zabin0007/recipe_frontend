import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
server_url = 'http://localhost:3000'
  constructor(private http:HttpClient) { }
  //get all recipes api
  getAllRecipes(){
    return this.http.get(`${this.server_url}/allRecipes`)
  }
  //verify token from all request like reqHeaders
  appendToken(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token')
    if(token){
      headers = headers.append('Authorization',`Bearer ${token}`)
    }
    return {headers}
  }
  //getSingleRecipe
  getSingleRecipe(id:any){
    return this.http.get(`${this.server_url}/SingleRecipe/${id}`,this.appendToken())
  }
  //getRelatedRecipe //http://localhost:3000/relatedrecipe?cuisine=Pakistani
  getRelatedRecipe(cuisine:any){
    return this.http.get(`${this.server_url}/relatedrecipe?cuisine=${cuisine}`,this.appendToken())
  }
  //post testimony
  addTestimony(reqBody:any){
    return this.http.post(`${this.server_url}/testimony`,reqBody)
  }
  //post register
  registerAPI(reqBody:any){
   return this.http.post(`${this.server_url}/register`,reqBody)
  }
  //post login
  loginAPI(reqBody:any){
    return this.http.post(`${this.server_url}/login`,reqBody)
   }
   //post downloads
   addToDownload(id:any,reqBody:any){
    return this.http.post(`${this.server_url}/downloads/${id}`,reqBody,this.appendToken())
   }
   //post saved
   addToSaved(id:any,reqBody:any){
    return this.http.post(`${this.server_url}/saved/${id}`,reqBody,this.appendToken())
   }
   //get Saved
   viewSaved(){
    return this.http.get(`${this.server_url}/viewSaved`,this.appendToken())
   }
   //delete Saved
   deleterecipe(id:any){
    return this.http.delete(`${this.server_url}/deleteSaved/${id}`,this.appendToken())
   }

   getDownloadedRecipe(){
    return this.http.get(`${this.server_url}/getDownloads`)
  }
  
  getUsers(){
    return this.http.get(`${this.server_url}/getUsers`)
  }
  
  getTestimonies(){
    return this.http.get(`${this.server_url}/getTestimonies`)
  }
  
  updateTestimoney(id:any,status:string){
    return this.http.get(`${this.server_url}/updateTestimony/${id}?status=${status}`)
  }
  //add recipe
  addRecipe(reqBody:any){
    return this.http.post(`${this.server_url}/addRecipe`,reqBody)
  }

  //delete recipes
  deleteRecipeAPI(id:any){
    return this.http.delete(`${this.server_url}/deleteRecipe/${id}`)
  }
}
