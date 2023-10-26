import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursListComponent } from './components/cours-list/cours-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { CoursListItemComponent } from './components/cours-list-item/cours-list-item.component';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { CoursListItemSnippetComponent } from './components/cours-list-item-snippet/cours-list-item-snippet.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SnippetCreationDialogComponent } from './components/snippet-creation-dialog/snippet-creation-dialog.component';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
@NgModule({
  declarations: [
    AppComponent,
    CoursListComponent,
    HeaderComponent,
    CoursListItemComponent,
    CoursListItemSnippetComponent,
    SidebarComponent,
    SnippetCreationDialogComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    HttpClientModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    FormsModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
