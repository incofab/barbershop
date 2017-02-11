import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DashboardService } from '../../../app/services/dashboard_service';
import { K } from '../../../app/k/k';

@Component({
  selector: 'page-applied-jobs',
  templateUrl: 'template.html',
  providers: [DashboardService]
})
export class ViewAppliedJobsPage {

    jobs:any;
    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController, private dService:DashboardService,
        private loadingCtrl: LoadingController) {

    }

    ngOnInit(){
        this.viewAppliedJobs();    
    }

    viewAppliedJobs(){
    
        let loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
                
        loading.present();
        
        this.dService.viewPostedJobs()
            .subscribe(response => { // On success
            if(response.success){
                this.jobs = response.result;
            }else {
                K.alert(this.alertCtrl, 'Registration Failed', response.message);
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Failed', 'Sending failed');
            loading.dismiss();
        });

  }


}
