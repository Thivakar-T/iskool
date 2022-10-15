import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;
import { GradeListService } from '../grade-list.service';

@Component({
  selector: 'app-grade-list',
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {
  gradelistArr: any = [];
  grade: any;
  data: any;
  userName: any;
  constructor(private GradingService: GradeListService,
    private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,

  ) { }

  ngOnInit(): void {
    this.getGrade();
  }
  getGrade() {
    this.spinner.show();
    $('#grade').DataTable().clear().destroy();
    this.GradingService.getGrading().pipe(first()).subscribe(res => {
      this.gradelistArr = res.data;
      $(document).ready(function () {
        $('#grade').DataTable({
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

  // openModal(content,grade) {
  //   if(grade){
  //     this.grade = grade;
  //     this.modalService.open(content, { size: 'md' });
  //     }
  //   // this.modalService.open(content, { size: 'sm' });
  // }


  edit(id){
    this.router.navigate(['/grading',id]);
   }
   openCat(content, grade){
    if(grade){
    this.grade = grade;
    this.modalService.open(content, { size: 'sm' });
    }
    }
  
  deletedata(modal) {
    this.spinner.show();
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this.GradingService.deleteGrade(this.grade).pipe(first()).subscribe(res => {
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.getGrade();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        modal.dismiss('Cross click');
        this.spinner.hide();
      }
    })
  }
}
