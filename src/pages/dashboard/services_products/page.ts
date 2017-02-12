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
        });
                
        loading.present();
        
        this.dService.retrieveListings()
            .subscribe(response => { // On success
            if(response.success){
                let result = response.result;
                this.listingIDArr = result.load_listings;
                this.servicesAndProductsArr = result.services_and_products;
            }else{
                K.alert(this.alertCtrl, 'Failed', 'Date retrieval failed');
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Failed', 'Network Error, Listinsgs '
            + 'could not be fetched. Try again');
            loading.dismiss();
        });

    }

    sendData(){

        let loading = this.loadingCtrl.create({
            content: 'Loading...',
        });
                
        loading.present();
        
        this.dService.registerProductsAndServices(this.listingID,
             this.servicesAndProducts, this.price)
            .subscribe(response => { // On success
            if(response.success){
                K.alert(this.alertCtrl, 'Success', 'Post sent successfully');
                this.clearFields();
            }else{
                K.alert(this.alertCtrl, 'Failed', response.message);
            }
            loading.dismiss();
        },
        (err: any) => { // on error
            K.alert(this.alertCtrl, 'Failed', 'Sending failed');
            loading.dismiss();
        });

  }

  clearFields(){
    this.listingID = '';
    this.servicesAndProducts = '';
    this.price = '';
  }


}
