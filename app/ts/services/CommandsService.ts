import {Subject, Observable, Subscription, Subscriber,
  ReplaySubject} from 'rxjs';
import {Injectable, bind} from '@angular/core';
import {ICommandsOperation, Command} from '../model/base_model';

let initialCommands: Command[] = [];

@Injectable()
export class CommandsService {
  commands: Observable<Command[]>;
  accumulator: Subject<any> = new ReplaySubject<any>();
  create: Subject<Command> = new Subject<Command>();
  newCommand: Subject<Command> = new Subject<Command>();
  subscription: Subscription;

  constructor() {
    this.commands = this.accumulator
      // watch the updates and accumulate operations on the messages
      .scan((commands: Command[],
             operation: ICommandsOperation) => {
               return operation(commands);
             },
            initialCommands)
            .publishReplay(1)
            .refCount();
    this.create.map( function(command: Command): ICommandsOperation {
      return (commands: Command[]) => {
        return commands.concat(command);
      };
    }).subscribe(this.accumulator);
    this.newCommand.subscribe(this.create);
  }

  commandsObservable(): Observable<Command[]> {
    return this.commands;
  }

  commandAccess(): Subject<Command> {
    return this.create;
  }

  subscribeNewCommand(subject: Subject<Command>): Subscriber<Command> {
    return <Subscriber<Command>> this.newCommand.subscribe(subject);
  }

  unsubscribe(subscription: Subscriber<Command[]>): void {
    if (!!subscription) {
      subscription.complete();
      subscription.unsubscribe();
    }
  }

  stop(): void {
    if (!!this.subscription) {
      (<Subscriber<Command[]>>this.subscription).complete();
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  isRunning(): boolean {
    return !!this.subscription;
  }

  start(): void {
    if (!this.subscription) {
      this.subscription = this.commands.subscribe(
        (commands: Command[]) => {
          console.log('EXECUTING COMMANDs : ' + commands.length);
          commands.forEach((command: Command) => {
            console.log('LOADED COMMAND : ' + command.command);
            if (!command.isExecuted() && !command.isInProgress()) {
              console.log('EXECUTING COMMAND : ' + command.command);
              command.start();
              console.log('Execution : ' + command.command);
              command.completed(true, 'done!!');
            }
          });
        },

        (error: any) => console.log('COMMAND EXECUTION ERROR : ' +
                                    error.message),

        () =>  console.log('COMMAND EXECUTION COMPLETED!!')
        );
    }
  }

  getObservable(): Observable<Command[]> {
    return this.commands;
  }

  addCommand(command: Command): void {
    this.newCommand.next(command);
  }

}
export var commandServiceInjectables: Array<any> = [
  bind(CommandsService).toClass(CommandsService)
];
