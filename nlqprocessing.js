var prompt = require("prompt-sync")();
var distance = require("jaro-winkler");

function identifyOperation(rawInput, threshold) {
  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  var operationNamesAverage = ['average', 'mean', 'typical', 'avg'];
  var operationNamesMax = ['max', 'maximum', 'highest', 'biggest'];
  var operationNamesMin = ['min', 'minimum', 'lowest', 'smallest'];

  var currentRatings = [];
  var currentDist = [];
  var identifiedOp = "";

  tokens.forEach( (token) => {

    operationNamesAverage.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        console.log("Operation type found (token: " + token + ", type: " + opToken + ", distance: " + currentDist + ")");
        identifiedOperation = 'avg';
      }
    });

    operationNamesMin.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        console.log("Operation type found (token: " + token + ", type: " + opToken + ", distance: " + currentDist + ")");
        identifiedOperation = 'min';
      }
    });

    operationNamesMax.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        console.log("Operation type found (token: " + token + ", type: " + opToken + ", distance: " + currentDist + ")");
        identifiedOperation = 'max';
      }
    });

  });

  return identifiedOperation;  // no special operation type found in the query
}

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
  console.log("Identified types: ");
  console.log(ratings);
  var idTypeName;

  if (ratings.length == 1) {
    idTypeName = ratings[0].name;
  }
  else {
    if (ratings.length < 1) {
      return null;
    }
    else {
      var highestRatedType = ratings[0];
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
  console.log("Identified fields: ");
  console.log(ratings);
  ratings.forEach( (ratedObject) => {
    idFields.push(ratedObject.name);
  });

  return idFields;
}

function cleanTokens(tokens) {
  var new_tokens = [];
  tokens.forEach( (token) => {
    var current_token = token;
    current_token = current_token.toLowerCase();  // bring all tokens to lower case
    // Remove dots, commas, semicolons, brackets
    current_token = current_token.replace(",", "");
    current_token = current_token.replace(";", "");
    current_token = current_token.replace(".", "");
    current_token = current_token.replace("(", "").replace(")", "");
    new_tokens.push(current_token);
  });

  return new_tokens;
}

module.exports = { identifyOperation, identifyType, identifyFields };
