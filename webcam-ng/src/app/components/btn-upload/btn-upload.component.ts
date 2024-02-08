import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { Toast, ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-btn-upload',
  standalone: true,
  imports: [ConfirmDialogModule, ButtonModule, ToastModule],
  templateUrl: './btn-upload.component.html',
  styleUrl: './btn-upload.component.css',
  providers: [ConfirmationService, MessageService],
})
export class BtnUploadComponent {
  @Input() disabled!: boolean;
  @Input() confirmed!: (video: Blob, url: string) => void;
  @Output() btnClick = new EventEmitter();
  @Output() confirmClick = new EventEmitter();

  onClick(): void {
    this.btnClick.emit();
  }
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to upload to database?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Uploading to database',
        });
        this.onConfirm();
      },
      reject: () => {
        console.log('Canceled');
      },
    });
  }

  onConfirm(): void {
    this.confirmClick.emit();
  }
}
