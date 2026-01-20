document.addEventListener('DOMContentLoaded', () => {
  // 1. Инициализация иконок Lucide
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // 2. Мобильное меню
  const burger = document.querySelector('.burger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav__link');

  const toggleMenu = () => {
      burger.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-active');
      document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : '';
  };

  burger.addEventListener('click', toggleMenu);
  mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

  // 3. Липкий хедер
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.style.padding = '12px 0';
          header.style.background = 'rgba(255, 255, 255, 0.95)';
          header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
      } else {
          header.style.padding = '20px 0';
          header.style.background = 'rgba(255, 255, 255, 0.8)';
          header.style.boxShadow = 'none';
      }
  });

  // 4. Intersection Observer для анимаций (reveal и Roadmap)
  const observerOptions = { threshold: 0.15 };
  const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
          }
      });
  }, observerOptions);

  document.querySelectorAll('.reveal, .roadmap__step').forEach(el => {
      revealObserver.observe(el);
  });

  // 5. Работа с формой контактов
  const form = document.getElementById('consultation-form');
  if (form) {
      const captchaQuestion = document.getElementById('captcha-question');
      const captchaInput = document.getElementById('captcha');
      const phoneInput = document.getElementById('phone');
      const successMessage = document.getElementById('form-success');

      let n1 = Math.floor(Math.random() * 10) + 1;
      let n2 = Math.floor(Math.random() * 10) + 1;
      let result = n1 + n2;
      captchaQuestion.textContent = `${n1} + ${n2} = ?`;

      phoneInput.addEventListener('input', (e) => {
          e.target.value = e.target.value.replace(/\D/g, '');
      });

      form.addEventListener('submit', (e) => {
          e.preventDefault();
          if (parseInt(captchaInput.value) !== result) {
              alert('Пожалуйста, решите математический пример правильно.');
              return;
          }

          const btn = form.querySelector('.form__submit');
          btn.textContent = 'Отправка...';
          btn.disabled = true;

          setTimeout(() => {
              form.reset();
              btn.style.display = 'none';
              successMessage.classList.add('show');
              setTimeout(() => {
                  successMessage.classList.remove('show');
                  btn.style.display = 'block';
                  btn.textContent = 'Запросить доступ';
                  btn.disabled = false;
              }, 5000);
          }, 1500);
      });
  }

  // 6. Cookie Popup
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptBtn = document.getElementById('accept-cookies');

  if (!localStorage.getItem('cookies-accepted')) {
      setTimeout(() => {
          cookiePopup.classList.add('is-show');
      }, 2000);
  }

  acceptBtn.addEventListener('click', () => {
      localStorage.setItem('cookies-accepted', 'true');
      cookiePopup.classList.remove('is-show');
  });
});