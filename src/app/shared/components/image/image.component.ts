import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image',
  standalone: false,
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() src: any;
  @Output() file = new EventEmitter<any>();

  fileData: any;
  imageUrl: any = '';

  constructor() { }

  ngOnInit(): void {
    this.imageUrl = this.src || '';
  }

  fileEvent(e: any){
    this.fileData = e.target.files[0];

    if (this.fileData) {
      this.file.emit(this.fileData);
      const reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  resetFileImage(inputFile) {
    this.fileData = null;
    this.file.emit(null);
    this.imageUrl = null;
    inputFile = null;
  }

}
