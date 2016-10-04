<!DOCTYPE HTML>
<!--
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
		<title>The Minimap-장소 이벤트 등록 페이지</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!--[if lte IE 8]><script src="{{ asset('js/gwcw/ie/html5shiv.js') }}"></script><![endif]-->
		<link rel="stylesheet" href="{{ asset('css/gwcw/main.css') }}" />
		<!--[if lte IE 9]><link rel="stylesheet" href="{{ asset('css/gwcw/ie9.css') }}" /><![endif]-->
		<!--[if lte IE 8]><link rel="stylesheet" href="{{ asset('css/gwcw/ie8.css') }}" /><![endif]-->
		<!-- date picker -->
		<link rel="stylesheet" href="{{ asset('css/gwcw/Kalendae/kalendae.css') }}" type="text/css" charset="utf-8">
		<script src="{{ asset('js/gwcw/Kalendae/kalendae.standalone.js') }}" type="text/javascript" charset="utf-8"></script>
		<style type="text/css" media="screen">
			.kalendae .k-days span.closed {
				background:red;
			}
		</style>
	</head>
	<body>

		<!-- Wrapper -->
			<div id="wrapper">

				<!-- Header -->
					<header id="header" class="alt">
						<span class="logo"><img src="{{ URL::asset('img/gwcw/pin.svg') }}" width=85px height=85px alt="" /></span>
						<h1>The Minimap</h1>
						<p>장소 이벤트 등록 페이지<br/>
						Powered by GWCW</p>
					</header>

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
									<form method="post" action="#">
										<div class="row uniform">
											<div class="6u 12u$(xsmall)">
												<a href="#"><input type="text" name="demo-name" id="demo-name" value="" placeholder="주소" disabled="disabled" /></a>
											</div>
											<div class="6u$ 12u$(xsmall)">
												<a href="#" class="button special">조회</a>
											</div>
											<div class="6u$ 12u$(xsmall)">
												<input type="text" name="demo-name" id="demo-name" value="" placeholder="장소명" disabled="disabled" />
											</div>
											<div class="6u$ 12u$(xsmall)">
												<div class="select-wrapper">
													<select name="demo-category" id="demo-category">
														<option value="">장소 분류</option>
														<option value="1">음식점</option>
														<option value="1">카페</option>
														<option value="1">놀이/오락시설</option>
														<option value="1">병원</option>
													</select>
												</div>
											</div>
											<div class="6u$ 12u$(xsmall)">
												<input type="text" name="demo-name" id="demo-name" value="" placeholder="전화번호(선택)" disabled="disabled" />
											</div>
										</div>
										
										<br/><h2>이벤트 정보</h2>
									
										<div class="row uniform">
											<div class="12u$">
												<input type="text" name="demo-name" id="demo-name" value="" placeholder="제목" />
											</div>
											<div class="5u 12u$(xsmall)">
												<input type="text" name="demo-name" id="demo-name" value="" placeholder="시작일 (YYYY-MM-DD)" class="auto-kal" data-kal="format: 'YYYY-MM-DD'"/>
											</div>
											<div class="2u 12u$(xsmall)">
											<center><h3>~</h3></center>
											</div>
											<div class="5u$ 12u$(xsmall)">
												<input type="text" name="demo-name" id="demo-name" value="" placeholder="종료일 (YYYY-MM-DD)" class="auto-kal" data-kal="direction: 'future', format: 'YYYY-MM-DD'"/>
											</div>
											<div class="12u$">
												<textarea name="demo-message" id="demo-message" placeholder="이벤트 상세내용" rows="6"></textarea>
											</div>
											<div class="12u$">
												<ul class="actions">
													<li><input type="submit" class="special" value="등록"></li>
													<li><input type="reset" value="모두 지우기"></li>
												</ul>
											</div>
										</div>
									</form>
								</div>
							</section>

					</div>

				<!-- Footer -->
					<footer id="footer">
						<section>
							<h2>The Minimap</h2>
							<p>- Open Source Software Project -<br/>게임 속 미니맵을 손목 위로!<br/>게임경험 기반 오픈 지도정보 서비스</p>
							<ul class="actions">
								<li><a href="http://www.samsung.com/sec/apps/mobile/galaxyapps/" class="button">Download on Galaxy Apps</a></li>
							</ul>	
						</section>
						<section>
							<h2>GWCW (Game Will Change the World)</h2>
							<dl class="alt">
								<dt>팀원</dt>
								<dd>강신혁<br/>윤예지</dd>
								<dt>Blog</dt>
								<dd><a href="http://bluishy.tistory.com">http://bluishy.tistory.com</a></dd>
								<dt>Email</dt>
								<dd>fpq00@naver.com<br/>yeji1212yyj@gmail.com</dd>
							</dl>
							<ul class="icons">
								<li><a href="https://twitter.com/GWCW_TheMinimap" class="icon fa-twitter alt"><span class="label">Twitter</span></a></li>
								<!--<li><a href="#" class="icon fa-facebook alt"><span class="label">Facebook</span></a></li>
								<li><a href="#" class="icon fa-instagram alt"><span class="label">Instagram</span></a></li>
								<li><a href="#" class="icon fa-dribbble alt"><span class="label">Dribbble</span></a></li>-->
								<li><a href="http://github.com/Bluishyj/minimap" class="icon fa-github alt"><span class="label">GitHub</span></a></li>
							</ul>
						</section>
						<p class="copyright">&copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
					</footer>

			</div>

		<!-- Scripts -->
			<script src="{{ asset('js/gwcw/jquery.min.js') }}"></script>
			<script src="{{ asset('js/gwcw/jquery.scrollex.min.js') }}"></script>
			<script src="{{ asset('js/gwcw/jquery.scrolly.min.js') }}"></script>
			<script src="{{ asset('js/gwcw/skel.min.js') }}"></script>
			<script src="{{ asset('js/gwcw/util.js') }}"></script>
			<!--[if lte IE 8]><script src="{{ asset('js/gwcw/ie/respond.min.js') }}"></script><![endif]-->
			<script src="{{ asset('js/gwcw/main.js') }}"></script>

	</body>
</html>

