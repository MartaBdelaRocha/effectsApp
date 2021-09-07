import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.reducers';
import { cargaUnUsuario } from '../../store/actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit, OnDestroy {

  usuario:Usuario;
  usuarioSubs: Subscription;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }
 

  ngOnInit(): void {

    this.usuarioSubs = this.store.select('usuario').subscribe(({user}) => {

      this.usuario = user;
    });

    this.router.params.subscribe(({id}) =>{
      
      console.log(id);

      this.store.dispatch(cargaUnUsuario({id}));
    });
  }

  ngOnDestroy(): void {
    console.log("OnDestroy")
   this.usuarioSubs.unsubscribe();
  }

}
