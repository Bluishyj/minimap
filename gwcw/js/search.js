// 마커를 담을 배열입니다
var markers = [];
var clickMarker;
var clickTitle;
var sindex;
var aindex;

var simgsrc = 'http://i1.daumcdn.net/localimg/localimages/07/mapapidoc/red_b.png';
var aimgsrc = 'http://i1.daumcdn.net/localimg/localimages/07/mapapidoc/blue_b.png';

//장소 검색 객체를 생성합니다
var ps = new daum.maps.services.Places();  

// 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
var infowindow = new daum.maps.InfoWindow({zIndex:1});

// 키워드 검색을 요청하는 함수입니다
function searchPlaces() {
	var keyword = document.getElementById('searchword').value;
	
	if (!keyword.replace(/^\s+|\s+$/g, '')) {
		alert('키워드를 입력해주세요!');
        return false;
	}
	// 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
	ps.keywordSearch( keyword, placesSearchCB);
	
	/*if(startP != null) {	
		
	}
	else if(arriveP != null) {
		keyword = document.getElementById('keyword1').value;
		ps.keywordSearch( keyword, placesSearchCB);
	} else {
		keyword = document.getElementById('keyword1').value;
		if (!keyword.replace(/^\s+|\s+$/g, '')) {
			keyword = document.getElementById('keyword2').value;
			
	    }
	}*/
}

// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
function placesSearchCB(status, data, pagination) {
    if (status === daum.maps.services.Status.OK) {

        // 정상적으로 검색이 완료됐으면
        // 검색 목록과 마커를 표출합니다
        displayPlaces(data.places);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);        

    } else if (status === daum.maps.services.Status.ZERO_RESULT) {

        alert('검색 결과가 존재하지 않습니다.');
        return;

    } else if (status === daum.maps.services.Status.ERROR) {

        alert('검색 결과 중 오류가 발생했습니다.');
        return;

    }
}

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {

    var listEl = document.getElementById('placesList'), 
    menuEl = document.getElementById('menu_wrap'),
    fragment = document.createDocumentFragment(), 
    bounds = new daum.maps.LatLngBounds(), 
    listStr = '';
    
    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker();
    
    searchItems = [];
    
    for ( var i=0; i<places.length; i++ ) {

        // 마커를 생성하고 지도에 표시합니다
        var placePosition = new daum.maps.LatLng(places[i].latitude, places[i].longitude);
        /*if(startP != null && sindex != null) {
        	if(i === sindex) {
        		marker = addwayMarker(places[i], simgsrc, 'waya');
        	}
        	else var marker = addMarker(placePosition, i);
        } else if(arriveP != null && aindex != null) {
        	if(i === aindex) {
        		marker = addwayMarker(places[i], aimgsrc, 'waya');
        	}
        }*/
        var marker = addMarker(placePosition, i);
         
        var itemEl = getListItem(i, places[i], marker); // 검색 결과 항목 Element를 생성합니다

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(placePosition);
        
        searchItems.push(places[i]);

        // 마커와 검색결과 항목에 mouseover 했을때
        // 해당 장소에 인포윈도우에 장소명을 표시합니다
        // mouseout 했을 때는 인포윈도우를 닫습니다
        (function(marker, title) {
            daum.maps.event.addListener(marker, 'mouseover', function() {
                displayInfowindow(marker, title);               
            });

            daum.maps.event.addListener(marker, 'mouseout', function() {
                if(marker != clickMarker) {
                	infowindow.close();
                	if(clickMarker != null) {
                		displayInfowindow(clickMarker, clickTitle);	
                	}                	
                }
            });

            daum.maps.event.addListener(marker, 'click', function() {           	
            	clickMarker = marker;
            	clickTitle = title;
            	displayInfowindow(marker, title);
            	if(infoBotmenu != null)
              	{
                  	body.removeChild(infoBotmenu);
                  	infoBotmenu = null;
               	}
            	for(var j = 0; j < markers.length; j++)
               	{
                   	if(marker === markers[j])
                    {
                        var place = places[j];
                   		var el = document.createElement('div'),
                        itemStr = '<div id="botmenu"><span id="'+j+'" class="markerbg marker_info' + (j+1) + '"></span>' +
                                    '<div class="info" align="left">' +
                                    '   <h5>' + place.title + '</h5>';

	                   	 if (place.newAddress) {
	                         itemStr += '    <span>' + place.newAddress + '</span>' +'<input type=\"button\" value=\"  목록  \" onclick="ShowMenu()"/>'+
	                                     '   <br><span class="jibun gray">' +  place.address  + '</span>';
	                     } else {
	                         itemStr += '    <br><span>' +  place.address  + '</span><input type=\"button\" value=\"  목록  \" onclick="ShowMenu()"/>'; 
	                     }
                                     
                          itemStr += "  <br><span class=\"tel\">" + place.phone + "</span></div></div>";

                        el.innerHTML = itemStr;
                        el.className = 'botItem';
                        el.id = 'bottomInfo';
                        body.appendChild(el);
                        infoBotmenu = el;
                        break;
                    } 
               	}               
            });

            itemEl.onmouseover =  function () {
                displayInfowindow(marker, title);
            };

            itemEl.onmouseout =  function () {
            	if(marker != clickMarker) {
                	infowindow.close();
                }
            };            
        })(marker, places[i].title);

        fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds); 
    //readFile("test.txt");
}

//출발점 선택
function setStartplace(index) {
	sindex = index;
	if(startP != null) {		
		markers[sindex].setMap(map);
		startM.setMap(null);
	} else {
		startP = searchItems[index];	
		document.getElementById('keyword1').value = startP.title;
		markers[index].setMap(null);
		startM = addwayMarker(startP, simgsrc, 'ways');
	}
	checkSAplace();
}
 
//도착점 선택
function setArriveplace(index) {
	aindex = index;
	if(arriveP != null) {		
		markers[aindex].setMap(map);
		arriveM.setMap(null);
	} else {
		arriveP = searchItems[index];
		document.getElementById('keyword2').value = arriveP.title;
		markers[index].setMap(null);
		arriveM = addwayMarker(arriveP, aimgsrc, 'waya');
	}
	checkSAplace();
}

// 검색결과 항목을 Element로 반환하는 함수입니다
function getListItem(index, places) {
	console.log(places);
	var idx = index;
	
    var el = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info" align="left">' +
                '   <h5>' + places.title + '</h5>';

    if (places.newAddress) {
        itemStr += '    <span>' + places.newAddress + '</span>' +
                    '   <span class="jibun gray">' +  places.address  + '</span>';
    } else {
        itemStr += '    <span>' +  places.address  + '</span>'; 
    }
                 
    itemStr += "  <span class=\"tel\">" + places.phone + "</span>" +
	"<input type=\"button\" value=\" 출발지로  \" onclick=\"setStartplace("+idx+")\"/>"  +"<input type=\"button\" value=\" 도착지로  \" onclick=\"setArriveplace("+idx+")\"/></div>";

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
    var imageSrc = 'http://i1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new daum.maps.Size(36, 37),  // 마커 이미지의 크기
        imgOptions =  {
            spriteSize : new daum.maps.Size(36, 691), // 스프라이트 이미지의 크기
            spriteOrigin : new daum.maps.Point(0, (idx*46)+10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
            offset: new daum.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imgOptions),
            marker = new daum.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage,           
        });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker);  // 배열에 생성된 마커를 추가합니다

    return marker;
}

function addwayMarker(place, imgsrc, pinkey) {
	var startSrc = imgsrc,     
    startSize = new daum.maps.Size(50, 45), 
    startOption = { 
        offset: new daum.maps.Point(15, 43)
	};

	var image = new daum.maps.MarkerImage(startSrc, startSize, startOption);
	var position = new daum.maps.LatLng(place.latitude, place.longitude);
	
	var Marker = new daum.maps.Marker({
	    map: map,
	    position: position,
	    image: image
	});
	
	daum.maps.event.addListener(Marker, 'mouseover', function() {
		displayInfowindow(Marker, place.title);
	});	
	
	daum.maps.event.addListener(Marker, 'click', function() {		
		clickMarker = Marker;
    	clickTitle = place.title;
		if(infoBotmenu != null)
      	{
          	body.removeChild(infoBotmenu);
       	}
		var el = document.createElement('div'),
         	itemStr = '<div id="botmenu"><span class="marker'+pinkey+'"></span>' +
                    '<div class="info" align="left">' +
                    '   <h5>' + place.title + '</h5>';

       	 if (place.newAddress) {
             itemStr += '    <span>' + place.newAddress + '</span>' +'<input type=\"button\" value=\"  닫기  \" onclick="closeInfo()"/>'+
                         '   <br><span class="jibun gray">' +  place.address  + '</span>';
         } else {
             itemStr += '    <br><span>' +  place.address  + '</span><input type=\"button\" value=\"  닫기  \" onclick="closeInfo()"/>'; 
         }
                     
          itemStr += "  <br><span class=\"tel\">" + place.phone + "</span></div></div>";

        el.innerHTML = itemStr;
        el.className = 'botItem';
        el.id = 'bottomInfo';
        body.appendChild(el);
        infoBotmenu = el;
	});
	
	return Marker;
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
    for ( var i = 0; i < markers.length; i++ ) {    	
        markers[i].setMap(null);
    }
    markers = [];
}

// 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
function displayPagination(pagination) {
    var paginationEl = document.getElementById('pagination'),
        fragment = document.createDocumentFragment(), i; 

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
        paginationEl.removeChild (paginationEl.lastChild);
    }

    for (i=1; i<=pagination.last; i++) {
        var el = document.createElement('a');
        el.href = "#";
        el.innerHTML = i;

        if (i===pagination.current) {
            el.className = 'on';
        } else {
            el.onclick = (function(i) {
                return function() {
                    pagination.gotoPage(i);
                }
            })(i);
        }

        fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
    var content = '<div style="z-index:1; font-size: 14px">' + title + '</div>';

    infowindow.setContent(content);
    infowindow.open(map, marker);
}

 // 검색결과 목록의 자식 Element를 제거하는 함수입니다
function removeAllChildNods(el) {   
    while (el.hasChildNodes()) {
        el.removeChild (el.lastChild);
    }
}

//목록에서 지도를 보는 함수
function ShowMap() {
	var resultw = document.getElementById('menu_wrap');	
	resultw.style.display = "none";
	
	var topmenu = document.getElementById('topMenudv');
	topmenu.style.display = "block";
	
	//createFile_tizen("text.txt");	
}

//지도에서 목록을 보는 함수
function ShowMenu() {
	
	var menu = document.getElementById('menuList');
	menu.style.display = "none";
	
	var topmenu = document.getElementById('topMenudv');
	topmenu.style.display = "none";
	
	var resultw = document.getElementById('menu_wrap');	
	resultw.style.display = "block";
	
	var botMenu = document.getElementById('bottomInfo');
	botMenu.style.display = "none";
}

function closeInfo() {	
	body.removeChild(infoBotmenu);
	infoBotmenu = null;	
	clickMarker = null;
	clickTitle = null;
}