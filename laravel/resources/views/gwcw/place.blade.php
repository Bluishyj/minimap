@extends('gwcw.layouts.master')
@section('content')
<div id="main" style="border-radius:0; padding:1em">
@if ($db_cnt==0)
일치하는 장소가 없습니다.<br>
장소 정보를 입력해주세요.
<script>
window.onload = function(){
	$('#category', parent.document).removeAttr("disabled");
	$('#place_name', parent.document).removeAttr("disabled");
	$('#phone', parent.document).removeAttr("disabled");
}
</script>
@else
일치하는 장소를 선택하세요<br><br>
	<section>
	<div class="table-wrapper">
			<table id="add_list">
				<thead>
					<tr>
						<th>Id</th>
						<th>장소명</th>
						<th>카테고리</th>
						<th>주소</th>
						<th>전화번호</th>
					</tr>
				</thead>
				<tbody>
@foreach ($db_results as $db_result)
					<tr>
						<td>{{ $db_result->place_id }}</td>
						<td>{{ $db_result->place_name }}</td>
						<td>{{ $db_result->category }}</td>
						<td>{{ $db_result->address }}</td>
						<td>{{ $db_result->phone }}</td>
					</tr>
@endforeach
					<tfoot>
						<tr>
							<td colspan="3"></td>
							<td>원하는 장소가 없습니다.</td>
						</tr>
					</tfoot>
				</tbody>
			</table>
		</div>
	</section>
</div>

<!-- table onclick event script-->
<script>

function onRowClick(tableId, callback) {
    var table = document.getElementById(tableId),
        rows = table.getElementsByTagName("tr"),
        i;
    for (i = 0; i < rows.length; i++) {
        table.rows[i].onclick = function (row) {
            return function () {
                callback(row);
            };
        }(table.rows[i]);
    }
};
 
onRowClick("add_list", function (row){
	if(row.getElementsByTagName("td")[0].innerHTML!=""){
		$("#category", parent.document).val(0).prop("selected", true);
		$('#category', parent.document).attr("disabled", "disabled");
		$('#place_name', parent.document).attr("disabled", "disabled");
		$('#phone', parent.document).attr("disabled", "disabled");
		$('#loc_wrap', parent.document).css("display","none");
		parent.receive_loc_data(row.getElementsByTagName("td")[0].innerHTML, row.getElementsByTagName("td")[1].innerHTML, row.getElementsByTagName("td")[2].innerHTML, row.getElementsByTagName("td")[3].innerHTML, row.getElementsByTagName("td")[4].innerHTML);
	}
	else{
		$('#category', parent.document).removeAttr("disabled");
		$('#place_name', parent.document).removeAttr("disabled");
		$('#phone', parent.document).removeAttr("disabled");
		$('#loc_wrap', parent.document).css("display","none");
	}
	//window.alert(row.getElementsByTagName("td")[0].innerHTML);
});
</script>
@endif
@endsection
