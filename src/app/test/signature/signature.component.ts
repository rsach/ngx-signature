import { Component, OnInit } from '@angular/core';
// import { HostListener } from '@angular/core';
// import { ViewChild } from '@angular/core';
// import * as SignaturePad from 'signature_pad';
// import * as fx from 'glfx-es6';

// declare const $;

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.css']
})
export class SignatureComponent implements OnInit {
  responseImage;
  ngOnInit() {
  }

  signatureDone(e) {
    this.responseImage = e;
    // console.log(e);
  }
}
