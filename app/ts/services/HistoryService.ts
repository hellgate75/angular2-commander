import {Subscriber, Subject} from 'rxjs';
import {Injectable, bind} from '@angular/core';
import {Command} from '../model/base_model';
import {
  Utils
} from '../utils/utils';

@Injectable()
export class HistoryService {
  history: Command[] = [];
  subscription: Subscriber<Command[]>;

  constructor(public utils: Utils) {
    ;
  }

  subscribeCommands(commands: Subject<Command>): void  {
    commands.subscribe(
      (command: Command) => {
        let clonedCommand: Command = this.utils.deepCopyCommand(command);
        this.history.push(clonedCommand);
      },
      (error: any) => console.log('Error accumulating commnds!!'),
      () => console.log('History command accumulator exited!!')
    );
  }

  historyList(): Command[] {
    return this.history;
  }

  count(): number {
    return this.history.length;
  }

}
export var historyServiceInjectables: Array<any> = [
  bind(HistoryService).toClass(HistoryService)
];
