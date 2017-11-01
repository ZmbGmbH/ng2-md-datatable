import {
  Component,
  AfterViewInit,
  Optional,
  Inject,
  forwardRef,
} from '@angular/core';

import { MatCheckboxChange } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { async } from 'rxjs/scheduler/async';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/takeUntil';

import { BaseComponent } from './helpers';
import { MdDataTableComponent } from './md-datatable.component';
import { MdDataTableColumnComponent } from './md-datatable-column.component';

import { MdDatatableStore } from './md-datatable.store';
import { areAllRowsSelected } from './md-datatable.reducer';
import { MdDatatableActions } from './md-datatable.actions';

@Component({
  selector: 'ng2-md-datatable-header',
  template: `
    <tr>
      <th *ngIf="selectable" class="md-data-check-cell">
        <mat-checkbox [checked]="allChecked$ | async" (change)="onAllCheckedChange($event)"></mat-checkbox>
      </th>
      <ng-content></ng-content>
    </tr>
    <mat-progress-bar [hidden]="hideProgress" [color]="progressColor" [mode]="progressMode" [value]="progressValue"></mat-progress-bar>
  `,
  styleUrls: ['md-datatable-header.component.scss']
})
export class MdDataTableHeaderComponent extends BaseComponent implements AfterViewInit {
  allChecked$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get selectable(): boolean {
    return this.table && this.table.isSelectable;
  }

  private datatableId: string;

  get progressColor() {
    if (this.table.hasFailed) {
      return 'warn';
    }

    return 'primary';
  }

  get progressMode() {
    if (typeof this.table.progress === 'number' || this.table.hasFailed) {
      return 'determinate';
    }

    if (this.table.isPreparing) {
      return 'query';
    }

    return 'indeterminate';
  }

  get hideProgress() {
    return !this.table.hasFailed && !this.table.isBusy;
  }

  get progressValue() {
    if (this.table.hasFailed) {
      return 100;
    }

    return this.table.progress;
  }

  constructor(
    @Optional() @Inject(forwardRef(() => MdDataTableComponent)) private table: MdDataTableComponent,
    private store: MdDatatableStore,
    private actions: MdDatatableActions,
  ) {
    super();
  }

  ngAfterViewInit() {
    this.datatableId = this.table!.id;

    this.store
      .let(areAllRowsSelected(this.datatableId))
      .takeUntil(this.unmount$)
      .subscribe(this.allChecked$);
  }

  onAllCheckedChange(e: MatCheckboxChange) {
    this.store.dispatch(this.actions.toggleSelectAll(this.datatableId, e.checked));
  }
}
