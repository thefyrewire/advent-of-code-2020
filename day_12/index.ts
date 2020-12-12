export module Day_12 {

  const fs = require('fs');
  const input: string = fs.readFileSync('./day_12/input.txt', 'utf8');
  const instructions: string[] = input.split('\r\n');

  interface Action {
    NORTH: string, SOUTH: string,
    EAST: string, WEST: string,
    LEFT: string, RIGHT: string,
    FORWARD: string
  }

  const ACTION: Action = {
    NORTH: 'N', SOUTH: 'S',
    EAST: 'E', WEST: 'W',
    LEFT: 'L', RIGHT: 'R',
    FORWARD: 'F'
  }
  
  const DIRECTION: string[] = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

  const part1 = (): void => {
    interface Ship { north: number, east: number, direction: number }

    const ship: Ship = {
      north: 0,
      east: 0,
      direction: 1
    }
    
    const rotate = (turndir: string, degrees: number): void => {
      const turns: number = degrees / 90;
      for (let i = 0; i < turns; i++) {
        if (turndir === ACTION.LEFT) {
          ship.direction--;
          if (ship.direction < 0) ship.direction = 3;
        }
        else if (turndir === ACTION.RIGHT) {
          ship.direction++;
          if (ship.direction > 3) ship.direction = 0;
        }
      }
    }
    
    const move = (action: string, distance: number): void => {
      switch (action) {
        case ACTION.NORTH:
          ship.north += distance;
          break;
        case ACTION.SOUTH:
          ship.north -= distance;
          break;
        case ACTION.EAST:
          ship.east += distance;
          break;
        case ACTION.WEST:
          ship.east -= distance;
          break;
      }
    }
    
    const navigate = (instruction: string): void => {
      const [action, value]: [string, number] = [instruction.charAt(0), parseInt(instruction.slice(1, instruction.length))];
      switch (action) {
        case ACTION.NORTH:
        case ACTION.SOUTH:
        case ACTION.EAST:
        case ACTION.WEST:
          move(action, value);
          break;
        case ACTION.LEFT:
        case ACTION.RIGHT:
          rotate(action, value);
          break;
        case ACTION.FORWARD:
          move(ACTION[DIRECTION[ship.direction]], value);
          break;
      }
    }
    
    instructions.forEach(cmd => navigate(cmd));
    console.log(`The Manhattan distance is ${Math.abs(ship.north) + Math.abs(ship.east)}`);
  }

  part1();

  const part2 = (): void => {
    interface Ship { north: number, east: number, waypoint: WayPoint }
    interface WayPoint { x: number, y: number }

    const ship: Ship = {
      north: 0, east: 0,
      waypoint: { y: 1, x: 10, }
    }
    
    const rotateWaypoint = (turndir: string, degrees: number): void => {
      if (turndir === ACTION.LEFT) {
        switch (degrees) {
          case 90:
            const y = ship.waypoint.y;
            ship.waypoint.y = ship.waypoint.x;
            ship.waypoint.x = y * -1;
            break;
          case 180:
            ship.waypoint.y = ship.waypoint.y * -1;
            ship.waypoint.x = ship.waypoint.x * -1;
            break;
          case 270:
            rotateWaypoint(ACTION.RIGHT, 90);
            break;
        }
      } else if (turndir === ACTION.RIGHT) {
        switch (degrees) {
          case 90:
            const y = ship.waypoint.y;
            ship.waypoint.y = ship.waypoint.x * -1;
            ship.waypoint.x = y;
            break;
          case 180:
            ship.waypoint.y = ship.waypoint.y * -1;
            ship.waypoint.x = ship.waypoint.x * -1;
            break;
          case 270:
            rotateWaypoint(ACTION.LEFT, 90);
            break;
        }
      }
    }
    
    const moveWaypoint = (action: string, distance: number): void => {
      switch (action) {
        case ACTION.NORTH:
          ship.waypoint.y += distance;
          break;
        case ACTION.SOUTH:
          ship.waypoint.y -= distance;
          break;
        case ACTION.EAST:
          ship.waypoint.x += distance;
          break;
        case ACTION.WEST:
          ship.waypoint.x -= distance;
          break;
      }
    }
    
    const moveToWaypoint = (distance: number): void => {
      ship.north += ship.waypoint.y * distance;
      ship.east += ship.waypoint.x * distance;
    }
    
    const navigate = (instruction: string): void => {
      const [action, value]: [string, number] = [instruction.charAt(0), parseInt(instruction.slice(1, instruction.length))];
      switch (action) {
        case ACTION.NORTH:
        case ACTION.SOUTH:
        case ACTION.EAST:
        case ACTION.WEST:
          moveWaypoint(action, value);
          break;
        case ACTION.LEFT:
        case ACTION.RIGHT:
          rotateWaypoint(action, value);
          break;
        case ACTION.FORWARD:
          moveToWaypoint(value);
          break;
      }
    }
    
    instructions.forEach(cmd => navigate(cmd));
    console.log(`With the new navigation instructions, the Manhattan distance is ${Math.abs(ship.north) + Math.abs(ship.east)}`)
  }

  part2();

}