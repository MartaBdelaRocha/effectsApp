import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import * as usuarioActions from "../actions/usuario.actions";
import { UsuarioService } from '../../services/usuario.service';
import { of } from "rxjs";



@Injectable()
export class UsuarioEffects{

    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ){}

    cargarUsuario$ = createEffect (
        () => this.actions$.pipe(
            ofType( usuarioActions.cargaUnUsuario),
            //tap(data => console.log('effect tap', data)),
            mergeMap( 
                (action) => this.usuariosService.getUserById(action.id)
                    .pipe(
                        //tap(data => console.log('getUsers effect', data))
                        map(user => usuarioActions.cargarUsuarioSuccess({usuario:user})),
                        catchError(error => of(usuarioActions.cargarUsuarioError({payload: error})))
                    )
            )
        )
    );

}