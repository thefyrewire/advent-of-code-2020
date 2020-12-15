export module Day_15 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_15/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  const numbers: number[] = lines[0].split(',').map(l => parseInt(l));

  const getNthNumber = (n: number): number => {
    const memory: Map<number, number> = new Map();
    let last: number = 0;
    
    for (let i = 0; i < n; i++) {
      if (typeof numbers[i] !== 'undefined') {
        last = numbers[i];
        memory.set(last, i + 1);
        continue;
      }
    
      if (!memory.has(last)) {
        memory.set(last, i);
        last = 0;
        continue;
      }
    
      const cached: number = memory.get(last);
      memory.set(last, i);
      last = i - cached;
    }

    return last;
  }  

  const part1 = (): void => {
    console.log(`The 2020th number in the sequence is ${getNthNumber(2020)}`);
  }

  part1();

  const part2 = (): void => {
    console.log(`The 30000000th number in the sequence is ${getNthNumber(30000000)}`);
  }

  part2();

}