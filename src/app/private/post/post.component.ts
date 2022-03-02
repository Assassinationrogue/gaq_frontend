import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  RendererFactory2,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { merge, fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('editorBox')
  private editorBox: ElementRef;

  public setBold: boolean = false;

  constructor(
    private vcref: ViewContainerRef,
    private renderer2: Renderer2,
    private rendererFactor: RendererFactory2
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const pTag: string[] = [];
    const $keyUpEditor = fromEvent(this.editorBox.nativeElement, 'keyup');
    const $pasteEditor = fromEvent(this.editorBox.nativeElement, 'paste');
    const $combinedEventEditor = merge($keyUpEditor, $pasteEditor);
    $combinedEventEditor
      .pipe(
        //debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((key: any) => {
        // if (key.keyCode >= 48 && key.keyCode <= 57) {
        //   console.log(key.key);
        // } else if (key.keyCode >= 65 && key.keyCode <= 90) {
        //   console.log(this.editorBox.nativeElement.firstChild)
        // } else if (key.keyCode >= 96 && key.keyCode <= 111) {
        //   console.log(key.key);
        // } else if (key.keyCode >= 186 && key.keyCode <= 191) {
        //   console.log(key.key);
        // } else if (key.keyCode >= 219 && key.keyCode <= 222) {
        //   console.log(key.key);
        // } else if (key.keyCode === 9 || key.keyCode === 32) {
        //   console.log(key.key);
        // }
      });
  }

  ngAfterViewChecked(): void {
    // this.editorBox.nativeElement.insertAdjacentHTML(
    //   'afterend',
    //   `<p>${this.editorBox.nativeElement.innerText}</p>`
    // );
  }

  setEditorTextBold(button: HTMLButtonElement) {
    //console.log(button)

    this.setBold = !this.setBold;

    if (!this.setBold) {
      this.editorBox.nativeElement.children[0].innerHTML +=
        "<p contenteditable='true'><span>&#xFEFF</span></p>";
      button.removeAttribute('class');
    } else {
      button.setAttribute('class', 'menu-active');

      this.editorBox.nativeElement.children[0].innerHTML +=
        "<strong contenteditable='true'><span>&#xFEFF</span></strong>";
        this.editorBox.nativeElement.children[0].dispatchEvent(
          new Event('focus')
        );
      this.editorBox.nativeElement.children[0].dispatchEvent(
        new KeyboardEvent('keyup', { keyCode: 13 })
      );
    }
  }
}

/**
 * [hello] -> bold -> [hello+<strong>how are you</strong>]
 */
