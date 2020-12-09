export module Day_09 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_09/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  const data: number[] = lines.map(l => parseInt(l));
  const PREAMBLE_LENGTH: number = 25;

  const part1 = (): number => {
    const pairable: number[] = [];
    
    for (const [i, n] of data.slice(PREAMBLE_LENGTH, data.length).entries()) {
      const window: number[] = data.slice(i, PREAMBLE_LENGTH + i);
      for (let i = 0; i < window.length; i++) {
        for (let j = 0; j < window.length; j++) {
          if (window[i] === window[j]) continue;
          if (window[i] + window[j] === n) pairable.push(n);
        }
      }
    }
    
    const [unpairable]: number[] = data.slice(PREAMBLE_LENGTH, data.length).filter(p => [...new Set(pairable)].indexOf(p) === -1);
    return unpairable;
  }
  
  const unpairable: number = part1();
  console.log(`The first unpairable number is ${unpairable}`);
  
  const part2 = (): void => {
    const possible: number[] = data.map((n, i, a) => n > unpairable || ((a[i - 1] > unpairable) && (a[i + 1] > unpairable)) ? 0 : n).filter(n => n > 0);

    const attemptSum = (sum: number, a: number): [boolean, number] => {
      const result: number = sum + possible[a + 1];
      if (result < unpairable) return [true, result];
      return [false, result];
    }

    let range: number[] = [];

    for (let a = 0; a < possible.length; a++) {
      let attemptContinue: boolean = true, sum: number = possible[a], b: number = a;
      let attemptRange: number[] = [];
      while (attemptContinue) {
        const [_attemptContinue, _sum]: [boolean, number] = attemptSum(sum, b);
        attemptContinue = _attemptContinue;
        sum = _sum;
        b++;
        attemptRange.push(a);
      }

      if (sum === unpairable) {
        const contiguous: number[] = possible.slice(attemptRange[0], attemptRange[0] + attemptRange.length + 1);
        if (contiguous.reduce((a, v) => a + v, 0) === unpairable) range = contiguous;
      }
    }

    console.log(`The encryption weakness is ${Math.min(...range) + Math.max(...range)}`);
  }

  part2();

}