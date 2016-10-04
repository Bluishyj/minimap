var documentsDir;
var scheduleArray;
var txtcontent;
var file;

function onResolveSuccess(dir) {
	documentsDir = dir;
	console.log("resolve success");
	//documentsDir.createFile("miniMap_schedule.txt");
	readFile("miniMap_schedule.txt");
}
	 
function onResolveError(e) {
	console.log('message: ' + e.message);
}

function onSuccess() {
	console.log("success");
}

function readContent() {
	try {
		//file = documentsDir.resolve("miniMap_schedule.txt");
		//console.log('File size: ' + file.fileSize);
	} catch (exc) {
		console.log('Could not resolve file: ' + exc.message);
		return;
	}

	try {
		file.readAsText(function(contents) {
			if(contents != "") {
				txtcontent = JSON.parse(contents).schedules;
			} else txtcontent = new Array();
			file.openStream('w', writeToStream, errorCallback);
		}, errorCallback, "UTF-8");
		
	} catch (exc) {
		console.log('readAsText() exception:' + exc.message + '');
	}
}

function writeToStream(fileStream) {
	try {
		var title = document.getElementById('Location_title'),
		day = document.getElementById('Location_day'),
		location =  document.getElementById('Location_namei'),
		content = document.getElementById('Location_content');
			
		var schedule_info = new Object();	
		schedule_info.title = title.value;
		schedule_info.day = day.value;
		if(item != null) {
			schedule_info.address_name = item.title;
			schedule_info.address = item.address;	
		} else { schedule_info.address = location.value; }
		schedule_info.gps = sltlatlng;
		schedule_info.content = content.value;
		
		var totalInfo = new Object();
		if(txtcontent != null) {
			txtcontent.push(schedule_info);
			totalInfo.schedules = txtcontent;
		} else { var jsonArray = new Array(); jsonArray.push(schedule_info); totalInfo.schedules = jsonArray;}
		
		var jsonArray = JSON.stringify(totalInfo);
		fileStream.write(jsonArray);
		fileStream.close();
	} catch (exc) {
		console.log('readAsText() exception:' + exc.message + '');
	}
	window.close();
}

function saveSchedule_tizen() {
	
	/*try {
		documentsDir.createFile(str);
	} catch (ee) {
		console.log(ee.toString());
		exitFile = false;

		 try {
			documentsDir.deleteFile(documentsDir.fullPath+"/"+str, onSuccess);
		} catch (exc) {
			console.log('deleteSampleFile(): ' + exc.message);
		} 	
	}*/
	
	try {
		file = documentsDir.resolve("miniMap_schedule.txt");
	} catch (exc) {
		console.log('Could not resolve file: ' + exc.message);		 
		return;
	}
	try {
		file.openStream('r', readContent, errorCallback);		
	} catch (exc) {
		console.log('Could not write to file: ' + exc.message);
	}	
}

function readFile(str) {
	try {
		file = documentsDir.resolve(str);
	} catch (exc) {
		console.log('Could not resolve file: ' + exc.message);
		return;
	}
		 
	try {
		file.openStream('r', JSONparseMarker, errorCallback);
	} catch (exc) {
		console.log('Could not write to file: ' + exc.message);
	}
}

function JSONparseMarker() {
	try {
		file = documentsDir.resolve("miniMap_schedule.txt");
		//console.log('File size: ' + file.fileSize);
	} catch (exc) {
		console.log('Could not resolve file: ' + exc.message);
		return;
	}
	 
	try {
		file.readAsText(function(contents) {			
			var jsonArray = JSON.parse(contents);
			var list = jsonArray.schedules;
			var imageSrc = '/images/quest.png',     
				imageSize = new daum.maps.Size(50, 50), 
				imageOption = {offset: new daum.maps.Point(27, 69)}; 
			var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);
			for(var i = 0; i < list.length; i++) {
				var jsonitem = list[i];
				var point = new daum.maps.LatLng(jsonitem.gps.hb, jsonitem.gps.gb);
				var marker = new daum.maps.Marker({
					title: jsonitem.title,
					position: point,
					image: markerImage
				});
				
				(function(marker, item) {
					daum.maps.event.addListener(marker, 'click', function() {
						infowindow.close();
						var content = '<div style="z-index:1; font-size: 14px; text-align: center;" >' + item.title + '<br>'+ item.content +'</div>';
	
					    infowindow.setContent(content);
					    infowindow.open(map, marker);               
		            });
				})(marker, jsonitem);
				
				marker.setMap(map);
			}
		}, errorCallback);
	} catch (exc) {
		console.log('readAsText() exception:' + exc.message + '');
	}
}

function errorCallback(error) {
	var message = '';

  	switch (error.message) {
    	case FileError.SECURITY_ERR:
      		message = 'Security Error';
      		break;
    	case FileError.NOT_FOUND_ERR:
      		message = 'Not Found Error';
      		break;
    	case FileError.QUOTA_EXCEEDED_ERR:
      		message = 'Quota Exceeded Error';
      		break;
    	case FileError.INVALID_MODIFICATION_ERR:
      		message = 'Invalid Modification Error';
      		break;
   		case FileError.INVALID_STATE_ERR:
      		message = 'Invalid State Error';
      		break;
   		default:
      		message = 'Unknown Error';
      		break;
  }
    console.log(error);
}