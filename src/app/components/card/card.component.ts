import { Component, OnInit } from '@angular/core';
import { Snippet } from 'src/app/models/snippet';
import { QcmGeneratorService } from 'src/app/services/qcm-generator.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  snippets: Snippet[] = [];
  constructor(private qcmGenerator: QcmGeneratorService) {
    this.snippets = qcmGenerator.getSnippetsFromTags();
    console.log(this.snippets)
    }

  ngOnInit(): void {}
}
