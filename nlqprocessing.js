var prompt = require("prompt-sync")();
var distance = require('jaro-winkler');

function identifyType(rawInput, typeNames, threshold) {
  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  tokens.forEach( (token) => {
    typeNames.forEach( (typeName) => {
      ratings.push({
        name: typeName,
        token: token,
        distance: distance(token, typeName.toLowerCase())
      });
    });
  });

  ratings = ratings.filter( (ratedObject) => ratedObject.distance >= threshold);
  var idTypeName;

  if (ratings.length == 1) {
    idTypeName = ratings[0].name;
  }
  else {
    if (ratings.length < 1) {
      return null;
    }
    else {
      var highestRatedType;
      var max = ratings[0].distance;
      ratings.forEach( (ratedObject) => {
        if (ratedObject.distance > max) {
          max = ratedObject.distance;
          highestRatedType = ratedObject;
        }
      });
      idTypeName = highestRatedType.name;
    }
  }

  return idTypeName;
}

function identifyFields(rawInput, fieldNames, threshold) {
  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  tokens.forEach( (token) => {
    fieldNames.forEach( (fieldName) => {
      ratings.push({
        name: fieldName,
        token: token,
        distance: distance(token, fieldName.toLowerCase())
      });
    });
  });

  var idFields = [];
  ratings = ratings.filter( (ratedObject) => ratedObject.distance >= threshold);
  ratings.forEach( (ratedObject) => {
    idFields.push(ratedObject.name);
  });

  return idFields;
}

function cleanTokens(tokens) {
  tokens.forEach( (token) => {
    token = token.toLowerCase();  // bring all tokens to lower case
    // Remove dots, commas, semicolons, brackets
    token = token.replace(",", "");
    token = token.replace(";", "");
    token = token.replace(".", "");
    token = token.replace("(", "").replace(")", "");
  });

  return tokens;
}

module.exports = { identifyType, identifyFields };
