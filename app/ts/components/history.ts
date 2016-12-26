import {
  Component,
  OnInit
} from '@angular/core';

import {
  HistoryService
} from '../services/services';


require('./history.scss');

@Component({
  selector: 'history',
  directives: [],
  inputs: [ 'historyService' ],
  template: `
<div class="history-wrap">
  <div *ngFor="let command of historyService.historyList()"
          class="history-line">
    <div class="history-command">{{command.command}}</div>
    <div class="state-container" [ngSwitch]="command.getState()">
      <div class='meta' *ngSwitchWhen="0" style="width: 150px;">(Created)</div>
      <div class='meta' *ngSwitchWhen="1" style="width: 150px;">(In Progress)
      </div>
      <div class='meta' *ngSwitchWhen="2" style="width: 150px;">(Successful)
      </div>
      <div class='meta' *ngSwitchWhen="3" style="width: 150px;">(Failed)</div>
      <div class='meta' *ngSwitchDefault style="width: 150px;">(Unknown)</div>
    </div>

    <div class="history-result"
              [ngClass]="{'error': command.error}">{{command.response}}</div>
  </div>
</div>
  `
})
export class HistoryComponent implements OnInit {
  historyService: HistoryService;
  constructor() {
    ;
  }
  ngOnInit(): void {
    ;
  }
}
