export module Day_16 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_16/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  interface Rules {
    [rule: string]: Rule[]
  }

  type Rule = {
    from: number,
    to: number
  }

  interface Tickets {
    yours: number[],
    nearby: number[][]
  }

  const rules: Rules = {};
  const tickets: Tickets = {
    yours: [],
    nearby: []
  };
  let set: number = 0;
  
  lines.forEach(l => {
    if (l.length === 0) {
      set++;
      return;
    }
  
    switch (set) {
      case 0: {
        const [rule, values]: string[] = l.split(': ');
        const ruleValues: Rule[] = values.split(' or ').map(r => {
          const [from, to] = r.split('-').map(v => parseInt(v));
          return { from, to };
        });
        rules[rule.replace(' ', '_')] = ruleValues;
        break;
      }
      case 1: {
        if (l === 'your ticket:') return;
        tickets.yours = l.split(',').map(v => parseInt(v));
        break;
      }
      case 2: {
        if (l === 'nearby tickets:') return;
        tickets.nearby.push(l.split(',').map(v => parseInt(v)));
        break;
      }
    }
  });

  const part1 = (): void => {   
    const errors: number[] = [];
    
    tickets.nearby.forEach(ticket => {
      const invalid: number[] = ticket.filter(v => Object.values(rules).flat().map((r: Rule) => v >= r.from && v <= r.to).filter(v => v).length === 0);
      errors.push(...invalid);
    });
    
    console.log(`The ticket scanning error rate is ${errors.reduce((a, v) => a + v, 0)}`);
  }

  part1();

  const part2 = (): void => {
    interface Positions {
      [k: string]: number[]
    }
    
    const validTickets: number[][] = tickets.nearby.filter(ticket => {
      const invalid: number[] = ticket.filter(v => Object.values(rules).flat().map(r => v >= r.from && v <= r.to).filter(v => v).length === 0);
      return invalid.length === 0;
    });
    
    const positions: Positions = {};
    const ticketsByPosition: number[][] = [];
    
    for (let i = 0; i < validTickets[0].length; i++) {
      ticketsByPosition.push(validTickets.map(t => t[i]));
    }
    
    ticketsByPosition.forEach((ticket, i) => {
      for (const rule in rules) {
        const filtered: number[] = ticket.filter(v => {
          return rules[rule].map(r => v >= r.from && v <= r.to).filter(v => v).length > 0;
        });
        if (filtered.length === ticket.length) {
          (positions[rule] = positions[rule] || []).push(i);
        }
      }
    });
    
    const found: number[] = [];
    
    const sortedPositions: Positions = Object.fromEntries(Object.entries(positions).sort(([t1, p1], [t2, p2]) => p1.length - p2.length));
    for (const p in sortedPositions) {
      sortedPositions[p] = sortedPositions[p].filter(v => found.indexOf(v) === -1);
      if (sortedPositions[p].length === 1) found.push(...sortedPositions[p])
    }
    
    const values: (string|number)[][] = Object.entries(sortedPositions).map(([t, [i]]) => [t, tickets.yours[i]]).filter(([t]: [string]) => t.startsWith('departure'));
    const result: number = values.reduce((a, [t, v]: [string, number]) => a * v, 1);

    console.log(`The result after multiplying all departure fields is ${result}`);
  }

  part2();

}