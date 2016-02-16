import * as babylon from 'babylon';
import generate from 'babel-generator';
import traverse from 'babel-traverse';
import * as t from 'babel-types';
import Rx from 'rx';

const code = `
 const arr = [1, 2, 3, 4, 5];
 const newArr = [];

 for (let i = 0; i < arr.length; i++) {
   if (arr[i] > 2) {
     newArr.push(arr[i]);
   }
 }
`;

const ast = babylon.parse(code);

let source;

traverse(ast, {
  enter(path) {
    source = Rx.Observable.create((observer) => {
      observer.onNext(path);
    });
  }
});

source.subscribe(
  (path) => {
    console.log(path);
  }
);

//console.log(ast);
