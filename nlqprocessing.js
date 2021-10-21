var prompt = require("prompt-sync")();

// Get database columns
//
const columns = ['Date', 'Price', 'Volume'];
const content = [['17-08-2020', '09-01-2021', '24-06-2021'], ['95.80', '101.20', '81.90'], [33, 41, 25]];

var unifiedColumns = [];
for (var i=0; i<columns.length; i++) {
    unifiedColumns.push(columns[i].toLowerCase());
}

// Create input interface and prompt natural language query
//
var nlq = prompt("Please enter your search query: ").toLowerCase();
//console.log("Your simplified search query is: " + nlq);

// Search for occurrence of column names in the NLQ
//
var columnOccurs = [];
for (var i=0; i < unifiedColumns.length; i++) {
    if (nlq.includes(unifiedColumns[i])) {
        columnOccurs.push(true);
    }
    else {
        columnOccurs.push(false);
    }
}
//console.log(columnOccurs);

// Print out requested column(s)
for (var i=0; i<columns.length; i++) {
    if (columnOccurs[i] == true) {
        console.log("Result for '" + columns[i] + "' in 'Transactions': ");
        console.log(content[i]);
    }
}

// ----------------
// Helper functions
// ----------------

function countOccurrences(arr, value) {
    var counter = 0;
    for(var i=0; i<arr.length; i++) {
        if (arr[i] == value) {
            counter++;
        }
    }
    return counter;
}