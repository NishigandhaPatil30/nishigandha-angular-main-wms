import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelModule } from 'primeng/panel';
@Component({
  selector: 'app-srngrnview',
  templateUrl: './srngrnview.component.html',
  styleUrl: './srngrnview.component.scss'
})
export class SrngrnviewComponent implements OnInit{
  grnno: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.grnno = params['grnno'];
    });
  }
}
