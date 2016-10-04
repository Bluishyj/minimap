<!DOCTYPE HTML>
<!--
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
-->
<html>
	<head>
		<title>@yield('title', 'The Minimap')</title>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<!--[if lte IE 8]><script src="{{ asset('js/gwcw/ie/html5shiv.js') }}"></script><![endif]-->
		<link rel="stylesheet" href="{{ asset('css/gwcw/main.css') }}" />
		<!--[if lte IE 9]><link rel="stylesheet" href="{{ asset('css/gwcw/ie9.css') }}" /><![endif]-->
		<!--[if lte IE 8]><link rel="stylesheet" href="{{ asset('css/gwcw/ie8.css') }}" /><![endif]-->
		<!-- date picker -->
		<link rel="stylesheet" href="{{ asset('css/gwcw/Kalendae/kalendae.css') }}" type="text/css" charset="utf-8">
	</head>
	<body>
			@yield('header','')
        	@yield('content', '')
        	@yield('footer','')

		<!-- Scripts -->
			<script src="{{ asset('js/gwcw/jquery.min.js') }}"></script>
			<script src="{{ asset('js/gwcw/jquery.scrollex.min.js') }}"></script>
			<script src="{{ asset('js/gwcw/jquery.scrolly.min.js') }}"></script>
			<script src="{{ asset('js/gwcw/skel.min.js') }}"></script>
			<script src="{{ asset('js/gwcw/util.js') }}"></script>
			<!--[if lte IE 8]><script src="{{ asset('js/gwcw/ie/respond.min.js') }}"></script><![endif]-->
			<script src="{{ asset('js/gwcw/main.js') }}"></script>
			@yield('script', '')
	</body>
</html>