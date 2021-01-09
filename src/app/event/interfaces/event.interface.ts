import { Photo } from './../../photo/interfaces/photo.interface';
export interface Event {
  idEvent: string;
  name: string;
  titlePhoto: Photo;
  description: string;
}
