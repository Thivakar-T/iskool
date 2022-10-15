import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TermService } from './../term.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
declare let $: any;
@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.scss']
})
export class TermComponent implements OnInit {
  termForm: FormGroup;
  Obj:any = {};
  termSubmitted = false;
  buttonText:string = "";
  array=[];
  userName:any;
  Id:any;
  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService, private termservice: TermService,) { }

  ngOnInit(): void {
    this.termForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
    this.getTerm();
  }
  get f() { return this.termForm.controls };

  openModal(content: any) {
    this.buttonText = "Submit";
    this.termForm.reset({});
    this.Obj = {};
    this.termSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  addterm(modal){
    this.termSubmitted = true;
    if(this.termForm.invalid){
      return;
    }
    if(this.Obj.id){
      this.termForm.value.id = this.Obj.id;
      this.termservice.updateData(this.termForm.value).pipe(first()).subscribe(async res => {
        this.getTerm();
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      }, err => {
        this.spinner.hide();
        modal.dismiss('Cross click');
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
          this.spinner.hide();
        }
      })
    }
    else{
    this.termservice.createData(this.termForm.value).pipe(first()).subscribe(async res => {
      this.getTerm();
      this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
      },err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      });
    }
  }
  editTerm(values, content){
    this.spinner.show();
      this.buttonText = "Update"
      this.termSubmitted = false;
      this.termservice.editData(values.id).pipe(first()).subscribe(res => {
        this.Obj = res.data;
        this.spinner.hide();
      },err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
      this.modalService.open(content, { size: 'sm' });
  }
  getTerm(){
    this.spinner.show();
    $('#example').DataTable().clear().destroy();
      this.termservice.getData().pipe(first()).subscribe(res => {
        this.array = res.data;
        $(document).ready(function () {
          $('#example').DataTable({
            "iDisplayLength": 100
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
  deleteTerm(data,Id){
    if(Id){
      this.Id = Id;
   this.modalService.open(data, { size: 'sm' });
    }
  }
    Ok(modal){
      this.spinner.show();
      this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
      this.termservice.deleteData(this.Id, this.userName).subscribe(async res => {
        this.toastr.success(res.data, 'Success!');
        modal.dismiss('Cross click');
        this. getTerm();
       
    },err =>{
      if(err.error.error.reason){
        this.toastr.error(err.error.error.reason);
      }
      modal.dismiss('Cross click');
      this.spinner.hide();
    });
    
}

}
