import { Component, Input } from '@angular/core';
import { BasaltRoute } from '../../../shared/models/baasti-route.model';

@Component({
  selector: 'basalt-app-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './app-thumbnail.component.html',
  styleUrl: './app-thumbnail.component.scss',
})
export class AppThumbnailComponent {
  @Input() app!: BasaltRoute;
}
