import { Post } from './post.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';



@Injectable({ providedIn: 'root' })

export class PostService {
  private posts: Post[] = [];

  private PostsUpdated = new Subject<Post[]>();


  constructor(private http: HttpClient, private router: Router) { }


  getPost() {

    this.http.get<{ message: string, Myposts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        console.log(postData.Myposts);
        return postData.Myposts.map(post => {
          const newpost = {
            title: post.title,
            content: post.content,
            id: post._id
          }
          return newpost;
        });
      }))
      .subscribe((transformedPosts) => {

        this.posts = transformedPosts;
        this.PostsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {

    return this.PostsUpdated.asObservable();

  }


  addPost(Title: string, Content: string) {
    const post: Post = { id: null, title: Title, content: Content };
    this.http.post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.PostsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });

  }


  deletePost(postId: string) {

    this.http.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        console.log("Deleted!");

      });


  }

  GetPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string }>("http://localhost:3000/api/posts/" + id);
  }

  UpdatePost(id: string, title: string,
    content: string) {
    const post: Post = { id: id, title: title, content: content };

    this.http.put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        const UpdatedPosts = [...this.posts];
        const OldPostIndex = UpdatedPosts.findIndex(p => p.id === post.id);
        UpdatedPosts[OldPostIndex] = post;
        this.posts = UpdatedPosts;
        this.PostsUpdated.next([...this.posts]);
        this.router.navigate(["/"]);
      });

  }


}
