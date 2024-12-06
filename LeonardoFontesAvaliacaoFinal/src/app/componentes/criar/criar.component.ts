import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManutencaoService } from '../../manutencao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar.component.html',
  styleUrl: './criar.component.css'
})
export class CriarComponent implements OnInit {
  form!: FormGroup;
  constructor(public manutencaoService: ManutencaoService, private router: Router) { }
  ngOnInit(): void {
    this.form = new FormGroup({
      assunto: new FormControl('', [Validators.required]),
      data: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required])
    });
  }
  get f() {
    return this.form.controls;
  }
  submit() {
    console.log(this.form.value);
    this.manutencaoService.criar(this.form.value).subscribe((res: any) => {
      console.log('Agendamento de manutenção criado com sucesso!');
      this.router.navigateByUrl('/principal');
    })
  }
}
