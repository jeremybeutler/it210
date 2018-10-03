
// localStorage.setItem("name", "");
// localStorage.setItem("date", "");
// localStorage.setItem("storagestring", "");

var endorsement_entries;

window.onload = (function(){

	document.getElementById("field-name").value = (localStorage.getItem("name") !== null && localStorage.getItem("name") !== "") ? localStorage.getItem("name") : "";
	document.getElementById("field-date").value = (localStorage.getItem("date") !== null && localStorage.getItem("date") !== "") ? localStorage.getItem("date") : "";
	
	if (localStorage.getItem("storagestring") !== null && localStorage.getItem("storagestring") !== "") 
	{
		endorsement_entries = JSON.parse(localStorage.getItem("storagestring"));
		for (var i = 0; i < endorsement_entries.length; ++i)
		{
			var table_body = document.getElementById("table-body");
			var row_HTML = "<tr><td>" + endorsement_entries[i]['name'] + "</td><td>" + endorsement_entries[i]['date'] + "</td></td>";
			table_body.insertAdjacentHTML( 'beforeend', row_HTML);
		}
	}
	else
	{
		endorsement_entries = [];
	}

	document.getElementById("field-name").addEventListener("keyup", function(){
		localStorage.setItem("name", document.getElementById("field-name").value);
	});

	document.getElementById("field-date").addEventListener("keyup", function(){
		localStorage.setItem("date", document.getElementById("field-date").value);
	});

	document.getElementById("field-date").addEventListener("change", function(){
		localStorage.setItem("date", document.getElementById("field-date").value);
	});

	document.getElementById("sort-name").onclick = function() {
		var sorted_by_key = JSON.parse(localStorage.getItem("storagestring"));
		sortByKey(sorted_by_key, 'name');
		
		document.getElementById("table-body").innerHTML = "";
		for (var i = 0; i < sorted_by_key.length; ++i)
		{
			var table_body = document.getElementById("table-body");
			var row_HTML = "<tr><td>" + sorted_by_key[i]['name'] + "</td><td>" + sorted_by_key[i]['date'] + "</td></td>";
			table_body.insertAdjacentHTML( 'beforeend', row_HTML);
		}
	};

	document.getElementById("sort-date").onclick = function() {
		var sorted_by_key = JSON.parse(localStorage.getItem("storagestring"));
		sortByKey(sorted_by_key, 'date');

		document.getElementById("table-body").innerHTML = "";
		for (var i = 0; i < sorted_by_key.length; ++i)
		{
			var table_body = document.getElementById("table-body");
			var row_HTML = "<tr><td>" + sorted_by_key[i]['name'] + "</td><td>" + sorted_by_key[i]['date'] + "</td></td>";
			table_body.insertAdjacentHTML( 'beforeend', row_HTML);
		}
	};

	function sortByKey(array, key){
		console.log("here1");

		return array.sort(function(a,b){

			var x = a[key];

			var y = b[key];

			return ((x<y) ?-1:((x>y)?1:0));
		});

	}

});

function createEntry()
{
	var val_name = document.getElementById("field-name").value;
	var val_date = document.getElementById("field-date").value;
	var table_body = document.getElementById("table-body");
	var row_HTML = "<tr><td>" + val_name + "</td><td>" + val_date + "</td></td>";
	table_body.insertAdjacentHTML( 'beforeend', row_HTML);
	var new_entry = {
	  'name'  : val_name,
	  'date': val_date
	};
	endorsement_entries.push(new_entry);
	var endorsement_entries_JSON = JSON.stringify(endorsement_entries);
	localStorage.setItem("storagestring", endorsement_entries_JSON);
	return false;
}
