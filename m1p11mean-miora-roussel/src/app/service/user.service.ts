import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; // Importez HttpParams pour construire les paramètres de requête
import { Observable } from 'rxjs';
import { User } from '../model/user.model'; // Assurez-vous d'importer le modèle User approprié

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api_user'; // Assurez-vous que l'URL correspond à votre API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les utilisateurs avec recherche avancée
  getUsers(keyword: string, nom: string, prenom: string, mail: string, role: string, etat: string, page: string, limit: string): Observable<User[]> {
    // Construire les paramètres de requête
    let params = new HttpParams();
    params = params.append('keyword', keyword);
    params = params.append('nom', nom);
    params = params.append('prenom', prenom);
    params = params.append('mail', mail);
    params = params.append('role', role);
    params = params.append('etat', etat);
    params = params.append('page', page);
    params = params.append('limit', limit);

    // Effectuer la requête HTTP avec les paramètres de requête
    return this.http.get<User[]>(`${this.apiUrl}/users`, { params: params });
  }

  // Méthode pour créer un nouvel utilisateur
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user);
  }

  // Méthode pour récupérer un utilisateur par son ID
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`);
  }

  // Méthode pour mettre à jour un utilisateur
  updateUser(userId: string, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${userId}`, updatedUser);
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${userId}`);
  }
}
