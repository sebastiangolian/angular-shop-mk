import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DatatableComponent } from './datatable.component';

@Component({
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatatableSearchComponent extends DatatableComponent {

  limitEnabled = false

  ngOnInit() {}

  onSort(column: string) {
    if (Object.keys(this.filters).length == 0) return
    super.onSort(column)
  }

  onFilterReset() {
    this.filters = {}
    this.items = null
  }
}
