import { Component, inject, OnInit, signal } from '@angular/core';
import { ShopService } from '../../core/services/shop.service';
import { Product } from '../../shared/models/product';
import { ProductItemComponent } from "./product-item/product-item.component";
import { MatDialog } from '@angular/material/dialog';
import { FiltersDialogComponent } from './filters-dialog/filters-dialog.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { MatListOption, MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { ShopParams } from '../../shared/models/shopParams';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../shared/models/pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shop',
  imports: [
    ProductItemComponent,
    MatButton,
    MatIcon,
    MatMenu,
    MatSelectionList,
    MatListOption,
    MatMenuTrigger,
    MatPaginator,
    FormsModule,
    MatIconButton
],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit{
  private shopService = inject(ShopService);
  private dialogService = inject(MatDialog)
  products = signal<Pagination<Product> | null>(null);
  sortOptions = [
    {name: 'Alphabétique', value: 'name'},
    {name: 'Prix: croissant', value: 'priceAsc'},
    {name: 'Prix: décroissant', value: 'priceDesc'}
  ]
  shopParams = signal(new ShopParams);
  pageSizeOptions = [5, 10, 15, 20];
  searchTerm = '';

  ngOnInit(): void {
    this.initializeShop();
  }

  initializeShop(){
    this.shopService.getColors();
    this.shopService.getTypes();
    this.getProducts();
  }

  getProducts() {
    this.shopService.getProducts(this.shopParams()).subscribe({
      next: response => this.products.set(response),
      error: error => console.log(error)
    })
  }

  onSearchChange(){
      this.shopParams.update(params => ({ 
        ...params,
        search: this.searchTerm,
        pageNumber: 1
      }));
    this.getProducts();
  }

  handlePageEvent(event: PageEvent) {
    this.shopParams.update(params => ({
        ...params,
        pageNumber: event.pageIndex + 1,
        pageSize: event.pageSize
      }));
    this.getProducts();
  }

  onSortChange(event: MatSelectionListChange) {
    const selectedOption = event.options[0];
    if (selectedOption) {
      this.shopParams.update(params => ({
        ...params,
        sort: selectedOption.value,
        pageNumber: 1
      }));
      this.getProducts();
    }
  }

  openFiltersDialog() {
    const dialogRef = this.dialogService.open(FiltersDialogComponent, {
      minHeight: '500px',
      data: {
        selectedColors: this.shopParams().colors,
        selectedTypes: this.shopParams().types
      }
    });
    dialogRef.afterClosed().subscribe({
      next: result => {
        if (result) {
            this.shopParams.update(params => ({
              ...params,
              colors: result.selectedColors,
              types: result.selectedTypes,
              pageNumber: 1
            }));
          this.getProducts();
        }
      }
    })
  }
}
