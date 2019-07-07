import { Injectable } from '@angular/core';
import { Question } from './question';
import { Comment } from './comment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionserviceService {

  

  private comments: Comment[] = [];
  private commentUpdated = new Subject<{ comments: Comment[] }>();

  private questions: Question[] = [];
  private questionUpdated = new Subject<{ questions: Question[] }>();
  constructor(private httpClient: HttpClient, private router: Router,private authService:AuthService) { }

  addQuestion(title: string, question: string) {
    const form: Question = {
      id: null,
      title: title,
      question: question
    }
    console.log(form);
    this.httpClient.post<{ message: string, question: Question }>("http://localhost:15000/api/questions", form)
      .subscribe((responseData) => {
        console.log(responseData)
        this.router.navigate(["/"]);
      });
  }

  getComments() {
    this.httpClient.get<{ message: string, comments: any }>("http://localhost:15000/api/questions/getdata")  //http client gives an access to the body of the response
      .pipe(map((data) => {
        return {
          comments: data.comments.map((comment) => {
            //console.log(comment.verified);
            return {
              questionId: comment.questionId,
              commentData: comment.commentData,
              id: comment._id,
              creator:comment.creator,
              verified:comment.verified
              //creator:question.creator
            };
          }),
        }
      }))            //pipe method helps to add multiple operator for the stream data
      .subscribe((transformedData) => {
        //console.log("fetched comments verified property:"+transformedData);
        this.comments = transformedData.comments;
        this.commentUpdated.next({ comments: [...this.comments] });
      });
  }

  getQuestion() {
    this.httpClient.get<{ message: string, questions: any }>("http://localhost:15000/api/questions")  //http client gives an access to the body of the response
      .pipe(map((data) => {
        return {
          questions: data.questions.map((question) => {
            return {
              title: question.title,
              question: question.question,
              id: question._id,
              //creator:question.creator
            };
          }),
        }
      }))           //pipe method helps to add multiple operator for the stream data
      .subscribe((transformedData) => {
        console.log(transformedData);
        this.questions = transformedData.questions;
        this.questionUpdated.next({ questions: [...this.questions] });
      });
  }

  getQuestionUpdateListener() {
    return this.questionUpdated.asObservable();
  }

  getCommentUpdateListener() {
    return this.commentUpdated.asObservable();
  }

  addComment(comment: string, questionId: string) {
    console.log(this.authService.getuserId());
    const data: Comment = {
      commentData: comment,
      id: null,
      questionId: questionId,
      creator:this.authService.getuserId(),
      verified:"false"
    }
    //console.log(data);
    this.httpClient.post<{ message: string, comment: Comment }>("http://localhost:15000/api/comments", data)
      .subscribe((responseData) => {
        console.log("frontend data for addcomment"+responseData);
        this.router.navigate(["/"]);
      });
  }


}
