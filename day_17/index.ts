export module Day_17 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_17/input.txt', 'utf8');
  const lines: string[] = input.split('\r\n');

  interface State {
    INACTIVE: string,
    ACTIVE: string
  }

  const STATE: State = {
    INACTIVE: '.',
    ACTIVE: '#'
  }

  const part1 = (): void => {   
    const initial: string[][] = lines.map(l => l.split(''));

    let state: Map<string, boolean> = new Map();

    initial.forEach((row, y) => {
      row.forEach((col, x) => {
        const coords: string = `${x},${y},0`;
        state.set(coords, col === STATE.ACTIVE);
      });
    });

    const iterate = (): void => {
      const keys = state.keys();
      let minX = null, minY = null, minZ = null;
      let maxX = null, maxY = null, maxZ = null;

      for (const key of keys) {
        const [x, y, z]: number[] = key.split(',').map(k => parseInt(k));
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (z < minZ) minZ = z;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        if (z > maxZ) maxZ = z;
      }

      const newState: Map<string, boolean> = new Map();

      for (let x = minX - 1; x <= maxX + 1; x++) {
        for (let y = minY - 1; y <= maxY + 1; y++) {
          for (let z = minZ - 1; z <= maxZ + 1; z++) {

            let neighbours = 0;
            for (let _x = x - 1; _x <= x + 1; _x++) {
              for (let _y = y - 1; _y <= y + 1; _y++) {
                for (let _z = z - 1; _z <= z + 1; _z++) {
                  if (_x !== x || _y !== y || _z !== z) {
                    const coords = `${_x},${_y},${_z}`;
                    if (state.has(coords) && state.get(coords)) {
                      neighbours++;
                    }
                  }
                }
              }
            }

            const coords: string = `${x},${y},${z}`;
            const activated: boolean = state.has(coords) ? state.get(coords) : false;

            if (activated && neighbours !== 2 && neighbours !== 3) newState.set(coords, false);
            else if (!activated && neighbours === 3) newState.set(coords, true);
            else newState.set(coords, activated);
          }
        }
      }
      
      state = newState;
    }

    for (let i = 0; i < 6; i++) {
      iterate();
    }

    let sum: number = 0;
    for (const n of state.values()) {
      if (n) sum++;
    }

    console.log(`After 6 six cycles there are ${sum} active cubes`);
  }

  part1();

  const part2 = (): void => {
    const initial: string[][] = lines.map(l => l.split(''));

    let state: Map<string, boolean> = new Map();

    initial.forEach((row, y) => {
      row.forEach((col, x) => {
        const coords: string = `${x},${y},0,0`;
        state.set(coords, col === STATE.ACTIVE);
      });
    });

    const iterate = (): void => {
      const keys = state.keys();
      let minX = null, minY = null, minZ = null, minW = null;
      let maxX = null, maxY = null, maxZ = null, maxW = null;

      for (const key of keys) {
        const [x, y, z, w]: number[] = key.split(',').map(k => parseInt(k));
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (z < minZ) minZ = z;
        if (w < minW) minW = w;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        if (z > maxZ) maxZ = z;
        if (w > maxW) maxW = w;
      }

      const newState: Map<string, boolean> = new Map();

      for (let x = minX - 1; x <= maxX + 1; x++) {
        for (let y = minY - 1; y <= maxY + 1; y++) {
          for (let z = minZ - 1; z <= maxZ + 1; z++) {
            for (let w = minW - 1; w <= maxW + 1; w++) {

              let neighbours = 0;
              for (let _x = x - 1; _x <= x + 1; _x++) {
                for (let _y = y - 1; _y <= y + 1; _y++) {
                  for (let _z = z - 1; _z <= z + 1; _z++) {
                    for (let _w = w - 1; _w <= w + 1; _w++) {
                      if (_x !== x || _y !== y || _z !== z || _w !== w) {
                        const coords = `${_x},${_y},${_z},${_w}`;
                        if (state.has(coords) && state.get(coords)) {
                          neighbours++;
                        }
                      }
                    }
                  }
                }
              }

              const coords: string = `${x},${y},${z},${w}`;
              const activated: boolean = state.has(coords) ? state.get(coords) : false;

              if (activated && neighbours !== 2 && neighbours !== 3) newState.set(coords, false);
              else if (!activated && neighbours === 3) newState.set(coords, true);
              else newState.set(coords, activated);
            }
          }
        }
      }
      
      state = newState;
    }

    for (let i = 0; i < 6; i++) {
      iterate();
    }

    let sum: number = 0;
    for (const n of state.values()) {
      if (n) sum++;
    }

    console.log(`After 6 cycles in the 4-dimensional space, there are ${sum} active cubes`);
  }

  part2();

}