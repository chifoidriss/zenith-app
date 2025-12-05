import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../../../article/services/article.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'app-detail-article',
  standalone: false,
  templateUrl: './detail-article.component.html',
  styleUrls: ['./detail-article.component.scss']
})
export class DetailArticleComponent {
  article: any;
  loading: boolean = true;

  constructor(private alert: AlertService,
    private articleService: ArticleService,
    // private router: Router,
    public dialogRef: MatDialogRef<DetailArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.articleService.show(this.data?.id, response => {
      this.article = response;
      this.loading = false;
    });
  }
}
