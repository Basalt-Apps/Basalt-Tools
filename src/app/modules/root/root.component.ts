import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'basalt-root',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss'
})
export class RootComponent {

}
