import {Subject} from 'rxjs';
import {Injectable, bind} from '@angular/core';

import {ICommandModule, Command, CommandResponse} from '../model/base_model';

import {commandsList} from './commands/commands';

let COMMAND_NOT_FOUND: string = 'Command not found ...';

@Injectable()
export class ExecutionService {

  responseList: CommandResponse[] = [];

  constructor() {
    console.log('commands : ' + commandsList.length);
  }

  subscribeCommands(commands: Subject<Command>): void  {
    commands.subscribe(
      (command: Command) => {
        // let clonedCommand: Command = this.utils.deepCopyCommand(command);
        // this.history.push(clonedCommand);
        let cmds: ICommandModule[] = commandsList.filter(
                (executor: ICommandModule) => executor.match(command.command));
        command.start();
        if (cmds.length === 0) {
          command.completed(true, COMMAND_NOT_FOUND);
          this.responseList.push(new CommandResponse({command: command.command,
            response: COMMAND_NOT_FOUND, uuid: command.uuid, error: true}));
        }
        else {
          try {
            let response: string = cmds[0].execute(command.command);
            command.completed(false, response);
            this.responseList.push(new CommandResponse(
            {command: command.command, response: response,
              uuid: command.uuid, error: false}));
          } catch (e) {
            command.completed(true, e.toString());
            this.responseList.push(new CommandResponse(
            {command: command.command, response: e.toString(),
              uuid: command.uuid, error: true}));
          }
        }
      },
      (error: any) => console.log('Error accumulating commnds!!'),
      () => console.log('History command accumulator exited!!')
    );
  }

}
export var executionServiceInjectables: Array<any> = [
  bind(ExecutionService).toClass(ExecutionService)
];
