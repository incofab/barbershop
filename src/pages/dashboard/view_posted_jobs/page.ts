import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DashboardService } from '../../../app/services/dashboard_service';
import { K } from '../../../app/k/k';

@Component({
  selector: 'page-posted-jobs',
  templateUrl: 'template.html',
  providers: [DashboardService]
})
export class ViewPostedJobsPage {

    jobs:any;
    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController, private dService:DashboardService,
        private loadingCtrl: LoadingController) {

    }

    ngOnInit(){
        this.viewPostedJobs();    
    }

    viewPostedJobs(){
    
        let loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: true
        });
                
        loading.present();
        
        this.dService.viewPostedJobs()
            .subscribe(response => { // On success
            this.jobs = response.json();
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Failed', 'Sending failed');
            loading.dismiss();
        },
        ()=>{   // On completion
            loading.dismiss();
        });

  }


}
