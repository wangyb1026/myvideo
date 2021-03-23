// 依赖jQuery, 需要先引入jQuery, 基于jQuery3.4.1构建, 兼容Chrome/Firefox/Edge Chromium;
	/*
	* 配置说明：
	* 实例化： new MyVideo();
	* 参数：
	* url: 必须[String], 视频文件路径， 视频格式为mp4;
	* showTitle： 显示标题栏 【可选，false】,默认css也为display:none；
	* wrapper: 播放器大小【可选，800 x 600】, wrapper属性： width[String],height[String]；
	* name: 视频标题【可选，String】；
	*/
	// Builder: Jack Wang
;(function(){
	var style = document.createElement('link');
	style.rel = 'stylesheet';
	style.href = 'myvideo/css/myvideo.css';
	document.head.appendChild(style);
	function MyVideo(obj) {
		this.obj = obj;
		var _this = this;
		if (typeof jQuery === 'undefined') {
			var sc = document.createElement('script');
					sc.src = 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js';
					sc.type = 'text/javascript';
					document.head.appendChild(sc);
					var _alertTimeout_ = setTimeout(function () {
						alert('视频组件初始化失败，请刷新浏览器或检查网络连接！');
					}, 15000)
					sc.onload = function(){
						clearTimeout(_alertTimeout_);
						_this.init();
					}
		} else {
			this.init();
		}
	}
	MyVideo.prototype.init = function(){
		try{
			
			$('#videoWrapper')
		}catch{
			throw new Error('no element')
		}
		  // $('#videoWrapper').append('');
			$('#videoWrapper .title').css({
				display: this.obj.showTitle ? 'block' : 'none'
			});
			if (this.obj.wrapper) {
				$('#videoWrapper').css({
					width: this.obj.wrapper.width,
					height: this.obj.wrapper.height || '480px'
				});
			}
			$('#myvideo').attr('src', this.obj.url);
			$('#videoWrapper .title').text(this.obj.name || '');
			createVideo();
	}
	window.MyVideo = MyVideo;

	function createVideo(){
		var curVol = null;
		var video = $('#myvideo');

    //定义时间格式：
    function timeFormat(i){
        var minute = Math.floor(i / 60);
        if(minute < 10){
        	minute = '0' + minute;
        }
        var second = Math.floor(i % 60);
        if(second < 10){
        	second = '0' + second;
        }
        return minute + ':' + second;
    }



	//点击播放按钮播放，暂停按钮暂停；停止按钮停止。
    function playAndPause(){
    	if(video[0].paused || video[0].ended){
    		video[0].play();
				$('#play').html('&#xe674;').attr('title', '暂停');
				$('#videoWrapper').on('mousemove', function(){
					clearTimeout(cursorTimeout);
					$('#videoWrapper').css({
						cursor: 'default'
					})
					// var isShown = false;
					if(parseInt($('.bottom').css('bottom')) > -62){
						isShown = true;
					}
					if(!isShown){
						$('#videoWrapper .title').stop().animate({
							'top':0
						},500);
						$('#videoWrapper .bottom').stop().animate({
							'bottom':0
						},500);
						// isShown = true;
					}
				})
				// 在控制区域取消自动隐藏相关事件
				$('#videoWrapper .bottom').on('mousemove', function(){
					clearTimeout(cursorTimeout);
					$('#videoWrapper').unbind('mousemove');
				}).on('mouseout', function(){
					clearTimeout(cursorTimeout);
					$('#videoWrapper').css({
						cursor: 'default'
					})
					var isShown = false;
					if(parseInt($('.bottom').css('bottom')) > -62){
						isShown = true;
					}
					if(!isShown){
						$('#videoWrapper .title').stop().animate({
							'top':0
						},500);
						$('#videoWrapper .bottom').stop().animate({
							'bottom':0
						},500);
					}
					
					cursorTimeout =	setTimeout(function(){
						$('#videoWrapper').css({
							cursor: 'none'
						})
						$('#videoWrapper .title').stop().animate({
							'top':'-30px'
						},500);
						$('#videoWrapper .bottom').stop().animate({
							'bottom':'-62px'
						},500);
						isShown = false;
					},2000)
				})
    	}else{
        video[0].pause();
    		$('#play').html('&#xe65c;').attr('title', '播放');
				cursorTimeout =	setTimeout(function(){
					$('#videoWrapper').css({
						cursor: 'none'
					})
					$('#videoWrapper .title').stop().animate({
						'top':'-30px'
					},500);
					$('#videoWrapper .bottom').stop().animate({
						'bottom':'-62px'
					},500);
					isShown = false;
				},2000)
    	}
    };             
    function stopVideo(){
			if(video[0].currentTime === 0) {
				return;
			}
        video[0].pause();
        video[0].currentTime = 0;
        $('#play').html('&#xe65c;');
    };
    

    
    //根据视频进度显示进度条进度：
    video.on('timeupdate',function process(){
    	var currentTime=video[0].currentTime;
    	var totalTime=video[0].duration;
    	var perTime= currentTime / totalTime * 100;
    	$('.barlength').css({
    		'width':perTime+'%'
    	});
    	$('#curtime').html(timeFormat(currentTime));
    });

	//拖动进度条调整进度
       //拖拽进度条鼠标事件：
    function enableProgressDrag(){
    	var progressDrag=false;//定义变量，是否在拖拽进度条
    	$('.bar').on('mousedown',function(e){
            progressDrag=true;//鼠标按下事件，表示要拖拽进度条，progressDrag值设为true；
            updateProgress(e.pageX);
    	});
    	$(document).on('mouseup',function(e){//给document绑定，消除鼠标移到其他元素上时拖动失效
    		if(progressDrag){
    			progressDrag=false;//鼠标松开事件，表示不再拖动进度条，progressDrag值为false
    			updateProgress(e.pageX);
    		}
    	})
    	$(document).on('mousemove',function(e){
    		if(progressDrag){        //鼠标移动事件，判断是否在拖动进度条，为true,将鼠标位置传递给update函数
    			updateProgress(e.pageX);//为false,不执行进度条更新（不传递参数给update函数）
    		}
    	})
    }
       //进度条更新：
    function updateProgress(x) {
        var progress = $(".bar");

        var percent = 100 * (x - progress.offset().left) / progress.width();//传入的pageX,表示鼠标相对于浏览器左边的距离
                                                                            //要减去进度条本身距浏览器左侧的距离
        if (percent > 100) {
            percent = 100;
        }
        if (percent < 0) {
            percent = 0;
        }
        $(".barlength").css('width', percent + "%");
        video[0].currentTime = video[0].duration * percent / 100;//更新当前视频时间
    }
 

    //静音按钮
    function volume(){
    	if(video[0].muted){
    		$('#volume').html('&#xe6b1;').attr('title', '静音');
				video[0].muted=false;
				$("#videoWrapper .soundbarlength").css('width', curVol * 100 + '%');
    	}else{
				$('#volume').html('&#xe690;').attr('title', '取消静音');
				curVol = video[0].volume;
				$("#videoWrapper .soundbarlength").css('width', 0);
				video[0].muted=true;
    	}	
    }

    //音量进度条
    function enableSoundDrag(){
    	var progressDrag=false;//定义变量，是否在拖拽进度条
    	$('#videoWrapper .soundbar').on('mousedown',function(e){
					progressDrag=true;//鼠标按下事件，表示要拖拽进度条，progressDrag值设为true；
					updateSoundbar(e.pageX);
					$('#volume').html('&#xe6b1;');
    			video[0].muted=false;
    	});
    	$(document).on('mouseup',function(e){//给document绑定，消除鼠标移到其他元素上时拖动失效
    		if(progressDrag){
    			progressDrag=false;//鼠标松开事件，表示不再拖动进度条，progressDrag值为false
    			updateSoundbar(e.pageX);
    		}
    	})
    	$(document).on('mousemove',function(e){
    		if(progressDrag){        //鼠标移动事件，判断是否在拖动进度条，为true,将鼠标位置传递给update函数
    			updateSoundbar(e.pageX);//为false,不执行进度条更新（不传递参数给update函数）
    		}
    	})
    }
       //进度条更新：
    function updateSoundbar(x,val) {
        var progress = $("#videoWrapper .soundbar");   
        var percent = 100 * (x - progress.offset().left) / progress.width();//传入的pageX,表示鼠标相对于浏览器左边的距离
        if(val){
        	percent = val * 100;
        }else{
        	if (percent > 100) {
            percent = 100;
        	}
	        if (percent < 0) {
	            percent = 0;
	        }
        }                                                                   //要减去进度条本身距浏览器左侧的距离
               
        $("#videoWrapper .soundbarlength").css('width', percent + "%");
        video[0].volume =  percent / 100;//更新当前视频音量
    }

    //视频结束后恢复
    video.on('ended',function(){
			$('#play').html('&#xe65c;');
			video[0].pause();
			$('.video-mask').css('display', 'flex');
    	// video[0].currentTime = 0;
    })

    //视频元数据加载完成后执行的事件：
   	video.on('loadedmetadata',function(){
	   	$('#play').click(playAndPause);
	    $('#stop').click(stopVideo);
	    $('#curtime').html(timeFormat(video[0].currentTime));
    	$('#fulltime').html(timeFormat(video[0].duration));
    	$('#volume').click(volume);
    	enableProgressDrag();
			enableSoundDrag();
			updateSoundbar(null,0.7);
  	}).on('canplay',function(){
  		$('.loading').fadeOut(500);
  	}).on('click',playAndPause);
		

		// 全屏
		var fullscreen = null;
		var cursorTimeout = null;
		var isplaying = false;
		$('#fullscreen').on('click', function(){
			if (fullscreen) {
				exitFullscreen();
				$('#fullscreen').html('&#xe656;').attr('title','全屏');
			} else {
				FullScreen();
				$('#fullscreen').html('&#xe64c;').attr('title','退出全屏');
				$('#videoWrapper').on('mousemove', function(){
					clearTimeout(cursorTimeout);
					$('#videoWrapper').css({
						cursor: 'default'
					})
					var isShown = false;
					if(parseInt($('.bottom').css('bottom')) > -62){
						isShown = true;
					}
					if(!isShown){
						$('#videoWrapper .title').stop().animate({
							'top':0
						},500);
						$('#videoWrapper .bottom').stop().animate({
							'bottom':0
						},500);
					}
					
					cursorTimeout =	setTimeout(function(){
						$('#videoWrapper').css({
							cursor: 'none'
						})
						$('#videoWrapper .title').stop().animate({
							'top':'-30px'
						},500);
						$('#videoWrapper .bottom').stop().animate({
							'bottom':'-62px'
						},500);
						isShown = false;
					},2000)
				})
				// 在控制区域取消自动隐藏相关事件
				$('#videoWrapper .bottom').on('mousemove', function(){
					clearTimeout(cursorTimeout);
					$('#videoWrapper').unbind('mousemove');
				}).on('mouseout', function(){
					$('#videoWrapper').on('mousemove', function(){
						clearTimeout(cursorTimeout);
						$('#videoWrapper').css({
							cursor: 'default'
						})
						var isShown = false;
						if(parseInt($('.bottom').css('bottom')) > -62){
							isShown = true;
						}
						if(!isShown){
							$('#videoWrapper .title').stop().animate({
								'top':0
							},500);
							$('#videoWrapper .bottom').stop().animate({
								'bottom':0
							},500);
						}
						
						cursorTimeout =	setTimeout(function(){
							$('#videoWrapper').css({
								cursor: 'none'
							})
							$('#videoWrapper .title').stop().animate({
								'top':'-30px'
							},500);
							$('#videoWrapper .bottom').stop().animate({
								'bottom':'-62px'
							},500);
							isShown = false;
						},2000)
					})
				})
			}
		})

		
		//进入全屏
		function FullScreen() {
			var vW = $('#videoWrapper').get(0);
			if (vW.requestFullscreen) {
				vW.requestFullscreen();
			} else if (vW.mozRequestFullScreen) {
				vW.mozRequestFullScreen();
			} else if (vW.webkitRequestFullScreen) {
				vW.webkitRequestFullScreen();
			} else if (vW.msRequestFullscreen) {
				vW.msRequestFullscreen();
			}
		}
		//退出全屏
		function exitFullscreen() {
			if(document.exitFullScreen) {
        	document.exitFullScreen();
			} else if(document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
			} else if(document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
			} else if(document.msExitFullscreen) {
				document.msExitFullscreen();
			}
		}
		$(document).on("fullscreenchange", function() {
			changeFullScreenStatus();
		});
		$(document).on('MSFullscreenChange', function(){
			changeFullScreenStatus();
		});
		function changeFullScreenStatus(){
			var fullscreenElement = document.fullscreenElement
					|| document.mozFullScreenElement
					|| document.webkitFullscreenElement
					|| document.msFullscreenElement;
			if (fullscreenElement) {
				fullscreen = true;
			} else {
				fullscreen = false;
				$('#fullscreen').html('&#xe656;').attr('title','全屏');
				if (!isplaying) {
					clearTimeout(cursorTimeout);
					$('#videoWrapper').unbind('mousemove').css({
						cursor: 'default'
					})
					$('#videoWrapper .bottom').unbind();
					$('#videoWrapper .title').stop().animate({
						'top':0
					},500);
					$('#videoWrapper .bottom').stop().animate({
						'bottom':0
					},500);
				}
			}
		}
		video.on('playing', function(){
			isplaying = true;
			$('#play').html('&#xe674;');
		})
		video.on('pause', function(){
			isplaying = false;
			clearTimeout(cursorTimeout);
			$('#videoWrapper').unbind('mousemove').css({
				cursor: 'default'
			})
			$('#videoWrapper .bottom').unbind();
			$('#videoWrapper .title').stop().animate({
				'top':0
			},500);
			$('#videoWrapper .bottom').stop().animate({
				'bottom':0
			},500);
		})

		// 重新播放
		$('.mask-button').on('click', function() {
			video[0].play();
			$('.video-mask').hide();
		})
	}
})()