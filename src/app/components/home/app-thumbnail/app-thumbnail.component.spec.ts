import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppThumbnailComponent } from './app-thumbnail.component';

describe('AppThumbnailComponent', () => {
  let component: AppThumbnailComponent;
  let fixture: ComponentFixture<AppThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppThumbnailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
