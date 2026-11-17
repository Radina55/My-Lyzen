// Vanilla JavaScript interactions for the converted portfolio.
const root = document.documentElement;
const themeButton = document.getElementById('themeToggle');
const menuButton = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');

// Restore saved theme, or use the operating-system preference.
const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
if (savedTheme === 'dark' || (!savedTheme && systemDark)) root.classList.add('dark');
function updateThemeIcon(){ themeButton.innerHTML = root.classList.contains('dark') ? '☾' : '☼'; }
updateThemeIcon();
themeButton.addEventListener('click', () => {
  root.classList.toggle('dark');
  localStorage.setItem('theme', root.classList.contains('dark') ? 'dark' : 'light');
  updateThemeIcon();
});

menuButton.addEventListener('click', () => mobileNav.classList.toggle('open'));
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => mobileNav.classList.remove('open')));
document.addEventListener('click', event => {
  if (!mobileNav.contains(event.target) && !menuButton.contains(event.target)) mobileNav.classList.remove('open');
});

// Typing/deleting headline effect from the original hero section.
const roles = ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'];
const typedRole = document.getElementById('typedRole');
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole(){
  const current = roles[roleIndex];
  typedRole.textContent = current.slice(0, charIndex);
  if (!deleting && charIndex < current.length) { charIndex++; setTimeout(typeRole, 150); }
  else if (!deleting) { deleting = true; setTimeout(typeRole, 1000); }
  else if (charIndex > 0) { charIndex--; setTimeout(typeRole, 75); }
  else { deleting = false; roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 300); }
}
typeRole();

// Scroll reveal approximates the original Framer Motion fade components.
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -45px 0px' });
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach((el, index) => {
  el.style.transitionDelay = `${Math.min(index % 5, 4) * 65}ms`;
  revealObserver.observe(el);
});

// Highlight the current navigation section while scrolling.
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.desktop-nav a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

document.getElementById('year').textContent = new Date().getFullYear();
window.addEventListener('load', () => {
  const loader = document.getElementById('pageLoader');
  setTimeout(() => { loader.classList.add('hide'); document.body.style.overflow = ''; }, 2000);
});
document.body.style.overflow = 'hidden';
