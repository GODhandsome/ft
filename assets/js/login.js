require(["config"],function(){
	require(["zepto","touch"],function($,touch){
		$(function(){			
			$(".but").on("tap",function(){
				var obj = {};
				obj.username = $("input").eq(0).val().trim();
				obj.password = $("input").eq(1).val().trim();

				if(!obj.username || !obj.password)
					return $("span").html("用户或密码不能为空").css({color:"red"});

				$.post("/api/login",obj,function(data){
					if(data.status==1)
						return $("span").html("用户或密码错误").css({color:"red"});
					alert("登录成功");
					location="/index.html";
				})



			});






		});
	});
});