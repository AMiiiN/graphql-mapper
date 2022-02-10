// Standard resolvers
//
function stdResolvers(allTypes) {
    return {
        // avg(type: "typename", field: "fieldname")
        avg: (obj, args) => {
            return getAvg(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
        },
        max: (obj, args) => {
            return getMax(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
        },
        min: (obj, args) => {
            return getMin(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
        },
        sum: (obj, args) => {
            return getSum(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
        },
        count: (obj, args) => {
            return formFieldArrayFromAllInstances(allTypes[args.type], args.field).length;
        },
        getSpecificInstances: (obj, args) => {
            var refValue;
            var targetInstances;
            if (args.op == "min") {
            refValue = getMin(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
            targetInstances = allTypes[args.type].filter(instance => instance[args.field] == referenceValue);
            }
            if (args.op == "max") {
            refValue = getMax(formFieldArrayFromAllInstances(allTypes[args.type], args.field));
            targetInstances = allTypes[args.type].filter(instance => instance[args.field] == referenceValue);
            }
            if (args.op == "=") {
            targetInstances = allTypes[args.type].filter(instance => instance[args.field] == args.value);
            }
            if (args.op == "<") {
            targetInstances = allTypes[args.type].filter(instance => instance[args.field] < args.value);
            }
            if (args.op == ">") {
            targetInstances = allTypes[args.type].filter(instanve => instance[args.field] > args.value);
            }
            return targetInstances;
        }
    };
}

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

  module.exports = { formFieldArrayFromAllInstances, getAvg, getMax, getMin, getSum, stdResolvers };