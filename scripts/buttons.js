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
  Tokenizes well formed expression. An expression is defined in cfg.txt
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

function parseExpression(tokens) {
  var expression = parseTerm(tokens);
  var possibleOp;
  if (tokens.length > 0) {
    possibleOp = tokens.dequeue();
    if (possibleOp === '+') {
      expression += parseTerm(tokens);
    } else if (possibleOp === '-') {
      expression -= parseTerm(tokens);
    } else {
      alert('Invalid Input! Try again');
    }
  }
  return expression;
}

function parseTerm(tokens) {
  var term = parseFactor(tokens);
  var possibleOp;
  if (tokens.length > 0) {
    possibleOp = tokens.dequeue();
    if (possibleOp === '*') {
      term *= parseFactor(tokens);
    } else if (possibleOp === '/') {
      term /= parseFactor(tokens);
    } else {
      alert('Invalid Input! Try again');
    }
  }
  return term;
}

function parseFactor(tokens) {
  var token = tokens.peek(), total = 0;
  if (token === '(') {
    tokens.dequeue();
    total = parseExpression(tokens);
    tokens.dequeue();
  } else {
    total = parseDigitSeq(tokens)
  }
  return total;
}

function parseDigitSeq(tokens) {
  var digitSeq = [];
  while (tokens.length > 0) {
    digitSeq.push(tokens.dequeue());
  }
  return Number(digitSeq.join(''));
}
