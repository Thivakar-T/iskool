import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SearchStudentService } from '../search-student.service';
import { StandardService } from './../../master/common-master/standard.service';
import { AcadamicYearService } from './../../master/common-master/academic-year/acadamic-year.service';
import { SectionService } from './../../master/common-master/section/section.service';
import { AcademicRecordService } from '../academic-record.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-academic-view',
  templateUrl: './student-academic-view.component.html',
  styleUrls: ['./student-academic-view.component.scss']
})
export class StudentAcademicViewComponent implements OnInit {
  id: any;
  informationObj: any = {};
  address: any;
  CommunicationAddressObj: any = {};
  localAddressObj: any = {};
  parentDetailsObj: any = {};
  localGuardianObj: any = {};
  addressInformationObj : any = {};
  parent: any = [];

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public toastr: ToastrService,
    public spinner: NgxSpinnerService,
    private AcademicRecordService: AcademicRecordService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.getSingleStudentInformation();
    }
  }
  getSingleStudentInformation() {
    this.spinner.show();
    this.AcademicRecordService.getStudentInformation(this.id).pipe(first()).subscribe((res: any) => {
      this.informationObj = res.data;
      this.address = this.informationObj.addressInformationObj;
      this.parent = this.informationObj.parentDetailsObj;
      this.spinner.hide();
    });
  
  }
}
