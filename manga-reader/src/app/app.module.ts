import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { BookmarkedComponent } from './components/bookmarked/bookmarked.component';
import { MangaItemComponent } from './components/manga-item/manga-item.component';
import { HttpClientModule } from '@angular/common/http';
import { ReadMangaComponent } from './components/read-manga/read-manga.component'
import { CarouselComponent } from './components/carousel/carousel.component';
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    BookmarkedComponent,
    MangaItemComponent,
    ReadMangaComponent,
    CarouselComponent,
    BottomBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
