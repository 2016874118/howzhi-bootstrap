define(function(require, exports, module) {
      var Cookie = require('cookie');
    exports.run = function() {
       //我的好知更名提示
        if(!Cookie.get("hz-head-update")){
           $(".new-tips").show();
        }
        $("#hz-head-update").click(function(){
             Cookie.set("hz-head-update",'true',{expires:360,path:"/"});
        })

        $(".search-type").on("click","ul li",function(){
          $(".choose").html($(this).text()+'<i class="hz-icon icon-keyboardarrowdown"></i>');
          $("input[name='type']").val($(this).data("type"));
          $(".search-type ul").hide();
        }).on("mouseenter",function(){
          $(this).find("ul").show();
        }).on("mouseleave",function(){
          $(this).find("ul").hide();
        })

          //通知私信等
        $(".user-msg").mouseenter(function(){
          $(".hzshow-box").hide();
          $(".user-msg .dropdown-menu").show();
        }).mouseleave(function(){
          $(".hzshow-box").show();
          $(".user-msg .dropdown-menu").hide();  
        })  
    };

})

