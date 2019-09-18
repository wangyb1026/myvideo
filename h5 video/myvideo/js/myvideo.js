(function(){
	$('head').append('<link rel="stylesheet" href="myvideo/css/myvideo.css">');
$(function(){
	$('#videoWrapper').append('<div class="loading"><img src="myvideo/img/loading.gif"></div><video src="" id="myvideo" class="myvideo" poster="">您的浏览器不支持播放HTML5视频</video><div class="title"></div><div class="bottom"><div class="processbar"><div class="bar"><span class="barlength" id="barlength"></span></div><div class="time"><span id="curtime">--:--</span>/<span id="fulltime">--:--</span></div></div><div class="control"><div class="control-play"><i class="iconfont" id="play" title="播放">&#xe65c;</i><i class="iconfont" id="stop" title="停止">&#xe602;</i></div><div class="control-volume"><i class="iconfont fullscreen" id="fullscreen" title="全屏">&#xe656;</i><i class="iconfont" id="volume" title="静音">&#xe6b1;</i><div class="soundbar"><span class="soundbarlength"></span></div></div></div></div>');
	function MyVideo(obj) {
			this.obj = obj;
			this.init();
	}
	MyVideo.prototype.init = function(){
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
	}
	window.MyVideo = MyVideo;
	// 视频初始化样式配置
	/*
	* 配置说明：
	* 实例化： new MyVideo();
	* 参数：
	* url: 必须[String], 视频文件路径， 视频格式为mp4;
	* showTitle： 显示标题栏 【可选，false】,默认css也为display:none；
	* wrapper: 播放器大小【可选，800 x 600】, wrapper属性： width[String],height[String]；
	* name: 视频标题【可选，String】；
	*/
	
	

	var curVol = null;
	var video=$('#myvideo');

    //定义时间格式：
    function timeFormat(i){
        var minute=Math.floor(i / 60);
        if(minute<10){
        	minute='0'+minute;
        }
        var second=Math.floor(i % 60);
        if(second<10){
        	second='0'+second;
        }
        return minute+':'+second;
    }



	//点击播放按钮播放，暂停按钮暂停；停止按钮停止。
    function playAndPause(){
    	if(video[0].paused || video[0].ended){
    		video[0].play();
				$('#play').html('&#xe674;');
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
						// isShown = true;
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
    	}else{
        video[0].pause();
    		$('#play').html('&#xe65c;');
    	}
    } ;             
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
    		$('#volume').html('&#xe6b1;').attr('title', '取消静音');
				video[0].muted=false;
				$(".soundbarlength").css('width', curVol * 100 + '%');
    	}else{
				$('#volume').html('&#xe690;').attr('title', '静音');
				curVol = video[0].volume;
				$(".soundbarlength").css('width', 0);
				video[0].muted=true;
    	}	
    }

    //音量进度条
    function enableSoundDrag(){
    	var progressDrag=false;//定义变量，是否在拖拽进度条
    	$('.soundbar').on('mousedown',function(e){
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
    	video[0].currentTime=0;
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
		document.addEventListener("fullscreenchange", function() {
			changeFullScreenStatus();
		});
		document.addEventListener('MSFullscreenChange', function(){
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
		video[0].addEventListener('playing', function(){
			isplaying = true;
			$('#play').html('&#xe674;');
		})
		video[0].addEventListener('pause', function(){
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
})
})()