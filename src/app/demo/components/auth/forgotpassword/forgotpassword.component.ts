import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
  providers:[MessageService]
})
export class ForgotpasswordComponent {
  newPassword: string;
  confirmPassword: string;
  errorMessage: string;
  userId: number;
  searchResults: any[] = [];
  searchTerm: any;
  name: string;
  constructor(private http: HttpClient, private route: ActivatedRoute,private messageService: MessageService, private router: Router) {
 
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const nameValue = params['name'];
      console.log('Name value from query parameter:', nameValue);
  
      // Now you can use the 'nameValue' in your component as needed
      // For example, you can assign it to a property in this component
      this.name = nameValue;
    });
  }
 
  
  resetPassword() {
    // Check if the passwords match
    if (this.newPassword !== this.confirmPassword) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Passwords do not match.' });
      return;
    }
  
    // Retrieve the 'Name' value from query parameter (assuming you've implemented it as mentioned earlier)
    const name = this.name;
  
    // Prepare the data to send in the POST request
    const newPasswordData = {
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword,
      name: name // Include the 'name' value in the object
    };
  
    // Send a POST request to the PHP backend
    this.http.post<any>('https://swatpro.co/forgotpassword.php', newPasswordData)
      .subscribe(
        (response) => {
          if (response.success) {
            // Password reset was successful
            this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
            setTimeout(() => {
              // Redirect to the login page
              this.router.navigate(['/login']); // Replace '/login' with the actual path to your login page
            }, 1000);
          } else {
            // Password reset failed
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.message });
          }
        },
        (error) => {
          // Handle HTTP error
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Password reset failed: ' + error.message });
        }
      );
  }
  
  
}
