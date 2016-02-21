import * as babylon from 'babylon';

import traverse from 'babel-traverse';
import { functionForIf } from './data/code-data';
import { analyze } from './analyzer';
import { Module } from './functors/module';
import * as R from 'ramda';

// const module = Module
//     .of(functionForIf)
//     .map(babylon.parse);
const ast = babylon.parse(functionForIf);
analyze(R.curry(traverse), babylon, Module, ast);
// analyze(babylon.parse(functionForIf));
