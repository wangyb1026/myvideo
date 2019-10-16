// 依赖jQuery, 需要先引入jQuery, 基于jQuery3.4.1构建, 兼容IE9+
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
	$('head').append('<link rel="stylesheet" href="myvideo/css/myvideo.css">');
	function MyVideo(obj) {
			this.obj = obj;
			this.init();
	}
	MyVideo.prototype.init = function(){
		try{
			$('#videoWrapper')
		}catch{
			throw new Error('no element')
		}
		  $('#videoWrapper').append('<div class="loading"><img src="data:image/gif;base64,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 SrWq1atYs2rdyrWr169gwxZJAAA7"></div><video src="" id="myvideo" class="myvideo" poster="">您的浏览器不支持播放HTML5视频</video><div class="title"></div><div class="bottom"><div class="processbar"><div class="bar"><span class="barlength" id="barlength"></span></div><div class="time"><span id="curtime">--:--</span>/<span id="fulltime">--:--</span></div></div><div class="control"><div class="control-play"><i class="iconfont" id="play" title="播放">&#xe65c;</i><i class="iconfont" id="stop" title="停止">&#xe602;</i></div><div class="control-volume"><i class="iconfont fullscreen" id="fullscreen" title="全屏">&#xe656;</i><i class="iconfont" id="volume" title="静音">&#xe6b1;</i><div class="soundbar"><span class="soundbarlength"></span></div></div></div></div>');
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
    		$('#play').html('&#xe65c;').attr('title', '播放');
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
    	video[0].currentTime = 0;
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
	}
})()