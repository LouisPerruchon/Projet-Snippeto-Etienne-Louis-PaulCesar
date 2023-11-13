import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Snippet } from 'src/app/models/snippet';
import { QcmGeneratorService } from 'src/app/services/qcm-generator.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  snippets: Observable<Snippet[]> | undefined;
  snippetsToLearn$ = this.qcmGenerator.snippetsToLearn$;
  constructor(private qcmGenerator: QcmGeneratorService) {}

  ngOnInit(): void {
    this.qcmGenerator.getSnippetsToLearn().subscribe();
  }
}
