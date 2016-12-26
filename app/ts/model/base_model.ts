import {uuid} from '../util/uuid';

let COMMAND_NOT_EXECUTED: string = '<not executed>';

export interface ICommandModule {
  match(command: string): boolean;
  execute(command: string): string;
  describe(): string;
}

export interface ICommandsOperation extends Function {
  (command: Command[]): Command[];
}

export enum CommandState {CREATED, IN_PROGRESS, SECCEDED, FAILED};

export class CommandResponse {
  response: string;
  uuid: string;
  command: string;
  error: boolean = false;
  constructor(obj: any) {
    this.command = obj.command      || '';
    this.uuid = obj.uuid            || '';
    this.error = obj.error          || false;
    this.response = obj.response    || '';
  }
}

export class Command {
  creation: Date;
  execution: Date;
  complete: Date;
  response: string;
  uuid: string;
  command: string;
  error: boolean = false;

  constructor(obj: any) {
    this.command = obj.command      ||   '';
    this.creation = obj.creation    || new Date();
    this.execution = obj.execution   || null;
    this.complete = obj.complete    || null;
    this.uuid = obj.uuid        || uuid();
    this.error = obj.error          || false;
    this.response = obj.response    || '';
  }

  getResponse(): string {
    return this.response || COMMAND_NOT_EXECUTED;
  }

  getState(): CommandState {
    if (!this.complete && !this.execution) {
      return CommandState.CREATED;
    }
    if (!this.complete) {
      return CommandState.IN_PROGRESS;
    }
    if (!this.error) {
      return CommandState.SECCEDED;
    }
    return CommandState.FAILED;
  }

  getCreation(): Date {
    return this.creation;
  }

  getExecutionDate(): Date {
    return this.execution;
  }

  getCompletedDate(): Date {
    return this.complete;
  }

  isExecuted(): boolean {
    return !!this.complete;
  }

  isInProgress(): boolean {
    return !!this.execution && !this.complete;
  }

  start(): void {
    this.execution = new Date();
    console.log('Execution : ' + this.command);
  }

  completed(state: boolean, message: string): void {
    console.log('Executed : ' + this.command + ' => ' +
                (state ? 'Succeeded' : 'Failed' ) + '!!');
    this.complete = new Date();
    this.response = message;
    this.error = state;
  }

}
