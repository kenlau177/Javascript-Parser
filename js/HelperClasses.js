
// Helper Classes - these classes allow the strategy design pattern so that 
// the three tests are gracefully incorporated.

// White class - performs the white list tests

/*
@param syntaxList
					the syntax list is the syntaxes of interest for the test
*/
var WhiteTest = function(syntaxList) {
	this.syntaxList = syntaxList;
}

/*
Compare the syntax list with the syntaxes found from traversing the 
abstract syntax tree. Checks to see which items are still missing.

@param collectedSyntaxes
						An array of strings corresponding to syntaxes collected from
						traversing the ast.

@return An array of strings corresponding to the syntaxes that are still missing
				from the syntaxes collected from the ast.
*/
WhiteTest.prototype.checkItems = function(collectedSyntaxes) {
	itemsRemain = [];
	for(w in this.syntaxList) {
		if(collectedSyntaxes.indexOf(this.syntaxList[w]) < 0) {
			itemsRemain.push(this.syntaxList[w]);
		}
	}
	return itemsRemain;
}

WhiteTest.prototype.getMessage = function(items) {
	if(items.length > 0) {
		return "This program must use a " + concatStrings(items) + ".";
	} else {
		return "Successfully passed white list test.";
	}
}

WhiteTest.prototype.showAlert = function(message) {
	$("#alert1").html("<div class='alert alert-info'>" + message + "</div>");
  $("#alert1").show();
}


// Black class - performs the black list tests

/*
@param syntaxList
					the syntax list is the syntaxes of interest for the test
*/
var BlackTest = function(syntaxList) {
	this.syntaxList = syntaxList;
}

/*
Compare the syntax list with the syntaxes found from traversing the 
abstract syntax tree (ast). Checks to see which items are present, but 
should not be.

@param collectedSyntaxes
						An array of strings corresponding to syntaxes collected from
						traversing the ast.

@return An array of strings corresponding to the syntaxes that are present 
				from the syntaxes collected from the ast.
*/
BlackTest.prototype.checkItems = function(collectedSyntaxes) {
	itemsPresent = [];
	for(w in this.syntaxList) {
		if(collectedSyntaxes.indexOf(this.syntaxList[w]) >= 0) {
			itemsPresent.push(this.syntaxList[w]);
		}
	}
	return itemsPresent;
}

BlackTest.prototype.getMessage = function(items) {
	if(items.length > 0) {
		return "This program must not use a " + concatStrings(items) + ".";
	} else {
		return "Successfully passed black list test.";
	}
}

BlackTest.prototype.showAlert = function(message) {
	$("#alert2").html("<div class='alert alert-info'>" + message + "</div>");
  $("#alert2").show();
}

// Structured class - performs the structured tests

/*
@param syntaxList
					the syntax list is the syntaxes of interest for the test
*/
var StructuredTest = function(syntaxList) {
	this.syntaxList = syntaxList;
}

/*
Checks to see if the syntaxes collected from the ast match exactly with 
the corresponding structured list. 

@return An array which is empty if the syntaxes collected from the ast matches 
				exactly to the structured criteria, otherwise, return the 
				array corresponding to the exact structured criteria.
*/
StructuredTest.prototype.checkItems = function(collectedSyntaxes) {
	if(collectedSyntaxes.length < this.syntaxList.length) {
		return this.syntaxList;
	}
	for(w in this.syntaxList) {
		if(collectedSyntaxes[w] != this.syntaxList[w]) {
			return this.syntaxList;
		}
	}
	return [];
}

StructuredTest.prototype.getMessage = function(items) {
	if(items.length > 0) {
		return "This program must be coded in the following sequence: " + concatStrings(items) + ".";
	} else {
		return "Successfully passed structured test.";
	}	
}

StructuredTest.prototype.showAlert = function(message) {
	$("#alert3").html("<div class='alert alert-info'>" + message + "</div>");
  $("#alert3").show();
}

