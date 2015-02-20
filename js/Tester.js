/*
The main parser API. The method <code>execute</code> is used to parse a string of 
text and reply whether the text passes one of three tests.
*/

/*
constructor - creates a tester object to allow for testing

@param typeOfTest
					A string indicating the type of test ('whiteList', 'blackList', 'structured')
@param syntaxList
					An array of syntaxes following the convention given by esprima's 
					module at http://esprima.org/test/module.html
*/
var Tester = function(typeOfTest, syntaxList) {
	this.Test = this.mapTypeOfTest(typeOfTest, syntaxList);
	this.syntaxList = syntaxList;
}

/*
public method - takes in a string of text and checks to see whether the test passses

@param code
					A string of text

@return A string that gives a suggestion based on the test ran.
*/
Tester.prototype.execute = function(code) {
	collectedItems = this.collectTypes(code);
	items = this.Test.checkItems(collectedItems);

	return this.Test.getMessage(items);
}

// The following are private methods

/*
Maps to one of the three helper classes. This allows the strategy 
design pattern and avoids numerous switch statements.
*/
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

// The following are static methods

/*
Split by upper case letters, and then make all letters lower case
*/
function splitAndLowerStr(str) {
	var arr = str.split(/(?=[A-Z])/);
	var out = "";
	for(i = 0; i < arr.length; i++) {
		out = out + arr[i].toLowerCase() + " ";
	}
	return out.trim();
}


/*
Concatenate strings by commas

@param strArr
					An array of strings

@return A string
*/
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

/*
Traverse down the abstract syntax tree given by esprima's parse
function, and apply a function to each node.
*/
function traverse(node, func) {
  func(node);
  for (var key in node) {
    // this is the convention for looping for object's properties
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






