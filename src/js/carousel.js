import { gsap } from 'gsap'

document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('carousel')
  if(!carousel) return

  // sample products (placeholder images in public/products)
  const products = [
    { id:1, title:"Lampada Smart", img:"/products/p1.webp", price:"R$89" },
    { id:2, title:"Caixa de Som", img:"/products/p2.webp", price:"R$199" },
    { id:3, title:"Relógio Fitness", img:"/products/p3.webp", price:"R$299" },
    { id:4, title:"Câmera 360", img:"/products/p4.webp", price:"R$449" },
    { id:5, title:"Fone Wireless", img:"/products/p5.webp", price:"R$129" }
  ]

  // ensure some sample images exist (placeholders)
  products.forEach((p,i) => {
    const item = document.createElement('div')
    item.className = 'carousel-item'
    item.style.zIndex = 100 - i
    item.innerHTML = `<img src="${p.img}" alt="${p.title}"><h4>${p.title}</h4><p class="price">${p.price}</p>`
    carousel.appendChild(item)
  })

  const items = Array.from(carousel.children)
  const radius = 420
  let angle = 0

  function positionItems(){
    const count = items.length
    items.forEach((it, idx) => {
      const a = (idx / count) * Math.PI * 2 + angle
      const x = Math.cos(a) * radius * 0.6
      const z = Math.sin(a) * 200
      const y = Math.sin(a * 0.5) * 20
      it.style.transform = `translateX(${x}px) translateZ(${z}px) translateY(${y}px) rotateY(${a}rad)`
      it.style.opacity = 0.95
      it.style.left = `calc(50% - 120px)`
    })
  }

  positionItems()

  // auto rotate
  const rotationObj = { angle: 0 }
  gsap.to(rotationObj, { 
    angle: Math.PI * 2, 
    duration: 18, 
    repeat: -1, 
    ease: "linear", 
    onUpdate: function() {
      angle = rotationObj.angle
      positionItems()
    }
  })
  // basic drag to rotate (mouse)
  let isDown = false, startX=0, startAngle=angle
  carousel.addEventListener('pointerdown', (e) => { isDown = true; startX = e.clientX; startAngle = angle; carousel.setPointerCapture(e.pointerId) })
  carousel.addEventListener('pointermove', (e) => { if(!isDown) return; const dx = (e.clientX - startX); angle = startAngle + dx * 0.01; positionItems() })
  carousel.addEventListener('pointerup', (e) => { isDown = false; carousel.releasePointerCapture(e.pointerId) })
})
