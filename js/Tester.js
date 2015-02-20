// The main parser API

// constructor
var Tester = function(typeOfTest, syntaxList) {
	this.Test = this.mapTypeOfTest(typeOfTest, syntaxList);
	this.syntaxList = syntaxList;
}

// public method
Tester.prototype.execute = function(code) {
	collectedItems = this.collectTypes(code);
	items = this.Test.checkItems(collectedItems);

	return this.Test.getMessage(items);
}

// private methods

// maps to one of the three helper classes. This allows the strategy 
// design pattern and avoids many switch statements in other 
// methods.
Tester.prototype.mapTypeOfTest = function(typeOfTest, syntaxList) {
	switch(typeOfTest) {
		case 'whiteList':
			return new WhiteTest(syntaxList);
			break;
		case 'blackList':
			return new BlackTest(syntaxList);
			break;
		case 'structured':
			return new StructuredTest(syntaxList);
			break;
		default:
			throw "Wrong type of test input";
	}
}

// extract syntaxes found from the code
Tester.prototype.collectTypes = function(code) {
	try {
		var ast = esprima.parse(code);

		var collectedTypes = [];
		function addToCollectedTypes(type) {
			collectedTypes.push(type);
		}
		
		syntaxList = this.syntaxList;
		traverse(ast, function(node) {
			for(s in syntaxList) {
				if (node.type === syntaxList[s]) {		
					addToCollectedTypes(syntaxList[s]);
				}
			}
		});
	} catch(e) {	
		return [];
	}
	return collectedTypes;
}

// static methods
function splitAndLowerStr(str) {
	// split by upper case letters
	var arr = str.split(/(?=[A-Z])/);
	var out = "";
	for(i = 0; i < arr.length; i++) {
		out = out + arr[i].toLowerCase() + " ";
	}
	return out.trim();
}

// concatenate strings by commas
function concatStrings(strArr) {
	var out = "";
	for(s in strArr) {
		if(parseInt(s) === (strArr.length - 1)) {
			out = out + splitAndLowerStr(strArr[s]);
			return out;
		}
		var str = splitAndLowerStr(strArr[s]);
		out = out + str + ", ";
	}
	return out;
}

// traverse down the abstract syntax tree given by esprima's parse
// function, and apply a function to each node.
function traverse(node, func) {
  func(node);
  for (var key in node) {
    if (node.hasOwnProperty(key)) {
      var child = node[key];
      if (typeof child === 'object' && child !== null) {
        if (Array.isArray(child)) {
          child.forEach(function(node) {
              traverse(node, func);
          });
        } else {
          traverse(child, func);
        }
      }
    }
  }
}


