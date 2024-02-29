export class User {
  id: string; // Si vous avez un identifiant dans votre modèle, sinon, vous pouvez le retirer
  nom: string;
  prenom: string;
  mail: string;
  mdp: string;
  role: number;
  etat: number;
  confirmMdp: string;

  constructor(
    id: string,
    nom: string,
    prenom: string,
    mail: string,
    mdp: string,
    role: number,
    confirmMdp: string,
    etat: number
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.mail = mail;
    this.mdp = mdp;
    this.role = role;
    this.etat = etat;
    this.confirmMdp = confirmMdp;
  }
}
