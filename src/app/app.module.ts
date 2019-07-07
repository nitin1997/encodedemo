import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatInputModule, MatCardModule, MatButtonModule, MatToolbarModule, MatExpansionModule
} from '@angular/material';
import { CommentsComponent } from './comments/comments.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    QuestionsListComponent,
    HeaderComponent,
    CommentsComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule, 
    MatCardModule,
    MatButtonModule, 
    MatToolbarModule,
    MatExpansionModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
     
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,  
    useClass: AuthInterceptor,
    multi: true    
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
