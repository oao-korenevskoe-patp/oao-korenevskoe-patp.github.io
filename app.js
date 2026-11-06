


// Helper to escape user HTML
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
/**
 * ОАО «Коренёвский ПАТП» — Официальный портал и форум предприятия OMSI 2
 * Обновленная версия: раздельные сессии пользователей, удаление сообщений,
 * назначение администраторов, управление автопарком и сохранение маршрутов.
 */

// ================= CONSTANTS & ROLES =================
const ROLES = {
  director: {
    key: 'director',
    name: 'Руководитель (Администратор)',
    badgeClass: 'badge-role-director',
    canManageReports: true,
    canManageLeaves: true,
    canManageRoutes: true,
    canManageFleet: true
  },
  dispatch: {
    key: 'dispatch',
    name: 'Зам.Руководителя по диспетчерскому составу',
    badgeClass: 'badge-role-dispatch',
    canManageReports: true,
    canManageLeaves: false,
    canManageRoutes: true,
    canManageFleet: false
  },
  hr: {
    key: 'hr',
    name: 'Зам.Руководителя по личному составу',
    badgeClass: 'badge-role-hr',
    canManageReports: false,
    canManageLeaves: true,
    canManageRoutes: false,
    canManageFleet: false
  },
  driver: {
    key: 'driver',
    name: 'Водитель',
    badgeClass: 'badge-role-driver',
    canManageReports: false,
    canManageLeaves: false,
    canManageRoutes: false,
    canManageFleet: false
  }
};

// ================= DEFAULT SEED DATA =================
const DEFAULT_USERS = [
  {
    id: 'user_director',
    name: 'Владислав Корней Коршунов',
    role: 'director',
    password: '23ubd7kW14!',
    badge: 'Руководитель предприятия #01 (Admin)',
    bus: 'ЛиАЗ-5292.22 (Борт №102, е789мн 46)',
    status: 'active',
    avatar: 'logo.jpg'
  },
  {
    id: 'user_dispatch',
    name: 'Смирнов Виктор Михайлович',
    role: 'dispatch',
    password: '123',
    badge: 'Диспетчер #02',
    bus: 'Диспетчерская служба',
    status: 'active',
    avatar: 'logo.jpg'
  },
  {
    id: 'user_hr',
    name: 'Белова Елена Николаевна',
    role: 'hr',
    password: '123',
    badge: 'Кадры #03',
    bus: 'Отдел кадров',
    status: 'active',
    avatar: 'logo.jpg'
  },
  {
    id: 'user_driver_1',
    name: 'Григорьев Михаил Дмитриевич',
    role: 'driver',
    password: '123',
    badge: 'Борт №104 (Таб. #112)',
    bus: 'ЛиАЗ-5256.26 (Борт №104, а145кх 46)',
    status: 'active',
    avatar: 'logo.jpg'
  },
  {
    id: 'user_driver_2',
    name: 'Павлов Сергей Александрович',
    role: 'driver',
    password: '123',
    badge: 'Борт №128 (Таб. #118)',
    bus: 'ПАЗ-32053 (Борт №128, в332ор 46)',
    status: 'active',
    avatar: 'logo.jpg'
  }
];

const DEFAULT_FLEET = [
  {
    id: 'bus_104',
    model: 'ЛиАЗ-5256.26',
    boardNumber: 'Борт №104',
    govPlate: 'а145кх 46',
    status: 'active',
    assignedDriverId: 'user_driver_1',
    assignedDriverName: 'Григорьев Михаил Дмитриевич'
  },
  {
    id: 'bus_128',
    model: 'ПАЗ-32053',
    boardNumber: 'Борт №128',
    govPlate: 'в332ор 46',
    status: 'active',
    assignedDriverId: 'user_driver_2',
    assignedDriverName: 'Павлов Сергей Александрович'
  },
  {
    id: 'bus_102',
    model: 'ЛиАЗ-5292.22',
    boardNumber: 'Борт №102',
    govPlate: 'е789мн 46',
    status: 'active',
    assignedDriverId: 'user_director',
    assignedDriverName: 'Владислав Корней Коршунов'
  },
  {
    id: 'bus_115',
    model: 'НефАЗ-5299-40-52',
    boardNumber: 'Борт №115',
    govPlate: 'к456тх 46',
    status: 'reserve',
    assignedDriverId: null,
    assignedDriverName: 'Резерв'
  },
  {
    id: 'bus_130',
    model: 'Икарус-260',
    boardNumber: 'Борт №130',
    govPlate: 'м112со 46',
    status: 'reserve',
    assignedDriverId: null,
    assignedDriverName: 'Резерв'
  },
  {
    id: 'bus_144',
    model: 'ПАЗ «Вектор Next»',
    boardNumber: 'Борт №144',
    govPlate: 'о998вр 46',
    status: 'repair',
    assignedDriverId: null,
    assignedDriverName: 'Ремонтная зона'
  }
];

const DEFAULT_ROUTES = [
  {
    id: 'route_1',
    number: '1',
    title: 'Автовокзал «Коренёво» — Микрорайон Северный',
    type: 'Городской маршрут',
    distance: '12.8 км',
    time: '32 мин в одну сторону',
    interval: '8-12 мин',
    buses: ['ЛиАЗ-5292.22', 'НефАЗ-5299-40', 'МАЗ-103'],
    hofCode: 'Line 00100 / Route 01-02',
    stops: [
      'Автовокзал Коренёво',
      'Улица Ленина',
      'Городской ДК',
      'Школа искусств',
      'Бульвар Мира',
      'Поликлиника №2',
      'Завод железобетонных конструкций',
      'Мкрн. Северный (Конечная)'
    ],
    note: 'Высокий пассажиропоток в часы пик. На линии работают вместительные низкопольные машины.'
  },
  {
    id: 'route_104',
    number: '104',
    title: 'ПАТП «Коренёво» — с. Коренёво — д. Заречье',
    type: 'Пригородный маршрут',
    distance: '28.4 км',
    time: '52 мин в одну сторону',
    interval: '30-40 мин',
    buses: ['ПАЗ-32053', 'ПАЗ «Вектор Next»', 'ЛиАЗ-5256'],
    hofCode: 'Line 10400 / Route 01-02',
    stops: [
      'ПАТП «Коренёво» (Гараж)',
      'Центральный рынок',
      'Развилка на совхоз',
      'Село Коренёво (Центр)',
      'Коренёвская средняя школа',
      'Дачные участки «Озон»',
      'Поворот на МТС',
      'Деревня Заречье (Кольцо)'
    ],
    note: 'Сложный рельеф, местами гравийное покрытие при въезде в Заречье. Соблюдайте дистанцию!'
  },
  {
    id: 'route_23',
    number: '23',
    title: 'Кольцевой: Рынок — Вокзал — Больничный городок — ПАТП',
    type: 'Городской кольцевой',
    distance: '15.2 км',
    time: '40 мин круг',
    interval: '15 мин',
    buses: ['ЛиАЗ-5256.26', 'ПАЗ-32054', 'МАЗ-206'],
    hofCode: 'Line 02300 / Route 01 (Внешнее) / 02 (Внутреннее)',
    stops: [
      'Автовокзал Коренёво',
      'Привокзальная площадь',
      'Рыночная площадь',
      'Улица Гагарина',
      'Больничный комплекс',
      'Парк Победы',
      'Коренёвский ПАТП'
    ],
    note: 'Круговой маршрут по центральной артерии города. Билетная касса работает интенсивно.'
  },
  {
    id: 'route_55e',
    number: '55э',
    title: 'Аэропорт «Коренёво» — Гостиница «Центральная»',
    type: 'Полуэкспресс / Междугородний',
    distance: '22.0 км',
    time: '28 мин',
    interval: '45 мин (под рейсы авиации)',
    buses: ['Икарус-250', 'Икарус-256', 'ЛиАЗ-5256.23', 'НефАЗ-5299-17'],
    hofCode: 'Line 05500 / Route 01-02',
    stops: [
      'Терминал Аэропорта Коренёво',
      'Авиагородок',
      'Шоссе Авиаторов (без остановок)',
      'Площадь Металлургов',
      'Гостиница «Центральная»'
    ],
    note: 'Междугородние и экспрессные комфортные автобусы с багажными отделениями.'
  },
  {
    id: 'route_7',
    number: '7',
    title: 'Дежурный ночной: Развозка сотрудников ПАТП',
    type: 'Служебный ночной рейс',
    distance: '34.5 км',
    time: '65 мин',
    interval: 'По графику (01:15, 03:30, 04:45)',
    buses: ['ПАЗ-32053', 'ЛиАЗ-5256'],
    hofCode: 'Line 00700 / Route 01',
    stops: [
      'ПАТП (Старт)',
      'Все районы города по заявкам',
      'Диспетчерская автовокзала',
      'ПАТП (Финиш)'
    ],
    note: 'Только для перевозки водителей утренних и вечерних графиков. Посадка по пропускам ПАТП.'
  }
];

const DEFAULT_REPORTS = [
  {
    id: 'rep_1',
    driverId: 'user_driver_1',
    driverName: 'Григорьев Михаил Дмитриевич',
    driverRole: 'driver',
    route: '№ 104 «ПАТП — с. Коренёво — д. Заречье»',
    busInfo: 'ЛиАЗ-5256.26 (Борт №104, а145кх 46)',
    trips: 4,
    revenue: 4250,
    passengers: 154,
    scheduleStatus: 'Строго по расписанию (0 мин)',
    screenshots: 'https://i.imgur.com/example1.jpg (Путевой лист и кассовый чек IBIS)',
    comment: 'Смена прошла в штатном режиме. В Коренёво на мосту небольшой гололёд, рекомендую коллегам аккуратнее проходить спуск.',
    status: 'approved',
    reviewedBy: 'Смирнов В. М. (Зам. по диспетчерской)',
    reviewComment: 'Отчет принят без замечаний, выручка сдана в кассу в полном объеме. Премия к путевке зачислена.',
    createdAt: '2026-10-27 16:45'
  },
  {
    id: 'rep_2',
    driverId: 'user_driver_2',
    driverName: 'Павлов Сергей Александрович',
    driverRole: 'driver',
    route: '№ 1 «Автовокзал — Мкрн. Северный»',
    busInfo: 'ПАЗ-32053 (Борт №128, в332ор 46)',
    trips: 6,
    revenue: 5800,
    passengers: 210,
    scheduleStatus: 'Незначительное опоздание (+2..4 мин)',
    screenshots: 'https://i.imgur.com/example2.jpg (Скриншот тахографа и OMSI 2)',
    comment: 'В вечерний час пик у завода стояла пробка. Из графика выбился на 3 минуты, наверстал на обратном рейсе.',
    status: 'pending',
    reviewedBy: null,
    reviewComment: null,
    createdAt: '2026-10-27 18:20'
  }
];

const DEFAULT_LEAVES = [
  {
    id: 'leave_1',
    driverId: 'user_driver_2',
    driverName: 'Павлов Сергей Александрович',
    driverRole: 'driver',
    reasonType: 'Ремонт игрового руля / ПК',
    dateStart: '2026-10-29',
    dateEnd: '2026-10-31',
    comment: 'Вышел из строя блок питания педалей Logitech G29. Заказал запчасть, буду готов выйти на линию с 1 ноября.',
    status: 'pending',
    reviewedBy: null,
    reviewComment: null,
    createdAt: '2026-10-27 17:10'
  },
  {
    id: 'leave_2',
    driverId: 'user_driver_1',
    driverName: 'Григорьев Михаил Дмитриевич',
    driverRole: 'driver',
    reasonType: 'Плановый отпуск',
    dateStart: '2026-10-20',
    dateEnd: '2026-10-24',
    comment: 'Очередной отпуск за отработанные 50 смен в OMSI 2.',
    status: 'approved',
    reviewedBy: 'Белова Е. Н. (Зам. по личному составу)',
    reviewComment: 'Отпуск согласован согласно графику отпусков. График смен скорректирован.',
    createdAt: '2026-10-18 10:15'
  }
];

// ================= APP STATE =================
let currentUser = null;
let currentTab = 'reports';
let reportsFilter = 'all';
let leavesFilter = 'all';

const DEFAULT_CHAT_MESSAGES = [
  {
    id: 'msg_1',
    userId: 'user_director',
    userName: 'Владислав Корней Коршунов',
    userRole: 'director',
    userAvatar: 'logo.jpg',
    text: 'Коллеги, приветствую всех на смене! Напоминаю: все путевые листы и отчеты сдавать строго до 23:00. Всем безаварийной работы и лёгких рейсов!',
    timestamp: '28.10.2026 08:30'
  },
  {
    id: 'msg_2',
    userId: 'user_dispatch',
    userName: 'Смирнов Виктор Михайлович',
    userRole: 'dispatch',
    userAvatar: 'logo.jpg',
    text: 'Внимание всем бортам на 104-м маршруте! В районе Коренёвского моста ведутся дорожные работы, держите увеличенную дистанцию и не выбивайтесь из графика.',
    timestamp: '28.10.2026 08:42'
  },
  {
    id: 'msg_3',
    userId: 'user_driver_1',
    userName: 'Мельников Алексей Романович',
    userRole: 'driver',
    userAvatar: 'logo.jpg',
    text: 'Вас понял, диспетчер! ЛиАЗ-5256 борт №104 сейчас на подходе к мосту, движение умеренное, задержек нет.',
    timestamp: '28.10.2026 08:50'
  },
  {
    id: 'msg_4',
    userId: 'user_hr',
    userName: 'Ковалев Дмитрий Игоревич',
    userRole: 'hr',
    userAvatar: 'logo.jpg',
    text: 'Уважаемые водители! Напоминаю, что график отгулов на следующий месяц формируется до конца недели. Подавайте заявления заблаговременно.',
    timestamp: '28.10.2026 09:05'
  }
];

let appUsers = [];
let appReports = [];
let appLeaves = [];
let appRoutes = [];
let appFleet = [];
let appChatMessages = [];

// ================= STORAGE FUNCTIONS =================

// ================= CLOUD REALTIME DATABASE SYNC ENGINE =================
const DEFAULT_FIREBASE_URL = 'https://korenevskoe-patp-default-rtdb.firebaseio.com';

let CLOUD_CONFIG = {
  firebaseUrl: localStorage.getItem('korenevo_firebase_url') || DEFAULT_FIREBASE_URL,
  pollIntervalMs: 3500,
  isSyncing: false,
  lastSyncTime: null,
  status: 'offline' // 'online', 'syncing', 'offline', 'error'
};

function getFirebaseUrl() {
  let url = (CLOUD_CONFIG.firebaseUrl || localStorage.getItem('korenevo_firebase_url') || DEFAULT_FIREBASE_URL).trim();
  if (!url) url = DEFAULT_FIREBASE_URL;
  if (url.endsWith('/')) url = url.slice(0, -1);
  return url;
}

function checkIsAdmin(user) {
  if (!user) return false;
  return Boolean(
    user.isAdmin === true || 
    user.role === 'director' || 
    (user.name && user.name.trim().toLowerCase() === 'владислав корней коршунов')
  );
}

function checkUrlHashForDb() {
  try {
    const hash = window.location.hash || '';
    const search = window.location.search || '';
    let dbMatch = hash.match(/#(?:db|firebase)=([^&]+)/) || search.match(/[?&](?:db|firebase)=([^&]+)/);
    if (dbMatch && dbMatch[1]) {
      const decoded = decodeURIComponent(dbMatch[1]).trim();
      if (decoded && (decoded.startsWith('http://') || decoded.startsWith('https://'))) {
        localStorage.setItem('korenevo_firebase_url', decoded);
        CLOUD_CONFIG.firebaseUrl = decoded;
        showToast('Облачная база подключена по ссылке из адреса сайта!', 'success');
      }
    }
  } catch (e) {
    console.warn('Hash parse error:', e);
  }
}

function updateCloudStatusUI() {
  const badge = document.getElementById('cloud-sync-status-badge');
  const adminBadge = document.getElementById('admin-cloud-status-badge');
  const adminDot = document.getElementById('admin-cloud-dot');
  const adminText = document.getElementById('admin-cloud-text');
  const adminLastSync = document.getElementById('admin-last-sync-label');
  const urlInput = document.getElementById('admin-firebase-url-input');

  if (urlInput && !urlInput.value && CLOUD_CONFIG.firebaseUrl) {
    urlInput.value = CLOUD_CONFIG.firebaseUrl;
  }

  const hasUrl = !!getFirebaseUrl();

  if (badge) {
    if (!hasUrl) {
      badge.className = "ml-1 sm:ml-2 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5 bg-slate-900 border border-slate-700 text-slate-400 hover:border-sky-500/50 transition cursor-pointer";
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-slate-500"></span> <span>База: Локальная</span>`;
      badge.title = "Данные сохраняются только в памяти этого браузера. Нажмите для подключения онлайн-базы.";
    } else if (CLOUD_CONFIG.isSyncing) {
      badge.className = "ml-1 sm:ml-2 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5 bg-blue-950/80 border border-sky-500/50 text-sky-300 transition cursor-pointer";
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping"></span> <span>Синхронизация...</span>`;
    } else if (CLOUD_CONFIG.status === 'online') {
      badge.className = "ml-1 sm:ml-2 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 transition cursor-pointer";
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot"></span> <span>Облако онлайн</span>`;
      badge.title = "Все устройства синхронизируются в реальном времени через Firebase!";
    } else if (CLOUD_CONFIG.status === 'error') {
      badge.className = "ml-1 sm:ml-2 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5 bg-rose-950/80 border border-rose-500/50 text-rose-300 transition cursor-pointer";
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-rose-400"></span> <span>Ошибка связи</span>`;
    }
  }

  if (adminBadge) {
    if (!hasUrl) {
      adminBadge.textContent = "Offline";
      adminBadge.className = "px-1.5 py-0.2 rounded-full text-[10px] bg-slate-800 text-slate-400 font-mono";
    } else if (CLOUD_CONFIG.status === 'online') {
      adminBadge.textContent = "Online";
      adminBadge.className = "px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-500/30 text-emerald-300 font-mono border border-emerald-500/40";
    } else {
      adminBadge.textContent = "Connecting";
      adminBadge.className = "px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500/30 text-amber-300 font-mono";
    }
  }

  if (adminDot && adminText) {
    if (!hasUrl) {
      adminDot.className = "w-2.5 h-2.5 rounded-full bg-amber-400";
      adminText.className = "font-bold text-amber-300";
      adminText.textContent = "Локальный режим (только этот телефон)";
    } else if (CLOUD_CONFIG.status === 'online') {
      adminDot.className = "w-2.5 h-2.5 rounded-full bg-emerald-400 live-dot";
      adminText.className = "font-bold text-emerald-300";
      adminText.textContent = "Подключено к Firebase (Синхронизация активна)";
    } else if (CLOUD_CONFIG.isSyncing) {
      adminDot.className = "w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping";
      adminText.className = "font-bold text-sky-300";
      adminText.textContent = "Идет обмен данными...";
    } else {
      adminDot.className = "w-2.5 h-2.5 rounded-full bg-rose-400";
      adminText.className = "font-bold text-rose-300";
      adminText.textContent = "Ошибка подключения к базе";
    }
  }

  if (adminLastSync) {
    if (CLOUD_CONFIG.lastSyncTime) {
      const d = new Date(CLOUD_CONFIG.lastSyncTime);
      const timeStr = `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
      adminLastSync.textContent = `Посл. синхронизация: ${timeStr}`;
    } else {
      adminLastSync.textContent = hasUrl ? "Ожидание первого ответа..." : "Не настроено";
    }
  }
}

function handleCloudBadgeClick() {
  if (checkIsAdmin(currentUser)) {
    openAdminPanel();
    switchAdminTab('cloud');
  } else {
    showToast('Облачная база объединяет чат, отчеты и пользователей между всеми устройствами!', 'info');
  }
}

function getEnterpriseStatePayload() {
  return {
    users: appUsers,
    fleet: appFleet,
    routes: appRoutes,
    reports: appReports,
    leaves: appLeaves,
    chat: appChatMessages,
    ticker: {
      text: localStorage.getItem('korenevo_ticker_text') || 'Уважаемые водители! На 104-м пригородном маршруте в районе с. Коренёво открыт отремонтированный объезд.',
      release: localStorage.getItem('korenevo_ticker_release') || 'Выпуск на линию: 100%',
      fuel: localStorage.getItem('korenevo_ticker_fuel') || 'Топливо: В норме'
    },
    lastUpdated: Date.now(),
    updatedBy: currentUser ? currentUser.name : 'Гость'
  };
}

async function syncToCloud(isSilent = true) {
  const baseUrl = getFirebaseUrl();
  if (!baseUrl) {
    updateCloudStatusUI();
    return;
  }

  CLOUD_CONFIG.isSyncing = true;
  updateCloudStatusUI();

  try {
    const endpoint = baseUrl.endsWith('.json') ? baseUrl : `${baseUrl}/patp_db.json`;
    const payload = getEnterpriseStatePayload();

    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    CLOUD_CONFIG.status = 'online';
    CLOUD_CONFIG.lastSyncTime = Date.now();
    if (!isSilent) {
      showToast('Все данные предприятия успешно выгружены в облако!', 'success');
    }
  } catch (err) {
    console.error('Cloud Sync Error:', err);
    CLOUD_CONFIG.status = 'error';
    if (!isSilent) {
      showToast('Ошибка при синхронизации с облаком. Проверьте ссылку Firebase.', 'error');
    }
  } finally {
    CLOUD_CONFIG.isSyncing = false;
    updateCloudStatusUI();
  }
}

async function fetchFromCloud(isSilent = true) {
  const baseUrl = getFirebaseUrl();
  if (!baseUrl) {
    updateCloudStatusUI();
    return;
  }

  try {
    const endpoint = baseUrl.endsWith('.json') ? baseUrl : `${baseUrl}/patp_db.json`;
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const cloudData = await response.json();
    if (cloudData && typeof cloudData === 'object') {
      applyCloudData(cloudData);
      CLOUD_CONFIG.status = 'online';
      CLOUD_CONFIG.lastSyncTime = Date.now();
      if (!isSilent) {
        showToast('Данные успешно загружены из облачной базы!', 'success');
      }
    } else {
      console.log('Cloud database is empty, initial seeding...');
      await syncToCloud(true);
      CLOUD_CONFIG.status = 'online';
      CLOUD_CONFIG.lastSyncTime = Date.now();
    }
    fetchCloudPresence();
  } catch (err) {
    console.warn('Fetch from cloud warning:', err);
    if (CLOUD_CONFIG.status !== 'online') {
      CLOUD_CONFIG.status = 'error';
    }
    if (!isSilent) {
      showToast('Не удалось получить данные из облачной базы. Проверьте ссылку.', 'error');
    }
  } finally {
    updateCloudStatusUI();
  }
}

function applyCloudData(data) {
  if (!data) return;

  let hasUsersChanged = false;
  let hasReportsChanged = false;
  let hasLeavesChanged = false;
  let hasFleetChanged = false;
  let hasRoutesChanged = false;
  let hasChatChanged = false;

  // 1. Merge Users
  if (Array.isArray(data.users) && data.users.length > 0) {
    const prevCount = appUsers.length;
    const userMap = new Map();
    appUsers.forEach(u => userMap.set(u.id, u));
    data.users.forEach(cu => userMap.set(cu.id, cu));

    appUsers = Array.from(userMap.values());
    ensureChiefAdminExists();
    saveUsers();

    if (appUsers.length !== prevCount) hasUsersChanged = true;

    if (currentUser) {
      const freshUser = appUsers.find(u => u.id === currentUser.id || u.name.toLowerCase() === currentUser.name.toLowerCase());
      if (freshUser) {
        currentUser = freshUser;
        saveCurrentUser();
      }
    }
  }

  // 2. Merge Fleet
  if (Array.isArray(data.fleet) && data.fleet.length > 0) {
    appFleet = data.fleet;
    saveFleet();
    hasFleetChanged = true;
  }

  // 3. Merge Routes
  if (Array.isArray(data.routes) && data.routes.length > 0) {
    appRoutes = data.routes;
    saveRoutes();
    hasRoutesChanged = true;
  }

  // 4. Merge Reports
  if (Array.isArray(data.reports)) {
    if (JSON.stringify(appReports) !== JSON.stringify(data.reports)) {
      appReports = data.reports;
      saveReports();
      hasReportsChanged = true;
    }
  }

  // 5. Merge Leaves
  if (Array.isArray(data.leaves)) {
    if (JSON.stringify(appLeaves) !== JSON.stringify(data.leaves)) {
      appLeaves = data.leaves;
      saveLeaves();
      hasLeavesChanged = true;
    }
  }

  // 6. Merge Chat Messages
  if (Array.isArray(data.chat)) {
    if (JSON.stringify(appChatMessages) !== JSON.stringify(data.chat)) {
      appChatMessages = data.chat;
      saveChatMessages();
      hasChatChanged = true;
      if (currentTab === 'chat') {
        renderChat();
      }
    }
  }

  // 7. Ticker
  if (data.ticker) {
    if (data.ticker.text) localStorage.setItem('korenevo_ticker_text', data.ticker.text);
    if (data.ticker.release) localStorage.setItem('korenevo_ticker_release', data.ticker.release);
    if (data.ticker.fuel) localStorage.setItem('korenevo_ticker_fuel', data.ticker.fuel);
    loadTickerSettings();
  }

  updateBadges();
  updateOnlineRoster();
  if (hasReportsChanged && currentTab === 'reports') renderReports();
  if (hasLeavesChanged && currentTab === 'leaves') renderLeaves();
  if (hasRoutesChanged && currentTab === 'routes') renderRoutes();
  if (hasChatChanged && currentTab === 'chat') renderChat();
  renderAdminUsers();
  renderAdminFleet();
  renderAdminRoutes();
}

function ensureChiefAdminExists() {
  let admin = appUsers.find(u => u.name === 'Владислав Корней Коршунов');
  if (!admin) {
    admin = {
      id: 'user_director',
      name: 'Владислав Корней Коршунов',
      role: 'director',
      password: '23ubd7kW14!',
      badge: 'Руководитель предприятия #01 (Admin)',
      bus: 'ЛиАЗ-5292.22 (Борт №102, е789мн 46)',
      status: 'active',
      avatar: 'logo.jpg'
    };
    appUsers.unshift(admin);
  } else {
    admin.role = 'director';
    admin.isAdmin = true;
    admin.password = '23ubd7kW14!';
  }
}

async function handleSaveCloudConfig(e) {
  if (e) e.preventDefault();
  const input = document.getElementById('admin-firebase-url-input');
  if (!input) return;

  let url = input.value.trim();
  if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  CLOUD_CONFIG.firebaseUrl = url;
  localStorage.setItem('korenevo_firebase_url', url);
  showToast('URL базы данных сохранен! Выполняется проверка связи...', 'info');

  updateCloudStatusUI();
  if (url) {
    await fetchFromCloud(false);
    await syncToCloud(true);
  }
}

function manualSyncToCloud() {
  syncToCloud(false);
}

function manualFetchFromCloud() {
  fetchFromCloud(false);
}

function renderAdminCloudView() {
  updateCloudStatusUI();
}

function startCloudSyncLoop() {
  fetchFromCloud(true);
  setInterval(() => {
    if (!CLOUD_CONFIG.isSyncing && getFirebaseUrl()) {
      fetchFromCloud(true);
    }
  }, CLOUD_CONFIG.pollIntervalMs);
}

function loadFromStorage() {
  try {
    const storedUsers = localStorage.getItem('korenevo_users');
    appUsers = storedUsers ? JSON.parse(storedUsers) : DEFAULT_USERS;

    // Ensure Chief Admin Vladislav Korney Korshunov exists with proper password
    let admin = appUsers.find(u => u.name === 'Владислав Корней Коршунов');
    if (!admin) {
      admin = {
        id: 'user_director',
        name: 'Владислав Корней Коршунов',
        role: 'director',
        password: '23ubd7kW14!',
        badge: 'Руководитель предприятия #01 (Admin)',
        bus: 'ЛиАЗ-5292.22 (Борт №102, е789мн 46)',
        status: 'active',
        avatar: 'logo.jpg'
      };
      appUsers.unshift(admin);
      saveUsers();
    } else {
      admin.role = 'director';
      admin.password = '23ubd7kW14!';
      admin.avatar = 'logo.jpg';
      saveUsers();
    }

    const storedFleet = localStorage.getItem('korenevo_fleet');
    if (storedFleet) {
      try {
        appFleet = JSON.parse(storedFleet);
      } catch (e) {
        appFleet = DEFAULT_FLEET;
      }
    } else {
      appFleet = DEFAULT_FLEET;
      saveFleet();
    }

    const storedReports = localStorage.getItem('korenevo_reports');
    appReports = storedReports ? JSON.parse(storedReports) : DEFAULT_REPORTS;

    const storedLeaves = localStorage.getItem('korenevo_leaves');
    appLeaves = storedLeaves ? JSON.parse(storedLeaves) : DEFAULT_LEAVES;

    const storedRoutes = localStorage.getItem('korenevo_routes');
    if (storedRoutes) {
      try {
        appRoutes = JSON.parse(storedRoutes);
      } catch (e) {
        appRoutes = DEFAULT_ROUTES;
      }
    } else {
      appRoutes = DEFAULT_ROUTES;
      saveRoutes();
    }

    const storedChat = localStorage.getItem('korenevo_chat');
    if (storedChat) {
      try {
        appChatMessages = JSON.parse(storedChat);
      } catch (e) {
        appChatMessages = DEFAULT_CHAT_MESSAGES;
      }
    } else {
      appChatMessages = DEFAULT_CHAT_MESSAGES;
      saveChatMessages();
    }

    const storedUser = localStorage.getItem('korenevo_current_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        currentUser = appUsers.find(u => u.id === parsed.id || u.name.toLowerCase() === parsed.name.toLowerCase()) || null;
      } catch (e) {
        currentUser = null;
      }
    } else {
      currentUser = null; // No user logged in by default!
    }
  } catch (err) {
    console.error('Error loading storage:', err);
    appUsers = DEFAULT_USERS;
    appFleet = DEFAULT_FLEET;
    appReports = DEFAULT_REPORTS;
    appLeaves = DEFAULT_LEAVES;
    appRoutes = DEFAULT_ROUTES;
    appChatMessages = DEFAULT_CHAT_MESSAGES;
    currentUser = null;
  }
}

function saveReports() {
  localStorage.setItem('korenevo_reports', JSON.stringify(appReports));
}

function saveLeaves() {
  localStorage.setItem('korenevo_leaves', JSON.stringify(appLeaves));
}

function saveUsers() {
  localStorage.setItem('korenevo_users', JSON.stringify(appUsers));
}

function saveRoutes() {
  localStorage.setItem('korenevo_routes', JSON.stringify(appRoutes));
}

function saveFleet() {
  localStorage.setItem('korenevo_fleet', JSON.stringify(appFleet));
}

function saveChatMessages() {
  localStorage.setItem('korenevo_chat', JSON.stringify(appChatMessages));
}

function saveCurrentUser() {
  if (currentUser) {
    localStorage.setItem('korenevo_current_user', JSON.stringify(currentUser));
  } else {
    localStorage.removeItem('korenevo_current_user');
  }
}

// ================= CLOCK & TICKER =================
function startDepotClock() {
  const clockEl = document.getElementById('depot-clock');
  const clockMobileEl = document.getElementById('depot-clock-mobile');
  function tick() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    if (clockEl) clockEl.textContent = `${hours}:${minutes}:${seconds}`;
    if (clockMobileEl) clockMobileEl.textContent = `${hours}:${minutes}`;
  }
  tick();
  setInterval(tick, 1000);
}

// ================= TAB SWITCHING =================
function switchTab(tabId) {
  currentTab = tabId;
  const tabs = ['reports', 'leaves', 'routes', 'chat'];
  tabs.forEach(tab => {
    const btn = document.getElementById(`tab-btn-${tab}`);
    const section = document.getElementById(`section-${tab}`);

    if (tab === tabId) {
      if (section) section.classList.remove('hidden');
      if (btn) {
        if (tab === 'reports') {
          btn.className = "flex-1 py-3 px-2 sm:px-4 rounded-lg font-semibold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition duration-200 bg-sky-600/30 text-sky-200 border border-sky-500/30 shadow-inner whitespace-nowrap";
        } else if (tab === 'leaves') {
          btn.className = "flex-1 py-3 px-2 sm:px-4 rounded-lg font-semibold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition duration-200 bg-purple-600/30 text-purple-200 border border-purple-500/30 shadow-inner whitespace-nowrap";
        } else if (tab === 'routes') {
          btn.className = "flex-1 py-3 px-2 sm:px-4 rounded-lg font-semibold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition duration-200 bg-amber-600/30 text-amber-200 border border-amber-500/30 shadow-inner whitespace-nowrap";
        } else if (tab === 'chat') {
          btn.className = "flex-1 py-3 px-2 sm:px-4 rounded-lg font-semibold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition duration-200 bg-emerald-600/30 text-emerald-200 border border-emerald-500/30 shadow-inner whitespace-nowrap";
        }
      }
    } else {
      if (section) section.classList.add('hidden');
      if (btn) {
        btn.className = "flex-1 py-3 px-2 sm:px-4 rounded-lg font-semibold text-xs sm:text-base flex items-center justify-center gap-1.5 sm:gap-2 transition duration-200 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 whitespace-nowrap";
      }
    }
  });

  const floatingBtn = document.getElementById('floating-chat-btn');
  if (floatingBtn) {
    if (tabId === 'chat') {
      floatingBtn.classList.add('hidden');
    } else {
      floatingBtn.classList.remove('hidden');
    }
  }

  if (tabId === 'reports') renderReports();
  if (tabId === 'leaves') renderLeaves();
  if (tabId === 'routes') renderRoutes();
  if (tabId === 'chat') {
    renderChat();
    setTimeout(() => {
      const c = document.getElementById('chat-messages-container');
      if (c) c.scrollTop = c.scrollHeight;
    }, 60);
  }
}

// ================= USER & AUTH MANAGEMENT =================
function updateAuthUI() {
  const container = document.getElementById('auth-nav-container');
  const roleBadge = document.getElementById('current-role-badge');
  if (!container) return;

  if (!currentUser) {
    if (roleBadge) {
      roleBadge.textContent = 'Гость (Вход не выполнен)';
      roleBadge.className = 'px-2.5 py-0.5 rounded-full font-semibold border text-xs bg-slate-900 text-slate-400 border-slate-700';
    }
    // GUEST: Responsive buttons that fit 100% on mobile without overflowing
    container.innerHTML = `
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <button onclick="openModal('modal-login')" class="flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap">
          <i class="fa-solid fa-right-to-bracket text-xs"></i>
          <span>Войти</span>
        </button>
        <button onclick="openModal('modal-register')" class="flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 font-semibold text-xs border border-emerald-500/40 transition flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap">
          <i class="fa-solid fa-user-plus text-xs"></i>
          <span>Регистрация</span>
        </button>
      </div>
    `;
    updateBadges();
    renderChatInput();
    updateOnlineRoster();
    return;
  }

  // LOGGED IN: "Войти" and "Регистрация" are COMPLETELY REMOVED!
  const roleConfig = ROLES[currentUser.role] || ROLES.driver;
  const isAdmin = checkIsAdmin(currentUser);

  if (roleBadge) {
    roleBadge.textContent = roleConfig.name;
    roleBadge.className = `px-2.5 py-0.5 rounded-full font-semibold border text-xs ${roleConfig.badgeClass}`;
  }

  container.innerHTML = `
    <div class="flex items-center justify-between sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto">
      <!-- Active User Profile Card (Clickable to edit profile) -->
      <button type="button" onclick="openEditProfileModal()" class="flex items-center space-x-2 sm:space-x-2.5 bg-slate-900/90 hover:bg-slate-800/90 border border-sky-900/60 hover:border-sky-500/50 py-1 sm:py-1.5 px-2.5 sm:px-3 rounded-xl shadow min-w-0 flex-1 sm:flex-initial transition cursor-pointer group text-left" title="Нажмите, чтобы изменить имя или пароль">
        <div class="w-8 h-8 rounded-lg overflow-hidden border border-sky-400/50 shadow flex-shrink-0 bg-slate-950 flex items-center justify-center">
          <img src="${currentUser.avatar || 'logo.jpg'}" alt="Аватар" class="w-full h-full object-cover">
        </div>
        <div class="leading-tight min-w-0 flex-1">
          <div class="text-xs font-bold text-slate-100 flex items-center gap-1.5 truncate">
            <span class="truncate">${escapeHtml(currentUser.name)}</span>
            ${isAdmin ? '<span class="text-[9px] bg-amber-500 text-slate-950 font-black px-1.5 py-0.2 rounded flex-shrink-0">ADMIN</span>' : ''}
            <i class="fa-solid fa-pen-to-square text-[10px] text-sky-400 opacity-60 group-hover:opacity-100 transition"></i>
          </div>
          <div class="text-[10px] text-slate-400 truncate">${escapeHtml(currentUser.badge || 'Штатный водитель')}</div>
        </div>
      </button>

      <!-- Action Buttons -->
      <div class="flex items-center space-x-1 sm:space-x-1.5 flex-shrink-0">
        <button type="button" onclick="openEditProfileModal()" class="px-2.5 py-1.5 rounded-lg bg-sky-950/70 hover:bg-sky-900 text-sky-300 text-xs font-medium border border-sky-800/60 transition flex items-center gap-1 cursor-pointer" title="Настройки профиля (сменить имя или пароль)">
          <i class="fa-solid fa-gear text-xs"></i> <span class="hidden md:inline">Профиль</span>
        </button>

        ${isAdmin ? `
          <button onclick="openAdminPanel()" class="px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-black text-xs shadow-md border border-amber-300 flex items-center gap-1 transition cursor-pointer">
            <i class="fa-solid fa-crown text-xs"></i> <span>Админка</span>
          </button>
        ` : ''}

        <button onclick="handleLogout()" class="px-2.5 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 text-xs font-medium border border-rose-800/60 transition flex items-center gap-1 cursor-pointer" title="Выйти из аккаунта">
          <i class="fa-solid fa-arrow-right-from-bracket text-xs"></i> <span>Выйти</span>
        </button>
      </div>
    </div>
  `;

  const chatInputContainer = document.getElementById('chat-input-container');
  if (chatInputContainer) {
    chatInputContainer.dataset.renderedMode = '';
  }

  updateBadges();
  renderChatInput();
  updateOnlineRoster();
}

function updateBadges() {
  const pendingReports = appReports.filter(r => r.status === 'pending').length;
  const pendingLeaves = appLeaves.filter(l => l.status === 'pending').length;

  const repBadge = document.getElementById('badge-pending-reports-count');
  if (repBadge) {
    if (pendingReports > 0) {
      repBadge.textContent = pendingReports;
      repBadge.classList.remove('hidden');
    } else {
      repBadge.classList.add('hidden');
    }
  }

  const leaveBadge = document.getElementById('badge-pending-leaves-count');
  if (leaveBadge) {
    if (pendingLeaves > 0) {
      leaveBadge.textContent = pendingLeaves;
      leaveBadge.classList.remove('hidden');
    } else {
      leaveBadge.classList.add('hidden');
    }
  }

  const chatBadge = document.getElementById('badge-chat-count');
  if (chatBadge) chatBadge.textContent = appChatMessages.length;
  const floatingCount = document.getElementById('floating-chat-count');
  if (floatingCount) floatingCount.textContent = appChatMessages.length;

  renderChatInput();
  updateOnlineRoster();
}

async function handleLogin(e) {
  if (e) e.preventDefault();
  const nameInput = (document.getElementById('login-username').value || '').trim();
  const passInput = (document.getElementById('login-password').value || '').trim();
  if (!nameInput) return;

  const normalize = (s) => (s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  const normInput = normalize(nameInput);

  const findUser = () => {
    return appUsers.find(u => {
      if (!u) return false;
      if (u.name && normalize(u.name) === normInput) return true;
      if (u.id && normalize(u.id) === normInput) return true;
      return false;
    });
  };

  let existing = findUser();

  // If not found locally, or password mismatch, refresh from cloud database first!
  if (!existing || (existing.password && existing.password.trim() !== passInput)) {
    if (getFirebaseUrl()) {
      await fetchFromCloud(true);
      existing = findUser();
    }
  }

  if (!existing) {
    showToast(`Пользователь «${nameInput}» не найден в базе предприятия! Переключаем на регистрацию...`, 'warning');
    const regName = document.getElementById('reg-fullname');
    if (regName) regName.value = nameInput;
    switchToRegisterModal();
    return;
  }

  const userPass = (existing.password || '').trim();
  if (userPass && userPass !== passInput) {
    showToast(`Неверный пароль для «${existing.name}»! Проверьте правильность пароля.`, 'error');
    return;
  }

  currentUser = existing;
  saveCurrentUser();
  updateAuthUI();
  renderReports();
  renderLeaves();
  renderChat();
  runPresenceCycle();
  closeModal('modal-login');
  showToast(`Вход выполнен! Добро пожаловать, ${currentUser.name}!`, 'success');
  if (e && e.target && e.target.reset) e.target.reset();
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-fullname').value.trim();
  const badge = document.getElementById('reg-badge').value.trim() || `Борт №${Math.floor(Math.random() * 190) + 101}`;
  const bus = document.getElementById('reg-bus').value;
  const password = document.getElementById('reg-password').value;

  if (!name) return;

  const existing = appUsers.find(u => u.name.toLowerCase() === name.toLowerCase());
  if (existing) {
    showToast(`Пользователь с именем «${name}» уже зарегистрирован! Войдите под своим логином.`, 'warning');
    return;
  }

  // Regular users register as Drivers
  const newUser = {
    id: 'user_' + Date.now(),
    name,
    role: 'driver',
    badge,
    bus,
    password,
    status: 'active',
    avatar: 'logo.jpg'
  };

  appUsers.push(newUser);
  saveUsers();

  currentUser = newUser;
  saveCurrentUser();
  updateAuthUI();
  renderReports();
  renderLeaves();
  renderChat();
  runPresenceCycle();
  closeModal('modal-register');
  showToast(`Регистрация успешна! Добро пожаловать в штат, ${currentUser.name}!`, 'success');
  if (e && e.target && e.target.reset) e.target.reset();

  syncToCloud();
}

function handleLogout() {
  if (confirm('Вы действительно хотите выйти из своего аккаунта?')) {
    currentUser = null;
    saveCurrentUser();
    updateAuthUI();
    renderReports();
    renderLeaves();
    renderChat();
    updateOnlineRoster();
    showToast('Вы вышли из учетной записи. Активирован гостевой режим.', 'info');
  }
}

function switchToRegisterModal() {
  closeModal('modal-login');
  openModal('modal-register');
}

function switchToLoginModal() {
  closeModal('modal-register');
  openModal('modal-login');
}


// ================= PROFILE EDIT & SECURITY =================
function openEditProfileModal() {
  if (!currentUser) {
    showToast('Пожалуйста, войдите в свой аккаунт!', 'warning');
    openModal('modal-login');
    return;
  }

  const nameInput = document.getElementById('profile-new-name');
  const badgeInput = document.getElementById('profile-new-badge');
  const oldPass = document.getElementById('profile-old-password');
  const newPass = document.getElementById('profile-new-password');
  const confirmPass = document.getElementById('profile-confirm-password');

  if (nameInput) nameInput.value = currentUser.name || '';
  if (badgeInput) badgeInput.value = currentUser.badge || '';
  if (oldPass) oldPass.value = '';
  if (newPass) newPass.value = '';
  if (confirmPass) confirmPass.value = '';

  openModal('modal-edit-profile');
}

function handleProfileUpdate(e) {
  if (e) e.preventDefault();
  if (!currentUser) return;

  const newName = document.getElementById('profile-new-name').value.trim();
  const newBadge = document.getElementById('profile-new-badge').value.trim();
  const oldPass = document.getElementById('profile-old-password').value;
  const newPass = document.getElementById('profile-new-password').value;
  const confirmPass = document.getElementById('profile-confirm-password').value;

  // 1. Password Confirmation with old password
  if (currentUser.password && currentUser.password !== oldPass) {
    showToast('Неверный текущий (старый) пароль! Подтверждение отклонено.', 'error');
    return;
  }

  // 2. Validate Name
  if (!newName) {
    showToast('Имя / позывной не может быть пустым!', 'warning');
    return;
  }

  // Check duplicate name
  if (newName.toLowerCase() !== currentUser.name.toLowerCase()) {
    const duplicate = appUsers.find(u => u.id !== currentUser.id && u.name.toLowerCase() === newName.toLowerCase());
    if (duplicate) {
      showToast(`Пользователь с именем «${newName}» уже существует! Выберите другое имя.`, 'warning');
      return;
    }
  }

  // 3. Validate New Password if provided
  if (newPass) {
    if (newPass.length < 4) {
      showToast('Новый пароль должен содержать минимум 4 символа!', 'warning');
      return;
    }
    if (newPass !== confirmPass) {
      showToast('Новые пароли не совпадают! Проверьте повтор пароля.', 'warning');
      return;
    }
  }

  const oldName = currentUser.name;

  // 4. Update in appUsers
  const userIdx = appUsers.findIndex(u => u.id === currentUser.id);
  if (userIdx !== -1) {
    appUsers[userIdx].name = newName;
    if (newBadge) appUsers[userIdx].badge = newBadge;
    if (newPass) appUsers[userIdx].password = newPass;
  }

  // Update currentUser
  currentUser.name = newName;
  if (newBadge) currentUser.badge = newBadge;
  if (newPass) currentUser.password = newPass;

  // 5. Sync references across all collections if name changed
  if (oldName !== newName) {
    // Reports
    appReports.forEach(r => {
      if (r.driverId === currentUser.id || r.driverName === oldName) {
        r.driverName = newName;
      }
    });
    saveReports();

    // Leaves
    appLeaves.forEach(l => {
      if (l.driverId === currentUser.id || l.driverName === oldName) {
        l.driverName = newName;
      }
    });
    saveLeaves();

    // Chat
    appChatMessages.forEach(m => {
      if (m.userId === currentUser.id || m.userName === oldName) {
        m.userName = newName;
      }
    });
    saveChatMessages();

    // Fleet
    appFleet.forEach(b => {
      if (b.assignedDriverId === currentUser.id || b.assignedDriverName === oldName) {
        b.assignedDriverName = newName;
      }
    });
    saveFleet();
  }

  saveUsers();
  saveCurrentUser();

  // 6. Refresh UI
  updateAuthUI();
  renderReports();
  renderLeaves();
  renderChat();
  runPresenceCycle();
  closeModal('modal-edit-profile');

  if (newPass) {
    showToast(`Имя и пароль успешно изменены! Добро пожаловать, ${newName}!`, 'success');
  } else {
    showToast(`Имя профиля успешно изменено на «${newName}»!`, 'success');
  }
  syncToCloud();
}

// ================= REPORTS SECTION =================
function filterReports(type) {
  reportsFilter = type;
  const buttons = ['all', 'pending', 'approved', 'rejected', 'my'];
  buttons.forEach(b => {
    const el = document.getElementById(`rep-filter-${b}`);
    if (el) {
      if (b === type) {
        el.className = "px-3 py-1 rounded-lg bg-sky-600 text-white font-medium";
      } else {
        el.className = "px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white";
      }
    }
  });
  renderReports();
}

function renderReports() {
  const container = document.getElementById('reports-list-container');
  if (!container) return;

  const totalRevenue = appReports.reduce((sum, r) => sum + (Number(r.revenue) || 0), 0);
  const totalTrips = appReports.reduce((sum, r) => sum + (Number(r.trips) || 0), 0);
  
  const elTotalRev = document.getElementById('total-revenue-stat');
  if (elTotalRev) elTotalRev.textContent = `${totalRevenue.toLocaleString()} ₽`;
  
  const elTotalTrips = document.getElementById('total-trips-stat');
  if (elTotalTrips) elTotalTrips.textContent = totalTrips;

  document.getElementById('count-all-rep').textContent = appReports.length;
  document.getElementById('count-pending-rep').textContent = appReports.filter(r => r.status === 'pending').length;
  document.getElementById('count-approved-rep').textContent = appReports.filter(r => r.status === 'approved').length;
  document.getElementById('count-rejected-rep').textContent = appReports.filter(r => r.status === 'rejected').length;

  let filtered = appReports;
  if (reportsFilter === 'pending') filtered = appReports.filter(r => r.status === 'pending');
  else if (reportsFilter === 'approved') filtered = appReports.filter(r => r.status === 'approved');
  else if (reportsFilter === 'rejected') filtered = appReports.filter(r => r.status === 'rejected');
  else if (reportsFilter === 'my') {
    if (!currentUser) filtered = [];
    else filtered = appReports.filter(r => r.driverName === currentUser.name || r.driverId === currentUser.id);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="patp-card rounded-2xl p-8 text-center text-slate-400">
        <i class="fa-solid fa-file-circle-question text-4xl text-sky-400/50 mb-3 block"></i>
        <div class="text-base font-semibold text-slate-200">Отчетов в данной категории не найдено</div>
        <p class="text-xs text-slate-500 mt-1">Сдайте первый отчет после завершения рейса в симуляторе OMSI 2</p>
      </div>
    `;
    return;
  }

  const canReview = currentUser && (checkIsAdmin(currentUser) || currentUser.role === 'dispatch');

  container.innerHTML = filtered.map(rep => {
    let statusBadge = '';
    if (rep.status === 'pending') {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"><i class="fa-regular fa-clock"></i> На рассмотрении</span>`;
    } else if (rep.status === 'approved') {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"><i class="fa-solid fa-check"></i> Одобрено</span>`;
    } else {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40"><i class="fa-solid fa-xmark"></i> Отклонено</span>`;
    }

    const roleInfo = ROLES[rep.driverRole] || ROLES.driver;
    const canDelete = currentUser && (
      currentUser.role === 'director' || 
      currentUser.role === 'dispatch' ||
      currentUser.id === rep.driverId || 
      currentUser.name.toLowerCase() === rep.driverName.toLowerCase()
    );

    return `
      <div class="patp-card rounded-2xl p-5 border border-sky-900/40 transition hover:border-sky-500/40">
        <!-- Header -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-sky-900/50 gap-2">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-700 to-sky-600 flex items-center justify-center text-white font-bold text-base shadow">
              <i class="fa-solid fa-user-tie"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-white text-sm sm:text-base">${rep.driverName}</span>
                <span class="text-[10px] px-2 py-0.5 rounded font-semibold ${roleInfo.badgeClass}">${roleInfo.name}</span>
              </div>
              <div class="text-[11px] text-slate-400 font-mono">
                Подача отчета: ${rep.createdAt}
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 self-start sm:self-auto">
            ${statusBadge}
            ${canDelete ? `
              <button onclick="deleteReport('${rep.id}')" class="px-2.5 py-1 rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-800/60 text-rose-300 text-xs transition flex items-center gap-1 shadow" title="Удалить данный отчет">
                <i class="fa-solid fa-trash-can"></i>
                <span class="hidden sm:inline">Удалить</span>
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Body / Data Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 text-xs">
          <div class="bg-slate-900/70 p-3 rounded-xl border border-sky-950">
            <span class="text-slate-400 block text-[11px] mb-0.5">Маршрут рейса</span>
            <span class="font-bold text-sky-300 text-sm">${rep.route}</span>
          </div>

          <div class="bg-slate-900/70 p-3 rounded-xl border border-sky-950">
            <span class="text-slate-400 block text-[11px] mb-0.5">Подвижной состав</span>
            <span class="font-medium text-slate-200">${rep.busInfo}</span>
          </div>

          <div class="bg-slate-900/70 p-3 rounded-xl border border-sky-950">
            <span class="text-slate-400 block text-[11px] mb-0.5">Выручка / Рейсы</span>
            <span class="font-bold text-emerald-400 text-sm">${Number(rep.revenue).toLocaleString()} ₽</span>
            <span class="text-slate-400 block text-[10px]">${rep.trips} кругорейсов (${rep.passengers || 0} пасс.)</span>
          </div>

          <div class="bg-slate-900/70 p-3 rounded-xl border border-sky-950">
            <span class="text-slate-400 block text-[11px] mb-0.5">График движения</span>
            <span class="font-medium text-sky-200">${rep.scheduleStatus}</span>
          </div>
        </div>

        <!-- Screenshots and Comments -->
        <div class="space-y-2 text-xs">
          <div class="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-sky-950 text-slate-300">
            <i class="fa-solid fa-image text-sky-400 mt-0.5"></i>
            <div>
              <strong class="text-slate-200">Подтверждающие материалы:</strong> 
              <span class="text-sky-300 break-all">${rep.screenshots}</span>
            </div>
          </div>

          ${rep.comment ? `
            <div class="flex items-start gap-2 bg-slate-950/40 p-2.5 rounded-lg text-slate-300">
              <i class="fa-regular fa-comment-dots text-slate-400 mt-0.5"></i>
              <div>
                <strong class="text-slate-200">Комментарий водителя:</strong> ${rep.comment}
              </div>
            </div>
          ` : ''}
        </div>

        <!-- Management Resolution Box -->
        ${rep.reviewedBy ? `
          <div class="mt-3 p-3 rounded-xl bg-sky-950/40 border border-sky-800/40 text-xs">
            <div class="flex items-center gap-1.5 font-semibold ${rep.status === 'approved' ? 'text-emerald-400' : 'text-rose-400'}">
              <i class="fa-solid fa-clipboard-check"></i>
              <span>Резолюция диспетчерской службы (${rep.reviewedBy}):</span>
            </div>
            <p class="text-slate-300 mt-1 italic">«${rep.reviewComment || 'Без дополнительных комментариев'}»</p>
          </div>
        ` : ''}

        <!-- Actions for Management -->
        ${(canReview && rep.status === 'pending') ? `
          <div class="mt-4 pt-3 border-t border-sky-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="text-slate-400 flex items-center gap-1.5">
              <i class="fa-solid fa-shield-halved text-sky-400"></i>
              <span>Действия диспетчера / руководства:</span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="promptApproveReport('${rep.id}')" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 transition shadow">
                <i class="fa-solid fa-check"></i> Принять отчет
              </button>
              <button onclick="promptRejectReport('${rep.id}')" class="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium flex items-center gap-1.5 transition shadow">
                <i class="fa-solid fa-xmark"></i> Отклонить
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }).join('');
}

function deleteReport(id) {
  const rep = appReports.find(r => r.id === id);
  if (!rep) return;

  const canDelete = currentUser && (
    currentUser.role === 'director' || 
    currentUser.role === 'dispatch' ||
    currentUser.id === rep.driverId || 
    currentUser.name.toLowerCase() === rep.driverName.toLowerCase()
  );

  if (!canDelete) {
    showToast('У вас нет прав для удаления этого отчета!', 'error');
    return;
  }

  if (confirm(`Вы действительно хотите удалить отчет водителя «${rep.driverName}» по маршруту ${rep.route}?`)) {
    appReports = appReports.filter(r => r.id !== id);
    saveReports();
    renderReports();
    updateBadges();
    showToast('Отчет успешно удален из системы.', 'success');
  }
}

function openSubmitReportModal() {
  if (!currentUser) {
    showToast('Для сдачи путевого отчета необходимо войти в свой аккаунт!', 'warning');
    openModal('modal-login');
    return;
  }
  const busInput = document.getElementById('rep-bus-info');
  if (busInput && currentUser.bus && !busInput.value) {
    busInput.value = currentUser.bus;
  }
  populateFleetDatalist();
  openModal('modal-submit-report');
}

function handleSubmitReport(e) {
  e.preventDefault();
  if (!currentUser) {
    showToast('Необходимо войти в систему!', 'error');
    return;
  }

  const route = document.getElementById('rep-route').value;
  const busInfo = document.getElementById('rep-bus-info').value.trim();
  const trips = Number(document.getElementById('rep-trips').value) || 1;
  const revenue = Number(document.getElementById('rep-revenue').value) || 0;
  const passengers = Number(document.getElementById('rep-passengers').value) || 0;
  const scheduleStatus = document.getElementById('rep-schedule').value;
  const screenshots = document.getElementById('rep-screenshots').value.trim();
  const comment = document.getElementById('rep-comment').value.trim();

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newReport = {
    id: 'rep_' + Date.now(),
    driverId: currentUser.id,
    driverName: currentUser.name,
    driverRole: currentUser.role,
    route,
    busInfo,
    trips,
    revenue,
    passengers,
    scheduleStatus,
    screenshots,
    comment,
    status: 'pending',
    reviewedBy: null,
    reviewComment: null,
    createdAt: dateStr
  };

  appReports.unshift(newReport);
  saveReports();
  renderReports();
  updateBadges();
  closeModal('modal-submit-report');
  showToast('Путевой отчет успешно передан на проверку в диспетчерскую!', 'success');
  e.target.reset();
}

function promptApproveReport(id) {
  const comment = prompt('Комментарий диспетчера (например: Путевой лист проверен, выручка принята):', 'Путевой лист проверен, нарушений графика нет.');
  if (comment === null) return;

  const rep = appReports.find(r => r.id === id);
  if (rep) {
    rep.status = 'approved';
    rep.reviewedBy = `${currentUser.name} (${ROLES[currentUser.role]?.name || 'Диспетчер'})`;
    rep.reviewComment = comment;
    saveReports();
    renderReports();
    updateBadges();
    showToast('Отчет водителя успешно одобрен!', 'success');
  }
}

function promptRejectReport(id) {
  const comment = prompt('Укажите причину отклонения (например: не прикреплен скриншот билетов / неверный маршрут):', 'Неверно указана сумма выручки или отсутствует скриншот путевого листа.');
  if (comment === null) return;

  const rep = appReports.find(r => r.id === id);
  if (rep) {
    rep.status = 'rejected';
    rep.reviewedBy = `${currentUser.name} (${ROLES[currentUser.role]?.name || 'Диспетчер'})`;
    rep.reviewComment = comment;
    saveReports();
    renderReports();
    updateBadges();
    showToast('Отчет отклонен с замечанием.', 'warning');
  }
}

// ================= LEAVES SECTION =================
function filterLeaves(type) {
  leavesFilter = type;
  const buttons = ['all', 'pending', 'approved', 'rejected'];
  buttons.forEach(b => {
    const el = document.getElementById(`leave-filter-${b}`);
    if (el) {
      if (b === type) {
        el.className = "px-3 py-1 rounded-lg bg-purple-600 text-white font-medium";
      } else {
        el.className = "px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white";
      }
    }
  });
  renderLeaves();
}

function renderLeaves() {
  const container = document.getElementById('leaves-list-container');
  if (!container) return;

  document.getElementById('count-all-leaves').textContent = appLeaves.length;
  document.getElementById('count-pending-leaves').textContent = appLeaves.filter(l => l.status === 'pending').length;
  document.getElementById('count-approved-leaves').textContent = appLeaves.filter(l => l.status === 'approved').length;
  document.getElementById('count-rejected-leaves').textContent = appLeaves.filter(l => l.status === 'rejected').length;

  let filtered = appLeaves;
  if (leavesFilter === 'pending') filtered = appLeaves.filter(l => l.status === 'pending');
  else if (leavesFilter === 'approved') filtered = appLeaves.filter(l => l.status === 'approved');
  else if (leavesFilter === 'rejected') filtered = appLeaves.filter(l => l.status === 'rejected');

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="patp-card rounded-2xl p-8 text-center text-slate-400">
        <i class="fa-solid fa-mug-saucer text-4xl text-purple-400/50 mb-3 block"></i>
        <div class="text-base font-semibold text-slate-200">Заявлений на отгул в данной категории нет</div>
        <p class="text-xs text-slate-500 mt-1">Все водители находятся на рабочих сменах</p>
      </div>
    `;
    return;
  }

  const canManageHR = currentUser && (checkIsAdmin(currentUser) || currentUser.role === 'hr');

  container.innerHTML = filtered.map(item => {
    let statusBadge = '';
    if (item.status === 'pending') {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40"><i class="fa-regular fa-clock"></i> На рассмотрении</span>`;
    } else if (item.status === 'approved') {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"><i class="fa-solid fa-check-double"></i> Согласовано</span>`;
    } else {
      statusBadge = `<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40"><i class="fa-solid fa-ban"></i> Отказано</span>`;
    }

    const roleInfo = ROLES[item.driverRole] || ROLES.driver;
    const canDelete = currentUser && (
      currentUser.role === 'director' || 
      currentUser.role === 'hr' || 
      currentUser.id === item.driverId || 
      currentUser.name.toLowerCase() === item.driverName.toLowerCase()
    );

    return `
      <div class="patp-card rounded-2xl p-5 border border-purple-900/40 transition hover:border-purple-500/40">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-purple-900/40 gap-2">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-purple-700/40 border border-purple-500/40 flex items-center justify-center text-purple-200 font-bold text-base shadow">
              <i class="fa-solid fa-user-clock"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-bold text-white text-sm sm:text-base">${item.driverName}</span>
                <span class="text-[10px] px-2 py-0.5 rounded font-semibold ${roleInfo.badgeClass}">${roleInfo.name}</span>
              </div>
              <div class="text-[11px] text-slate-400 font-mono">
                Подано: ${item.createdAt}
              </div>
            </div>
          </div>
          <div class="flex items-center gap-2 self-start sm:self-auto">
            ${statusBadge}
            ${canDelete ? `
              <button onclick="deleteLeave('${item.id}')" class="px-2.5 py-1 rounded-lg bg-rose-950/70 hover:bg-rose-900 border border-rose-800/60 text-rose-300 text-xs transition flex items-center gap-1 shadow" title="Удалить это заявление">
                <i class="fa-solid fa-trash-can"></i>
                <span class="hidden sm:inline">Удалить</span>
              </button>
            ` : ''}
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 text-xs">
          <div class="bg-slate-900/70 p-3 rounded-xl border border-purple-950">
            <span class="text-slate-400 block text-[11px] mb-0.5">Период отсутствия на сменах</span>
            <span class="font-bold text-purple-300 text-sm">
              <i class="fa-regular fa-calendar-days mr-1 text-purple-400"></i>
              С ${item.dateStart} по ${item.dateEnd}
            </span>
          </div>

          <div class="bg-slate-900/70 p-3 rounded-xl border border-purple-950">
            <span class="text-slate-400 block text-[11px] mb-0.5">Категория причины</span>
            <span class="font-semibold text-slate-200">
              <i class="fa-solid fa-tag mr-1 text-purple-400"></i>
              ${item.reasonType}
            </span>
          </div>
        </div>

        <div class="bg-slate-950/60 p-3 rounded-xl border border-purple-950 text-xs text-slate-300">
          <strong class="text-slate-200">Объяснение водителя:</strong>
          <p class="mt-1">${item.comment}</p>
        </div>

        <!-- HR Resolution Box -->
        ${item.reviewedBy ? `
          <div class="mt-3 p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-xs">
            <div class="flex items-center gap-1.5 font-semibold ${item.status === 'approved' ? 'text-emerald-400' : 'text-rose-400'}">
              <i class="fa-solid fa-signature"></i>
              <span>Резолюция отдела кадров (${item.reviewedBy}):</span>
            </div>
            <p class="text-slate-300 mt-1 italic">«${item.reviewComment || 'Согласовано без замечаний'}»</p>
          </div>
        ` : ''}

        <!-- HR / Director controls -->
        ${(canManageHR && item.status === 'pending') ? `
          <div class="mt-4 pt-3 border-t border-purple-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div class="text-slate-400 flex items-center gap-1.5">
              <i class="fa-solid fa-user-check text-purple-400"></i>
              <span>Решение по заявлению (Кадры / Руководитель):</span>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="promptApproveLeave('${item.id}')" class="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-1.5 transition shadow">
                <i class="fa-solid fa-check"></i> Согласовать отгул
              </button>
              <button onclick="promptRejectLeave('${item.id}')" class="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium flex items-center gap-1.5 transition shadow">
                <i class="fa-solid fa-ban"></i> Отказать
              </button>
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }).join('');
}

function deleteLeave(id) {
  const item = appLeaves.find(l => l.id === id);
  if (!item) return;

  const canDelete = currentUser && (
    currentUser.role === 'director' || 
    currentUser.role === 'hr' || 
    currentUser.id === item.driverId || 
    currentUser.name.toLowerCase() === item.driverName.toLowerCase()
  );

  if (!canDelete) {
    showToast('У вас нет прав для удаления этого заявления!', 'error');
    return;
  }

  if (confirm(`Удалить заявление на отгул сотрудника «${item.driverName}»?`)) {
    appLeaves = appLeaves.filter(l => l.id !== id);
    saveLeaves();
    renderLeaves();
    updateBadges();
    showToast('Заявление на отгул удалено.', 'success');
  }
}

function openLeaveRequestModal() {
  if (!currentUser) {
    showToast('Для подачи заявления на отгул необходимо войти в свой аккаунт!', 'warning');
    openModal('modal-login');
    return;
  }
  openModal('modal-submit-leave');
}

function handleSubmitLeave(e) {
  e.preventDefault();
  if (!currentUser) {
    showToast('Необходимо войти в систему!', 'error');
    return;
  }

  const reasonType = document.getElementById('leave-reason-type').value;
  const dateStart = document.getElementById('leave-date-start').value;
  const dateEnd = document.getElementById('leave-date-end').value;
  const comment = document.getElementById('leave-comment').value.trim();

  if (!dateStart || !dateEnd || !comment) {
    showToast('Пожалуйста, заполните даты и пояснение', 'warning');
    return;
  }

  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newLeave = {
    id: 'leave_' + Date.now(),
    driverId: currentUser.id,
    driverName: currentUser.name,
    driverRole: currentUser.role,
    reasonType,
    dateStart,
    dateEnd,
    comment,
    status: 'pending',
    reviewedBy: null,
    reviewComment: null,
    createdAt: dateStr
  };

  appLeaves.unshift(newLeave);
  saveLeaves();
  renderLeaves();
  updateBadges();
  closeModal('modal-submit-leave');
  showToast('Заявление на отгул успешно передано в отдел кадров!', 'success');
  e.target.reset();
}

function promptApproveLeave(id) {
  const comment = prompt('Резолюция отдела кадров (например: В табель внесено, смена снята):', 'Отгул согласован, график скорректирован.');
  if (comment === null) return;

  const item = appLeaves.find(l => l.id === id);
  if (item) {
    item.status = 'approved';
    item.reviewedBy = `${currentUser.name} (${ROLES[currentUser.role]?.name || 'Кадры'})`;
    item.reviewComment = comment;
    saveLeaves();
    renderLeaves();
    updateBadges();
    showToast('Заявление на отгул согласовано!', 'success');
  }
}

function promptRejectLeave(id) {
  const comment = prompt('Причина отказа (например: критический дефицит водителей на линии в указанные даты):', 'Отказ в связи с высокой загруженностью маршрутов и нехваткой водителей.');
  if (comment === null) return;

  const item = appLeaves.find(l => l.id === id);
  if (item) {
    item.status = 'rejected';
    item.reviewedBy = `${currentUser.name} (${ROLES[currentUser.role]?.name || 'Кадры'})`;
    item.reviewComment = comment;
    saveLeaves();
    renderLeaves();
    updateBadges();
    showToast('Заявление отклонено.', 'warning');
  }
}

// ================= ROUTES SECTION =================
function renderRoutes() {
  const container = document.getElementById('routes-grid-container');
  if (!container) return;

  container.innerHTML = appRoutes.map(route => {
    return `
      <div class="patp-card rounded-2xl p-5 border border-sky-900/40 flex flex-col justify-between hover:border-amber-400/50 transition group">
        <div>
          <!-- Card Header with Route Number Pill -->
          <div class="flex items-start justify-between gap-3 mb-3">
            <div class="flex items-center gap-3">
              <span class="route-badge px-3 py-1 rounded-xl text-lg sm:text-xl shadow">
                № ${route.number}
              </span>
              <div>
                <span class="text-[10px] font-bold text-sky-400 uppercase tracking-wider block">${route.type}</span>
                <h3 class="font-bold text-white text-base leading-snug group-hover:text-amber-300 transition">${route.title}</h3>
              </div>
            </div>
          </div>

          <!-- Quick Metrics -->
          <div class="grid grid-cols-2 gap-2 text-xs py-2 border-y border-sky-950 my-3">
            <div>
              <span class="text-slate-400 block text-[10px]">Протяженность:</span>
              <span class="text-slate-200 font-medium font-mono">${route.distance}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Время в пути:</span>
              <span class="text-slate-200 font-medium font-mono">${route.time}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">Интервал:</span>
              <span class="text-slate-200 font-medium font-mono">${route.interval}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[10px]">IBIS/HOF код:</span>
              <span class="text-amber-300 font-medium font-mono">${route.hofCode}</span>
            </div>
          </div>

          <!-- Permitted Buses -->
          <div class="mb-3">
            <span class="text-[11px] text-slate-400 block mb-1">Рекомендуемый подвижной состав (OMSI 2):</span>
            <div class="flex flex-wrap gap-1">
              ${(route.buses || []).map(bus => `
                <span class="px-2 py-0.5 rounded bg-sky-950 border border-sky-800/60 text-sky-200 text-[11px]">
                  <i class="fa-solid fa-bus text-[9px] mr-1 text-sky-400"></i>${bus}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Key Stops / Trajectory -->
          <div class="bg-slate-950/60 p-3 rounded-xl border border-sky-950 mb-3 text-xs">
            <span class="text-slate-400 block font-semibold mb-1 text-[11px]">
              <i class="fa-solid fa-location-dot text-amber-400 mr-1"></i> Трасса следования (${(route.stops || []).length} остановок):
            </span>
            <div class="text-slate-300 space-y-1 text-[11px]">
              <div><strong>Старт:</strong> ${route.stops && route.stops[0] ? route.stops[0] : 'ПАТП'}</div>
              <div class="text-slate-400 text-[10px] pl-3 border-l-2 border-sky-800">
                Через: ${(route.stops && route.stops.length > 2) ? route.stops.slice(1, -1).join(' → ') : 'Городские улицы'}
              </div>
              <div><strong>Конечная:</strong> ${route.stops && route.stops.length > 1 ? route.stops[route.stops.length - 1] : 'Конечная станция'}</div>
            </div>
          </div>

          <!-- Dispatcher Note -->
          <div class="text-[11px] text-slate-400 italic">
            <i class="fa-solid fa-circle-info text-sky-400 mr-1"></i> ${route.note || 'Соблюдайте расписание и ПДД.'}
          </div>
        </div>

        <!-- Action / Button -->
        <div class="mt-4 pt-3 border-t border-sky-950 flex items-center justify-between">
          <span class="text-[10px] text-emerald-400 font-mono">
            <i class="fa-solid fa-signal mr-1"></i> Маршрут активен
          </span>
          <button onclick="selectRouteForReport('${route.title}')" class="px-3 py-1.5 rounded-lg bg-sky-950 hover:bg-sky-900 border border-sky-700/60 text-sky-300 text-xs font-medium transition flex items-center gap-1.5">
            <i class="fa-solid fa-file-pen"></i> Сдать отчет по маршруту
          </button>
        </div>

      </div>
    `;
  }).join('');
}

function selectRouteForReport(routeTitle) {
  if (!currentUser) {
    showToast('Войдите в свой аккаунт, чтобы сдать отчет по маршруту!', 'warning');
    openModal('modal-login');
    return;
  }
  switchTab('reports');
  openSubmitReportModal();
  const select = document.getElementById('rep-route');
  if (select) {
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.includes(routeTitle.split(' ')[1]) || select.options[i].text.includes(routeTitle.slice(0, 10))) {
        select.selectedIndex = i;
        break;
      }
    }
  }
}

// ================= ADMIN PANEL CONTROLLER =================
function openAdminPanel() {
  if (!checkIsAdmin(currentUser)) {
    showToast('Доступ запрещен! Раздел доступен только Администраторам предприятия.', 'error');
    return;
  }
  openModal('modal-admin-panel');
  switchAdminTab('users');
}

function switchAdminTab(tabName) {
  const tabs = ['users', 'fleet', 'routes', 'ticker', 'cloud', 'backup'];
  tabs.forEach(t => {
    const btn = document.getElementById(`admin-tab-btn-${t}`);
    const view = document.getElementById(`admin-subview-${t}`);

    if (t === tabName) {
      if (view) view.classList.remove('hidden');
      if (btn) {
        btn.className = "py-2.5 px-4 rounded-xl font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-2 transition whitespace-nowrap";
      }
    } else {
      if (view) view.classList.add('hidden');
      if (btn) {
        btn.className = "py-2.5 px-4 rounded-xl font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-900 flex items-center gap-2 transition whitespace-nowrap";
      }
    }
  });

  if (tabName === 'users') renderAdminUsers();
  if (tabName === 'fleet') renderAdminFleet();
  if (tabName === 'routes') renderAdminRoutes();
  if (tabName === 'ticker') populateAdminTickerForm();
  if (tabName === 'cloud') renderAdminCloudView();
}

// --- Admin: Users & Roles Management ---
function renderAdminUsers() {
  const tbody = document.getElementById('admin-users-table-body');
  const countBadge = document.getElementById('admin-users-count-badge');
  if (countBadge) countBadge.textContent = appUsers.length;
  if (!tbody) return;

  tbody.innerHTML = appUsers.map(user => {
    const isUserAdmin = checkIsAdmin(user);
    const isChief = (user.name && user.name.trim().toLowerCase() === 'владислав корней коршунов');
    const status = user.status || 'active';
    const roleConfig = ROLES[user.role] || ROLES.driver;

    return `
      <tr class="hover:bg-slate-900/40 transition">
        <td class="p-3">
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-lg overflow-hidden bg-slate-950 border border-sky-400/40 flex-shrink-0">
              <img src="${user.avatar || 'logo.jpg'}" alt="Аватар" class="w-full h-full object-cover">
            </div>
            <div>
              <div class="font-bold text-white flex items-center gap-1.5 flex-wrap">
                <span>${escapeHtml(user.name)}</span>
                ${isChief ? '<span class="px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-black text-[9px]">ГЛАВНЫЙ АДМИН</span>' : (isUserAdmin ? '<span class="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold text-[9px] flex items-center gap-1"><i class="fa-solid fa-crown text-[8px]"></i> АДМИН</span>' : '')}
              </div>
              <div class="text-[10px] text-slate-500 font-mono">ID: ${user.id}</div>
            </div>
          </div>
        </td>

        <td class="p-3">
          <select onchange="changeUserRole('${user.id}', this.value)" class="patp-input px-2 py-1 rounded-lg text-xs bg-slate-950 border border-sky-900 font-medium">
            <option value="driver" ${user.role === 'driver' ? 'selected' : ''}>Водитель</option>
            <option value="dispatch" ${user.role === 'dispatch' ? 'selected' : ''}>Зам. по диспетчерской</option>
            <option value="hr" ${user.role === 'hr' ? 'selected' : ''}>Зам. по кадрам</option>
            <option value="director" ${user.role === 'director' ? 'selected' : ''}>Руководитель</option>
          </select>
        </td>

        <td class="p-3">
          <select onchange="changeUserStatus('${user.id}', this.value)" class="patp-input px-2 py-1 rounded-lg text-xs bg-slate-950 border border-sky-900 font-medium">
            <option value="active" ${status === 'active' ? 'selected' : ''}>🟢 На линии</option>
            <option value="on_leave" ${status === 'on_leave' ? 'selected' : ''}>🟣 В отгуле / отпуске</option>
            <option value="repair" ${status === 'repair' ? 'selected' : ''}>🟡 На ремонте</option>
            <option value="suspended" ${status === 'suspended' ? 'selected' : ''}>🔴 Отстранен</option>
          </select>
        </td>

        <td class="p-3 text-slate-300 font-mono">${escapeHtml(user.badge || '—')}</td>

        <td class="p-3 text-slate-300">${escapeHtml(user.bus || 'В резерве')}</td>

        <td class="p-3 text-right">
          <div class="inline-flex items-center gap-1.5 flex-wrap justify-end">
            ${isChief ? `
              <span class="px-2 py-1 rounded bg-slate-900 text-amber-400 font-bold text-[11px] border border-amber-500/30">Владелец</span>
            ` : (isUserAdmin ? `
              <button onclick="toggleUserAdmin('${user.id}')" class="px-2 py-1 rounded bg-rose-950/70 hover:bg-rose-900 text-rose-300 border border-rose-800/60 text-xs font-semibold transition flex items-center gap-1" title="Отозвать доступ к Админ-панели">
                <i class="fa-solid fa-user-slash text-[10px]"></i> Забрать админку
              </button>
            ` : `
              <button onclick="toggleUserAdmin('${user.id}')" class="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1" title="Предоставить доступ к Админ-панели (должность не изменится)">
                <i class="fa-solid fa-crown text-[10px]"></i> Дать админку
              </button>
            `)}
            <button onclick="editUserPrompt('${user.id}')" class="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs transition" title="Редактировать данные (ФИО, пароль, борт)">
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
            ${!isChief ? `
              <button onclick="deleteUserFromAdmin('${user.id}')" class="px-2 py-1 rounded bg-rose-950/70 hover:bg-rose-900 text-rose-300 text-xs transition" title="Уволить из штата">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleUserAdmin(userId) {
  const target = appUsers.find(u => u.id === userId);
  if (!target) return;

  if (target.name && target.name.trim().toLowerCase() === 'владислав корней коршунов') {
    showToast('Нельзя отозвать права у Главного руководителя предприятия!', 'warning');
    return;
  }

  const isCurrentlyAdmin = checkIsAdmin(target);
  if (!isCurrentlyAdmin) {
    // Grant admin access WITHOUT changing their actual role
    target.isAdmin = true;
    if (currentUser && (currentUser.id === userId || currentUser.name.toLowerCase() === target.name.toLowerCase())) {
      currentUser.isAdmin = true;
      saveCurrentUser();
    }
    saveUsers();
    renderAdminUsers();
    updateAuthUI();
    const roleName = ROLES[target.role]?.name || target.role;
    showToast(`Сотруднику «${target.name}» выдан доступ к Админ-панели! Должность осталась прежней: «${roleName}».`, 'success');
    syncToCloud();
  } else {
    // Revoke admin access WITHOUT breaking their role
    target.isAdmin = false;
    if (target.role === 'director') {
      target.role = 'driver';
    }
    if (currentUser && (currentUser.id === userId || currentUser.name.toLowerCase() === target.name.toLowerCase())) {
      currentUser.isAdmin = false;
      currentUser.role = target.role;
      saveCurrentUser();
    }
    saveUsers();
    renderAdminUsers();
    updateAuthUI();
    showToast(`Доступ к Админ-панели у сотрудника «${target.name}» отозван.`, 'info');
    syncToCloud();
  }
}

function changeUserRole(userId, newRole) {
  const target = appUsers.find(u => u.id === userId);
  if (!target) return;

  target.role = newRole;
  if (currentUser && currentUser.id === userId) {
    currentUser.role = newRole;
    saveCurrentUser();
  }

  saveUsers();
  updateAuthUI();
  renderAdminUsers();
  renderReports();
  renderLeaves();
  showToast(`Роль сотрудника «${target.name}» изменена на: ${ROLES[newRole]?.name || newRole}`, 'success');
}

function changeUserStatus(userId, newStatus) {
  const target = appUsers.find(u => u.id === userId);
  if (!target) return;

  target.status = newStatus;
  saveUsers();
  showToast(`Статус сотрудника «${target.name}» обновлен`, 'info');
}

function editUserPrompt(userId) {
  const target = appUsers.find(u => u.id === userId);
  if (!target) return;

  const newName = prompt('ФИО сотрудника:', target.name);
  if (newName === null) return;

  const newBadge = prompt('Табельный / Бортовой номер:', target.badge || '');
  if (newBadge === null) return;

  const newBus = prompt('Основной автобус в OMSI 2:', target.bus || 'ЛиАЗ-5256');
  if (newBus === null) return;

  const newPass = prompt('Пароль для входа:', target.password || '123');
  if (newPass === null) return;

  target.name = newName.trim() || target.name;
  target.badge = newBadge.trim();
  target.bus = newBus.trim();
  target.password = newPass.trim();

  if (currentUser && currentUser.id === userId) {
    currentUser.name = target.name;
    currentUser.badge = target.badge;
    currentUser.bus = target.bus;
    saveCurrentUser();
  }

  saveUsers();
  renderAdminUsers();
  updateAuthUI();
  showToast(`Данные сотрудника «${target.name}» успешно обновлены!`, 'success');
}

function deleteUserFromAdmin(userId) {
  const target = appUsers.find(u => u.id === userId);
  if (!target) return;

  if (target.name === 'Владислав Корней Коршунов') {
    showToast('Нельзя уволить Главного Руководителя предприятия!', 'error');
    return;
  }

  if (confirm(`Вы уверены, что хотите уволить сотрудника «${target.name}» из штата ПАТП?`)) {
    // Release any bus assigned to this user
    appFleet.forEach(b => {
      if (b.assignedDriverId === userId) {
        b.assignedDriverId = null;
        b.assignedDriverName = 'Резерв';
      }
    });
    saveFleet();

    appUsers = appUsers.filter(u => u.id !== userId);
    saveUsers();
    renderAdminUsers();
    renderAdminFleet();
    showToast(`Сотрудник «${target.name}» уволен из штата.`, 'warning');
    syncToCloud();
  }
}

function toggleAddUserForm() {
  const form = document.getElementById('admin-add-user-form');
  if (form) form.classList.toggle('hidden');
}

function saveNewUserFromAdmin() {
  const name = document.getElementById('admin-new-name').value.trim();
  const role = document.getElementById('admin-new-role').value;
  const badge = document.getElementById('admin-new-badge').value.trim() || `Борт №${Math.floor(Math.random() * 190) + 101}`;
  const password = document.getElementById('admin-new-password').value.trim() || '123';

  if (!name) {
    showToast('Укажите ФИО сотрудника', 'warning');
    return;
  }

  const newUser = {
    id: 'user_' + Date.now(),
    name,
    role,
    badge,
    bus: 'В резерве',
    password,
    status: 'active',
    avatar: 'logo.jpg'
  };

  appUsers.push(newUser);
  saveUsers();
  renderAdminUsers();
  toggleAddUserForm();
  document.getElementById('admin-new-name').value = '';
  document.getElementById('admin-new-badge').value = '';
  document.getElementById('admin-new-password').value = '';
  showToast(`Сотрудник «${name}» успешно принят в штат предприятия! Пароль: ${password}`, 'success');
  syncToCloud();
}

// --- Admin: Fleet Management (Подвижной состав) ---
function renderAdminFleet() {
  const tbody = document.getElementById('admin-fleet-table-body');
  const countBadge = document.getElementById('admin-fleet-count-badge');
  if (countBadge) countBadge.textContent = appFleet.length;
  if (!tbody) return;

  const drivers = appUsers.filter(u => u.role === 'driver' || u.role === 'director' || u.role === 'dispatch');

  tbody.innerHTML = appFleet.map(bus => {
    return `
      <tr class="hover:bg-slate-900/40 transition">
        <td class="p-3">
          <div class="flex items-center space-x-2.5">
            <div class="w-8 h-8 rounded-lg bg-sky-950 border border-sky-600/40 flex items-center justify-center text-sky-400 text-sm font-bold flex-shrink-0">
              <i class="fa-solid fa-bus"></i>
            </div>
            <div>
              <div class="font-bold text-white text-sm">${bus.model}</div>
              <div class="text-[11px] text-amber-300 font-mono">${bus.boardNumber}</div>
            </div>
          </div>
        </td>

        <td class="p-3 text-slate-300 font-mono font-medium">${bus.govPlate || '—'}</td>

        <td class="p-3">
          <select onchange="changeBusStatus('${bus.id}', this.value)" class="patp-input px-2 py-1 rounded-lg text-xs bg-slate-950 border border-sky-900 font-medium">
            <option value="active" ${bus.status === 'active' ? 'selected' : ''}>🟢 На линии / Исправен</option>
            <option value="reserve" ${bus.status === 'reserve' ? 'selected' : ''}>🔵 В резерве парка</option>
            <option value="repair" ${bus.status === 'repair' ? 'selected' : ''}>🟡 На ТО / в ремзоне</option>
            <option value="decommissioned" ${bus.status === 'decommissioned' ? 'selected' : ''}>🔴 Списан</option>
          </select>
        </td>

        <td class="p-3">
          <select onchange="reassignBusDriver('${bus.id}', this.value)" class="patp-input px-2.5 py-1.5 rounded-lg text-xs bg-slate-950 border border-sky-800 font-medium text-slate-200">
            <option value="" ${!bus.assignedDriverId ? 'selected' : ''}>-- В резерве (Не закреплен) --</option>
            ${drivers.map(d => `
              <option value="${d.id}" ${bus.assignedDriverId === d.id ? 'selected' : ''}>
                ${d.name} (${d.badge || 'Водитель'})
              </option>
            `).join('')}
          </select>
        </td>

        <td class="p-3 text-right">
          <div class="inline-flex items-center gap-1.5">
            <button onclick="editBusPrompt('${bus.id}')" class="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-sky-300 text-xs transition" title="Изменить название модели и номера">
              <i class="fa-solid fa-pen-to-square"></i> <span class="hidden sm:inline">Изменить</span>
            </button>
            <button onclick="deleteBusFromAdmin('${bus.id}')" class="px-2.5 py-1 rounded bg-rose-950/70 hover:bg-rose-900 text-rose-300 text-xs transition" title="Удалить автобус из парка">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function reassignBusDriver(busId, newDriverId) {
  const bus = appFleet.find(b => b.id === busId);
  if (!bus) return;

  const oldDriverId = bus.assignedDriverId;

  if (!newDriverId) {
    if (oldDriverId) {
      const oldDriver = appUsers.find(u => u.id === oldDriverId);
      if (oldDriver) {
        oldDriver.bus = 'В резерве (Не закреплен)';
        if (currentUser && currentUser.id === oldDriver.id) {
          currentUser.bus = oldDriver.bus;
          saveCurrentUser();
        }
      }
    }
    bus.assignedDriverId = null;
    bus.assignedDriverName = 'Резерв';
    saveFleet();
    saveUsers();
    renderAdminFleet();
    renderAdminUsers();
    updateAuthUI();
    showToast(`Автобус «${bus.model}» откреплен и переведен в резерв.`, 'info');
    syncToCloud();
    return;
  }

  const driver = appUsers.find(u => u.id === newDriverId);
  if (!driver) return;

  // Detach any other bus this driver previously had
  appFleet.forEach(otherBus => {
    if (otherBus.id !== busId && otherBus.assignedDriverId === newDriverId) {
      otherBus.assignedDriverId = null;
      otherBus.assignedDriverName = 'Резерв';
    }
  });

  // If this bus had a previous driver, reset their bus
  if (oldDriverId && oldDriverId !== newDriverId) {
    const oldDriver = appUsers.find(u => u.id === oldDriverId);
    if (oldDriver) {
      oldDriver.bus = 'В резерве (Не закреплен)';
      if (currentUser && currentUser.id === oldDriver.id) {
        currentUser.bus = oldDriver.bus;
        saveCurrentUser();
      }
    }
  }

  bus.assignedDriverId = driver.id;
  bus.assignedDriverName = driver.name;
  const busDesc = `${bus.model} (${bus.boardNumber}, ${bus.govPlate})`;
  driver.bus = busDesc;

  if (currentUser && currentUser.id === driver.id) {
    currentUser.bus = busDesc;
    saveCurrentUser();
  }

  saveFleet();
  saveUsers();
  renderAdminFleet();
  renderAdminUsers();
  updateAuthUI();
  showToast(`Автобус «${bus.model}» успешно перекреплен за водителем «${driver.name}»!`, 'success');
  syncToCloud();
}

function editBusPrompt(busId) {
  const bus = appFleet.find(b => b.id === busId);
  if (!bus) return;

  const newModel = prompt('Модель / Название автобуса (например: ЛиАЗ-5292.65):', bus.model);
  if (newModel === null) return;

  const newBoard = prompt('Бортовой номер (например: Борт №104):', bus.boardNumber);
  if (newBoard === null) return;

  const newPlate = prompt('Государственный регистрационный номер (например: а145кх 46):', bus.govPlate || '');
  if (newPlate === null) return;

  bus.model = newModel.trim() || bus.model;
  bus.boardNumber = newBoard.trim() || bus.boardNumber;
  bus.govPlate = newPlate.trim() || bus.govPlate;

  if (bus.assignedDriverId) {
    const driver = appUsers.find(u => u.id === bus.assignedDriverId);
    if (driver) {
      const busDesc = `${bus.model} (${bus.boardNumber}, ${bus.govPlate})`;
      driver.bus = busDesc;
      if (currentUser && currentUser.id === driver.id) {
        currentUser.bus = busDesc;
        saveCurrentUser();
      }
    }
  }

  saveFleet();
  saveUsers();
  renderAdminFleet();
  renderAdminUsers();
  updateAuthUI();
  showToast(`Данные автобуса «${bus.model}» успешно обновлены!`, 'success');
  syncToCloud();
}

function changeBusStatus(busId, newStatus) {
  const bus = appFleet.find(b => b.id === busId);
  if (!bus) return;

  bus.status = newStatus;
  saveFleet();
  showToast(`Статус автобуса «${bus.model}» изменен.`, 'info');
  syncToCloud();
}

function toggleAddBusForm() {
  const form = document.getElementById('admin-add-bus-form');
  if (!form) return;
  form.classList.toggle('hidden');

  if (!form.classList.contains('hidden')) {
    const select = document.getElementById('admin-bus-driver-select');
    if (select) {
      const drivers = appUsers.filter(u => u.role === 'driver' || u.role === 'director' || u.role === 'dispatch');
      select.innerHTML = `
        <option value="">-- В резерве (Не закреплен) --</option>
        ${drivers.map(d => `<option value="${d.id}">${d.name} (${d.badge || 'Водитель'})</option>`).join('')}
      `;
    }
  }
}

function saveNewBusFromAdmin() {
  const model = document.getElementById('admin-bus-model').value.trim();
  const board = document.getElementById('admin-bus-board').value.trim();
  const plate = document.getElementById('admin-bus-plate').value.trim() || 'Без госномера';
  const driverId = document.getElementById('admin-bus-driver-select').value;
  const status = document.getElementById('admin-bus-status').value;

  if (!model || !board) {
    showToast('Укажите модель и бортовой номер автобуса', 'warning');
    return;
  }

  const newBus = {
    id: 'bus_' + Date.now(),
    model,
    boardNumber: board,
    govPlate: plate,
    status,
    assignedDriverId: driverId || null,
    assignedDriverName: 'Резерв'
  };

  if (driverId) {
    const driver = appUsers.find(u => u.id === driverId);
    if (driver) {
      newBus.assignedDriverName = driver.name;
      const busDesc = `${model} (${board}, ${plate})`;
      driver.bus = busDesc;
      if (currentUser && currentUser.id === driver.id) {
        currentUser.bus = busDesc;
        saveCurrentUser();
      }
    }
  }

  appFleet.push(newBus);
  saveFleet();
  saveUsers();
  renderAdminFleet();
  renderAdminUsers();
  toggleAddBusForm();

  document.getElementById('admin-bus-model').value = '';
  document.getElementById('admin-bus-board').value = '';
  document.getElementById('admin-bus-plate').value = '';
  showToast(`Автобус «${model}» успешно добавлен в автопарк предприятия!`, 'success');
  syncToCloud();
}

function deleteBusFromAdmin(busId) {
  const bus = appFleet.find(b => b.id === busId);
  if (!bus) return;

  if (confirm(`Списать и удалить автобус «${bus.model} (${bus.boardNumber})» из парка предприятия?`)) {
    if (bus.assignedDriverId) {
      const driver = appUsers.find(u => u.id === bus.assignedDriverId);
      if (driver) {
        driver.bus = 'В резерве (Не закреплен)';
        if (currentUser && currentUser.id === driver.id) {
          currentUser.bus = driver.bus;
          saveCurrentUser();
        }
      }
    }

    appFleet = appFleet.filter(b => b.id !== busId);
    saveFleet();
    saveUsers();
    renderAdminFleet();
    renderAdminUsers();
    updateAuthUI();
    showToast(`Автобус «${bus.model}» списан и удален из парка.`, 'warning');
    syncToCloud();
  }
}

function populateFleetDatalist() {
  const datalist = document.getElementById('fleet-bus-datalist');
  if (!datalist) return;

  datalist.innerHTML = appFleet.map(b => `
    <option value="${b.model} (${b.boardNumber}, ${b.govPlate})">${b.status === 'active' ? 'На линии' : 'Парк'}</option>
  `).join('');
}

// --- Admin: Routes Management ---
function renderAdminRoutes() {
  const list = document.getElementById('admin-routes-list');
  if (!list) return;

  list.innerHTML = appRoutes.map(route => {
    return `
      <div class="p-3.5 rounded-xl bg-slate-900 border border-sky-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center space-x-3">
          <span class="route-badge px-2.5 py-0.5 rounded-lg text-sm">№ ${route.number}</span>
          <div>
            <div class="font-bold text-white text-sm">${route.title}</div>
            <div class="text-[11px] text-slate-400">
              ${route.type} • ${route.distance} • Интервал: ${route.interval} • HOF: ${route.hofCode}
            </div>
          </div>
        </div>

        <button onclick="deleteRouteFromAdmin('${route.id}')" class="px-3 py-1.5 rounded-lg bg-rose-950/70 hover:bg-rose-900 text-rose-300 text-xs transition flex items-center gap-1 self-start sm:self-auto">
          <i class="fa-solid fa-trash-can"></i> Удалить
        </button>
      </div>
    `;
  }).join('');
}

function toggleAddRouteForm() {
  const form = document.getElementById('admin-add-route-form');
  if (form) form.classList.toggle('hidden');
}

function saveNewRouteFromAdmin() {
  const number = document.getElementById('admin-route-num').value.trim();
  const title = document.getElementById('admin-route-title').value.trim();
  const type = document.getElementById('admin-route-type').value;
  const distance = document.getElementById('admin-route-dist').value.trim() || '15 км';
  const interval = document.getElementById('admin-route-interval').value.trim() || '15 мин';
  const busesRaw = document.getElementById('admin-route-buses').value.trim() || 'ЛиАЗ-5256, ПАЗ-3205';
  const hofCode = document.getElementById('admin-route-hof').value.trim() || `Line 0${number}00`;

  if (!number || !title) {
    showToast('Заполните номер и название маршрута', 'warning');
    return;
  }

  const buses = busesRaw.split(',').map(b => b.trim()).filter(Boolean);

  const newRoute = {
    id: 'route_' + Date.now(),
    number,
    title: `№ ${number} «${title}»`,
    type,
    distance,
    time: '35 мин',
    interval,
    buses,
    hofCode,
    stops: ['Коренёвский ПАТП', 'Центральный рынок', title.split('—')[1] || 'Конечная'],
    note: 'Новый маршрут внесен диспетчерской службой.'
  };

  appRoutes.push(newRoute);
  saveRoutes();
  renderAdminRoutes();
  renderRoutes();
  toggleAddRouteForm();

  document.getElementById('admin-route-num').value = '';
  document.getElementById('admin-route-title').value = '';
  document.getElementById('admin-route-dist').value = '';
  document.getElementById('admin-route-interval').value = '';
  document.getElementById('admin-route-buses').value = '';
  document.getElementById('admin-route-hof').value = '';

  showToast(`Маршрут № ${number} успешно сохранен и добавлен в реестр!`, 'success');
  syncToCloud();
}

function deleteRouteFromAdmin(routeId) {
  const route = appRoutes.find(r => r.id === routeId);
  if (!route) return;

  if (confirm(`Удалить маршрут «№ ${route.number}» из реестра предприятия?`)) {
    appRoutes = appRoutes.filter(r => r.id !== routeId);
    saveRoutes();
    renderAdminRoutes();
    renderRoutes();
    showToast(`Маршрут № ${route.number} удален.`, 'warning');
  }
}

// --- Admin: Ticker & Announcement Settings ---
function loadTickerSettings() {
  const text = localStorage.getItem('korenevo_ticker_text') || 'Уважаемые водители! На 104-м пригородном маршруте в районе с. Коренёво открыт отремонтированный объезд. Все путевые листы и отчёты о сменах сдавать строго через раздел «Отчеты».';
  const release = localStorage.getItem('korenevo_ticker_release') || 'Выпуск на линию: 100%';
  const fuel = localStorage.getItem('korenevo_ticker_fuel') || 'Топливо: В норме';

  const elText = document.getElementById('ticker-text');
  const elRelease = document.getElementById('ticker-release');
  const elFuel = document.getElementById('ticker-fuel');

  if (elText) elText.textContent = text;
  if (elRelease) elRelease.innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 mr-1"></i>${release}`;
  if (elFuel) elFuel.innerHTML = `<i class="fa-solid fa-gas-pump text-amber-400 mr-1"></i>${fuel}`;
}

function populateAdminTickerForm() {
  const text = localStorage.getItem('korenevo_ticker_text') || 'Уважаемые водители! На 104-м пригородном маршруте в районе с. Коренёво открыт отремонтированный объезд. Все путевые листы и отчёты о сменах сдавать строго через раздел «Отчеты».';
  const release = localStorage.getItem('korenevo_ticker_release') || 'Выпуск на линию: 100%';
  const fuel = localStorage.getItem('korenevo_ticker_fuel') || 'Топливо: В норме';

  const inpText = document.getElementById('admin-ticker-input');
  const inpRelease = document.getElementById('admin-release-input');
  const inpFuel = document.getElementById('admin-fuel-input');

  if (inpText) inpText.value = text;
  if (inpRelease) inpRelease.value = release;
  if (inpFuel) inpFuel.value = fuel;
}

function handleSaveTicker(e) {
  e.preventDefault();
  const text = document.getElementById('admin-ticker-input').value.trim();
  const release = document.getElementById('admin-release-input').value.trim();
  const fuel = document.getElementById('admin-fuel-input').value.trim();

  if (text) localStorage.setItem('korenevo_ticker_text', text);
  if (release) localStorage.setItem('korenevo_ticker_release', release);
  if (fuel) localStorage.setItem('korenevo_ticker_fuel', fuel);

  loadTickerSettings();
  showToast('Сводка диспетчерской службы успешно обновлена на сайте!', 'success');
}

// --- Admin: Backup & Export/Import ---
function exportEnterpriseData() {
  const backup = {
    enterprise: 'ОАО «Коренёвский ПАТП»',
    exportedAt: new Date().toISOString(),
    users: appUsers,
    fleet: appFleet,
    reports: appReports,
    leaves: appLeaves,
    routes: appRoutes,
    ticker: {
      text: localStorage.getItem('korenevo_ticker_text'),
      release: localStorage.getItem('korenevo_ticker_release'),
      fuel: localStorage.getItem('korenevo_ticker_fuel')
    }
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `korenevo_patp_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('Резервная копия предприятия успешно скачана!', 'success');
}

function importEnterpriseData(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = JSON.parse(evt.target.result);
      if (data.users && Array.isArray(data.users)) {
        appUsers = data.users;
        saveUsers();
      }
      if (data.fleet && Array.isArray(data.fleet)) {
        appFleet = data.fleet;
        saveFleet();
      }
      if (data.reports && Array.isArray(data.reports)) {
        appReports = data.reports;
        saveReports();
      }
      if (data.leaves && Array.isArray(data.leaves)) {
        appLeaves = data.leaves;
        saveLeaves();
      }
      if (data.routes && Array.isArray(data.routes)) {
        appRoutes = data.routes;
        saveRoutes();
      }
      if (data.ticker) {
        if (data.ticker.text) localStorage.setItem('korenevo_ticker_text', data.ticker.text);
        if (data.ticker.release) localStorage.setItem('korenevo_ticker_release', data.ticker.release);
        if (data.ticker.fuel) localStorage.setItem('korenevo_ticker_fuel', data.ticker.fuel);
        loadTickerSettings();
      }

      updateAuthUI();
      renderReports();
      renderLeaves();
      renderRoutes();
      renderAdminUsers();
      renderAdminFleet();
      renderAdminRoutes();
      showToast('База данных предприятия успешно восстановлена!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Ошибка при чтении файла резервной копии. Проверьте формат JSON.', 'error');
    }
  };
  reader.readAsText(file);
}

function resetEnterpriseData() {
  if (confirm('Сбросить все данные предприятия к первоначальным заводским настройкам? Это действие удалит добавленные отчеты, автобусы и новых водителей.')) {
    localStorage.removeItem('korenevo_users');
    localStorage.removeItem('korenevo_fleet');
    localStorage.removeItem('korenevo_reports');
    localStorage.removeItem('korenevo_leaves');
    localStorage.removeItem('korenevo_routes');
    localStorage.removeItem('korenevo_chat');
    localStorage.removeItem('korenevo_ticker_text');
    localStorage.removeItem('korenevo_ticker_release');
    localStorage.removeItem('korenevo_ticker_fuel');
    localStorage.removeItem('korenevo_current_user');
    location.reload();
  }
}


// ================= REAL PRESENCE & ONLINE SYSTEM =================
const CURRENT_SESSION_ID = (function() {
  try {
    let sid = sessionStorage.getItem('patp_session_id');
    if (!sid) {
      sid = 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem('patp_session_id', sid);
    }
    return sid;
  } catch (e) {
    return 'sess_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 9);
  }
})();

let cloudPresenceMap = {};

function getMyPresencePayload() {
  return {
    sessionId: CURRENT_SESSION_ID,
    userId: currentUser ? currentUser.id : null,
    name: currentUser ? currentUser.name : 'Посетитель сайта',
    role: currentUser ? (currentUser.role || 'driver') : 'guest',
    avatar: currentUser ? (currentUser.avatar || 'logo.jpg') : 'logo.jpg',
    bus: currentUser ? (currentUser.bus || 'В депо') : 'Сайт ПАТП',
    statusText: currentUser ? 'На связи' : 'Просмотр сайта',
    lastSeen: Date.now(),
    isGuest: !currentUser
  };
}

// Local storage presence tracking (works across browser tabs & windows)
function updateLocalPresence(isExiting = false) {
  try {
    const raw = localStorage.getItem('korenevo_presence');
    const presence = raw ? JSON.parse(raw) : {};
    const now = Date.now();

    if (isExiting) {
      delete presence[CURRENT_SESSION_ID];
    } else {
      presence[CURRENT_SESSION_ID] = getMyPresencePayload();
    }

    // Purge dead sessions older than 25 seconds
    for (const sid in presence) {
      if (!presence[sid] || !presence[sid].lastSeen || (now - presence[sid].lastSeen > 25000)) {
        delete presence[sid];
      }
    }

    localStorage.setItem('korenevo_presence', JSON.stringify(presence));
    return presence;
  } catch (e) {
    return {};
  }
}

// Cloud presence heartbeat to Firebase Realtime Database
async function sendCloudPresenceHeartbeat(isExiting = false) {
  const baseUrl = getFirebaseUrl();
  if (!baseUrl) return;

  try {
    let endpoint = baseUrl.endsWith('.json') ? baseUrl.slice(0, -5) : baseUrl;
    endpoint = `${endpoint}/presence/${CURRENT_SESSION_ID}.json`;

    if (isExiting) {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob(['null'], { type: 'application/json' });
        navigator.sendBeacon(endpoint, blob);
      } else {
        fetch(endpoint, { method: 'DELETE', keepalive: true }).catch(() => {});
      }
    } else {
      await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(getMyPresencePayload())
      });
    }
  } catch (e) {
    // Silent fail
  }
}

// Fetch all cloud presence records from Firebase
async function fetchCloudPresence() {
  const baseUrl = getFirebaseUrl();
  if (!baseUrl) return;

  try {
    let endpoint = baseUrl.endsWith('.json') ? baseUrl.slice(0, -5) : baseUrl;
    endpoint = `${endpoint}/presence.json`;

    const res = await fetch(endpoint, { headers: { 'Accept': 'application/json' } });
    if (!res.ok) return;

    const data = await res.json();
    if (data && typeof data === 'object') {
      const now = Date.now();
      const valid = {};
      for (const [sid, record] of Object.entries(data)) {
        if (record && typeof record === 'object' && record.lastSeen && (now - record.lastSeen < 30000)) {
          valid[sid] = record;
        }
      }
      cloudPresenceMap = valid;
      updateOnlineRoster();
    }
  } catch (e) {
    // Silent fail
  }
}

function runPresenceCycle() {
  updateLocalPresence();
  sendCloudPresenceHeartbeat();
  fetchCloudPresence();
  updateOnlineRoster();
}

function handlePresenceExit() {
  updateLocalPresence(true);
  sendCloudPresenceHeartbeat(true);
}

function getOnlinePersonnel() {
  const now = Date.now();
  const allSessions = [];

  // 1. Local presence sessions
  const localPresence = updateLocalPresence();
  for (const sid in localPresence) {
    if (now - localPresence[sid].lastSeen < 25000) {
      allSessions.push(localPresence[sid]);
    }
  }

  // 2. Cloud presence sessions (Firebase)
  for (const sid in cloudPresenceMap) {
    if (!allSessions.some(s => s.sessionId === sid)) {
      if (now - cloudPresenceMap[sid].lastSeen < 30000) {
        allSessions.push(cloudPresenceMap[sid]);
      }
    }
  }

  // Ensure current active session is always in list
  if (!allSessions.some(s => s.sessionId === CURRENT_SESSION_ID)) {
    allSessions.push(getMyPresencePayload());
  }

  // Deduplicate:
  // - Logged-in users deduplicated by userId (so multiple tabs = 1 user online)
  // - Unregistered visitors (guests) tracked by unique sessionId
  const result = [];
  const seenUserIds = new Set();
  const seenGuests = new Set();

  allSessions.forEach(session => {
    const isCurrent = (session.sessionId === CURRENT_SESSION_ID);

    if (session.userId) {
      // Logged in employee
      if (!seenUserIds.has(session.userId)) {
        seenUserIds.add(session.userId);
        result.push({
          id: session.userId,
          sessionId: session.sessionId,
          name: session.name,
          role: session.role || 'driver',
          avatar: session.avatar || 'logo.jpg',
          bus: session.bus || 'В депо',
          statusText: isCurrent ? 'На связи (Вы)' : (session.statusText || 'В сети'),
          isCurrent: isCurrent || (currentUser && currentUser.id === session.userId),
          isGuest: false
        });
      } else if (isCurrent) {
        const existing = result.find(r => r.id === session.userId);
        if (existing) {
          existing.isCurrent = true;
          existing.statusText = 'На связи (Вы)';
        }
      }
    } else {
      // Guest visitor
      if (!seenGuests.has(session.sessionId)) {
        seenGuests.add(session.sessionId);
        result.push({
          id: session.sessionId,
          sessionId: session.sessionId,
          name: isCurrent ? 'Посетитель сайта (Вы)' : 'Посетитель сайта',
          role: 'guest',
          avatar: 'logo.jpg',
          bus: 'Сайт ПАТП',
          statusText: isCurrent ? 'Просмотр сайта (Вы)' : 'Просмотр сайта',
          isCurrent: isCurrent,
          isGuest: true
        });
      }
    }
  });

  // Sort: current user first, then employees by name, then guests
  result.sort((a, b) => {
    if (a.isCurrent) return -1;
    if (b.isCurrent) return 1;
    if (!a.isGuest && b.isGuest) return -1;
    if (a.isGuest && !b.isGuest) return 1;
    return a.name.localeCompare(b.name);
  });

  return result;
}

function updateOnlineRoster() {
  const personnel = getOnlinePersonnel();
  const count = personnel.length;

  const counterNumEl = document.getElementById('online-count-num');
  if (counterNumEl) counterNumEl.textContent = count;

  const chatOnlineCountEl = document.getElementById('chat-online-count');
  if (chatOnlineCountEl) chatOnlineCountEl.textContent = count;

  const modalCountEl = document.getElementById('modal-online-count');
  if (modalCountEl) modalCountEl.textContent = count;

  const container = document.getElementById('online-users-roster');
  if (!container) return;

  if (personnel.length === 0) {
    container.innerHTML = `
      <div class="text-center py-6 text-slate-400 text-xs">
        <i class="fa-solid fa-user-slash text-2xl text-slate-600 mb-2"></i>
        <p>Никого нет в сети</p>
      </div>
    `;
    return;
  }

  container.innerHTML = personnel.map(p => {
    const roleConfig = ROLES[p.role] || (p.isGuest ? {
      name: 'Гость',
      badgeClass: 'bg-slate-800 text-slate-300 border-slate-700'
    } : ROLES.driver);

    return `
      <div class="flex items-center justify-between p-3 rounded-xl bg-slate-900/80 border ${p.isCurrent ? 'border-emerald-500/50 bg-emerald-950/25' : 'border-sky-900/50'}">
        <div class="flex items-center space-x-3 min-w-0">
          <div class="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-950 border border-sky-400/40 flex-shrink-0">
            <img src="${p.avatar || 'logo.jpg'}" alt="${escapeHtml(p.name)}" class="w-full h-full object-cover">
            <span class="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-slate-950 live-dot"></span>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <span class="font-bold text-white text-xs sm:text-sm truncate">${escapeHtml(p.name)}</span>
              ${p.isCurrent ? '<span class="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">Вы</span>' : ''}
            </div>
            <div class="text-[11px] text-slate-400 truncate flex items-center gap-1.5 mt-0.5">
              <i class="fa-solid ${p.isGuest ? 'fa-globe text-emerald-400' : 'fa-bus text-sky-400'}"></i> ${escapeHtml(p.bus)}
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end gap-1 flex-shrink-0 ml-2">
          <span class="px-2 py-0.5 rounded-full font-semibold border text-[10px] ${roleConfig.badgeClass}">
            ${roleConfig.name}
          </span>
          <span class="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            ${escapeHtml(p.statusText)}
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function openOnlineModal() {
  runPresenceCycle();
  openModal('modal-online-users');
}

function initPresenceEngine() {
  runPresenceCycle();
  setInterval(runPresenceCycle, 6000);

  window.addEventListener('storage', (e) => {
    if (e.key === 'korenevo_presence') {
      updateOnlineRoster();
    }
  });

  window.addEventListener('beforeunload', handlePresenceExit);
  window.addEventListener('pagehide', handlePresenceExit);

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
      runPresenceCycle();
    }
  });
}

// ================= GENERAL CHAT (ОБЩИЙ ЧАТ ПРЕДПРИЯТИЯ) =================
function renderChat() {
  const container = document.getElementById('chat-messages-container');
  const countBadge = document.getElementById('badge-chat-count');
  const floatingCount = document.getElementById('floating-chat-count');
  const adminClearBtn = document.getElementById('admin-clear-chat-btn');

  if (countBadge) countBadge.textContent = appChatMessages.length;
  if (floatingCount) floatingCount.textContent = appChatMessages.length;

  if (adminClearBtn) {
    if (currentUser && (currentUser.role === 'director' || currentUser.name === 'Владислав Корней Коршунов')) {
      adminClearBtn.classList.remove('hidden');
    } else {
      adminClearBtn.classList.add('hidden');
    }
  }

  renderChatInput();

  if (!container) return;

  if (appChatMessages.length === 0) {
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full text-center p-8 text-slate-400">
        <div class="w-16 h-16 rounded-2xl bg-sky-950/60 border border-sky-800/40 flex items-center justify-center text-sky-400 text-3xl mb-3">
          <i class="fa-solid fa-comments"></i>
        </div>
        <h4 class="font-bold text-white text-base">В эфире пока тихо</h4>
        <p class="text-xs text-slate-400 mt-1 max-w-sm">
          Напишите первое сообщение в общий радиоканал предприятия!
        </p>
      </div>
    `;
    return;
  }

  const isScrolledToBottom = (container.scrollHeight - container.scrollTop - container.clientHeight) < 150;

  container.innerHTML = appChatMessages.map(msg => {
    const roleConfig = ROLES[msg.userRole] || (msg.userRole === 'guest' ? {
      name: 'Гость',
      badgeClass: 'bg-slate-800 text-slate-300 border-slate-700'
    } : ROLES.driver);

    const isAuthor = currentUser && (
      (currentUser.id && currentUser.id === msg.userId) ||
      (currentUser.name && currentUser.name.toLowerCase() === msg.userName.toLowerCase())
    );
    const isAdmin = currentUser && (
      checkIsAdmin(currentUser)
    );
    const canDelete = isAuthor || isAdmin;

    return `
      <div class="flex items-start space-x-3 p-3 sm:p-3.5 rounded-2xl bg-slate-900/70 border border-sky-900/40 hover:border-sky-700/60 transition group">
        <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-slate-950 border border-sky-400/40 flex-shrink-0 shadow-md">
          <img src="${msg.userAvatar || 'logo.jpg'}" alt="${escapeHtml(msg.userName)}" class="w-full h-full object-cover">
        </div>
        <div class="flex-grow min-w-0">
          <div class="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-bold text-white text-xs sm:text-sm tracking-wide">${escapeHtml(msg.userName)}</span>
              <span class="px-2 py-0.5 rounded-full font-semibold border text-[10px] ${roleConfig.badgeClass}">
                ${roleConfig.name}
              </span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-[11px] text-slate-400 font-mono">${escapeHtml(msg.timestamp)}</span>
              ${canDelete ? `
                <button onclick="deleteChatMessage('${msg.id}')" class="opacity-70 group-hover:opacity-100 text-rose-400 hover:text-rose-300 text-xs px-1.5 py-0.5 rounded hover:bg-rose-950/60 transition cursor-pointer" title="Удалить сообщение">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              ` : ''}
            </div>
          </div>
          <div class="text-xs sm:text-sm text-slate-200 leading-relaxed break-words whitespace-pre-wrap">
            ${escapeHtml(msg.text)}
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (isScrolledToBottom) {
    container.scrollTop = container.scrollHeight;
  }
}

function renderChatInput() {
  const container = document.getElementById('chat-input-container');
  if (!container) return;

  const currentMode = currentUser ? `user_${currentUser.id}` : 'guest';
  if (container.dataset.renderedMode === currentMode) {
    // Input is already in correct mode - do NOT re-render innerHTML so user can type undisturbed!
    return;
  }
  container.dataset.renderedMode = currentMode;

  if (currentUser) {
    container.innerHTML = `
      <form id="chat-send-form" onsubmit="handleSendChatMessage(event)" class="space-y-3">
        <!-- Quick Radio Presets -->
        <div class="flex flex-wrap items-center gap-1.5 text-xs">
          <span class="text-slate-400 text-[11px] mr-1 flex items-center gap-1"><i class="fa-solid fa-bolt text-amber-400"></i> Быстрые фразы:</span>
          <button type="button" onclick="insertChatPreset('Принял, выезжаю по маршруту!')" class="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-sky-300 text-[11px] border border-sky-800/40 transition cursor-pointer">«Принял, выезжаю!»</button>
          <button type="button" onclick="insertChatPreset('Задержка на линии 5 минут (затруднение движения).')" class="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-amber-300 text-[11px] border border-amber-800/40 transition cursor-pointer">«Задержка 5 мин»</button>
          <button type="button" onclick="insertChatPreset('Смену завершил, автобус в гараже, отчет сдал.')" class="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-emerald-300 text-[11px] border border-emerald-800/40 transition cursor-pointer">«Смену завершил»</button>
          <button type="button" onclick="insertChatPreset('Диспетчер, ответьте на вызов.')" class="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-purple-300 text-[11px] border border-purple-800/40 transition cursor-pointer">«Диспетчер, ответьте»</button>
          <button type="button" onclick="insertChatPreset('Дорога чистая, иду строго по графику.')" class="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-teal-300 text-[11px] border border-teal-800/40 transition cursor-pointer">«Иду по графику»</button>
        </div>

        <div class="flex items-center gap-2">
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl overflow-hidden bg-slate-950 border border-sky-400/40 flex-shrink-0 shadow hidden xs:block">
            <img src="${currentUser.avatar || 'logo.jpg'}" alt="${escapeHtml(currentUser.name)}" class="w-full h-full object-cover">
          </div>
          <div class="relative flex-grow min-w-0">
            <input type="text" id="chat-message-input" placeholder="Сообщение от «${escapeHtml(currentUser.name)}»..." maxlength="500" required autocomplete="off" class="w-full bg-slate-950/90 border border-sky-800/70 rounded-xl px-3 py-2 sm:py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
          </div>
          <button type="submit" class="px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 border border-emerald-400/50 flex items-center justify-center gap-1.5 transition flex-shrink-0 cursor-pointer">
            <i class="fa-solid fa-paper-plane text-xs"></i> <span class="hidden sm:inline">Отправить</span>
          </button>
        </div>
      </form>
    `;
  } else {
    const savedGuestName = localStorage.getItem('korenevo_guest_chat_name') || '';
    container.innerHTML = `
      <form id="chat-send-form" onsubmit="handleSendChatMessage(event)" class="space-y-2.5">
        <div class="flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-400">
          <span class="flex items-center gap-1.5"><i class="fa-solid fa-user-clock text-amber-400"></i> Режим гостя (сообщения отправляются сразу без пароля):</span>
          <div class="flex items-center gap-1.5">
            <button type="button" onclick="openModal('modal-login')" class="text-sky-400 hover:underline font-semibold cursor-pointer">Войти в аккаунт</button>
            <span>или</span>
            <button type="button" onclick="openModal('modal-register')" class="text-emerald-400 hover:underline font-semibold cursor-pointer">Регистрация</button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div class="relative w-full sm:w-44 flex-shrink-0">
            <i class="fa-solid fa-user text-slate-500 text-xs absolute left-3 top-1/2 -translate-y-1/2"></i>
            <input type="text" id="chat-guest-name" value="${escapeHtml(savedGuestName)}" placeholder="Ваше имя / Позывной" maxlength="35" class="w-full bg-slate-950/90 border border-sky-800/70 rounded-xl pl-8 pr-3 py-2 sm:py-2.5 text-xs text-white focus:outline-none focus:ring-2 focus:ring-sky-500/50">
          </div>
          <div class="relative flex-grow">
            <input type="text" id="chat-message-input" placeholder="Напишите сообщение в общий чат..." maxlength="500" required autocomplete="off" class="w-full bg-slate-950/90 border border-sky-800/70 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
          </div>
          <button type="submit" class="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 border border-emerald-400/50 flex items-center justify-center gap-2 transition flex-shrink-0 cursor-pointer">
            <i class="fa-solid fa-paper-plane"></i> <span>Отправить</span>
          </button>
        </div>
      </form>
    `;
  }
}

function insertChatPreset(phrase) {
  const input = document.getElementById('chat-message-input');
  if (input) {
    input.value = phrase;
    input.focus();
  }
}

function handleSendChatMessage(e) {
  if (e) e.preventDefault();

  const input = document.getElementById('chat-message-input');
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  let senderName = '';
  let senderRole = 'driver';
  let senderAvatar = 'logo.jpg';
  let senderUserId = '';

  if (currentUser) {
    senderName = currentUser.name;
    senderRole = currentUser.role || 'driver';
    senderAvatar = currentUser.avatar || 'logo.jpg';
    senderUserId = currentUser.id || 'user_' + Date.now();
  } else {
    const guestInput = document.getElementById('chat-guest-name');
    let guestName = guestInput ? guestInput.value.trim() : '';
    if (!guestName) {
      guestName = localStorage.getItem('korenevo_guest_chat_name') || 'Посетитель сайта';
    } else {
      localStorage.setItem('korenevo_guest_chat_name', guestName);
    }
    senderName = guestName;
    senderRole = 'guest';
    senderAvatar = 'logo.jpg';
    senderUserId = 'guest_' + Date.now();
  }

  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, '0')}.${String(now.getMonth() + 1).padStart(2, '0')}.${now.getFullYear()}`;
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

  const newMsg = {
    id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    userId: senderUserId,
    userName: senderName,
    userRole: senderRole,
    userAvatar: senderAvatar,
    text: text,
    timestamp: `${dateStr} ${timeStr}`
  };

  input.value = '';
  appChatMessages.push(newMsg);
  saveChatMessages();
  renderChat();

  const chatContainer = document.getElementById('chat-messages-container');
  if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  showToast('Сообщение передано в эфир предприятия!', 'success');
  syncToCloud();
}

function deleteChatMessage(msgId) {
  const msg = appChatMessages.find(m => m.id === msgId);
  if (!msg) return;

  const isAuthor = currentUser && (
    (currentUser.id && currentUser.id === msg.userId) ||
    (currentUser.name && currentUser.name.toLowerCase() === msg.userName.toLowerCase())
  );
  const isAdmin = currentUser && (
    checkIsAdmin(currentUser)
  );

  if (!isAuthor && !isAdmin) {
    showToast('У вас нет прав на удаление этого сообщения.', 'error');
    return;
  }

  if (confirm(`Удалить сообщение от «${msg.userName}»?`)) {
    appChatMessages = appChatMessages.filter(m => m.id !== msgId);
    saveChatMessages();
    renderChat();
    showToast('Сообщение удалено из эфира.', 'info');
    syncToCloud();
  }
}

function clearChatConfirm() {
  if (!checkIsAdmin(currentUser)) {
    showToast('Очистить чат может только Руководитель предприятия!', 'error');
    return;
  }

  if (confirm('Вы уверены, что хотите полностью очистить историю общего чата предприятия?')) {
    appChatMessages = [
      {
        id: 'msg_' + Date.now(),
        userId: currentUser.id,
        userName: currentUser.name,
        userRole: currentUser.role,
        userAvatar: currentUser.avatar || 'logo.jpg',
        text: 'История радиоканала очищена администрацией предприятия. Связь работает в штатном режиме.',
        timestamp: 'Только что'
      }
    ];
    saveChatMessages();
    renderChat();
    showToast('История чата очищена.', 'warning');
    syncToCloud();
  }
}

// ================= MODAL HELPERS =================
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
}

function openHostingGuideModal() {
  openModal('modal-hosting-guide');
}

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('fixed') && (e.target.classList.contains('bg-black/75') || e.target.classList.contains('bg-black/80'))) {
    e.target.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modals = document.querySelectorAll('.fixed:not(.hidden)');
    modals.forEach(m => m.classList.add('hidden'));
    document.body.classList.remove('overflow-hidden');
  }
});

// ================= TOAST NOTIFICATIONS =================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  
  let bg = 'bg-slate-900 border-sky-500/50 text-slate-100';
  let icon = '<i class="fa-solid fa-circle-info text-sky-400"></i>';

  if (type === 'success') {
    bg = 'bg-emerald-950/90 border-emerald-500/60 text-emerald-100';
    icon = '<i class="fa-solid fa-circle-check text-emerald-400"></i>';
  } else if (type === 'warning') {
    bg = 'bg-amber-950/90 border-amber-500/60 text-amber-100';
    icon = '<i class="fa-solid fa-triangle-exclamation text-amber-400"></i>';
  } else if (type === 'error') {
    bg = 'bg-rose-950/90 border-rose-500/60 text-rose-100';
    icon = '<i class="fa-solid fa-circle-exclamation text-rose-400"></i>';
  }

  toast.className = `p-3.5 rounded-xl border shadow-2xl flex items-center gap-3 text-xs max-w-sm transition-all duration-300 pointer-events-auto transform translate-y-2 opacity-0 ${bg}`;
  toast.innerHTML = `
    <span class="text-base">${icon}</span>
    <span class="font-medium">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', async () => {
  checkUrlHashForDb();
  loadFromStorage();
  loadTickerSettings();
  startDepotClock();
  updateAuthUI();
  updateOnlineRoster();
  renderChat();
  switchTab('reports');
  updateCloudStatusUI();
  startCloudSyncLoop();
  initPresenceEngine();

  // Instant cloud fetch on startup for all devices
  if (getFirebaseUrl()) {
    fetchFromCloud(true);
  }
});
