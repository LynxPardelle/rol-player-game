import { Routes } from '@angular/router';
import { CharacterComponent } from './components/character/character.component';
import { CharactersComponent } from './components/characters/characters.component';
export const routes: Routes = [
  {
    path: 'list',
    component: CharactersComponent,
  },
  {
    path: 'list/:id',
    component: CharactersComponent,
  },
  {
    path: '',
    component: CharacterComponent,
  },
  {
    path: ':id',
    component: CharacterComponent,
  },
];
