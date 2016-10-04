@section('script')
	@parent
<script src="https://apis.daum.net/maps/maps3.js?apikey=049a3420ff529adaf2b0166e06f9afd7&libraries=services,clusterer,drawing"></script>
<script type="text/javascript">
var element_wrap2=document.getElementById('loc_wrap');
var add_value=document.getElementById('address');
var p_id="";
var lat="";
var lon="";

	function loc_popup() {
		if (add_value.value=='')
			window.alert("주소를 먼저 입력해 주세요.");
		else{
			$("#category").val(0).prop("selected", true);
			document.getElementById('place_name').value="";
			document.getElementById('phone').value="";
			
			var add_iframe=document.getElementById('add_iframe');
			//var add_iframe=document.createElement("iframe");
			add_iframe.src="gwcw/place?address="+add_value.value;
			add_iframe.style.width="100%";

		    if(element_wrap2.style.display=='none'){
				element_wrap2.style.display='block';
		    }
		    else{
				add_iframe.src="gwcw/place?address="+add_value.value;
			    add_iframe.location.reload();
		    }

			convert();
			//element_wrap2.appendChild(add_iframe);
		}
	}
	
	$('iframe').load(function(){
		var h = this.contentWindow.document.getElementById('main').scrollHeight;
		$(this).height(h);
	});

	function receive_loc_data(id, name, category, address, phone) {
		var cate_num;
		switch(category){
		case "음식점": cate_num="1"; break;
		case "카페": cate_num="2"; break;
		case "놀이/오락시설": cate_num="3"; break;
		case "병원": cate_num="4"; break;
		case "뷰티": cate_num="5"; break;
		case "쇼핑": cate_num="6"; break;
		case "마트/편의점": cate_num="7"; break;
		case "금융": cate_num="8"; break;
		case "교육": cate_num="9"; break;
		case "관광/문화": cate_num="10"; break;
		case "숙박": cate_num="11"; break;
		case "기타": cate_num="12"; break;
		default: cate_num="0";
		}
		$("#category").val(cate_num).prop("selected", true);
		document.getElementById('place_name').value=name;
		document.getElementById('phone').value=phone;
		p_id=id;
	}

	function convert() {
		var geocoder = new daum.maps.services.Geocoder();
		
		// 주소로 좌표를 검색합니다
		geocoder.addr2coord(add_value.value, function(status, result) {

		    // 정상적으로 검색이 완료됐으면 
		     if (status === daum.maps.services.Status.OK) {
		    	 lat=result.addr[0].lat;
		    	 //window.alert(result.addr[0].lat);
		    	 lon=result.addr[0].lng;
		    } 
		});
	}
	
	function insert() {
		var place_id=p_id;
		var place_name=document.getElementById('place_name').value;
		var category=$("#category option:selected").text();
		var address=add_value.value;
		var phone=document.getElementById('phone').value;
		var event_name=document.getElementById('event_name').value;
		var start_date=document.getElementById('start_date').value;
		var finish_date=document.getElementById('finish_date').value;
		var event_content=document.getElementById('event_content').value;

		if(address==""){
			window.alert('주소를 입력하십시오.');
		}
		else{
		if (confirm('등록 하시겠습니까?')) {
			if(place_name==""||category==""||address==""||event_name==""||start_date==""||finish_date==""){				
				window.alert('필수 항목을 입력하십시오.');
				}
			else if(start_date>finish_date){
				window.alert('종료 날짜가 시작 날짜보다 빠를 수 없습니다.');
			}
			else {
				//window.alert(lat);
				//window.alert(lon);
				//$_token = "{{ csrf_token() }}";
				$.post('http://175.126.112.86/gwcw/result', { 
					place_id: place_id,
					place_name: place_name,
					category: category,
					address: address,
					lat: lat,
					lon: lon,
					phone: phone,
					event_name: event_name,
					start_date: start_date,
					finish_date: finish_date,
					event_content: event_content,
					//_token: $_token
					//_token: $('meta[name=csrf-token]').attr('content') 
					})
				.done(function( data )
				{
				    window.alert('등록 되었습니다.');
					window.location.reload(true);
				})
	            .fail(function() {
	            	window.alert('등록에 실패하였습니다.');
	            });
			}
		} else {
		    // Do nothing!
		}
		}
	}
</script> 
@endsection