import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { HireBarberPage } from '../hirebarber/hirebarber';
import { BarberSchoolPage } from '../barber_school/barber_school';
import { BarberShopsPage } from '../barbershops/barbershops';
import { NailCarePage } from '../nailcare/nailcare';
import { SearchBarberShopPage } from '../search/search';
import { ForumPage } from '../forum/forum';
import { AppointmentPage } from '../appointment/appointment';
import { ContactUsPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
    
  }

  gotoSearch(){
    this.navCtrl.push(SearchBarberShopPage);
  } 
  hireBaber(){
    this.navCtrl.push(HireBarberPage);
  } 
  barberSchool(){
    this.navCtrl.push(BarberSchoolPage);
  }
  barberShop(){
    this.navCtrl.push(BarberShopsPage);
  }
  nailcare(){
    this.navCtrl.push(NailCarePage);
  }
  gotoForum(){
    this.navCtrl.push(ForumPage);
  }
  bookAppointment(){
    this.navCtrl.push(AppointmentPage);
  }
  contactUs(){
    this.navCtrl.push(ContactUsPage);
  }

}
