import { BannerName } from './../enums/banner-name.enum';
export interface Banner {
    idBanner: string
    name: BannerName
    imgUrl: string
    url?: string
    backgroundColor: string
}
