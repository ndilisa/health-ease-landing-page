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
   sr.reveal('.team__filters')
   sr.reveal('.team__card', { interval: 100 })
   sr.reveal('.events__stats li', { interval: 150 })
   sr.reveal('.contact__map', { origin: 'left' })
   sr.reveal('.contact__info', { origin: 'right', interval: 150 })
   sr.reveal('.appointment__container, .footer__container')
}


/*=============== DARK / LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-toggle')
const root = document.documentElement

const applyTheme = (theme) => {
   root.dataset.theme = theme
   const isDark = theme === 'dark'
   themeButton.innerHTML = `<i class="${isDark ? 'ri-sun-line' : 'ri-moon-line'}"></i>`
   themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme')
}
applyTheme(root.dataset.theme || 'light')

themeButton.addEventListener('click', () => {
   const next = root.dataset.theme === 'dark' ? 'light' : 'dark'
   applyTheme(next)
   try { localStorage.setItem('theme', next) } catch (e) { /* storage unavailable */ }
})

/*=============== TEAM FILTER ===============*/
const filterButtons = document.querySelectorAll('.team__filter')
const teamCards = document.querySelectorAll('.team__card')

filterButtons.forEach(btn => btn.addEventListener('click', () => {
   filterButtons.forEach(b => b.classList.remove('active-filter'))
   btn.classList.add('active-filter')
   const filter = btn.dataset.filter
   teamCards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.role !== filter })
}))

/*=============== BOOKING FORM ===============*/
const bookingForm = document.getElementById('booking-form')
const bookingDoctor = document.getElementById('booking-doctor')
const bookingDate = document.getElementById('booking-date')
const WHATSAPP_NUMBER = '27110000000' // replace with your real number

// No past dates
bookingDate.min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[0]

// "Book" buttons on the team cards pre-select that person
document.querySelectorAll('[data-doctor]').forEach(btn =>
   btn.addEventListener('click', () => { bookingDoctor.value = btn.dataset.doctor }))

bookingForm.addEventListener('submit', (e) => {
   e.preventDefault()
   const f = new FormData(bookingForm)
   const date = new Date(f.get('date') + 'T00:00').toLocaleDateString('en-ZA',
      { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
   const message = [
      'Hello Health Ease! I would like to book an appointment.',
      `Name: ${f.get('name')}`,
      `Phone: ${f.get('phone')}`,
      `Service: ${f.get('service')}`,
      `Doctor: ${f.get('doctor')}`,
      `Date: ${date}`,
      `Time: ${f.get('time')}`
   ].join('\n')
   window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`, '_blank', 'noopener')
})
