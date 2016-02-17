import * as t from 'babel-types';
import traverse from 'babel-traverse';
import Rx from 'rx';
import * as R from 'ramda';

// R.compose(
//   cyclomaticComplexity,
//   createReportStream
// );

const cyclomaticComplexity = (stream) => {
  return stream
    .scan((acc, x) => acc + 1, 0);
}

export const createReportStream = visitor => {
  const {IfStatementSubject, ForStatementSubject} = visitor;

  const elseStream = IfStatementSubject.filter(path => {
    return t.isBlockStatement(path.node.alternate);
  });

  return cyclomaticComplexity(Rx.Observable.merge(IfStatementSubject, ForStatementSubject, elseStream));
}

function buildVisitor(methods) {
  const returnObj = {};
  const visitor = methods.reduce((acc, current, i) => {
    const subject = new Rx.Subject();
    returnObj[`${current}Subject`] = subject;
    acc[current] = (path) => {
      subject.onNext(path);
    };

    return acc;
  }, {});

  returnObj['visitor'] = visitor;
  return Object.freeze(returnObj);
}

export const analyze = (ast) => {
  const visitor = buildVisitor(['IfStatement', 'ForStatement']);

  createReportStream(visitor)
    .subscribe(x => console.log('SUBSCRIBE', x));

  traverse(ast, visitor.visitor);
}
