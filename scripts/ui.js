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
    var keyPress = String.fromCharCode(key.which);
    var idString = '#';
    if (key.which === 13) {
      idString += 'equals';
    } else {
      switch(keyPress) {
        case '+':
          idString += 'plus';
          break;
        case undefined:
          idString += 'equals';
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
    }
    $(idString).trigger('click');
  });
}

