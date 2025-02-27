import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class FavoritesPage implements OnInit {
  favorites: any[] = [];

  constructor() { }

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      this.favorites = JSON.parse(favorites);
    }
  }
}