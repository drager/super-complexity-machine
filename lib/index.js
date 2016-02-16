import * as babylon from 'babylon';
import * as babel from 'babel-core';
import * as t from 'babel-types';
import traverse from 'babel-traverse';
import Rx from 'rx';

import { code } from './data/function-for-if';

const elseSubject = new Rx.Subject();
const ifSubject = new Rx.Subject();
const forSubject = new Rx.Subject();

const source = Rx.Observable.merge(elseSubject, ifSubject, forSubject)
    .reduce((acc, prev) => acc + prev)
    .subscribe(
      cyclomaticComplexity => console.log('cyclomaticComplexity:', cyclomaticComplexity),
      err => console.log(err),
      () => console.log('done!')
    );

const visitor = {
  IfStatement(path) {
    if (t.isBlockStatement(path.node.alternate)) {
      elseSubject.onNext(1);
    }
    ifSubject.onNext(1);
  },

  ForStatement(path) {
    forSubject.onNext(1);
  }
};

const ast = babylon.parse(code);

traverse(ast, visitor);
elseSubject.onCompleted();
ifSubject.onCompleted();
forSubject.onCompleted();
