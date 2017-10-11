import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

import { MatSelectChange } from '@angular/material';

import { BaseComponent } from './helpers';
import { IDatatablePaginationEvent } from './md-datatable.interfaces';

@Component({
  selector: 'ng2-md-datatable-pagination',
  template: `
    <span>Rows per page:</span>
    <mat-select [ngModel]="itemsPerPage" (change)="onSelectChange($event)" class="pagination__itemsPerPage">
      <mat-option *ngFor="let choice of itemsPerPageChoices"
        [value]="choice">{{ choice }}</mat-option>
    </mat-select>
    <span class="pagination__range">{{firstIndexOfPage}}-{{lastIndexOfPage}} of {{itemsCount}}</span>
    <div class="pagination__controls">
      <button mat-icon-button
        (click)="onClickFirst()"
        aria-label="First">
        <mat-icon>first_page</mat-icon>
      </button>
      <button mat-icon-button
        [disabled]="isPreviousButtonEnabled"
        (click)="onClickPrevious()"
        aria-label="Previous">
        <mat-icon>navigate_before</mat-icon>
      </button>
      <button mat-icon-button
        [disabled]="isNextOrLastButtonEnabled"
        (click)="onClickNext()"
        aria-label="Next">
        <mat-icon>navigate_next</mat-icon>
      </button>
      <button mat-icon-button
        [disabled]="isNextOrLastButtonEnabled"
        (click)="onClickLast()"
        aria-label="Last">
        <mat-icon>last_page</mat-icon>
      </button>
    </div>
  `,
  styleUrls: ['md-datatable-pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MdDataTablePaginationComponent extends BaseComponent implements OnInit {
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  @Input() itemsCount: number;
  @Input() itemsPerPageChoices: Array<number> = [5, 10, 20, 50];
  @Input() itemsPerPageFirstChoice = 10;

  @Output() paginationChange: EventEmitter<IDatatablePaginationEvent>;

  get firstIndexOfPage() {
    return this.currentPage * this.itemsPerPage - this.itemsPerPage + 1;
  }

  get lastIndexOfPage() {
      const maxLastIndexOnPage = this.currentPage * this.itemsPerPage;
      return maxLastIndexOnPage >= this.itemsCount ? this.itemsCount : maxLastIndexOnPage;
  }

  get isPreviousButtonEnabled() {
    return this.firstIndexOfPage === 1;
  }

  get isNextOrLastButtonEnabled() {
    return this.lastIndexOfPage >= this.itemsCount;
  }

  constructor() {
    super();
    this.paginationChange = new EventEmitter<IDatatablePaginationEvent>(true);
  }

  ngOnInit() {
    // set defaults values if not provided
    if (!this.currentPage) {
      this.currentPage = 1;
    }

    if (!this.itemsPerPage) {
      this.itemsPerPage = this.itemsPerPageFirstChoice;
    }

    if (!this.itemsCount) {
      this.itemsCount = 0;
    }
  }

  onSelectChange(event: MatSelectChange) {
    this.paginationChange.emit(<IDatatablePaginationEvent>{
      page: 1,
      itemsPerPage: Number(event.value),
    });
  }

  onClickFirst() {
    this.paginationChange.emit(<IDatatablePaginationEvent>{
      page: 1,
      itemsPerPage: this.itemsPerPage,
    });
  }

  onClickLast() {
    const lastPage = Math.ceil(this.itemsCount / this.itemsPerPage);

    this.paginationChange.emit(<IDatatablePaginationEvent>{
      page: lastPage,
      itemsPerPage: this.itemsPerPage,
    });
  }

  onClickPrevious() {
    this.paginationChange.emit(<IDatatablePaginationEvent>{
      page: this.currentPage - 1,
      itemsPerPage: this.itemsPerPage,
    });
  }

  onClickNext() {
    this.paginationChange.emit(<IDatatablePaginationEvent>{
      page: this.currentPage + 1,
      itemsPerPage: this.itemsPerPage,
    });
  }
}
