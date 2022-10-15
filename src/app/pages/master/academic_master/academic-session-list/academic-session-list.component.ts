import { Component, OnInit } from '@angular/core';
import { AcademicSessionService } from '../academic-session/academic-session.service';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

@Component({
  selector: 'app-academic-session-list',
  templateUrl: './academic-session-list.component.html',
  styleUrls: ['./academic-session-list.component.scss']
})
export class AcademicSessionListComponent implements OnInit {

  academicSessionArr:any = [];
  constructor(
    private academic_session: AcademicSessionService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getAcademicSession();
  }

  getAcademicSession() {
    $('#acadamicsession').DataTable().clear().destroy();
    this.academic_session.getAllAcademicSession().pipe(first()).subscribe(res =>{
      this.academicSessionArr = res.data;
      $(document).ready(function() {
        $('#acadamicsession').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
    } );
    this.spinner.hide();
    },err =>{
      if(err.error.error.reason){
        this.spinner.hide();
        this.toastr.error(err.error.error.reason);
      }
    })
  }
}
