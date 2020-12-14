export module Day_14 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_14/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  const SIGNED_INTS: number = 36;

  type Mask = {
    type: string,
    mask?: string
  }

  type Mem = {
    type: string,
    address?: number,
    value?: number
  }

  interface Memory {
    [address: number]: number
  }

  const commands: (Mask|Mem)[] = lines.map(cmd => {
    const match: RegExpExecArray = (/^mem\[(?<address>\d+)\] = (?<value>\d+)$/gmi).exec(cmd);
    if (match) {
      const { address, value } = match.groups;
      return { type: 'mem', address: parseInt(address), value: parseInt(value) }
    } else {
      return { type: 'mask', mask: cmd.substr(7) }
    }
  });

  const bitify = (value: number): string => value.toString(2).padStart(SIGNED_INTS, '0');
  const debitify = (bits: string): number => parseInt(bits, 2);

  const part1 = (): void => {   
    let mask: string = '';
    const memory: Memory = {};

    const applyMask = (bits: string, mask: string): string => {
      const bitsArr: string[] = bits.split('');
      const maskArr: string[] = mask.split('');
      return bitsArr.map((b, i) => maskArr[i] === 'X' ? b : maskArr[i]).join('');
    }
    
    commands.forEach((cmd: any) => {
      switch (cmd.type) {
        case 'mask':
          mask = cmd.mask;
          break;
        case 'mem':
          memory[cmd.address] = debitify(applyMask(bitify(cmd.value), mask));
          break;
      }
    });
    
    const sum: number = Object.values(memory).reduce((a: number, v: number) => a + v, 0);
    console.log(`The sum of all values left in memory is ${sum}`);
  }

  part1();

  const part2 = (): void => {
    let mask: string = '';
    const memory: Memory = {};

    interface MaskResult {
      bits: string,
      floats: number[]
    }

    const applyMask = (bits: string, mask: string): MaskResult => {
      const bitsArr: string[] = bits.split('');
      const maskArr: string[] = mask.split('');
      const floats: number[] = [];

      const bitsRes: string = bitsArr.map((b, i) => {
        switch (maskArr[i]) {
          case '0':
            return b;
          case '1':
            return '1';
          case 'X':
            floats.push(i);
            return 'X';
        }
      }).join('');
    
      return { bits: bitsRes, floats };
    }
    
    commands.forEach((cmd: any) => {
      switch (cmd.type) {
        case 'mask':
          mask = cmd.mask;
          break;
        case 'mem':
          const { bits, floats }: MaskResult = applyMask(bitify(cmd.address), mask);
    
          const combinations: string[] = [];
          for (let i = 0; i < Math.pow(2, floats.length); i++) {
            combinations.push(i.toString(2).padStart(floats.length, '0'));
          }
    
          combinations.forEach(combination => {
            let n: number = 0;
            const bitsAddress: string = bits.split('').map((b, i) => b === 'X' ? combination[n++] : b).join('');
            const address: number = debitify(bitsAddress);
            memory[address] = cmd.value;
          });
          
          break;
      }
    });
    
    const sum: number = Object.values(memory).reduce((a: number, v: number) => a + v, 0);
    console.log(`The sum of all values left in memory after using a version 2 decoder chip is ${sum}`);
  }

  part2();

}