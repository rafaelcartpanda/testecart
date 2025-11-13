import * as THREE from 'three'
import { gsap } from 'gsap'

let scene, camera, renderer, pandaGroup, head, leftEye, rightEye

function init() {
  const mount = document.getElementById('panda-mount')
  if (!mount) {
    console.error('Elemento panda-mount não encontrado')
    return
  }
  
  // renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
  renderer.setSize(mount.clientWidth, mount.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  mount.appendChild(renderer.domElement)

  // scene & camera
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(35, mount.clientWidth / mount.clientHeight, 0.1, 100)
  camera.position.set(0, 0.8, 3)

  // lights
  const amb = new THREE.AmbientLight(0xffffff, 0.7)
  const dir = new THREE.DirectionalLight(0xffffff, 0.6)
  dir.position.set(5, 10, 7)
  scene.add(amb, dir)

  // panda group
  pandaGroup = new THREE.Group()
  scene.add(pandaGroup)

  // body
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6, metalness: 0.05 })
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x0b0b0b, roughness: 0.6 })

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.85, 32, 32), bodyMat)
  body.scale.set(1, 1.1, 0.9)
  body.position.y = -0.6
  pandaGroup.add(body)

  // head
  head = new THREE.Mesh(new THREE.SphereGeometry(0.6, 32, 32), bodyMat)
  head.position.y = 0.25
  pandaGroup.add(head)

  // ears
  const earL = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), blackMat)
  earL.position.set(-0.45, 0.9, 0)
  pandaGroup.add(earL)
  const earR = earL.clone()
  earR.position.x = 0.45
  pandaGroup.add(earR)

  // eye patches
  const patchGeom = new THREE.SphereGeometry(0.25, 24, 24)
  const patchL = new THREE.Mesh(patchGeom, blackMat)
  patchL.position.set(-0.22, 0.25, 0.5)
  patchL.scale.set(1.2, 0.9, 0.6)
  pandaGroup.add(patchL)
  const patchR = patchL.clone()
  patchR.position.x = 0.22
  pandaGroup.add(patchR)

  // eyes (white sclera)
  const eyeWhiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 })
  leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), eyeWhiteMat)
  leftEye.position.set(-0.22, 0.28, 0.7)
  pandaGroup.add(leftEye)
  rightEye = leftEye.clone()
  rightEye.position.x = 0.22
  pandaGroup.add(rightEye)

  // pupils (small dark spheres on top of whites)
  const pupilMat = new THREE.MeshStandardMaterial({ color: 0x001018, metalness: 0.2 })
  const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), pupilMat)
  pupilL.position.set(-0.22, 0.28, 0.78)
  pandaGroup.add(pupilL)
  const pupilR = pupilL.clone()
  pupilR.position.x = 0.22
  pandaGroup.add(pupilR)

  // LED collar
  const collar = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.06, 16, 100), new THREE.MeshStandardMaterial({ color: 0x00d1ff, emissive: 0x00a9d9, emissiveIntensity: 0.2 }))
  collar.position.y = -0.2
  collar.rotation.x = Math.PI / 2
  pandaGroup.add(collar)

  // subtle ground shadow (fake)
  const shadowGeom = new THREE.PlaneGeometry(3.2, 2.2)
  const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.16 })
  const shadow = new THREE.Mesh(shadowGeom, shadowMat)
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = -1.4
  scene.add(shadow)

  // initial entrance animation
  pandaGroup.position.y = -3
  gsap.to(pandaGroup.position, { y: -0.3, duration: 2.2, ease: "power4.out" })
  gsap.to(pandaGroup.rotation, { x: 0.02, y: 0.04, duration: 1.6, yoyo: true, repeat: 1 })

  // breathing
  gsap.to(head.scale, { x: 1.02, y: 1.02, z:1.02, duration: 1.4, yoyo:true, repeat:-1, ease:"sine.inOut" })

  // idle blink
  setInterval(() => {
    gsap.to([leftEye.scale, rightEye.scale], { y: 0.2, duration: 0.08, yoyo:true, repeat:1 })
  }, 6000 + Math.random()*4000)

  // interaction handlers: follow mouse
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize', onWindowResize)
  onWindowResize()
  animate()
}

function onMouseMove(e){
  if(!head) return
  const x = (e.clientX / window.innerWidth - 0.5) * 2
  const y = (e.clientY / window.innerHeight - 0.5) * 2
  // rotate head group smoothly
  gsap.to(pandaGroup.rotation, { y: x * 0.25, x: -y * 0.12, duration: 0.6, ease: "power2.out" })
  // move pupils slightly by adjusting positions
  gsap.to(leftEye.position, { x: -0.22 + x * 0.03, y: 0.28 - y * 0.02, duration: 0.25 })
  gsap.to(rightEye.position, { x: 0.22 + x * 0.03, y: 0.28 - y * 0.02, duration: 0.25 })
}

function onWindowResize(){
  const mount = document.getElementById('panda-mount')
  if(!mount || !camera || !renderer) return
  const w = mount.clientWidth; const h = mount.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

function animate(){
  if (!renderer || !scene || !camera) return
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

window.addEventListener('DOMContentLoaded', () => {
  // wait for mount element to exist
  const check = setInterval(() => {
    if(document.getElementById('panda-mount')) {
      clearInterval(check)
      try {
        init()
      } catch (error) {
        console.error('Erro ao inicializar o panda:', error)
      }
    }
  }, 80)
  
  // timeout safety: stop checking after 5 seconds
  setTimeout(() => {
    clearInterval(check)
  }, 5000)
})
