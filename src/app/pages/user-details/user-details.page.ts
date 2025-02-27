import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class UserDetailsPage implements OnInit {
  user: any;
  isFavorite: boolean = false;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUser(id).subscribe({
        next: (user: any) => {
          this.user = user;
          this.checkFavorite();
          this.loading = false;
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
          this.presentAlert(error);
        }
      });
    }
  }

  checkFavorite() {
    const favorites = localStorage.getItem('favorites');
    if (favorites) {
      const favoriteUsers = JSON.parse(favorites);
      this.isFavorite = favoriteUsers.some((favorite: any) => favorite.id === this.user.id);
    }
  }

  toggleFavorite() {
    let favorites = localStorage.getItem('favorites');
    let favoriteUsers: any[] = favorites ? JSON.parse(favorites) : [];

    if (this.isFavorite) {
      favoriteUsers = favoriteUsers.filter((favorite: any) => favorite.id !== this.user.id);
    } else {
      favoriteUsers.push(this.user);
    }

    localStorage.setItem('favorites', JSON.stringify(favoriteUsers));
    this.isFavorite = !this.isFavorite;
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}