export module Day_02 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_02/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  const policy1: string[] = lines.filter((line: string) => {
    const [policy, password]: string[] = line.split(': ');
    const [range, letter]: string[] = policy.split(' ');
    const [min, max]: number[] = range.split('-').map(r => parseInt(r));
    const matches = (password.match(new RegExp(letter, 'gm')) || []).length;
    return matches >= min && matches <= max;
  });

  console.log(`There are ${policy1.length} passwords that pass policy 1.`);
  // console.log(policy1);

  const policy2: string[] = lines.filter((line: string) => {
    const [policy, password]: string[] = line.split(': ');
    const [position, letter]: string[] = policy.split(' ');
    const positions: number[] = position.split('-').map(r => parseInt(r));
    
    return positions.map(p => password.charAt(p - 1) === letter).filter(c => c).length === 1;
  });

  console.log(`There are ${policy2.length} passwords that pass policy 2.`);
  // console.log(policy2);

  // 6-10 s: snkscgszxsssscss
}