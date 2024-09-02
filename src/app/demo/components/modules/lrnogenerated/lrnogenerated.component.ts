import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';


@Component({
  selector: 'app-lrnogenerated',
  templateUrl: './lrnogenerated.component.html',
  styleUrls: ['./lrnogenerated.component.scss']
})
export class LrnogeneratedComponent implements OnInit {
  lrNumber: any; // Define the property to hold the LR number

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.lrNumber = this.route.snapshot.queryParamMap.get('lr');
   // console.log('LR Number:', this.lrNumber);
  }

  lrnoprint() {
    const phpEndpoint = `https://www.swatpro.co/getlrnoprint.php?lrNumber=${this.lrNumber}`;
    // AJAX call to the PHP backend
    console.log(phpEndpoint);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', phpEndpoint, true);
    xhr.responseType = 'text';

    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Print the stickers
          this.printStickers(xhr.responseText);
        } else {
          console.error('Error while fetching sticker data.');
        }
      }
    };

    xhr.send();
  }

  private printStickers(content: string) {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Error opening print window.');
    }
  }
  goToOtherComponent() {
    this.router.navigate(['modules/lrgenration']); 
  }
  
}

