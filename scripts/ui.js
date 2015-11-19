$(document).ready(function() {
  var screenInfo = $('.expression-container p');
  var answerScreen = $('.answer-container p');
  answerScreen.text('Answers go here!');
  screenInfo.text('');
  buttonEvents(screenInfo, answerScreen);
  keyboardEvents(screenInfo, answerScreen);
});


function buttonEvents(sourceElement, targetElement) {
  $('.button-container button').on('click', function(e) {
    var elementText = sourceElement.text();
    switch (e.target.id) {
      case 'equals':
        targetElement.text(evaluateExpression(elementText));
        sourceElement.text('');
        break;
      case 'delete':
        sourceElement.text(elementText.substring(0, elementText.length - 1));
        break;
      case 'plus':
        sourceElement.text(elementText + '+');
        break;
      case 'decimal':
        sourceElement.text(elementText + '.');
        break;
      case 'leftParen':
        sourceElement.text(elementText + '(');
        break;
      case 'rightParen':
        sourceElement.text(elementText + ')');
        break;
      case 'times':
        sourceElement.text(elementText + '*');
        break;
      case 'divide':
        sourceElement.text(elementText + '/');
        break;
      case 'exp':
        sourceElement.text(elementText + '^');
        break;
      default:
        sourceElement.text(elementText + e.target.id);
        break;
    }
  });
}

/**
 * Takes valid keyboard input and puts onto screen
*/
function keyboardEvents(source, target) {
  $(document).keypress(function(key) {
    console.log(key.which);
    var keyPress = String.fromCharCode(key.which);
    if (key.which === 13 || key.which === 8 || key.which === 46) {
      pressEnterOrDelete(key.which);
    } else {
      pressDigitOrOperator(keyPress);
    }      
  });
}

function pressEnterOrDelete(value) {
  var idString = '#';
  switch(value) {
    case 13:
      idString += 'equals';
      break;
    case 8:
      idString += 'delete';
      break;
    case 46:
      idString += 'delete';
      break;
    default:
      break;
  }
  $(idString).trigger('click');
}
function pressDigitOrOperator(keyPress) {
  var idString = '#';
  switch(keyPress) {
    case '+':
      idString += 'plus';
      break;
    case '.':
      idString += 'decimal';
      break;
    case '=':
      idString += 'equals';
      break;
    case '(':
      idString += 'leftParen';
      break;
    case ')':
      idString += 'rightParen';
      break;
    case '*':
      idString += 'times';
      break;
    case '/':
      idString += 'divide';
      break;
    case '^':
      idString += 'exp';
      break;
    default:
      idString += keyPress;
      break;
  }
  $(idString).trigger('click');
}