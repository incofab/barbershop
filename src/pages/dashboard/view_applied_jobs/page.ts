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

    appliedJobs:any;
    applicantData:any[];
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
        
        this.dService.viewAppliedJobs()
            .subscribe(response => { // On success
            if(response.success){
                this.appliedJobs = response.result[0];
                this.applicantData = response.result[1];
                this.appliedJobs = this.dummy();
            }else {
                K.alert(this.alertCtrl, 'Failed', response.message);
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Failed', 'Sending failed');
            loading.dismiss();
        });

    }

    private dummy(){
        let arr = [];
        for(let i = 0; i < 5; i++){
            arr[i] = {
                job_id: 'Lorem ipsum dolor sit amet, consectetur',
                jobber_comment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptate, explicabo.',
                jobber_exp: 'Lorem ipsum dolor sit amet',
                date_created: '2009/12/03',
            }
        }
        return arr;
    }


}
