import {Injectable, bind} from '@angular/core';
import { Command } from '../model/base_model';
import * as _ from 'lodash';

@Injectable()
export class Utils {

  deepCopy(obj: any): any {
    return _.clone(obj);
  }
  deepCopyCommand(command: Command): Command {
      return new Command(_.clone(command));

  }
}
export var utilitiesInjectables: Array<any> = [
  bind(Utils).toClass(Utils)
];
