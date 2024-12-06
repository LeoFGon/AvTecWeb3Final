import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Manutencao } from '../../manutencao';
import { ManutencaoService } from '../../manutencao.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  manutencao_id!: number;
  manutencao!: Manutencao;
  form!: FormGroup;
  constructor(
    public manutencaoService: ManutencaoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      assunto: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
    this.manutencao_id = this.route.snapshot.params['Id'];
    this.manutencaoService.buscar(this.manutencao_id).subscribe((data: Manutencao) => {
    this.manutencao = data;
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.manutencaoService.atualizar(this.manutencao_id, this.form.value).subscribe((res: any) => {
      console.log('Manutenção atualizada com sucesso!');
      this.router.navigateByUrl('/principal');
    })
  }
}
