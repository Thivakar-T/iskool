import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { first } from 'rxjs/operators';
import { SearchStudentService } from '../../search-student.service';


@Component({
    selector: 'app-admission-cancellation',
    templateUrl: './admission-cancellation.component.html',
    styleUrls: ['./admission-cancellation.component.scss']
})
export class AdmissionCancellationComponent implements OnInit {
    cancelObj: any = {};
    cancelForm: FormGroup;
    cancelSubmitted = false;
    admissionSubmitted = false;
    addObj: any = {};
    registrationNumber: any;
    enableCard = false;
    // userId:any;

    buttonText: string = "";
    id: any;
    editorConfig: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: 'auto',
        minHeight: '0',
        maxHeight: 'auto',
        width: 'auto',
        minWidth: '0',
        translate: 'yes',
        enableToolbar: true,
        showToolbar: true,
        placeholder: 'Enter text here...',
        defaultParagraphSeparator: '',
        defaultFontName: '',
        defaultFontSize: '',
        fonts: [
            { class: 'arial', name: 'Arial' },
            { class: 'times-new-roman', name: 'Times New Roman' },
            { class: 'calibri', name: 'Calibri' },
            { class: 'comic-sans-ms', name: 'Comic Sans MS' }
        ],
        customClasses: [
            {
                name: 'quote',
                class: 'quote',
            },
            {
                name: 'redText',
                class: 'redText'
            },
            {
                name: 'titleText',
                class: 'titleText',
                tag: 'h1',
            },
        ],
        uploadUrl: 'v1/image',
        uploadWithCredentials: false,
        sanitize: true,
        toolbarPosition: 'top',
        toolbarHiddenButtons: [
            ['bold', 'italic'],
            ['fontSize']
        ]
    };

    constructor(
        private modalService: NgbModal,
        private formBuilder: FormBuilder,
        public spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private searchStudentService: SearchStudentService


    ) { }

    ngOnInit(): void {
        this.cancelForm = this.formBuilder.group({
            registrationNumber: ['', Validators.required],
            remarks: [null, Validators.required]
        });

    }
    get f() { return this.cancelForm.controls };

    openCancel(content: any) {
        this.buttonText = "Submit";
        this.cancelSubmitted = false;
        this.modalService.open(content, { size: 'md' });
    }

    // noWhitespaceValidator(control: FormControl) {
    //     const isWhitespace = (control.value || '').trim().length === 0;
    //     const isValid = !isWhitespace;
    //     return isValid ? null : { 'whitespace': true };
    //   }    

    getCancel(event) {
if(event.id == undefined) {
    if ( (this.cancelForm.value.registrationNumber == null || this.cancelForm.value.registrationNumber == '')) {
        this.cancelSubmitted= true;
        this.toastr.error("Please fill   the field.", 'Warning');
        return;
      }
      this.spinner.show();
    this.searchStudentService.getCancel(this.cancelForm.value).pipe(first()).subscribe(async res => {
        this.cancelObj = res.data;
        // this.registrationNumber =  this.cancelObj.registrationNumber;
        this.enableCard  = true;
        this.toastr.success(res.message, 'Success!');
        this.spinner.hide();
    },
        err => {
            // this.spinner.show();
            if (err.error.error.reason)  {
                this.toastr.error(err.error.error.reason);
                this.enableCard  = false;
            }
            this.spinner.hide();
        })
}else{
    this.enableCard  = false;
}
       

    }
    updateCancel(modal) {
        // this.cancelForm.value.createdBy = this.userId;
        // this.cancelObj.registrationNumber = this.registrationNumber;
        this.cancelObj = this.cancelObj;
        this.cancelSubmitted = true;
        if (this.cancelObj.remarks == null) {
         //   this.cancelSubmitted = true;
            this.toastr.error("Remark should be mandatory.", 'Warning');
            return;
        }       
        this.searchStudentService.updateCancel(this.cancelObj).pipe(first()).subscribe(res => {
            // this.cancelForm.reset({});
            this.cancelForm.controls['registrationNumber'].reset();
            this.cancelSubmitted = false;
            // this.getCancel(1);
            this.toastr.success(res.data, 'Success!');
            modal.dismiss('Cross click');
            this.enableCard = false;
            this.spinner.hide();
        },
            err => {
                // this.spinner.show();
                if (err.error.error.reason) {
                    this.toastr.error(err.error.error.reason);
                    this.cancelForm.reset({});
                    this.enableCard = false;

                }
                modal.dismiss('Cross click');
                this.spinner.hide();
            })
            
    }

}

// }