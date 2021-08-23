// partially borrowed from https://github.com/polyfiller-org/library/tree/master/packages/library/css/object-fit
interface CreateSyntaxTokenOptions {
  kind: TokenKind;
  position: number;
  value: string;
}

function createTextSpan(position: number, length: number): TextSpan {
  return {
    start: position,
    length,
    end: position + length
  };
}

function createSyntaxToken({ kind, position, value }: CreateSyntaxTokenOptions): SyntaxToken {
  return {
    kind,
    span: createTextSpan(position, value.length),
    value
  };
}

export const enum TokenKind {
  NUMBER_WITH_UNIT_TOKEN = 'NUMBER_WITH_UNIT_TOKEN',
  WHITESPACE_TOKEN = 'WHITESPACE_TOKEN',
  POSITION_LITERAL_TOKEN = 'POSITION_LITERAL_TOKEN',
  BAD_CHARACTER_TOKEN = 'BAD_CHARACTER_TOKEN',
  END_OF_FILE_TOKEN = 'END_OF_FILE_TOKEN',
  GLOBAL_TOKEN = 'GLOBAL_TOKEN'
}

interface TextSpan {
  readonly start: number;
  readonly end: number;
  readonly length: number;
}

interface SyntaxToken<Kind extends TokenKind = TokenKind> {
  readonly kind: Kind;
  readonly value: string;
  readonly span: TextSpan;
}

export class ObjectPositionParser {
  /**
   * The current position within the source text
   */
  private position = 0;

  /**
   * The start position within the source text
   */
  private start = 0;

  /**
   * The current value within the source text
   */
  private value: string | undefined;

  /**
   * The current TokenKind
   */
  private kind: TokenKind | undefined;

  fourValue = false;

  constructor(private readonly text: string) {
    this.fourValue = text.trim().split(' ').length === 4;
  }

  /**
   * Lexes the input text
   */
  lex(): SyntaxToken {
    this.start = this.position;
    this.kind = undefined;
    this.value = undefined;

    const current = this.current();

    switch (current) {
      case '\0':
        this.kind = TokenKind.END_OF_FILE_TOKEN;
        this.value = '';
        break;

      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        this.readNumberWithUnit();
        break;

      case ' ':
      case '\t':
      case '\n':
      case '\r':
        this.readWhitespace();
        break;

      default:
        if (this.isLetter(current)) {
          this.readLetters();
        }

        break;
    }

    return createSyntaxToken({
      kind: this.kind ?? TokenKind.BAD_CHARACTER_TOKEN,
      value: this.value ?? this.current(),
      position: this.start
    });
  }

  /**
   * Gets the current char
   * @type {string}
   */
  private current(): string {
    return this.peek(0);
  }

  /**
   * Returns true if the given char is a digit
   */
  private isDigit(char: string): boolean {
    return /[0-9.]/.test(char);
  }

  /**
   * Returns true if the given char represents a letter
   */
  private isLetter(char: string): boolean {
    return char.toLowerCase() !== char.toUpperCase();
  }

  /**
   * Returns true if the given char represents whitespace
   */
  private isWhitespace(char: string): boolean {
    return /[\s\t\n\r]/.test(char);
  }

  /**
   * Peeks into the source text from the current position with the given offset
   */
  private peek(offset: number): string {
    const index = this.position + offset;

    if (index >= this.text.length) {
      return '\0';
    }

    return this.text[index];
  }

  /**
   * Reads the number from the text
   *
   */
  private readNumberWithUnit(): void {
    while (this.isDigit(this.current())) {
      this.position++;
    }

    while (this.isLetter(this.current()) || this.current() === '%') {
      this.position++;
    }

    const length = this.position - this.start;
    this.value = this.text.slice(this.start, this.start + length);
    this.kind = TokenKind.NUMBER_WITH_UNIT_TOKEN;
  }

  /**
   * Reads whitespace from the input text
   */
  private readWhitespace() {
    while (this.isWhitespace(this.current())) {
      this.position++;
    }

    const length = this.position - this.start;
    this.value = this.text.slice(this.start, this.start + length);
    this.kind = TokenKind.WHITESPACE_TOKEN;
  }

  /**
   * Reads a sequence of letters
   */
  private readLetters(): void {
    while (this.isLetter(this.current())) {
      this.position++;
    }

    const length = this.position - this.start;
    const text = this.text.slice(this.start, this.start + length);

    switch (text) {
      case 'left':
      case 'right':
      case 'top':
      case 'bottom':
      case 'center':
        this.kind = TokenKind.POSITION_LITERAL_TOKEN;
        this.value = text;
        break;
      case 'inherit':
      case 'initial':
      case 'unset':
      case 'revert':
        this.kind = TokenKind.GLOBAL_TOKEN;
        this.value = text;
        break;
    }
  }
}
