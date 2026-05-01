const services = [
  {
    title: 'Voter ID verification',
    tag: 'Verify',
    summary: 'Check whether your name is present in the electoral roll and confirm your identity details early.',
    bullets: ['Search by voter ID or personal details', 'Review registration status before deadlines', 'Avoid last-minute issues on voting day'],
    cta: 'Open timeline',
    focus: 'Confirm your voter details',
    focusText: 'Check your status early so you have time to resolve missing or incorrect information before election day.'
  },
  {
    title: 'Registration support',
    tag: 'Register',
    summary: 'Apply or update your voter information if you have recently moved or become eligible.',
    bullets: ['New registration guidance', 'Address update reminders', 'Deadlines and required documents'],
    cta: 'Start learning',
    focus: 'Prepare your registration',
    focusText: 'Keep your details current so the voting process stays simple and predictable.'
  },
  {
    title: 'Polling station info',
    tag: 'Locate',
    summary: 'Find the correct polling station and officer details to make voting day easier.',
    bullets: ['View your assigned location', 'Check local officer contact details', 'Plan travel before voting day'],
    cta: 'View FAQs',
    focus: 'Know where to go',
    focusText: 'A clear polling location saves time and helps voters arrive prepared.'
  },
  {
    title: 'Election schedule',
    tag: 'Timeline',
    summary: 'Review the voting, counting, and result stages in a clean, easy-to-follow sequence.',
    bullets: ['Estimate important dates', 'Track preparation milestones', 'Understand how results are finalized'],
    cta: 'Build timeline',
    focus: 'Plan important dates',
    focusText: 'A simple schedule makes the entire election journey easier to understand.'
  }
];

const learningCards = [
  {
    title: 'Guided modules',
    summary: 'Short, visual explanations that make civic information easier to digest for first-time visitors.'
  },
  {
    title: 'Instant help',
    summary: 'Quick answers that explain common terms, processes, and deadlines in plain language.'
  },
  {
    title: 'Step-by-step flow',
    summary: 'A structured sequence from registration through results, with clear visual emphasis.'
  },
  {
    title: 'Interactive practice',
    summary: 'A quiz-style approach that helps users check their understanding before voting day.'
  }
];

const faqData = [
  {
    question: 'Why do election details change by location?',
    answer: 'Because each region sets its own rules for registration, voting methods, and result certification.'
  },
  {
    question: 'What should I check first?',
    answer: 'Start with eligibility, registration status, voting location, and local deadlines.'
  },
  {
    question: 'Why can results take time?',
    answer: 'Ballots may need to be verified, counted, audited, or certified before the final announcement.'
  },
  {
    question: 'Can I use this portal as an official source?',
    answer: 'No. This is a demo interface. Always confirm important details with the official election authority in your area.'
  }
];

const timelineItems = [
  { offset: 90, label: 'Registration window', title: 'Prepare and update details', text: 'Review your voter information, update your address, and watch for registration deadlines.' },
  { offset: 45, label: 'Pre-election phase', title: 'Campaign and notice period', text: 'Candidates share updates while election notices and station details are finalized.' },
  { offset: 7, label: 'Final week', title: 'Last checks and reminders', text: 'Confirm your polling place, ID requirements, and any special instructions.' },
  { offset: 0, label: 'Election day', title: 'Cast your vote', text: 'Follow local guidance, vote at the assigned location or by approved method, and keep the receipt if needed.' },
  { offset: -10, label: 'After voting', title: 'Counting and verification', text: 'Ballots are counted, checked, and certified before the final results are announced.' }
];

const serviceGrid = document.getElementById('serviceGrid');
const learningGrid = document.getElementById('learningGrid');
const faqList = document.getElementById('faqList');
const timelineCards = document.getElementById('timelineCards');
const statValues = Array.from(document.querySelectorAll('.stat-card strong'));
const electionDate = document.getElementById('electionDate');
const buildTimeline = document.getElementById('buildTimeline');
const timelineFill = document.getElementById('timelineFill');
const scrollTools = document.getElementById('scrollTools');
const backTop = document.getElementById('backTop');
const scrollProgress = document.getElementById('scrollProgress');
const focusTitle = document.getElementById('focusTitle');
const focusText = document.getElementById('focusText');
const serviceTitle = document.getElementById('serviceTitle');
const serviceSummary = document.getElementById('serviceSummary');
const serviceBullets = document.getElementById('serviceBullets');
const serviceCta = document.getElementById('serviceCta');
const navLinks = Array.from(document.querySelectorAll('.topnav a'));
const sectionIds = ['home', 'verify', 'learn', 'timeline', 'faq'];
const revealTargets = [
  '.hero-copy',
  '.hero-panel',
  '.section-heading',
  '.resource-card',
  '.service-card',
  '.learning-card',
  '.timeline-card',
  '.faq-item',
  '.contact-card',
  '.stat-card',
  '.dashboard-card'
];

const formatDate = (date) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Intl.DateTimeFormat(undefined, options).format(date);
};

const setHeroFocus = (title, text) => {
  focusTitle.textContent = title;
  focusText.textContent = text;
};

const setService = (service, index) => {
  document.querySelectorAll('.service-card').forEach((card, cardIndex) => {
    card.classList.toggle('active', cardIndex === index);
  });

  serviceTitle.textContent = service.title;
  serviceSummary.textContent = service.summary;
  serviceBullets.innerHTML = '';

  service.bullets.forEach((bullet) => {
    const li = document.createElement('li');
    li.textContent = bullet;
    serviceBullets.appendChild(li);
  });

  serviceCta.textContent = service.cta;
  serviceCta.href = service.cta === 'Build timeline' ? '#timeline' : '#learn';
  setHeroFocus(service.focus, service.focusText);
};

const renderServices = () => {
  serviceGrid.innerHTML = '';
  services.forEach((service, index) => {
    const card = document.createElement('article');
    card.className = `service-card ${index === 0 ? 'active' : ''}`;
    card.innerHTML = `
      <span class="card-tag">${service.tag}</span>
      <h4>${service.title}</h4>
      <p>${service.summary}</p>
    `;
    card.addEventListener('click', () => setService(service, index));
    serviceGrid.appendChild(card);
  });

  setService(services[0], 0);
};

const renderLearning = () => {
  learningGrid.innerHTML = '';
  learningCards.forEach((cardInfo, index) => {
    const card = document.createElement('article');
    card.className = `learning-card ${index === 0 ? 'active' : ''}`;
    card.innerHTML = `
      <span class="card-tag">Module 0${index + 1}</span>
      <h4>${cardInfo.title}</h4>
      <p>${cardInfo.summary}</p>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.learning-card').forEach((el, elIndex) => {
        el.classList.toggle('active', elIndex === index);
      });
      setHeroFocus(cardInfo.title, cardInfo.summary);
    });

    learningGrid.appendChild(card);
  });
};

const animateCounters = () => {
  const targets = ['04', 'Live', 'Fast'];

  statValues.forEach((node, index) => {
    const target = targets[index];
    if (!target) return;

    node.textContent = target;
    node.classList.add('reveal');
    setTimeout(() => node.classList.remove('reveal'), 700);
  });
};

const renderFaq = () => {
  faqList.innerHTML = '';

  faqData.forEach((item, index) => {
    const faqItem = document.createElement('div');
    faqItem.className = 'faq-item';
    faqItem.innerHTML = `
      <button class="faq-question" type="button" aria-expanded="false">
        <span>${item.question}</span>
        <div class="faq-icon">+</div>
      </button>
      <p class="faq-body">${item.answer}</p>
    `;

    const button = faqItem.querySelector('.faq-question');
    const body = faqItem.querySelector('.faq-body');

    button.addEventListener('click', () => {
      const open = faqItem.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      body.style.maxHeight = open ? `${body.scrollHeight}px` : '0px';
    });

    if (index === 0) {
      faqItem.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      window.requestAnimationFrame(() => {
        body.style.maxHeight = `${body.scrollHeight}px`;
      });
    }

    faqList.appendChild(faqItem);
  });
};

const renderTimeline = (dateValue) => {
  const election = dateValue ? new Date(dateValue) : new Date();
  election.setHours(0, 0, 0, 0);

  timelineCards.innerHTML = '';

  timelineItems.forEach((item) => {
    const card = document.createElement('article');
    const date = new Date(election);
    date.setDate(election.getDate() - item.offset);

    card.className = 'timeline-card';
    card.innerHTML = `
      <span class="date">${item.label} • ${item.offset === 0 ? 'On election day' : formatDate(date)}</span>
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    `;
    timelineCards.appendChild(card);
  });

  timelineFill.style.transform = 'scaleX(0.2)';
  window.requestAnimationFrame(() => {
    timelineFill.style.transform = 'scaleX(1)';
  });
};

const updateActiveNav = (activeId) => {
  navLinks.forEach((link) => {
    const active = link.getAttribute('href') === `#${activeId}`;
    link.classList.toggle('active', active);
    if (active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
};

const setupObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        updateActiveNav(visible[0].target.id);
      }
    },
    {
      threshold: [0.35, 0.55, 0.75],
      rootMargin: '-90px 0px -35% 0px'
    }
  );

  sectionIds.forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
};

const setupRevealObserver = () => {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealTargets.forEach((selector) => {
    document.querySelectorAll(selector).forEach((el) => revealObserver.observe(el));
  });
};

const updateScrollProgress = () => {
  const doc = document.documentElement;
  const maxScroll = doc.scrollHeight - doc.clientHeight;
  const progress = maxScroll > 0 ? doc.scrollTop / maxScroll : 0;
  scrollProgress.style.transform = `scaleX(${progress})`;
};

const revealOnHover = (selector) => {
  document.querySelectorAll(selector).forEach((item) => {
    item.addEventListener('mouseenter', () => item.classList.add('reveal'));
    item.addEventListener('animationend', () => item.classList.remove('reveal'));
  });
};

scrollTools.addEventListener('click', () => {
  document.getElementById('verify').scrollIntoView({ behavior: 'smooth' });
});

buildTimeline.addEventListener('click', () => {
  renderTimeline(electionDate.value);
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  backTop.classList.toggle('show', window.scrollY > 260);
  updateScrollProgress();
});

const today = new Date();
today.setDate(today.getDate() + 30);
electionDate.valueAsDate = today;

renderServices();
renderLearning();
renderFaq();
renderTimeline(electionDate.value);
setupObserver();
setupRevealObserver();
animateCounters();
revealOnHover('.service-card, .learning-card, .timeline-card, .faq-item, .stat-card');
updateActiveNav('home');
updateScrollProgress();
