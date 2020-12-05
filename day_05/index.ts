export module Day_05 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_05/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  interface id {
    row: number[],
    seat: number[]
  }

  const part1 = (): number[] => {
    const seatIDs: number[] = lines.map(seat => {
      const ids: id = seat.split('').reduce(({ row: [f, b], seat: [l, r] }, v, i, a) => {
        const pr: number = Math.pow(2, a.slice(-7).length - i);
        const ps: number = Math.pow(2, a.length - i);
        switch (v) {
          case 'F':
            b = Math.floor(b - (pr / 2));
            break;
          case 'B':
            f = f + Math.ceil(pr / 2);
            break;
          case 'L':
            r = Math.floor(r - (ps / 2));
            break;
          case 'R':
            l = l + Math.ceil(ps / 2);
            break;
        }
        return { row: [f, b], seat: [l, r] };
      }, { row: [0, 127], seat: [0, 7] });
      return { row: ids.row[0], seat: ids.seat[0] };
    }).map(({ row, seat }): number => (row * 8) + seat);

    return seatIDs;
  }

  const seats = part1();
  console.log(`The highest possible seat ID is ${Math.max(...seats)}`);

  const part2 = (): void => {
    const seatIDs: number[] = part1();
    const missing: string = seatIDs.sort((a, b) => a - b).map((seat, i, a) => {
      return a[i + 1] - a[i] > 1 ? (seat + 1) : null;
    }).filter(s => s).join(', ');

    console.log(`The empty seat is seat ID ${missing}`);
  }

  part2();

}