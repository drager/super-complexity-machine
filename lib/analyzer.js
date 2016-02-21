import * as babelTypes from 'babel-types';
import Rx from 'rx';
import * as R from 'ramda';

const cyclomaticComplexity = (stream) => {
  return stream
    .scan((acc, x) => acc + 1, 0);
}

export const createReportStream = visitor => {
  const {IfStatementSubject, ForStatementSubject} = visitor;

  const elseStream = IfStatementSubject.filter(path => {
    return babelTypes.isBlockStatement(path.node.alternate);
  });

  return Rx.Observable.merge(IfStatementSubject, ForStatementSubject, elseStream);
}

const buildVisitor = (methods) => {
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
}


export const analyze = (traverse, babylon, maybeVisitor, ast) => {
  const visitorObject = buildVisitor(['IfStatement', 'ForStatement']);
  R.compose(cyclomaticComplexity, createReportStream)(visitorObject)
    .subscribe(x => console.log('SUBSCRIBE', x));

  // Run traverse in a functor. compose Fmap of two functors, one for traverse and one for the code to parse, then flat.
  //TODO: Lift instead of code below.
  return maybeVisitor
    .of(visitorObject.visitor)
    .map(traverse(ast));
  // traverse(ast, visitorObject.visitor);
}
