import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirect',
  standalone: true,
  imports: [],
  templateUrl: './redirect.component.html',
  styleUrl: './redirect.component.scss'
})
export class RedirectComponent implements OnInit {

  ngOnInit() {
    // Use window.location.href to redirect to the HTML page
    window.location.href = '/assets/index.html';
  }
}
