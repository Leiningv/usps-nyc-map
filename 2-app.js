var map=L.map('map',{zoomControl:true,preferCanvas:true}).setView([40.645,-73.945],14);
var tiles=L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{maxZoom:19,subdomains:'abcd',attribution:'&copy; OpenStreetMap contributors &copy; CARTO'}).addTo(map);
var fell=false;tiles.on('tileerror',function(){if(fell)return;fell=true;map.removeLayer(tiles);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'&copy; OpenStreetMap contributors'}).addTo(map)});
var layer=L.layerGroup().addTo(map),bkOnly=true;
function draw(){layer.clearLayers();var n=0;
 BOXES.forEach(function(b,i){var cat=b[2];if(bkOnly&&!b[5])return;if(!document.getElementById('c'+cat).checked)return;n++;
  var m=L.circleMarker([b[0],b[1]],{radius:8,weight:2,color:'#fff',fillColor:cat?'#d9480f':'#1f4fd1',fillOpacity:.95});
  m.bindPopup(function(){var s=STREETS[i],h='<b>'+(cat?'Box, operator not tagged':'USPS box')+'</b><br>';
   if(s)h+='On <b>'+s[0]+'</b>'+(s[1]?'<br>Near '+s[1]:'')+'<br>';
   h+=(b[3]?'Pickup: '+b[3]:'Pickup times not tagged')+'<br><a target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query='+b[0]+','+b[1]+'">Open in Maps</a>';return h});
  m.addTo(layer)});
 document.getElementById('cnt').textContent=n+' boxes ('+(bkOnly?'Brooklyn':'five boroughs')+')'}
function mode(bk){bkOnly=bk;document.getElementById('bk').className=bk?'on':'';document.getElementById('all').className=bk?'':'on';map.setView(bk?[40.645,-73.945]:[40.705,-73.97],bk?14:11);draw()}
document.getElementById('bk').onclick=function(){mode(true)};document.getElementById('all').onclick=function(){mode(false)};
document.getElementById('c0').onchange=draw;document.getElementById('c1').onchange=draw;draw();
