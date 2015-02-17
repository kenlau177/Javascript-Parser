

// Helper Classes - these classes allow the strategy design pattern so that 
// the three tests are gracefully incorporated.

// the syntax list is the syntaxes of interest
var WhiteTest = function(syntaxList) {
	this.syntaxList = syntaxList;
}

// compare the syntax list with the syntaxes found from traversing the 
// abstract syntax tree.
// outputs the syntaxes that are still missing
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

var BlackTest = function(syntaxList) {
	this.syntaxList = syntaxList;
}

// outputs the syntaxes that match with those found in the syntax tree
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

var StructuredTest = function(syntaxList) {
	this.syntaxList = syntaxList;
}

// if the syntaxes match exactly with the abstract syntax tree, then 
// output an empty array
// otherwise output the syntax list.
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


