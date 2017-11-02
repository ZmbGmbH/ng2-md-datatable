import {
  Component,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  ContentChild,
  ContentChildren,
  QueryList,
  forwardRef,
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';

import { IDatatableSelectionEvent, IDatatableSortEvent } from './md-datatable.interfaces';
import INetworkRequest from './interfaces/NetworkRequest';
import { BaseComponent } from './helpers';
import { MdDataTableHeaderComponent } from './md-datatable-header.component';
import { MdDataTableRowComponent } from './md-datatable-row.component';
import { MdDatatableStore } from './md-datatable.store';
import { MdDatatableActions } from './md-datatable.actions';

import {
  getCurrentSelection,
  getCurrentSort,
} from './md-datatable.reducer';

let instanceId = 0;

@Component({
  selector: 'ng2-md-datatable',
  template: `
    <table>
      <ng-content></ng-content>
    </table>
  `,
  styleUrls: ['md-datatable.component.scss']
})
export class MdDataTableComponent extends BaseComponent implements AfterContentInit {
  isSelectable = false;

  @Input()
  set selectable(val: any) {
    this.isSelectable = val !== 'false';
  }

  @Output() selectionChange: EventEmitter<IDatatableSelectionEvent>;
  @Output() sortChange: EventEmitter<IDatatableSortEvent>;

  @ContentChild(forwardRef(() => MdDataTableHeaderComponent)) headerCmp: MdDataTableHeaderComponent;
  @ContentChildren(forwardRef(() => MdDataTableRowComponent)) rowsCmp: QueryList<MdDataTableRowComponent>;

  id = `md-datatable-${instanceId++}`;

  private busy: any;

  public progress: number|null = 0;
  public isPreparing = false;
  public hasFailed = false;
  public isBusy = false;

  public get busyInput() {
    return this.busy;
  }

  @Input('busy')
  public set busyInput(value) {
    this.isPreparing = false;
    this.hasFailed = false;
    this.progress = null;
    this.busy = value;

    if (!this.busy) {
      this.isBusy = false;
    }

    if ([typeof this.busy.then, typeof this.busy.catch].every(t => t === 'function')) {
      const promise = this.busy;

      promise.then(() => {
        if (this.busy !== promise) {
          return;
        }

        this.isBusy = false;
      }).catch(() => {
        if (this.busy !== promise) {
          return;
        }

        this.hasFailed = true;
        this.isBusy = false;
      });

      this.isBusy = true;

      return;
    }

    if ([typeof this.busy.onReady, typeof this.busy.on].every(t => t === 'function')) {
      const request = this.busy as INetworkRequest;
      const whenDone = () => {
        if (this.busy !== request) {
          return;
        }

        this.isBusy = false;
      }

      request.onReady(whenDone);
      request.on('progress.send', (e: ProgressEvent) => {
        if (this.busy !== request) {
          return;
        }

        this.isPreparing = true;
      });

      request.on('progress.receive', (e: ProgressEvent) => {
        if (this.busy !== request) {
          return;
        }

        this.isPreparing = false;
        this.progress = (e.loaded / e.total) * 100;
      });

      request.on('failure', (e) => {
        if (this.busy !== request) {
          return;
        }

        this.isBusy = false;
        this.hasFailed = true;
      })
    }

    this.isBusy = true;
  }

  constructor(
    private store: MdDatatableStore,
    private actions: MdDatatableActions,
  ) {
    super();
    this.selectionChange = new EventEmitter<IDatatableSelectionEvent>(true);
    this.sortChange = new EventEmitter<IDatatableSortEvent>(true);
  }

  ngAfterContentInit() {
    // when datatable is selectable, update state with selectable values from content
    if (this.headerCmp && this.rowsCmp) {
      const currentDatatableRows: MdDataTableRowComponent[] = this.rowsCmp.toArray();

      this.store.dispatch(
        this.actions.updateSelectableValues(this.id,
          currentDatatableRows.map((row: MdDataTableRowComponent) => row.selectableValue))
      );

      this.rowsCmp.changes
        .map((query: QueryList<MdDataTableRowComponent>) => query
          .toArray()
          .map((row: MdDataTableRowComponent) => row.selectableValue))
        .takeUntil(this.unmount$)
        .subscribe((selectableValues: string[]) => this.store.dispatch(
          this.actions.updateSelectableValues(this.id, selectableValues)));
    }

    // subscribe to selection changes and emit IDatatableSelectionEvent
    this.store
      .let(getCurrentSelection(this.id))
      .skip(1)
      .takeUntil(this.unmount$)
      .subscribe(this.selectionChange);

    // subscribe to sort changes and emit IDatatableSortEvent
    this.store
      .let(getCurrentSort(this.id))
      .takeUntil(this.unmount$)
      .subscribe(this.sortChange);
  }
}
