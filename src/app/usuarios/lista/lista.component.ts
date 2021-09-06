import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor( public usuarioServices: UsuarioService) { }

  ngOnInit(): void {

    this.usuarioServices.getUsers().subscribe(users =>{
      
        console.log(users);
        this.usuarios = users;
    });

  }

}
