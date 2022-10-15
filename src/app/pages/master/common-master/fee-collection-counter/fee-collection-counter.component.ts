import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal,ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FeeCollectionCounterService } from './../fee-collection-counter.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;

@Component({
  selector: 'app-fee-collection-counter',
  templateUrl: './fee-collection-counter.component.html',
  styleUrls: ['./fee-collection-counter.component.scss']
})
export class FeeCollectionCounterComponent implements OnInit {

  feeForm: FormGroup;
  feeSubmitted = false;
  buttonText:string = "";
  feeObj: any = {};
  feeArr: any = [];
  userName: any;
  feeId:any;

  get f() { return this.feeForm.controls };

  constructor(
    private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    private FeeCollectionCounterService : FeeCollectionCounterService,
    public toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    public spinner: NgxSpinnerService,
  ) { }
  ngOnInit(): void {
    this.feeForm = this.formBuilder.group({
      name: [null, Validators.required],
      shortName: [null, Validators.required]
    });
    this.getfeeList() 

  }
  openModal(content: any) {
    this.buttonText = "Submit";
    this.feeForm.reset({});
    this.feeObj = {};
    this.feeSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }
  getfeeList() {
    this.spinner.show();
        $('#feecounter').DataTable().clear().destroy();
    this.FeeCollectionCounterService.getFee().pipe(first()).subscribe(res => {
      this.feeArr = res.data;
      $(document).ready(function () {
              $('#feecounter').DataTable({
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
  addfee(modal) {
    this.feeSubmitted = true;
    if (this.feeForm.invalid) {
      return;
    }
    if (this.feeObj.id) {
      this.feeForm.value.id = this.feeObj.id;
      this.FeeCollectionCounterService.updateFee(this.feeForm.value).pipe(first()).subscribe(async res => {
        this.getfeeList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    } else {
      this.FeeCollectionCounterService.createFee(this.feeForm.value).pipe(first()).subscribe(async res => {
        this.getfeeList();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    }
  }
  editfee(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.feeSubmitted = false;
    this.FeeCollectionCounterService.getSingleFee(values.id).pipe(first()).subscribe(res => {
      this.feeObj = res.data;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }
  confirmdelete(data: any){
    this.buttonText = "Submit";
      this.feeObj = {};
      this.feeSubmitted = false;
    this.modalService.open(data, { size: 'sm' });
  
  }
  openModall(content, feeId,){
    if(feeId){
     this.feeId = feeId;
      this.modalService.open(content, { size: 'sm' });  
    }
  }
  deleteData(modal){
    this.spinner.show();
     // this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this.FeeCollectionCounterService.deleteData(this.feeId).pipe(first()).subscribe((data :any)=>{
      this.toastr.success(data.data, 'Success!');
      modal.dismiss('Cross click');
      this.getfeeList(); 
    },err =>{
      if(err.error.error.reason){
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    })
  }
}
