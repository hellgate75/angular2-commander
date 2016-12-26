import {ICommandModule} from '../../model/base_model';

export class Help implements ICommandModule {
  match(command: string): boolean {
    return command.trim() === 'help';
  }
  execute(command: string): string {
    return `help - list of local commands ...
    Commands:
    (none)
    `;
  }
  describe(): string {
    return `help - list of local commands ...
    Commands:
    (none)
    `;
  }

}
