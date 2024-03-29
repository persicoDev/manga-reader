import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkedComponent } from './components/bookmarked/bookmarked.component';
import { HomeComponent } from './components/home/home.component';
import { ReadMangaComponent } from './components/read-manga/read-manga.component';
import { InfoMangaComponent } from './components/info-manga/info-manga.component';
import { MangaGenresComponent } from './components/manga-genres/manga-genres.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bookmarked', component: BookmarkedComponent},
  { path: 'manga-genres', component: MangaGenresComponent},
  { path: 'read/:id', component: ReadMangaComponent },
  { path: 'manga/:id', component: InfoMangaComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
