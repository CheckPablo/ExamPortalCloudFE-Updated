import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { from } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Location } from '../content/maps/services/services.component';

declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {
  private geocoder: any;

  constructor(private mapLoader: MapsAPILoader) {}

  private initGeocoder() {
    
    this.geocoder = new google.maps.Geocoder();
  }

  private waitForMapsToLoad(): Observable<boolean> {
    if (!this.geocoder) {
      return from(this.mapLoader.load()).pipe(
        tap(() => this.initGeocoder()),
        map(() => true)
      );
    }
    return of(true);
  }

  geocodeAddress(location: string): Observable<Location> {
    
    return this.waitForMapsToLoad().pipe(
      // filter(loaded => loaded),
      switchMap(() => {
        return new Observable<Location>(observer => {
          this.geocoder.geocode({ address: location }, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
              
              observer.next({
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              });
            } else {
              
              observer.next({ lat: 0, lng: 0 });
            }
            observer.complete();
          });
        });
      })
    );
  }
}
