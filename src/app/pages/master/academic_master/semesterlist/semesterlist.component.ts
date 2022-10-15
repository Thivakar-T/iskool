import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { SemesterService } from './semester.service';
declare let $: any;

@Component({
  selector: 'app-semesterlist',
  templateUrl: './semesterlist.component.html',
  styleUrls: ['./semesterlist.component.scss']
})
export class SemesterlistComponent implements OnInit {

  buttonText:string = "";
  semesterArr: any = [];
  constructor(
    private _semesterService: SemesterService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder, 
     private modalService: NgbModal,
     private spinner: NgxSpinnerService
  ) { }
  semesterForm: FormGroup
  semesterObj: any = {};
  semesterSubmitted = false;
 
  userId:any;


  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userId;

    this. getsemester();
  }
  getsemester() {
    this.spinner.show();
    $('#example').DataTable().clear().destroy();
     this._semesterService.getsemester().pipe(first()).subscribe(res => {
      this.semesterArr = res.data;
      $(document).ready(function () {
        $('#example').DataTable({
          "iDisplayLength": 100
        });
      }); 
     
      });
      this.spinner.hide();
    
  }


}
