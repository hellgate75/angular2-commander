import {ICommandModule} from '../../model/base_model';

import {Help} from './help';

export var commandsList: Array<ICommandModule> = [
  new Help()
  ];
