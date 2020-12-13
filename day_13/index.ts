export module Day_13 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_13/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  const part1 = (): void => {
    const [timestamp, buses]: [number, number[]] = [parseInt(lines[0]), lines[1].split(',').filter(b => b !== 'x').map(b => parseInt(b))];
    const [bus, earliest]: number[] = buses.map(b => [b, Math.ceil(timestamp / b) * b]).sort(([a1, a2], [b1, b2]) => a2 - b2).filter((b, i) => i === 0).flat();
    
    console.log(`The ID of the bus multiplied by the minutes to wait is ${bus * (earliest - timestamp)}`);
  }

  part1();

  const part2 = (): void => {
    interface Bus {
      index: number,
      bus: number
    }

    const buses: Bus[] = lines[1].split(',').map((b, i) => ({ index: i, bus: parseInt(b) })).filter(({ bus }) => !Number.isNaN(bus));

    const getFirstTimestamp = (): number => {
      const [b1, ...bn]: Bus[] = buses;
      let prime: number = b1.bus;
      let i: number = 0;

      bn.forEach(({ index, bus }) => {
        while (true) {
          if ((i + index) % bus === 0) {
            prime *= bus;
            break;
          }
          i += prime;
        }
      });

      return i;
    }

    console.log(`The timestamp meeting all offset positions is ${getFirstTimestamp()}`)
  }

  part2();

}