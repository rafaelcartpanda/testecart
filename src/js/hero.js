import { gsap } from 'gsap'

// video fallback: if video can't play, show fallback image
document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('hero-video')
  const fallback = document.querySelector('.hero-fallback')
  if(video){
    video.addEventListener('error', () => {
      video.style.display = 'none'
      fallback.style.opacity = '1'
    })
    // optimize: don't load video until user interacts or window focused
    let loaded = false
    function tryLoad(){
      if(loaded) return
      video.load()
      loaded = true
      window.removeEventListener('mousemove', tryLoad)
      window.removeEventListener('touchstart', tryLoad)
    }
    window.addEventListener('mousemove', tryLoad, {passive:true})
    window.addEventListener('touchstart', tryLoad, {passive:true})
  }

  // when user starts scrolling, move panda to bottom-right
  let scrolled = false
  window.addEventListener('scroll', () => {
    if(!scrolled && window.scrollY > 80){
      scrolled = true
      const mount = document.getElementById('panda-mount')
      if(mount){
        gsap.to(mount, { x: window.innerWidth*0.22, y: window.innerHeight*0.18, duration: 1.2, ease: "power2.inOut", onUpdate: () => {
          mount.style.transform = `translate(${gsap.getProperty(mount,'x')}px, ${gsap.getProperty(mount,'y')}px)`;
        }})
        // reduce size
        gsap.to(mount, { width: 260, height:260, duration: 1.2, ease: "power2.inOut" })
      }
    }
  }, {passive:true})
})
