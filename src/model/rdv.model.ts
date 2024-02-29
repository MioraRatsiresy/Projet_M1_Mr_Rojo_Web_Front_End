export interface RendezVous {
    _id: string;
    idClient: string;
    idEmploye: string;
    dateheuredebut: Date;
    dateheurefin: Date;
    prix: number;
    service: {
      _id: string;
      nom: string;
      prix: number;
      delai: number;
      commission: number;
      etat: number;
    };
    status: number;
    etat: number;
  }
  