import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-bar',
  templateUrl: './bottom-bar.component.html',
  styleUrls: ['./bottom-bar.component.scss'],
})
export class BottomBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  onButtonGroupClick($event: { target: any; srcElement: any }) {
    let clickedElement = $event.target || $event.srcElement;
    if (clickedElement.nodeName === 'I') {
      let isCertainButtonAlreadyActive =
        clickedElement.parentElement.querySelector('.active');
      if (isCertainButtonAlreadyActive) {
        isCertainButtonAlreadyActive.classList.remove('active');
      }
      clickedElement.className += ' active';
    }
  }
}
