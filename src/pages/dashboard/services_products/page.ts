import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DashboardService } from '../../../app/services/dashboard_service';
import { K } from '../../../app/k/k';

@Component({
  selector: 'page-services-products',
  templateUrl: 'template.html',
  providers: [DashboardService]
})
export class ServicesProductsPage {

    listingID:string;
    servicesAndProducts:string;
    price:string;
    
    listingIDArr:any = [];
    servicesAndProductsArr:any = [];

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController, private dService:DashboardService,
        private loadingCtrl: LoadingController) {

    }

    ngOnInit(){
        this.getListings();
    }

    // Load listings and services & products lists
    getListings(){

        let loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: true
        });
                
        loading.present();
        
        this.dService.retrieveListings()
            .subscribe(response => { // On success
            let result = response.json().result;
            this.listingIDArr = result.load_listings;
            this.servicesAndProductsArr = result.services_and_products;
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Failed', 'Network Error, Listinsgs '
            + 'could not be fetched. Try again');
            loading.dismiss();
        },
        ()=>{   // On completion
            loading.dismiss();
        });

    }

    sendData(){

        let loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: true
        });
                
        loading.present();
        
        this.dService.registerProductsAndServices(this.listingID,
             this.servicesAndProducts, this.price)
            .subscribe(response => { // On success
            K.alert(this.alertCtrl, 'Success', 'Post sent successfully');
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
