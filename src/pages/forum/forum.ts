import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { GeneralService } from '../../app/services/general_service';
import { K } from '../../app/k/k';

@Component({
  selector: 'page-forum',
  templateUrl: 'forum.html'
})
export class ForumPage {

    posts: any = [];

    constructor(public navCtrl: NavController,
        private loadingCtrl: LoadingController, 
        private alertCtrl: AlertController, 
        private genService: GeneralService) {
        
    }

    ngOnInit(){

        let loading = this.loadingCtrl.create({
           content: 'Loading...',
           dismissOnPageChange: true
        });

        loading.present();
        
        let ret = this.genService.getForumPosts();
        
        if(ret._isScalar == false){
            loading.dismiss();
            K.alert(this.alertCtrl, 'Error:', 'Could not connect to server');
            return;
        }

        ret.subscribe(response => {
            loading.dismiss();
            this.posts = response.json();            
        });
    }



}