// Pure math logic completely independent of the DOM
function normalizeExpression(expr) {
  return expr
    .replace(/asin\(/g, "asinDeg(")
    .replace(/acos\(/g, "acosDeg(")
    .replace(/atan\(/g, "atanDeg(")
    .replace(/sin\(/g, "sinDeg(")
    .replace(/cos\(/g, "cosDeg(")
    .replace(/tan\(/g, "tanDeg(")
    .replace(/asinh\(/g, "asinh(")
    .replace(/sinh\(/g, "sinh(")
    .replace(/\be\b/g, "Math.E")
    .replace(/\bpi\b/g, "Math.PI");
}

function calculateExpression(expression, lastResult = 0) {
  if (!expression) return "0";
  try {
    let normalizedExpression = normalizeExpression(expression);

    // Replace "ans" with last result automatically
    normalizedExpression = normalizedExpression.replace(/\bans\b/gi, lastResult);

    // Calculate result natively (handles standard operators and % Modulus)
    let result = eval(normalizedExpression);
 
    if (isNaN(result) || !isFinite(result)) {
      throw new Error();
    }

    return String(result);
  } catch (e) {
    return "Error";
  }
}

// Node.js export for Jest testing execution
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalizeExpression, calculateExpression };
}