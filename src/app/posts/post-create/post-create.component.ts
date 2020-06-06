import { Component, OnInit } from "@angular/core";
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service.component';
import { Post } from '../post.model';
import { ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})


export class PostCreateComponent implements OnInit {

  isLoading = false;
  private mode = 'create';
  private postId: string;
  public post: Post;



  constructor(public postService: PostService, public route: ActivatedRoute) { }



  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.GetPost(this.postId).subscribe(retposts => {
          this.isLoading = false;
          this.post = { id: retposts._id, title: retposts.title, content: retposts.content };
        });


      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });

  }


  onSavePost(form: NgForm) {

    if (form.invalid) {
      return;
    }
    this.isLoading = true;

    if (this.mode === 'create') {
      this.postService.addPost(form.value.title, form.value.content);
    } else {
      this.postService.UpdatePost(this.postId, form.value.title, form.value.content);
    }


    form.resetForm();


  }

}
