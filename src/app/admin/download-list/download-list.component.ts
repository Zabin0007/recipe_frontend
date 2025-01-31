import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-download-list',
  templateUrl: './download-list.component.html',
  styleUrl: './download-list.component.css'
})
export class DownloadListComponent implements OnInit{
  constructor(private api:ApiService){}

  downloads:any=[]
  ngOnInit(): void {
   this.fetchDownloads()
  }

fetchDownloads(){
this.api.getDownloadedRecipe().subscribe({
  next:(res:any)=>{
    console.log(res);
    this.downloads=res 
  },
  error:(err:any)=>{
    console.log(err);
    
  }
})
}
}
