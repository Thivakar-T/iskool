import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs/operators';

declare let $: any;


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  id: any;
  roomObj: {}
  useArr: any = [];
  constructor(
    private User: UserService,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService

  ) { }

  ngOnInit(): void {
    this.getBatchList();


  }
  getBatchList() {
    this.spinner.show();
    $('#userlist').DataTable().clear().destroy();
    this.User.get().pipe(first()).subscribe(res => {
      this.useArr = res.data;
      $(document).ready(function () {
        $('#userlist').DataTable({
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

}
