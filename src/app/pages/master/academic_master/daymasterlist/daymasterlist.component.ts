import { Component, OnInit } from '@angular/core';
import { DaymasterService } from './daymaster.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';



 declare let $: any;
@Component({
  selector: 'app-daymasterlist',
  templateUrl: './daymasterlist.component.html',
  styleUrls: ['./daymasterlist.component.scss']
})
export class DaymasterlistComponent implements OnInit  {
  buttonText:string = "";
  daymasterArr: any = [];
  constructor(
    private _daymasterService: DaymasterService,
    public toastr: ToastrService,
    private formBuilder: FormBuilder, 
     private modalService: NgbModal,
     public spinner: NgxSpinnerService
  ) { }
  DaymasterForm: FormGroup
  DaymasterObj: any = {};
  DaymasterSubmitted = false;

  ngOnInit(): void {
  
    this.getdaymaster();
   }
  getdaymaster() {
    this.spinner.show();
    $('#daymaster').DataTable().clear().destroy();
     this._daymasterService.getdaymaster().pipe(first()).subscribe(res => {
      this.daymasterArr = res.data;
      $(document).ready(function () {
        $('#daymaster').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      }); 
      this.spinner.hide();
      });
     
    
  }

}
