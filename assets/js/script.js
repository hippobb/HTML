var repoList = document.querySelector('ul');
var fetchButton = document.getElementById("search");
var openweatherkey = '5047b93d8c8a3e00e320b778163f5545';
var googlekey = 'AIzaSyA5ury2VC7bslPGGb5hP-9OUTPdMF1fiIY';
// `getApi` function is called when the `fetchButton` is clicked
var DataObj = {
	name: "",
	lat: "",
	lon: "",
	street: "",
	phone: "",
	url: "",
	city: "",
	state:"",
	type: "",
	postal_code:"",
  };
var result=[];
var display_city;
var display_id;

function drawmap(lat,lon)
{
  
  map = new google.maps.Map( document.getElementById( 'map' ), {
    center: {
      lat: lat,
      lng: lon
    },
    zoom: 11
  });
  marker();
}


  function marker(){
  // Create markers.
  var color;
  for (let i = 0; i < result.length; i++) {
	if (i==display_id) color="#F44336";
	else color="#000000";
	check_postal_code(result[i].postal_code,i,color);
  }
}



function Create_Button(){
	document.getElementById("history").remove();
	var newDiv = document.createElement("div");
	newDiv.className = "col-12 col-md-3:w-100  history";
	newDiv.id="history";
	for(i=0;i<result.length;i++){
		var newButton = document.createElement("button");
		newButton.textContent = result[i].name;
		newButton.className = 'btn btn-secondary w-100' ;
		newButton.id=i;
		newDiv.appendChild(newButton);
	}
	
	document.getElementById("shop_list").appendChild(newDiv);
	diaplay_shop_info(0);
	movie();
 }

 function diaplay_shop_info(id){
	document.getElementById("name").innerHTML=result[id].name;
	document.getElementById("address").innerHTML=result[id].street+" , "+result[id].city+" , "+result[id].state+", United State.";
	document.getElementById("phone").innerHTML=result[id].phone;
	document.getElementById("url").innerHTML=result[id].url;
	document.getElementById("url").herf=result[id].url;
	document.getElementById("type").innerHTML=result[id].type;
	display_id=id;

 }


function check_location(c_name) {
	display_city= c_name.charAt(0).toUpperCase() + c_name.slice(1);
	var lat,lon;
  var url= 'https://maps.googleapis.com/maps/api/geocode/json?address='+c_name+'&key='+googlekey;

  fetch(url)  
	.then(function(response) { 
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {      
      throw Error(response.status+" "+response.statusText);
    }
	}) // Convert data to json
	.then(function(data) {
		lat=data.results[0].geometry.location.lat;
		lon=data.results[0].geometry.location.lng;
		brewery_name(c_name,lat,lon);
	})
	.catch(function(error) {
 console.log(error);
	});
}


function check_postal_code(postal_code,pos,color) {
	var lat,lon;
	var url= 'https://maps.googleapis.com/maps/api/geocode/json?key='+googlekey+'&components=postal_code:'+postal_code;

  fetch(url)  
	.then(function(response) { 
	    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {      
      throw Error(response.status+" "+response.statusText);
    }
	}) // Convert data to json
	.then(function(data) {
		if (data.status=='OK'){
		lat=data.results[0].geometry.location.lat;
		lon=data.results[0].geometry.location.lng;
	    const marker = new google.maps.Marker({
			position: new google.maps.LatLng(lat,lon),
			icon: {
				url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
				labelOrigin: new google.maps.Point(75, 32),
				size: new google.maps.Size(32,32),
				anchor: new google.maps.Point(16,32)
			  },
			  label: {
				text: result[pos].name,
				color: color,
				fontSize: "18px"
			  },
		  map: map
		});
	}
			})

	.catch(function(error) {
 console.log(error);
	});
	return[1,2];
}



function movie(){

	var url= 'https://serpapi.com/search.json?q=AMC+Barton+Creek+Square+14&location=aurora+Canada&hl=en&gl=us&api_key=a9538161cd29bef87d1f6d9a0e83d81ed90eee4613eb669c3ddd61740f959337';
	fetch(url, { 
			headers: {
				'Content-type': 'text/html'
			},





	})
	.then(function(response) { 
	  if (response.status >= 200 && response.status <= 299) {
		return response.json();
	  } else {      
		throw Error(response.status+" "+response.statusText);
	  }
	  }) // Convert data to json
	  .then(function(data) {
		console.log(data);
  })
	  .catch(function(error) {
		console.log(error);
 	  });
  }


function brewery_name(city_name,lat,lon){
	display_city= city_name.charAt(0).toUpperCase() + city_name.slice(1);
	var lat,lon;
  var url= 'https://api.openbrewerydb.org/breweries?by_city='+city_name.replace(" ","_")+'&per_page=20';

  fetch(url)  
  .then(function(response) { 
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {      
      throw Error(response.status+" "+response.statusText);
    }
	}) // Convert data to json
	.then(function(data) {
		for(i=0;i<data.length;i++){
			DataObj = {
			name: data[i].name,
			lat: data[i].latitude,
			lon: data[i].longitude,
			street: data[i].street,
			phone: data[i].phone,
			url: data[i].website_url,
			city: data[i].city,
			state:data[i].state,
			type: data[i].brewery_type,
			postal_code: data[i].postal_code
	  	};
	  	result[i]=DataObj;
	}
	Create_Button();	
	drawmap(lat,lon);

})
	.catch(function(error) {
 console.log(error);
	});
}


function historyButtonHandler(event){
	diaplay_shop_info(event.target.id);
	marker();
}

function searchButtonHandler(event){
    check_location(document.getElementById("city_name").value);
}

fetchButton.addEventListener('click', searchButtonHandler);
document.querySelector("#shop_list").addEventListener("click", historyButtonHandler);






