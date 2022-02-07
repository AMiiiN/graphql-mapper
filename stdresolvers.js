// Helper functions
//
function formFieldArrayFromAllInstances(arr, field_name) {
    var res = [];
    for (var i=0; i<arr.length; i++) {
      res.push(arr[i][field_name]);
    }
    return res;
  }
  function getAvg(arr) {
    var sum = 0.0;
    for (var i=0; i<arr.length; i++) {
      sum += arr[i];
    }
    return (sum / arr.length);
  }
  function getMax(arr) {
    var max = arr[0];
    for (var i=1; i<arr.length; i++) {
      if (arr[i] > max) {
        max = arr[i];
      }
    }
    return max;
  }
  function getMin(arr) {
    var min = arr[0];
    for (var i=1; i<arr.length; i++) {
      if (arr[i] < min) {
        min = arr[i];
      }
    }
    return min;
  }
  function getSum(arr) {
    var sum = 0.0;
    for (var i=0; i<arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  }

  module.exports = { formFieldArrayFromAllInstances, getAvg, getMax, getMin, getSum };