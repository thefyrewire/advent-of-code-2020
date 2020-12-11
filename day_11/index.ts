export module Day_11 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_11/input.txt', 'utf8');
  const rows: string[] = input.split('\r\n');

  const STATE = {
    EMPTY: 'L',
    OCCUPIED: '#',
    FLOOR: '.'
  }

  interface SeatState {
    empty: number,
    occupied: number,
    floor?: number
  }

  interface NextSeatState {
    seat: string,
    adjacent: SeatState
  }
  
  const countStates = (states: string[]): SeatState => {
    const empty: number = states.filter(s => s === STATE.EMPTY).length;
    const occupied: number = states.filter(s => s === STATE.OCCUPIED).length;
    const floor: number = states.filter(s => s === STATE.FLOOR).length;
  
    return { empty, occupied, floor }
  }

  const iterateState = (seats: string[], nextSeatfn: Function): SeatState => {
    let lastCount: SeatState;
    const iteration: string[] = [];
  
    for (const [r, row] of seats.entries()) {
      let next: string = '';
      row.split('').forEach((col, c) => next += nextSeatfn(seats, r, c));
      iteration.push(next);
    }
  
    const newState: SeatState = countStates(iteration.join('').split(''));
    const oldState: SeatState = countStates(seats.join('').split(''));
  
    lastCount = newState;
    if (newState.empty !== oldState.empty || newState.occupied !== oldState.occupied) return iterateState(iteration, nextSeatfn);
  
    return lastCount;
  }

  const part1 = (): void => {
    const getSeatStates = (seats: string[], row: number, col: number): NextSeatState => {
      const seat = (row: number, col: number): string => row >= 0 && row < seats.length && col >= 0 && col < seats[0].length ? seats[row].charAt(col) : null;
    
      const states = [];
      for (let r = row - 1; r <= row + 1; r++) {
        for (let c = col - 1; c <= col + 1; c++) {
          if (r === row && c === col) continue;
          states.push(seat(r, c));
        }
      }
    
      const adjacent = states.filter(s => s);
      const { empty, occupied } = countStates(adjacent);
    
      return { seat: seat(row, col), adjacent: { empty, occupied } }
    }

    const getNextSeatState = (seats: string[], row: number, col: number): string => {
      const { seat, adjacent: { empty, occupied } }: NextSeatState = getSeatStates(seats, row, col);
      let state: string = seat;
      switch (seat) {
        case STATE.EMPTY:
          if (occupied === 0) state = STATE.OCCUPIED;
          break;
        case STATE.OCCUPIED:
          if (occupied >= 4) state = STATE.EMPTY;
          break;
      }
      return state;
    }
    
    const { occupied }: SeatState = iterateState(rows, getNextSeatState);
    console.log(`After people stop moving around, there are ${occupied} occupied seats`);
  }

  part1();

  interface SeatDirection {
    N: string[], NE: string[],
    E: string[], SE: string[],
    S: string[], SW: string[],
    W: string[], NW: string[]
  }

  const part2 = (): void => {
    const getSeatStates = (seats: string[], row: number, col: number): NextSeatState => {
      const seat = (row: number, col: number): string => row >= 0 && row < seats.length && col >= 0 && col < seats[0].length ? seats[row].charAt(col) : null;
      const foundSeat = (dir: string[]): boolean => dir.indexOf(STATE.OCCUPIED) !== -1 || dir.indexOf(STATE.EMPTY) !== -1;
    
      const seatdir: SeatDirection = {
        N: [], NE: [],
        E: [], SE: [],
        S: [], SW: [],
        W: [], NW: []
      }
    
      for (let c = col + 1; c <= seats[0].length - 1; c++) {
        if (foundSeat(seatdir.E)) break;
        seatdir.E.push(seat(row, c));
      }
    
      for (let c = col - 1; c >= 0; c--) {
        if (foundSeat(seatdir.W)) break;
        seatdir.W.push(seat(row, c));
      }
    
      for (let r = row - 1; r >= 0; r--) {
        if (foundSeat(seatdir.N)) break;
        seatdir.N.push(seat(r, col));
      }
    
      for (let r = row + 1; r <= seats.length; r++) {
        if (foundSeat(seatdir.S)) break;
        seatdir.S.push(seat(r, col));
      }
    
      let cUpL: number = col - 1;
      for (let r = row - 1; r >= 0; r--) {
        if (foundSeat(seatdir.NW)) break;
        seatdir.NW.push(seat(r, cUpL));
        cUpL--;
      }
    
      let cDownR: number = col + 1;
      for (let r = row + 1; r < seats.length; r++) {
        if (foundSeat(seatdir.SE)) break;
        seatdir.SE.push(seat(r, cDownR));
        cDownR++;
      }
    
      let cUpR: number = col + 1;
      for (let r = row - 1; r >= 0; r--) {
        if (foundSeat(seatdir.NE)) break;
        seatdir.NE.push(seat(r, cUpR));
        cUpR++;
      }
    
      let cDownL: number = col - 1;
      for (let r = row + 1; r < seats.length; r++) {
        if (foundSeat(seatdir.SW)) break;
        seatdir.SW.push(seat(r, cDownL));
        cDownL--;
      }
    
      const states: string[] = Object.values(seatdir).map(d => d.filter(s => s !== STATE.FLOOR)).flat();
      const adjacent: string[] = states.filter(s => s);
      const { empty, occupied }: SeatState = countStates(adjacent);
    
      return { seat: seat(row, col), adjacent: { empty, occupied } }
    }
    
    const getNextSeatState = (seats: string[], row: number, col: number): string => {
      const { seat, adjacent: { empty, occupied } }: NextSeatState = getSeatStates(seats, row, col);
      let state: string = seat;
      switch (seat) {
        case STATE.EMPTY:
          if (occupied === 0) state = STATE.OCCUPIED;
          break;
        case STATE.OCCUPIED:
          if (occupied >= 5) state = STATE.EMPTY;
          break;
      }
      return state;
    }
    
    const { occupied }: SeatState = iterateState(rows, getNextSeatState);
    console.log(`With the new visibility method and rule change, there are now ${occupied} occupied seats`);
  }

  part2();
}