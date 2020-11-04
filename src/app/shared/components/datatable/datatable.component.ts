import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableComponent {

  items: any
  filterError: boolean
  total: number;
  page: number = 1

  limitEnabled: boolean = true                            //limit - wyłączenie
  sortEnabled: boolean = true                             //sortowanie - wyłączenie
  filterEnabled: boolean = true                           //filtrowanie - wyłączenie
  limit: number = 10                                      //paginacja - ilość rekordów na stronie
  limitValues: number[] = [5,10,20]                       //paginacja - wartości
  sortBy: string                                          //sortowanie - kolumna
  order: string = "asc"                                   //sortowanie - kierunek
  filters: any = {}                                       //filtrowanie - objekt z filtrami
  filterMinLength: number = 3                             //filtrowanie - minimalna ilość znaków
  filterOneSign: string[] = []                            //filtrowanie - tablica właściwości do filtrowania po jednym znaku
  onRefresh() {}

  ngOnInit() {
    this.onRefresh()
  }

  onPrev() {
    this.page -= 1
    this.onRefresh()
  }

  onNext() {
    this.page += 1
    this.onRefresh()
  }

  onSort(column: string) {
    if (column != "" && this.sortEnabled) {
      if(this.total > 0) {
        let sort_direction = "asc"
        if (this.order == "asc") sort_direction = "desc"
        this.sortBy = column 
        this.order = sort_direction      
        this.onRefresh()  
      }
    }
  }

  getSortClass(column: string) {
    if(this.sortBy == column) {
      if(this.order == 'asc') return "&darr;"
      if(this.order == 'desc') return "&uarr;"
    }
    return "&darr;"
  }

  getTotalPage() {
    if (this.total == 0) {
      return 1;
    }

    return Math.ceil(this.total / this.limit)
  }

  onChangeLimit(event: number) {
    this.limit = event
    this.page = 1
    this.onRefresh()
  }

  onFilter(f:NgForm) {
    let formValues = {}
    this.filterError = false
    for (const [key, value] of Object.entries(f.value)) {
      if(value) {
        if(value.toString().length < this.filterMinLength && !this.filterOneSign.includes(key.toString())) {
          this.filterError = true
          break
        }
      }

      if(f.value[key]) formValues[key] = value 
    }

    this.filters = formValues

    if(Object.keys(formValues).length > 0) {
      this.onRefresh()
    } else {
      this.onFilterReset()
    }
  }

  onFilterReset() {
    this.filters = {}
    this.onRefresh()
  }
}
