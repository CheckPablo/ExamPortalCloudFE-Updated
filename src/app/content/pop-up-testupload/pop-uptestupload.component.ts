import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-popuptestupload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-uptestupload.component.html',
  styleUrl: './pop-uptestupload.component.css'
})


export class PopUpTestUploadComponent {
  @Input({ required: true }) content!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) show!: boolean;
  @Input() refresh: boolean;

  ngOnInit(): void {
  }

  closeModal() {
    this.show = false;
  }
}
