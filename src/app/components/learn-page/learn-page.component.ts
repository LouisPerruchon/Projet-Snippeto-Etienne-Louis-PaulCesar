import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Cours } from 'src/app/models/cours';
import { Snippet } from 'src/app/models/snippet';
import { CoursService } from 'src/app/services/cours.service';
import { QcmGeneratorService } from 'src/app/services/qcm-generator.service';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.scss'],
})
export class LearnPageComponent implements OnInit {
  public cours: Cours[] = [];
  public tags: string[] = [];
  public tagsInput = new FormControl();
  public coursInput = new FormControl();
  public filteredTagsOptions!: Observable<string[]>;
  public filteredCoursOptions!: Observable<Cours[]>;

  private selectedTagsForQcm: string[] = [];
  private selectedCoursForQcm: Cours[] = [];

  constructor(
    private coursService: CoursService,
    private qcmService: QcmGeneratorService
  ) {}

  ngOnInit(): void {
    this.coursService.getCourses().subscribe((cours: Cours[]) => {
      this.cours = cours;
      cours.forEach((cours: Cours) => {
        cours.snippets.forEach((snippet: Snippet) => {
          snippet.tags.forEach((tag: string) => {
            if (!this.tags.includes(tag)) {
              this.tags.push(tag);
            }
          });
        });
      });
    });

    this.filteredTagsOptions = this.tagsInput.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filterTags(value))
    );
    this.filteredCoursOptions = this.coursInput.valueChanges.pipe(
      startWith(''),
      map((value: string) => this.filterCours(value))
    );
  }

  public resetSelectedSnippets(isLearningFinished: boolean): void {
    if (isLearningFinished) {
      this.selectedCoursForQcm = [];
      this.selectedTagsForQcm = [];
    }
  }

  public isSelectedTag(tag: string): boolean {
    return this.selectedTagsForQcm.includes(tag);
  }

  public isSelectedCours(cours: Cours): boolean {
    return this.selectedCoursForQcm.includes(cours);
  }

  public toggleSelectedTag(tag: string): void {
    const index = this.selectedTagsForQcm.indexOf(tag);

    if (index !== -1) {
      this.selectedTagsForQcm.splice(index, 1);
    } else {
      this.selectedTagsForQcm.push(tag);
    }
    this.selectedCoursForQcm = [];
    this.qcmService.getLearningSnippetsFromTags(this.selectedTagsForQcm);
  }

  private filterTags(tagValue: string): string[] {
    const filterValue = tagValue.toLowerCase();
    return this.tags.filter((tag) => tag.toLowerCase().includes(filterValue));
  }

  public handleTagOptionSelected(selectedTag: string): void {
    this.selectedTagsForQcm.push(selectedTag);
    this.tagsInput.setValue('');
    this.selectedCoursForQcm = [];
    this.qcmService.getLearningSnippetsFromTags(this.selectedTagsForQcm);
  }

  public toggleSelectedCours(seletedCours: Cours): void {
    const index = this.selectedCoursForQcm.indexOf(seletedCours);
    if (index !== -1) {
      this.selectedCoursForQcm.splice(index, 1);
    } else {
      this.selectedCoursForQcm.push(seletedCours);
    }
    this.selectedTagsForQcm = [];
    this.qcmService.getLearningSnippetsFromCourses(this.selectedCoursForQcm);
  }

  private filterCours(coursTitle: string): Cours[] {
    const filterValue = coursTitle ? coursTitle.toLowerCase() : '';
    return this.cours.filter((cour) =>
      cour.title.toLowerCase().includes(filterValue)
    );
  }

  public handleCoursOptionSelected(selectedCours: Cours): void {
    this.selectedCoursForQcm.push(selectedCours);
    this.coursInput.setValue('');
    this.selectedTagsForQcm = [];
    this.qcmService.getLearningSnippetsFromCourses(this.selectedCoursForQcm);
  }
}
