var key ="ac6927365e60797d60eefdf57ff960e2";
async function getData() {
    try{
       
        var city = document.getElementById("search").value;

       

        var res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`)

        let data = await res.json();
        
       showdata(data);
        console.log(data);

        getData2(data.coord);
        console.log(data.coord);

    }catch(error){
        console.log(error);
    }
}

function showdata(data){

    document.getElementById("text").innerHTML = "";
    var  div = document.createElement("div");
  
    var name = document.createElement("p");
    name.textContent= data.name;

    var min = document.createElement("p");
    min.textContent=`Minumm Temperature: ${data.main.temp_min} °C`;

    var max = document.createElement("p");
    max.textContent=`Maximum Temperature: ${data.main.temp_max} °C`;

    var win = document.createElement("span");
    win.textContent= `WindDeg: ${data.wind.deg}  `;
    var win1 = document.createElement("span");
    win1.textContent= `WindGust: ${data.wind.gust}   `;
    var win2 = document.createElement("span");
    win2.textContent= `WindSpeed: ${data.wind.speed}  `;

    var weather = document.createElement("p");
    weather.textContent= `Cloud: ${data.weather[0].description}`;

    var map = document.getElementById("gmap_canvas");
    map.src =  `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    div.append(name, min, max, win, win1, win2, weather);
    document.getElementById("text").append(div);
}


async function getData2(coord){
    try{
       
        var res2 = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=current,minutely,hourly&appid=${key}&units=metric`);
        var data2 = await res2.json();
        
        console.log(data2.daily);
        otherdays(data2.daily);
    }
    catch(err){
        console.log(err)
    }
}

function otherdays(arr){
    document.getElementById("other").innerHTML="";
    const today = new Date(); 
    var day = today.getDay(); 
    var daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];
arr.map((obj)=>{
    var dayshow=daylist[++day];
    var div = document.createElement("div");
    div.id = "day";
    var spa = document.createElement("span");
    spa.textContent = `${dayshow}`;
    
    var i = obj.weather[0].icon;
    var img = document.createElement("img");
    img.src = `http://openweathermap.org/img/wn/${i}@2x.png`;
    img.id = "otherlogo";

    var spa1 = document.createElement("span");
    spa1.textContent = `Min ${obj.temp.min} °C`;
    var spa2 = document.createElement("span");
    spa2.textContent = `Max ${obj.temp.max} °C`;

    div.append(spa,img,spa1,spa2);
    document.getElementById("other").append(div);

    
 });
}