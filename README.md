# myvideo
使用jQuery编写的简易播放器，支持浏览器支持的默认格式，支持标题、静音、自定义播放器大小、是否显示标题栏。
支持现代浏览器。


# DEMO: https://wangyb1026.github.io/myvideo/
	
	
	
	HTML文件：
	<section id="videoWrapper"></section>
	
	# 配置说明：
	实例化： new MyVideo({url, [showTitle, wrapper, name]});
	参数：
	url: 必须[String], 视频文件路径， 视频格式为mp4;
	showTitle： 显示标题栏 【可选，false】,默认css也为display:none；
	wrapper: 播放器大小【可选，Object {width[String],height[String]}；
	name: 视频标题【可选，String】；
