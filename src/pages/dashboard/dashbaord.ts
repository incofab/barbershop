import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController} from 'ionic-angular';
import { DashboardService } from '../../app/services/dashboard_service';
import { K } from '../../app/k/k';
import { SignupPage } from './signup/signup';

import { PostAJobPage } from './post_a_job/page';
import { PostRentSpacePage } from './post_a_space/page';
import { ServicesProductsPage } from './services_products/page';
import { ViewAppliedJobsPage } from './view_applied_jobs/page';
import { ViewPostedJobsPage } from './view_posted_jobs/page';

@Component({
  selector: 'dashboard-home',
  templateUrl: 'dashboard.html',
  providers: [DashboardService]
})
export class DashboardPage {

    isLoggedIn:boolean = false;
    loginUsername: string = '';
    loginPassword: string = '';

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController, private dService:DashboardService,
        private loadingCtrl: LoadingController) {

    }

    ngOnInit(){
       
    }

    login(){
        console.log('username = ' + this.loginUsername 
        + ', password = ' + this.loginPassword);
        this.isLoggedIn = true;
        
        let loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: true
        });
                
        loading.present();
        
        this.dService.login(this.loginUsername, this.loginPassword)
            .subscribe(response => { // On success
            // this.checkLogin(response.json());
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Login Failed', 'Network error');
            loading.dismiss();
        },
        ()=>{   // On completion
            loading.dismiss();
        });

    }

    checkLogin():boolean{
        return this.isLoggedIn;
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

    logout(){
        // this.navCtrl.push(ServicesProductsPage);
    }

}
