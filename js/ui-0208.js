'use strict';
// if ('scrollRestoration' in history) {
//     history.scrollRestoration = 'manual';
// }
gsap.registerPlugin(ScrollTrigger);
// ScrollTrigger.normalizeScroll(true)
window.onload = function () {
    $('body').imagesLoaded().done(function (instance) {
        $('body').addClass('load')
        headerScroll()
        $('.main-navigation .menu').on('click',function(){
            $(this).find('.navTrigger').toggleClass('active')
            $('#header').toggleClass('m-menu')
        })
    });
}
var locoScroll = '';
function smoothScroll(){
    locoScroll = new LocomotiveScroll({
        el: document.querySelector(".contents-wrap"),
        smooth: true,
        lerp: 0.055,
        duration: 1.2,
        autoResize: true,
        touchMultiplier: 5,
        smartphone: {
            smooth: true,
            breakpoint: 0,
            lerp: 0,
        },
        
    });
    locoScroll.on('.contents-wrap', ScrollTrigger.update)
    ScrollTrigger.scrollerProxy(".contents-wrap", {
        scrollTop(value) {
          return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector(".contents-wrap").style.transform ? "transform" : "fixed"
    });
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
    
}

function delay(n) {
    n = n || 2000
    // Keep official documentation wording, done -> resolve
    // and make it more concise
    return new Promise(resolve => {
      setTimeout(resolve, n)
    })
  }

const screenNum = '';
const mainNavigation = document.querySelector('.main-navigation')

// Function to add and remove the page transition screen
function pageTransitionIn(pageName) {
    $('body').addClass('fixed')
    $('.main-navigation').addClass('active')
    
    const container = document.querySelector('.contents')
    const screenNum = document.querySelector('.loading-screen.' + pageName)
    navClose()
    return gsap
    .timeline({ delay: 0})
    .add('start')
    .to(container, {duration: 1, translateY: '-100vh',ease:"power1.in"}, 'start')
    .to(screenNum, {delay:0.2, duration:0.6, scaleY: 1, transformOrigin: 'bottom left',opacity: 1,y: '-100vh',ease:"power1.in", height:'100vh'}, 'start')
}
// Function to add and remove the page transition screen
function pageTransitionOut(container, pageName) {
    const screenNum = document.querySelector('.loading-screen.' + pageName)
    
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline({ delay: 0}) // More readable to put it here
    .add('start') // Use a label to sync screen and content animation
    .call(contentReset, [container])
    .set(container.querySelector('.contents'), {
        duration: 0,
        translateY: '80vh',
      })
    .to(screenNum, {
      duration:0.6,
      y: '-200vh',
      skewX: 0,
      transformOrigin: 'top left',
      ease:"power1.out",
    }, 'start')
    .to(container.querySelector('.contents'), {
      duration:0.6,
      translateY: '0%',
      opacity: 1,
      ease: "power1.out",
    }, 'start')
    .to(screenNum, {
        duration: 0,
        y: '0',
        transformOrigin: 'top left',
        onComplete:function(){
            $('.main-navigation').removeClass('active')
        }
        })
    .call(contentAnimation, [container])
}

// Function to animate the content of each page

function contentReset(container) {
    let triggers = ScrollTrigger.getAll();
        triggers.forEach( trigger => {
        trigger.kill();
    });
}
function contentAnimation(container) {
    // headerScroll()
    // $('.main-navigation').removeClass('nav-hide')
    init()
}

$(function() {
    barba.init({
        transitions: [
            {
                async leave(data) {
                    console.log('asdasd')
                },
                async enter(data) {
                    $('.main-navigation li').removeClass('active')
                },
              },
        //     {
        //     name: 'index',
        //     to: { namespace: ['index'] },
        //     async leave(data) {
        //         const pageName = data.next.namespace
        //         await pageTransitionIn(pageName)
        //         data.current.container.remove()
        //         $('html,body').animate({
        //             scrollTop:0
        //         },300)
        //         setTimeout(() => {
                   
        //         }, 400);
        //     },
        //     async enter(data) {
        //         $('#wrapper').removeClass('work-secton')
        //         $('#wrapper').removeClass('about-secton')
        //         $('#wrapper').removeClass('contact-secton')
        //         $('#wrapper').addClass('index-secton')
        //         window.initMain();
        //         const pageName = data.next.namespace
        //         await pageTransitionOut(data.next.container, pageName)
        //         headerScroll()
        //         commonTween()
                
        //     },
        //     async once(data) {
        //         $('#wrapper').addClass('index-secton')
        //         commonTween()
        //     }
        //   }, 
        {
            name: 'index',
            to: { namespace: ['index'] },
            async leave(data) {
                const  pageName = data.next.namespace
                await pageTransitionIn(pageName)
                data.current.container.remove()
            },
            async enter(data) {
                $('.main-navigation li').removeClass('active')
                $('.main-navigation li').eq(0).addClass('active')
                $('#wrapper').removeClass('about-secton')
                $('#wrapper').removeClass('contact-secton')
                $('#wrapper').addClass('index-secton')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                await smoothScroll()
                await headerScroll()
                await commonTween()
                await videoAutoPlay()
                await datagrid()
                // window.removeMain();
            },
            async afterEnter(data) {
                
            },
            async once(data) {
                $('.main-navigation li').eq(0).addClass('active')
                $('#wrapper').addClass('index-secton')
                await smoothScroll()
                await videoAutoPlay()
                await commonTween()
                await datagrid()
            }
          }, {
            name: 'detail',
            to: { namespace: ['detail'] },
            async leave(data) {
                const  pageName = data.next.namespace
                await pageTransitionIn(pageName)
                data.current.container.remove()
            },
            async enter(data) {
                $('.main-navigation li').removeClass('active')
                $('.main-navigation li').eq(0).addClass('active')
                $('#wrapper').removeClass('about-secton')
                $('#wrapper').removeClass('contact-secton')
                $('#wrapper').addClass('index-secton')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                await smoothScroll()
                await headerScroll()
                await commonTween()
                // await videoAutoPlay()
                await work()
            },
            async afterEnter(data) {
                
                
            },
            async once(data) {
                $('.main-navigation li').eq(0).addClass('active')
                $('#wrapper').addClass('index-secton')
                await smoothScroll()
                // await videoAutoPlay()
                await commonTween()
                await work()
            }
          }
          , {
            name: 'about',
            to: { namespace: ['about'] },
            async leave(data) {
                const  pageName = data.next.namespace
                await pageTransitionIn(pageName)
                data.current.container.remove()
                
            },
            async enter(data) {
                $('.main-navigation li').removeClass('active')
                $('.main-navigation li').eq(1).addClass('active')
                $('#wrapper').removeClass('index-secton')
                $('#wrapper').removeClass('contact-secton')
                $('#wrapper').addClass('about-secton')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                await smoothScroll()
                await headerScroll()
                await commonTween()
            },
            async once(data) {
                $('.main-navigation li').eq(1).addClass('active')
                $('#wrapper').addClass('about-secton')
                await smoothScroll()
                await headerScroll()
                await commonTween()
            }
          }
          , {
            name: 'contact',
            to: { namespace: ['contact'] },
            async leave(data) {
                const  pageName = data.next.namespace
                await pageTransitionIn(pageName)
                data.current.container.remove()
                
            },
            async enter(data) {
                $('.main-navigation li').removeClass('active')
                $('.main-navigation li').eq(2).addClass('active')
                $('#wrapper').removeClass('index-secton')
                $('#wrapper').removeClass('about-secton')
                $('#wrapper').addClass('contact-secton')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                await smoothScroll()
                await headerScroll()
                await commonTween()
                var swiper = new Swiper(".contact-slider", {
                    spaceBetween:20,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      },
                    pagination: {
                      el: ".swiper-pagination",
                      type: "fraction",
                    },
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false,
                      },
                  });
            },
            async once(data) {
                $('.main-navigation li').removeClass('active')
                $('.main-navigation li').eq(2).addClass('active')
                $('#wrapper').addClass('contact-secton')
                await smoothScroll()
                await commonTween()
                var swiper = new Swiper(".contact-slider", {
                    spaceBetween:20,
                    loop: true,
                    navigation: {
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      },
                    pagination: {
                      el: ".swiper-pagination",
                      type: "fraction",
                    },
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false,
                      },
                  });
            }
          }
          
        ],
      });
});

function navClose(){
    $('#header').removeClass('m-menu')
    $('.navTrigger').removeClass('active')
}

function datagrid(){
    $('.work-list.all-item .grid-item').each(function(){
        const moreNum = $(this).find('.more a').length
        if(moreNum == 1){
            $(this).find('.select').show();
        }
        const itemNum = $(this).find('.slider').length
        if(itemNum == 0){
            $(this).addClass('disabled')
            $(this).find('.open').hide();
        }
    })
    var $grid = $('.work-list.all-item').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        transitionDuration: 0,
        
    });
    const projectNum = $('.work-list.selected .thumb').length;
    const allNum = $('.work-list.all-item .grid-item').length;
    $('.project-type li.selected').find('span').text(projectNum)
    $('.project-type li.all').find('span').text(allNum)
    var $grid = $('.work-list.all-item').isotope({
        itemSelector: '.grid-item'
    });
        
    var filterFns = {};
    $('.filters-button-group').on( 'click', 'button', function(event) {
        // contentReset()
        var $target = $( event.currentTarget );
        if($target.hasClass('is-checked')){
            return false;
        }
        $target.toggleClass('is-checked');
        var filterValue = $( this ).attr('data-filter');
        filterValue = filterFns[ filterValue ] || filterValue;
        $grid.isotope({ filter: filterValue });
        $grid.on('arrangeComplete', function() {
            console.log( 'Isotope arrange completed on ')
            
          });
        setTimeout(() => {
            ScrollTrigger.refresh()
        },0);
        
      });
    $('.filters-button-group ').each( function( i, buttonGroup ) {
        var $buttonGroup = $( buttonGroup );
        $buttonGroup.on( 'click', 'button', function() {
          $buttonGroup.find('.is-checked').removeClass('is-checked');
          $( this ).addClass('is-checked');
        });
      });
    $('.filter-block .title').on( 'click', 'button', function() {
        $('.button-group button').removeClass('is-checked')
        $grid.isotope({ filter: '*' });
        // ScrollTrigger.refresh()
    })


    $('.grid-item .line .title').on('click',function(){
        $(this).parents('.grid-item').siblings().find('.line').removeClass('active')
        $(this).parents('.line').toggleClass('active')
        

        if($(this).parents('.line').hasClass('active')) {
            if($(this).parents('.line').data('swiper')) {
                $(this).parents('.line').data('swiper').destroy();
                $(this).parents('.line').data('swiper', null);
            }
            var swiper = slider($(this).parents('.line').find('.work-slider')[0]);
            $(this).parents('.line').data('swiper', swiper);
        } else {
            if($(this).parents('.line').data('swiper')) {
                $(this).parents('.line').data('swiper').destroy();
                $(this).parents('.line').data('swiper', null);
            }
        }

        // swiper.destroy()
        // slider()
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 400);
        
    })
}
function headerScroll() {
    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () { // 모바일 작동
            gsap.to($('#header'), {
                scrollTrigger: {
                    trigger:'.contents-wrap',
                  start: "100px 200px",
                  end: "100px 0%",
                //   scrub: true,
                //  markers: true,
                  scroller: ".contents-wrap",
                  toggleActions: "play none none none",
                  onEnter: () => $(mainNavigation).removeClass('nav-hide').addClass('nav-default'),
                  onEnterBack: () => $(mainNavigation).removeClass('nav-hide').addClass('nav-default'),
                  onLeave: () => $(mainNavigation).addClass('nav-hide').removeClass('nav-default'),
                  onLeaveBack: () => $(mainNavigation).addClass('nav-hide').removeClass('nav-default'),
                }
              });
            //   gsap.to($('#header'), {
            //     scrollTrigger: {
            //       trigger:'.contents-wrap',
            //       start: "95% 100%",
            //       end: "95% 0%",
            //     //   scrub: true,
            //     //  markers: true,
            //       scroller: ".contents-wrap",
            //       toggleActions: "play none none none",
            //       onEnter: () => $(mainNavigation).removeClass('nav-hide').addClass('nav-default'),
            //       onEnterBack: () => $(mainNavigation).removeClass('nav-hide').addClass('nav-default'),
            //       onLeave: () => $(mainNavigation).addClass('nav-hide').removeClass('nav-default'),
            //       onLeaveBack: () => $(mainNavigation).addClass('nav-hide').removeClass('nav-default'),
            //     }
            //   });
            $('#header .main-navigation').on('mouseover',function(){
                if($('#header .main-navigation').hasClass('nav-hide')){
                    gsap.to($('#header .bg'), {
                        duration:0.4,
                        height:'100%',
                        onStart:function(){
                            $('#header').addClass('over')
                            $('#header .main-navigation').removeClass('nav-hide')
                        }
                    })
                }
            })
            $('#header').on('mouseleave',function(){
                if($('#header').hasClass('over')){
                    $('#header .main-navigation').addClass('nav-hide')
                }
                gsap.to($('#header .bg'), {
                    delay:0.4,
                    duration:0.4,
                    height:'0%',
                    onComplete:function(){
                        setTimeout(() => {
                            $('#header').removeClass('over')
                        },0)
                    },
                })
                
            })
        },
        "(max-width:768px)": function () { // pc 작동
            
        },
    })
    
}


function videoAutoPlay(){
    setTimeout(() => {
        const videos = gsap.utils.toArray('.work-list video')
        videos.forEach(function(video, i) {
            ScrollTrigger.create({
                trigger: video,
                scroller: '',
                start: '0 100%',
                end: '100% 0%',
                scroller: ".contents-wrap",
                // markers: true,
                onEnter: () => video.play(),  
                onEnterBack: () => video.play(),
                onLeave: () => video.pause(),
                onLeaveBack: () => video.pause(),
            });
        })
        
    }, 500);
        
  }

function slider(el){
    return new Swiper(el, {
            // init: false,
            slideToClickedSlide:true,
            slidesPerView: "auto",
            // autoHeight: true,
            slideWidth:'auto',
            spaceBetween:0,
            loop: true,
            // observer : true,
            // observeParents : true,
            pagination: {
              el: $(el).find(".swiper-pagination")[0],
              type: "fraction",
              clickable: true,
              type: 'custom',
              renderCustom: function (swiper, current, total) {
                    return current + ' / ' + (total); 
                }
            },
            navigation: {
              nextEl: $(el).find(".swiper-button-next")[0],
              prevEl: $(el).find(".swiper-button-prev")[0],
            },
            on: {
                afterInit:function(){
                    setTimeout(() => {
                        $('.work-type .type').each(function(){
                            const name = $(this).parents('.swiper').find('.swiper-slide.swiper-slide-active > *').prop('tagName')
                            if(name == 'IMG'){
                                $(this).text('image')
                            }else if(name == 'VIDEO'){
                                $(this).text('video')
                                
                            }
                        })
                    }, 500);
                    
                },
                slideChangeTransitionEnd : function() {
                    $('.work-type .type').each(function(){
                        const name = $(this).parents('.swiper').find('.swiper-slide.swiper-slide-active > *').prop('tagName')
                        if(name == 'IMG'){
                            $(this).text('image')
                        }else if(name == 'VIDEO'){
                            $(this).text('video')
                        }
                    })
                },
            },
    });
}

function init() {
   
    $('.project-type li.selected a').on('click',function(){
        locoScroll.scrollTo("top")
        ScrollTrigger.refresh();
    })
    $('.project-type li.all a').on('click',function(){
        locoScroll.scrollTo(document.querySelector('.project-type.bottom'))
        ScrollTrigger.refresh();
    })
    
    $('.work-info button').on('click',function(){
        // $(this).hide()
        // $('.work-info').addClass('active');
        $('.work-info').toggleClass('active');
        ScrollTrigger.refresh();
    })
   
    $('.grid-item').each(function(){
        // const itemName = $(this).find('.thumb .title').text()
        // const itemCate = $(this).find('.thumb .cate').text()
        // $(this).find('.line .title dt').text(itemName)
        // $(this).find('.line .title dd').text(itemCate)
    })
    
    
    
    setTimeout(() => {
        $('body').removeClass('fixed')
    }, 0);
    
    $('.filter-block .title button').on('click',function(){
        $(this).toggleClass('active')
        $(this).parents('.title').next().toggleClass('active')
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
    })  
   
}


function commonTween() {
    $(function () {
        var classes = document.getElementsByClassName('shuffleText1');
        for (var i = 0; i < classes.length; i++) {
            var shuffleText = new ShuffleText(classes[i], false, false, 8, 50, 0, i);
            $(classes[i]).data('shuffleText1', shuffleText);
        }
    });
    $('.work-list.selected').find('.grid-item').not(":eq(0)").not(":eq(0)").each(function (e) {
        let text = $(this).find('.thumb dt a')
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "90% 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "90% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                scroller: ".contents-wrap",
                invalidateOnRefresh: true,
                toggleActions: "play complete none reverse",
            },
        });
        upmotion.to(text,1, {
            y:'10%',
            ease: "none",
        })

    })
    // $('.slide-down').each(function (e) {
    //     let text = $(this)
    //     const upmotion = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: $(this),
    //             start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
    //             end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
    //             //                scrub: true, //스크롤에 반응 (없으면 자동재생)
    //             //                markers: true,
    //             toggleActions: "play complete none none",
    //         },
    //     });
    //     upmotion.from(text, 1, {
    //         y: -50,
    //         opacity: 0,
    //         //            ease: "power3.out",
    //         onComplete: function () {

    //         }
    //     })

    // })
    // $('.slide-up, .about-con > *').each(function (e) {
    //     // let text = $(this).wrapInner('<div class="over-text-con"></div>')
    //     // let target = text.find('.over-text-con')
    //     gsap.set($(this), {
    //         y:40,
    //         opacity: 0,
    //     })
    //     const upmotion = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: $(this),
    //             start: "top 80%", // 앞 : 객체 , 뒤 : 페이지 전체
    //             end: "top 0%", // 앞 : 객체 , 뒤 : 페이지 전체
    //             //scrub: true, //스크롤에 반응 (없으면 자동재생)
    //             // markers: true,
    //             toggleActions: "play none none reverse",
    //         },
    //     });
    //     upmotion.to($(this), 1, {
    //         y:0,
    //         opacity: 1,
    //         ease: "power1.out",
    //     })

    // })
    
    
    // $('.over-text-wrap').each(function (e) {
    //     $(this).find(' > *').addClass('over-text').wrapInner('<span class="over-text-con"></span>')
    //     let text = $(this).find('.over-text-con')
    //     const textmotion = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: $(this),
    //             start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
    //             end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
    //             //                scrub: true, //스크롤에 반응 (없으면 자동재생)
    //             // markers: true,
    //             toggleActions: "play complete none none",
    //         },
    //     });
    //     textmotion.to(text, 0.5, {
    //         y: 0,
    //         stagger: 0.3,
    //         opacity: 1,
    //         //            ease: "power2.inOut",
    //         onComplete: function () {

    //         }
    //     })
    // })
    $('.up-slide-stagger > *').each(function (e) {
        var stagger = $(this)
        gsap.from(stagger, {
            scrollTrigger: {
                trigger: $(this),
                start: "0 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                scroller: ".contents-wrap",
                toggleActions: "play none none reverse",
            },
            y: 40,
            opacity:0,
            stagger: 1,
            ease: 'Power1.easeOut'
        })
    })

}

function openLayer(selector, href, floor) {
    var flag = selector,
        target = href;
    flag = $(flag);
    flag.load(href, function () {
        $(this).show();
        $(this).find('.modal').show().addClass('scroll')
        $('.overlay').show();
        if(floor){
            $(this).find('.modal .modal-header .swiper-slide').removeClass("active").eq(floor).addClass("active");
        }
       $('body').css('overflow','hidden');
    });
    //    $('body').addClass('scroll')
    return false;
}

function closeLayer(no) {
    var no = no;
    if (no) {
        $('#popup' + no).removeClass('show').hide().removeAttr('style');
    } else {
        $('.popup-wrap').empty()
        $('.popup-wrap').removeAttr('style').hide();
        $('.overlay').hide().removeAttr('style');
        $('body').css('overflow','').removeAttr('style');
        $('.float-menu-wrap').removeClass('active')
    }
    //    $('body').removeClass('fixed')
}



function work(){
    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () {
            gsap.to($('.work-contents .preview-img'), {
                marginLeft:'-2rem',
                marginRight:'-2rem',
                scrollTrigger: {
                    trigger: $(this),
                    start: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                    end: "80% 0%%", // 앞 : 객체 , 뒤 : 페이지 전체
                    scrub: true, //스크롤에 반응 (없으면 자동재생)
                    // markers: true,
                    scroller: ".contents-wrap",
                    toggleActions: "play none none reverse",
                },
                onStart: function () {
                    const heightBox = $('.work-contents .preview-img').height()
                    $('.work-contents .preview-img').css({'height': heightBox + 'px'})
                },
            })
        },
        "(max-width:768px)": function () {
            
        },
    })
}





/* 글자섞기 */
function ShuffleText(element, onload, delay, iterationNumber, iterationSpeed, displayedSpeed, index, useEvent = true) {
    this.element = element;
    this.onload = onload;
    this.index = delay === true ? index + 1 : 1;
    this.texts = this.element.textContent;
    this.startTexts = this.texts;
    this.iterationNumber = this.texts.length;
    this.iterationSpeed = iterationSpeed;
    this.displayedSpeed = displayedSpeed;

    this.textsArr = [];
    this.textsNewArr = [];
    this.newText = '';
    this.isRunning = false;
    this.renderCount = 0;

    if(useEvent) this.setupEvents();
}

ShuffleText.prototype.setupEvents = function() {
    if (this.onload === true) {
        this.iteration();
    }
    var that = this;
    this.element.addEventListener('mouseover', function() {
        that.iteration(true);
    }, false);
};

ShuffleText.prototype.createNewArr = function() {
    for (var i = 0; i < this.texts.length; i++) {
        this.textsArr.push(this.texts[i]);
    }
    this.textsNewArr = this.textsArr;
};

ShuffleText.prototype.createNewTexts = function() {
    for (var i = 0; i < this.textsNewArr.length; i++) {
        var num = i + this.renderCount;
        if(num >= this.textsNewArr.length) num = num - this.textsNewArr.length;
        this.newText += this.textsNewArr[num];
    }
    this.element.textContent = this.newText;
};

ShuffleText.prototype.reset = function() {
    this.newText = '';
    this.textsArr = [];
    this.textsNewArr = [];
};

ShuffleText.prototype.render = function() {
    this.createNewArr();
    this.createNewTexts();
    this.reset();
};

ShuffleText.prototype.iteration = function(ev) {
    if (this.isRunning !== false) return;
    if (ev === true) this.index = 1;

    this.isRunning = true;
    this.renderCount = 0;

    var that = this;
    for (var i = 0; i < this.iterationNumber; i++) {
        (function(i) {
        setTimeout(function() {
            that.renderCount++;
            that.render();
            
            if (i === that.iterationNumber - 1) {
            that.element.textContent = '';
            
            for (var j = 0; j < that.startTexts.length; j++) {
                (function(j) {
                setTimeout(function() {
                    that.element.textContent += that.startTexts[j];
                    
                    if (j === that.startTexts.length - 1) {
                    that.isRunning = false;
                    }
                }, j * that.displayedSpeed);
                })(j);
            }
            }
        }, i * that.index * that.iterationSpeed);
        })(i);
    }
};


(function() {
    $(function () {
        var classes = document.getElementsByClassName('shuffleText');
        for (var i = 0; i < classes.length; i++) {
            var shuffleText = new ShuffleText(classes[i], false, false, 8, 50, 0, i);
            $(classes[i]).data('shuffleText', shuffleText);
        }
    });
})();
$(".thumb").each(function (i) {
    var dd = $(this).find(" dd");
    var shuffleText1 = new ShuffleText(dd.eq(0)[0], false, false, 8, 50, 0, 11+i, false);
    var shuffleText2 = new ShuffleText(dd.eq(1)[0], false, false, 8, 50, 0, 11+i, false);
    $(this).on('mouseenter', () => {
       shuffleText1.iteration(true);
       setTimeout(() => shuffleText2.iteration(true), 1000/30);
    });
 });
