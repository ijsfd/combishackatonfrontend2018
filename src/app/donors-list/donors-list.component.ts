import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-donors-list',
  templateUrl: './donors-list.component.html',
  styleUrls: ['./donors-list.component.css']
})
export class DonorsListComponent implements OnInit {
  displayedColumns = ['firstName', 'lastName', 'bloodType', 'age', 'actions'];
  dataSource;

  now = new Date().getFullYear();

  users: User[];

  questions: any[];

  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers()
      .subscribe(response => {
        this.users = <User[]>response['data'];
        this.dataSource = <User[]>this.users;
      });

    this.userService.getAllQuestions()
      .subscribe(questions => {
        console.log(questions);
        this.questions = questions['data'];
      });
  }

  onAddDonor() {
    this.router.navigate(['/donors/new']);
  }

  onViewDonor(id: string) {
    this.router.navigate([`/donors/${id}`]);
  }

  createQuestion(question: string) {
    this.userService.createQuestionForUser(question)
      .subscribe(response => {
        console.log(response);
      });
  }

}
