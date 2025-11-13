// small helpers for reveal animations
import { gsap } from 'gsap'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.mask-reveal').forEach(el => {
    setTimeout(() => el.classList.add('revealed'), 220)
  })
  // reveal cards
  document.querySelectorAll('.card').forEach((c,i) => {
    c.style.opacity = 0
    setTimeout(() => { c.style.transition = 'opacity 800ms var(--ease)'; c.style.opacity = 1 }, 220 + i*120)
  })
})
