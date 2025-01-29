import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-pnf',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './pnf.component.html',
  styleUrl: './pnf.component.css'
})
export class PnfComponent {

}
