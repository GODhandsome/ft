require(["config"],function(){
	require(["zepto","iscroll","touch","template","swiper","template","uploadFooter"],function($,IScroll,touch,template,Swiper){


		$(function(){









			var obj = {name:"个人萌"};
			$.post("/api/person",obj,function(data){
				var html = template("muban",{list:data});
				$(".main div").append(html);
				$(".swiperbox").height($(".swiperbox").height()-$(".show").height()-$(".myself").height());
				


			var mySwiper = new Swiper('.swiper-container',{
			pagination : '.swiper-pagination',
			paginationClickable:true,
			resistanceRatio : 0,
			paginationBulletRender: function (mySwiper, index) {
				var arr=["照片","关注","粉丝"];
				var arr2=["photo",'follow',"fans"]
				if(index==0) return '<span class="choose">'  + arr[index] +'('+data[0][arr2[index]].length+')'+ '</span>';
			      return '<span class="">' + arr[index] +'('+data[0][arr2[index]].length+')'+ '</span>';
			  },
		   onSlideChangeEnd(swiper){
				   $(".swiper-pagination span").eq(swiper.activeIndex).addClass("choose").siblings().removeClass("choose");	   
				 },
			});

			var myScroll = new IScroll(".main .swiperbox .swiper-wrapper .gun111",{
				 scrollbars: true,
			     probeType: 2,
			     fadeScrollbars:true,
			    tap:true //开启tap事件
			});
			var myScroll = new IScroll(".main .swiperbox .swiper-wrapper .gun222",{
				 scrollbars: true,
			     probeType: 2,
			     fadeScrollbars:true,
			    tap:true //开启tap事件
			});
			var myScroll = new IScroll(".main .swiperbox .swiper-wrapper .gun333",{
				 scrollbars: true,
			     probeType: 2,
			     fadeScrollbars:true,
			    tap:true //开启tap事件
			});

			 $('.main .swiper-pagination').on('tap','span',function(){
			 	$(this).addClass("choose").siblings().removeClass("choose");
			    mySwiper.slideTo($(this).index(), 500, false);
			});
		



			});


			



		});
	});
});








