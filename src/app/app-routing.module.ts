import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipesComponent} from './recipes/recipes.component';

import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {AuthComponent} from "./auth/auth.component";
import {AuthGaurd} from "./auth/auth.gaurd";

const routes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'shoppinglist', component: ShoppingListComponent},
  {
    //child routing below.
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGaurd],
    children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent},
      {path: ':id/edit', component: RecipeEditComponent},
    ],
  },
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
