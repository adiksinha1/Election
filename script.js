const steps = [
  {
    title: 'Registration and eligibility',
    summary: 'Voters confirm they are eligible and complete registration before the deadline.',
    detail: 'This stage makes sure the voter list is accurate. In many places, this happens weeks or months before election day.'
  },
  {
    title: 'Nominations and campaigns',
    summary: 'Candidates are announced and share their ideas with the public.',
    detail: 'Campaigns help voters compare priorities, promises, and plans so they can make an informed choice.'
  },
  {
    title: 'Voting day',
    summary: 'People cast ballots in person, by mail, or through approved early voting methods.',
    detail: 'Polling places follow local procedures, and voters usually need to bring the required identification or documents.'
  },
  {
    title: 'Counting and verification',
    summary: 'Ballots are counted and checked to ensure the results are accurate.',
    detail: 'Officials may verify signatures, process mail ballots, and resolve irregularities before announcing final totals.'
  },
  {
    title: 'Results and transition',
    summary: 'The winner is declared and the transition to the next term begins.',
    detail: 'Some results are immediate, while others take time if there are recounts, legal checks, or multiple ballot types.'
  }
];

const timelineTemplate = [
  {
    label: '90+ days before',
    title: 'Voter registration opens',
    text: 'Check your eligibility, update your details, and watch for any registration deadlines.'
  },
  {
    label: '45-60 days before',
    title: 'Campaign and ballot details',
    text: 'Candidates present their platforms while officials finalize ballot information and polling logistics.'
  },
  {
    label: 'Election week',
    title: 'Voting period and final reminders',
    text: 'Confirm your polling place, review voting rules, and make sure you know how and when to vote.'
  },
  {
    label: 'After voting',
    title: 'Counting and official results',
    text: 'Votes are tallied, verified, and certified. Final results may come after audits or recounts.'
  }
];

const faqData = [
  {
    question: 'Why do election timelines vary?',
    answer: 'Because each country, state, or local authority sets its own rules for registration, early voting, and result certification.'
  },
  {
    question: 'What should voters check first?',
    answer: 'Start with eligibility, registration status, voting location, accepted ID, and the exact deadlines in your area.'
  },
  {
    question: 'Why can results take time?',
    answer: 'Mail ballots, verification steps, recounts, and legal processes can extend the final announcement after election day.'
  },
  {
    question: 'Is this guide country-specific?',
    answer: 'No. It gives a general overview. For exact rules, always use your official election website or local election office.'
  }
];

const promptAnswers = {
  'What is the election process?': 'The election process usually begins with registration, followed by nominations and campaigning, then voting, counting, and finally the announcement of results.',
  'How do I prepare?': 'Check your registration early, find your polling place, learn the voting method in your area, and make a note of every deadline.',
  'When are results announced?': 'Some results appear quickly, but official results may take longer because ballots still need to be counted, reviewed, and certified.',
  'What is early voting?': 'Early voting lets eligible voters cast a ballot before election day, depending on local rules and available voting methods.'
};

const stepsGrid = document.getElementById('stepsGrid');
const timelineCards = document.getElementById('timelineCards');
const faqList = document.getElementById('faqList');
const quickPrompts = document.getElementById('quickPrompts');
const chatWindow = document.getElementById('chatWindow');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const electionDate = document.getElementById('electionDate');
const buildTimeline = document.getElementById('buildTimeline');
const timelineFill = document.getElementById('timelineFill');
const jumpTimeline = document.getElementById('jumpTimeline');
const focusTitle = document.getElementById('focusTitle');
const focusText = document.getElementById('focusText');
const insightTitle = document.getElementById('insightTitle');
const insightText = document.getElementById('insightText');

const formatDate = (date) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  return new Intl.DateTimeFormat(undefined, options).format(date);
};

const addMessage = (type, title, text) => {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${type}`;
  bubble.innerHTML = `<small>${title}</small><strong>${text}</strong>`;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
};

const renderSteps = () => {
  stepsGrid.innerHTML = '';
  steps.forEach((step, index) => {
    const card = document.createElement('article');
    card.className = `steps-card ${index === 0 ? 'active' : ''}`;
    card.innerHTML = `
      <div class="step-number">0${index + 1}</div>
      <h4>${step.title}</h4>
      <p>${step.summary}</p>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.steps-card').forEach((el) => el.classList.remove('active'));
      card.classList.add('active');
      focusTitle.textContent = step.title;
      focusText.textContent = step.detail;
      insightTitle.textContent = step.title;
      insightText.textContent = step.detail;
    });

    stepsGrid.appendChild(card);
  });
};

const renderTimeline = (dateValue) => {
  const election = dateValue ? new Date(dateValue) : new Date();
  election.setHours(0, 0, 0, 0);

  timelineCards.innerHTML = '';
  const labels = [90, 55, 7, 0];

  timelineTemplate.forEach((item, index) => {
    const card = document.createElement('article');
    const offsetDays = labels[index];
    const date = new Date(election);
    date.setDate(election.getDate() - offsetDays);

    card.className = 'timeline-card';
    card.innerHTML = `
      <span class="date">${index === 3 ? 'On election day' : `${item.label} • ${formatDate(date)}`}</span>
      <h4>${item.title}</h4>
      <p>${item.text}</p>
    `;
    timelineCards.appendChild(card);
  });

  timelineFill.style.transform = 'scaleX(1)';
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

const renderPrompts = () => {
  Object.keys(promptAnswers).forEach((prompt) => {
    const chip = document.createElement('button');
    chip.className = 'prompt-chip';
    chip.type = 'button';
    chip.textContent = prompt;
    chip.addEventListener('click', () => {
      addMessage('user', 'You asked', prompt);
      addMessage('assistant', 'Assistant', promptAnswers[prompt]);
    });
    quickPrompts.appendChild(chip);
  });
};

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const query = chatInput.value.trim();
  if (!query) return;

  addMessage('user', 'You asked', query);

  const lower = query.toLowerCase();
  let reply = 'I can help with registration, voting day, timelines, and results. Try asking about any of those topics.';

  if (lower.includes('register')) reply = 'Registration makes sure you are eligible to vote. In many places, it must be completed before a deadline that is earlier than election day.';
  else if (lower.includes('vote')) reply = 'Voting is the stage when eligible people cast their ballot, either in person, by mail, or through another approved method.';
  else if (lower.includes('result')) reply = 'Results are announced after ballots are counted and verified. Some areas publish quick updates, but final certification can take longer.';
  else if (lower.includes('timeline') || lower.includes('date')) reply = 'A typical timeline includes registration, campaign activity, voting day, counting, and certification of the final results.';
  else if (lower.includes('early')) reply = 'Early voting gives eligible voters a chance to cast a ballot before election day, depending on local rules.';

  setTimeout(() => addMessage('assistant', 'Assistant', reply), 250);
  chatInput.value = '';
});

buildTimeline.addEventListener('click', () => renderTimeline(electionDate.value));
jumpTimeline.addEventListener('click', () => {
  document.getElementById('timeline').scrollIntoView({ behavior: 'smooth' });
});

const today = new Date();
today.setDate(today.getDate() + 30);
electionDate.valueAsDate = today;

renderSteps();
renderTimeline(electionDate.value);
renderFaq();
renderPrompts();
addMessage('assistant', 'Assistant', 'Hello! I can explain how elections work, what happens on the timeline, and which steps matter most.');
addMessage('assistant', 'Assistant', 'Try one of the quick prompts, or type your own question below.');
