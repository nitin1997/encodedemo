import { Component, OnInit } from '@angular/core';
import { QuestionserviceService } from '../questionservice.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  private questionId: string;
  constructor(public questionService: QuestionserviceService,public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramap: ParamMap) => {
        this.questionId = paramap.get("questionId");
      });
  }
  
  onAddComment(form:NgForm) {
    if (form.invalid) {
      return;
    }
   // console.log("comment:"+form.value.comment+"  questionid:"+this.questionId)
     this.questionService.addComment(form.value.comment, this.questionId);
  }

}
