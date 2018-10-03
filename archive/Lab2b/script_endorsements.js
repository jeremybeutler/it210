
// localStorage.setItem("name", "");
// localStorage.setItem("date", "");
// localStorage.setItem("storagestring", "");

var endorsement_entries;

window.onload = (function(){
	document.getElementById("field-name").value = (localStorage.getItem("name") !== null && localStorage.getItem("name") !== "") ? localStorage.getItem("name") : "";
	document.getElementById("field-date").value = (localStorage.getItem("date") !== null && localStorage.getItem("date") !== "") ? localStorage.getItem("date") : "";
	document.getElementById("field-endorsement").value = (localStorage.getItem("endorsement") !== null && localStorage.getItem("endorsement") !== "") ? localStorage.getItem("endorsement") : "";
	
	if (localStorage.getItem("storagestring") !== null && localStorage.getItem("storagestring") !== "") 
	{
		endorsement_entries = JSON.parse(localStorage.getItem("storagestring"));
		for (var i = 0; i < endorsement_entries.length; ++i)
		{
			var table_body = document.getElementById("table-body");
			var row_HTML = "<tr><td>" + endorsement_entries[i]['name'] + "</td><td>" + endorsement_entries[i]['date'] + "</td><td>" + endorsement_entries[i]['endorsement'] + "</td></tr>";
			table_body.insertAdjacentHTML( 'beforeend', row_HTML);
		}
	}
	else
	{
		endorsement_entries = [];
	}

	(function timer() 
	{
		$.ajax({
			cache: false,
			url: 'stored_endorsements.json',
			dataType: 'json',
				success: function(data) {
					localStorage.setItem("storagestring", JSON.stringify(data));
					var stored_entries = JSON.parse(localStorage.getItem("storagestring"));
					document.getElementById("table-body").innerHTML = "";

					for (var i = 0; i < stored_entries.length; ++i)
					{
						var row_HTML = "<tr><td>" + stored_entries[i]['name'] + "</td><td>" + stored_entries[i]['date'] + "</td><td>" + stored_entries[i]['endorsement'] + "</td></tr>";
						document.getElementById("table-body").insertAdjacentHTML( 'beforeend', row_HTML);
					}
					setTimeout(timer, 5000);
				},
			statusCode: {
				404: function() {
					alert('There was a problem with the server.  Try again soon!');
				}
			}
	    });
	})();

	document.getElementById("field-name").addEventListener("keyup", function(){
		localStorage.setItem("name", document.getElementById("field-name").value);
	});

	document.getElementById("field-endorsement").addEventListener("keyup", function(){
		localStorage.setItem("endorsement", document.getElementById("field-endorsement").value);
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
			var row_HTML = "<tr><td>" + sorted_by_key[i]['name'] + "</td><td>" + sorted_by_key[i]['date'] + "</td><td>" + sorted_by_key[i]['endorsement'] + "</td></tr>";
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
			var row_HTML = "<tr><td>" + sorted_by_key[i]['name'] + "</td><td>" + sorted_by_key[i]['date'] + "</td><td>" + sorted_by_key[i]['date'] + "</td></tr>";
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
	$('#confirm-submit').modal('toggle');
	var val_name = document.getElementById("field-name").value;
	var val_date = document.getElementById("field-date").value;
	var val_endorsement = document.getElementById("field-endorsement").value;
	var table_body = document.getElementById("table-body");
	var row_HTML = "<tr><td>" + val_name + "</td><td>" + val_date + "</td><td>" + val_endorsement + "</td></tr>";
	table_body.insertAdjacentHTML( 'beforeend', row_HTML);
	var new_entry = {
	  'name'  : val_name,
	  'date': val_date,
	  'endorsement': val_endorsement 
	};
	endorsement_entries = JSON.parse(localStorage.getItem("storagestring"));
	endorsement_entries.push(new_entry);
	var endorsement_entries_JSON = JSON.stringify(endorsement_entries);
	localStorage.setItem("storagestring", endorsement_entries_JSON);
	return false;
}
