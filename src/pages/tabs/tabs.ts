import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { DashboardPage } from '../dashboard/dashbaord';
import { ContactUsPage } from '../contact/contact';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = DashboardPage;
  tab3Root: any = ContactUsPage;

  constructor() {

  }
}
