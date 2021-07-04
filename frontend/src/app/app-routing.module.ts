import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BookmarkedComponent } from './components/bookmarked/bookmarked.component';
import { ReadMangaComponent } from './components/read-manga/read-manga.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'bookmarked', component: BookmarkedComponent },
  { path: 'manga/:manga.id', component: ReadMangaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
