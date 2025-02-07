/* In Node.js:
const fs = require('fs');
try {
  initialJSON = fs.readFileSync('example.json');
} catch (ignore) {
  initialJSON = '[]';
}
*/
/* Mocked for this example: */
initialJSON = "[]";

// Common
obj = JSON.parse(initialJSON);
obj.push("three");
finalJSON = JSON.stringify(obj);

/* In Node.js:
fs.writeFileSync('example.json', finalJSON);
*/
/* Mocked for this example: */
console.log(finalJSON);
