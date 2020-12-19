import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Banner } from '../../interfaces/banner.interface';
import { BannerService } from '../../services/banner.service';

@Component({
  selector: 'banner-widget',
  templateUrl: './banner-widget.component.html',
  styleUrls: ['./banner-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class BannerWidgetComponent implements OnInit {

  @Input() name = 'banner-main';
  @Input() class: string;
  banner$: Observable<Banner>;
  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {
    this.banner$ = this.bannerService.get().pipe(
      map(banners => banners.find(banner => banner.name === this.name)),
    );
  }

}
