import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { HolidayService} from 'src/app/pages/master/common-master/holiday.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
declare let $: any;
@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html', 
  styleUrls: ['./holiday-list.component.scss']
})
export class HolidayListComponent implements OnInit {
  
  holidayListArr : any =[];
  constructor(
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private HolidayService: HolidayService,
     private route: ActivatedRoute, 
     private router: Router
  ) { }

  ngOnInit(): void {
 this.getHolidayList();
  }
  getHolidayList() {
   this.spinner.show();
     $('#holidaylist').DataTable().clear().destroy();
     this.HolidayService.getHoliday().pipe(first()).subscribe(res => {
       this.holidayListArr = res.data;
       //var arr = JSON.stringify(this.holidayListArr)
       $(document).ready(function () {
         $('#holidaylist').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
       });  
       this.spinner.hide();     
     }, err => {
       if (err.error.error.reason) {
       this.toastr.error(err.error.error.reason);
       }
       this.spinner.hide();
   })
   }

   edit(id){
    this.router.navigate(['/holiday',id]);
   }

}
