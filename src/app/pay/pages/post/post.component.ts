import { Component } from '@angular/core';
import { NewPostComponent } from './new-post/new-post.component';
import { AlertService } from '../../../shared/services/alert.service';
import { Paginate } from '../../../shared/models/paginate';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  standalone: false,
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  data: Paginate = new Paginate();
  loading = true;

  constructor(private alert: AlertService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.postService.index(response => {
      this.data = response;
      this.loading = false;
    });
  }

  addItem() {
    this.alert.openModal(NewPostComponent, (result) => {
      if (result) {
        this.data.data.push(result);
      }
    });
  }

  removeItem(index: number, item: any) {
    this.alert.confirm(result => {
      if (result) {
        this.data.data.splice(index, 1);
        if (item.id) {
          this.postService.destroy(item.id, (response) => {});
        }
      }
    });
  }

  editItem(index: number, item: any) {
    this.alert.openModal(NewPostComponent, (result) => {
      if (result) {
        this.data.data[index] = result;
      }
    }, item);
  }
}
