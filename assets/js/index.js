require(["config"],function(){
	require(["zepto","iscroll","touch","template","swiper","template","uploadFooter"],function($,IScroll,touch,template,Swiper){
		$(function(){
			var footboll = [{list:"live",page:0},{list:"life",page:0},{list:"girl",page:0}];
			var flag = 0;			
			var att = ["","",""]
			var $uptag = $(".load");
			var sure = false;
			myScroll = new IScroll("#two",{
				scrollbars: true,
				probeType: 2,
				fadeScrollbars:true,		   	
			});	
			myScroll.refresh();
			send();
			function send(){
				$.post("/api/foot",footboll[flag],function(data){
					data.length = data.msg;
					let arr = new Array(data.length);				
					let html = template(footboll[flag].list,{list:arr});
					if(footboll[flag].page==0){	
						$("#allscroll>div").eq(flag).find(".export").append(html);		
						let myScroll = new IScroll("#"+footboll[flag].list+"s",{
								scrollbars: true,
							    probeType: 2,
							    fadeScrollbars:true,		   	
							});	
							oo(myScroll);	
						footboll[flag].page ++;							
					}												
				});
			}			
		function oo(myScroll){
			myScroll.maxScrollY +=40;
			let maxscroll = myScroll.maxScrollY;	
			myScroll.on("scroll",function(){				
			if(att[flag]=="" && this.directionY==1 && this.y<maxscroll-45){
				$uptag.html("释放加载更多");
				myScroll.maxScrollY-=40;
				maxscroll = myScroll.maxScrollY;
				att[flag]="up"
			}
			if(att[flag]=="up" && this.directionY==-1 && this.y>maxscroll){
				$uptag.html("上拉加载");
				myScroll.maxScrollY+=40;
				maxscroll = myScroll.maxScrollY;
				att[flag]="";

			}
			myScroll.on("scrollEnd",function(){				
				if(att[flag]=="up"){	
					att[flag]="tt";			
					$uptag.text("加载中");				
						$.post("/api/foot",footboll[flag],function(data){
							let arr = new Array(4);	
							let html = template(footboll[flag].list,{list:arr});
							$("#allscroll>div").eq(flag).find(".export").append(html);
								footboll[flag].page +=1;
								myScroll.refresh();				
								myScroll.maxScrollY +=40;
								maxscroll = myScroll.maxScrollY;
								$uptag.text("上拉加载");	
								att[flag]="";							
							});			
				}
			});
			});
		}
			var myswiper1 = new Swiper('.main .swiperbox',{
				pagination : '.pages p',
				paginationClickable:true,
				noSwiping : true,
				resistanceRatio : 0,
				paginationBulletRender: function (mySwiper, index) {
					var arr=["热点","关注"];
					if(index==0) return '<span class="choose">' + arr[index] + '</span>';
				      return '<span class="">' + arr[index] + '</span>';
				  },			  
			});
			var myswiper2 = new Swiper('.main .swiperbox #one #menu',{
				pagination : '.main .swiperbox #one #menu .shows',
				paginationClickable:true,
				resistanceRatio : 0,
				paginationBulletRender: function (mySwiper, index) {
					var arr=["足球现场","足球生活","足球美女"];
					if(index==0) return '<span class="choose">' + arr[index] + '</span>';
				      return '<span class="">' + arr[index] + '</span>';
				  },
				onSlideChangeEnd(swiper){
					   $(".swiper-pagination span").eq(swiper.activeIndex).addClass("choose").siblings().removeClass("choose");
					   flag = swiper.activeIndex;
					   send();
				},			  
			});
			$('.main .swiperbox #one #menu .shows').on('tap','span',function(){
			 	$(this).addClass("choose").siblings().removeClass("choose");
			    myswiper2.slideTo($(this).index(), 500, false);
			   flag=$(this).index();
			   send();
			});
			$('.pages').on('tap','span',function(){
			 	$(this).addClass("choose").siblings().removeClass("choose");
			    myswiper1.slideTo($(this).index(), 500, false);
			});
		});
	});
});