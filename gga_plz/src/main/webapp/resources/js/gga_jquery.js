$(document).ready(function(){

	/***********************************
	 보내줘야함 - 희정님
	*************************************/
	
	$("#btnBoardComment").click(function(){
			if($("#userComment").val() == "") {
				alert("뎃글을 입력하세요.");
				$("#userComment").focus();
				return false;
			}else{
				commentForm.submit();
			}
		});
	/***********************************
		mypage
	*************************************/
	
	 $(".mypage_ticket").click(function() {
	 var oconid = $(this).data('oconid');
	 location.replace("http://localhost:9000/gga_plz/mypage_ticket.do?oconid="+oconid);
	                    	});
	 $(".mypage_ticket2").click(function() {
 var oconid = $(this).data('oconid');
 location.replace("http://localhost:9000/gga_plz/mypage_ticket2.do?oconid="+oconid);
                    	});
	                    	
	 $(".openmypage").click(function() {
	 location.replace("http://localhost:9000/gga_plz/mypage.do");
	                    	});
	 $(".openmypage2").click(function() {
 location.replace("http://localhost:9000/gga_plz/mypage.do");
                    	});
 $(".openallticket").click(function() {
 location.replace("http://localhost:9000/gga_plz/mypage_allticket.do");
                    	});
	                    	
	$(".refundticket").click(function() {
	
			function getParameterValue(parameterName) {
	 		 var params = new URLSearchParams(window.location.search);
	  		return params.get(parameterName);
				}
			
			var oconid = getParameterValue('oconid');
			alert(oconid);
	 		 var result = confirm("정말 예매를 취소하시겠습니까?");
	  		if (result) {
	  		jQuery.ajax({
	 			url: "http://localhost:9000/gga_plz/mypage_ticket_refund.do?oconid="+oconid	
	 			}).done(function(){
	  			alert("환불이 완료되었습니다.");
	  			location.replace("http://localhost:9000/gga_plz/mypage.do");
	  			});
	    
	  		}
	});                	
	
		/***********************************
		store
		*************************************/
		
		
	
	function reloadModalContent() {  
	   $('#CartModal .modal-content').load('cartModal.do', function() {
	      $('#CartModal').modal('show');
	      
	
	   });
	}
	
	$(document).on('click', '.emptycartclass', function() {
	  $('#CartModal').modal('hide');
	});
	
	$(document).on('click', '.cartclosebtn', function() {
	  $('#CartModal').modal('hide');
	});
		
	   $("#store_cart").click(function(){
	  	 $('#CartModal .modal-content').load('cartModal.do');
		 $('#CartModal').modal('show');
	 });
	  
	  $(".cartbtn").click(function() {
	  		var pid = $(this).data('id');
	
		  $.ajax({
		    url: "cart_insert_proc.do?pid="+pid,
		    success: function(result) {
	
		      $('#buyModal').modal('show');
		      
		    }
		  });
		  return false;
	});
	
	
	  $("#shoppingbtn").click(function(){
		 $('#buyModal').modal('hide');
	 });
	  $("#gocartbtn").click(function(){
		 $('#buyModal').modal('hide');
	
		 $('#CartModal .modal-content').load('cartModal.do');
		 $('#CartModal').modal('show');
		 
	 });
	 
	
	  $("#cartclosebtn2").click(function(){
		 $('#buyModal').modal('hide');
	 });
	  
	$(".cartbtn2").click(function(){
		 $('#buycartModal').modal('show');
		 $("#cartkakaopay").data('price',$(this).data('price'));
		 $("#cartkakaopay").data('id',$(this).data('id'));
		 $("#cartkakaopay").data('pfile',$(this).data('pfile'));
		 $("#cartkakaopay").data('pname',$(this).data('pname'));
		 $("#cartcardpay").data('price',$(this).data('price'));
	 });

	  $("#cartclosebtn3").click(function(){
		 $('#buycartModal').modal('hide');
	 });
	
	 
	  $("#cartcardpay").click(function(){
		var price = $(this).data('price');
	
			var IMP = window.IMP; 
	        IMP.init("imp71285848"); 
	      
	        var today = new Date();   
	        var hours = today.getHours(); // 시
	        var minutes = today.getMinutes();  // 분
	        var seconds = today.getSeconds();  // 초
	        var milliseconds = today.getMilliseconds();
	        var makeMerchantUid = hours +  minutes + seconds + milliseconds;
			
			if(price == "0"){
				alert("결제할 상품이 없습니다.");
			}else{
				IMP.request_pay({
	                pg : 'kcp',
	                pay_method : 'card',
	                merchant_uid: "IMP"+makeMerchantUid, 
	                name : 'GGA 스토어',
	                amount : price,
	                buyer_email : 'Iamport@chai.finance',
	                buyer_name : '아임포트 기술지원팀',
	                buyer_tel : '010-1234-5678',
	                buyer_addr : '서울특별시 강남구 삼성동',
	                buyer_postcode : '123-456'
		           /* m_redirect_url: "http://localhost:9000/gga_plz/ordercon.do" */
	            }, function (rsp) { // callback
	                if (rsp.success) {
	                    console.log(rsp);
	                    jQuery.ajax({
	        				url:"cart_order_proc.do?price="+price,
	        				method:"POST",
	        				headers: { "Content-Type": "application/json" },
	        			    data: {
	        			          imp_uid: rsp.imp_uid,            // 결제 고유번호
	        			          merchant_uid: rsp.merchant_uid   // 주문번호
	        			        }
	                    	}).done(function (data) {
	                        // 성공시 로직
	                    		location.replace("http://localhost:9000/gga_plz/index.do");
	                    	})
	                    } else {
	                    console.log(rsp);
	                    alert("결제를 실패했습니다. 잠시후 다시 시도해 주세요.");
	                    
	              	  }
	            
	            });
		}
	
	 });
	 
	  $("#cartkakaopay").click(function(){
			var price = $(this).data('price');
			var pid = $(this).data('id');
			var pname = $(this).data('pname');
			var pfile = $(this).data('pfile');
			
			var IMP = window.IMP; 
	        IMP.init("imp71285848"); 
	      
	        var today = new Date();   
	        var hours = today.getHours(); // 시
	        var minutes = today.getMinutes();  // 분
	        var seconds = today.getSeconds();  // 초
	        var milliseconds = today.getMilliseconds();
	        var makeMerchantUid = hours +  minutes + seconds + milliseconds;
			
			if(price == "0"){
				alert("결제할 상품이 없습니다.");
			}else{
				IMP.request_pay({
	                pg : 'kakaopay',
	                pay_method : 'card',
	                merchant_uid: "IMP"+makeMerchantUid, 
	                name : 'GGA 스토어',
	                amount : price,
	                buyer_email : 'Iamport@chai.finance',
	                buyer_name : '아임포트 기술지원팀',
	                buyer_tel : '010-1234-5678',
	                buyer_addr : '서울특별시 강남구 삼성동',
	                buyer_postcode : '123-456'
		           /* m_redirect_url: "http://localhost:9000/gga_plz/ordercon.do" */
	            }, function (rsp) { // callback
	                if (rsp.success) {
	                    console.log(rsp);
	                    jQuery.ajax({
	        				url:"product_order_proc.do?pprice="+price+"&pid="+pid+"&pname="+pname+"&pfile="+pfile,
	        				/*
	        				method:"POST",
	        				headers: { "Content-Type": "application/json" },
	        			    data: {
	        			          imp_uid: rsp.imp_uid,            // 결제 고유번호
	        			          merchant_uid: rsp.merchant_uid   // 주문번호
	        			        }
	        			     */
	                    	}).done(function (data) {
	                        // 성공시 로직
	                    		location.replace("http://localhost:9000/gga_plz/productordercon.do");
	                    	})
	                    } else {
	                    console.log(rsp);
	                    alert("결제를 실패했습니다. 잠시후 다시 시도해 주세요.");
	                    
	              	  }
	            
	            });
		}
	 });

	 
		/*********************************
		 영화 CRUD
		 *********************************/
		 /* 영화 삭제*/
		 $("#btnMovieDelete").click(function(){
			var movieDeleteConfirm = confirm("정말로 삭제 하시겠습니까 ?");
			if(movieDeleteConfirm) {
				movieDelete.submit();
				alert("삭제 완료");
			}else {
				alert("삭제 취소")
			}
		 });
		 /* 영화 수정 */
		 $("#btnMovieUpdate").click(function(){
		 		movieUpdate.submit();
		 });
		 /* 영화 등록 */
		 $("#btnMovieRegister").click(function(){
		 	if($("#mtitle1").val()==""){
		 		alert("영화제목을 입력해주세요");
		 		$("#mtitle1").focus();
		 		return false;
		 	}else{
		 		movieRegister.submit();
		 	}
		 });
		/**********************************
		희정짱 order 부분!!
		 **********************************/
	/*예매 버튼이 눌릴 때 예매번호 생성해서 폼에 같이 넘기기*/
		$("#indexOrderBtn").click(function(){
		var oid = "";
		$.ajax({
			url:"http://localhost:9000/gga_plz/oidProc.do",
			success:function(result){
				oid = result;
				location.replace("http://localhost:9000/gga_plz/order.do?oid="+oid);
			}
	});
	});

		$("#mypagegoorder").click(function(){
		var oid = "";
		$.ajax({
			url:"http://localhost:9000/gga_plz/oidProc.do",
			success:function(result){
				oid = result;
				location.replace("http://localhost:9000/gga_plz/order.do?oid="+oid);
			}
	});
	});
		
		$(".headerorderbtn").click(function(){
			var oid = "";
			$.ajax({
				url:"http://localhost:9000/gga_plz/oidProc.do",
				success:function(result){
					oid = result;
					location.replace("http://localhost:9000/gga_plz/order.do?oid="+oid);
				}
		});
		});
		
		$(".headerorderbtn1").click(function(){
			var oid = "";
			$.ajax({
				url:"http://localhost:9000/gga_plz/oidProc.do",
				success:function(result){
					oid = result;
					location.replace("http://localhost:9000/gga_plz/order.do?oid="+oid+"&movieid="+movieid);
				}
		});
		});
		
		/*
		 * 좌석 선택
		 * */
		$("#seatcardbtn").click(function(){
			var seatcom = $("#seatcom").html();
			var seattotal = $("#seattotal").html();
			var oid = $("#oidinput").val();
			
			var IMP = window.IMP; 
	        IMP.init("imp71285848"); 
	      
	        var today = new Date();   
	        var hours = today.getHours(); // 시
	        var minutes = today.getMinutes();  // 분
	        var seconds = today.getSeconds();  // 초
	        var milliseconds = today.getMilliseconds();
	        var makeMerchantUid = hours +  minutes + seconds + milliseconds;
			
			if(seatcom == ""){
				alert("좌석을 선택해 주세요.");
			}else{
				IMP.request_pay({
	                pg : 'kcp',
	                pay_method : 'card',
	                merchant_uid: "IMP"+makeMerchantUid, 
	                name : 'GGA 영화 티켓',
	                amount : seattotal,
	                buyer_email : 'Iamport@chai.finance',
	                buyer_name : '아임포트 기술지원팀',
	                buyer_tel : '010-1234-5678',
	                buyer_addr : '서울특별시 강남구 삼성동',
	                buyer_postcode : '123-456',
		            /* m_redirect_url: "http://localhost:9000/gga_plz/ordercon.do"  */
	            }, function (rsp) { // callback
	                if (rsp.success) {
	                	  jQuery.ajax({
	        				url:"seatProc.do?seat="+seatcom+"&price="+seattotal+"&oid="+oid,
	        				method:"POST",
	        				headers: { "Content-Type": "application/json" },
	        			    data: {
	        			          imp_uid: rsp.imp_uid,            // 결제 고유번호
	        			          merchant_uid: rsp.merchant_uid,   // 주문번호
	        			          pg_type: rsp.pg //pg사 이름
	        			        }
	                    	}).done(function (data) {
	                        // 성공시 로직
	                    		location.replace("http://localhost:9000/gga_plz/ordercon.do?oid="+oid);
	                    	})
	                    } else {
	                    console.log(rsp);
	                    alert("결제를 실패했습니다. 잠시후 다시 시도해 주세요.");
	                    
	              	  }
	            });
				
				
			}
			
		});
$("#seatkakaobtn").click(function() {
    var seatcom = $("#seatcom").html();
    var seattotal = $("#seattotal").html();
    var oid = $("#oidinput").val();

    var IMP = window.IMP;
    IMP.init("imp71285848");

    var today = new Date();
    var hours = today.getHours(); // 시
    var minutes = today.getMinutes(); // 분
    var seconds = today.getSeconds(); // 초
    var milliseconds = today.getMilliseconds();
    var makeMerchantUid = hours + minutes + seconds + milliseconds;

    var impuid = "";
    var merchantuid = "";
    var pgtype = "";

    if (seatcom == "") {
        alert("좌석을 선택해 주세요.");
    } else {
        IMP.request_pay({
            pg: 'kakaopay',
            pay_method: 'card',
            merchant_uid: "IMP" + makeMerchantUid,
            name: 'GGA 영화 티켓',
            amount: seattotal,
            buyer_email: 'Iamport@chai.finance',
            buyer_name: '아임포트 기술지원팀',
            buyer_tel: '010-1234-5678',
            buyer_addr: '서울특별시 강남구 삼성동',
            buyer_postcode: '123-456'
        }, function(rsp) { // callback
            if (rsp.success) {
                console.log(rsp);
                impuid = rsp.imp_uid, // 결제 고유번호
                    merchantuid = rsp.merchant_uid, // 주문번호
                    pgtype = 'kakaopay',
                    $.ajax({
                        url: "http://localhost:9000/gga_plz/seatProc.do?seat=" + seatcom + "&price=" + seattotal + "&oid=" + oid,
                        method: "POST",
                    }).done(function(data) {
                        if (data == '0') {
                            // 반환된 int 값이 0인 경우의 처리 로직
                            alert("이미 선택된 좌석입니다.");
                        } else if (data == '1') {

                            $.ajax({
                                url: "http://localhost:9000/gga_plz/orderconProc.do?impuid=" + impuid + "&merchantuid=" + merchantuid + "&pgtype=" + pgtype + "&oid=" + oid,
                                method: "POST",
                            }).done(function(data) {
                                // 두 번째 AJAX 요청 완료 후 실행될 코드
                                location.replace("http://localhost:9000/gga_plz/ordercon.do?merchantuid=" + merchantuid);
                            });
                        } else {
                            alert("알 수 없는 에러가 발생했습니다. 잠시 후 다시 시도해 주세요.");
                        }
                    });

            } else {
                console.log(rsp);
                alert("결제를 실패했습니다. 잠시후 다시 시도해 주세요.");
            }

        });
    }

});		
		/*
		 * 예매 폼 입력
		 * */
		//event : 예매 영화 제목 클릭시
		$(".orderseltitle").click(function(){
			$("#movieid").val($(this).val());
			$("#movieordertitle").val($(this).text());
			$("#movieorderposter").val($(this).data('poster'));
			const urlParams = new URL(location.href).searchParams;
			const oid = urlParams.get('oid');
			$("#oid").val(oid);
		});
		$("#orderdate").change(function(){
			$("#odate").val($("#orderdate").val());
		});
		//event : 예매 시간 클릭시
		$(".orderseltime").click(function(){
			
			$("#otime").val($(this).text());
		});
		/*
		 * 예매 폼 체크 - 유효성체크
		 * */
		$("#orderformbtn").click(function(){
			
			if($("#orderid").val()==""){
				alert("로그인 해주세요.");
				$(location).attr("href", "http://localhost:9000/gga_plz/login.do");
			}else if($("#movieid").val()==""){
				alert("영화를 선택해 주세요.");
				$(".orderseltitle").focus();
				return false;
			}else if($("#odate").val()==""){
				alert("날짜를 선택해 주세요.");
				$("#orderdate").focus();
				return false;
			}else if($("#otime").val()==""){
				alert("시간을 선택해 주세요.")
				$(".orderseltime").focus();
				return false;
			}else if($("#oname").val()==""){
				alert("이름을 입력해 주세요.")
				$("#oname").focus();
				return false;
			}else if($("#ocarnum").val()==""){
				alert("차량번호를 입력해 주세요.")
				$("#ocarnum").focus();
				return false;
			}else if($("#oemail").val()==""){
				alert("이메일을 입력해 주세요.")
				$("#oemail").focus();
				return false;
			}else if($("#ophone").val()==""){
				alert("전화번호를 입력해 주세요.")
				$("#ophone").focus();
				return false;
			}else{
				orderForm.submit();
			}
			
		});
	
		/**********************************
		header 부분 검색 
		 **********************************/
		
		$("#btnSearch").click(function(){
			if($("#movietitle").val() =="" ){
				alert("영화 제목을 입력해주세요.");
				$("#movietitle").focus();
				return false;
			} else{
				$.ajax({
			          url:"http://localhost:9000/gga_plz/searchproc.do?movietitle="+$("#movietitle").val(),
			          success: function(movieid){
			          	if(movieid == ""){
							alert("상영 예정 없는 영화입니다 다른검색어를 입력해주세요");
			          	}else{
			           	 location.href="http://localhost:9000/gga_plz/movieinfo.do?movieid="+movieid; }
			         	}
					
				});
			}
		});
		/**********************************
		영화 포스터 클릭시 -> movieinfo 이동
		 **********************************/
		$(".mimg").click(function(){
			let movieid = $(this).attr("id");
			$(location).attr("href", "http://localhost:9000/gga_plz/movieinfo.do?movieid="+movieid)
		});
		/**********************************
		board write - 5월 12일 송지웅 이미지 버튼 클릭 이동 유효성 체크(로그인 여부)
		 **********************************/
	//글쓰기
			$("#btnBoardWrite").click(function(){
				if($("#btitle").val() == "") {
					alert("제목을 입력하세요.");
					$("#btitle").focus();
					return false;
				}else if ($("#bmovie").val() == "default"){
					alert("영화를 선택하세요.");
					$("#bmovie").focus();
					return false;
				}else if ($("#bscore").val() == "default"){
					alert("평점을 선택하세요.");
					$("#bscore").focus();
					return false;
				}else if ($("#btextarea").val() == ""){
					alert("내용을 입력하세요.");
					$("#btextarea").focus();
					return false;
				}else {
					writeForm.submit();
				}
			});
		 
	//업데이트
			
			$("#btnBoardUpdate").click(function(){
			if($("#btitle").val() == "") {
				alert("제목을 입력하세요.");
				$("#btitle").focus();
				return false;
			}else if ($("#bmovie").val() == "default"){
				alert("영화를 선택하세요.");
				$("#bmovie").focus();
				return false;
			}else if ($("#bscore").val() == "default"){
				alert("평점을 선택하세요.");
				$("#bscore").focus();
				return false;
			}else if ($("#btextarea").val() == ""){
				alert("내용을 입력하세요.");
				$("#btextarea").focus();
				return false;
			}else {
				updateForm.submit();
			}
		});
	
		//리셋 버튼
		
		$("#btnBoardReset").click(function(){
			$("#btitle").val("");
			$("#bmovie").val("default");
			$("#bscore").val("default");
			$("#btextarea").val("");
		});
		
		/***
		 * 게시판 콘텐츠  
		 */
		//삭제 버튼
		
		$("#boardDelete").click(function(){
			var delConfirm = confirm("정말로 삭제 하시겠습니까 ?");
			if(delConfirm) {
				contentForm.submit();
				alert("삭제 서브밋.");
			}else {
				alert("취소 되었습니다.")
			}
		});
		// -- 송지웅 5-16
		
	// -- 오장원
		/**
		 * 회원가입
		 */
		$("#btnJoin").click(function(){
			if ($("#id").val() == ""){
				alert("아이디를 입력해주세요.");
				$("#id").focus();
				return false;
			} else if ($("#idCheck_msg").text() == ""){
				alert("아이디 중복을 확인해주세요.");
				$("#idCheck_msg").focus();
				return false;
			} else if ($("#pass").val() == ""){
				alert("비밀번호를 입력해주세요.");
				$("#pass").focus();
				return false;
			} else if ($("#cpass").val() == ""){
				alert("비밀번호 확인을 입력해주세요.");
				$("#cpass").focus();
				return false;
			} else if ($("#name").val() == ""){
				alert("이름을 입력해주세요.");
				$("#name").focus();
				return false;
			} else if ($("#birth").val() == ""){
				alert("생년월일을 입력해주세요.");
				$("#birth").focus();
				return false;
			} else if ($("input[name = 'gender']:checked").length == 0){
				alert("성별을 선택해주세요.");
				return false;
			} else if ($("input[name = 'tel']:checked").length == 0){
				alert("통신사를 선택해주세요.");
				return false;
			} else if ($("#phone").val() == ""){
				alert("번호를 입력해주세요.");
				$("#phone").focus();
				return false;
			} else if ($("#email1").val() == ""){
				alert("이메일을 입력해주세요.");
				$("#email1").focus();
				return false;
			} else if ($("#email2").val() == ""){
				alert("주소를 입력 또는 선택해주세요.");
				$("#email3").focus();
				return false;
			} else if ($("#car1").val() == ""){
				alert("차량번호를 입력해주세요.");
				$("#car1").focus();
				return false;
			} else if ($("#car2").val() == ""){
				alert("차량번호를 입력해주세요.");
				$("#car2").focus();
				return false;
			} else if ($("input[name = 'genre']:checked").length == 0 && $("input[name = 'genre']:checked").length > 4){
				alert("선호 영화를 선택해주세요. (3개까지 선택 가능)");
				return false;
			} else{
				
				joinForm.submit();
			}
		}); // btnJoin
		/*
		 * 숫자만 입력
		 */
		$("input:text[numberOnly]").on("keyup", function() {
		      $(this).val($(this).val().replace(/[^0-9]/g,""));
		   });
		   
		/**
		 * 회원가입 - 아이디 중복
		 */
		$("#btnIdCheck").click(function(){
			if ($("#id").val() == ""){
				alert("아이디를 입력해주세요.")
				$("#id").focus();
				return false;
			} else{
				$.ajax({
					url : "http://localhost:9000/gga_plz/idCheckProc.do?id=" + $("#id").val(),
					success : function(result){
						if (result == 1){
							$("#idCheck_msg").text("이미 사용중인 아이디입니다.").css("color", "red")
							.css("font-size", "11px").css("display", "block");
							$("#id").focus();
						} else if (result == 0){
							$("#idCheck_msg").text("사용 가능한 아이디입니다.").css("color", "blue")
							.css("font-size", "11px").css("display", "block");
							
							$("#pass").focus();
						}
					}
				});
			}
		}); // btnIdCheck
		
		/**
		 * 회원가입 - 이메일 체크
		 */
		$("#email3").on("change", function(){
			if ($("#email3").val() == "default" && $("#email2").val() == ""){
				alert("이메일을 입력하거나 선택해주세요.");
				$("#email3").focus();
			} else{
				$("#email2").val($("#email3").val());
			}
		}); // email
		
		/**
		 * 회원가입 - 비밀번호 확인
		 */
		$("#cpass").on("blur", function(){
			if ($("#pass").val() != "" && $("#cpass").val() != ""){
				if ($("#pass").val() == $("#cpass").val()){
					$("#cmsg").text("비밀번호가 일치합니다.").css("color", "blue")
					.css("font-size", "11px").css("display", "block");
				} else{
					$("#cmsg").text("비밀번호가 일치하지 않습니다. 다시 입력해주세요.").css("color", "red")
					.css("font-size", "11px").css("display", "block");
					
					$("#pass").focus();
				}
			}
		}); // cpass
		
		/**
		 * 로그인
		 */
		$("#btnLogin").click(function(){
			if ($("#id").val() == ""){
				alert("아이디를 입력해주세요.");
				$("#id").focus();
				return false;
			} else if ($("#pass").val() == ""){
				alert("비밀번호를 입력해주세요.");
				$("#pass").focus();
				return false;
			} else{
				// 서버 전송
				loginForm.submit();
			}
		}); // btnLogin
	
	// -- 오장원
	
	/**********************************
		소윤짱의 관리자 
		 **********************************/
		$("#btnNoticeWrite").click(function(){
			if($("#ntitle").val()==""){
				alert("제목을 입력해주세요.");
				$("#ntitle").focus();
				return false;
			} else{
				writeForm.submit();
			}
			
		});
		
		$("#btnNoticeUpdate").click(function(){
			if($("#ntitle").val()==""){
				alert("제목을 입력해주세요.");
				$("#ntitle").focus();
				return false;
			} else{
				updateForm.submit();
			}
			
		});
		$("#btnNoticeUpdateProc").click(function(){
			if($("#ntitle").val()==""){
				alert("제목을 입력해주세요.");
				$("#ntitle").focus();
				return false;
			} else{
				updateForm.submit();
			}
			
		});
		$("#btnNoticeDelete").click(function(){
			deleteForm.submit();
			alert("삭제가 완료되었습니다.");
		});
	
	
	/***********************
	소윤 - 공지사항 검색 
	************************/
		$("#btnNoticeSearch").click(function(){
			if($("#ntitle").val() == "" ){
				alert("공지사항 제목을 입력해주세요.");
				$("#ntitle").focus();
				return false;
			} else{
				$.ajax({
			          url:"http://localhost:9000/gga_plz/Searchnoticeproc.do?ntitle="+$("#ntitle").val(),
			          success: function(nid){
			          	if(nid == ""){
							alert("존재하지 않는 게시글입니다.다시 입력해주세요.");
			          	}else{
			           	 location.href="http://localhost:9000/gga_plz/notice_content.do?nid="+nid; }
			         	}
					
				});
			}
		});
		
		
	/***********************
	관리자 공지사항 검색 
	************************/	
	$("#btnAdminNoticeSearch").click(function(){
			if($("#ntitle").val() == "" ){
				alert("공지사항 제목을 입력해주세요.");
				$("#ntitle").focus();
				return false;
			} else{
				$.ajax({
			          url:"http://localhost:9000/gga_plz/Searchnoticeproc.do?ntitle="+$("#ntitle").val(),
			          success: function(nid){
			          	if(nid == ""){
							alert("존재하지 않는 게시글입니다.다시 입력해주세요.");
			          	}else{
			           	 location.href="http://localhost:9000/gga_plz/admin_notice_content.do?nid="+nid; }
			         	}
					
				});
			}
		});
		
	/*대관문의-김소윤*/
	$("#btnConfirm").click(function(){
		if($("#cname").val() == ""){
			alert("성함을 입력해주세요.");
			$("#cname").focus();
			return false;
		}else if($("#cphone1").val() == ""){
			alert("첫번째 핸드폰 번호를 입력해주세요.");
			$("#cphone1").focus();
			return false;
		}else if($("#cphone2").val() == ""){
			alert("두번째 핸드폰 번호를 입력해주세요.");
			$("#cphone2").focus();
			return false;
		}else if($("#cphone3").val() == ""){
			alert("마지막 핸드폰 번호를 입력해주세요.");
			$("#cphone3").focus();
			return false;
		}else if($("#csize").val() == ""){
			alert("총 인원수를 입력해주세요.");
			$("#csize").focus();
			return false;
		}else{
			coronationForm.submit();
			alert("신청이 완료되었습니다.");
		}

	});	
	
	/*********************************
	  search _ using enter key 김소윤
	*********************************/
	$(".n_searchbox").on("keydown", function(e){
		if(e.code == "Enter"){
		 $(".n_searchbutton").click();
		 $(this).off(e);
		}
	});
	

}); //ready
	