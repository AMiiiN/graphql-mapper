const keywords = [
  'SELECT',
  'FROM'
];

const queries = [
  "SELECT salary FROM instructor"
];

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

  gqlQuery = "{ " + key_from + " { " + key_select + " } }";

  console.log("Original query: " + queries[i]);
  console.log("GraphQL query : " + gqlQuery);

}
