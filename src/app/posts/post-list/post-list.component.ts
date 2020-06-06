import { Component, OnInit, OnDestroy} from "@angular/core";
import { Post } from '../post.model';
import { PostService } from '../posts.service.component';
import { Subscription } from 'rxjs';


@Component(
  {
     selector: 'app-post-list',
     templateUrl: './post-list.component.html',
    styleUrls:['./post-list.component.css']

  }
)


export class PostListComponent implements OnInit,OnDestroy
{
  posts: Post[] = [];
  isLoading = false;
  private PostSub : Subscription;
  constructor(public postService: PostService){};


  ngOnInit()
  {
    this.isLoading = true;
   this.postService.getPost();

      this.PostSub = this.postService . getPostUpdateListener(). subscribe (( post: Post[] ) =>
      {
        this.isLoading = false;
        this.posts=post;

      });

  };

  onDelete(postId: string) {

    this.postService.deletePost(postId);
  }

  ngOnDestroy() {
    this.PostSub.unsubscribe();
      }


}
