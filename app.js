'use strict';

const headerBtn=document.getElementById('headerBtn')
const footer=document.getElementById('footer')
const info=document.getElementById('info')
const header=document.getElementById('header')
const nav=document.getElementById('nav')
const testimonials=[...document.getElementsByClassName('testimonials--item')];
const dots=[...document.getElementsByClassName('dot')];
const navLinks=document.getElementById('navLinks');
const menu=document.getElementById('menu')
const closed=document.getElementById('close');
const updates=document.getElementById('updates');
const go=document.getElementById('go');
const error=document.getElementById('error');

menu.addEventListener('click',function(e){
    menu.classList.add('hide')
    closed.classList.remove('hide')
    navLinks.classList.remove('hide')
    console.log(document.querySelector('body::before'));
   document.body.classList.add('blurred')
   info.classList.add('infoIndex')
 

})
closed.addEventListener('click',function(e){
     
    closed.classList.add('hide')
    menu.classList.remove('hide')
    navLinks.classList.add('hide')
      document.body.classList.remove('blurred')
         info.classList.remove('infoIndex')
})
go.addEventListener('click',function(e){
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(updates.value)){
        updates.classList.add('red')
        error.classList.remove('hide')
    }
    else { 
        updates.classList.remove('red')
           error.classList.add('hide')

    }
})
updates.addEventListener('keydown',function(e){
    updates.classList.remove('red')
})
testimonials.forEach((test,i)=>{
        test.style.transform=`translateX(${(i*100)}%)`;
        
    })
let index=-1;
const slider=function(){
 index++;
       if(index>=4)index=0
    testimonials.forEach((test,i)=>{
        test.style.transform=`translateX(${((i-index)*100)}%)`;
        if(i-index!==0)test.style.opacity='0';
        else test.style.opacity='1';
    })
    dots.forEach(dot=>{
        dot.classList.remove('active')
    })
    dots[index].classList.add('active')
}
slider()
const sliderInterval=setInterval(slider,5000)

headerBtn.addEventListener('click',function(e){
    const footerCoords=footer.getBoundingClientRect()
    const coords=e.target.getBoundingClientRect()
    
    window.scrollTo({
        left:footerCoords.left+window.scrollX,
        top:footerCoords.top+window.scrollY,
        behavior:"smooth"
    })
    
})


 const stickyNav=function(entries,observer){
const [entry]=entries;
if(!entry.isIntersecting){
    nav.classList.add('sticky')
}
else nav.classList.remove('sticky')

 }

const headerObserver=new IntersectionObserver(stickyNav,{
    root:null,
    threshold:0,
    rootMargin:'-50px'
})

headerObserver.observe(header)

const revealInfo=function(entries,observer){
const [entry]=entries
console.log(entry);
if(!entry.isIntersecting)return
entry.target.classList.remove('moveDown')
infoObserver.unobserve(entry.target)
}
const infoObserver=new IntersectionObserver(revealInfo,{
    root:null,
    threshold:0.3
})
infoObserver.observe(info)