import { Component, ViewChild, TemplateRef } from "@angular/core";
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from "@angular/router";
import { IMyDpOptions } from 'mydatepicker';
import { ToastrService } from "ngx-toastr";
import { User } from "app/forms/components/template-forms/user";
import { appConfig } from "app/core/config/app.config";
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'template-form',
    templateUrl: './template-form.component.html'
})
export class TemplateFormComponent {
        result:any;

    @ViewChild('childModal') public childModal: ModalDirective;
    public user: User; // our model
    constructor(private router: Router,private http: HttpClient, private toastr: ToastrService) { }

 

    ngOnInit() {
        this.user = new User("", "", "");
        this.user.birthDate = { date: new Date().toLocaleDateString() };
    }

    // Initialized to specific date (09.10.2018).
    // private birthDate: Object = { date: new Date().toLocaleDateString() }

    gotoReactiveForm() {
        this.router.navigate(['/forms/reactive-form']);
    }

    createCustomer(model: User, isValid) {
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

    public hideChildModal() {
        this.childModal.hide();
    }
}