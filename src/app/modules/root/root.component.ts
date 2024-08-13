import { Component, OnInit, Signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { OverlayService } from './services/overlay.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'basalt-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
})
export class RootComponent implements OnInit {
  public showOverlays!: Signal<boolean>;

  constructor(private overlayService: OverlayService) {}

  public ngOnInit(): void {
    this.showOverlays = this.overlayService.getShowOverlays();
  }
}
