function evaluateExpression(expression) {
  var tokens = tokenizeExpression(expression);
  return parseExpression(tokens);
}

/**
  Tokenizes well formed expression.
  @param expression - expression string
  @return queue of tokens in expression in order they appear
*/
function tokenizeExpression(expression) {
  var tokens = new Queue();
  for (var i = 0; i < expression.length; i++) {
    tokens.enqueue(expression.charAt(i));
  }
  return tokens;
}

/**
  Parses queue of tokens and returns expression. Reduces {@tokens}
  @param tokens - queue of tokens
  @return evaluated expression based on {@tokens}
*/
function parseExpression(tokens) {
  console.log('parseExpression:');
  tokens.print();
  var expression = parseTerm(tokens);
  if (tokens.length() > 0) {
    var possibleOp = tokens.peek();
    if (possibleOp === '+') {
      tokens.dequeue();
      expression += parseTerm(tokens);
    } else if (possibleOp === '-') {
      tokens.dequeue();
      expression -= parseTerm(tokens);
    }
  }
  expression *= 100;
  expression /= 100;
  console.log('end parseExpression');  
  return expression;
}

/**
  Parses and returns term based on {@tokens}. Reduces {@tokens}
  @param queue of tokens
  @return evaluated term
*/
function parseTerm(tokens) {
  console.log('parseTerm: ');
  tokens.print();
  var term = parseFactor(tokens);
  if (tokens.length() > 0) {
    var possibleOp = tokens.peek();
    switch (possibleOp) {
      case '*':
        tokens.dequeue();
        term *= parseFactor(tokens);
        break;
      case '/':
        tokens.dequeue();
        (factor === 0) ? alert('Don\'t divide by zero, you fool!') : null;
        term /= parseFactor(tokens);
        break;
      case '%':
        tokens.dequeue();
        term %= parseFactor(tokens);
        break;
      case '^':
        tokens.dequeue();
        term = Math.pow(term, parseFactor(tokens));
        break;
      default:
        break;
    }
  }
  console.log('end parseTerm');
  return term;
}

/**
  Parses factor from queue of tokens. Reduces {@tokens}
  @param queue of tokens
  @return evaluated factor
*/
function parseFactor(tokens) {
  console.log('parseFactor: ');
  tokens.print();
  var token = tokens.peek(), total = 0;
  if (token === '(') {
    tokens.dequeue();
    total = parseExpression(tokens);
    tokens.dequeue();
  } else {
    total = parseRealConst(tokens)
  }
  console.log('end parseFactor');
  return total;
}

/**
  Parses real const from queue of tokens. Reduces {@tokens}
  @param queue of tokens
  @return value
*/
function parseRealConst(tokens) {
  console.log('parseRealConst: ');
  tokens.print();
  var realConst = parseDigitSeq(tokens);
  if (tokens.peek() === '.') {
    var decimal = tokens.dequeue();
    decimal += parseDigitSeq(tokens);
    realConst += parseFloat(decimal);
  }
  console.log('end parseRealConst');
  return realConst;
}

/**
  Parses digit sequence. Reduces {@tokens}
  @param queue of tokens
  @return number based on consecutive tokens
*/
function parseDigitSeq(tokens) {
  console.log('parseDigitSeq: ');
  tokens.print();
  var digitSeq = [];
  while (tokens.length() > 0 && !isNaN(parseInt(tokens.peek()))) {
    digitSeq.push(tokens.dequeue());
  }
  console.log('end parseDigitSeq');
  return Number(digitSeq.join(''));
}
