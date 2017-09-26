require(["config"],function(){
	require(["zepto","iscroll","touch","template","template","uploadFooter"],function($,IScroll,touch,template){
		$(function(){
			var myScroll = new IScroll(".main",{
				 scrollbars: true,
			     probeType: 2,
			     fadeScrollbars:true			   
			});
		$(".search").on("tap",function(e){	    
			var sear = {name:$("input").val()};
			$("input").val("");			
			$.post("/api/found",sear,function(data){
				if(data.length==0){
					var html = `<div style="text-align:center;padding-top:1rem;">你搜索内容未找到</div>`;
					$('.content').html(html);
					return;
				}
				var html = template("muban",{list:data});
				$('.content').html(html);
				var myScroll = new IScroll(".main",{
					 scrollbars: true,
				     probeType: 2,
				     fadeScrollbars:true			   
				});					
			});		
							
		});

		$(".content").on("tap","span",function(){
			var cc = $(this).css("background-color");
			if(cc=="rgb(13, 196, 65)")
				$(this).css({"background-color":"rgb(229, 229, 229)"});
			else
				$(this).css({"background-color":"rgb(13, 196, 65)"});
		});



	
		});
	});
});






