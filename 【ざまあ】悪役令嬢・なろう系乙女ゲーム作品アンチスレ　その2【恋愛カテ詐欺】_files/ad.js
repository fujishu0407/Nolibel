var __getIframeURL = function(){
  var url = '//stab.thench.net/threads/';
  if(window.location.href.split("/")[5] == "mnewsplus") url += 'mnewsplus/';
  return url;
}
var cssId = 'myCss';
if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '//penguin.5ch.net/css/ad.css';
    link.media = 'all';
    head.appendChild(link);
}
(function() {
    var Ad, initilizeForPC, initilizeForSmartPhone;
    Ad = (function() {
        function Ad() {}
        Ad.prototype.isPC = function() {
            var ua;
            ua = navigator.userAgent;
            return ua.indexOf('iPhone') === -1 && ua.indexOf('iPod') === -1 && ua.indexOf('iPad') === -1 && ua.indexOf('Android') === -1;
        };
        Ad.prototype.addRightSideTag = function() {
            var tag;
            tag = "<div class='ad--right'> <div class='js--ad--right--top'> <iframe src='" + __getIframeURL() +"rightside_top_160x600' frameborder='0' scrolling='no' width='160' height='600'></iframe> </div> <div class='js--ad--right--bottom'> <iframe src='" + __getIframeURL() +"rightside_bottom_160x600' frameborder='0' scrolling='no' width='160' height='600'></iframe> </div> </div>";
            return $(document.body).append(tag);
        };
        Ad.prototype.onScrollRightSideTag = function() {
            return $(window).scroll(function() {
                var classes, top_ad_position;
                top_ad_position = $(".js--ad--right--top").height() + $(".ad--right").offset().top - $(".search-header").height() - 7;
                classes = $(window).scrollTop() >= top_ad_position ? "js--ad--right--bottom ad--right__fixed" : "js--ad--right--bottom";
                return $(".js--ad--right--bottom").removeClass().addClass(classes);
            });
        };
        Ad.prototype.addBottomTagForSmartPhone = function() {
            tag = "<iframe src='" + __getIframeURL() +"smartphone_320x50' frameborder='0' scrolling='no' style='width: 100%;height: 90px;position: fixed;bottom: 0;left: auto;right: auto;'></iframe>";
            return $(document.body).append(tag);
        };
        Ad.prototype.addBRsOnBottom = function() {
            return $(document.body).append('<br /><br /><br /><br /><br />');
        };
        Ad.prototype.newLeft = function() {
            var tag;
            tag = "<iframe src='" + __getIframeURL() +"thread_top_left_300x250' frameborder='0' scrolling='no' width='300' height='250'></iframe>";
            return $('#bannerLeft').append(tag);
        };
        Ad.prototype.newRight = function() {
            var tag;
            tag = "<iframe src='" + __getIframeURL() +"thread_top_right_300x250' frameborder='0' scrolling='no' width='300' height='250'></iframe>";
            return $('#bannerRight').append(tag);
        };
        Ad.prototype.addBottomTag = function() {
            var tag;
            tag = "<div class='ad--bottom'> <div class='ad--bottom--block'> <iframe src='" + __getIframeURL() +"thread_bottom_left_300x250' frameborder='0' scrolling='no' width='300' height='250'></iframe> </div> <div class='ad--bottom--block'> <iframe src='" + __getIframeURL() +"thread_bottom_right_300x250' frameborder='0' scrolling='no' width='300' height='250'></iframe> </div> </div>";
            return $(tag).insertAfter($('.thread'));
        };
        Ad.prototype.addBottomOfCommentFormTagsNewAd = function() {
            var tag;
            tag = "<div class='ad--bottom'> <div class='ad--bottom--block'> <iframe src='" + __getIframeURL() +"bottom_of_comment_form' frameborder='0' scrolling='no' width='728' height='200'></iframe></div></div>";
            $(tag).insertBefore($('.footer'));
        };
        Ad.prototype.addBottomOfCommentFormTags = function() {
            var tag;
            tag = "<div class='ad--bottom'> <div class='ad--bottom--block'> <iframe src='" + __getIframeURL() +"thread_footer_left_300x250' frameborder='0' scrolling='no' width='300' height='250'></iframe> </div> <div class='ad--bottom--block'> <iframe src='" + __getIframeURL() +"thread_footer_right_300x250' frameborder='0' scrolling='no' width='300' height='250'></iframe> </div> </div>";
            $(tag).insertBefore($('.footer'));
        };
        Ad.prototype.addFirstBanner = function() {
            var tag;
            tag = "<iframe src='" + __getIframeURL() +"smartphone_thread_top_300x250' frameborder='0' scrolling='no' width='300' height='250'></iframe>";
            return $('#banner').empty().append(tag);
        };
        Ad.prototype.addOverlayTag = function() {
            var tag;
            var bg_svg = 'background-image: url("data:image/svg+xml;base64,';
            bg_svg += 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pbllNaWQiPgogICAgPHRpdGxlPmljb25fY2xlYXI8L3RpdGxlPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25';
            bg_svg += 'lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9IkFydGJvYXJkIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTAyNS4wMDAwMDAsIC02NzIuMDAwMDAwKSIgZmlsbD0iI0ZGRkZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPGcgaWQ9Ikdyb3VwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDI1LjAwMDAwMCwgNjcyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBvbHlnb24gaWQ9Iu6ijSIgcG9pbnR';
            bg_svg += 'zPSIxMS43MTIgMTMuMDU2IDEyLjY1NiAxMi4xMTIgOC45NDQgOC40IDEyLjY1NiA0LjY4OCAxMS43MTIgMy43NDQgOCA3LjQ1NiA0LjI4OCAzLjc0NCAzLjM0NCA0LjY4OCA3LjA1NiA4LjQgMy4zNDQgMTIuMTEyIDQuMjg4IDEzLjA1NiA4IDkuMzQ0Ij48L3BvbHlnb24+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==");';
            tag  = "<div style='position: fixed;bottom: 0;left: 0;right: 0;margin: auto;height: 106px;margin-right: 215px;'>";
            tag += " <div style='position: absolute;bottom: 0;left: 0;right: 0;margin: 0 auto;width: 768px;height: 106px;padding: 8px 32px 8px 8px;background: rgba(000, 000, 000, 0.2);'>";
            tag += "  <div style='position: absolute;top: 8px;right: 8px;width: 16px;height: 16px;text-align: center;cursor: pointer;" + bg_svg + "' onClick='(function(e){var p = e.parentNode.parentNode; p.parentNode.removeChild(p);return false;})(this);return false;'>";
            tag += "  </div>";
            tag += " <iframe src='" + __getIframeURL() +"thread_overlay_728x90' frameborder='0' scrolling='no' width='728' height='90'></iframe>"
            tag += " </div>";
            tag += "</div>";
            $('.container.container_body').append(tag);
        };
        Ad.prototype.ADddTagsOnThread = function(type){
            let makeTag = function(t, count){
              let tag = '';
              let banner_count = count - 1;

              if(t == 'SP') {
                tag += '<div>';
                tag += "<iframe src='" + __getIframeURL() +"smartphone_interval_300x250?number=" + count + "' frameborder='0' scrolling='no' width='300' height='250' style='width: 100%;'></iframe>";
                tag += '</div>';
                return tag;
            }
              tag += '<div>';
              tag += '<div id="horizontalbanners' + banner_count + '" style="margin: 5px;">';
              tag += '<div class="push"></div>';

              tag += '<div id="adbannerleft' + banner_count + '" style="float:left; margin-right:10px;">';
              tag += "<iframe src='" + __getIframeURL() +"interval/" + count + "_left_300x250' frameborder='0' scrolling='no' width='300' height='250'></iframe>";
              tag += '</div>';
              tag += '<div id="adbannerright' + banner_count + '" style="float:left;">';
              tag += "<iframe src='" + __getIframeURL() +"interval/" + count + "_right_300x250' frameborder='0' scrolling='no' width='300' height='250'></iframe>";
              tag += '</div>';

              tag += '<div class="push" style="clear:both;"></div>';
              tag += '</div>';
              tag += '<div class="push" style="clear:both;"></div>';
              tag += '</div>';
              return tag;
            }

            switch (type) {
              case 'PC':
                interval = 100;
                break;
              case 'SP':
                interval = 10;
                break;
            }
            $('.post').each(function(i, post){
              let id = post.id - 0;
              if((id % interval) != 0) return true;
              if(id == 1000) return true;
              $(post).next().after(makeTag(type, id));
            });
        }
        return Ad;
    })();
    initilizeForPC = function(ad) {
        ad.newLeft();
        ad.newRight();
        ad.addRightSideTag();
        ad.addBottomTag();
        ad.addBottomOfCommentFormTagsNewAd();
        ad.addBottomOfCommentFormTags();
        ad.onScrollRightSideTag();
        ad.addOverlayTag();
        ad.ADddTagsOnThread('PC');
    };
    initilizeForSmartPhone = function(ad) {
        ad.addFirstBanner();
        ad.addBottomTagForSmartPhone();
        ad.addBRsOnBottom();
        ad.ADddTagsOnThread('SP');
    };
    $(function() {
        var ad;
        ad = new Ad;
        if (ad.isPC()) {
            return initilizeForPC(ad);
        } else {
            return initilizeForSmartPhone(ad);
        }
    });
}).call(this);


