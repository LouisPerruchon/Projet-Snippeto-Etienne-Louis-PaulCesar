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
  snippetsToLearn$ :  Observable<Snippet[]> = this.qcmGenerator.snippetsToLearn$;
  currentSnippet : Snippet | undefined;
  constructor(private qcmGenerator: QcmGeneratorService) {}

  ngOnInit(): void {
    this.qcmGenerator.getSnippetsToLearn().subscribe();
    this.snippetsToLearn$.subscribe((snippets: Snippet[]) => {
      if (snippets && snippets.length > 0) {
        this.currentSnippet = snippets[0];
      }
    });
  }

  getRight(){
    this.qcmGenerator.getSnippetsToLearn().subscribe();
    this.snippetsToLearn$.subscribe((snippets: Snippet[]) => {
      if (snippets && snippets.length > 0) {
        this.currentSnippet = snippets[0];
      }
  })
}
}
