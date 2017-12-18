import { async, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatSelectModule, MatButtonModule, MatIconModule } from '@angular/material';
import { MdDataTablePaginationComponent } from './md-datatable-pagination.component';

describe('MdDataTablePaginationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
      ],
      declarations: [
        MdDataTablePaginationComponent,
      ],
    }).compileComponents();
  }));

  it('should create the component', async(() => {
    const fixture = TestBed.createComponent(MdDataTablePaginationComponent);
    const instance = fixture.debugElement.componentInstance;
    expect(instance).toBeTruthy();
  }));
});
