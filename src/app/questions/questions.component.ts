import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { QuestionserviceService } from '../questionservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
 // form: FormGroup;
  constructor(public questionService: QuestionserviceService, public route: ActivatedRoute) { }

  ngOnInit() {
  }
  
  onAddQuestion(form:NgForm) {
    if (form.invalid) {
      return;
    }
     this.questionService.addQuestion(form.value.title, form.value.question);
  }
}
