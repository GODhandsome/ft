require(["config"],function(){
	require(["zepto","iscroll","touch","template","swiper","template","uploadFooter"],function($,IScroll,touch,template,Swiper){
		
			var index = 0;
			var scroll1,scroll2,scroll3;
			var pp = true;
			var scroll;
			

			function Scroll(page,flag,element,tap){				
				this.page = page;
				this.flag = flag;
				this.struggle = "";
				this.element = element
				this.tap = tap;
				this.scroll = null;
				this.init();
			}
			
			Scroll.prototype.init = function(){
				let that = this;
				let obj = {
					flag :that.flag,
					page:that.page
				}
				$.post("/api/foot",obj,function(data){				
					data.length = data.msg;				
					let arr = new Array(data.length);
					let cc=that.flag;	
					let html = template(cc,{list:arr});					
					if(that.page==0){								
						$(that.element+" .export").append(html);
						that.scroll = new IScroll(that.element,{
							scrollbars: true,
						    probeType: 2,
						    fadeScrollbars:true,		   	
						});
						that.oo();
						that.page++;
					}
				});	
			}
		Scroll.prototype.oo = function(){
			let that = this;
			let myScroll = that.scroll;			
			let obj = {
				flag :that.flag,
				page:that.page
				}
			myScroll.maxScrollY +=50;
			let maxscroll = myScroll.maxScrollY;	
			myScroll.on("scroll",function(){				
				if(that.struggle=="" && this.directionY==1 && this.y<maxscroll-55){
					that.tap.html("释放加载更多");
					myScroll.maxScrollY-=50;
					maxscroll = myScroll.maxScrollY;
					that.struggle="up"
				}
				if(that.struggle=="up" && this.directionY==-1 && this.y>maxscroll){
					that.tap.html("上拉加载");
					myScroll.maxScrollY+=50;
					maxscroll = myScroll.maxScrollY;
					that.struggle="";
				}
			});
			myScroll.on("scrollEnd",function(){				
				if(that.struggle=="up"){	
					that.struggle="tt";			
					that.tap.html("加载中");				
					$.post("/api/foot",obj,function(data){
						let arr = new Array(4);	
						let html = template(that.flag,{list:arr});
						$(that.element+" .export").append(html);
						that.page +=1;
						myScroll.refresh();				
						myScroll.maxScrollY +=50;
						maxscroll = myScroll.maxScrollY;
						that.tap.text("上拉加载");	
						that.struggle="";							
					});						
				}

			});	
		}
		

		function checked(){
			if(index==0){
				if(!scroll1)
				scroll1 = new Scroll(0,"0","#lives",$("#lives .load"));	
			}			
			else if(index==1){
				if(!scroll2)
				scroll2 = new Scroll(0,"1","#lifes",$("#lifes .load"));
			}			
			else if(index==2){
				if(!scroll3)
				scroll3 = new Scroll(0,"2","#girls",$("#girls .load"));
			}
		}

		checked();
 

			



















			var myswiper1 = new Swiper('.main .swiperbox',{
				pagination : '.pages p',
				paginationClickable:true,
				noSwiping : true,
				resistanceRatio : 0,
				paginationBulletRender: function (mySwiper, index) {
					var arr=["热点","关注"];
					if(index==0) return '<span class="choose">' + arr[index] + '</span>';
				      return '<span class="">' + arr[index] + '</span>';
				  }
			
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
					index = swiper.activeIndex;
					checked();   
					 
				},			  
			});
			$('.main .swiperbox #one #menu .shows').on('tap','span',function(){
			 	$(this).addClass("choose").siblings().removeClass("choose");
			    myswiper2.slideTo($(this).index(), 500, false);
			    index = $(this).index();
				checked();
			  
			});
			$('.pages').on('tap','span',function(){
			 	$(this).addClass("choose").siblings().removeClass("choose");
			    myswiper1.slideTo($(this).index(), 500, false);
			  	if(pp){		  		
			  		 scroll = new IScroll("#two",{
							scrollbars: true,
						    probeType: 2,
						    fadeScrollbars:true,		   	
					});
			  		 scroll.struggle ="";
			  		 scroll.tap = $("#two .load");
			  		 scroll.page =1;
			  		 scroll.flag = "3";
			  		 

			  		scroll.maxScrollY +=50;
					var maxscroll = scroll.maxScrollY;	
					scroll.on("scroll",function(){				
						if(scroll.struggle=="" && scroll.directionY==1 && scroll.y<maxscroll-55){
							scroll.tap.html("释放加载更多");
							scroll.maxScrollY-=50;
							maxscroll = scroll.maxScrollY;
							scroll.struggle="up"
						}
						if(scroll.struggle=="up" && scroll.directionY==-1 && scroll.y>maxscroll){
							scroll.tap.html("上拉加载");
							scroll.maxScrollY+=50;
							maxscroll = scroll.maxScrollY;
							scroll.struggle="";
						}
					});
					scroll.on("scrollEnd",function(){				
						if(scroll.struggle=="up"){	
							scroll.struggle="tt";			
							scroll.tap.html("加载中");				
							$.post("/api/foot",{},function(data){
								
								let arr = new Array(2);	
								let html = template("3",{list:arr});
								$("#two .export").append(html);
								scroll.page +=1;
								scroll.refresh();				
								scroll.maxScrollY +=50;
								maxscroll = scroll.maxScrollY;
								scroll.tap.text("上拉加载");	
								scroll.struggle="";							
							});						
						}

					});	
			  		 pp=false;
			  	}
			});
	});
});