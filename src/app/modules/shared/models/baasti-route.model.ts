import { Route } from '@angular/router';

export type BasaltRoute = Route & {
  title?: string;
  image?: string;
  background?: string;
};

export type BasaltRoutes = BasaltRoute[];
