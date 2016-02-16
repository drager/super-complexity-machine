export const code = `
const arr = [1, 2, 3, 4, 5];

var square = function(arr) {
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > 2) {
      if (true) {
        for (let x = i; x < i + 10; x--) {
          newArr.splice(i);
        }
      } else if (i === 2) {
        i = 0;
      }
    } else if (arr[i] === 2) {
      newArr.slice(0);
    }
  }
  return newArr;
};

var x = function(arr) {
  if (arr.length <= 0) {
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    arr[i] += 1;
  }
  return arr;
}

square(arr);
x(arr);

`;
