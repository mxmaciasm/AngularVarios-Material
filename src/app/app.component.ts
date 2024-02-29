import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
})



export class AppComponent implements OnInit {
  myControl = new FormControl(''); //ReactiveFormsModule dentro de ngModule
  options: string[] = ['One', 'Two', 'Three', 'Four', 'Five'];
  filteredOptions: Observable<string[]> | undefined;

  //con tuplas
  myControl2 = new FormControl('');
  options2: [number, string][] = [
    [0, "Matematicas"],
    [1, "Fisica"],
    [2, "Quimica"],
    [3, "Programacion"],
    [4, "Base Datos"]
  ];
  filteredOptions2: Observable<[number, string][]> | undefined;

  // Ya tenemos acceso al observable valueChanges incorporado en FormControl, 
  // por lo que podemos simplemente asignar los valores de entrada de texto a las opciones sugeridas pasándolos a través de este filtro. 
  // El Observable resultante, filteredOptions, se puede agregar a la plantilla en la propiedad de opciones usando la pipe asíncrona.

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe( //valueChanges emite un evento cada vez que el valor del control es llamado.
      startWith(''),
      map(value => this._filter(value || '')), //el evento es filtrar la lista y colocar lo filtrado en filteredOptions el cual es mostrado en el ngFor en el html
    );

    //con tuplas
    this.filteredOptions2 = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value => this._filter2(value || '')),
    );
  }

  // Filtra options con un valor string
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  //con tuplas
  private _filter2(value: string): [number, string][] {
    const filterValue = value.toLowerCase();
    return this.options2.filter(option => option[1].toLowerCase().includes(filterValue));
  }
}
