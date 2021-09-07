import { Action, createReducer, on } from '@ngrx/store';
import { cargarUsuarioError, cargarUsuarioSuccess, cargaUnUsuario } from '../actions/usuario.actions';
import { Usuario } from '../../models/usuario.model';

export interface UsuarioState {
    id: string
    user: Usuario,
    loaded: boolean,
    loading: boolean,
    error:any
}

export const usuarioInitialState: UsuarioState = {

    id: null, 
    user: null,
    loaded: false,
    loading: false,
    error:null
}

const _usuarioReducer = createReducer(usuarioInitialState,

    on(cargaUnUsuario, (state: any, {id}: any) => ({ ...state, loading:true, id:id})),

    on(cargarUsuarioSuccess, (state,{usuario}) => ({
        ...state,
        loading:false,
        loaded:true,
        user: usuario
    })),

    on(cargarUsuarioError, (state,{payload}) => ({
        ...state,
        loading:false,
        loaded:false,
        //error:payload
        error: {           //Extramos la info que porta el catchError que nos interesa
            url: payload.url,
            name: payload.name,
            message: payload.message

        }
    }))

);

export function usuarioReducer(state: UsuarioState, action: Action) {
    return _usuarioReducer(state, action);
}