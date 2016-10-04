var mhttpRequest = null;
var ehttpRequest = null;

var eventList;
var eventView;

var selcetEItem;
var clickemarker;

var imageSrc = '/images/event.png',     
	imageSize = new daum.maps.Size(50, 50), 
	imageOption = {offset: new daum.maps.Point(27, 69)}; 
var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);

function getEvents() {
	
}

function estateChange() {
	
}

function getMarkers() {
    mhttpRequest = new XMLHttpRequest();
    
    mhttpRequest.onreadystatechange = mstateChange;
    mhttpRequest.open('GET', 'http://175.126.112.86/gwcw/json/places', true);
    mhttpRequest.send(null);
}

function mstateChange() {
	if(mhttpRequest.readyState == 4) {
		//complete function...
		if(mhttpRequest.status == 200) {
			var jsonData = mhttpRequest.responseText;
			var jsonArray = JSON.parse(jsonData);
			for(var i = 0; i < jsonArray.length; i++) {
				var item = jsonArray[i];
				var point = new daum.maps.LatLng(item.lat, item.lon);
				var marker = new daum.maps.Marker({
					title: item.place_name,
					position: point,
					image: markerImage
				});
				(function(marker, item) {
					daum.maps.event.addListener(marker, 'click', function() {
						selcetEItem = item;
						clickemarker = marker;
						var el = document.createElement('div'),
						eventListsrc = '<div id="eventList" class="ui-content content-padding" style="margin-top: 0px; display: block; z-index: 5;position: absolute;text-align: center;">'
							+'<header class="ui-header" style="background-color: rgba(0,31,56,1);margin-top: -11px">'
							+'<h2 class="ui-title" style="background-color: rgba(0,31,56,1);"><marquee>'+item.place_name;
						if(item.phone != null) {eventListsrc+= '('+item.phone+')</marquee></h2></header>';}
						else {eventListsrc+='</marquee></h2></header>';}
						eventListsrc+= '<ul class="ui-listview" style="background: rgba(0, 0, 0, 1); margin-top: -11px; font-size: 10px">';
						
						ehttpRequest = new XMLHttpRequest();
					    
					    ehttpRequest.onreadystatechange = function() {
					    	if(ehttpRequest.readyState == 4) {
					    		//complete function...
					    		if(ehttpRequest.status == 200) {
					    			var jsonData = ehttpRequest.responseText;
					    			var jsonArray = JSON.parse(jsonData);
					    			eventList = [];
					    			for(var i = 0; i < jsonArray.length; i++) {
					    				eventList.push(jsonArray[i]);
					    			}
					    			
					    			for(var i = 0; i < eventList.length; i++) {
										var eitem = eventList[i];							
										var sdate = eitem.start_date;
										var fdate = eitem.finish_date;
										var content = eitem.event_content;

										eventListsrc+= '<li onclick="alertEvent('+eitem+');">이벤트 중<br>'+eitem.event_name+'<br><marquee>'+sdate+' ~ '+fdate+'</marquee><br>';
										if(content != null) eventListsrc+= eitem.event_content+'</li>';
										else eventListsrc+= '</li>';
									}
									eventListsrc+= '<li onclick="findEventway();">길찾기</li>';
									eventListsrc+= '<li onclick="closeEvent();">닫기</li></ul><div>';
									el.innerHTML = eventListsrc;
									body.appendChild(el);
									eventView = el;
					    			
					    		} else {
					    			alert('error : ' + ehttpRequest.status);
					    		}
					    	}
					    };
					    ehttpRequest.open('GET', 'http://175.126.112.86/gwcw/json/events?id='+item.place_id, true);
					    ehttpRequest.send(null);
					});
				})(marker, jsonArray[i]);
				marker.setMap(map);
			}
		} else {
			alert('error : ' + mhttpRequest.status);
		}
	}
}

function closeEvent() {
	body.removeChild(eventView);
}