import {HomeComponent} from "./components/home/home.component";
import {ManaTrackerComponent} from "./components/mana-tracker/mana-tracker.component";
import {BRoutes} from "./models/baasti-route.model";

export const routes: BRoutes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'mana-tracker',
    image: 'mana-tracker.gif',
    background: 'parchment.jpg',
    component: ManaTrackerComponent,
    title: 'Mana Tracker'
  },
  // {
  //   path: 'spell-tracker',
  //   component: WIPComponent,
  //   title: 'Spell Point Tracker'
  // },
  // {
  //   path: 'WIP',
  //   component: WIPComponent,
  //   title: 'WIP'
  // },
  // {
  //   path: 'WIP',
  //   component: WIPComponent,
  //   title: 'WIP'
  // },
  // {
  //   path: 'WIP',
  //   component: WIPComponent,
  //   title: 'WIP'
  // },
  // {
  //   path: 'WIP',
  //   component: WIPComponent,
  //   title: 'WIP'
  // },
  {
    path: '**',
    redirectTo: '/'
  }
];
