export module Day_03 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_03/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  const part1 = () => {
    const matches: string[] = lines.filter((line, i) => {
      const pos: number = ((i * 3) + 1) % line.length || line.length;
      // console.log(pos);
      return line.charAt(pos - 1) === '#';
    });

    console.log(`We encounter ${matches.length} trees`);
  }

  part1();

  const part2 = (right: number, down: number = 1) => {
    const matches: string[] = lines.filter((line, i) => i % down === 0).filter((line, i) => {
      const pos: number = ((i * right) + 1) % line.length || line.length;
      return line.charAt(pos - 1) === '#';
    });

    return matches;
  }

  console.log(part2(1).length);
  console.log(part2(3).length);
  console.log(part2(5).length);
  console.log(part2(7).length);
  console.log(part2(1, 2).length);
  console.log(`Total trees: ${part2(1).length * part2(3).length * part2(5).length * part2(7).length * part2(1, 2).length}`);
}