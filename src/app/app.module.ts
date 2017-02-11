import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashbaord';
import { ContactUsPage } from '../pages/contact/contact';
import { HireBarberPage } from '../pages/hirebarber/hirebarber';
import { DetailsModal } from '../pages/hirebarber/detail/detail';
import { ApplyModal } from '../pages/hirebarber/apply/apply';
import { BarberSchoolPage } from '../pages/barber_school/barber_school';
import { BarberShopsPage } from '../pages/barbershops/barbershops';
import { NailCarePage } from '../pages/nailcare/nailcare';
import { SearchBarberShopPage } from '../pages/search/search';
import { AppointmentPage } from '../pages/appointment/appointment';
import { BarberSchoolListsPage } from '../pages/barber_school/barber_school_lists/barber_school_lists';
import { ForumPage } from '../pages/forum/forum';

import { PostAJobPage } from '../pages/dashboard/post_a_job/page';
import { PostRentSpacePage } from '../pages/dashboard/post_a_space/page';
import { ServicesProductsPage } from '../pages/dashboard/services_products/page';
import { SignupPage } from '../pages/dashboard/signup/signup';
import { ViewAppliedJobsPage } from '../pages/dashboard/view_applied_jobs/page';
import { ViewPostedJobsPage } from '../pages/dashboard/view_posted_jobs/page';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    DashboardPage,
    ContactUsPage,
    HireBarberPage,
    DetailsModal,
    ApplyModal,
    BarberSchoolPage,
    BarberShopsPage,
    NailCarePage,
    ForumPage,
    SearchBarberShopPage,
    AppointmentPage,
    BarberSchoolListsPage,
    PostAJobPage,
    PostRentSpacePage,
    ServicesProductsPage,
    SignupPage,
    ViewAppliedJobsPage,
    ViewPostedJobsPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomePage,
    DashboardPage,
    ContactUsPage,
    HireBarberPage,
    DetailsModal,
    ApplyModal,
    BarberSchoolPage,
    BarberShopsPage,
    NailCarePage,
    ForumPage,
    SearchBarberShopPage,
    AppointmentPage,
    BarberSchoolListsPage,
    PostAJobPage,
    PostRentSpacePage,
    ServicesProductsPage,
    SignupPage,
    ViewAppliedJobsPage,
    ViewPostedJobsPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
      Storage]
})
export class AppModule {}
