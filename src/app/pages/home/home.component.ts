import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table = {} as MatTable<any>;
  dataLength: number = 0;

  data: any;
  displayedColumns: string[] = ['state', 'municipality', 'min', 'max', 'description'];
  dataSource!: MatTableDataSource<any>;;

  columns!: number;

  filtered: any[] = [];
  constructor(private api: ApiService) { }

  async ngOnInit(): Promise<void> {
    this.breakPoints();
    const data: any = await this.api.getForecast();
    this.data = data;
    this.filtered = this.data.filter((v: any, i: any, a: any)=>a.findIndex((t: any)=>(t.nmun === v.nmun && t.nes === 'Chihuahua')) === i);
    console.log(this.filtered);
    console.log(data);
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.dataLength = this.data.length;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  breakPoints() {
    switch(true) {
      case (window.innerWidth <= 480):
        this.columns = 1;
        break;
      case (window.innerWidth > 480 && window.innerWidth <= 640):
        this.columns = 2;
        break;
      case (window.innerWidth > 640 && window.innerWidth <= 992):
        this.columns = 3;
        break;
      default:
        this.columns = 4;
    }
  }

  onResize() {
    this.breakPoints();
  }

}
