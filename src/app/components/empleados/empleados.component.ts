import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { EmpleadosService } from '../../services/empleados.service';
import { Empleados } from '../../models/empleados';
import { formatCurrency } from '@angular/common';

/**
 * Variable para las notificaciones de MaterializeCSS
 * la variable M existe en los JS de MaterializeCSS
 */
declare var M: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  constructor(public empleadoService: EmpleadosService) { }

  ngOnInit(): void {
    this.getEmpleados();
  }

  /**
   * Funcion que recibe lo datos del formulario y los manda guardar al API
   * @param empleadoForm 
   */
  addEmpleado(empleadoForm: NgForm) {
    if (empleadoForm.value._id) {
      this.empleadoService.updateEmpleado(empleadoForm.value)
        .subscribe(
          res => {
            M.toast({ html: 'Empleado guardado correctamente' });
            this.getEmpleados();
          },
          err => {
            M.toast({ html: 'Error al actualizar empleado' });
            console.log(err);
          }
        );
    } else {
      this.empleadoService.addEmpleado(empleadoForm.value)
        .subscribe(
          res => {
            M.toast({ html: 'Empleado guardado correctamente' });
            this.getEmpleados();
          },
          err => {
            M.toast({ html: 'Error al guardar empleado' });
            console.log(err);
          }
        );
    }
    empleadoForm.reset();
  }

  /**
   * Funcion que reinicia los valores del formulario
   * @param empleadoForm 
   */
  resetForm(empleadoForm?: NgForm) {
    if (empleadoForm) {
      empleadoForm.reset();
    }
    this.empleadoService.empleado = new Empleados;
  }

  /**
   * Funcion que obtiene los empleados de la api 
   * y los carga en la variable empleados del empleadoService
   */
  getEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      res => {
        this.empleadoService.empleados = res as Empleados[];
        console.log(res);
      },
      err => {
        M.toast({ html: 'Error al guardar empleado' });
        console.log(err);
      }
    );
  }

  /**
   * Funcion que recibe un objeto empleado, se asigna a 
   * la variable del servicio y se carga en el formulario
   * @param empleado 
   */
  editarEmpleado(empleado: Empleados) {
    this.empleadoService.empleado = empleado;
  }

  /**
   * Funcion que recibe el id de un empleado y 
   * lo manda eliminar de la API
   * @param _id 
   */
  eliminarEmpleado(_id: String) {
    if (confirm('¿Esta seguro de eliminar el registro?')) {
      this.empleadoService.deleteEmpleado(_id)
        .subscribe(
          res => {
            M.toast({ html: 'Empleado eliminado correctamente' });
            this.getEmpleados();
          },
          err => {
            M.toast({ html: 'Hubo un error al eliminar el empleado' });
            console.log(err);
          }
        );
    }
  }

}
