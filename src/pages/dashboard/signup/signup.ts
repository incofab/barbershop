import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DashboardService } from '../../../app/services/dashboard_service';
import { K } from '../../../app/k/k';
import { Countries } from '../../../app/k/countries';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [DashboardService]
})
export class SignupPage {

    firstname: string = '';
    lastname: string = '';
    username: string = '';
    password: string = '';
    email: string = '';
    cPassword: string = '';
    organisation: string = '';
    country: string = '';

    countries:string[];

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController, private dService:DashboardService,
        private loadingCtrl: LoadingController) {

    }

    ngOnInit(){
        this.countries = (new Countries()).getCountries();
    }

    signup(){
        console.log('First name = ' + this.firstname + ', username = ' + 
            this.username + 
        + ', password = ' + this.password + ', email = ' + this.email
        + 'Cpass= ' + this.cPassword);

        // Check if password matches confirm password
        if(this.password !== this.cPassword){
            K.alert(this.alertCtrl, 'Password mismatch', 
                'Password and Confirm password field must be the same');
            return;
        }
         
        let loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: true
        });
                
        loading.present();

        let signupData = {
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            username: this.username,
            password: this.password,
            organisation: this.organisation,
            country: this.country,
        }
        this.dService.signup(signupData)
            .subscribe(response => { // On success
            // Show alert message 
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Registration Failed', 'Network error');
            loading.dismiss();
        },
        ()=>{   // On completion
            loading.dismiss();
        });

    }
    

}
