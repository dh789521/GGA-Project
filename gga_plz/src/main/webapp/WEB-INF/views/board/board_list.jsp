<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>gga_plz</title>
<link rel="stylesheet" href="http://localhost:9000/gga_plz/css/gga.css"> <!-- gga.css -->
<link rel="stylesheet" href="http://localhost:9000/gga_plz/css/am-pagination.css"> <!-- gga.css -->
<script src="http://localhost:9000/gga_plz/js/jquery-3.6.4.min.js"></script>
<script src="http://localhost:9000/gga_plz/js/gga_board_list.js"></script>
<script src="http://localhost:9000/gga_plz/js/gga_jquery.js"></script>
<script src="http://localhost:9000/gga_plz/js/am-pagination.js"></script>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" 
	rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"> 
	<!-- 부트스트랩 -->
</head>
<style>
@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container {
    width: 1000px;
  }
}
section.board table {
		margin:auto;
} 
section.board table tr td a { /* 텍스트 언더라인 X */
	text-decoration-line:none;
}

table tr:last-child {
	border:1px solid white;
}

table tr:last-child nav ul {
	margin-top:30px;
	justify-content:center;
}

table tr{
	text-align:center;
}

table td:nth-child(2){
	text-align:left;
}
div.board_title img {
	width:230px;
}

img {
	width:95px;
	height:40px;
}

/* 검색  */
section.board div.board_search input { /* 검색창 */
	position:relative;
	top:3px;
	margin:3px;
	height:30px;
}
section.board div.board_search { /* 검색창 영역 */
	float:left;
	position:relative;
	padding:3px;
	margin-top:20px;
	left:50px; top:0px;
}
section.board div.board_search button{ /* 검색&처음 버튼 */
	border:3px groove skyblue;
	width:50px; height:30px;
	font-size:10pt;
	font-align:center;
	margin-bottom:0px;
	background:skyblue;
	color:white;
	border-radius:3px;
}
section.board div.board_search button:hover { /* 커서이벤트 */
	background: powderblue;
}

</style>

<body>
	<!-- header -->
	<header>
		<jsp:include page="/header.do" />
	</header>
	<!-- header -->
	
	<!-- content -->
	<div class="container text-center">
	<div class="board_title">
		<img src="http://localhost:9000/gga_plz/images/comtitle.png">
	</div>
		<section class="board">
			<div class="board_search">
				<input type="text" placeholder=" 게시물 검색" id="btitle" >
				<button type="submit" id="btnBoardSearch" ><p>검색</p></button>
				<a href="board_list.do"><button type="submit"><p>처음으로</p></button></a>
			</div>
			<div class="board_choose">
						<c:choose>
							<c:when test="${sessionScope.svo == null }">
								<a href="http://localhost:9000/gga_plz/login.do" class="writebtncancel">
									<img src="http://localhost:9000/gga_plz/images/writebtn.png">
								</a>
							</c:when>
							<c:otherwise>
								<a href="board_write.do" class="writebtn">
									<img src="http://localhost:9000/gga_plz/images/writebtn.png">
								</a>
							</c:otherwise>
						</c:choose>
			</div>
			<%-- <table class="table table-bordered" id="board_table_init" style="width: 90%;">
				<tr>
					<th>번호</th>
					<th>제목</th>
					<th>조회수</th>
					<th>작성자</th>
					<th>작성일자</th>
				</tr>
				<c:forEach var="boardVo" items="${list}">
				<tr>
					<td>${boardVo.rno }</td>
					<td><a href="board_content.do?bid=${boardVo.bid}" id="list_moive_name" >[${boardVo.movieName }]</a>
					<a href="board_content.do?bid=${boardVo.bid}" >${boardVo.btitle }</a></td>
					<td>${boardVo.bhits }</td>
					<td>${boardVo.mid }</td>
					<td>${boardVo.bdate }</td>
				</tr>
				</c:forEach>
				
				<tr>
					<td colspan="5"><div id="ampaginationsm"></div></td>
				</tr>
			</table>  --%>
		</section>
	</div>
	<!-- content -->


	<!-- footer -->
	<footer>
		<jsp:include page="../footer.jsp" />
	</footer>
	<!-- footer -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" 
	integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK
	/7HAuoJl+0I4" crossorigin="anonymous"></script> <!-- 부트스트랩 -->
</body>
</html>