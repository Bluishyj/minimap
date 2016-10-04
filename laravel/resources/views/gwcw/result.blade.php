@extends('gwcw.layouts.master')
@include('gwcw.header')
@include('gwcw.footer')

@section('title')
The Minimap-장소 이벤트 등록 페이지
@endsection

@section('content')

<!-- Main -->
<div id="main">
	<section class="main" style="padding-top: 2em;">
		<div class="content">
			<h2>장소정보</h2>
			
			
				<br /><br />
				<h2>이벤트 정보</h2>

				<div class="row uniform">
					
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
