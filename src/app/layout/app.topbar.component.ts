import { Component, ElementRef, ViewChild,OnInit  } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{
    logoutbtn:boolean;
    items!: MenuItem[];
    name: string;
    fullName: string;
    depot: string;
    designation: string;
    Gender:string;
    BirthDate:string;
    UserMobile:string;
    UserEmail:string;
    imageurl:string;
    displayDetails: boolean = false;
    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService,private router: Router, private route: ActivatedRoute) { }
    logout(){
        this.router.navigate(['/']);
    }
    ngOnInit() {
        const userInfoString = sessionStorage.getItem('userInfo');
        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            this.name = userInfo.Name || '';
            this.fullName = userInfo.FullName || '';
            this.depot = userInfo.Depot || '';
            this.designation = userInfo.Designation || '';
            this.Gender = userInfo.Gender || '';
            this.BirthDate = userInfo.BirthDate || '';
            this.UserMobile = userInfo.UserMobile || '';
            this.UserEmail = userInfo.UserEmail || '';
            this.imageurl = userInfo.imageurl || '';
        }
    }
    
  showDetails() {
    this.displayDetails = !this.displayDetails;
  }

}
