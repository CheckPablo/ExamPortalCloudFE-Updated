import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})


export class PopUpComponent {
  @Input({ required: true }) content!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) show!: boolean;
  @Input() refresh: boolean;

  ngOnInit(): void {
  }

  closeModal() {
    this.show = false;
    if (!this.refresh) {
      window.location.reload();
    }
  }
}
