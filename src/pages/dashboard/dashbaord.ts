import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { DashboardService } from '../../app/services/dashboard_service';
import { K } from '../../app/k/k';
import { PaymentMethod } from '../../app/k/payment_method';
import { SignupPage } from './signup/signup';

import { PostAJobPage } from './post_a_job/page';
import { PostRentSpacePage } from './post_a_space/page';
import { ServicesProductsPage } from './services_products/page';
import { ViewAppliedJobsPage } from './view_applied_jobs/page';
import { ViewPostedJobsPage } from './view_posted_jobs/page';
import { ListingsPage } from './listing/listing';
import { ViewListingsPage } from './listing/view/view_listing';

@Component({
  selector: 'dashboard-home',
  templateUrl: 'dashboard.html',
  providers: [DashboardService]
})
export class DashboardPage {

    isLoggedIn:boolean = false;
    loginEmail: string = '';
    loginPassword: string = '';
    userDetails: UserDetails;

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController, private dService:DashboardService,
        private loadingCtrl: LoadingController, private storage: Storage) {

    }

    ngOnInit(){
       this.checkLogin();
    }

    login(){
        // console.log('username = ' + this.loginUsername 
        //     + ', password = ' + this.loginPassword);
        let loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
                
        loading.present();
        
        this.dService.login(this.loginEmail, this.loginPassword)
            .subscribe(response => { // On success
            if(response.success){
                K.setCredentials(this.storage, response.token);
                this.userDetails = response.user_details;
                this.storage.set('user_details', JSON.stringify(this.userDetails))
                    .then(() => this.isLoggedIn = true );                
            }else{
                K.alert(this.alertCtrl, 'Login Failed', 'Incorrect username and password');
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Login Failed', 'Network error');
            loading.dismiss();
        });

    }

    checkLogin():void{
        // This loads the token into memory, to be used when needed
        K.getCredentials(this.storage);
        this.storage.get('user_details').then(
            (val) => {
                if(val) {
                    this.isLoggedIn = true;
                    this.userDetails = JSON.parse(val);
                }
            }
        );            
    }

    listing(){
        this.navCtrl.push(ListingsPage);
    }
    viewListing(){
        this.navCtrl.push(ViewListingsPage);
    }
    gotoSignUpPage(){
        this.navCtrl.push(SignupPage);
    }
    post_a_job(){
        this.navCtrl.push(PostAJobPage);
    }
    view_posted_jobs(){
        this.navCtrl.push(ViewPostedJobsPage);
    }
    view_applied_jobs(){
        this.navCtrl.push(ViewAppliedJobsPage);
    }
    postRentSpace(){
        this.navCtrl.push(PostRentSpacePage);
    }
    servicesProducts(){
        this.navCtrl.push(ServicesProductsPage);
    }
    paymentMethod(){
        // this.navCtrl.push(PaymentMethodPage);
        let p = new PaymentMethod();
        p.retrievePaymentMethod(this.loadingCtrl, this.alertCtrl, this.dService, this.storage);

    }

    logout(){
        this.alertCtrl.create({
        title: 'Logout',
        message: 'Are you sure?',
        buttons: [
            {
            text: 'No',
            handler: () => {}
            },
            {
            text: 'Yes',
            handler: () => {
                this.storage.remove(K.TOKEN);
                this.storage.remove('user_details');
                this.isLoggedIn = false;
            }
            }
        ]}).present();
    }

}

interface UserDetails{
    name: string;
    username: string; // Username here is the email
    userid: string;
    organization:string;
    state: string;
    country: string;
}
