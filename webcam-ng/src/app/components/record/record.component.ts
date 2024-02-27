import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { faCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { BtnUploadComponent } from '../btn-upload/btn-upload.component';
import { UploadService } from '../../service/upload.service';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, BtnUploadComponent],
  templateUrl: './record.component.html',
  styleUrl: './record.component.css',
})
export class RecordComponent implements OnInit {
  title = 'webcam-ng';
  text: string = 'Record';
  @ViewChild('main__video')
  video!: ElementRef;
  @ViewChild('upload__btn', { static: true }) uploadBtn!: HTMLButtonElement;
  faCircle = faCircle;
  faUpload = faUpload;

  static displayVideo: HTMLVideoElement;
  static recordedVideo: Blob;
  stream!: MediaStream;
  mediaRecorder!: MediaRecorder;
  videoURL!: string;

  constructor(private upload: UploadService) {}
  async ngOnInit(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      this.startWebCamera(stream);
    } catch (err) {
      console.log('Error retrieving media device.');
      console.log(err);
    }
  }

  startWebCamera(stream: MediaStream) {
    RecordComponent.displayVideo = this.video.nativeElement;
    this.stream = stream;
    RecordComponent.displayVideo.srcObject = this.stream;
  }

  onBtnClick() {
    console.log('Clicked');
    switch (this.text) {
      case 'Record':
        this.text = 'Stop';
        this.startRecording();
        break;
      case 'Stop':
        this.text = 'Record';
        this.stopRecording();
        if (this.videoURL != '') {
          console.log(RecordComponent.displayVideo);
          this.uploadBtn.disabled = false;
        }
        break;
    }
  }

  async onUploadClick() {
    // console.log('confirm');
    // //upload with axios post
    let data = await this.upload.uploadVideo(
      RecordComponent.recordedVideo,
      'http://localhost:3000/upload'
    );
    console.log('recorded video', RecordComponent.recordedVideo);
  }

  startRecording() {
    if (RecordComponent.displayVideo.srcObject == null) {
      //recorded video is currently playing on the video n not the web camera output
      RecordComponent.displayVideo.srcObject = this.stream;
    }
    this.mediaRecorder = new MediaRecorder(this.stream, {
      mimeType: 'video/webm;codecs=vp9,opus',
    });
    this.mediaRecorder.start();
    this.mediaRecorder.ondataavailable = this.recordVideo;
  }
  //Blob - phylite object that contains raw data, usually associated with media type that is binary, text, or readable stream
  //class BlobEvent has a property called data that is the associated blob
  recordVideo(event: BlobEvent) {
    if (event.data && event.data.size > 0) {
      RecordComponent.recordedVideo = event.data;
      RecordComponent.displayVideo.srcObject = null; //removing web camera output from element
      this.videoURL = URL.createObjectURL(event.data);
      RecordComponent.displayVideo.src = this.videoURL;
    } //Data available
  }

  stopRecording() {
    this.mediaRecorder.stop();
  }
}
