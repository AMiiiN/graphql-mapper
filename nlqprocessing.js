var prompt = require("prompt-sync")();
var distance = require('jaro-winkler');

function identifyType(rawInput, typeNames, threshold) {
  var tokens = rawInput.split(" ");
  var ratings = [];

  tokens.forEach( (token) => {
    typeNames.forEach( (typeName) => {
      ratings.push({
        name: typeName,
        token: token,
        distance: distance(token.toLowerCase(), typeName.toLowerCase())
      });
    });
  });

  ratings.filter( (ratedObject) => ratedObject.distance >= threshold);
  var idTypeName;

  if (ratings.length == 1) {
    idTypeName = ratings[0].name;
  }
  else if (ratings.length == 0) {
    return null;
  }
  else {
    var highestRatedType;
    var max = threshold;
    ratings.forEach( (ratedObject) => {
      if (ratedObject.distance > max) {
        max = ratedObject.distance;
        highestRatedType = ratedObject;
      }
    });
    idTypeName = highestRatedType.name;
  }

  return idTypeName;
}

function identifyFields(rawInput, fieldNames, threshold) {
  var tokens = rawInput.split(" ");
  var ratings = [];

  tokens.forEach( (token) => {
    fieldNames.forEach( (fieldName) => {
      ratings.push({
        name: fieldName,
        token: token,
        distance: distance(token.toLowerCase(), fieldName.toLowerCase())
      });
    });
  });

  var idFields = [];
  ratings = ratings.filter( (ratedObject) => ratedObject.distance >= threshold);
  ratings.forEach( (ratedObject) => {
    idFields.push(ratedObject.name);
  });

  console.log(ratings);
  return idFields;
}

module.exports = { identifyType, identifyFields };
