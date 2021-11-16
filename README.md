# graphql-mapper
A tool for mapping simple natural language queries to GraphQL

## 1. Required Packages
The following packages are required in order to run the tool:

  1. Apollo Server (https://www.apollographql.com/docs/apollo-server/getting-started/)
  2. JaroWinkler (https://www.npmjs.com/package/jaro-winkler)
  3. prompt-sync (https://www.npmjs.com/package/prompt-sync)
  4. HTTPS (https://www.npmjs.com/package/https)
  
## 2. Start
Open a terminal/cmd window for this folder and follow these 2 steps:

  1. Run the command "node server" to start the local Apollo server
  2. Open a new terminal/cmd tab or window and run the command "node main" to run the mapping tool
  
You can then enter your query and see the resulting GraphQL query. 
The detected keywords (type, field and operator names) in your query will be shown as well as their interpretation by the system.
If the server is running, the result from the GraphQL query will be returned as well.
