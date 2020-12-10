export module Day_10 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_10/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  const adapters = lines.map(l => parseInt(l)).sort((a, b) => a - b);

  const part1 = (): void => {
    const diffs = {
      1: 0,
      2: 0,
      3: 0
    }
    
    for (const [i, n] of adapters.entries()) {
      if (i === 0) diffs[n - 0]++;
      const diff: number = (adapters[i + 1] || n + 3) - n;
      diffs[diff]++;
    }
    
    console.log(`The number of 1-jolt differences multiplied by the number of 3-jolt differences is ${diffs[1] * diffs[3]}`);
  }

  part1();

  const part2 = (): void => {
    const history = {};

    const calculateCombinations = (input: number[]): number => {
      const key: string = input.join('-');
      if (key in history) return history[key];
      let result: number = 1;

      for (const [i, n] of input.entries()) {
        if (input[i + 1] - input[i - 1] <= 3) {
          const sliced: number[] = [input[i - 1], ...input.slice(i + 1)];
          result += calculateCombinations(sliced);
        }
      }

      history[key] = result;
      return result;
    }

    console.log(`There are ${calculateCombinations([0, ...adapters])} distinct ways to arrange the adapters`);
  }

  part2();

}