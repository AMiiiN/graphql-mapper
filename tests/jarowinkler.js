const data = [['Pilots', ['Name', 'Age', 'Email']], ['Aircrafts', ['Model', 'Brand', 'Age']], ['Airports', ['Name', 'City', 'Country', 'Passengers per year']]];
const distance = require('jaro-winkler');
const prompt = require("prompt-sync")();

var input = prompt("Enter your statement: ").split(" ");
var rated_top_layer = [];
var rated_sub_layer = [];

var first_layer = [];
var second_layer = [];

// Extract the names of types (string) and of their fields (array of strings)
data.forEach( (elem) => {
    first_layer.push(elem[0]);
    second_layer.push(elem[1]);
});

// Compute Jaro Winkler Distance for each word
input.forEach( (analyzedToken) => {
    first_layer.forEach(function(typeName) {
      rated_top_layer.push({
        name: typeName,
        distance: distance(analyzedToken.toLowerCase(), typeName.toLowerCase())
      });
    });

    rated_top_layer.sort(function(a, b) {
      if (a.distance < b.distance) {
        return 1;
      } else if (a.distance > b.distance) {
          return -1;
      } else {
        return 0;
      }
    });
});

if (rated_top_layer[0].distance > 0.8) {
    // First layer token found
    console.log("Looking up '" + rated_top_layer[0].name + "' database.");
    // Look up the identified database using jaro winkler
    // Reduce the second layer to elements corresponding to the identified top layer type
    var top_layer_index = first_layer.indexOf(rated_top_layer[0].name);
    second_layer = second_layer[top_layer_index];

    input.forEach( (analyzedToken) => {
        second_layer.forEach( (fieldName) => {
            rated_sub_layer.push({
                name: fieldName,
                distance: distance(analyzedToken.toLowerCase(), fieldName.toLowerCase())
            }); 
        });
    });

    //console.log(rated_sub_layer);
    rated_sub_layer = rated_sub_layer.filter( (elem) => elem.distance > 0.75);

    console.log("Selected fields: ");
    rated_sub_layer.forEach( (elem) => console.log(elem.name));
    console.log(rated_sub_layer);

}
else {
    // Uncertainty
    console.log("Could you please restate the query? It is not perfectly clear which database you want to access.");
}
