import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Empleados } from '../models/empleados';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  readonly url = 'http://localhost:3000/api/empleados';

  empleado: Empleados;
  empleados: Empleados[];

  constructor(private httpClient: HttpClient) {
    this.empleado = new Empleados();
    this.empleados = new Array();
  }

  /**
   * Obtiene los datos de todos los empleados de la BD
   * @returns 
   */
  getEmpleados() {
    return this.httpClient.get(this.url);
  }

  /**
   * Agrega un empleado a la BD con los datos dados
   * @param empleado 
   * @returns 
   */
  addEmpleado(empleado: Empleados) {
    return this.httpClient.post(this.url, empleado);
  }

  /**
   * Actualiza la informacion de un empleado dado
   * @param empleado 
   * @returns 
   */
  updateEmpleado(empleado: Empleados) {
    return this.httpClient.put(`${this.url}/${empleado._id}`, empleado);
  }

  /**
   * Elimina un empleado de la BD con un id dado 
   * @param _id 
   * @returns 
   */
  deleteEmpleado(_id: String) {
    return this.httpClient.delete(`${this.url}/${_id}`);
  }

}
