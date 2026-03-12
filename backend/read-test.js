import fs from 'fs';
const output = fs.readFileSync('test-prompt-output.txt', 'utf16le');
console.log(output);
