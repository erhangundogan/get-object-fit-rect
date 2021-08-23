// partially borrowed from https://github.com/polyfiller-org/library/tree/master/packages/library/css/object-fit
import { ObjectPositionParser, TokenKind } from './objectPositionParser';

export interface ObjectPosition {
  x: string;
  y: string;
}

export const DEFAULT_OBJECT_POSITION: ObjectPosition = {
  x: '50%',
  y: '50%'
};

export function parseObjectPosition(text: string): ObjectPosition {
  const result: Partial<ObjectPosition> = {
    x: undefined,
    y: undefined
  };

  const lexer = new ObjectPositionParser(text);
  let axis: keyof ObjectPosition = 'x';
  let fourValue;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const token = lexer.lex();

    // No matter the token, first check if need to update the axis
    if (axis === 'x') {
      if (result.x != null) {
        axis = 'y';
      }
    }

    // If we already have a value for y, we can break immediately
    else if (axis === 'y') {
      if (result.y != null) {
        break;
      }
    }

    // If we reached the end, or if there is at least one bad character in the input, break parsing immediately
    if (
      token.kind === TokenKind.END_OF_FILE_TOKEN ||
      token.kind === TokenKind.BAD_CHARACTER_TOKEN ||
      token.kind === TokenKind.GLOBAL_TOKEN
    ) {
      break;
    } else if (token.kind === TokenKind.POSITION_LITERAL_TOKEN) {
      if (lexer.fourValue) {
        fourValue = {};
        if (token.value === 'center') {
          break;
        }
        switch (token.value) {
          case 'left':
            if (!result.x) {
              fourValue.x = 0;
            } else {
              result.x = DEFAULT_OBJECT_POSITION.x;
              result.y = DEFAULT_OBJECT_POSITION.y;
            }
            break;
          case 'top':
            if (!result.y) {
              fourValue.y = 0;
            } else {
              result.x = DEFAULT_OBJECT_POSITION.x;
              result.y = DEFAULT_OBJECT_POSITION.y;
            }
            break;
          case 'right':
            if (!result.x) {
              fourValue.x = 100;
            } else {
              result.x = DEFAULT_OBJECT_POSITION.x;
              result.y = DEFAULT_OBJECT_POSITION.y;
            }
            break;
          case 'bottom':
            if (!result.y) {
              fourValue.y = 100;
            } else {
              result.x = DEFAULT_OBJECT_POSITION.x;
              result.y = DEFAULT_OBJECT_POSITION.y;
            }
            break;

          default:
            // If the object position is any other kind of value, fall back to the default position
            return DEFAULT_OBJECT_POSITION;
        }
      } else {
        switch (token.value) {
          case 'left':
            result.x = '0%';
            break;
          case 'top':
            result.y = '0%';
            break;
          case 'center':
            result[axis] = '50%';
            break;
          case 'right':
            result.x = '100%';
            break;
          case 'bottom':
            result.y = '100%';
            break;

          default:
            // If the object position is any other kind of value, fall back to the default position
            return DEFAULT_OBJECT_POSITION;
        }
      }
    } else if (token.kind === TokenKind.NUMBER_WITH_UNIT_TOKEN) {
      if (lexer.fourValue) {
        if (Object.keys(fourValue).includes('x') && !result.x) {
          if (fourValue.x === 0) {
            result.x = token.value;
          } else {
            const percentage = token.value.indexOf('%');
            if (percentage > 0) {
              const percentValue = +token.value.replace('%', '');
              result.x = `${100 - percentValue}%`;
            } else {
              result.x = token.value;
            }
          }
        }

        if (Object.keys(fourValue).includes('y') && !result.y) {
          if (fourValue.y === 0) {
            result.y = token.value;
          } else {
            const percentage = token.value.indexOf('%');
            if (percentage > 0) {
              const percentValue = +token.value.replace('%', '');
              result.y = `${100 - percentValue}%`;
            } else {
              result.y = token.value;
            }
          }
        }
      } else {
        result[axis] = token.value;
      }
    }
  }

  // Ensure that the result has values for both x and y
  result.x ??= DEFAULT_OBJECT_POSITION.x;
  result.y ??= DEFAULT_OBJECT_POSITION.y;

  return result as ObjectPosition;
}
