import { Component } from '@angular/core';
import {Usuario} from "../../shared/model/usuario";
import {ActivatedRoute, Router} from "@angular/router";
import { UsuarioService } from "../../shared/services/usuario.service";
import {UsuarioRestService} from "../../shared/services/usuario-rest.service";
import Swal from "sweetalert2";
import {MensagemSweetService} from "../../shared/services/mensagem-sweet.service";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './manter-usuario.component.html',
  styleUrl: './manter-usuario.component.scss'
})
export class ManterUsuarioComponent {

  usuario = new Usuario('1', '', 0);
  modoEdicao = false;

  constructor(private roteador: Router, private rotaAtual: ActivatedRoute,
              private usuarioService: UsuarioRestService, private mensagemService: MensagemSweetService) {
    const idParaEdicao = rotaAtual.snapshot.paramMap.get('id');
    if (idParaEdicao) {
      this.modoEdicao = true;
      usuarioService.listar().subscribe({
        next: (usuarios) => {
          const usuarioAEditar = usuarios.find(usuario => usuario.id === idParaEdicao);
          if (usuarioAEditar) {
            this.usuario = usuarioAEditar;
          }
        }
      });
    }
  }

  inserir() {
    if (!this.modoEdicao) {
      this.usuarioService.inserir(this.usuario).subscribe({
        next: () => {
          this.mensagemService.sucesso('Usuário inserido com sucesso!');
          this.roteador.navigate(['listagem-usuarios']);
        }
      });
    } else {
      this.usuarioService.atualizar(this.usuario).subscribe({
        next: () => {
          this.mensagemService.sucesso('Usuário atualizado com sucesso!');
          this.roteador.navigate(['listagem-usuarios']);
        }
      });
    }
  }


}
