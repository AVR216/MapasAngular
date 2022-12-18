import { Component, ElementRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  marker?: mapboxgl.Marker;
  color: string;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styleUrls: ['./marcadores.component.css'],
})
export class MarcadoresComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  nivelZoom: number = 15;
  center: [number, number] = [-73.35526071904046, 5.557286474176473];

  /* Arreglo de marcadores */
  marcadores: MarcadorColor[] = [];

  constructor() {}

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.nivelZoom,
    });
    this.leerLocalStorage();
    /* const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Hola mundo';
    const marker = new mapboxgl.Marker()
      .setLngLat(this.center)
      .addTo(this.mapa);*/
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    this.guardarMarcadoresEnLocalStorage();
  }

  agregarMarcador() {
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color,
    })
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      marker: nuevoMarcador,
      color,
    });

    this.guardarMarcadoresEnLocalStorage();
  }

  irMarcador(marcador: mapboxgl.Marker) {
    this.mapa.flyTo({
      center: marcador.getLngLat()
    });
  }

  guardarMarcadoresEnLocalStorage() {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach( m => {
      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();

      lngLatArr.push( {
        color: color,
        centro: [lng, lat]
      });
    })

    localStorage.setItem( 'marcadores', JSON.stringify( lngLatArr))
  }

  leerLocalStorage(){
    if ( !localStorage.getItem('marcadores') ) {
      return;
    }
    const lngLatArr: MarcadorColor[] = JSON.parse( localStorage.getItem( 'marcadores' )!);

    lngLatArr.forEach( m => {
      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true,

      })
      .setLngLat( m.centro! )
      .addTo( this.mapa )

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      });

    });
  }
}
