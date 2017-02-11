import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';

@Component({
  selector: 'barber-school-lists-page',
  templateUrl: 'barber_school_lists.html',
})
export class BarberSchoolListsPage {

    schools: any;
    constructor(public navCtrl: NavController, private navParams: NavParams,
        private alertCtrl: AlertController, private genService:GeneralService) {
    }

    ngOnInit(){
        this.schools = this.navParams.get('schools');
    }

    openDetails(index: number){
        console.log(this.schools[index]);
    }


}

