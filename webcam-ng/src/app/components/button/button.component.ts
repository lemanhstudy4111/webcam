import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, FontAwesomeModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text!: string;
  @Input() currIcon!: IconProp;
  @Input() disabled!: boolean;
  @Output() btnClick = new EventEmitter();

  onClick(): void {
    this.btnClick.emit();
  }
}
