import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { faCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { BtnUploadComponent } from './components/btn-upload/btn-upload.component';
import { UploadService } from './service/upload.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, BtnUploadComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
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
    AppComponent.displayVideo = this.video.nativeElement;
    this.stream = stream;
    AppComponent.displayVideo.srcObject = this.stream;
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
          console.log(AppComponent.displayVideo);
          this.uploadBtn.disabled = false;
        }
        break;
    }
  }

  async onUploadClick() {
    // console.log('confirm');
    // //upload with axios post
    let data = await this.upload.uploadVideo(
      AppComponent.recordedVideo,
      'http://localhost:3000/upload'
    );
    console.log('recorded video', AppComponent.recordedVideo);
  }

  startRecording() {
    if (AppComponent.displayVideo.srcObject == null) {
      //recorded video is currently playing on the video n not the web camera output
      AppComponent.displayVideo.srcObject = this.stream;
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
      AppComponent.recordedVideo = event.data;
      AppComponent.displayVideo.srcObject = null; //removing web camera output from element
      this.videoURL = URL.createObjectURL(event.data);
      AppComponent.displayVideo.src = this.videoURL;
    } //Data available
  }

  stopRecording() {
    this.mediaRecorder.stop();
  }
}
