import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  async uploadVideo(video: Blob, url: string) {
    const formData = new FormData();
    formData.append('video', video);
    console.log(JSON.stringify(formData));
    const data = await axios
      .post(url, formData, {
        headers: {
          'Content-Type': 'video/webm;codecs=vp9,opus',
        },
      })
      .catch((error) => {
        if (error.response) {
          console.log('response data', error.response.data);
          console.log('response status', error.response.status);
          console.log('response headers', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log('error request', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
    return data;
  }
}
