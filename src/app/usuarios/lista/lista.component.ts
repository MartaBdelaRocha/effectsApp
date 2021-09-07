import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargarUsuarios } from '../../store/actions/usuarios.actions';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];
  loading: boolean = false;
  error:any;

  constructor( 
    /*public usuarioServices: UsuarioService*/
    private store: Store<AppState>
    ) { }

  ngOnInit(): void {

    // this.usuarioServices.getUsers().subscribe(users =>{
      
    //     console.log(users);
    //     this.usuarios = users;
    // });

    //CAMBIAMOS LA FORMA DE TRAER DATOS, LO HAREMOS MEDIANTE EFECTOS
    this.store.dispatch(cargarUsuarios());

    this.store.select('usuarios').subscribe(({users, loading, error}) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    })
  }

}
