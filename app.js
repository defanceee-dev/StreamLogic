
const APP_PAGES = {
  'dashboard.html': 'dashboard',
  'leads.html': 'leads',
  'profile.html': 'profile',
  'integrations.html': 'integrations',
  'billing.html': 'billing',
  'settings.html': 'settings'
};

const leadSeed = [
  { channel: 'DefanceTV', niche: 'GTA RP', source: 'Landing form', status: 'new', viewers: 118, createdAt: '2026-03-28 12:20', note: 'Хочет понять, как поднять CTR на превью.' },
  { channel: 'AstraLive', niche: 'Just Chatting', source: 'Twitch OAuth', status: 'qualified', viewers: 64, createdAt: '2026-03-28 11:35', note: 'Нужен план роста до Partner за 60 дней.' },
  { channel: 'RaidBox', niche: 'Shooter', source: 'Manual', status: 'contacted', viewers: 203, createdAt: '2026-03-27 21:10', note: 'Хочет консультацию по удержанию в первые 10 минут.' },
  { channel: 'PixelMila', niche: 'Cozy streams', source: 'Landing form', status: 'proposal', viewers: 37, createdAt: '2026-03-27 19:05', note: 'Интересует AI-план и трекинг недельных гипотез.' },
  { channel: 'HardRushUA', niche: 'Warzone', source: 'Referral', status: 'won', viewers: 154, createdAt: '2026-03-26 16:50', note: 'Готов взять Growth Plan и weekly review.' },
  { channel: 'NightHost', niche: 'Horror', source: 'Landing form', status: 'lost', viewers: 22, createdAt: '2026-03-25 20:40', note: 'Сейчас заморозил проект, вернется позже.' }
];

const pageMeta = {
  dashboard: {
    title: 'Dashboard',
    text: 'Главная точка управления StreamLogic: ключевые метрики, активность, быстрые действия и фокус на ближайший рост.'
  },
  leads: {
    title: 'Leads',
    text: 'Все заявки и потенциальные клиенты в одном месте: фильтры, статусы, заметки и быстрый просмотр без CRM.'
  },
  profile: {
    title: 'Profile',
    text: 'Информация об аккаунте, текущем тарифе, приоритетах по росту и личных настройках рабочего пространства.'
  },
  integrations: {
    title: 'Integrations',
    text: 'Подключения к Twitch, Discord, Telegram и будущим источникам данных для автосбора аналитики и уведомлений.'
  },
  billing: {
    title: 'Billing',
    text: 'Текущий план, лимиты, дата продления и действия по апгрейду для работы с платными пользователями.'
  },
  settings: {
    title: 'Settings',
    text: 'Глобальные параметры кабинета: безопасность, уведомления, отображение данных и системные переключатели.'
  }
};

function getUser() {
  try {
    const raw = localStorage.getItem('streamlogic_user');
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return {
    name: 'Demo User',
    email: 'demo@streamlogic.local',
    plan: 'Starter'
  };
}

function getToken() {
  return localStorage.getItem('streamlogic_token');
}

function ensureAuth() {
  const current = location.pathname.split('/').pop() || 'dashboard.html';
  if (!getToken()) {
    location.href = './index.html';
    return false;
  }
  return current;
}

function getLeads() {
  try {
    const raw = localStorage.getItem('streamlogic_leads');
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  localStorage.setItem('streamlogic_leads', JSON.stringify(leadSeed));
  return leadSeed;
}

function saveLeads(leads) {
  localStorage.setItem('streamlogic_leads', JSON.stringify(leads));
}

function statusLabel(status) {
  const map = {
    new: ['Новый', 'warning'],
    qualified: ['Квалифицирован', 'success'],
    contacted: ['В контакте', 'warning'],
    proposal: ['Оффер', 'warning'],
    won: ['Оплачен', 'success'],
    lost: ['Потерян', 'danger']
  };
  return map[status] || [status, ''];
}

function initials(name='U') {
  return name.split(' ').map(p => p[0]).join('').slice(0,2).toUpperCase();
}

function appFrame(active) {
  const user = getUser();
  const nav = [
    ['dashboard.html', 'dashboard', 'Dashboard', `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 13h7V4H4v9Zm0 7h7v-5H4v5Zm9 0h7V11h-7v9Zm0-16v5h7V4h-7Z" fill="currentColor"/></svg>`],
    ['leads.html', 'leads', 'Leads', `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6a2 2 0 0 1 2-2h6l2 2h4a2 2 0 0 1 2 2v1H4V6Zm0 4h16v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8Z" fill="currentColor"/></svg>`],
    ['profile.html', 'profile', 'Profile', `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 1 1 14 0H5Z" fill="currentColor"/></svg>`],
    ['integrations.html', 'integrations', 'Integrations', `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 7h2a4 4 0 1 1 0 8h-2v-2h2a2 2 0 1 0 0-4h-2V7ZM7 9h2v2H7a2 2 0 1 0 0 4h2v2H7a4 4 0 1 1 0-8Zm1 3h8v2H8v-2Z" fill="currentColor"/></svg>`],
    ['billing.html', 'billing', 'Billing', `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2H4V6Zm0 5h16v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7Zm3 3v2h4v-2H7Z" fill="currentColor"/></svg>`],
    ['settings.html', 'settings', 'Settings', `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19.4 13a7.8 7.8 0 0 0 .1-1l1.8-1.4-1.8-3.2-2.2.5a7.7 7.7 0 0 0-.8-.5l-.3-2.2h-3.6l-.3 2.2c-.3.1-.5.3-.8.5l-2.2-.5-1.8 3.2L4.5 12c0 .3 0 .7.1 1l-1.8 1.4 1.8 3.2 2.2-.5c.2.2.5.3.8.5l.3 2.2h3.6l.3-2.2c.3-.1.5-.3.8-.5l2.2.5 1.8-3.2-1.8-1.4ZM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" fill="currentColor"/></svg>`]
  ].map(([href, key, label, icon]) => `
    <a class="nav-link ${active === key ? 'active' : ''}" href="./${href}">${icon}<span>${label}</span></a>
  `).join('');

  return `
    <div class="app-shell">
      <aside class="sidebar">
        <div class="brand">
          <div class="brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="color:#9146ff"><path d="M5 3h14v10l-4 4h-4l-2 2H7v-2H5V3Zm2 2v10h3v2l2-2h4l3-3V5H7Zm4 2h2v4h-2V7Zm5 0h-2v4h2V7Z" fill="currentColor"/></svg>
          </div>
          <div>
            <div class="brand-kicker">Twitch Growth</div>
            <div class="brand-title">StreamPartner AI</div>
          </div>
        </div>

        <div class="user-panel">
          <div class="user-row">
            <div class="avatar">${initials(user.name)}</div>
            <div class="user-meta">
              <strong id="sidebarUserName">${user.name || 'User'}</strong>
              <small id="sidebarUserEmail">${user.email || '—'}</small>
            </div>
          </div>
          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="badge"><span class="badge-dot"></span><span id="sidebarPlan">${user.plan || 'Starter'} plan</span></span>
            <button class="btn-ghost" id="logoutBtn">Выйти</button>
          </div>
        </div>

        <nav class="nav-group">${nav}</nav>

        <div class="side-card">
          <h4>Фокус недели</h4>
          <p>Подними удержание в первые 8–12 минут, добавь сильный интро-хук и ранний интерактив — это самый быстрый рычаг роста для Twitch-канала.</p>
          <div style="margin-top:14px; display:grid; gap:10px;">
            <span class="badge"><span class="badge-dot"></span>AI ready</span>
            <span class="badge">7-day growth sprint</span>
          </div>
        </div>
      </aside>

      <main class="main">
        <div class="topbar">
          <div class="page-intro">
            <div class="kicker"><span class="badge-dot"></span>Внутрянка StreamLogic</div>
            <h1 id="pageTitle">${pageMeta[active].title}</h1>
            <p id="pageText">${pageMeta[active].text}</p>
          </div>
          <div class="topbar-actions">
            <button class="btn-outline mobile-toggle" id="openSidebarBtn">Меню</button>
            <a class="btn-outline" href="./index.html">На лендинг</a>
            <button class="btn" id="headerLogoutBtn">Выйти</button>
          </div>
        </div>
        <div id="pageContent"></div>
      </main>
    </div>
  `;
}

function dashboardMarkup() {
  const leads = getLeads();
  const won = leads.filter(l => l.status === 'won').length;
  const pending = leads.filter(l => ['new','qualified','contacted','proposal'].includes(l.status)).length;
  return `
    <div class="section-stack">
      <section class="grid-4">
        <article class="metric-card">
          <div class="metric-label">Активные лиды</div>
          <div class="metric-value">${pending}</div>
          <div class="metric-delta">+18% к прошлой неделе</div>
        </article>
        <article class="metric-card">
          <div class="metric-label">Конверсия в оплату</div>
          <div class="metric-value">31%</div>
          <div class="metric-delta">Лучше, чем у 72% похожих кабинетов</div>
        </article>
        <article class="metric-card">
          <div class="metric-label">Средний чек</div>
          <div class="metric-value">$149</div>
          <div class="metric-delta">Есть потенциал для upsell</div>
        </article>
        <article class="metric-card">
          <div class="metric-label">Оплаченные сделки</div>
          <div class="metric-value">${won}</div>
          <div class="metric-delta">Стабильный pipeline по warm-лидам</div>
        </article>
      </section>

      <section class="grid-2">
        <article class="panel">
          <div class="panel-head">
            <div>
              <h3>Рост интереса по неделе</h3>
              <p>Внутренняя кривая показывает, в какие дни ты получаешь больше входящих заявок и где стоит усилить outreach.</p>
            </div>
            <span class="badge"><span class="badge-dot"></span>Live insight</span>
          </div>
          <div class="chart">
            ${[42,56,49,78,91,74,86].map((n, i) => `<div class="chart-col"><div class="chart-value">${n}</div><div class="chart-bar" style="height:${n*1.8}px"></div><div class="chart-label">${['Пн','Вт','Ср','Чт','Пт','Сб','Вс'][i]}</div></div>`).join('')}
          </div>
        </article>

        <article class="panel">
          <div class="panel-head">
            <div>
              <h3>Что делать сегодня</h3>
              <p>Короткий список действий, которые дают максимум эффекта без перегруза кабинета лишними сущностями.</p>
            </div>
          </div>
          <div class="insight-list">
            <div class="activity-item"><h4>Дожми 2 тёплых лида</h4><p>У тебя есть 2 заявки со статусом «Оффер». Самый быстрый прирост выручки — отправить follow-up сегодня.</p></div>
            <div class="activity-item"><h4>Собери кейс из последних успехов</h4><p>Добавь мини-блок с цифрами роста в лендинг — это усилит доверие и поднимет конверсию заявки.</p></div>
            <div class="activity-item"><h4>Проверь Twitch интеграцию</h4><p>Если подтянешь реальную статистику канала, dashboard станет опираться не на демо-данные, а на фактические цифры.</p></div>
          </div>
        </article>
      </section>

      <section class="grid-2">
        <article class="panel">
          <div class="panel-head">
            <div>
              <h3>Последние лиды</h3>
              <p>Быстрый срез по последним входящим заявкам без перехода в отдельный раздел.</p>
            </div>
            <a href="./leads.html" class="btn-outline">Открыть все</a>
          </div>
          <div class="section-stack">
            ${leads.slice(0,4).map(lead => {
              const [label, color] = statusLabel(lead.status);
              return `<div class="lead-card"><div style="display:flex; justify-content:space-between; gap:12px; align-items:flex-start;"><div><h4>${lead.channel}</h4><p>${lead.niche} • ${lead.source} • ${lead.createdAt}</p></div><span class="pill ${color}">${label}</span></div><p style="margin-top:10px;">${lead.note}</p></div>`;
            }).join('')}
          </div>
        </article>

        <article class="panel">
          <div class="panel-head">
            <div>
              <h3>Быстрые действия</h3>
              <p>Заглушки под реальные рабочие сценарии: создание лида, бриф, выставление плана, старт кампании.</p>
            </div>
          </div>
          <div class="grid-2">
            <div class="quick-card"><h4>Новый лид</h4><p>Добавь ручную заявку, если пришла из Discord, Telegram или лички.</p><div style="margin-top:12px;"><a class="btn-outline" href="./leads.html">Добавить</a></div></div>
            <div class="quick-card"><h4>Новый бриф</h4><p>Собери короткий intake для стримера: ниша, средний онлайн, цели на 30 дней.</p><div style="margin-top:12px;"><button class="btn-outline" disabled>Скоро</button></div></div>
            <div class="quick-card"><h4>Тарифы</h4><p>Проверь лимиты и подготовь логику апгрейда для платных пользователей.</p><div style="margin-top:12px;"><a class="btn-outline" href="./billing.html">Открыть</a></div></div>
            <div class="quick-card"><h4>Интеграции</h4><p>Подключи Twitch, чтобы показывать реальный рост, а не только демо-предпросмотр.</p><div style="margin-top:12px;"><a class="btn-outline" href="./integrations.html">Подключить</a></div></div>
          </div>
        </article>
      </section>
    </div>
  `;
}

function leadsMarkup() {
  return `
    <div class="section-stack">
      <section class="panel">
        <div class="panel-head">
          <div>
            <h3>Воронка лидов</h3>
            <p>Фильтрация по статусу и поиск по названию канала. Пока без backend-базы, данные хранятся локально в браузере.</p>
          </div>
          <button class="btn" id="addLeadBtn">Добавить лид</button>
        </div>
        <div class="search-row">
          <div class="field"><input id="leadSearch" placeholder="Поиск по каналу, нише или источнику" /></div>
          <div class="field">
            <select id="leadStatusFilter">
              <option value="all">Все статусы</option>
              <option value="new">Новые</option>
              <option value="qualified">Квалифицированные</option>
              <option value="contacted">В контакте</option>
              <option value="proposal">Оффер</option>
              <option value="won">Оплаченные</option>
              <option value="lost">Потерянные</option>
            </select>
          </div>
        </div>

        <div class="table-wrap">
          <div class="table-scroll">
            <table class="table">
              <thead>
                <tr>
                  <th>Канал</th>
                  <th>Ниша</th>
                  <th>Источник</th>
                  <th>Онлайн</th>
                  <th>Статус</th>
                  <th>Дата</th>
                  <th></th>
                </tr>
              </thead>
              <tbody id="leadsTableBody"></tbody>
            </table>
          </div>
        </div>
      </section>

      <section class="grid-2">
        <article class="panel">
          <div class="panel-head"><div><h3>Добавить вручную</h3><p>Полезно, если лид пришёл не через лендинг, а из лички или Discord.</p></div></div>
          <div class="form-grid" id="leadFormWrap">
            <div><input id="leadChannel" placeholder="Название канала" /></div>
            <div><input id="leadNiche" placeholder="Ниша / жанр" /></div>
            <div><input id="leadSource" placeholder="Источник" /></div>
            <div><input id="leadViewers" type="number" placeholder="Средний онлайн" /></div>
            <div><select id="leadStatus"><option value="new">Новый</option><option value="qualified">Квалифицирован</option><option value="contacted">В контакте</option><option value="proposal">Оффер</option><option value="won">Оплачен</option><option value="lost">Потерян</option></select></div>
            <div class="full"><textarea id="leadNote" placeholder="Заметка по лиду"></textarea></div>
          </div>
          <div class="form-actions"><button class="btn" id="saveLeadBtn">Сохранить лид</button><button class="btn-outline" id="resetLeadBtn">Очистить</button></div>
        </article>

        <article class="panel">
          <div class="panel-head"><div><h3>Подсказки по работе с лидами</h3><p>Что имеет смысл автоматизировать позже, когда подключишь реальную базу и API.</p></div></div>
          <div class="check-list">
            <div class="activity-item"><h4>Авто-источник заявки</h4><p>Подтягивать UTM / реферер / источник формы прямо в карточку лида.</p></div>
            <div class="activity-item"><h4>Следующее действие</h4><p>Добавить поле next step: demo call, offer sent, follow-up in 24h.</p></div>
            <div class="activity-item"><h4>Владелец лида</h4><p>Когда появится команда, можно назначать ответственного менеджера и SLA.</p></div>
          </div>
        </article>
      </section>
    </div>
  `;
}

function profileMarkup() {
  const user = getUser();
  return `
    <div class="section-stack">
      <section class="profile-grid">
        <article class="panel profile-card">
          <div style="display:flex; align-items:center; gap:16px;">
            <div class="avatar" style="width:68px; height:68px; border-radius:20px; font-size:20px;">${initials(user.name)}</div>
            <div>
              <h3 style="margin:0 0 6px;">${user.name}</h3>
              <p style="margin:0; color:var(--muted);">${user.email}</p>
            </div>
          </div>
          <div class="profile-stat">
            <div class="row"><span>Текущий план</span><strong>${user.plan || 'Starter'}</strong></div>
            <div class="row"><span>Лимит лидов</span><strong>100 / мес.</strong></div>
            <div class="row"><span>Интеграции</span><strong>1 из 4</strong></div>
            <div class="row"><span>Статус</span><strong style="color:#8bffb7;">Активен</strong></div>
          </div>
          <div style="margin-top:18px;"><a class="btn-outline" href="./billing.html">Управлять тарифом</a></div>
        </article>

        <article class="panel">
          <div class="panel-head"><div><h3>Данные профиля</h3><p>Эти поля уже можно использовать как основу для сохранения в backend, когда добавишь реальные endpoints.</p></div></div>
          <div class="form-grid">
            <div><input id="profileName" value="${user.name || ''}" placeholder="Имя" /></div>
            <div><input id="profileEmail" value="${user.email || ''}" placeholder="Email" /></div>
            <div><input id="profileRole" value="Founder / Admin" placeholder="Роль" /></div>
            <div><input id="profileCompany" value="StreamLogic" placeholder="Компания" /></div>
            <div class="full"><textarea id="profileGoals" placeholder="Главные цели на 30 дней">Дожать MVP кабинета, подключить Twitch OAuth, вынести лиды в базу и подготовить оплату тарифов.</textarea></div>
          </div>
          <div class="form-actions"><button class="btn" id="saveProfileBtn">Сохранить изменения</button><button class="btn-outline" id="syncProfileBtn">Обновить sidebar</button></div>
          <div class="notice" id="profileNotice" style="margin-top:16px; display:none;"></div>
        </article>
      </section>

      <section class="grid-2">
        <article class="panel">
          <div class="panel-head"><div><h3>Приоритеты роста</h3><p>Личные фокусы, которые помогают не расползтись в продукте и быстрее добить рабочий MVP.</p></div></div>
          <div class="check-list">
            <div class="activity-item"><h4>1. Реальный auth flow</h4><p>После входа сразу редиректить пользователя в кабинет, а не просто закрывать модалку.</p></div>
            <div class="activity-item"><h4>2. Данные из backend</h4><p>Заменить localStorage-демо на API-запросы к FastAPI и привязать лиды к пользователю.</p></div>
            <div class="activity-item"><h4>3. Платежи и лимиты</h4><p>Добавить реальные планы, billing-логику и ограничение функций по подписке.</p></div>
          </div>
        </article>
        <article class="panel">
          <div class="panel-head"><div><h3>Безопасность</h3><p>Базовые переключатели интерфейса. Пока это UI, позже можно привязать к backend и email-нотификациям.</p></div></div>
          <div class="settings-list">
            <label class="activity-item" style="display:flex; justify-content:space-between; align-items:center;"><span><strong>2FA по email</strong><p style="margin-top:4px;">Запрашивать дополнительный код при входе.</p></span><input type="checkbox" /></label>
            <label class="activity-item" style="display:flex; justify-content:space-between; align-items:center;"><span><strong>Алерт о входе</strong><p style="margin-top:4px;">Уведомление при новом входе с другого устройства.</p></span><input type="checkbox" checked /></label>
            <label class="activity-item" style="display:flex; justify-content:space-between; align-items:center;"><span><strong>Сессии на 30 дней</strong><p style="margin-top:4px;">Держать пользователя авторизованным без повторного входа.</p></span><input type="checkbox" checked /></label>
          </div>
        </article>
      </section>
    </div>
  `;
}

function integrationsMarkup() {
  return `
    <div class="section-stack">
      <section class="grid-2">
        <article class="panel">
          <div class="panel-head"><div><h3>Twitch</h3><p>Главная интеграция для реального кабинета: авторизация, данные канала, динамика и ранние инсайты.</p></div><span class="pill warning">Требует env</span></div>
          <div class="lead-card"><h4>Статус подключения</h4><p>OAuth backend уже начат. Дальше надо завершить callback-flow, сохранять пользователя и получать данные канала через Twitch API.</p></div>
          <div class="form-actions"><button class="btn-outline">Подключить Twitch</button><button class="btn-ghost">Открыть docs</button></div>
        </article>
        <article class="panel">
          <div class="panel-head"><div><h3>Discord</h3><p>Для нотификаций о лидах, weekly summary и алертов по активности.</p></div><span class="pill">Планируется</span></div>
          <div class="lead-card"><h4>Что потом сделать</h4><p>Webhook на новый лид, отдельный канал для алертов и команду для запроса короткого daily-report.</p></div>
        </article>
      </section>
      <section class="grid-2">
        <article class="panel">
          <div class="panel-head"><div><h3>Telegram</h3><p>Полезно для мобильных уведомлений и быстрого доступа к статусу кабинета без веб-интерфейса.</p></div></div>
          <div class="lead-card"><h4>Идея MVP</h4><p>Бот, который шлёт новый лид, статус платежа и напоминания о follow-up. Это можно собрать быстро после базы.</p></div>
        </article>
        <article class="panel">
          <div class="panel-head"><div><h3>Публичный API</h3><p>Внутренняя точка роста продукта, если захочешь позже давать партнёрам доступ к данным и событиям.</p></div></div>
          <div class="lead-card"><h4>Ближайшая структура</h4><p>/api/leads, /api/profile, /api/billing, /api/twitch/connect, /api/metrics/overview</p></div>
        </article>
      </section>
    </div>
  `;
}

function billingMarkup() {
  return `
    <div class="section-stack">
      <section class="grid-3">
        <article class="metric-card"><div class="metric-label">Текущий план</div><div class="metric-value">Starter</div><div class="metric-delta">Подходит для MVP и первых клиентов</div></article>
        <article class="metric-card"><div class="metric-label">Следующее продление</div><div class="metric-value">12 Apr</div><div class="metric-delta">Автосписание выключено</div></article>
        <article class="metric-card"><div class="metric-label">Месячный лимит лидов</div><div class="metric-value">100</div><div class="metric-delta">Использовано: 6</div></article>
      </section>
      <section class="grid-2">
        <article class="panel">
          <div class="panel-head"><div><h3>Планы</h3><p>Заготовка под будущую монетизацию. Можно сразу использовать как UI-основание для реальной оплаты.</p></div></div>
          <div class="section-stack">
            <div class="lead-card"><div style="display:flex; justify-content:space-between; gap:12px; align-items:center;"><div><h4>Starter</h4><p>До 100 лидов, 1 интеграция, базовая аналитика.</p></div><strong>$19/mo</strong></div></div>
            <div class="lead-card"><div style="display:flex; justify-content:space-between; gap:12px; align-items:center;"><div><h4>Growth</h4><p>До 1000 лидов, все интеграции, weekly AI-insights.</p></div><strong>$59/mo</strong></div></div>
            <div class="lead-card"><div style="display:flex; justify-content:space-between; gap:12px; align-items:center;"><div><h4>Agency</h4><p>Команда, роли, white-label и API.</p></div><strong>$149/mo</strong></div></div>
          </div>
          <div class="form-actions"><button class="btn">Апгрейд плана</button></div>
        </article>
        <article class="panel">
          <div class="panel-head"><div><h3>Что нужно добить по billing</h3><p>Чтобы это стало рабочей платной частью продукта, а не просто красивым блоком.</p></div></div>
          <div class="check-list">
            <div class="activity-item"><h4>1. Таблица подписок</h4><p>Нужна сущность subscription в backend и привязка к user_id.</p></div>
            <div class="activity-item"><h4>2. Платёжный провайдер</h4><p>Stripe / LiqPay / WayForPay — зависит от того, где и кому продаёшь.</p></div>
            <div class="activity-item"><h4>3. Feature gates</h4><p>Ограничение функций по плану: лиды, интеграции, отчёты, team access.</p></div>
          </div>
        </article>
      </section>
    </div>
  `;
}

function settingsMarkup() {
  return `
    <div class="section-stack">
      <section class="grid-2">
        <article class="panel">
          <div class="panel-head"><div><h3>Уведомления</h3><p>UI под настройки, которые позже легко привязать к профилю пользователя и сохранить в backend.</p></div></div>
          <div class="settings-list">
            <label class="activity-item" style="display:flex; justify-content:space-between; gap:12px; align-items:center;"><span><strong>Новый лид</strong><p style="margin-top:4px;">Мгновенно показывать уведомление о новой заявке.</p></span><input type="checkbox" checked></label>
            <label class="activity-item" style="display:flex; justify-content:space-between; gap:12px; align-items:center;"><span><strong>Weekly summary</strong><p style="margin-top:4px;">Отправлять сводку по лидам и конверсии раз в неделю.</p></span><input type="checkbox" checked></label>
            <label class="activity-item" style="display:flex; justify-content:space-between; gap:12px; align-items:center;"><span><strong>Product updates</strong><p style="margin-top:4px;">Сообщать о новых функциях и beta-возможностях.</p></span><input type="checkbox"></label>
          </div>
        </article>
        <article class="panel">
          <div class="panel-head"><div><h3>Интерфейс</h3><p>Параметры самого кабинета, которые можно хранить локально или в пользовательском профиле.</p></div></div>
          <div class="form-grid">
            <div><select><option>Русский</option><option>Українська</option><option>English</option></select></div>
            <div><select><option>Тёмная тема</option><option>Системная</option></select></div>
            <div><select><option>Показывать CTR первым</option><option>Показывать лиды первым</option></select></div>
            <div><select><option>Неделя</option><option>30 дней</option><option>90 дней</option></select></div>
          </div>
          <div class="form-actions"><button class="btn">Сохранить настройки</button></div>
        </article>
      </section>
      <section class="panel">
        <div class="panel-head"><div><h3>Системные заметки</h3><p>Полезно держать прямо в кабинете, чтобы не потерять технический контекст по проекту.</p></div></div>
        <div class="notice">Сейчас внутрянка работает как фронтовой MVP на static pages. Следующий реальный шаг — вынести всё, что сейчас лежит в localStorage, в backend: профиль, лиды, тариф и состояния интеграций.</div>
      </section>
    </div>
  `;
}

function renderPage(pageKey) {
  const root = document.getElementById('app');
  root.innerHTML = appFrame(pageKey);
  const content = document.getElementById('pageContent');
  if (pageKey === 'dashboard') content.innerHTML = dashboardMarkup();
  if (pageKey === 'leads') content.innerHTML = leadsMarkup();
  if (pageKey === 'profile') content.innerHTML = profileMarkup();
  if (pageKey === 'integrations') content.innerHTML = integrationsMarkup();
  if (pageKey === 'billing') content.innerHTML = billingMarkup();
  if (pageKey === 'settings') content.innerHTML = settingsMarkup();

  document.getElementById('logoutBtn')?.addEventListener('click', logout);
  document.getElementById('headerLogoutBtn')?.addEventListener('click', logout);
  document.getElementById('openSidebarBtn')?.addEventListener('click', () => document.body.classList.add('sidebar-open'));
  document.addEventListener('click', (e) => {
    if (document.body.classList.contains('sidebar-open') && !e.target.closest('.sidebar') && !e.target.closest('#openSidebarBtn')) {
      document.body.classList.remove('sidebar-open');
    }
  });

  if (pageKey === 'leads') bootLeadsPage();
  if (pageKey === 'profile') bootProfilePage();
}

function bootLeadsPage() {
  const search = document.getElementById('leadSearch');
  const filter = document.getElementById('leadStatusFilter');
  const tbody = document.getElementById('leadsTableBody');

  function draw() {
    const q = (search.value || '').trim().toLowerCase();
    const status = filter.value;
    const rows = getLeads().filter(lead => {
      const hit = [lead.channel, lead.niche, lead.source, lead.note].join(' ').toLowerCase().includes(q);
      const statusOk = status === 'all' ? true : lead.status === status;
      return hit && statusOk;
    });

    if (!rows.length) {
      tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state">Ничего не найдено. Попробуй другой запрос или статус.</div></td></tr>`;
      return;
    }

    tbody.innerHTML = rows.map((lead, idx) => {
      const [label, color] = statusLabel(lead.status);
      return `
        <tr>
          <td><strong>${lead.channel}</strong><div style="margin-top:4px; color:var(--soft); font-size:12px;">${lead.note}</div></td>
          <td>${lead.niche}</td>
          <td>${lead.source}</td>
          <td>${lead.viewers}</td>
          <td><span class="pill ${color}">${label}</span></td>
          <td>${lead.createdAt}</td>
          <td><button class="btn-ghost" data-remove="${idx}" type="button">Удалить</button></td>
        </tr>
      `;
    }).join('');

    tbody.querySelectorAll('[data-remove]').forEach(btn => btn.addEventListener('click', () => {
      const all = getLeads();
      const filtered = rows;
      const item = filtered[Number(btn.dataset.remove)];
      const next = all.filter(l => !(l.channel === item.channel && l.createdAt === item.createdAt));
      saveLeads(next);
      draw();
    }));
  }

  search.addEventListener('input', draw);
  filter.addEventListener('change', draw);
  document.getElementById('addLeadBtn')?.addEventListener('click', () => document.getElementById('leadChannel')?.focus());
  document.getElementById('saveLeadBtn')?.addEventListener('click', () => {
    const payload = {
      channel: document.getElementById('leadChannel').value.trim(),
      niche: document.getElementById('leadNiche').value.trim(),
      source: document.getElementById('leadSource').value.trim() || 'Manual',
      viewers: Number(document.getElementById('leadViewers').value || 0),
      status: document.getElementById('leadStatus').value,
      note: document.getElementById('leadNote').value.trim() || 'Без заметки',
      createdAt: new Date().toISOString().slice(0,16).replace('T', ' ')
    };
    if (!payload.channel) return alert('Введи название канала');
    if (!payload.niche) return alert('Введи нишу');
    const leads = [payload, ...getLeads()];
    saveLeads(leads);
    document.getElementById('leadChannel').value = '';
    document.getElementById('leadNiche').value = '';
    document.getElementById('leadSource').value = '';
    document.getElementById('leadViewers').value = '';
    document.getElementById('leadStatus').value = 'new';
    document.getElementById('leadNote').value = '';
    draw();
  });
  document.getElementById('resetLeadBtn')?.addEventListener('click', () => {
    document.getElementById('leadChannel').value = '';
    document.getElementById('leadNiche').value = '';
    document.getElementById('leadSource').value = '';
    document.getElementById('leadViewers').value = '';
    document.getElementById('leadStatus').value = 'new';
    document.getElementById('leadNote').value = '';
  });
  draw();
}

function bootProfilePage() {
  const notice = document.getElementById('profileNotice');
  function updateUser() {
    const existing = getUser();
    const next = {
      ...existing,
      name: document.getElementById('profileName').value.trim() || existing.name,
      email: document.getElementById('profileEmail').value.trim() || existing.email,
      role: document.getElementById('profileRole').value.trim(),
      company: document.getElementById('profileCompany').value.trim(),
      goals: document.getElementById('profileGoals').value.trim()
    };
    localStorage.setItem('streamlogic_user', JSON.stringify(next));
    document.getElementById('sidebarUserName').textContent = next.name;
    document.getElementById('sidebarUserEmail').textContent = next.email;
    document.querySelector('.avatar').textContent = initials(next.name);
    notice.style.display = 'block';
    notice.textContent = 'Профиль сохранён локально. Следующий шаг — записывать эти изменения в backend.';
  }
  document.getElementById('saveProfileBtn')?.addEventListener('click', updateUser);
  document.getElementById('syncProfileBtn')?.addEventListener('click', updateUser);
}

function logout() {
  localStorage.removeItem('streamlogic_token');
  localStorage.removeItem('streamlogic_user');
  location.href = './index.html';
}

window.addEventListener('DOMContentLoaded', () => {
  const current = ensureAuth();
  if (!current) return;
  const key = APP_PAGES[current] || 'dashboard';
  renderPage(key);
});
