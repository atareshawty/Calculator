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
    if (key.which === 13 || key.which === 8 || key.which === 46) {
      pressEnterOrDelete(key.which);
    } else if ((48 <= key.which && key.which <= 57)|| 96 <= key.which && key.which <= 105 ) {
      pressDigit(key.which);
    } else {
      pressOperator(key.which);
    }  
  });
}

function pressEnterOrDelete(keyCode) {
  switch(keyCode) {
    case 13:
      $('#equals').trigger('click');
      break;
    case 8:
      $('#delete').trigger('click');
      break;
    case 46:
      $('#delete').trigger('click');
      break;
    default:
      break;
  }
}
function pressOperator(keyCode) {
  var idString = '#';
  switch(String.fromCharCode(keyCode)) {
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
      idString += String.fromCharCode(keyCode);
      break;
  }
  $(idString).trigger('click');
}

function pressDigit(keyCode) {
  var idString = '#' + (keyCode - 48);
  $(idString).trigger('click');
}

function isOperator(keyCode) {
  
}