import * as babelTypes from 'babel-types';
import Rx from 'rx';
import * as R from 'ramda';

export const createReportStream = visitor => {
  const {IfStatementSubject, ForStatementSubject} = visitor;

  const elseStream = IfStatementSubject.filter(path => {
    return babelTypes.isBlockStatement(path.node.alternate);
  });

  return Rx.Observable
    .merge(IfStatementSubject, ForStatementSubject, elseStream);
};

const cyclomaticComplexity = stream => {
    return stream
        .scan((acc, x) => acc + 1, 0)
        .subscribe(x => console.log('SUBSCRIBE', x));
}

const buildVisitor = methods => {
  const visitorObject = {};
  const visitor = methods.reduce((acc, current, i) => {
    const subject = new Rx.Subject();
    visitorObject[`${current}Subject`] = subject;
    acc[current] = (path) => {
      subject.onNext(path);
    };

    return acc;
  }, {});

  visitorObject['visitor'] = visitor;
  return Object.freeze(visitorObject);
};

export const analyze = (traverse, maybeVisitor, ast) => {
  R.compose(cyclomaticComplexity, createReportStream)(buildVisitor(['IfStatement', 'ForStatement']);
  return R.compose(R.map(traverse(ast)), maybeVisitor.of, R.prop('visitor'))(visitor);
};
