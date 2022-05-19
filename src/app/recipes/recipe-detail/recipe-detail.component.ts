import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router,} from '@angular/router';
import {RecipesService} from 'src/app/Recipes.service';
import {Recipe} from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    //setting the route id dynamically.
    this.route.params.subscribe((params: Params) => {
      //+ turns string into number.
      this.id = +params['id'];
      //getting new recipe.
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  onAddToShoppingLIst() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'])
  }
}
