import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoomlabService } from '../roomlab.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

declare let $: any;

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss']
})
export class ClassRoomComponent implements OnInit {
  countryArr: any = [];
  degreeArr: any = [];
  roomObj: any = {};
  roomForm: FormGroup;
  roomSubmitted = false;
  buttonText: string = "";
  userName: any;
  Obj: any = {};
  roomLabdId: any;

  constructor(private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _RoomlabService: RoomlabService,
    public toastr: ToastrService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      name: [null, Validators.required],
      capacity: [null, Validators.required],
      roomNo: [null, Validators.required],
    })
    this.getdegree();

  }
  get f() { return this.roomForm.controls };

  openGST(content: any) {
    this.buttonText = "Submit";
    this.roomForm.reset({});
    this.roomObj = {};
    this.roomSubmitted = false;
    this.modalService.open(content, { size: 'sm' });
  }

  adddegree(modal) {
    this.roomSubmitted = true;
    if (this.roomForm.invalid) {
      return;
    }

    if (this.roomObj.id) {
      this.roomForm.value.id = this.roomObj.id;
      this._RoomlabService.updateBatch(this.roomObj).pipe(first()).subscribe(res => {
        this.toastr.success(res.data, 'Success!');
        this.getdegree();
        modal.dismiss('Cross click');
        this.spinner.hide();
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    } else {
      this._RoomlabService.createBatch(this.roomForm.value).pipe(first()).subscribe(res => {
        this.toastr.success(res.data, 'Success!');
        this.getdegree();
        modal.dismiss('Cross click');
        this.spinner.hide();
      }, err => {
        if (err.error.error.reason) {
          this.toastr.error(err.error.error.reason);
        }
        this.spinner.hide();
      })
    }

  }

  getdegree() {
    this.spinner.show();
    $('#class').DataTable().clear().destroy();
    this._RoomlabService.getAllUsers().pipe(first()).subscribe(res => {
      this.countryArr = res.data;
      $(document).ready(function () {
        $('#class').DataTable({
          "iDisplayLength": 30,
          "lengthMenu":  [10, 25, 30,50,100]

        });
      });
      this.spinner.hide();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
        this.spinner.hide();
      }
    })
  }

  editBatch(values, content) {
    this.spinner.show();
    this.buttonText = "Update"
    this.roomSubmitted = false;
    this._RoomlabService.getSingleBatch(values.id).pipe(first()).subscribe(res => {
      this.roomObj = res.data;
      this.spinner.hide();
    })
    this.modalService.open(content, { size: 'sm' });
  }
  confirmdelete(data: any) {
    this.buttonText = "Submit";
    this.roomObj = {};
    this.roomSubmitted = false;
    this.modalService.open(data, { size: 'sm' });
  }

  openModal(content, roomLabdId) {
    if (roomLabdId) {
      this.roomLabdId = roomLabdId;
      this.modalService.open(content, { size: 'sm' });
    }
  }

  deleteData(modal) {
    this.spinner.show();
    this.userName = JSON.parse(localStorage.getItem('currentUser')).data.loginObj.userName;
    this._RoomlabService.deleteRoom(this.roomLabdId, this.userName).pipe(first()).subscribe((res: any) => {
      this.toastr.success(res.data, 'Success!');
      modal.dismiss('Cross click');
      this.getdegree();
    }, err => {
      if (err.error.error.reason) {
        this.toastr.error(err.error.error.reason);
      modal.dismiss('Cross click');
      this.spinner.hide();
      }
    })
  }
}

