import {
  Component,
  OnInit,
  EventEmitter
} from '@angular/core';

import {
  CommandsService,
  HistoryService,
  ExecutionService
} from '../services/services';

import {Command, CommandResponse} from '../model/base_model';

require('./commander-line.scss');

@Component({
  selector: 'commander-line',
  directives: [],
  // styleUrls: ['commander-line.scss'],
  outputs: ['commandEmitter:command'],
  // host: { '(window:keydown)': 'onKeyDown($event)' },
  template: `
  <div class="commander-line">
    <div class="commander-cursor">~></div>
    <input id="text" class="commander-span" (focus)="activate()"
                (blur)="deactivate()" (keypress)="onKeyDown($event)" />
  </div>
  `
})
class CommanderLineComponent implements OnInit {
  commandService: CommandsService;
  commandEmitter: EventEmitter<string>;
  active: boolean = false;
  restarted: boolean = false;
  text: string;
  constructor() {
    this.commandEmitter = new EventEmitter<string>();
  }
  ngOnInit(): void {
    ;
  }
  onKeyDown(event: any): boolean {
      if ( event.keyCode === 13 ) {
        this.text = event.target.value;
        this.commandEmitter.emit(this.text);
        this.restarted = true;
        event.defautPrevent = true;
        event.target.value = '';
        event.target.blur();
        return false;
      }
      return true;
  }

  activate(): void {
    if (this.restarted) {
      this.restarted = false;
      this.text = '';
    }
  }
  deactivate(): void {
    ;
  }
}

require('./notification.scss');

@Component({
  selector: 'notification',
  directives: [],
  inputs: ['response'],
  template: `
  <div class="notification">
  <div class="notification-command-block">
    <div class="notification-cursor">~></div>
    <div class="notification-command">{{response.command}}</div>
  </div>
    <div class="notification-message"
          [ngClass]="{'error': response.error}">{{response.response}}</div>
  </div>
  `
})
class NotificationComponent {
  response: CommandResponse;
  constructor() {
    ;
  }
}

require('./commander.scss');

@Component({
  selector: 'commander',
  directives: [CommanderLineComponent, NotificationComponent],
  inputs: [ 'commandService', 'historyService', 'executionService' ],
  template: `
  <div class="commander-wrap">
    <div class="commander-area">
    <notification *ngFor="let response of executionService.responseList"
          [response]="response"></notification>
    <commander-line (command)="commandExecuted($event)"></commander-line>
    </div>
  </div>
  `
})
export class CommanderComponent {
  commandService: CommandsService;
  historyService: HistoryService;
  executionService: ExecutionService;
  constructor() {
    ;
  }
  commandExecuted(command: string): void {
    this.commandService.addCommand( new Command( {command: '' + command} ) );
  }
}
