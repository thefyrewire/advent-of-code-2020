export module Day_08 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_08/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  type Instruction = { cmd: string, val: number }
  type Result = { acc: number, finaljmp: number }

  const instructions: Instruction[]  = lines.map(l => {
    const [cmd, val]: string[] = l.split(' ');
    return { cmd, val: parseInt(val) }
  });

  const runInstructions = (instructions): Result => {
    let i: number = 0;
    const indexed: number[] = [];
    let finaljmp: number = 0;

    const acc: number = instructions.reduce((a: number, v: Instruction, ind: number, arr: Instruction[]) => {
      if (i === arr.length - 1) return a;
      if (indexed.indexOf(i) !== -1) return a;
      const { cmd, val } = arr[i];
      indexed.push(i);
      switch (cmd) {
        case 'nop':
          i++;
          return a;
        case 'acc':
          i++;
          return a + val;
        case 'jmp':
          finaljmp = i;
          i += val;
          return a;
      }
    }, 0);

    return { acc, finaljmp };
  }

  const part1 = (): void => {    
    const { acc } = runInstructions(instructions);
    console.log(`The value of the accumulator before it starts looping is ${acc}`);
  }

  part1();

  const part2 = (): void => {      
    const { finaljmp } = runInstructions(instructions);
    const fixedInstructions: Instruction[] = instructions.map((i, n) => n === finaljmp ? Object.assign(i, { cmd: 'nop' }) : i );

    const { acc } = runInstructions(fixedInstructions);
    console.log(`The value of the accumulator after it now terminates properly is ${acc}`);
  }

  part2();

}