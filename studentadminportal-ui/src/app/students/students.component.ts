import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from './student.service';
import { Student } from '../models/ui-models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild(MatPaginator) matPaginator!: MatPaginator;
  @ViewChild(MatSort) matSort!: MatSort;

  students: Student[] = [];

  displayColumns: string[] = ['firstName', 'lastName', 'dateOfBirth', 'email', 'mobile',
  'gender'];

  dataSource: MatTableDataSource<Student> = new MatTableDataSource<Student>();

  filterString = '';

  constructor(private studentService: StudentService) { }

  filterStudents(){
   this.dataSource.filter = this.filterString.trim().toLocaleLowerCase();
  }

  ngOnInit(): void {
    this.studentService.getStudents().
    subscribe({
      next: (successResponse) => {
        this.students = successResponse;
        this.dataSource = new MatTableDataSource<Student>(this.students);
        if(this.matPaginator){
          this.dataSource.paginator = this.matPaginator;
        }
        if(this.matSort){
          this.dataSource.sort = this.matSort;
        }
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
      complete: () => {

      }
    });
  }


}
