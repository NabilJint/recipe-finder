import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/services/favorite.service';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-favrite',
  templateUrl: './favrite.component.html',
  styleUrls: ['./favrite.component.scss']
})
export class FavriteComponent implements OnInit{
favoriteRecipes:any[]=[]

constructor( private FavoriteService:FavoriteService){}
  ngOnInit(): void {
   this.getFavourite();
   console.log(this.favoriteRecipes);
   
  }

  getFavourite(){
    this.favoriteRecipes = this.FavoriteService.getFavoriteRecipes();
  }
  removeFromFavorites(recipe:any) {
    this.FavoriteService.removeFromFavorites(recipe);
    this.getFavourite();
  }
  
}
