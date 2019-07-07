import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { QuestionsComponent } from './questions/questions.component';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';

const routes: Routes = [
  { path: 'create', component: QuestionsComponent },
  { path: '', component: QuestionsListComponent },
  { path: 'comment/:questionId', component: CommentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
