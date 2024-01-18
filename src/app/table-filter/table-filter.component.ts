import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';

export interface Employee {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  gender: string,
  jobtitle: string,
  department: string
}
export interface EmpFilter {
  name: string;
  options: string[];
  defaultValue: string;
}
export interface filterOption {
  name: string;
  value: string;
  isdefault: boolean;
}

@Component({
  selector: 'app-table-filter',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './table-filter.component.html',
  // styleUrl: './table-filter.component.css'
})

export class TableFilterComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'email', 'gender', 'jobtitle', 'department'];

  EmpData: Employee[] = [{ "id": 1, "firstname": "Mellie", "lastname": "Gabbott", "email": "mgabbott0@indiatimes.com", "gender": "Female", "department": "Support", "jobtitle": "Support Analyst" },
  { "id": 2, "firstname": "Yehudi", "lastname": "Ainsby", "email": "yainsby1@w3.org", "gender": "Female", "department": "Support", "jobtitle": "Support Analyst" },
  { "id": 3, "firstname": "Noellyn", "lastname": "Primett", "email": "nprimett2@ning.com", "gender": "Female", "department": "Human Resources", "jobtitle": "Project Manager" },
  { "id": 4, "firstname": "Stefanie", "lastname": "Yurenin", "email": "syurenin3@boston.com", "gender": "Female", "department": "Marketing", "jobtitle": "Senior officer" },
  { "id": 5, "firstname": "Stormi", "lastname": "O'Lunny", "email": "solunny4@patch.com", "gender": "Female", "department": "Engineering", "jobtitle": "Software Engineer" },
  { "id": 6, "firstname": "Keelia", "lastname": "Giraudy", "email": "kgiraudy5@nba.com", "gender": "Male", "department": "Marketing", "jobtitle": "Senior officer" },
  { "id": 7, "firstname": "Ikey", "lastname": "Laight", "email": "ilaight6@wiley.com", "gender": "Male", "department": "Support", "jobtitle": "Support Analyst" },
  { "id": 8, "firstname": "Adrianna", "lastname": "Ruddom", "email": "aruddom7@seattletimes.com", "gender": "Male", "department": "Marketing", "jobtitle": "Senior officer" },
  { "id": 9, "firstname": "Dionysus", "lastname": "McCory", "email": "dmccory8@ox.ac.uk", "gender": "Male", "department": "Engineering", "jobtitle": "Software Engineer" },
  { "id": 10, "firstname": "Claybourne", "lastname": "Shellard", "email": "cshellard9@rediff.com", "gender": "Male", "department": "Engineering", "jobtitle": "Software Engineer" }];

  genders: string[] = ['All', 'Male', 'Female'];
  jobtitles: string[] = ['All', 'Support Analyst', 'Project Manager', 'Senior officer', 'Software Engineer'];
  departments: string[] = ['All', 'Support', 'Human Resources', 'Marketing', 'Engineering'];
  empFilters: EmpFilter[] = [];

  defaultValue = "All";

  filterDictionary = new Map<string, string>();



  dataSource = new MatTableDataSource(this.EmpData);
  dataSourceFilters = new MatTableDataSource(this.EmpData);

  constructor() {
  }


  ngOnInit(): void {

    //Para filtrar multiples columnas, Asegúrese de que la propiedad del nombre del filtro coincida con la propiedad de la columna de la tabla Employee
    //Por ejemplo, tenemos un filtro llamado gender y debe coincidir con el nombre de propiedad de gender de la interfaz del Employee.
    this.empFilters.push({ name: 'gender', options: this.genders, defaultValue: this.defaultValue });
    this.empFilters.push({ name: 'jobtitle', options: this.jobtitles, defaultValue: this.defaultValue });
    this.empFilters.push({ name: 'department', options: this.departments, defaultValue: this.defaultValue });

    // si queremos filtrar los registros de empleados por género, debemos cambiar el mecanismo de filtrado predeterminado de comportamiento utilizando el predicado de filtro MatTableDataSource
    // Cuando asignamos mat-table filterPredicate con un nuevo comportamiento, para cada registro se llamará a la función de filterPredicate, se verificará la condición requerida y se devolverá verdadero o falso
    // El elemnto es el siguiente: <table mat-table [dataSource]="dataSourceFilters" 
    this.dataSourceFilters.filterPredicate = function (record, filter) {

      //Si queremos filtrar los registros de empleados por Gender, debemos cambiar el mecanismo de filtrado predeterminado de comportamiento utilizando el predicado de filtro MatTableDataSource.
      //return record.Gender.toLocaleLowerCase() == filter.toLocaleLowerCase();

      // Si devolvemos verdadero en la función filterPredicate, todos los registros se mostrarán independientemente del valor del filtro.
      //return true;

      debugger;
      var map = new Map(JSON.parse(filter));
      let isMatch = false;
      for (let [key, value] of map) {
        isMatch = (value == "All") || (record[key as keyof Employee] == value);
        if (!isMatch) return false;
      }
      //If one of the property is not equal we should remove it from the resulting table records (return false
      return isMatch;
    }



  }
  // Al cambiar la selección, llamo a la función applyEmpFilter.
  // So to pass multiple columns filters, I have created a typescript Map (filterDictionary) which accepts key value pair of column values.
  // For example if we select gender as male in the dropdown, we will set the Map with the values (“gender”,“Male”).
  // As it’s a dictionary every time the gender value will be updated based on drop down values.
  // As we have three filters in our mat-table, the dictionary contains at most three values.
  // After that we will convert the Map to JSON string and assign it to MatTableDataSource filter
  applyEmpFilter(ob: MatSelectChange, empfilter: EmpFilter) {

    this.filterDictionary.set(empfilter.name, ob.value);
    var jsonString = JSON.stringify(Array.from(this.filterDictionary.entries()));
    this.dataSourceFilters.filter = jsonString;//MatTableDataSource filter accepts only strings
    //console.log(this.filterValues);
  }

  //Aplica un filtro donde escribo una letra y busca la cadena en todas las columnas
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // Actualizamos el filtro mat-table datasource al valor de entrada de la busqueda
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // When we pass filter string to MatTableDataSource, Internally mat-table data source uses a function which will will concatenate all the column values and convert them to lowercase
  }
}
