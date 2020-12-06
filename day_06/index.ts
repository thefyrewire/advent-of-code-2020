export module Day_06 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_06/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  let i: number = 0;
  const groups: string[] = lines.reduce((a, v) => {
    if (v.length === 0) {
      i++;
      return a;
    };
    a[i] = (`${a[i] || ''} ${v}`).trim();
    return a;
  }, []);

  const part1 = (): void => {
    const answers: string[][] = groups.map(g => g.split(' ').map(g => g.split('')).flat()).map(g => [...new Set(g)]);
    const sum: number = answers.map(a => a.length).reduce((a, v) => a + v, 0); 

    console.log(`The sum of yes answers is ${sum}`);
  }

  part1();

  interface Answers {
    [k: string]: number
  }

  const part2 = (): void => {
    const answers: number[] = groups.map(g => g.split(' ')).map(group => {
      if (group.length === 1) return group[0].split('').length;
      const answers: string[] = group.map(g => g.split('')).flat();
      const summed: [string, number][] = answers.map((a, i, r) => [a, r.length - r.filter(y => y !== a).length]);
      const everyone: Answers = Object.fromEntries(summed.filter(([answer, count]) => count === group.length));
      return Object.keys(everyone).length;
    });
    const sum: number = answers.reduce((a, v) => a + v, 0); 

    console.log(`The sum of yes answers from everyone is ${sum}`);
  }

  part2();

}