import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PanelModule } from 'primeng/panel';
@Component({
  selector: 'app-grnview',
  templateUrl: './grnview.component.html',
  styleUrls: ['./grnview.component.scss']
})
export class GrnviewComponent implements OnInit{
  grnno: string;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.grnno = params['grnno'];
    });
  }
}
