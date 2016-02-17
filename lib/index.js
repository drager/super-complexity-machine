import * as babylon from 'babylon';

import { functionForIf } from './data/code-data';
import { analyze } from './analyzer';

analyze(babylon.parse(functionForIf));
