import {BasaltRoutes} from "./modules/shared/models/baasti-route.model";
import {
  ManaTrackerComponent
} from './modules/mana-tracker/mana-tracker.component';
import { HomeComponent } from './modules/home/home.component';
import {
  SpellPointTrackerComponent
} from './modules/spell-point-tracker/spell-point-tracker.component';

export const routes: BasaltRoutes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'mana-tracker',
    image: 'mana-tracker-thumbnail.gif',
    background: 'parchment.jpg',
    component: ManaTrackerComponent,
    title: 'Mana Tracker'
  },
  {
    path: 'spell-point-tracker',
    image: 'spell-point-tracker-thumbnail.gif',
    background: 'parchment.jpg',
    component: SpellPointTrackerComponent,
    title: 'Spell Point Tracker'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
