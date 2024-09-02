
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { NavigationExtras } from '@angular/router';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `],
    providers: [MessageService],
})
export class LoginComponent implements OnInit {
  usernameNotEmpty: boolean = false;

    angForm: any;
      hide = true;
    angForm1:any;
    constructor(private messageService: MessageService,private fb: FormBuilder,private dataService: ApiService,private router:Router,public layoutService: LayoutService) {
    this.angForm = this.fb.group({
    Password: ['', Validators.required],
    Name: ['', Validators.required]
    });
    }
    
    ngOnInit() {
      this.angForm.get('Name').valueChanges.subscribe(value => {
        this.usernameNotEmpty = value.trim() !== '';
      });
    }
    postdata(angForm1: any): void {
      this.dataService.userlogin(angForm1.value.Name, angForm1.value.Password)
        .pipe(first())
        .subscribe(
          data => {
            // ... Existing code ...
  
            // Get the user information from the response
            const userInfo = data[0]; // Assuming the user information is in the first element
            sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
            // Construct the queryParams object with the user information
            const queryParams = {
              name: userInfo.Name,
              fullName: userInfo.FullName,
              depot: userInfo.Depot,
              designation: userInfo.Designation,
              Gender: userInfo.Gender,
              BirthDate: userInfo.BirthDate,
              UserMobile: userInfo.UserMobile,
              UserEmail: userInfo.UserEmail,
              imageurl: userInfo.imageurl
            };
  
            // Use queryParams to include the user information in the route state
            const navigationExtras: NavigationExtras = {
              state: {
                queryParams
              }
            };
  
            // Use state instead of queryParams in navigation extras
            const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/dashboard';
  
            // Show the success message
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login is successful' });
  
            // Delay the navigation after displaying the message for 2 seconds (you can adjust the time)
            setTimeout(() => {
              this.router.navigate([redirect], navigationExtras);
            }, 700);
  
          },
          error => {
            if (error.status === 0) { // Network error
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Network connection lost. Please check your internet connection and try again.' });
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User name or password is incorrect' });
            }
          }
        );
    }
    register(){
     this.router.navigate(['login/registration']);
    }
    // forgotpassword() {
    //    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login is successful' });
    //   const nameValue = this.angForm.get('Name').value;
    //   this.router.navigate(['login/forgotpassword'], { queryParams: { name: nameValue } });
    // }
    
    forgotpassword() {
      const nameValue = this.angForm.get('Name').value; // Get the value of the 'Name' control
      
      if (nameValue.trim() === '') {
        // Display a message asking the user to fill in the username.
        this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Please fill in the username field.' });
      } else {
        // Redirect to the desired page (replace 'your-target-page' with the actual route).
        this.router.navigate(['login/forgotpassword'], { queryParams: { name: nameValue } });
      }
    }
    
    get Name() { return this.angForm.get('Name'); }
    get Password() { return this.angForm.get('Password'); }
    }
