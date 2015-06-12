/**
 *
 *  @function
 *  @description:   Anonimous function autoexecutable
 *  @params jQuery $.- An jQuery object instance
 *  @params window window.- A Window object Instance
 *  @author: @_Chucho_
 *
 */(function(e,t,n){e(document).on("ready",function(n){e(".twitter_share_button").exists()&&e(".twitter_share_button").on("click",function(e){e.preventDefault();e.stopPropagation();_url="http://twitter.com/home?status=Mensaje para twitter http://anpasa.com";_options="sharer,toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=548, height=325, top=85, left=140";_window=t.open(_url,"_blank",_options);return!1});e(".facebook_share_button").exists()&&e(".facebook_share_button").on("click",function(e){e.preventDefault();e.stopPropagation();_url="http://www.facebook.com/sharer.php?s=100&p[title]=Anpasa en Facebook&p[summary]=Mensaje de anpasa para facebook.&p[url]=http://www.apnasa.com&&p[images][0]=http://cmvasfalto.com.mx/anpasa/css/img/logo.png,";_options="toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=548, height=325, top=85, left=140";_window=t.open(_url,"sharer,",_options);return!1})})})(jQuery,window);