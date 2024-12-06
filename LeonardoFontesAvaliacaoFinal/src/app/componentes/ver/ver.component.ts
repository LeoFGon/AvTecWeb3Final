import { Component, OnInit } from '@angular/core';
import { Manutencao } from '../../manutencao';
import { ManutencaoService } from '../../manutencao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ver',
  standalone: true,
  imports: [],
  templateUrl: './ver.component.html',
  styleUrl: './ver.component.css'
})
export class VerComponent implements OnInit{
  manutencao_id!: number;

  manutencao!: Manutencao;

  constructor(
    public manutencaoService: ManutencaoService,
    private route: ActivatedRoute,
    private router: Router
   ) { }

  ngOnInit(): void {
    this.manutencao_id = this.route.snapshot.params['Id'];
    this.manutencaoService.buscar(this.manutencao_id).subscribe((data: Manutencao)=>{
      this.manutencao = data;
    });
  }

}
