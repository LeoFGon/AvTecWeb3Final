import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Manutencao } from '../../manutencao';
import { ManutencaoService } from '../../manutencao.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css'
})
export class PrincipalComponent implements OnInit {
  lista_manutencao: Manutencao[] = [];
  constructor(public manutencaoService: ManutencaoService) { }

  ngOnInit(): void {
    this.manutencaoService.getAll().subscribe((data: Manutencao[]) => {
      this.lista_manutencao = data;
      console.log(this.lista_manutencao);
    })
  }
  apagarManutencao(manutencao_id:number){
    this.manutencaoService.apagar(manutencao_id).subscribe(res => {
    this.lista_manutencao = this.lista_manutencao.filter(item => item.manutencao_id !== manutencao_id);
    console.log('Manutenção removida da lista!');
    })
  }


}
