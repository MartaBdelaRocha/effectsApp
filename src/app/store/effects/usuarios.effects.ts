import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, tap } from "rxjs/operators";
import * as usuariosActions from "../actions/usuarios.actions";
import { UsuarioService } from '../../services/usuario.service';
import { of } from "rxjs";



@Injectable()
export class UsuariosEffects{

    constructor(
        private actions$: Actions,
        private usuariosService: UsuarioService
    ){}

    cargarUsuarios$ = createEffect (
        () => this.actions$.pipe(
            ofType( usuariosActions.cargarUsuarios ),
            //tap(data => console.log('effect tap', data)),
            mergeMap( 
                () => this.usuariosService.getUsers()
                    .pipe(
                        //tap(data => console.log('getUsers effect', data))
                        map(users => usuariosActions.cargarUsuariosSuccess({usuarios:users})),
                        catchError(error => of(usuariosActions.cargarUsuariosError({payload: error})))
                    )
            )
        )
    );

}