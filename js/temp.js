
// To test, create a nested associative array
// Should look like:
// FunctionDeclaration
// 		--> VariableDeclaration
// So, a variable is inside a function
var structured = {};
structured['FunctionDeclaration'] = {};
structured['FunctionDeclaration']['VariableDeclaration'] = null;

// Input string for the test
var code = "function anything() {var a = 1;}"

function collectTypes(code) {
	try{
		var ast = esprima.parse(code);

		allSyntaxes = [];
		getElementsFromObj(structured, allSyntaxes);
		allSyntaxes.unique();
		var collectedTypes = {};
		traverseStructured(ast, allSyntaxes, collectedTypes);
		var result = checkItems(collectedTypes, structured);
		if(b < 0) {
			console.log("The code should be structured as follows");
			console.log(outputMessage(structured));
		} else {
			console.log("structured tests past");
		}
	}
}

/*
Traverses through obj which is a nested associative array to find all keys 
in the associative array.
*/
function getElementsFromObj(obj, allElements) {
	for(var k in obj) {
		if(obj.hasOwnProperty(k)) {
			allElements.push(k);
			getElementsFromObj(obj[k], allElements);
		}
	}
}

/*
Takes the unique of all elements in an array
*/
Array.prototype.unique = function(){
  var self = this;
  var _a = this.concat().sort();
  _a.sort(function(a,b){
      if(a == b){
          var n = self.indexOf(a);
          self.splice(n,1);
      }
  });
  return self;
};

/* 
Traverse through the ast, and collect the types which match 
the structured critera, and append the collected types in an 
nested associative array
*/
function traverseStructured(node, syntaxList, collectedTypes) {
	for(s in syntaxList) {
		if(node.type === syntaxList[s]) {		
			collectedTypes[syntaxList[s]] = {};
		}
	}
	for(var key in node) {
		if(node.hasOwnProperty(key)) {
			var child = node[key];
			if(typeof child === 'object' && child !== null) {
				if(Array.isArray(child)) {	
					child.forEach(function(node) {
						if(node.type in collectedTypes) {
							traverseStructured(node, syntaxList, collectedTypes[node.type]);	
						} else {
							traverseStructured(node, syntaxList, collectedTypes);
						}
					});
				}	else {
					if(node.type in collectedTypes) {
						traverseStructured(child, syntaxList, collectedTypes[node.type]);	
					} else {
						traverseStructured(child, syntaxList, collectedTypes);
					}
				}
			}
		}
	}
}

/*
Compare the nested associative array obtained by traversing the 
ast with the structured criteria as an associative array given 
in the beginning.
*/
function checkItems(collectedTypes, structured) {
	if(structured == null) {
		return 0;
	}
	for(var k in structured) {
		if(structured.hasOwnProperty(k)) {
			if(!(k in collectedTypes)) {
				return -1;
			} else {
				return 0 + checkItems(collectedTypes[k], structured[k]);
			}
		}
	}
}

function outputMessage(structured) {
	if(structured === null){
		return "";
	}
	for(var k in structured) {
		if(structured.hasOwnProperty(k)) {
			if(typeof structured[k] === "object") {
				return k + "\n\t" + outputMessage(structured[k]);
			}
		}
	}
}




