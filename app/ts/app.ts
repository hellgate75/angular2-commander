/**
 * Copyright 2016, Fullstack.io, LLC.
 *
 * This source code is licensed under the MIT-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  Component
} from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import {
  servicesInjectables,
  CommandsService,
  ExecutionService,
  HistoryService
} from './services/services';
import {
  utilitiesInjectables
} from './utils/utils';


/* Components */
import { CommanderComponent, HistoryComponent } from 'components/components';

/* Test */
import { Command } from './model/base_model';

/*
 * Webpack
 */
require('../css/styles.scss');
// require('../js/core.js');
require('../js/jquery.js');
// require('../js/semantic.js');
require('../css/semantic.css');

@Component({
  selector: 'commands-app',
  directives: [CommanderComponent, HistoryComponent],
  template: `
  <div>
    <div class="ui" style="display: inline-flex ! important; width: 100%;">
      <commander [commandService]="commandService"
                 [historyService]="historyService"
                 [executionService]="executionService"></commander>
      <history [historyService]="historyService"></history>
    </div>
    <div class="container">
      Hello to App ....
    </div>
  </div>
  `
})
class CommandsApp {

  constructor(public commandService: CommandsService,
              public historyService: HistoryService,
              public executionService: ExecutionService) {
    executionService.subscribeCommands(commandService.commandAccess());
    historyService.subscribeCommands(commandService.commandAccess());
//    commandService.start();
    // let c1: Command = new Command({command: 'ping 127.0.0.1'});
    // let c2: Command = new Command({command: 'tracert 127.0.0.1'});
    // let c3: Command = new Command({command: 'ipconfig /all'});
    let c4: Command = new Command({command: 'help'});
    // commandService.addCommand(c1);
    // commandService.addCommand(c2);
//    commandService.stop();
    // commandService.addCommand(c3);
    /* No queue ... */
//    commandService.start();
    /* Queue of only c3 ... */
//    commandService.addCommand(c3);
//    commandService.stop();
    commandService.addCommand(c4);
    console.log('History size : ' + historyService.count());
  }
}

bootstrap(CommandsApp, [ servicesInjectables, utilitiesInjectables ]);
