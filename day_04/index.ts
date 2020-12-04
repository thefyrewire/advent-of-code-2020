export module Day_04 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_04/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  let i: number = 0;
  const passports: string[] = lines.reduce((a, v) => {
    if (v.length === 0) {
      i++;
      return a;
    };
    a[i] = (`${a[i] || ''} ${v}`).trim();
    return a;
  }, []);

  const required: string[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']; // cid not required

  const part1 = (): void => {
    const valid: boolean[] = passports.map(passport => {
      const fields: string[] = passport.match(/\b\w+\:/gmi).map(r => r.substr(0, 3));
      return required.filter(r => fields.indexOf(r) === -1).length === 0;
    }).filter(p => p);

    console.log(`There are ${valid.length} valid passports`);
  }

  part1();

  const part2 = (): void => {
    const valid: boolean[] = passports.map(passport => {
      const fields: string[][] = passport.split(' ').map((s: string) => s.split(':'));
      const validFields: string[][] = fields.filter(([field, value]) => {
        switch (field) {
          case 'byr':
            return parseInt(value) >= 1920 && parseInt(value) <= 2002;
          case 'iyr':
            return parseInt(value) >= 2010 && parseInt(value) <= 2020;
          case 'eyr':
            return parseInt(value) >= 2020 && parseInt(value) <= 2030;
          case 'hgt':
            const regex: RegExp = /(?<height>\d+)(?<units>cm|in)/gmi;
            const matched: RegExpExecArray = regex.exec(value);
            if (!matched) return false;
            const { height, units } = matched.groups;
            return (
              (units === 'cm' && parseInt(height) >= 150 && parseInt(height) <= 193) ||
              (units === 'in' && parseInt(height) >= 59 && parseInt(height) <= 76)
            );
          case 'hcl':
            const chars: string[] = value.split('');
            const hash: string = chars.shift();
            return hash === '#' && chars.filter(c => !c.match(/[a-f0-9]/)).length === 0;
          case 'ecl':
            const colors: string[] = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
            return colors.indexOf(value) !== -1;
          case 'pid':
            return !!value.match(/^\d+$/gmi) && value.length === 9;
        }
      });
      return required.filter(r => validFields.map(r => r[0]).indexOf(r) === -1).length === 0;
    }).filter(p => p);
    
    console.log(`There are ${valid.length} properly validated passports`);
  }

  part2();

}