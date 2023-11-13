import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Cours } from 'src/app/models/cours';
import { CoursService } from 'src/app/services/cours.service';
import { QcmGeneratorService } from 'src/app/services/qcm-generator.service';

@Component({
  selector: 'app-learn-page',
  templateUrl: './learn-page.component.html',
  styleUrls: ['./learn-page.component.scss'],
})
export class LearnPageComponent implements OnInit {
  cours: Cours[] = [];
  tags: string[] = [
    'the sea is salty',
    'the fish are for sale ',
    'js',
    'html',
    'css',
    'angular',
  ];
  selectedTagsForQcm: string[] = [];
  selectedCoursForQcm: Cours[] = [];
  userInput = new FormControl();
  filteredTagsOptions!: Observable<string[]>;
  filteredCoursOptions!: Observable<Cours[]>;
  isQcmGenerationSubmited: boolean = false;

  constructor(
    private coursService: CoursService,
    private qcmService: QcmGeneratorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coursService.getCourses().subscribe((cours) => {
      this.cours = cours;
      this.filteredTagsOptions = this.userInput.valueChanges.pipe(
        startWith(''),
        map((value) => this.filterTags(value))
      );

      this.filteredCoursOptions = this.userInput.valueChanges.pipe(
        startWith(''),
        map((value) => this.filterCours(value))
      );
    });
  }

  // Tags
  isSelectedTag(tag: string): boolean {
    return this.selectedTagsForQcm.includes(tag);
  }

  toggleSelectedTag(tag: string): void {
    const index = this.selectedTagsForQcm.indexOf(tag);

    if (index !== -1) {
      this.selectedTagsForQcm.splice(index, 1);
    } else {
      this.selectedTagsForQcm.push(tag);
    }
    this.qcmService.getLearningSnippetsFromTags(this.selectedTagsForQcm);
  }

  filterTags(value: string): string[] {
    const filterValue = value.toLowerCase();
    const test = this.tags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
    return test;
  }

  handleTagOptionSelected(option: string): void {
    this.selectedTagsForQcm.push(option);
    this.userInput.setValue('');
    this.qcmService.getLearningSnippetsFromTags(this.selectedTagsForQcm);
  }

  // Cours
  isSelectedCours(selectedCours: Cours): boolean {
    return this.selectedCoursForQcm.includes(selectedCours);
  }

  toggleSelectedCours(seletedCours: Cours): void {
    const index = this.selectedCoursForQcm.indexOf(seletedCours);
    if (index !== -1) {
      this.selectedCoursForQcm.splice(index, 1);
    } else {
      this.selectedCoursForQcm.push(seletedCours);
    }
    this.qcmService.getLearningSnippetsFromCourses(this.selectedCoursForQcm);
  }

  filterCours(value: string): Cours[] {
    const filterValue = value.toLowerCase();
    const test = this.cours.filter((cour) =>
      cour.title.toLowerCase().includes(filterValue)
    );

    return test;
  }

  handleCoursOptionSelected(option: Cours): void {
    this.selectedCoursForQcm.push(option);
    this.userInput.setValue('');
  }

  //https://material.angular.io/components/ripple/examples //mettre ça sur les cards
  //https://material.angular.io/components/chips/overview // remplacer ems chips
  //https://material.angular.io/components/bottom-sheet/overview mettre une option only courses, only tags, random tags , noothign is selectionné (random?)
  //https://material.angular.io/components/tabs/overview faire glisser si cours ou si tags
}
