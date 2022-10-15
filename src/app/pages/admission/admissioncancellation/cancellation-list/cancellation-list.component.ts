import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { SearchStudentService } from '../../search-student.service';

declare let $: any;


@Component({
  selector: 'app-cancellation-list',
  templateUrl: './cancellation-list.component.html',
  styleUrls: ['./cancellation-list.component.scss']
})
export class CancellationListComponent implements OnInit {
  admissionCancellationHistoryDTOArr: any = [];

  constructor(
    public toastr: ToastrService,
    private formBuilder: FormBuilder, 
     private modalService: NgbModal,
     private spinner: NgxSpinnerService,
     private router: Router,
     private route: ActivatedRoute,
     private searchStudentService : SearchStudentService

  ) { }
  roleForm: FormGroup
  roleSubmitted = false;
  userId:any;
  roleobj:any = { };
  id:any

  ngOnInit(): void {
    this.getadmission();


  }
  getadmission() {
    this.spinner.show();
    $('#cancellation').DataTable().clear().destroy();
     this.searchStudentService.getCancell().pipe(first()).subscribe(res => {
      this.admissionCancellationHistoryDTOArr = res.data;
      this.spinner.hide();
      // this.toastr.success(res.message, 'Success!');
      $(document).ready(function () {
        $('#cancellation').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      }); 
      });
     
    
  }


}


