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
        targetElement.text('');
        break;
      default:
        sourceElement.text(elementText + e.target.id);
        break;
    }
  });
}

function evaluateExpression(expression) {
  var tokens = tokenizeExpression(expression);
  console.log(tokens);
  return parseExpression(tokens);
}

/**
  Tokenizes well formed expression. An expression is a string of numbers with '+' or '-' in between
  @param expression - expression string
  @return array of terms in expression in order they appear
*/
function tokenizeExpression(expression) {
  var tokens = [],length = expression.length, tokenBegin = 0, i = 0;
  while (i < length) {
    var currentChar = expression.charAt(i);
    if (isNaN(parseInt(currentChar))) {
      i++;
      while (isNaN(parseInt(expression.charAt(i)))) {
        i++;
      }
      tokens.push(expression.substring(tokenBegin, i));
      tokenBegin = i;
    } else {
      i++;
      while (!isNaN(parseInt(expression.charAt(i)))) {
        i++;
      }
      tokens.push(Number(expression.substring(tokenBegin, i)));
      tokenBegin = i;
    }
  }
  return tokens;
}

function parseExpression(tokens) {
  return 0;
}
