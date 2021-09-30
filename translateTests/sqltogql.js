const keywords = [
  'SELECT',
  'FROM',
  'WHERE'
];

var inputJSON = require('./extracted_train.json');

var queries = [];
//for (var i=0; i<inputJSON.queries.length; i++) {
for (var i=0; i<3; i++) {
  queries.push(inputJSON.queries[i].query);
}

var gqlQueries = [];
// Loop for each SQL query

for (var i=0; i < queries.length; i++) {

  var gqlQuery = '';

  // Split the query string on keywords
  var tempSplit = queries[i];
  tempSplit = tempSplit.split("SELECT")[1];
  tempSplit = tempSplit.split("FROM");

  key_select = tempSplit[0].replace(/\s/g, '');
  key_from = tempSplit[1].replace(/\s/g, '');

  // Check whether SELECT (multiple attributes) separated by commata
  if (key_select.includes(',')) {
    var temp = key_select.split(',');
    key_select = '';
    for (var a=0; a<temp.length; a++) {
      key_select += temp[a];
      if (a != temp.length-1) {
        key_select += ', ';
      }
    }
  }

  gqlQuery = "{ " + key_from + " { " + key_select + " } }";

  console.log("Original query " + i + ": " + queries[i]);
  console.log("GraphQL query " + i + " : " + gqlQuery);

}
