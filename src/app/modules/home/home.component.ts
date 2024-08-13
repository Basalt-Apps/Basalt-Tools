import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BasaltRoute, BasaltRoutes } from '../shared/models/baasti-route.model';
import { AppThumbnailComponent } from './components/app-thumbnail/app-thumbnail.component';

@Component({
  selector: 'basalt-home',
  standalone: true,
  imports: [CommonModule, AppThumbnailComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public applications!: BasaltRoutes;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    this.applications = (this.router.config as BasaltRoutes).filter(
      (route: BasaltRoute) => !!route.title,
    );
  }
}
