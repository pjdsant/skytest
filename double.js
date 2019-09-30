exports.calculate = function(num) {
  if (typeof num === 'number') {
    return num * 2;
  } else {
    throw new Error('Expected a number');
  }
};
exports.read = function() {
  const stdin = process.openStdin();

  stdin.on('data', function(chunk) {
    const num = parseFloat(chunk);
    try {
      const result = exports.calculate(num);
      console.log('doubled: ' + result);
    } catch (e) {
      console.log(e);
    }
    process.exit();
  });
};
