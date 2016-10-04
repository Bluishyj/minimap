var selectOption;
var findURL;
var findPolyline;
var findMarker;

function getFindaWay(str){
	var method = "POST";
	var async = true;
	var request = new XMLHttpRequest();

	request.onload = function() {
		var status = request.status;
		var data = request.responseText;		
		if(data === null) {
		}
		else {
			var array = JSON.parse(data);
			list = new Array(array.features.length);
			var bounds = new daum.maps.LatLngBounds();
			var i;
			findPolyline = [];
			findMarker = [];
			for(i = 0; i < array.features.length; i++)
			{
				list[i] = array.features[i];
				if(list[i].geometry.type === "Point")
				{
					var loca = (list[i].geometry.coordinates+"").split(",");
					var point = new daum.maps.LatLng(loca[1], loca[0]);
					
					var imageSrc = '/images/point.png',     
						imageSize = new daum.maps.Size(50, 50), 
						imageOption = {offset: new daum.maps.Point(27, 69)}; 
					var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);
					if(i==0||i==array.features.length-1){
						var marker = new daum.maps.Marker({
							map: map,
							title: list[i].properties.description,
							position: point,
							image: null
						});
					}else{
					var marker = new daum.maps.Marker({
						map: map,
						title: list[i].properties.description,
						position: point,
						image: markerImage
					});
					}
					if(i === 0) {
						displayInfowindow(marker, list[i].properties.description);
					}
					(function(marker, item) {
						daum.maps.event.addListener(marker, 'click', function() {
							infowindow.close();
							displayInfowindow(marker, item.properties.description);               
						});
					})(marker, list[i]);
					findMarker.push(marker);
					bounds.extend(point);					
				}
				else if(list[i].geometry.type === "LineString")
				{
					var item = list[i].geometry;
					var j;
					var linePath = new Array(item.coordinates.length);
					for(j = 0; j < item.coordinates.length; j++)
					{
						var path = (item.coordinates[j]+"").split(",");
						linePath[j] = new daum.maps.LatLng(path[1], path[0])
					}
					
		            // 지도에 표시할 선을 생성합니다
					var Polyline = new daum.maps.Polyline({
		                path: linePath,
		                strokeWeight: 5,
		                strokeColor: '#FF2904',
		                strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
		                strokeStyle: 'solid' // 선의 스타일입니다
		            });
					
					findPolyline.push(Polyline);
					
		            // 지도에 선을 표시합니다 
					Polyline.setMap(map);
				}
			}
			map.setBounds(bounds);
			daum.maps.event.removeListener(map, 'click', Clickcallback);
		}
		//printNode(data);
	}
	request.open(method, str, async);
	request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	request.send();				
}

function findEventway() {
	if(currentLocation != null) {
		findURL = "?version=1&format=json&resCoordType=WGS84GEO&appKey=e8396465-972a-33ad-a9a4-f455ef988647&reqCoordType=WGS84GEO";
		findURL+= "&startX="+currentLocation.gb+"&startY="+currentLocation.hb;
		findURL+= "&endX="+selcetEItem.lon+"&endY="+selcetEItem.lat;
		findURL+= "&startName=현재위치&endName="+selcetEItem.place_name;
		
		clickemarker.setMap(null);
		clickemarker = null;
		body.removeChild(eventView);
		getFindaWay("https://apis.skplanetx.com/tmap/routes/pedestrian"+findURL);
	} else alert("현재 위치를 찾을 수 없습니다.");
}

function currentfind() {
	if(currentLocation != null) {
		findURL = "?version=1&format=json&resCoordType=WGS84GEO&appKey=e8396465-972a-33ad-a9a4-f455ef988647&reqCoordType=WGS84GEO";
		findURL+= "&startX="+currentLocation.gb+"&startY="+currentLocation.hb;
		findURL+= "&endX="+sltlatlng.gb+"&endY="+sltlatlng.hb;
		findURL+= "&startName=현재위치&endName="+address;
		
		clickfmarker.setMap(null);
		infowindow.close();
		getFindaWay("https://apis.skplanetx.com/tmap/routes/pedestrian"+findURL);
	} else alert("현재 위치를 찾을 수 없습니다.");
}

function checkSAplace() {		
	if(startP != null && startM != null && sindex != null) {	
		if(arriveP != null && arriveM != null && aindex != null) {
			
			findURL = "?version=1&format=json&resCoordType=WGS84GEO&appKey=e8396465-972a-33ad-a9a4-f455ef988647&reqCoordType=WGS84GEO";			
            findURL += "&startX="+startP.longitude;
            findURL += "&startY="+startP.latitude;
            findURL += "&endX="+arriveP.longitude;
            findURL += "&endY="+arriveP.latitude;

			var el = document.createElement('div');
			var alertsrc = '<div style="margin: 0 0;text-align: center; height: 100%">'				
				+'<button style="width: 33%;height: 100%;margin: 0px 0px 0px 0px;" onclick="selBike();">자<br>전<br>거</button>'
				+'<button style="width: 33%;height: 100%;margin: 0px 0px 0px 0px;" onclick="selWalk();"><br>도<br>보 </button>'
				+'<button style="width: 33%;height: 100%;margin: 0px 0px 0px 0px;" onclick="selCancel();"><br>취<br>소 </button></div>';
			el.innerHTML = alertsrc;
			el.id = 'selectOp';
            body.appendChild(el);
            selectOption = el;
            
            ShowMap();
		}
	}
}

function selBike() {
	
	getFindaWay("https://apis.skplanetx.com/tmap/routes/bicycle"+findURL);
	
	startP = null;
	arriveP = null;
	sindex = null;
	aindex = null;
	startM.setMap(null);
	arriveM.setMap(null);
	startM = null;
	arriveM = null;
	removeMarker();
	body.removeChild(selectOption);
}

function selWalk() {
	
	getFindaWay("https://apis.skplanetx.com/tmap/routes/pedestrian"+findURL+"&startName="+encodeURIComponent(startP.title)+"&endName="+encodeURIComponent(arriveP.title));
		
	startP = null;
	arriveP = null;
	sindex = null;
	aindex = null;
	startM.setMap(null);
	arriveM.setMap(null);	
	startM = null;
	arriveM = null;
	removeMarker();
	body.removeChild(selectOption);
}

function selCancel() {	
	body.removeChild(selectOption);
	var resultw = document.getElementById('menu_wrap');	
	resultw.style.display = "block";
}
