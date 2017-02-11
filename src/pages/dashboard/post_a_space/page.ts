import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { DashboardService } from '../../../app/services/dashboard_service';
import { K } from '../../../app/k/k';

@Component({
  selector: 'page-post-rent-space',
  templateUrl: 'template.html',
  providers: [DashboardService]
})
export class PostRentSpacePage {

    spaceTitle:string;
    amount:string;
    location:string;
    image:string;
    type:string;
    size:string;
    phone:string;
    email:string;
    description:string;

    POST_A_BARBERSHOP_SPACE:number = 0;
    RENT_A_BARBERSHOP_SPACE:number = 1;
    activePost:number = 0;

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController, private dService:DashboardService,
        private loadingCtrl: LoadingController) {

    }

    ngOnInit(){
        
    }

    chooseAction(index:number){
        this.activePost = index;
    }

    post_rent_space(){

        let loading = this.loadingCtrl.create({
            content: 'Loading...',
            dismissOnPageChange: true
        });
                
        loading.present();
        let postData = {
            spaceTitle: this.spaceTitle,
            amount: this.amount,
            location: this.location,
            type: this.type,
            size: this.size,
            phone: this.phone,
            email: this.email,
            description: this.description,
        };
        
        let serv =  null;
        if(this.activePost == this.POST_A_BARBERSHOP_SPACE){
            serv = this.dService.post_space(postData);
        }else{
            serv = this.dService.rent_space(postData);
        }

        serv.post_space(postData)
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
