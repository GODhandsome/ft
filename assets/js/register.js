require(["config"],function(){
	require(["zepto","touch"],function(){
		$(function(){
			var flag = false;
			$("input").eq(0).on("blur",function(){
				var tt= {username:$(this).val()};
				if(!tt) {
					$(".uu").html("用户名不能为空").css({color:"red"});
					flag = false;
					return;
				}

				$.post("/api/find",tt,function(data){
					if(data.status==1){
						$(".uu").html("用户名已存在").css({color:"red"});
						flag = false;
						return;
					}
					$(".uu").html("用户名可用").css({color:"green"});
					flag = true;

				});



			});


			$("p").on("tap",function(e){
				var obj = {};	
				obj.username = $("input").eq(0).val().trim();
				obj.password = $("input").eq(1).val().trim();
				obj.callname = $("input").eq(2).val().trim();	
				var tt = {username:obj.username};
				$.post("/api/find",tt,function(data){
					if(data.status==1){
						$(".uu").html("用户名已存在").css({color:"red"});
						flag = false;
						return;
					}
					$(".uu").html("用户名可用").css({color:"green"});
					flag = true;

				});





				if(!obj.username || !obj.password || !obj.callname)
					return alert("用户名、密码或昵称不能为空");
				if(!flag) 
					return alert("用户名有误");
				$.post("/api/register",obj,function(data){
					if(data.status==0)
						{ alert("注册成功");
							location="/html/login.html";
							return;
						}
					return alert("注册失败");
				})

				
			});







		});
	});
});