@extends('gwcw.layouts.master')
@include('gwcw.header')
@include('gwcw.footer')
@include('gwcw.scripts.kalendae')
@include('gwcw.scripts.address')
@include('gwcw.scripts.location')

@section('title')
The Minimap-장소 이벤트 등록 페이지
@endsection

@section('content')
<!-- Nav -->
<nav id="nav">
	<ul>
		<li><a href="#event" class="active">Add Event</a></li>
		<!--<li><a href="#event">Add Event</a></li>-->
	</ul>
</nav>
<!-- Main -->
<div id="main">

	<!-- add event -->
	<section id="event" class="main special" style="padding-top: 3em; padding-bottom: 1em;">
		<header class="major">
			<h2>장소 이벤트 등록</h2>
		</header>
		<h3>The Minimap 지도에 표시될 장소의 이벤트를 등록합니다.</h3>
	</section>
	<section class="main" style="padding-top: 2em;">
		<div class="content">
			<h2>장소정보</h2>
			<form>
				<div class="row uniform">
					<div class="6u 12u$(xsmall)">
						<input type="text" name="address" id="address"
							value="" placeholder="주소" disabled="disabled" />
					</div>
					<div class="6u$ 12u$(xsmall)">
						<a class="button" onclick="execDaumPostcode()">주소 검색</a>
					</div>
					<!-- 주소검색창 -->
					<div class="6u$ 12u$(xsmall)" style="padding-top:0px;">
					<div id="add_wrap" style="display:none; border:1px solid;width:100%;height:300px;margin:1.5em 0 0 0;position:relative;overflow:hidden;">
						<img src="//i1.daumcdn.net/localimg/localimages/07/postcode/320/close.png" id="btnFoldWrap" style="cursor:pointer;position:absolute;right:0px;top:-1px;z-index:1" onclick="foldDaumPostcode()" alt="접기 버튼">
					</div></div>
					<div class="6u$ 12u$(xsmall)">
						<!-- input type=submit class="special" value="입력된 주소로 장소 조회" onclick="window.open('gwcw/place','','')"-->
						<a class="button special" onclick="loc_popup()">입력된 주소로 장소 조회</a>
					</div>
					<div class="12u$" style="padding-top:0px;">
						<div id="loc_wrap" style="display:none; background:#fff; width:100%; margin:1.5em 0 0 0;position:relative;overflow:hidden;">
						<iframe name="add_iframe" id="add_iframe"></iframe></div>
					</div>
				</div>
			</form>
			<form method="post" action="#">
				<div class="row uniform">
					<div class="12u$">
						<div class="select-wrapper">
							<select name="category" id="category" disabled="disabled">
								<option value="0">장소 분류</option>
								<option value="1">음식점</option>
								<option value="2">카페</option>
								<option value="3">놀이/오락시설</option>
								<option value="4">병원</option>
								<option value="5">뷰티</option>
								<option value="6">쇼핑</option>
								<option value="7">마트/편의점</option>
								<option value="8">금융</option>
								<option value="9">교육</option>
								<option value="10">관광/문화</option>
								<option value="11">숙박</option>
								<option value="12">기타</option>
							</select>
						</div>
					</div>
					<div class="6u 12u$(xsmall)">
						<input type="text" name="place_name" id="place_name" value=""
							placeholder="장소명" disabled="disabled" />
					</div>
					<div class="6u$ 12u$(xsmall)">
						<input type="text" name="phone" id="phone" value=""
							placeholder="전화번호(선택)" disabled="disabled" />
					</div>
				</div>

				<br /><br />
				<h2>이벤트 정보</h2>

				<div class="row uniform">
					<div class="12u$">
						<input type="text" name="event_name" id="event_name" value=""
							placeholder="제목" />
					</div>
					<div class="5u 12u$(xsmall)">
						<input type="text" name="start_date" id="start_date" value=""
							placeholder="시작일 (YYYY-MM-DD)" class="auto-kal"
							data-kal="format: 'YYYY-MM-DD'"/>
					</div>
					<div class="2u 12u$(xsmall)">
						<center>
							<h3>~</h3>
						</center>
					</div>
					<div class="5u$ 12u$(xsmall)">
						<input type="text" name="finish_date" id="finish_date" value=""
							placeholder="종료일 (YYYY-MM-DD)" class="auto-kal"
							data-kal="direction: 'future', format: 'YYYY-MM-DD'" />
					</div>
					<div class="12u$">
						<textarea name="event_content" id="event_content"
							placeholder="이벤트 상세내용" rows="6"></textarea>
					</div>
					<div class="12u$">
						<ul class="actions">
							<li><a class="button special" onclick="insert()">등록</a></li>
							<li><input type="reset" value="모두 지우기"></li>
						</ul>
					</div>
				</div>
			</form>
		</div>
	</section>

</div>
@endsection
