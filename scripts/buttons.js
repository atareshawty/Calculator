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
  var answer = parseExpression(tokens);
  console.log(answer);
  return answer;
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
  console.log('From parseExpression: tokens = ');
  tokens.print();
  var expression = parseTerm(tokens), possibleOp;
  if (tokens.length() > 0) {
    console.log('From parseExpression inside if: tokens = ');
    tokens.print();
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

function parseTerm(tokens) {
  console.log('From parseTerm: tokens = ')
  tokens.print();
  var term = parseFactor(tokens);
  var possibleOp;
  if (tokens.length() > 0) {
    console.log('From parseTerm inside if: tokens = ');
    tokens.print();
    possibleOp = tokens.peek();
    if (possibleOp === '*') {
      tokens.dequeue();
      term *= parseFactor(tokens);
    } else if (possibleOp === '/') {
      tokens.dequeue();
      term /= parseFactor(tokens);
    }
  }
  return term;
}

function parseFactor(tokens) {
  console.log('From parseFactor: tokens = ');
  tokens.print();
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
  console.log('From parseDigitSeq: tokens = ')
  tokens.print();
  var digitSeq = [];
  while (tokens.length() > 0 && !isNaN(parseInt(tokens.peek()))) {
    digitSeq.push(tokens.dequeue());
  }
  return Number(digitSeq.join(''));
}
