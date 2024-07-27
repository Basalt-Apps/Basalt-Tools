import {Route} from "@angular/router";

export type BRoute = Route & {
  title?: string;
  image?: string;
  background?: string;
}

export type BRoutes = BRoute[];

