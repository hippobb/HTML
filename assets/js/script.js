var repoList = document.querySelector('ul');
var fetchButton = document.getElementById("search");
var openweatherkey = '5047b93d8c8a3e00e320b778163f5545';
var googlekey = 'AIzaSyA5ury2VC7bslPGGb5hP-9OUTPdMF1fiIY';
const weekday= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const short_weekday= ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
// `getApi` function is called when the `fetchButton` is clicked
var city=[];
var display_city;
var q1;
const sp_char = '\u{02109}';
const sp_char2 = '\u{02103}';

//Load the history record from the loca staorage if it is exisit
if(JSON.parse(localStorage.getItem('city_history'))!=null)  city = JSON.parse(localStorage.getItem('city_history')); 
document.addEventListener('DOMContentLoaded', function() {
	var city = JSON.parse(localStorage.getItem('city_history')); 
	if (city!=null) {
		for (var i=0; i< city.length;i++){
			var newButton = document.createElement("button");
			newButton.textContent = city[i];
			newButton.className = 'btn btn-secondary w-100 target='+city[i];			
			newButton.id = city[i];
			document.getElementById("history").appendChild(newButton);
		}
	}
  }, false);

function C_to_F (temp){
	return ((temp* 9/5) + 32).toFixed(2);

}

//Draw the map
function drawmap(lat,lon)
{
  map = new google.maps.Map( document.getElementById( 'map' ), {
    center: {
      lat: lat,
      lng: lon
    },
    zoom: 11
  });
  const image =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
const beachMarker = new google.maps.Marker({
  position: { lat: lat, lng: lon },
  map,
  icon: image,
});
}
  

//Create the history button
function Create_Button(){
	var match=-1;
	var name

	if (city==null) {
		city[0]=display_city
		localStorage.setItem('city_history', JSON.stringify(city));
		var newButton = document.createElement("button");
		newButton.textContent = document.getElementById("city_name").value;
		newButton.className = 'btn btn-secondary w-100' ;
		newButton.id=document.getElementById("city_name").value;
		document.getElementById("history").appendChild(newButton);
	}
	else {
		for(var i=0;i<city.length;i++){
			if(city[i]==display_city) match=i;
		}
	
		if (match<0){		
			if (city.length>9){
				document.getElementById(city[0]).remove();
				for (var i=1;i<city.length;i++) city[i-1]=city[i]
				city[city.length]=display_city;
			}
			else{
				city[city.length]=display_city;
			}
			localStorage.setItem('city_history', JSON.stringify(city));
			var newButton = document.createElement("button");
			newButton.textContent = display_city;
			newButton.className = 'btn btn-secondary w-100' ;
			newButton.id=display_city;
			document.getElementById("history").appendChild(newButton);
		}
	}
  }
//display the main content and 5 days forecast
function drawWeather( d ) {
	var today=new Date();
	var color;
	var cur_date=today.getDate();
	var icon;

  document.getElementById("current_city").innerHTML= display_city+" ("+(today.getMonth()+1)+"/"+cur_date +"/"+ today.getFullYear()+"  "+weekday[today.getDay()]+")";
  document.getElementById("current_temp").innerHTML= "Temp: "+C_to_F(d.current.temp)+"  "+sp_char+"  ("+d.current.temp+"  "+sp_char2+")";
  document.getElementById("current_wind").innerHTML= "Wind: "+d.current.wind_speed+"  MPH";
  document.getElementById("current_humidity").innerHTML= "Humidity: "+d.current.humidity+"  %";
  switch(parseInt(d.current.uvi)) {
	case 0: case 1:case 2:
	  color="green";
	  break;
	case 3:case 4:case 5:	  
		color="yellow";
	  break;
	case 6:case 7:
	  color="orange";
	break;
	case 8:case 9:case 10:	  
		color="red";
	break;
	case 10:
		color="purple";
	default:
		color="";
  }
  document.getElementById("index").innerHTML= d.current.uvi;
  document.getElementById("index").setAttribute("style" , "background-color:"+color);

  document.getElementById("forecast").setAttribute("style" , "display:flex");
  document.getElementById("forecast_header").setAttribute("style" , "display:flex");

  document.getElementById("day_1_date").innerHTML=(today.getMonth()+1)+"/"+(cur_date+1) +"/"+ today.getFullYear()+" ("+short_weekday[(today.getDay()+1)%7]+")";
    
  icon="http://openweathermap.org/img/wn/"+d.daily[0].weather[0].icon+"@2x.png";

  document.getElementById("day_1_icon").setAttribute("src" , icon);
  document.getElementById("day_1_temp").innerHTML= "Temp: "+C_to_F(d.daily[0].temp.day)+"  "+sp_char;
  document.getElementById("day_1_wind").innerHTML= "Wind: "+d.daily[0].wind_speed+"  MPH";
  document.getElementById("day_1_humidity").innerHTML= "Humidity: "+d.daily[0].humidity+"  %";
    
  document.getElementById("day_2_date").innerHTML=(today.getMonth()+1)+"/"+(cur_date+2) +"/"+ today.getFullYear()+" ("+short_weekday[(today.getDay()+2)%7]+")";
  icon="http://openweathermap.org/img/wn/"+d.daily[1].weather[0].icon+"@2x.png";
  document.getElementById("day_2_icon").setAttribute("src" , icon);
  document.getElementById("day_2_temp").innerHTML= "Temp: "+C_to_F(d.daily[1].temp.day)+"  "+sp_char;
  document.getElementById("day_2_wind").innerHTML= "Wind: "+d.daily[1].wind_speed+"  MPH";
  document.getElementById("day_2_humidity").innerHTML= "Humidity: "+d.daily[1].humidity+"  %";

  document.getElementById("day_3_date").innerHTML=(today.getMonth()+1)+"/"+(cur_date+3) +"/"+ today.getFullYear()+" ("+short_weekday[(today.getDay()+3)%7]+")";
  icon="http://openweathermap.org/img/wn/"+d.daily[2].weather[0].icon+"@2x.png";
  document.getElementById("day_3_icon").setAttribute("src" , icon);
  document.getElementById("day_3_temp").innerHTML= "Temp: "+C_to_F(d.daily[2].temp.day)+"  "+sp_char;
  document.getElementById("day_3_wind").innerHTML= "Wind: "+d.daily[2].wind_speed+"  MPH";
  document.getElementById("day_3_humidity").innerHTML= "Humidity: "+d.daily[2].humidity+"  %";

  document.getElementById("day_4_date").innerHTML=(today.getMonth()+1)+"/"+(cur_date+4) +"/"+ today.getFullYear()+" ("+short_weekday[(today.getDay()+4)%7]+")";
  icon="http://openweathermap.org/img/wn/"+d.daily[3].weather[0].icon+"@2x.png";
  document.getElementById("day_4_icon").setAttribute("src" , icon);
  document.getElementById("day_4_temp").innerHTML= "Temp: "+C_to_F(d.daily[3].temp.day)+"  "+sp_char;
  document.getElementById("day_4_wind").innerHTML= "Wind: "+d.daily[3].wind_speed+"  MPH";
  document.getElementById("day_4_humidity").innerHTML= "Humidity: "+d.daily[3].humidity+"  %";

  document.getElementById("day_5_date").innerHTML=(today.getMonth()+1)+"/"+(cur_date+5) +"/"+ today.getFullYear()+" ("+short_weekday[(today.getDay()+5)%7]+")";
  icon="http://openweathermap.org/img/wn/"+d.daily[4].weather[0].icon+"@2x.png";
  document.getElementById("day_5_icon").setAttribute("src" , icon);
  document.getElementById("day_5_temp").innerHTML= "Temp: "+C_to_F(d.daily[4].temp.day)+"  "+sp_char;
  document.getElementById("day_5_wind").innerHTML= "Wind: "+d.daily[4].wind_speed+"  MPH";
  document.getElementById("day_5_humidity").innerHTML= "Humidity: "+d.daily[4].humidity+"  %";

  Create_Button();
}
//Call the google api and get the lan, lon based on the city name
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
		drawmap(lat,lon);
   		Check_weather(lat,lon);	})
	.catch(function(error) {
 console.log(error);
	});
}
function initMap(){

	
}

//call weather api and get the weather 
function Check_weather(lat,lon) {
	url='https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&exclude=minutely,hourly&units=metric&appid='+openweatherkey;
  fetch(url)  
  .then(function(response) { 
  if (response.status >= 200 && response.status <= 299) {
		return response.json();
    } else {      
      throw Error(response.status+" "+response.statusText);
    } // Convert data to json
	})
	.then(function(data) {
		drawWeather(data); // Call drawWeather
	})
	.catch(function(error) {	
		console.log(error);
	});
}

function historyButtonHandler(event){
	check_location(event.target.id);
}
function searchButtonHandler(event){
	check_location(document.getElementById("city_name").value);
}

fetchButton.addEventListener('click', searchButtonHandler);
document.querySelector("#history").addEventListener("click", historyButtonHandler);
