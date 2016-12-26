import {commandServiceInjectables} from './CommandsService';
import {historyServiceInjectables} from './HistoryService';
import {executionServiceInjectables} from './ExecutionService';

export * from './CommandsService';
export * from './HistoryService';
export * from './ExecutionService';

export var servicesInjectables: Array<any> = [
  commandServiceInjectables,
  historyServiceInjectables,
  executionServiceInjectables
];
