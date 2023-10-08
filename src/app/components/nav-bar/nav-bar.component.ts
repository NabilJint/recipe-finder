import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from 'src/app/services/favorite.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  favoriteRecipes:any[]=[];
  constructor(private router:Router,private FavoriteService: FavoriteService,private cdr: ChangeDetectorRef){
    this.FavoriteService.favoritesChanged.subscribe(() => {
      this.favoriteRecipes = this.FavoriteService.getFavoriteRecipes();
    });

    this.favoriteRecipes = this.FavoriteService.getFavoriteRecipes();
  }

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}