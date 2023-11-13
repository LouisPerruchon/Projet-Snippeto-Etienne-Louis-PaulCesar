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
  selectedCoursForQcm: string[] = [];
  userInput = new FormControl();
  filteredTagsOptions!: Observable<string[]>;
  filteredCoursOptions!: Observable<string[]>;
  isQcmGenerationSubmited : boolean =false;

  constructor(private coursService: CoursService, private qcmService: QcmGeneratorService,private router: Router) {
   
  }

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

    
    

    console.log(this.filteredCoursOptions)

  
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
}

filterTags(value: string): string[] {
  const filterValue = value.toLowerCase();
  const test=  this.tags.filter((tag) => tag.toLowerCase().includes(filterValue));

  return test
}

handleTagOptionSelected(option: string): void {
  this.selectedTagsForQcm.push(option);
  this.userInput.setValue('');
  console.log(this.filteredTagsOptions,this.filteredCoursOptions)
  console.log(this.selectedTagsForQcm,this.selectedCoursForQcm)
}

  // Cours
  isSelectedCours(courTitle: string): boolean {
    return this.selectedCoursForQcm.includes(courTitle);
  }

  toggleSelectedCours(courTitle: string): void {
    const index = this.selectedCoursForQcm.indexOf(courTitle);
    if (index !== -1) {
      this.selectedCoursForQcm.splice(index, 1);
    } else {
      this.selectedCoursForQcm.push(courTitle);
    }
  }

  filterCours(value: string): string[] {
    const filterValue = value.toLowerCase();
    const test = this.cours
      .map((c) => c.title)
      .filter((courTitle) => courTitle.toLowerCase().includes(filterValue));
    
      return test

  }

  handleCoursOptionSelected(option: string): void {
    this.selectedCoursForQcm.push(option); 
    this.userInput.setValue('');
  }

  startcourse(){
    this.qcmService.setTags(this.selectedTagsForQcm);
    // this.router.navigate(['/qcm/quizz']);
  }


  //https://material.angular.io/components/ripple/examples //mettre ça sur les cards
  //https://material.angular.io/components/chips/overview // remplacer ems chips
  //https://material.angular.io/components/bottom-sheet/overview mettre une option only courses, only tags, random tags , noothign is selectionné (random?)
  //https://material.angular.io/components/tabs/overview faire glisser si cours ou si tags
}
