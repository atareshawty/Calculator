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
  console.log(tokens);
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
  return 0;
}
