var prompt = require("prompt-sync")();
var distance = require("jaro-winkler");

function identifyOperation(rawInput, threshold, showInfo) {
  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  var operationNamesAverage = ['average', 'mean', 'typical', 'avg'];
  var operationNamesMax = ['max', 'maximum', 'maximal', 'highest', 'biggest', 'largest', 'most'];
  var operationNamesMin = ['min', 'minimum', 'minimal', 'lowest', 'smallest'];
  var operationNamesSum = ['sum'];
  var operationNamesCount = ['count'];

  var currentRatings = [];
  var currentDist = [];
  var identifiedOperation = "";

  tokens.forEach( (token) => {

    operationNamesAverage.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        if (showInfo)
          console.log("Operation type found (token: " + token + ", type: " + opToken + ", similarity: " + currentDist + ")");
        identifiedOperation = 'avg';
      }
    });

    operationNamesMin.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        if (showInfo)
          console.log("Operation type found (token: " + token + ", type: " + opToken + ", similarity: " + currentDist + ")");
        identifiedOperation = 'min';
      }
    });

    operationNamesMax.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        if (showInfo)
          console.log("Operation type found (token: " + token + ", type: " + opToken + ", similarity: " + currentDist + ")");
        identifiedOperation = 'max';
      }
    });

    operationNamesSum.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        if (showInfo)
          console.log("Operation type found (token: " + token + ", type: " + opToken + ", similarity: " + currentDist + ")");
        identifiedOperation = 'sum';
      }
    });

    operationNamesCount.forEach( (opToken) => {
      currentDist = distance(token, opToken);
      if (currentDist >= threshold) {
        if (showInfo)
          console.log("Operation type found (token: " + token + ", type: " + opToken + ", similarity: " + currentDist + ")");
        identifiedOperation = 'count';
      }
    });

  });

  return identifiedOperation;  // no special operation type found in the query
}

function identifyType(rawInput, typeNames, threshold, showInfo) {
  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  tokens.forEach( (token) => {
    typeNames.forEach( (typeName) => {
      ratings.push({
        name: typeName,
        token: token,
        similarity: distance(token, typeName.toLowerCase())
      });
    });
  });

  ratings = ratings.filter( (ratedObject) => ratedObject.similarity >= threshold);
  if (showInfo) {
    console.log("Identified types: ");
    console.log(ratings);
  }
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
      var max = ratings[0].similarity;
      ratings.forEach( (ratedObject) => {
        if (ratedObject.similarity > max) {
          max = ratedObject.similarity;
          highestRatedType = ratedObject;
        }
      });
      idTypeName = highestRatedType.name;
    }
  }

  return idTypeName;
}

function identifyFields(rawInput, fieldNames, threshold, showInfo) {
  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  tokens.forEach( (token) => {
    fieldNames.forEach( (fieldName) => {
      ratings.push({
        name: fieldName,
        token: token,
        similarity: distance(token, fieldName.toLowerCase())
      });
    });
  });

  var idFields = [];
  ratings = ratings.filter( (ratedObject) => ratedObject.similarity >= threshold);
  if (showInfo) {
    console.log("Identified fields: ");
    console.log(ratings);
  }
  ratings.forEach( (ratedObject) => {
    idFields.push(ratedObject.name);
  });

  return idFields;
}

function identifySpecificInstance(rawInput, fieldNames, threshold) {
  var tokens = rawInput.split(" ");
  tokens = cleanTokens(tokens);
  var ratings = [];

  tokens.forEach( (token) => {
    // TODO
    }
  );

  return null; // TODO
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

module.exports = { identifyOperation, identifyType, identifyFields, identifySpecificInstance };
