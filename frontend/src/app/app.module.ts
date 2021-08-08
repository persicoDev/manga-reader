import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { BookmarkedComponent } from './components/bookmarked/bookmarked.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MangaItemComponent } from './components/manga-item/manga-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ReadMangaComponent } from './components/read-manga/read-manga.component' 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { CarouselComponent } from './components/carousel/carousel.component';


@NgModule ({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    BookmarkedComponent,
    MangaItemComponent,
    ReadMangaComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    FlexLayoutModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FontAwesomeModule,
    HttpClientModule,
    MatCarouselModule.forRoot(),
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
