<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>마이페이지</title>
<link rel="stylesheet" href="http://localhost:9000/gga_plz/css/gga.css">
<script src="http://localhost:9000/gga_plz/js/jquery-3.6.4.min.js"></script>
<script src="http://localhost:9000/gga_plz/js/gga_javascript.js"></script> <!-- gga_javascript.js -->
<script src="http://localhost:9000/gga_plz/js/gga_jquery.js"></script>
</head>
<body>
	<!-- Header -->
		<header>
			<jsp:include page="../header.jsp" />
		</header>
	<!-- Header -->
	<!-- Content -->
<c:if test="${sessionScope.svo != null}">
	<div class= "content" >
		<section class= "mypage">
			<div class= "mypage_header">
				<img src="http://localhost:9000/gga_plz/images/mypagetitle.png">
			</div>
			<br>
				<div class="mypage_menu_info">
					<span>${sessionScope.svo.name}님</span> <!-- el태그 memberVo.mid -->
					<a href= "http://localhost:9000/gga_plz/mypage_update.do">내 정보 수정</a> <!-- el태그 memberVo.mid -->
			</div>
		</section>
		<section class="myorder">
		     <c:choose>
		     <c:when test="${not empty ticketlist}">
			<div class="myorder_header">
				<h1>My예매</h1>
				<a href="http://localhost:9000/gga_plz/mypage_allticket.do" class="myorder_all"><h5>전체보기</h5></a>
			</div>
			 <c:forEach var="orderconVo" items="${ticketlist}" end="3"> 
				<div class="myorder_add2">
				<a class="mypage_ticket" data-oconid="${orderconVo.oconid}">
					<img src="http://localhost:9000/gga_plz/images/${orderconVo.movieorderposter}.jpg">				
				</a>
				</div>			
			</c:forEach> 
		     </c:when>
		     <c:otherwise>
		
			<div class="myorder_header">
				<h1>My예매</h1>
			</div>	
			<div class="myorder_text">
			<br>
			<br>
			<br>
			<br>
			<br>
				<p>아직 예매한 영화가 없습니다. 
				영화를 예매하러 갈까요?</p>
				<a id="mypagegoorder" class="orderbtn">
					<img src="http://localhost:9000/gga_plz/images/neworderbtn.png"></a>
			</div>		

	</c:otherwise>
		     </c:choose>
		</section>
		<section class="myreview">
			<div class="myreview_header">
				<h1>My리뷰</h1>
			</div>
			<table class="table table-bordered" style="width: 90%;">
				<tr>
					<th>번호</th>
					<th>제목</th>
					<th>조회수</th>
					<th>작성일자</th>
				</tr>
			 
				<c:forEach var="boardVo" items="${list}">
				<tr>
					<td>${boardVo.rno }</td>
					<td><a href="board_content.do?bid=${boardVo.bid }">[${boardVo.movieTitle}]${boardVo.btitle }</a></td>
					<td>${boardVo.bhits}</td>
					<td>${boardVo.bdate }</td>
				</tr>
				</c:forEach>
				
				<!-- <tr>
					<td colspan="5">
					<p>아직 작성한 리뷰가 없습니다. 리뷰를 쓰러 갈까요?</p>
						<a href="board_write.do" class="writebtn">
							<img src="http://localhost:9000/gga_plz/images/writebtn.png">
						</a>
					</td>
				</tr> -->
				<!-- <tr>
					<td colspan="5">
					<nav aria-label="Page navigation example">
					  <ul class="pagination">
					    <li class="page-item">
					      <a class="page-link" href="#" aria-label="Previous">
					        <span aria-hidden="true">&laquo;</span></a>
							</li>
							    <li class="page-item"><a class="page-link" href="#">1</a></li>
							    <li class="page-item"><a class="page-link" href="#">2</a></li>
							    <li class="page-item"><a class="page-link" href="#">3</a></li>
							    <li class="page-item">
							 <a class="page-link" href="#" aria-label="Next">
					        <span aria-hidden="true">&raquo;</span>
					      </a>
					    </li>
					  </ul>
					</nav>
					</td>
				</tr> -->
			</table>
		</section>
		
	</div>
	<!-- Content -->
	
</c:if>
<c:if test="${sessionScope.svo == null}">
  <script>
    // 세션이 null인 경우 리다이렉트 실행
    window.location.href = 'http://localhost:9000/gga_plz/login.do';
  </script>
</c:if>
	<!-- Footer -->
		<footer>
			<jsp:include page="../footer.jsp" />
		</footer>
	<!-- Footer -->
</body>
</html>