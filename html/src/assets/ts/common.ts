//
//-----------------------------------------------------------------
// 공통 스크립트
//-----------------------------------------------------------------
//

//import $ from 'jquery';
//import Swiper, { Navigation, Pagination, Autoplay } from 'swiper';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import axios from 'axios';
import _gb from './global.ts';
import * as cookie from './cookie.ts'; // setCookie, getCookie

// ui style
// import 'swiper/swiper.min.css';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

_gb.prototype.CommonFunction = () => {
  const isMob = () => window.innerWidth <= 821;
  const setGnb = () => {
    // 헤더
    gb.btnAllMenuOpen.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();

      if (gb.html.classList.contains('menu-open')) {
        allMenuClose();
      } else {
        const dimmed = document.createElement('div');
        dimmed.classList.add('dimmed');
        gb.html.classList.add('menu-open');
        gb.body.append(dimmed);
        gb.body.style.height = '100vh';
        gb.body.style.overflowY = 'hidden';
        gb.main.style.filter = 'blur(3px)';

        dimmed.addEventListener('click', function () {
          allMenuClose();
        });
      }
    });
  };
  const allMenuClose = () => {
    gb.html.classList.remove('menu-open');
    gb.body.style.height = 'auto';
    gb.body.style.overflowY = 'visible';
    gb.main.style.filter = '';
    document.querySelector('.dimmed')?.remove();
  };
  const scrollReset = () => {
    gsap.to(window, {
      duration: 0.2,
      scrollTo: {
        y: 0,
      },
    });
    //ScrollTrigger.refresh(true);
  };
  const introMotion = () => {
    const titArray = document.querySelectorAll('.tit-1 > *');
    const introScene = gsap.timeline();

    introScene.fromTo(titArray[0], {
      alpha:0,
      xPercent: -500,
      duration:0.4,
    }, {
      alpha:1,
      xPercent:0,
      ease: 'expo.in',
    }).fromTo(titArray[0], {
      yPercent: 50,
      rotateX:90,
      scale:2,
      duration:1,
    }, {
      rotateX:0,
      scale:1,
      onComplete(){
        frameMotion();
      }
    }).to(titArray[0], {
      yPercent:0,
      delay:0.6,
      duration:1
    }).fromTo(titArray[1].children, {
      alpha: 0,
      yPercent: 50,
    },{
      alpha: 1,
      yPercent: 0,
      ease: 'expo.out',
      duration:0.02,
      stagger: 0.02,
      onComplete(){
        gsap.to(gb.header, { y: 0, opacity: 1, duration: 0.4});
      }
    });

    const frameMotion = () => {
      const frameArray = document.querySelectorAll('.intro-frame span');
      gsap.fromTo(frameArray[0], {
        right:'100%',
        duration:0.4,
      },{
        right:0,
        ease: 'expo.in'
      });
      gsap.fromTo(frameArray[1], {
        bottom:'100%',
        duration:0.4,
      },{
        bottom:0,
        ease: 'expo.in'
      });
      gsap.fromTo(frameArray[2], {
        left:'100%',
        duration:0.4,
      },{
        left:0,
        ease: 'expo.in'
      });
      gsap.fromTo(frameArray[3], {
        top:'100%',
        duration:0.4,
      },{
        top:0,
        ease: 'expo.in'
      });
    }
  };
  const scrollMotion = () => {
    ScrollTrigger.defaults({
      trigger: '.section-01',
      pin: false,
      //pinSpacing: false,
      //anticipatePin: 1,
      //fastScrollEnd: 4000,
      scrub: 0.5,
      //markers: true,
      toggleActions: 'restart pause reverse pause',
      start: 'top 0',
      end: 'bottom 30%',
      stagger: 0.2,
      preventOverlaps: true,
      //refreshPriority: 1,
      //onRefresh: ({ progress, direction, isActive }) => console.log('새로고침 :' + progress, direction, isActive),
      //onUpdate: (self) => console.log('progress', self.progress),
    });

    const scene1 = gsap.timeline();
    const scene2 = gsap.timeline();
    const scene3 = gsap.timeline();

    ScrollTrigger.create({
      animation: scene1,
    });
    ScrollTrigger.create({
      animation: scene2,
      pin: true,
    });
    ScrollTrigger.create({
      animation: scene3,
      pin: true,
    });

    scene1.to('.r1', {
      alpha: 0,
      duration: 2,
      x: '-100%',
      rotation: '360',
    }).to('.r2', {
      alpha: 1,
      duration: 2,
      x: '0',
      rotation: 0,
    }, '-=1.5');

    scene2.to('.tit-1', {
      alpha: 0,
      duration: 2,
      scale: 0.5,
    }).to('.tit-2', {
      alpha: 1,
      duration: 2,
      scale: 1,
    }, '-=1.5');
    
    scene3.to('.intro-frame span:nth-of-type(4)', {
      duration: 0.5,
      y:'100%',
    }).to('.intro-frame span:nth-of-type(3)', {
      duration: 0.5,
      x:'100%'
    }).to('.intro-frame span:nth-of-type(2)', {
      duration: 0.5,
      y:'-100%'
    }).to('.intro-frame span:first-of-type', {
      duration: 0.5,
      x:'-100%'
    });

    const horizonScrollWrapper = document.querySelector('.horizonScroll-wrapper');
    const section = document.getElementById('section-03');
    const panels = gsap.utils.toArray('.scrollItem');

    const panelScene = gsap.timeline();
    panelScene.timeScale(1);

    ScrollTrigger.create({
      trigger: section,
      pin: true,
      animation: panelScene,
      scrub: 1,
      stagger: 0.2,
      //markers: true,
      //snap: 1 / (panels.length - 1),
      end: () => `+=${horizonScrollWrapper.scrollWidth - innerWidth}`,
    });

    panelScene.to(panels, {
      //x: () => -1 * (horizonScrollWrapper.scrollWidth - innerWidth),
      x: () => -1 * panels[0].clientWidth * (panels.length - 1),
      duration:2,
      ease: 'none',
    });
  };
  const scrollGage = () => {
    // 스크롤 게이지 (단위:%)
    gb.scrollTop = document.documentElement.scrollTop;
    gb.client_H = document.documentElement.clientHeight;
    gb.scroll_H = document.documentElement.scrollHeight;
    gb.scrollSize = Math.floor((gb.scrollTop / (gb.scroll_H - gb.client_H)) * 100);

    return gb.scrollSize;
  };
  const setPos = () => {
    function PageAnchor(link) {
      if (
        link.protocol !== window.location.protocol ||
        link.host !== window.location.host ||
        link.pathname !== window.location.pathname ||
        link.search !== window.location.search
      ) {
        return false;
      }

      return link.hash;
    }

    function scrollToHash(hash, e) {
      const elem = hash ? document.querySelector(hash) : false;
      if (elem) {
        if (e) e.preventDefault();
        gsap.to(window, { scrollTo: elem, delay: 0.2 });
      }
    }

    gb.anchor.forEach((a) => {
      a.addEventListener('click', (e) => {
        allMenuClose();
        scrollToHash(PageAnchor(a), e);
      });
    });

    scrollToHash(window.location.hash);
  };
  const axiosListUp = function () {
    axios
      .get('assets/json/list.json')
      .then(function (result) {
        gb.listTrg = document.getElementById('prj-select');
        const list = document.querySelector('.pf-list');
        const option = document.querySelectorAll('#prj-select option');
        let inner = [];

        // 리스트 전체 선택
        option.forEach(function (el, idx) {
          if (idx) {
            inner.push(outputList(el.value));
          }
        });
        list.innerHTML = inner.join('');

        gb.listTrg.addEventListener('change', function () {
          const value = this.value;
          inner = [];

          gsap.to(window, {
            duration: 0.2,
            scrollTo: '#section-04',
          });

          if (!value) {
            // 리스트 전체 선택
            option.forEach(function (el, idx) {
              if (idx) {
                inner.push(outputList(el.value));
              }
            });
            list.innerHTML = inner.join('');
          } else {
            // 해당되는 리스트 선택
            list.innerHTML = outputList(value);
          }

          gb.CommonFunction().animate();
        });

        function outputList(val) {
          const data = result.data.allType[val];
          const {url, pub, title, contents, imgSrc} = data;
          let btnLive, btnFileIndex, ImgSrc;
          const listItem = [];

          for (let k in url) {
            ImgSrc = imgSrc[k] || '../assets/images/thumbnail/no-image.jpg';
            btnLive = url[k] ? `<a href="${url[k]}" target="_blank" rel="noopener noreferrer">라이브</a>`:'';
            btnFileIndex = pub && pub[k] ? `<a href="${pub[k]}" target="_blank" rel="noopener noreferrer">작업목록</a>`:'';

            listItem[k] = `
            <div class="grid-item animate fadeInUp">
              <div class="item-wrapper">
                <div class="thumbNail">
                  <img src="${ImgSrc}" alt="${title[k]}" />
                </div>
                <dl>
                  <dt><b>${title[k]}</b></dt>
                  <dd>
                    <span>${btnLive}${btnFileIndex}</span>
                    <span>${contents[k]}</span>
                  </dd>
                </dl>
              </div>
            </div>
            `;
          }
          const listItem_ = listItem.join('');
          return listItem_;
        }
      })
      .catch(function (err) {
        alert(err);
      })
      .finally(function () {});
  };
  const animate = () => {
    gb.animate = document.querySelectorAll('.animate');
    gb.animate.forEach((el, idx) => {
      if(idx == gb.animate.length - 1){
        if (el.getBoundingClientRect().top < gb.client_H) {
          el.classList.add('animation--start');
        } else {
          el.classList.remove('animation--start');
        }
      }else {
        if (el.getBoundingClientRect().top < gb.client_H - gb.header.clientHeight) {
          el.classList.add('animation--start');
        } else {
          el.classList.remove('animation--start');
        }
      }
      
    });
  };
  const countRating = () => {
    gb.rRange.forEach((r) => {
      if(r.closest('.scrollItem').getBoundingClientRect().x < (document.documentElement.clientWidth * 0.80).toFixed()*1){
        //r.style.right = `${100 - r.getAttribute('data-range')*1}%`;
        //r.style.opacity = 1;

        gsap.to(r, {duration:0.7, delay:0, stagger:0.5, 'right':`${100 - r.getAttribute('data-range')*1}%`, opacity:1, ease: 'expo.out'});
      }else {
        gsap.to(r, {duration:0, delay:0, 'right':'100%', opacity:0});
      }

      if(r.getAttribute('data-range') >= 70){
        r.previousElementSibling?.setAttribute('data-rating', '상');
        r.closest('.rating')?.classList.add('top');
      }else if (r.getAttribute('data-range') >= 50 && r.getAttribute('data-range') < 70){
        r.previousElementSibling?.setAttribute('data-rating', '중');
        r.closest('.rating')?.classList.add('middle');
      }else {
        r.previousElementSibling?.setAttribute('data-rating', '하');
        r.closest('.rating')?.classList.add('bottom');
      }
    });
  };
  const toggleTheme = function () {
    const btnToggleTheme = document.querySelector('.btn-toggleTheme');

    if (localStorage.getItem('theme')) {
      btnToggleTheme.classList.add('dark');
      document.documentElement.classList.add('darkMode');
      document.querySelector('meta[name=theme-color]').setAttribute('content', '#000');
    } else {
      btnToggleTheme.classList.remove('dark');
      document.documentElement.classList.remove('darkMode');
      document.querySelector('meta[name=theme-color]').setAttribute('content', '#fff');
    }

    btnToggleTheme.addEventListener('click', function () {
      if (localStorage.getItem('theme')) {
        this.classList.remove('dark');
        document.documentElement.classList.remove('darkMode');
        document.querySelector('meta[name=theme-color]').setAttribute('content', '#fff');
        localStorage.removeItem('theme');
      } else {
        this.classList.add('dark');
        document.documentElement.classList.add('darkMode');
        document.querySelector('meta[name=theme-color]').setAttribute('content', '#000');
        localStorage.setItem('theme', 'dark');
      }
    });
  };
  //   const answer = [];
  //   const id_list = ["muzi", "frodo", "apeach", "neo"];
  //   const report = ["muzi frodo", "apeach frodo","frodo neo","muzi neo","apeach muzi"];
  //   const k = 2;
    
  //   const setName = Array.from(new Set(report)); // 중복제거, 집합요소 -> 배열요소로 변경

  //   const rpt = new Map();
  //   const dcl = [];
  //   const aaa = {};

  //   let n;
  //   let total_;

  //   answer.length = id_list.length;
  //   answer.fill(0);

  //   setName.forEach((el) => {
  //       const splitText = el.split(' ');
  //       const one = splitText[0];
  //       const two = splitText[1];

  //       let list = [];

  //       dcl.push(two);

  //       list = rpt.has(one) ? rpt.get(one) : [];

  //       list.push(two);
  //       rpt.set(one,list);
  //   });

  //   const obj = Object.fromEntries(rpt);
  //   const count = dcl.reduce((itemList, item) => {
  //       if(k == 1){
  //           itemList[item] = 1;
  //       }else {
  //           if(item in itemList){
  //             n++
  //             if(n >= k){
  //               itemList[item] = 1;
  //             }
  //           }else {
  //               n = 1;
  //               itemList[item] = 0;
  //           }
  //       }
  //       return itemList;
  //   },{});
  //   //console.log(count);

  //   for(let key in obj){
  //       obj[key].forEach((el) => {
  //           for(let key_ in count){
  //               if(el == key_){
  //                   if(!aaa[key]){
  //                       aaa[key] = [count[key_]];
  //                   }else {
  //                       aaa[key].push(count[key_]);
  //                   }
  //               }
  //           }
  //       });
  //   }

  //   for(let key in aaa){
  //       total_ = aaa[key].reduce((acc,cur) => {
  //           return acc + cur
  //       }, 0);
  //       answer[id_list.indexOf(key)] = total_;
  //   };
  //   console.log(answer);
  //   return answer;
  // };
  const check_ = () => {
    const id_list = ["muzi", "frodo", "apeach", "neo"];
    const report = ["muzi frodo", "apeach frodo","frodo neo","muzi neo","apeach muzi"];
    const k = 2;
    const answer = new Array(id_list.length).fill(0);
    
    const report_ = [...new Set(report)].map((a) => a.split(' '));
    let report_list = {};
    id_list.map((a) => {
      report_list[a] = [];
    });

    for(const userGroup of report_){
      report_list[userGroup[1]].push(userGroup[0]);
    }

    for(const key in report_list){
      if(report_list[key].length >= k){
        report_list[key].map((a) => {
          answer[id_list.indexOf(a)] += 1;
        });
      }
    }
    
    //console.log(answer);
    return answer;
  };
  const pointerMotion = () => {
    const motionContainer = document.getElementById('contents');
    let deg = 0;

    for(let m = 0; m <= 10; m++){
      const span = document.createElement('span');
      const r = `${(Math.random()*5).toFixed()}rem`;
      span.classList.add('circle');

      span.style.top = `${(Math.random()*200).toFixed()}rem`;
      span.style.left = `${(Math.random()*200).toFixed()}rem`;
      span.style.width = `${r}`;
      span.style.height = `${r}`;
      span.style.position = 'fixed';
      span.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
      span.style.zIndex = '11';
      span.style.background= 'linear-gradient(135deg, rgba(229,229,229,0) 0%,rgba(229,229,229,0.01) 1%,rgba(113,36,246,1) 99%,rgba(112,34,246,1) 100%)';
      span.style.opacity = Math.random().toFixed(2);

      motionContainer.append(span);
    }
    
    motionContainer.onmousemove = function(e){
      const ball = this.children;

      for(const circle of ball){
        const idx = Array.from(ball).indexOf(circle);
        if(circle.classList.contains('circle')){
          gsap.to(circle, {rotate:deg++, duration:1, delay:0.02*idx, stagger:0.2, y:`-${e.clientY * 0.3}}`, x:`-${e.clientX * 0.3}`});
        }
      }
    }
  };
  const copyToClipboard = function (val) {
    // 클립 보드에 복사
    var t = document.createElement('textarea');

    document.body.appendChild(t);

    t.value = val;
    t.select();

    document.execCommand('copy');
    document.body.removeChild(t);
  };
  const copyUrl = function () {
    gb.toast = true;
    const anchor_ = document.querySelectorAll('.copy-to-clip');
    anchor_.forEach(el => {
      el.onclick = function(e){
        e.preventDefault();
        // 클립보드에 복사
        if(gb.toast){
          toastPopup(`${el.getAttribute('href')}`);
          copyToClipboard(el.getAttribute('href'));
        }
        gb.toast = false;
      };
    })
  };
  const toastPopup = function(txt) {
    const toast = document.createElement('div');
    toast.classList.add('toast-popup');
    toast.innerHTML = `<span>${txt}</span><em>클립보드에 복사되었습니다.</em>`;

    const clone = toast.cloneNode(true);
    document.body.appendChild(clone);
    gsap.to(clone, {
      delay:1.2, 
      opacity:0, 
      duration:'0.3', 
      y:'-20%',
      onComplete : function(){
        document.body.removeChild(clone);
        gb.toast = true;
      }
    });
  };
  const init = () => {
    setGnb();
    introMotion();
    setPos();
    scrollReset();
    scrollGage();
    scrollMotion();
    axiosListUp();
    //check_();
    //pointerMotion();
    countRating();
    copyUrl();
  };

  return {
    init,
    isMob,
    scrollReset,
    scrollGage,
    animate,
    toggleTheme,
    countRating,
  };
}

const gb = new _gb();

window.addEventListener('load', () => {
  gb.CommonFunction().init();
  if (gb.CommonFunction().isMob()) {
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.normalizeScroll(true);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  gb.CommonFunction().toggleTheme();
});

window.addEventListener('resize', () => {
  if (gb.CommonFunction().isMob()) {
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.normalizeScroll(true);
  } else {
    gb.CommonFunction().scrollReset();
  }
});

window.addEventListener('orientationchange', () => {
  //ScrollTrigger.refresh(true);
  location.reload();
});

window.addEventListener('scroll', function () {
  gb.CommonFunction().animate();
  gb.title.forEach((el) => {
    const title_ = el.firstElementChild.children;
    if (el.getBoundingClientRect().top < gb.client_H) {
      for (let i in title_) {
        gsap.to(title_[i], {
          //x: 0,
          alpha: 1,
          //rotation: '720',
          y:0,
          duration: 0.2,
          delay: 0.03 * i,
          ease: 'expo.out'
        });
      }
    } else {
      for (let j in title_) {
        gsap.to(title_[j], {
          //x: 600,
          alpha: 0,
          //rotation: '-540',
          y:'-50%',
          duration: 0.2,
          delay: 0.03 * j,
          ease: 'expo.out'
        });
      }
    }
  });

  gb.scrollGage = document.querySelector('.scrollGage');
  gb.scrollGage.style.width = `${gb.CommonFunction().scrollGage()}%`;

  gb.CommonFunction().countRating();
});
