import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingService} from '../ShoppingService.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  // storing subscription to a property to clean it up
  private subscription: Subscription;

  constructor(private ShoppingService: ShoppingService) {
  }

  ngOnInit(): void {
    this.ingredients = this.ShoppingService.getIngredients();
    this.subscription = this.ShoppingService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
