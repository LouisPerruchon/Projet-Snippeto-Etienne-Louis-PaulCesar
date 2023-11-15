import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Snippet } from 'src/app/models/snippet';
import { QcmGeneratorService } from 'src/app/services/qcm-generator.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  isFlipped: boolean = false;

  flipCard() {
    this.isFlipped = !this.isFlipped;
  }
  snippetsToLearn$: Observable<Snippet[]> = this.qcmGenerator.snippetsToLearn$;
  allQuizzSnippets: Snippet[] = [];
  currentSnippet!: Snippet;
  currentIndex: number = 0;
  startQuizz: boolean = false;
  @Output() isLearningOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private qcmGenerator: QcmGeneratorService) {}

  ngOnInit(): void {
    this.qcmGenerator.getSnippetsToLearn().subscribe();
    this.snippetsToLearn$.subscribe((snippets: Snippet[]) => {
      if (snippets && snippets.length > 0) {
        this.allQuizzSnippets = snippets;
      }

      //define currentSnippet (firstSnippet)
      if (!this.currentSnippet) {
        this.currentSnippet = this.allQuizzSnippets[0];
      }
      //define current index if exists
      if (this.allQuizzSnippets && this.currentSnippet) {
        this.currentIndex = this.allQuizzSnippets.indexOf(this.currentSnippet);
      }
    });
  }

  Start() {
    this.startQuizz = this.allQuizzSnippets.length !== 0 ? true : false;
  }

  getWrong() {
    if (this.allQuizzSnippets) {
      this.currentIndex = this.currentIndex + 1;
      if (this.isFlipped) {
        this.flipCard();
      }
      if (this.allQuizzSnippets[this.currentIndex]) {
        this.currentSnippet = this.allQuizzSnippets[this.currentIndex];
      } else {
        this.currentIndex = 0;
        this.currentSnippet = this.allQuizzSnippets[this.currentIndex];
      }
    }
  }

  getRight() {
    if (this.allQuizzSnippets) {
      if (this.isFlipped) {
        this.flipCard();
      }
      if (this.allQuizzSnippets[this.currentIndex + 1]) {
        this.allQuizzSnippets.splice(this.currentIndex, 1);
        this.currentSnippet = this.allQuizzSnippets[this.currentIndex];
      } else {
        this.allQuizzSnippets.splice(this.currentIndex, 1);
        this.currentIndex = 0;
        this.currentSnippet = this.allQuizzSnippets[this.currentIndex];
        if (this.allQuizzSnippets.length == 0) {
          this.isLearningOver.emit(true);
          this.startQuizz = false;
        }
      }
    }
  }
}
