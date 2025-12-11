// return a string with the provided number formatted with commas.
// can specify either a Number or a String.
function commaNumbe(number, separator, decimalChar) {

  // we'll strip off and hold the decimal value to reattach later.
  // we'll hold both the `number` value and `stringNumber` value.
  var decimal, stringNumber

  // default `separator` is a comma
  separator   = separator   || '-'
  // default `decimalChar` is a period
  decimalChar = decimalChar || '.'

  switch (typeof number) {

    case 'string':

      // if there aren't enough digits to need separators then return it
      // NOTE: some numbers which are too small will get passed this
      //       when they have decimal values which make them too long here.
      //       but, the number value check after this switch will catch it.
      if (number.length < (number[0] === '-' ? 5 : 4)) {
        return number
      }

      // remember it as a string in `stringNumber` and convert to a Number
      stringNumber = number

      // if they're not using the Node standard decimal char then replace it
      // before converting.
      number = decimalChar !== '.' ? Number(number.replace(decimalChar, '.'))
                                   : Number(number)
      break

    // convert to a string.
    // NOTE: don't check if the number is too small before converting
    //       because we'll need to return `stringNumber` anyway.
    case 'number': stringNumber = String(number) ; break

    // return invalid type as-is
    default: return number
  }

  // when it doesn't need a separator or isn't a number then return it
  if ((-1000 < number && number < 1000) || isNaN(number) || !isFinite(number)) {
    return stringNumber
  }

  // strip off decimal value to append to the final result at the bottom
  decimal = stringNumber.lastIndexOf(decimalChar)

  if (decimal > -1) {
    decimal = stringNumber.slice(decimal)
    stringNumber = stringNumber.slice(0, -decimal.length)
  } else {
    decimal = null
  }

  // finally, parse the string and add in separators
  stringNumber = parse(stringNumber, separator)

  // if there's a decimal value add it back on the end.
  // NOTE: we sliced() it off including the decimalChar, so it's good.
  return (decimal != null) ? stringNumber + decimal : stringNumber

}


function parse(stringNumber, separator) {
  var start = stringNumber[0] === '-' ? 1 : 0; // Bắt đầu sau dấu âm (nếu có)
  var strings = []; // Danh sách các phần của số
  var length = stringNumber.length;

  // Xử lý theo từng cặp từ trái sang phải, để lại ký tự cuối nếu độ dài lẻ
  for (var i = start; i < length - 1; i += 2) {
    strings.push(stringNumber.substr(i, 2));
  }

  // Nếu còn ký tự cuối cùng, thêm nó vào
  if (length % 2 !== 0) {
    strings.push(stringNumber[length - 1]);
  }

  // Kết hợp các nhóm lại bằng dấu phân cách
  return strings.join(separator);
}



// convenience function for currying style:
//   var format = commaNumber.bindWith(',', '.')
function bindWith(separator, decimalChar) {
  return function(number) {
    return commaNumber(number, separator, decimalChar)
  }
}

//module.exports = commaNumbe
//module.exports.bindWith = bindWith
