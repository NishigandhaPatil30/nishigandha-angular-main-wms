import { Component,OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
interface OtpResponse {
  otp: string; // Adjust the type according to your actual response structure
  // Add other properties if there are any
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [MessageService] // Inject MessageService
})
export class RegistrationComponent implements OnInit{
resolved(captchaResponse: string): void {
    // handle the captcha response here
  }
  handleCaptchaResponse(event: any) {
    // Handle the captcha response here
    console.log('Captcha response:', event);
  }
  ngOnInit(): void {
    this.loadDepots();
  }
  loadDepots() {
    this.http.get<string[]>('https://swatpro.co/fetchdepot.php').subscribe(depots => {
      this.depots = depots;
    });
  }

  depot: any = {};
  user: any = {}; // Initialize an empty user object
  genders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];
  selectedFilePath: string;
  constructor(private http: HttpClient, private messageService: MessageService,private router: Router) {
    this.selectedFilePath = '';
  }
 showResponse(event) {
        this.messageService.add({severity:'info', summary:'Succees', detail: 'User Responded', sticky: true});
    }
    showTimer: boolean = false;
    remainingTime: number = 30;
    timerExpired: boolean = false;
    sendotp(adharno: string) {
  const mobileNumber1 = adharno;
  console.log(mobileNumber1);

  this.http.post('https://swatpro.co/sendsms.php', { adharno: mobileNumber1 })
    .subscribe(
      (response) => {
     
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `OTP sent successfully to ${adharno}`
        });

        // Start the timer
        this.startTimer();
      },
      error => {
        // Handle error
        console.error('Error sending OTP:', error);
      }
    );
}
displayDialog: boolean = false;

showDialog() {
    this.displayDialog = true;
}
depots: string[] = [];
submitForm() {
  const formData = {
    Depot: this.depot.Depot,
      location: this.depot.Location,
      latitude: this.depot.Latitude,
      longitude: this.depot.Longitude
  };
console.log(formData);
  this.http.post('https://swatpro.co/adddepot.php', formData)
      .subscribe(response => {
          console.log('Data saved successfully:', response);
          // You can handle success actions here
      }, error => {
          console.error('Error saving data:', error);
          // Handle error scenarios here
      });
}
register() {
  console.log(this.user.selectedFilePath);

  if (this.user.password !== this.user.confirmPassword) {
    this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Password and confirm password do not match.' });
    return;
  }

  // Convert dateOfBirth to a valid JavaScript Date object
  if (typeof this.user.dateOfBirth === 'string') {
    this.user.dateOfBirth = new Date(this.user.dateOfBirth);
  }

  // Ensure dateOfBirth is formatted as YYYY-MM-DD
  const formattedDate = this.formatDate(this.user.dateOfBirth);

  // Check if dateOfBirth is a valid date
  if (formattedDate === 'Invalid Date') {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid date format.' });
    return;
  }

  this.user.dateOfBirth = formattedDate;

  // Add selectedFilePath to this.user
  this.user.selectedFilePath = this.user.selectedFilePath;

 // console.log(this.user);

  this.http.post('https://swatpro.co/registertset.php', this.user).subscribe(
    (response) => {
      console.log(response);
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User registered successfully.' });
      // Handle the response from the PHP backend
      setTimeout(() => {
  this.router.navigate(['/login']);
      }, 1000); // 3000 milliseconds = 3 seconds
    },
    (error) => {
      console.error(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'User registration failed.' });
      // Handle any errors that occurred during the HTTP request
    }
  );
}
registerUser(userData) {
  this.http.post<any>('https://swatpro.co/registertset.php', userData).subscribe(
    (response) => {
      console.log(response.message);
      console.log('Response:', response);

      if (response.selectedFilePath) {
        // Use the selectedFilePath to update your component property
        this.imageUrl = response.selectedFilePath;
        console.log('Image URL:', this.imageUrl);

      }
    },
    (error) => {
      console.error('Registration failed:', error);
    }
  );
}


imageUrl: string; // Add this line

// Your existing code...

// Function to display the image
displayImage(imageUrl: string) {
    this.imageUrl = imageUrl;
}
sendotp1(panno: string) {
  const mobileNumber1 = panno;
  //console.log(mobileNumber1);

  this.http.post('https://swatpro.co/sendsms1.php', { panno: mobileNumber1 })
    .subscribe(
      (response) => {
     
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Your pan number is verified ${panno}`
        });

        // Start the timer
        this.startTimer();
      },
      error => {
        // Handle error
        console.error('Error sending OTP:', error);
      }
    );
}
  
    startTimer() {
      this.showTimer = true;
  
      const timerInterval = setInterval(() => {
        if (this.remainingTime > 0) {
          // Update the remaining time
          this.remainingTime--;
        } else {
          // Timer expired, set flag and handle accordingly
          this.timerExpired = true;
          clearInterval(timerInterval); // Stop the timer
          this.showTimer = false; // Hide the timer display
        }
      }, 1000); // Update every 1 second
    }
    enteredOTP:any;
    
  
sendotp2(enteredOTP: string) {
  const mobileNumber1 = enteredOTP;
  console.log(mobileNumber1);

  this.http.post('https://swatpro.co/sendsms2.php', { enteredOTP: mobileNumber1 })
    .subscribe(
      (response) => {
     
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `adhar otp is succssfully verified ${enteredOTP}`
        });

        // Start the timer
        this.startTimer();
      },
      error => {
        // Handle error
        console.error('Error sending OTP:', error);
      }
    );
}  
    
onFileSelected(event: any): void {
  const file = event.target.files[0];

  if (file) {
    this.readAndDisplayImage(file);
  }
}

readAndDisplayImage(file: File): void {
  const reader = new FileReader();

  reader.onload = (e) => {
    this.user.selectedFilePath = e.target?.result as string;
  };

  reader.readAsDataURL(file);
}


  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
