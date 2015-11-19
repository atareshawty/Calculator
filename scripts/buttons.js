$(document).ready(function() {
  var screenInfo = $('.expression-container p');
  var answerScreen = $('.answer-container p');
  answerScreen.text('Answers go here!');
  screenInfo.text('');
  buttonEvents(screenInfo, answerScreen);
});


function buttonEvents(sourceElement, targetElement) {
  $('.button-container button').on('click', function(e) {
    var elementText = sourceElement.text();
    switch (e.target.id) {
      case 'clr':
        sourceElement.text('');
        break;
      case '=':
        targetElement.text(evaluateExpression(elementText));
        sourceElement.text('');
        break;
      case 'delete':
        sourceElement.text(elementText.substring(0, elementText.length - 1));
        break;
      default:
        sourceElement.text(elementText + e.target.id);
        break;
    }
  });
}

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
  var expression = parseTerm(tokens), possibleOp;
  if (tokens.length() > 0) {
    possibleOp = tokens.peek();
    if (possibleOp === '+') {
      tokens.dequeue();
      expression += parseTerm(tokens);
    } else if (possibleOp === '-') {
      tokens.dequeue();
      expression -= parseTerm(tokens);
    }
  }
  return expression;
}

/**
  Parses and returns term based on {@tokens}. Reduces {@tokens}
  @param queue of tokens
  @return evaluated term
*/
function parseTerm(tokens) {
  var term = parseFactor(tokens);
  var possibleOp;
  if (tokens.length() > 0) {
    possibleOp = tokens.peek();
    if (possibleOp === '*') {
      tokens.dequeue();
      term *= parseFactor(tokens);
    } else if (possibleOp === '/') {
      tokens.dequeue();
      term /= parseFactor(tokens);
    } else if (possibleOp === '%') {
      tokens.dequeue();
      term %= parseFactor(tokens);
    }
  }
  return term;
}

/**
  Parses factor from queue of tokens. Reduces {@tokens}
  @param queue of tokens
  @return evaluated factor
*/
function parseFactor(tokens) {
  var token = tokens.peek(), total = 0;
  if (token === '(') {
    tokens.dequeue();
    total = parseExpression(tokens);
    tokens.dequeue();
  } else {
    total = parseRealConst(tokens)
  }
  return total;
}

/**
  Parses real const from queue of tokens. Reduces {@tokens}
  @param queue of tokens
  @return value
*/
function parseRealConst(tokens) {
  var realConst;
  realConst = parseDigitSeq(tokens);
  if (tokens.peek() === '.') {
    var decimal = tokens.dequeue();
    decimal += parseDigitSeq(tokens);
    realConst += parseFloat(decimal);
  }
  return realConst;
}

/**
  Parses digit sequence. Reduces {@tokens}
  @param queue of tokens
  @return number based on consecutive tokens
*/
function parseDigitSeq(tokens) {
  var digitSeq = [];
  while (tokens.length() > 0 && !isNaN(parseInt(tokens.peek()))) {
    digitSeq.push(tokens.dequeue());
  }
  return Number(digitSeq.join(''));
}
