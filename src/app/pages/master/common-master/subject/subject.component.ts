import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare let $: any;

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  subObj: any = {};
  SubSubmitted = false;
  SubForm: FormGroup;
  buttonText: string = "";

  constructor(private modalService: NgbModal,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.SubForm = this.formBuilder.group({
      name: [null, Validators.required],
      Shortname: [null, Validators.required],
      grading: [null, Validators.required],
      Catagory: [null, Validators.required]
    })
    this.Subject()
  }
  get f() { return this.SubForm.controls };

  openGST(content: any) {
    this.buttonText = "Submit";
    this.subObj = {};
    this.SubSubmitted = false;
    this.modalService.open(content, { size: 'md' });
  }
  Subject(){
    $('#subject').DataTable().clear().destroy();
    $(document).ready(function () {
      $('#subject').DataTable({
        "iDisplayLength": 30,
        "lengthMenu":  [10, 25, 30,50,100]

      });
    });
  }
  addSub(modal){
    this.SubSubmitted = true;
    if (this.SubForm.invalid) {
      return;
    }
  }
}
