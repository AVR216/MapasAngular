import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.css'],
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  mapa!: mapboxgl.Map;
  @ViewChild('mapa') divMapa!: ElementRef; //trabajar con el viweChild permite tener multiples instancias de los mapas y que no dependan del id.
  nivelZoom: number = 10;

  //centro del mapa
  center: [number, number] = [-73.35526071904046, 5.557286474176473];

  constructor() {}

  ngAfterViewInit(): void {
    //Se hace en este método porque es cuando divMapa tiene valor
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.nivelZoom,
    });

    //listener para cuando hay cambios en el mapa
    this.mapa.on('zoom', (ev) => {
      this.nivelZoom = this.mapa.getZoom();
    });

    //restringir el zoom
    this.mapa.on('zoomend', (ev) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18);
      }
    });

    //listener para las coordenadas cuando se mueve el mapa
    this.mapa.on('move', ( ev ) => {
      const target = ev.target;
      const { lng, lat } = target.getCenter();
      this.center = [ lng, lat ];
    });
  }

  ngOnDestroy(): void {
    //Destruir los listener cuando se destruye el componente
    this.mapa.off('zoom',  () => {});
    this.mapa.off('zoomend',  () => {});
    this.mapa.off('move',  () => {});
  }

  zoomIn() {
    this.mapa.zoomIn();
  }

  zoomOut() {
    this.mapa.zoomOut();
  }

  zoomCambio ( value: string ) {
    this.mapa.zoomTo( +value );
  }
}
