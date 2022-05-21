import {Injectable} from '@angular/core';
import {Recipe} from './recipes/recipe.model';
import {Ingredient} from './shared/ingredient.model';
import {ShoppingService} from './ShoppingService.service';
import {Subject} from "rxjs";

@Injectable()
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>()


  private recipes: Recipe[] = [
    new Recipe(
      'Ribs',
      'BBQ ribs',
      'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Mac n Cheese', 1)]
    ),
    new Recipe(
      'Smash burgers',
      'tatsy smash burgers.',
      'https://assets.epicurious.com/photos/5c745a108918ee7ab68daf79/1:1/w_2560%2Cc_limit/Smashburger-recipe-120219.jpg',
      [new Ingredient('Buns', 2), new Ingredient('meat', 2)]
    ),
  ];

  constructor(private ShoppingService: ShoppingService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  //method to get recipe id for route id.
  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.ShoppingService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice())
  }
}
