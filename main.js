/*=============== SHOW & CLOSE MENU ===============*/
const navMenu = document.getElementById('nav-menu')
document.getElementById('nav-toggle').addEventListener('click', () => navMenu.classList.add('show-menu'))
document.getElementById('nav-close').addEventListener('click', () => navMenu.classList.remove('show-menu'))
document.querySelectorAll('.nav__link').forEach(l =>
   l.addEventListener('click', () => navMenu.classList.remove('show-menu')))

/*=============== HEADER, SCROLL UP & ACTIVE LINK ===============*/
const header = document.getElementById('header')
const scrollUp = document.getElementById('scroll-up')
const sections = document.querySelectorAll('section[id]')

const onScroll = () => {
   const y = window.scrollY
   header.classList.toggle('scroll-header', y >= 50)
   scrollUp.classList.toggle('show-scroll', y >= 350)

   sections.forEach(section => {
      const top = section.offsetTop - 100
      const link = document.querySelector(`.nav__menu a[href="#${section.id}"]`)
      if (link) link.classList.toggle('active-link', y > top && y <= top + section.offsetHeight)
   })
}
window.addEventListener('scroll', onScroll)
onScroll()

/*=============== SCROLL REVEAL ===============*/
if (typeof ScrollReveal !== 'undefined') {
   const sr = ScrollReveal({ origin: 'bottom', distance: '50px', duration: 1200, delay: 200 })

   sr.reveal('.home__data, .about__data, .events__data')
   sr.reveal('.home__visual, .about__visual', { origin: 'right', delay: 400 })
   sr.reveal('.services__header')
   sr.reveal('.services__card', { interval: 150 })
   sr.reveal('.events__stats li', { interval: 150 })
   sr.reveal('.contact__map', { origin: 'left' })
   sr.reveal('.contact__info', { origin: 'right', interval: 150 })
   sr.reveal('.appointment__container, .footer__container')
}
