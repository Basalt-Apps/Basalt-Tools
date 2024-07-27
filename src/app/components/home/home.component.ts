import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {BRoute, BRoutes} from "../../models/baasti-route.model";
import {CommonModule} from "@angular/common";
import {AppThumbnailComponent} from "./app-thumbnail/app-thumbnail.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AppThumbnailComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public applications!: BRoutes;

  constructor(
    private router: Router
  ) {
  }

  public ngOnInit(): void {
    this.applications = (this.router.config as BRoutes)
      .filter((route: BRoute) => !!route.title)
  }


}
