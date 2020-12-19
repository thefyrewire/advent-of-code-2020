export module Day_18 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_18/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  const hasBrackets = (input: string): boolean => !!input.match(/[\(\)]/gm);

  const part1 = (): void => {   
    const reduce = (exp: string): number => {
      while (hasBrackets(exp)) {
        exp = exp.replace(/\([^()]+\)/gm, (matched): any => {
          return reduce(matched.slice(1, matched.length - 1));
        });
      }

      while (isNaN(Number(exp))) {
        exp = exp.replace(/(\d+) ([+*]) (\d+)/, (matched, a, operator, b): any => {
          return operator === '+' ? (parseInt(a) + parseInt(b)) : (parseInt(a) * parseInt(b))
        });
      }
      
      return Number(exp);
    }

    const sum: number = lines.reduce((a, v) => a += reduce(v), 0);
    console.log(`The sum of expressions is ${sum}`);
  }

  part1();

  const part2 = (): void => {
    const reduce = (exp: string): number => {
      while (hasBrackets(exp)) {
        exp = exp.replace(/\([^()]+\)/gm, (matched): any => {
          return reduce(matched.slice(1, matched.length - 1));
        });
      }

      while (exp.match(/\+/)) {
        exp = exp.replace(/(\d+) ([+]) (\d+)/, (matched, a, operator, b): any => {
          return parseInt(a) + parseInt(b);
        });
      }

      while (exp.match(/\*/)) {
        exp = exp.replace(/(\d+) ([*]) (\d+)/, (matched, a, operator, b): any => {
          return (parseInt(a) * parseInt(b));
        });
      }
      
      return Number(exp);
    }

    const sum: number = lines.reduce((a, v) => a += reduce(v), 0);
    console.log(`The sum of expressions with the advanced rules is ${sum}`);
  }

  part2();

}