'use strict';
// if ('scrollRestoration' in history) {
//     history.scrollRestoration = 'manual';
// }
// gsap.registerPlugin(ScrollTrigger);
// JavaScript Document
window.onload = function () {
    // $('body').imagesLoaded().done(function (instance) {
        // $('body').addClass('load')
        headerScroll()
        navActive()
        // commonTween()
        
    // });
}
function delay(n) {
    n = n || 2000
    // Keep official documentation wording, done -> resolve
    // and make it more concise
    return new Promise(resolve => {
      setTimeout(resolve, n)
    })
  }

// const screenNum = '';
const loadingScreen = document.querySelector('.loading-screen')
const loadingIndex = document.querySelector('.loading-screen.index')
const loadingWork = document.querySelector('.loading-screen.work')
const mainNavigation = document.querySelector('.main-navigation')

// Function to add and remove the page transition screen
function pageTransitionIn(pageName) {
    $('body').addClass('fixed')
    const screenNum = document.querySelector('.loading-screen.' + pageName)
    
    return gsap
    .to(screenNum, { duration: .5, scaleY: 1, transformOrigin: 'bottom left', y:0})
}

// Function to add and remove the page transition screen
function pageTransitionOut(container, pageName) {
    //    $('html').removeClass('fixed')
    const screenNum = document.querySelector('.loading-screen.' + pageName)
  // GSAP methods can be chained and return directly a promise
  return gsap
    .timeline({ delay: 1}) // More readable to put it here
    .add('start') // Use a label to sync screen and content animation
    .call(contentReset, [container])
    .set(container.querySelector('.contents'), {
        duration: 0,
        translateY: '100vh',
        opacity: 1,
      })
    .to(screenNum, {
      duration: 0.5,
      y: '-100%',
      skewX: 0,
      transformOrigin: 'top left',
      ease: 'power1.out',
    }, 'start')
    .to(container.querySelector('.contents'), {
      duration: 0.5,
      translateY: '0%',
      opacity: 1,
    }, 'start')
    .to(screenNum, {
        duration: 0,
        y: '100%',
        transformOrigin: 'top left',
      })
    .call(contentAnimation, [container])



}

// Function to animate the content of each page

function workfunction(container) {
    console.log('work 스크립트')
    init()
}
function contentReset(container) {
    let triggers = ScrollTrigger.getAll();
        triggers.forEach( trigger => {
        trigger.kill();
    });
}
function contentAnimation(container) {
    headerScroll()
    $('.main-navigation').removeClass('nav-hide')
    init()
}


function navshow(){
    $(mainNavigation).removeClass('nav-hide')
}

function navHide(){
    
    setTimeout(() => {
        $(mainNavigation).addClass('nav-hide')
    }, 1000);
    
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
            {
            name: 'index',
            to: { namespace: ['index'] },
            async leave(data) {
                const pageName = data.next.namespace
                await pageTransitionIn(pageName)
                data.current.container.remove()
                $('html,body').animate({
                    scrollTop:0
                },300)
            },
            async enter(data) {
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                headerScroll()
            },
          }, {
            name: 'work',
            to: { namespace: ['work'] },
            async leave(data) {
                const  pageName = data.next.namespace
                await pageTransitionIn(pageName)
                data.current.container.remove()
                $('html,body').animate({
                    scrollTop:0
                },300)
                
            },
            async enter(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(0).addClass('active')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                // await commonTween()
                headerScroll()
                console.log(pageName)
            },
            async afterEnter(data) {
                
                await videoAutoPlay()
                await datagrid()
            },
            async once(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(0).addClass('active')
                await init()
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
                $('html,body').animate({
                    scrollTop:0
                },300)
                
            },
            async enter(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(0).addClass('active')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                // await commonTween()
                headerScroll()
            },
            async afterEnter(data) {
                await videoAutoPlay()
            },
            async once(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(0).addClass('active')
                await init()
                await videoAutoPlay()
                await commonTween()
            }
          }
          , {
            name: 'about',
            to: { namespace: ['about'] },
            async leave(data) {
                const  pageName = data.next.namespace
                await pageTransitionIn(pageName)
                data.current.container.remove()
                $('html,body').animate({
                    scrollTop:0
                },300)
            },
            async enter(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(1).addClass('active')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                headerScroll()
            },
            async once(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(1).addClass('active')
                await init()
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
                $('html,body').animate({
                    scrollTop:0
                },300)
            },
            async enter(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(2).addClass('active')
                const pageName = data.next.namespace
                await pageTransitionOut(data.next.container, pageName)
                headerScroll()
            },
            async once(data) {
                // $('.main-navigation li').removeClass('active')
                // $('.main-navigation li').eq(2).addClass('active')
                await init()
                await commonTween()
            }
          }
          
        ],
      });
//   barba.init({
//     transitions: [{
//       async leave(data) {
//         await pageTransitionIn()
//         data.current.container.remove()
//       },
//       async enter(data) {
//         await pageTransitionOut(data.next.container)
        
//       },
//       async once(data) {
//         await contentAnimation(data.next.container);
       
//       }
//     }]
//   });

});
function datagrid(){
    var $grid = $('.work-list').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        transitionDuration: 0,
        visibleStyle: {
            opacity: 1,
            transform: 'translateY(0)',
          },
          hiddenStyle: {
            opacity: 0,
            transform: 'translateY(100px)',
          },
          transformsEnabled: false,
    });


    const projectNum = $('.work-list .thumb').length;
    $('.project-type li').eq(1).find('span').text(projectNum)
    var $grid = $('.work-list').isotope({
        itemSelector: '.grid-item'
      });
      var filters = [];
      $('.filter-block .filters-button-group').on( 'click', 'button', function( event ) {
        var $target = $( event.currentTarget );
        $target.toggleClass('is-checked');
        var isChecked = $target.hasClass('is-checked');
        var filter = $target.attr('data-filter');
        if ( isChecked ) {
          addFilter( filter );
        } else {
          removeFilter( filter );
        }
        // $grid.isotope({ filter: filters.join(',') });
        var tl = gsap.timeline();
        tl.to(".work-list",{
            duration: 0.5,
            opacity:0,
            y:50,
            onComplete:function(){
                if(filters?.length) {
                    $('.work-list').addClass('sort')
                    $grid.isotope({ filter: filters.join(',') });
                    //$grid.isotope({ filter: filterValue });
                    $grid.isotope('updateSortData').isotope();
                    $grid.isotope('layout');
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                    }, 500);
                    const filterCount =  $(".grid-item:visible").length;
                    $('.project-type li').eq(0).find('span').text(filterCount)
                    
                    
                  } else {
                    console.log("Empty");
                    $('.work-list').removeClass('sort')
                    $grid.isotope({ filter: filters.join(',') });
                    //$grid.isotope({ filter: filterValue });
                    $grid.isotope('updateSortData').isotope();
                    $grid.isotope('layout');
                    setTimeout(() => {
                        ScrollTrigger.refresh();
                    }, 500);
                    $('.project-type li').eq(0).find('span').text('0')
                  }
            }

        })
        tl.to(".work-list",{
            duration: 0.4,
            opacity:1,
            y:0,
        })
      });
        
      function addFilter( filter ) {
        if ( filters.indexOf( filter ) == -1 ) {
          filters.push( filter );
        }
      }
      
      function removeFilter( filter ) {
        var index = filters.indexOf( filter);
        if ( index != -1 ) {
          filters.splice( index, 1 );
        }
      }



      
    
    


    // 필터 초기화
    $('.filter-block .title').on( 'click', 'button', function() {
        $('.work-list').removeClass('sort')
        $('.button-group button').removeClass('is-checked')
        filters = [];
        $grid.isotope({ filter: '*' });
        $grid.isotope('updateSortData').isotope();
        $('.project-type li').eq(0).find('span').text('0')
    })

}
function headerScroll() {
    
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#header').outerHeight();
    $(window).scroll(function (event) {
        didScroll = true;
    });

    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 0);

    function hasScrolled() {
        var st = $(window).scrollTop();
        
        // Make sure they scroll more than delta
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > lastScrollTop && st > navbarHeight) {
            // Scroll Down
            setTimeout(() => {
                $(mainNavigation).addClass('nav-hide')
            }, 0);
        } else {
            // Scroll Up
            if (st + $(window).height() < $(document).height()) {
                setTimeout(() => {
                    // $(mainNavigation).removeClass('nav-hide')
                }, 0);
            }
        }
        lastScrollTop = st;
        if (st <= 10) {
            
            $(mainNavigation).addClass('nav-default')
            $(mainNavigation).removeClass('nav-hide')
        } else {
            $(mainNavigation).removeClass('nav-default')
        }
    }
}
function navActive(){
    $('.main-navigation li a').on('click',function(){
        const navName = $('.contents-wrap').attr('data-barba-namespace')
        console.log(navName)
        if($(this).parent().hasClass('active') && navName == 'detail'){
            console.log('일치')
            return;
        }else if($(this).parent().hasClass('active')){
            return false;
        }else{
            const indexNum = $('.main-navigation li a').index(this)
            setTimeout(() => {
                if($(this).parent().hasClass('active')){
                    return false;
                }
                else{
                    $('.main-navigation li').removeClass('active')
                    $('.main-navigation li').eq(indexNum).addClass('active')
                }
                if(indexNum == 1){
                    $('#wrapper').addClass('about-secton')
                }else{
                    $('#wrapper').removeClass('about-secton')
                }
            }, 1000);
        }
    })
}
function videoAutoPlay(){
    setTimeout(() => {
        const videos = gsap.utils.toArray('.work-list video')
        videos.forEach(function(video, i) {
            ScrollTrigger.create({
                trigger: video,
                scroller: 'body',
                start: '0 100%',
                end: '100% 0%',
                markers: true,
                onEnter: () => video.play(),
                onEnterBack: () => video.play(),
                onLeave: () => video.pause(),
                onLeaveBack: () => video.pause(),
            });
        })
        
    }, 500);
        
  }
function init() {
    console.log('init')

    $('.project-type a').on('click',function(){
        const indexNum = $('.project-type a').index(this)
        console.log(indexNum)
        $('.project-type li').removeClass('active')
        $('.project-type li').eq(indexNum).addClass('active')
        var tl = gsap.timeline();
        tl.call(contentReset())
        tl.to(".work-list",{
            duration: 0.5,
            opacity:0,
            y:50,
            onComplete:function(){
                if(indexNum == 0){
                    $('.work-list').removeClass('all-item')
                } else {
                    $('.work-list').addClass('all-item')
                }
            }
        })
        tl.to(".work-list",{
            duration: 0.4,
            opacity:1,
            y:0,
        })
        tl.call(
            setTimeout(() => {
                videoAutoPlay()
            }, 500)
        );
    })
    $('.grid-item').each(function(){
        const itemName = $(this).find('.thumb .title').text()
        const itemCate = $(this).find('.thumb .cate').text()
        $(this).find('.line .title dt').text(itemName)
        $(this).find('.line .title dd').text(itemCate)
        console.log(itemName)
    })
    $('.grid-item .line .title').on('click',function(){
        $(this).parents('.grid-item').siblings().find('.line').removeClass('active')
        $(this).parents('.line').toggleClass('active')
    })
    
    var swiper = new Swiper(".work-slider", {
        slidesPerView: "auto",
        slideWidth:'auto',
        spaceBetween:0,
        loop: true,
        observer : true,
        observeParents : true,
        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
          clickable: true,
          type: 'custom',
          renderCustom: function (swiper, current, total) {
                return '0' + current + '/0' + (total); 
            }
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      
    setTimeout(() => {
        $('body').removeClass('fixed')
    }, 500);
    
    $('.filter-block .title button').on('click',function(){
        $(this).toggleClass('active')
        $(this).parents('.title').next().toggleClass('active')
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 500);
    })  
    $('.filter-list button').on('click',function(){
        $(this).toggleClass('active')
    })
    $('#header').on('mouseover',function(){
        setTimeout(() => {
            $(mainNavigation).removeClass('nav-hide')
        }, 100);
    })
    $('#header').on('mouseleave',function(){
        if($(mainNavigation).hasClass('nav-default')){return false;}
        setTimeout(() => {
            $(mainNavigation).addClass('nav-hide')
        }, 300);
        
    })
    $('.main-navigation h1 a').on('click',function(){
        $('.main-navigation li').removeClass('active')
    })  
   
    
    var winw = $(window).width();
    if (winw > 768) {
        $(".artist .image img").each(function(){
            $(this).attr("src", $(this).attr("src").replace("-m.png", ".png"))
        })
    } else if (winw <= 768) {
        $(".artist .image img").each(function(){
            $(this).attr("src", $(this).attr("src").replace(".png", "-m.png"))
        })
        
    }

    // ScrollTrigger.matchMedia({
    //     "(min-width:601px)": function () {
    //         gsap.to($(".float"),{
    //             scrollTrigger: {
    //                 trigger: $('footer'),
    //                 start: "0% 100%", // 앞 : 객체 , 뒤 : 페이지 전체
    //                 end: "0% 85%",
    //                 // markers: true,
    //                 toggleActions: "play pause  reverse pause",
    //                 scrub: 1,
    //                 invalidateOnRefresh: true,
    //             },
    //             css:{bottom: '30rem'},
    //             ease:"none",
    //         })
    //     },
    //     "(max-width:600px)": function () {
            
    //     },
    // })
    
    
}


function commonTween() {
    var ran = gsap.timeline ()
    .to('.move',{
        x: "random(-50, 50)", 
        y: "random(-50, 50)",
        scale: "random(0.8, 1)",
        opacity: "random(0.3, 1)",
        duration:5,
        ease:"none",
        repeat:-1,
        repeatRefresh:true 
    })
    


    $('.tada').each(function (e) {
        let tada = $(this)
        gsap.set(tada, {
            opacity: 0,
            scale:0.5
        })
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 50%%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play  none none none",
            },
        });
        upmotion.to(tada, 0.5, {
            opacity: 1,
            scale:1,
            ease: "power3.out",
        })
        .to(tada, 0.5, {
            scale:0.9,
            ease: "power3.out",
        })

    })
    $('.fade').each(function (e) {
        let text = $(this)
        gsap.set(text, {
            opacity:1,
        })
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.to(text, 1, {
            opacity: 1,
            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.slide-down').each(function (e) {
        let text = $(this)
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        upmotion.from(text, 1, {
            y: -50,
            opacity: 0,
            //            ease: "power3.out",
            onComplete: function () {

            }
        })

    })
    $('.slide-up').each(function (e) {
        let text = $(this).wrapInner('<div class="over-text-con"></div>')
        let target = text.find('.over-text-con')
        gsap.set(target, {
            y:40,
            opacity: 0,
        })
        const upmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "top 85%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "top 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //scrub: true, //스크롤에 반응 (없으면 자동재생)
                //markers: true,
                toggleActions: "play none none reverse",
            },
        });
        upmotion.to($(this), 0, {
            opacity: 1,
        })
        upmotion.to(target, 0.5, {
            y:0,
            opacity: 1,
            ease: "power3.out",
        })

    })
    
    ScrollTrigger.matchMedia({
        "(min-width:769px)": function () {
            $('.right-slide .swiper-wrapper').each(function (e){
                let slideWidth = $(this).innerWidth()
                let slide = $('.right-slide .swiper-wrapper .swiper-slide').width()
                let innerWidth = $('.right-slide .swiper-wrapper .swiper-slide').length
                let full = slide * innerWidth
                console.log(slideWidth, slide * innerWidth, full - slideWidth)
                let text = $(this)
                const leftMotion = gsap.timeline({
                    scrollTrigger: {
                        trigger: $('.highlight'),
                        start: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                        end: "100% 50%",
                        pin:true,
                        scrub: 1, //스크롤에 반응 (없으면 자동재생)
                        // markers: true,
                    },
                });
                gsap.set(text, {
                    x: '0%'
                })
                leftMotion.to(text, 1, {
                    x: - (full - slideWidth + 120),
                    ease: "none",
                })
            })
        },
        "(max-width:768px)": function () {
            $('.right-slide .swiper-slide').each(function (e) {
                var stagger = $(this)
                gsap.set($('.mySwiper'), {
                    x: '0%',
                    opacity: 1,
                    onComplete: function () {
        
                    }
                })
                gsap.set(stagger, {
                    y:'20px',
                    x: '0%',
                    opacity: 0,
                    onComplete: function () {
        
                    }
                })
                gsap.to(stagger, {
                    scrollTrigger: {
                        trigger: $(this),
                        start: "0 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                        // scrub: true, //스크롤에 반응 (없으면 자동재생)
                        // markers: true,
                        toggleActions: "play none none reverse",
                    },
                    y:'0px',
                    opacity:1,
                    stagger: 0.1,
                    ease: 'Power1.easeOut'
                })
                
            })
        },
    })
    
    $('.over-text-wrap').each(function (e) {
        $(this).find(' > *').addClass('over-text').wrapInner('<span class="over-text-con"></span>')
        let text = $(this).find('.over-text-con')
        const textmotion = gsap.timeline({
            scrollTrigger: {
                trigger: $(this),
                start: "0% 80%", // 앞 : 객체 , 뒤 : 페이지 전체
                end: "0% 0%", // 앞 : 객체 , 뒤 : 페이지 전체
                //                scrub: true, //스크롤에 반응 (없으면 자동재생)
                //                markers: true,
                toggleActions: "play complete none none",
            },
        });
        textmotion.to(text, 0.5, {
            y: 0,
            stagger: 0.3,
            opacity: 1,
            //            ease: "power2.inOut",
            onComplete: function () {

            }
        })
    })
    $('.up-slide-stagger > *').each(function (e) {
        var stagger = $(this)
        gsap.from(stagger, {
            scrollTrigger: {
                trigger: $(this),
                start: "0 90%", // 앞 : 객체 , 뒤 : 페이지 전체
                // scrub: true, //스크롤에 반응 (없으면 자동재생)
                // markers: true,
                toggleActions: "play none none reverse",
            },
            y: 40,
            opacity:0,
            stagger: 0.1,
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









