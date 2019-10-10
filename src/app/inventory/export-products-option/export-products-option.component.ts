import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { Url } from '../../classes/url';
import { Router } from '@angular/router';

@Component({
  selector: 'app-export-products-option',
  templateUrl: './export-products-option.component.html',
  styleUrls: ['./export-products-option.component.css']
})
export class ExportProductsOptionComponent implements OnInit {

  credential = User.authUser().user_type_id
  url: Url = new Url();
  constructor(private router: Router) { }

  ngOnInit() {
  }

  closePop(){       
    this.router.navigate(['/inventory']);
    
  }

}
