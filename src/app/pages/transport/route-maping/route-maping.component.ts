import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray,FormBuilder,Validators  } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-route-maping',
  templateUrl: './route-maping.component.html',
  styleUrls: ['./route-maping.component.scss']
})
export class RouteMapingComponent implements OnInit {
  routeObj: any = {};
  routemapForm: FormGroup;
  routeSubmitted = false;
  buttonText:string = "";
  routelist: any = [];

  constructor(private formBuilder: FormBuilder, 
    private modalService: NgbModal,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
  ) {
    this.routeObj.routelist = [];
   }
 
   addterm() {
    let order = this.createroutemapFormGroup();
    this.routeArr.push(order);

  }
  deleteterm(index) {
    if (this.routeArr.length == 1) {
      this.toastr.error("Can't delete the row when there is only one row", 'Warning');

      return false;
    } else {
      this.routeArr.removeAt(index);
      this.toastr.warning('Row deleted successfully', 'Delete row');
      return true;
    }
  }


  ngOnInit(): void {
    this.routemapForm = this.formBuilder.group({

      routemap: [null, Validators.required],
      originname: [null, Validators.required],
      destinationname: [null, Validators.required],
      description: [null,Validators.required],
      routelist: this.formBuilder.array(
        [this.createroutemapFormGroup()]  , [Validators.required],)
    })
  
  
  }
  get f() { return this.routemapForm.controls }; 
  createroutemapFormGroup() {
    return this.formBuilder.group({
      bus: [null, [Validators.required]],
      origin: [null, [Validators.required]],
      location: [null, [Validators.required]],
    })
  }
  get routeArr(): FormArray {
    return this.routemapForm.get('routelist') as FormArray;
  }


}



