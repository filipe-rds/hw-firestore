import { Component } from '@angular/core';
import {USUARIOS} from "../../shared/model/USUARIOS";
import {Usuario} from "../../shared/model/usuario";
import {Router} from "@angular/router";
import {UsuarioService} from "../../shared/services/usuario.service";
import {UsuarioRestService} from "../../shared/services/usuario-rest.service";

@Component({
  selector: 'app-listagem-usuario',
  templateUrl: './listagem-usuario.component.html',
  styleUrl: './listagem-usuario.component.scss'
})
export class ListagemUsuarioComponent {

  usuarios: Usuario[] = [];
  constructor(private roteador: Router, private usuarioService: UsuarioRestService) {
    usuarioService.listar().subscribe(
        {
          next: usuariosRetornados => this.usuarios = usuariosRetornados
        }
    );
  }

  remover(usuarioARemover: Usuario) {
    this.usuarioService.remover(usuarioARemover.id).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(usuario => usuario.id != usuarioARemover.id);
        this.roteador.navigate(['listagem-usuarios']);
      }
    });
  }

  editar(usuarioAEditar: Usuario) {
    this.roteador.navigate(['edicao-usuario', usuarioAEditar.id]);
  }
}
