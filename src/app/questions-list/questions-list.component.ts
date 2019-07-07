import { Component, OnInit } from '@angular/core';
import { QuestionserviceService } from '../questionservice.service';
import { Subscription } from 'rxjs';
import { Question } from '../question';
import { Comment } from '../comment';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {
  private authListenerSubs:Subscription;
  private questionSubscribe:Subscription;
  private commentSubscribe:Subscription;
  public logInUser:string;
  addQuestions:Question[]=[];
  addComments:Comment[]=[];
  constructor(public questionService: QuestionserviceService,public authService:AuthService) { }

  ngOnInit() {
    this.questionService.getComments();
    this.commentSubscribe=this.questionService.getCommentUpdateListener()
    .subscribe((commentData)=>{
      this.addComments=commentData.comments;
      console.log("fetched Comments in List:"+this.addComments);
      
    });
    this.questionService.getQuestion();
    this.questionSubscribe=this.questionService.getQuestionUpdateListener()
    .subscribe((questionData)=>{
      this.addQuestions=questionData.questions;
    });
    this.logInUser=this.authService.getuserId();
    this.authListenerSubs=this.authService.getAuthStatusListener().subscribe(
      isAuthenticated=>{
       this.logInUser=isAuthenticated;
       console.log("Logged In User:"+this.logInUser);
      }
   );
    // console.log("Logged In User:"+this.logInUser);
  }

  ngOnDestroy(){
    this.commentSubscribe.unsubscribe();
    this.questionSubscribe.unsubscribe();
  }

}
