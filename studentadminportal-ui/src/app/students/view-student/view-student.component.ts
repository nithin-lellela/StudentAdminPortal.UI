import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../student.service';
import { Student } from 'src/app/models/ui-models/student.model';
import { GenderService } from 'src/app/services/gender.service';
import { Gender } from 'src/app/models/ui-models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  studentId: string | null | undefined;

  student: Student = {
    id: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    email: '',
    mobile: 0,
    profileImageUrl: '',
    genderId: '',
    gender: {
      id: '',
      description: ''
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: ''
    }
  }

  genderList: Gender [] = [];

  constructor(private readonly studentService: StudentService, private readonly route: ActivatedRoute,
    private readonly genderService: GenderService, private snackBar: MatSnackBar)
  {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        this.studentId = params.get('id');
        if(this.studentId){
          this.studentService.getStudent(this.studentId)
          .subscribe({
            next: (successResponse) => {
              this.student = successResponse;
              //console.log(successResponse);
            },
            error: (errorResponse) => {
              console.log(errorResponse);
            },
            complete: () => {

            }

          });

          this.genderService.getGenders().subscribe({
            next: (successResponse) => {
              this.genderList = successResponse;
              //console.log(successResponse);
            },
            error: (errorResponse) => {
              console.log(errorResponse);
            },
            complete: () => {

            }
          });
        }
      }
    );

  }

  onUpdate(): void{
    // call student service to update the details
    this.studentService.updateStudent(this.student.id, this.student).subscribe({
      next: (successResponse) => {
        this.snackBar.open('Student Updated Successfully', undefined, {
          duration: 3000
        });
        //console.log(successResponse);
      },
      error: (errorResponse) => {
        console.log(errorResponse);
      },
      complete: () => {

      }
    });
  }

}
