import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  private showOverlays = signal(false);

  public getShowOverlays(): Signal<boolean> {
    return this.showOverlays.asReadonly();
  }

  public setShowOverlays(val: boolean): void {
    this.showOverlays.set(val);
  }
}
