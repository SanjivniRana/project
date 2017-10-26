import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from "ngx-toastr";
import { HttpClient } from "@angular/common/http";
import { appConfig } from "app/core/config/app.config";
@Component({
    selector: 'reactive-form',
    templateUrl: 'reactive-form.component.html'
})
export class ReactiveFormComponent {
    complexForm: FormGroup;
    constructor(private router: Router,private http: HttpClient, private fb: FormBuilder,private toastr: ToastrService) {
        this.createForm();
    }

    createForm() {
        this.complexForm = this.fb.group({
            firstName   : ['', Validators.required],
            lastName    : ['', Validators.required],
            email   : ['', Validators.required],
            phone:['', Validators.required]
        });
    }

submitForm(model,isValid)
{
      if (!isValid) {
            
            this.toastr.error('Please fix errors');
            //this.childModal.show();    
        } else {
           
            this.http.post(`${appConfig.apiUrl}/customers`,model, { observe: 'response' }).subscribe(data => {
            this.toastr.error('Record Added');
               }
            );
            console.log(model)
        }
}
    gotoTemplateForm() {
        this.router.navigate(['/forms']);
    }
}