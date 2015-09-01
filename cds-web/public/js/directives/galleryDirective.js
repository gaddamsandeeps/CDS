
 

define(['directives/directiveModule','jquery','gallery/jquery.galleriffic','gallery/jquery.history','gallery/jquery.opacityrollover'], function (directiveModule,$,galleriffic,history,opacityrollover) {
	directiveModule.directive('galleryDirective', ["cdsService",function(cdsService){	
	
		return {	
			restrict: "A",
			scope:{
				verticalScroll :'=' 
			},		
			link: function(scope, elem, attrs) {

			 // We only want these styles applied when javascript is enabled
        $('div.content').css('display', 'block');

        // Initially set opacity on thumbs and add
        // additional styling for hover effect on thumbs
        var onMouseOutOpacity = 0.67;
        $('#thumbs ul.thumbs li, div.navigation a.pageLink').opacityrollover({
          mouseOutOpacity:   onMouseOutOpacity,
          mouseOverOpacity:  1.0,
          fadeSpeed:         'fast',
          exemptionSelector: '.selected'
        });

        $(".navigation-container").css({"height" : "135px", overflow : "hidden"});
        
        // Initialize Advanced Galleriffic Gallery
        var gallery = $('#thumbs').galleriffic({
          delay:                     2500,
          numThumbs:                 8,
          preloadAhead:              10,
          enableTopPager:            false,
          enableBottomPager:         false,
          imageContainerSel:         '#slideshow',
          controlsContainerSel:      '#controls',
          captionContainerSel:       '#caption',
          loadingContainerSel:       '#loading',
          renderSSControls:          true,
          renderNavControls:         true,
          playLinkText:              'Play Slideshow',
          pauseLinkText:             'Pause Slideshow',
          prevLinkText:              '&lsaquo; Previous Photo',
          nextLinkText:              'Next Photo &rsaquo;',
          nextPageLinkText:          'Next &rsaquo;',
          prevPageLinkText:          '&lsaquo; Prev',
          enableHistory:             true,
          autoStart:                 false,
          syncTransitions:           true,
          defaultTransitionDuration: 900,
          onSlideChange:             function(prevIndex, nextIndex) {
            // 'this' refers to the gallery, which is an extension of $('#thumbs')
            this.find('ul.thumbs').children()
              .eq(prevIndex).fadeTo('fast', onMouseOutOpacity).end()
              .eq(nextIndex).fadeTo('fast', 1.0);

            // Update the photo index display
            this.$captionContainer.find('div.photo-index')
              .html('Photo '+ (nextIndex+1) +' of '+ this.data.length);
          },
          onPageTransitionOut:       function(callback) {
            this.fadeTo('fast', 0.0, callback);
          },
          onPageTransitionIn:        function() {
            var prevPageLink = this.find('a.prev').css('visibility', 'visible');
            var nextPageLink = this.find('a.next').css('visibility', 'visible');
            
            // Show appropriate next / prev page links
            if (this.displayedPage > 0)
              prevPageLink.css('visibility', 'visible');

            var lastPage = this.getNumPages() - 1;
            if (this.displayedPage < lastPage)
              nextPageLink.css('visibility', 'visible');

            this.fadeTo('fast', 1.0);
          }
        });

        /**************** Event handlers for custom next / prev page links **********************/

        gallery.find('a.prev').click(function(e) {
          gallery.previousPage();
          e.preventDefault();
        });

        gallery.find('a.next').click(function(e) {
          gallery.nextPage();
          e.preventDefault();
        });
    
        /****************************************************************************************/

        /**** Functions to support integration of galleriffic with the jquery.history plugin ****/
        jQuery.browser = {};
        (function () {
          jQuery.browser.msie = false;
          jQuery.browser.version = 0;
          if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
            jQuery.browser.msie = true;
            jQuery.browser.version = RegExp.$1;
          }
        })();

        // PageLoad function
        // This function is called when:
        // 1. after calling $.historyInit();
        // 2. after calling $.historyLoad();
        // 3. after pushing "Go Back" button of a browser
        function pageload(hash) {
          // alert("pageload: " + hash);
          // hash doesn't contain the first # character.
          if(hash) {
            $.galleriffic.gotoImage(hash);
          } else {
            gallery.gotoIndex(0);
          }
        }

        // Initialize history plugin.
        // The callback is called at once by present location.hash. 
        $.historyInit(pageload, "advanced.html");

        // set onlick event for buttons using the jQuery 1.3 live method
        $("a[rel='history']").on('click', function(e) {
          if (e.button != 0) return true;

          var hash = this.href;
          hash = hash.replace(/^.*#/, '');

          // moves to a new page. 
          // pageload is called at once. 
          // hash don't contain "#", "?"
          $.historyLoad(hash);

          return false;
        });





			}
		}		

    
	}]);
	
});

