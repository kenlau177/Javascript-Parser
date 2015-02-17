# Javascript-Parser

### About:
An API written in javascript that parses a string of javascript code, and executes three different tests. These tests include a white, black, and structured list of functionalities. There is a single function for each of these tests. The output is a string in javascript with a message corresponding to the test performed. The message is a useful feedback upon performing the test.

The javascript parser used is esprima. It has the advantage of speed of execution and clear documentations over other javascript parsers. 

I provided a demo below that incorporates the following tests:

- White list test: for statement, variable declaration, function declaration.
- Black list test: while statement.
- Structured test: function declaration then a for statement.

[Demo](http://kenlau177.github.io/Javascript-Parser/)


