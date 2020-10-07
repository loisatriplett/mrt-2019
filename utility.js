//*****************************************
//-------------define functions------------
//*****************************************

function showPage(doc_ele) {
    doc_ele.style.visibility = 'visible';
    doc_ele.style.display = 'inline';
}

function hidePage(doc_ele) {
    doc_ele.style.visibility = 'hidden';
    doc_ele.style.display = 'none';
}

function getRandomString(length, chars) {		
    var result = '';		
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];		
    return result;		
}

function getRandomInt(min, max) {
  //random number between min (inclusive) and max (inclusive)
  var min = Math.ceil(min);
  var max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isInArray(value, array) {return array.indexOf(value) > -1;}
