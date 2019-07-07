define(function(require, exports, module) {
    var Swiper = require('swiper');
    var Lazyload = require('echo.js');
    require("jquery.waypoints");
    require("customwebbundle/controller/default/howzhi.js").run();
    exports.run = function() {
        Lazyload.init();
        if($(".hz-themes").length>0){
             var bodyWidth = $("body").width();
             if(bodyWidth<768){
                 course_balance_init();
                 course_balance_resize();
             }
               var openCourse = new Swiper('#live-open-course', {
                roundLengths: true,
                loop: true,
                calculateHeight: true,
                 onSwiperCreated: function(swiper) {
                    $("#live-open-course .swiper-slide").removeClass('hide'); 
                 }
              })
           $('#live-open-course .swiper-button-prev').on('click', function(e){
                e.preventDefault()
                openCourse.swipePrev()
            })
            $('#live-open-course .swiper-button-next').on('click', function(e){
                e.preventDefault()
                openCourse.swipeNext()
            })

          var bottom_distance = ($(window).height()-$(".hz-index-bottom").height());
          $(".hz-index-bottom").waypoint(function(){
              $(this).addClass('act');
          },{offset:bottom_distance});
          $(".site-data").addClass("act");
          var swiper = new Swiper('.hz-poster .swiper-container', {
              pagination: '.swiper-pager',
              paginationClickable: true,
              autoplay: 5000,
              autoplayDisableOnInteraction: false,
              loop: true,
              calculateHeight: true,
              roundLengths: true,
              onSwiperCreated: function(swiper) {
                 $(".hz-poster .swiper-slide").removeClass('hide'); 
              }
          });
        　　$('.hz-poster .swiper-button-prev').on('click', function(e){
         　　 e.preventDefault()
         　　 swiper.swipePrev()
        　　})
          $('.hz-poster .swiper-button-next').on('click', function(e){
          　　　　e.preventDefault()
              swiper.swipeNext()
          });
          $("#course-recommed").on("click","li",function(){
             $self =$(this);
             $(this).addClass("btn-primary").siblings().removeClass("btn-primary")
             var number =$self.data("id");
             $coursecommend = $("#course-commend"+number);
             if($($coursecommend).length>0){
              $(".index-course-list >div.act").fadeOut(120,function(){
                  $(this).removeClass("act");
                  $coursecommend.fadeIn().addClass("act");
              });
              return;
             }
             else{
                $(".index-course-list").append('<div class="row clearfix" style="display:none" id="course-commend'+number+'"></div>');
                $.post("index/recommend/courses/post",{classId:number}, function(html){
                  $coursecommend = $("#course-commend"+number);
                  $coursecommend.html(html);
                  course_balance_init();
                  $(".index-course-list >div.act").fadeOut(120,function(){
                      $(this).removeClass("act");
                      $coursecommend.fadeIn().addClass("act");
                       Lazyload.init();
                  });
                });
             }
          }) 
          var dynamicsSwiper = new Swiper('#dynamic-swiper', {
              speed: 500,
              loop: true,
              mode: 'vertical',
              autoplay: 5000,
              calculateHeight: true
          });
        }
    };
    var course_balance_init = function(){
          if($("body").width()>=768){
             return;
          }
           var $courselistAct = $(".index-course-list .row.act");
           var imgHeight =$courselistAct.find(".two").height()-$courselistAct.find(".course-info").height()-25;
           $(".speical img").height(imgHeight);
    }
    var course_balance_resize = function(){
      var course_balance=null;
      $(window).on('resize',function(){
          if(course_balance){
               clearTimeout(course_balance)
          }
          course_balance =setTimeout(course_balance_init(),200);
      });
  }



})