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
  @Output() isLearningOver: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isFlipped: boolean = false;
  public allQuizzSnippets: Snippet[] = [];
  public currentSnippet!: Snippet;
  public currentIndex: number = 0;
  public startQuizz: boolean = false;
  private snippetsToLearn$: Observable<Snippet[]> =
    this.qcmGenerator.snippetsToLearn$;

  constructor(private qcmGenerator: QcmGeneratorService) {}

  ngOnInit(): void {
    this.qcmGenerator.getSnippetsToLearn().subscribe();
    this.snippetsToLearn$.subscribe((snippets: Snippet[]) => {
      this.allQuizzSnippets = snippets;

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

  public Start(): void {
    this.startQuizz = this.allQuizzSnippets.length !== 0 ? true : false;
  }

  public flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }

  public getWrong(): void {
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

  public getRight(): void {
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
