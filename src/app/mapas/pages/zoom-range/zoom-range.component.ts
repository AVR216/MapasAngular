import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
      .mapa-container {
        height: 100%;
        width: 100%;
      }

      .row {
        background-color: white;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        border-radius: 5px;
        position: fixed;
        z-index: 999;
      }
    `,
  ],
})
export class ZoomRangeComponent implements AfterViewInit {

  mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef; //trabajar con el viweChild permite tener multiples instancias de los mapas y que no dependan del id.
  nivelZoom: number = 10;

  constructor() {
  }

  ngAfterViewInit(): void {
    //Se hace en este método porque es cuando divMapa tiene valor
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-73.35526071904046, 5.557286474176473],
      zoom: this.nivelZoom,
    });
  }

  zoomIn() {
    this.mapa.zoomIn();
    this.nivelZoom = this.mapa.getZoom();
  }

  zoomOut() {
    this.mapa.zoomOut();
    this.nivelZoom = this.mapa.getZoom();
  }
}
