import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../model/user.model';
import { base_url } from '../../utils/url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
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
    return this.http.get<User[]>(`${base_url}/managers/users`, { params: params });
  }

  // Méthode pour créer un nouvel utilisateur
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${base_url}/managers/users`, user);
  }

  // Méthode pour récupérer un utilisateur par son ID
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${base_url}/managers/users/${userId}`);
  }

  // Méthode pour mettre à jour un utilisateur
  updateUser(userId: string, updatedUser: User): Observable<User> {
    return this.http.put<User>(`${base_url}/managers/users/${userId}`, updatedUser);
  }

  // Méthode pour supprimer un utilisateur
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${base_url}/managers/users/${userId}`);
  }
}
