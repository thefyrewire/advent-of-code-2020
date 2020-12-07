export module Day_07 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_07/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  type Bag = [string, string[]];

  const part1 = (): void => {
    let rules: Bag[] = lines.map(line => line.split(' contain ').map(s => s.split(',')).flat().map(r => r.replace(/bags?.?/gmi, '').trim())).map(r => [r.shift(), r]);   
    const containsBag: string[] = [];
    let canSearch: boolean = true;

    do {
      canSearch = rules.map(([carry, bags]: Bag) => {
        const exists: boolean = bags.filter(bag => {
          const hasBag: boolean = bag.indexOf('shiny gold') !== -1;
          const hasRelatedBag: boolean = containsBag.map(b => bag.includes(b)).filter(s => s).length > 0;
          return hasBag || hasRelatedBag;
        }).length > 0;
        if (exists) containsBag.push(carry);
        return exists;
      }).filter(s => s).length > 0;
    
      rules = rules.filter(([carry, bags]: Bag) => containsBag.indexOf(carry) === -1);
    
    } while (canSearch);
    
    console.log(`There are ${containsBag.length} bags that can eventually contain a shiny gold bag`);
  }

  part1();

  const part2 = (): void => {
    const rules: Bag[] = lines.map(line => line.split(' contain ').map(s => s.split(',')).flat().map(r => r.replace(/bags?.?/gmi, '').trim())).map(r => [r.shift(), r]);

    const emptyBags: string[] = rules.map(([carry, bags]) => bags[0] === 'no other' ? carry : null).filter(s => s);
    
    const crawlBags = (color): number => {
      const bag: Bag = rules.find(([carry, bags]) => carry === color);
      if (!bag || emptyBags.indexOf(color) !== -1) return 0;

      const [carry, bags]: Bag = bag;
      const parsedBags: [string, number][] = bags.map(b => {
        const [quantity, ...color]: (string|string[]) = b.split(' ');
        const name: string = color.join(' ');
        return [name, parseInt(quantity)];
      });

      let sum: number = 0;

      for (const [name, quantity] of parsedBags) {
        sum += quantity + quantity * crawlBags(name);
      }

      return sum;
    }
    
    const bags = crawlBags('shiny gold');
    console.log(`The single shiny gold bag requires ${bags} bags`);
  }

  part2();

}