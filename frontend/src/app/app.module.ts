import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BookmarkedComponent } from './components/bookmarked/bookmarked.component';
import { HttpClientModule } from '@angular/common/http';
import { ReadMangaComponent } from './components/read-manga/read-manga.component'
import { BottomBarComponent } from './components/bottom-bar/bottom-bar.component';
import { InfoMangaComponent } from './components/info-manga/info-manga.component';
import { FooterComponent } from './components/footer/footer.component';
import { MangaGenresComponent } from './components/manga-genres/manga-genres.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavMenuComponent,
    BookmarkedComponent,
    ReadMangaComponent,
    BottomBarComponent,
    InfoMangaComponent,
    FooterComponent,
    MangaGenresComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
