import { trigger, transition, style, animate } from "@angular/animations";
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [

      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 }))
      ]),

      transition('* => void', [
        animate('300ms', style({ opacity: 0 }))
      ])

    ])

  ]
})
export class CarouselComponent implements OnInit {
  
  @Input() slides!: any[];
  current_slide = 0;

  constructor() { }

  ngOnInit(): void { }

  onPreviousClick() {
    const previous = this.current_slide -1;
    this.current_slide = previous < 0 ? this.slides.length -1 : previous;
    console.log('button previous pressed');
  }

  onNextClick() {
    const next = this.current_slide + 1;
    this.current_slide = next === this.slides.length ? 0 : next;
    console.log("next clicked, new current slide is: ", this.current_slide);
  }

}
