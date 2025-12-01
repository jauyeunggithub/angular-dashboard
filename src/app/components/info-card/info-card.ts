import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-info-card',
  imports: [CommonModule],
  templateUrl: './info-card.html',
  styleUrl: './info-card.css',
})
export class InfoCardComponent {
  @Input() country: any;
}
