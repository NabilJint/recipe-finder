import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoriteService } from 'src/app/services/favorite.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: any;
  isFavorite: boolean | undefined;
  favorites: any[] = [];

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private FavoriteService: FavoriteService) { }

  ngOnInit(): void {
    this.getRecipeDetails();

    // Check the local storage for the favorite state
    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipes) {
      this.favorites = JSON.parse(favoriteRecipes);
    }

    // Set the favorite state of the recipe
    this.isFavorite = this.favorites.findIndex((r) => r.id === this.recipe.id) !== undefined;
  }

  getRecipeDetails() {
    const recipeId = this.route.snapshot.paramMap.get('id');
    this.recipeService.getRecpeDetails(recipeId).subscribe((data: any) => {
      this.recipe = data;
    });
  }

  toggleFavorite() {
    if (this.isFavorite) {
      this.FavoriteService.removeFromFavorites(this.recipe);
    } else {
      this.FavoriteService.addToFavorite(this.recipe);
    }

    // Update the favorites array in the component
    this.favorites = this.FavoriteService.getFavoriteRecipes();

    this.isFavorite = !this.isFavorite;

    // Save the favorite state to localStorage
    this.FavoriteService.saveFavoriteState();
  }
}
