import {Component, Input, OnInit} from '@angular/core';
import { BasaltRoute } from '../../../shared/models/baasti-route.model';

@Component({
  selector: 'basalt-app-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './app-thumbnail.component.html',
  styleUrl: './app-thumbnail.component.scss'
})
export class AppThumbnailComponent implements OnInit {
  @Input() app!: BasaltRoute;

  ngOnInit(): void {
    console.log(this.app.background)
  }


}
