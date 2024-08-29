import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Course } from '../../model/course';
import { CoursesService } from '../../service/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit{
  
  courses$: Observable<Course[]> | null = null;

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ){
    this.refresh();
  }

  refresh(){
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError(error => {
        this.onError('Erro ao carregar cursos')
        return of([]);
      })
    );
  }
  
  onError(errorMsg: string){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }

  onAdd(){
    this.router.navigate(['new'],{relativeTo: this.route})
  }

  onEdit(course: Course){
    this.router.navigate(['edit', course.id],{relativeTo: this.route})
  }

  onRemove(course: Course){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:'Tem certeza que deseja remover este curso?',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result){
        this.coursesService.remove(course.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso.','X',{
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition:'center'
            });
          },
          error => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
    
  }

}
