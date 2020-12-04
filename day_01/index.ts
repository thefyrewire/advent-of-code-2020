export module Day_01 {

  const fs = require('fs');

  const input = fs.readFileSync('./day_01/input.txt', 'utf8');

  const numbers = input.split('\r\n').map(n => parseInt(n));

  for (let i: number = 0; i < numbers.length; i++) {
    for (let j: number = 0; j < numbers.length; j++) {
      for (let k: number = 0; k < numbers.length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === 2020) {
          console.log(numbers[i], numbers[j], numbers[k]);
          console.log(numbers[i] * numbers[j] * numbers[k]);
        } 
      } 
    }
  }

}