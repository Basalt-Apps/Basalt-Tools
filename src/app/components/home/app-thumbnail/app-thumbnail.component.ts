import {Component, Input, OnInit} from '@angular/core';
import {BRoute} from "../../../models/baasti-route.model";

@Component({
  selector: 'app-app-thumbnail',
  standalone: true,
  imports: [],
  templateUrl: './app-thumbnail.component.html',
  styleUrl: './app-thumbnail.component.scss'
})
export class AppThumbnailComponent implements OnInit {
  @Input() app!: BRoute;

  ngOnInit(): void {
    console.log(this.app.background)
  }


}
