$(document).foundation()
{
	var rdy = false;

	var H1scrollEnded = true;
	var V1scrollEnded = true;

	$('#fullpage').fullpage({
		//Navigation
		menu: '#menu',
		lockAnchors: false,
		anchors: ['anchor1', 'anchor2', 'anchor3' , 'anchor4'],
		navigation: false,
		navigationPosition: 'right',
		navigationTooltips: ['firstSlide', 'secondSlide'],
		showActiveTooltip: false,
		slidesNavigation: true,
		slidesNavPosition: 'bottom',

		//Scrolling
		css3: true,
		scrollingSpeed: 700,
		autoScrolling: true,
		fitToSection: true,
		fitToSectionDelay: 600,
		scrollBar: false,
		easing: 'easeInOutCubic',
		easingcss3: 'ease',
		loopBottom: false,
		loopTop: false,
		loopHorizontal: false,
		continuousVertical: false,
		continuousHorizontal: false,
		scrollHorizontally: false,
		interlockedSlides: false,
		resetSliders: false,
		fadingEffect: false,
		normalScrollElements: '#slide1',
		scrollOverflow: false,
		scrollOverflowOptions: null,
		touchSensitivity: 15,
		normalScrollElementTouchThreshold: 5,
		bigSectionsDestination: null,

		//Accessibility
		keyboardScrolling: true,
		animateAnchor: true,
		recordHistory: true,

		//Design
		controlArrows: true,
		verticalCentered: true,
		sectionsColor : false,
		paddingTop: '0em',
		paddingBottom: '0px',
		fixedElements: '#header, .footer',
		responsiveWidth: 0,
		responsiveHeight: 0,
		responsiveSlides: false,

		//Custom selectors
		sectionSelector: '.section',
		slideSelector: '.slide',

		//events
		onLeave: function(index, nextIndex, direction){
			V1scrollEnded = false;
			console.log("onLeave v scroll ended? "+V1scrollEnded);
			if (index==2 && direction =="down") {
				
				console.log("scroll down set to false onLeave "+index+" "+direction);
				
				$('#fullpage').fullpage.setAllowScrolling(false,'down');
				$('#fullpage').fullpage.setAllowScrolling(false,'up');
				
				setTimeout(function(){ 	            	
	            	V1scrollEnded = true;	      console.log("onLeave v scroll ended? "+V1scrollEnded);
	            }, 600);
			}
			
			if (index==4 && direction =="up"){
				
				console.log("scroll up set to false onLeave "+index+" "+direction);			
				
				$('#fullpage').fullpage.setAllowScrolling(false,'down');
				$('#fullpage').fullpage.setAllowScrolling(false,'up');
				
				setTimeout(function(){ 	            	
	            	V1scrollEnded = true;	     console.log("onLeave v scroll ended? "+V1scrollEnded);       				
	            }, 600);
			};
			
		},
		afterLoad: function(anchorLink, index){
			if(index == 4){
				$('#fullpage').fullpage.setAllowScrolling(true,'up');
			}
			else if (index == 2) {
				$('#fullpage').fullpage.setAllowScrolling(true,'down');
			};
		},
		afterRender: function(){},
		afterResize: function(){},
		afterResponsive: function(isResponsive){},
		afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
		onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){}
	});
/************************************************************ FullPage * END*/


/************************************************************ Long Scroll Limiter */
	var scrolls = 0;
	
	//$(window).scroll(function(e){
	//window.addEventListener('wheel', function(e) {
	//document.getElementById('fullpage').addEventListener('wheel', VScrollled);

	function VScrollled(e)
	{

		//console.log("FP scrolled");

		//$('#fullpage').fullpage.setAllowScrolling(false);
		
		//if ($('#fullpage').fullpage.autoScrolling && scrolls > 3) {
		if ( V1scrollEnded && H1scrollEnded ) {
             // cross-browser wheel delta
             e = window.event || e;
             var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
             e.wheelData

             console.log("FP scrolling");

             console.log("e.wheelDelta: " + e.wheelDelta);
             console.log("-e.detail: " + e.detail);

             V1scrollEnded = false;

            $('#fullpage').fullpage.setAllowScrolling(true);

            // if (H1scrollEnded) { //if theres any #
            var scrollable = $('.section.active').find('.scrollable');

                //scrolling down?
                if (delta < 0) {
                 	console.log("FullPage Scrolled down");
                    if (scrollable.length > 0) {
                         //is the scrollbar at the end of the scroll?
                        if (isScrolled('bottom', scrollable)){
                            $('#fullpage').fullpage.moveSlideDown();
                            
                            setTimeout(function(){ 	            	
	            				V1scrollEnded = true;	            				
	            			}, 600);

                        } else {
                             return true; //normal scroll
                        }
                    } else {
                        $('#fullpage').fullpage.moveSlideDown();
                        
                        setTimeout(function(){	            	
	            			H1scrollEnded = true;	            			
	            		}, 600);
                    };
                }

                //scrolling up?
                else {
                 	console.log("FullPage Scrolled Up");
                   // if (scrollable.length > 0) {
                         //is the scrollbar at the start of the scroll?
                        //if (isScrolled('top', scrollable)){
                            $('#fullpage').fullpage.moveSlideUp();
                            
                            setTimeout(function(){	            	
	            				H1scrollEnded = true;
	            			}, 600);

                        //} else {
                        //    return true; //normal scroll
                        //}
                    //} else {
                    //    $('#fullpage').fullpage.moveSlideUp();
                     //   setTimeout(function(){
                       // 	H1scrollEnded = true;
	            	//	}, 600);
                   // };
                };
             //}
             //scrolls = 0;

             return false;
         } /*else {
             scrolls++;
         };*/
	};
/************************************************************ Long Scroll Limiter * END */


/************************************************************ Horizoltal Scroll Slides */
	var scrollsH = 0;
	var slidesIndex=0;
	var lastslide = 2;
	
	document.getElementById('vweslides').addEventListener('wheel', SlidesScrollDirection);

	function SlidesScrollDirection(event)
	{
		/*clearTimeout($.data(this, 'timer'));

  		$.data(this, 'timer', setTimeout(function() {*/
						
						//do something
     		//console.log("Haven't scrolled in 250ms!");

     	if(H1scrollEnded && V1scrollEnded) {

   			var delta;
   			H1scrollEnded = false;

	        if (event.wheelDelta){
	            delta = event.wheelDelta;
	        }else{
	            delta = -1 * event.deltaY;
	        }

	        if (delta < 0){
	            SlidesScrollDown();
	            setTimeout(function(){ 
	            	
	            	H1scrollEnded = true;
	            	//console.log("timeout");

	            }, 600);
	        }else if (delta > 0){
	            SlidesScrollUp();
	            setTimeout(function(){ 
	            	
	            	H1scrollEnded = true;
	            	//console.log("timeout");

	            }, 600);
	        };

	        //scrollsH = 0;

	        //return false;	    
	    }
	    /*
	    else{
	    	scrollsH++;
	    	console.log("scrollsH = "+scrollsH);
	    }*/

	  	//}, 0));
		
    }

    function SlidesScrollDown()
    {
    	console.log("Slide Scrolled Left");
		if (slidesIndex != lastslide) {
			$('#vweslides').velocity({
				left: "-=33.28%"
			},{
				duration: 400
			});

			if (slidesIndex==0){
				$('#fullpage').fullpage.setAllowScrolling(false,'down');
				console.log("Vertical Down Disabled");
			}

			slidesIndex++;	
		}
		else{
			$('#fullpage').fullpage.setAllowScrolling(true,'down');
			console.log("Vertical Down Enabled");
			//$.fn.fullpage.moveSectionDown();
		}
	}
	
	function SlidesScrollUp()
    {
    	//console.log("Slide Scrolled Right");
			


    		
			
		if (slidesIndex != 0){	

			if (slidesIndex==lastslide){
				$('#fullpage').fullpage.setAllowScrolling(false,'up');
				console.log("Vertical Up Disabled");
			}

			$('#vweslides').velocity({
				left: "+=33.28%"
			},{
				duration: 400
			});

			

			slidesIndex--;		
		}
		else{
			$('#fullpage').fullpage.setAllowScrolling(true,'up');
			console.log("Vertical Up Enabled");
			//$.fn.fullpage.moveSectionUp();
		}
	}
	
/************************************************************ Horizoltal Scroll Slides * END */	

}











/* MENU OFFSCREEN  **********************************/
/****************************************************/
	document.getElementById("mySidenav").style.zIndex = "-10";
	/* Set the width of the side navigation to 250px and the left margin of the page content to 250px */
	function openNav() {
		/*document.getElementById("openSidenav").style.opacity = "0";
	    document.getElementById("mySidenav").style.width = "100%";
	    document.getElementById("fullpage").style.marginLeft = "100%";*/

	    $('#fullpage').css( 'pointer-events', 'none' );

	    $('#openSidenav').velocity({
    			opacity: 0
			},{
				duration: 200
		});
/*
	    $('#mySidenav')
	    .velocity({
	    		left: "100px"
	    	},{
	    		duration: 1
	    	}
	    )
*/
		document.getElementById("mySidenav").style.left = "49px";
		document.getElementById("mySidenav").style.zIndex = "1000";

	    setTimeout(function() {
		    $('#mySidenav').velocity({
    			opacity: 1
			},{
				duration: 600	
		    });
		}, 50);
	    
		/*
		$('#fullpage').velocity({
    			width: "100%"
			},{
				duration: 200
		});
		*/
		//$.fn.fullpage.setAllowScrolling(false);
		//$.fn.fullpage.setKeyboardScrolling(false);

	}

	/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
	function closeNav() {
		console.log("FullPage state: "+$('#fullpage').autoScrolling)

		document.getElementById("openSidenav").style.opacity = "1";
	    
		$('#mySidenav')
	    .velocity({
    			opacity: 0
			},{
				duration: 400
			}
		)
		.velocity({
	    		left: "100%"
	    	},{
	    		duration: 0,
	    		delay: 200
	    	}
	    );

	    document.getElementById("mySidenav").style.opacity = "0";
	    document.getElementById("mySidenav").style.zIndex = "-10";
	    
	    /*document.getElementById("fullpage").style.marginLeft = "0%";
		*/

		//$.fn.fullpage.setAllowScrolling(true);
		//$.fn.fullpage.setKeyboardScrolling(true);
		$('#fullpage').css( 'pointer-events', 'auto' );
	}

	$(".sidenavItem").each(function(){

		$(this).click(closeNav);
	});




	/************************************************************************* Click and LAYERS ***/
	/************************************************************************* and init positions */
	const marginleft = 33.28;
	$('.vweslideCenter').each(function(i, obj) {
		// init Positions
    	$(this).css('left',function(i) { 
    		console.log(i);
    		var x = $(this).css('left') + i*marginleft + "%";
    		return x; 
    	});
    	$(this).css('right',function(i) { 
    		var x = $(this).css('left') + i*marginleft + "%";
    		return x; 
    	});

    	// Open Layer
    	var clickparam={data:{t: i}};
    	$(this).click(clickparam,function(){
    		console.log("clicked slide "+clickparam.data.t);

    		// open
    		$('.layer').get(clickparam.data.t).style.opacity = 1;
    		$('.layercake').get(0).style.opacity = 1;
    		$('.layercake').css( 'pointer-events', 'auto' );

    		// close
    		$('.closelayer').click(function(){
    			$('.layer').get(clickparam.data.t).style.opacity = 0;
    			$('.layercake').get(0).style.opacity = 0;
    			$('.layercake').css( 'pointer-events', 'none' );
    		});
    	});    	

	});




	$('.veil').each(function(i, obj) {
    	$(this).css('left',function(i) { 
    		var x = $(this).css('left') + i*marginleft + "%";
    		return x; 
    	});
    	$(this).css('right',function(i) { 
    		var x = $(this).css('left') + i*marginleft + "%";
    		return x; 
    	});
	});
	$('.vweslideCaption').each(function(i, obj) {
    	$(this).css('left',function(i) { 
    		var x = $(this).css('left') + i*marginleft + "%";
    		return x; 
    	});
    	$(this).css('right',function(i) { 
    		var x = $(this).css('left') + i*marginleft + "%";
    		return x; 
    	});
	});
	$('.captionLight').each(function(i, obj) {
    	$(this).css('left',function(i) { 
    		var x = $(this).css('left') + i*marginleft + "%";
    		return x; 
    	});
    	$(this).css('right',function(i) { 
    		var x = $(this).css('left') + i*marginleft + "%";
    		return x; 
    	});
	});
	$('.captionDark').each(function(i, obj) {
    	$(this).css('left',function(i) { 
    		var x = $(this).css('left') + i*marginleft + "%";
    		return x; 
    	});
    	$(this).css('right',function(i) { 
    		var x = $(this).css('left') + i*marginleft + "%";
    		return x; 
    	});
	});



/************************************************************************* project slides hover*/

	$('.vweslideCenter').mouseenter(function(){
		console.log("hover on Armani")
		//document.getElementById("captionDark").style.zIndex = "100";
		$('.vweslideCenter').css('z-index', 1000);
		
		$('.vweslideCenter').velocity({
				'background-size': "80% auto",
				left: "18%",
				right: "18%"
			},{
				duration: 100,
				easing: "easeOutSine"
		});

		$('.captionLight').velocity({
				opacity: "1"
			},{
				duration: 400
		});

		$('.veil').velocity({
				opacity: "0"
			},{
				duration: 300
		});

	});
	$('.vweslideCenter').mouseleave(function(){
		console.log("hover out")
		//document.getElementById("captionDark").style.zIndex = "300";
		$('.vweslideCenter').css('z-index', 1);
		
		$('.vweslideCenter').velocity({
				'background-size': "60% auto",
				left: "21%",
				right: "21%"
			},{
				duration: 200,
				easing: "easeOutSine"
		});

		$('.captionLight').velocity({
				opacity: "0"
			},{
				duration: 300
		});
	
		$('.veil').velocity({
				opacity: "0.6"
			},{
				duration: 300
		});
	});