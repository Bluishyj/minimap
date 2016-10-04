@section('script')
	@parent
<script>
	function loc_popup() {
		var popUrl = "The Minimap";	//팝업창에 출력될 페이지 URL
		var popOption = "width=400, height=400, resizable=no, scrollbars=yes, status=no;";    //팝업창 옵션(optoin)
			window.open(popUrl,"",popOption);
    }
</script>
@endsection