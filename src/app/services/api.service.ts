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
}
