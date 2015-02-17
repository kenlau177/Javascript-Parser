
// Helper Classes - these classes correspond to three classes for each of the 
// three types of tests.


var WhiteTest = function(syntaxList) {
	this.syntaxList = syntaxList;
}

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
		return "Successfully passed structed test.";
	}	
}

StructuredTest.prototype.showAlert = function(message) {
	$("#alert3").html("<div class='alert alert-info'>" + message + "</div>");
  $("#alert3").show();
}

