import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarkedComponent } from './components/bookmarked/bookmarked.component';
import { HomeComponent } from './components/home/home.component';
import { ReadMangaComponent } from './components/read-manga/read-manga.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bookmarked', component: BookmarkedComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'manga/:id', component: ReadMangaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
