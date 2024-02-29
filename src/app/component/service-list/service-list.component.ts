import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ServiceService } from '../../service/service/service.service';
import { MatDialog } from '@angular/material/dialog';
import { ServiceDialogComponent } from '../service-dialog/service-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { base_url } from '../../utils/url';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css'],
})
export class ServiceListComponent implements OnInit {
  serveur = base_url + '/uploads/';
  pageSize = 2;
  pageIndex = 0;
  servicesOnCurrentPage: any[] = [];
  isLoading: boolean = true;

  updateServicesOnCurrentPage() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.servicesOnCurrentPage = this.services.slice(start, end);
  }

  nextPage() {
    this.pageIndex++;
    this.updateServicesOnCurrentPage();
  }

  previousPage() {
    this.pageIndex--;
    this.updateServicesOnCurrentPage();
  }

  services: any[] = [];
  service_detail: any;
  recherche = { nom: '', prix: '', delai: '', commission: '' };
  displayedColumns: string[] = [
    'nom',
    'prix',
    'delai',
    'commission',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private serviceService: ServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.listeservices();
  }

  listeservices() {
    this.isLoading = true;
    this.serviceService.getAllServices().subscribe(
      (data: any[]) => {
        this.services = data;
        this.updateServicesOnCurrentPage();
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  rechercherServices() {
    this.isLoading = true;
    const query: { [key: string]: any } = {};

    if (this.recherche.nom) {
      query['nom'] = this.recherche.nom;
    }

    if (this.recherche.prix) {
      query['prix'] = this.recherche.prix;
    }

    if (this.recherche.delai) {
      query['delai'] = this.recherche.delai;
    }

    if (this.recherche.commission) {
      query['commission'] = this.recherche.commission;
    }

    this.serviceService.searchService(query).subscribe(
      (data: any[]) => {
        this.services = data;
        this.updateServicesOnCurrentPage();
        this.isLoading = false;
      },
      (error) => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  openModalService(service: any) {
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '500px',
      data: { service: service, isNew: false },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.listeservices();
    });
  }
  creerService() {
    const dialogRef = this.dialog.open(ServiceDialogComponent, {
      width: '500px',
      data: { service: {}, isNew: true },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.listeservices();
    });
  }

  supprimerService(service: any) {
    this.serviceService.deleteService(service._id).subscribe(
      (response) => {
        console.log('Service supprimé avec succès', response);
        this.listeservices();
      },
      (error) => {
        console.error('Erreur lors de la mise à jour du service', error);
      }
    );
  }
}
