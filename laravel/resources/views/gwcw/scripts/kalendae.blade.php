@section('script')
	@parent
		<script src="{{ asset('js/gwcw/Kalendae/kalendae.standalone.js') }}" type="text/javascript" charset="utf-8"></script>
		<style type="text/css" media="screen">
			.kalendae .k-days span.closed {
				background:red;
			}
		</style>
@endsection