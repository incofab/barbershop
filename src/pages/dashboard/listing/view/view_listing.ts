import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DashboardService } from '../../../../app/services/dashboard_service';
import { K } from '../../../../app/k/k';

@Component({
  selector: 'view-listing-page',
  templateUrl: 'view_listing.html',
  providers: [DashboardService]
})
export class ViewListingsPage {

    allPostedJobs:any; 

    constructor(public navCtrl: NavController,private alertCtrl: AlertController, 
        private dService:DashboardService, private loadingCtrl: LoadingController) {

    }

    ngOnInit(){
        this.loadAll_PostedJobs();
    }

    loadAll_PostedJobs(){
    
        let loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
                
        loading.present();
    
        this.dService.getAllPostedJobs()
            .subscribe(response => { // On success
            if(response.success){
                this.allPostedJobs = response.result;
            }else{
                K.alert(this.alertCtrl, 'Failed', 'Data retrieval Failed');
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Network Error', 'Data retrieval Failed');
            loading.dismiss();
        });

  }


}
