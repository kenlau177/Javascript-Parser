// enter some criteria
// white list corresponds to syntaxes expected in the code
// see esprima's module documentation http://esprima.org/test/module.html to see 
// the syntaxes to choose from
var whiteList = ['ForStatement', 'VariableDeclaration', 'FunctionDeclaration'];
// black list corresponds to syntaxes that should not appear in the code
var blackList = ['WhileStatement'];
// structured list corresponds to the exact sequence of syntaxes that should appear in the code
 var structured  = ['FunctionDeclaration', 'ForStatement'];

// basic usage
var tester1 = new Tester('whiteList', whiteList);
var someString1 = "var a = 1; function temp(){};";
var result1 = tester1.execute(someString1);

var tester2 = new Tester('blackList', blackList);
var someString2 = "var i; while(i < 5){i--};"
var result2 = tester2.execute(someString2);


/*
 intermediate usage - receives input text from an editor, then 
 runs three tests based on the received text. Results are shown 
 on the side of the editor.
*/
editor.on('change', function() {
	// receive text input from editor window
	code = editor.getValue();

	// Input the type of test and list of syntaxes of interest.
	// Currently the input strings 'whiteList', 'blackList', and  
	// 'structured' must match exactly.
	var tester = new Tester('whiteList', whiteList);
	var message = tester.execute(code);
	tester.Test.showAlert(message);

	var tester = new Tester('blackList', blackList);
	var message = tester.execute(code);
	tester.Test.showAlert(message);

	var tester = new Tester('structured', structured);
	var message = tester.execute(code);
	tester.Test.showAlert(message);

})




