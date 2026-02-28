// ============================================================
// Rivals Aim-Trainer — Application Logic v2
// by Kaiser Everhart
// Layout: Sidebar + Daily Quest Grid
// ============================================================

(function () {
    'use strict';

    // ---- Constants ----
    const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const DAY_ICONS = ['☀️', '🌙', '🔥', '💧', '⚡', '🌿', '⭐'];
    const THEMES = ['royal', 'sakura', 'stealth'];
    const STORAGE_KEY = 'rivals-aim-trainer';
    const SUB_KEY = 'rivals-subscribed';

    const STRUCTURE = {
        warmup: 2,
        main: 6,
        challenge: 2,
        cooldown: 2,
    };

    // ---- State ----
    let state = {
        platform: 'aimlabs',
        difficulty: 'beginner',
        sliders: { flicking: 34, tracking: 33, switching: 33 },
        profileName: '',
        theme: 'royal',
    };

    let isSubscribed = false;

    // ---- DOM refs ----
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const els = {
        platformBtns: $$('.platform-btn'),
        diffBtns: $$('.diff-btn'),
        sliderFlicking: $('#sliderFlicking'),
        sliderTracking: $('#sliderTracking'),
        sliderSwitching: $('#sliderSwitching'),
        valFlicking: $('#valFlicking'),
        valTracking: $('#valTracking'),
        valSwitching: $('#valSwitching'),
        distFlicking: $('#distFlicking'),
        distTracking: $('#distTracking'),
        distSwitching: $('#distSwitching'),
        profileName: $('#profileName'),
        weekList: $('#weekList'),
        questGrid: $('#questGrid'),
        currentDate: $('#currentDate'),
        todayIcon: $('#todayIcon'),
        themeToggle: $('#themeToggle'),
        shareBtn: $('#shareBtn'),
        copyAllBtn: $('#copyAllBtn'),
        toast: $('#toast'),
        toastText: $('#toastText'),
        subscribeGate: $('#subscribeGate'),
        slidersPanel: $('#slidersPanel'),
        subscribeBtn: $('#subscribeBtn'),
        subscribeDoneBtn: $('#subscribeDoneBtn'),
    };

    // ============================================================
    // Seeded Random (deterministic per day)
    // ============================================================
    function seededRandom(seed) {
        let s = seed;
        return function () {
            s = (s * 1664525 + 1013904223) & 0xffffffff;
            return (s >>> 0) / 0xffffffff;
        };
    }

    function getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / 86400000);
    }

    // ============================================================
    // Scenario Selection Algorithm
    // ============================================================
    function getScenarios(platform) {
        const db = SCENARIOS[platform];
        if (!db) return { flicking: [], tracking: [], switching: [] };
        return db;
    }

    function filterByDifficulty(scenarios, difficulty) {
        const tiers = {
            beginner: ['beginner'],
            intermediate: ['beginner', 'intermediate'],
            advanced: ['beginner', 'intermediate', 'advanced'],
        };
        const allowed = tiers[difficulty] || ['beginner'];
        return scenarios.filter(s => allowed.includes(s.difficulty));
    }

    function weightedShuffle(arr, rng) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
            const j = Math.floor(rng() * (i + 1));
            [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
    }

    function pickN(arr, n, rng) {
        const shuffled = weightedShuffle(arr, rng);
        return shuffled.slice(0, n);
    }

    function pickNWithFallback(preferred, fallback, n, rng) {
        const result = pickN(preferred, n, rng);
        if (result.length >= n) return result;
        const remaining = n - result.length;
        const extra = pickN(fallback, remaining, rng);
        return [...result, ...extra];
    }

    function generateRoutine(dayIndex, year) {
        const seed = year * 1000 + getDayOfYear(new Date(year, 0, 1)) + dayIndex * 137 + getDaySeed();
        const rng = seededRandom(seed);

        const platform = state.platform;
        const diff = state.difficulty;
        const { flicking, tracking, switching } = state.sliders;
        const db = getScenarios(platform);

        const flickPool = filterByDifficulty(db.flicking || [], diff);
        const trackPool = filterByDifficulty(db.tracking || [], diff);
        const switchPool = filterByDifficulty(db.switching || [], diff);
        const allPool = [...flickPool, ...trackPool, ...switchPool];
        const warmupPool = allPool.filter(s => s.warmup);

        // 1) WARMUP
        const warmups = pickNWithFallback(warmupPool, warmupPool, STRUCTURE.warmup, rng);

        // 2) MAIN: slider-weighted
        const total = flicking + tracking + switching || 100;
        const flickCount = Math.round((flicking / total) * STRUCTURE.main);
        const switchCount = Math.round((switching / total) * STRUCTURE.main);
        const trackCount = STRUCTURE.main - flickCount - switchCount;

        const usedNames = new Set(warmups.map(s => s.name));
        const mainFlick = pickNWithFallback(flickPool.filter(s => !usedNames.has(s.name)), flickPool, flickCount, rng);
        mainFlick.forEach(s => usedNames.add(s.name));
        const mainTrack = pickNWithFallback(trackPool.filter(s => !usedNames.has(s.name)), trackPool, trackCount, rng);
        mainTrack.forEach(s => usedNames.add(s.name));
        const mainSwitch = pickNWithFallback(switchPool.filter(s => !usedNames.has(s.name)), switchPool, switchCount, rng);
        mainSwitch.forEach(s => usedNames.add(s.name));
        const mains = [...mainFlick, ...mainTrack, ...mainSwitch];

        // 3) CHALLENGE
        const priorityCat = flicking >= tracking && flicking >= switching ? 'flicking'
            : tracking >= switching ? 'tracking' : 'switching';
        const priorityPool = priorityCat === 'flicking' ? flickPool
            : priorityCat === 'tracking' ? trackPool : switchPool;
        const challengeUnique = priorityPool.filter(s => !usedNames.has(s.name));
        challengeUnique.sort((a, b) => {
            const order = { beginner: 0, intermediate: 1, advanced: 2 };
            const diffScore = (order[b.difficulty] || 0) - (order[a.difficulty] || 0);
            if (diffScore !== 0) return diffScore;
            return (a.warmup ? 1 : 0) - (b.warmup ? 1 : 0);
        });
        const challenges = pickNWithFallback(challengeUnique, priorityPool, STRUCTURE.challenge, rng);
        challenges.forEach(s => usedNames.add(s.name));

        // 4) COOLDOWN
        const cooldownUnique = trackPool.filter(s => s.warmup && !usedNames.has(s.name));
        const cooldowns = pickNWithFallback(cooldownUnique, warmupPool, STRUCTURE.cooldown, rng);

        return { warmup: warmups, main: mains, challenge: challenges, cooldown: cooldowns };
    }

    function getDaySeed() {
        const now = new Date();
        const year = now.getFullYear();
        const weekNum = Math.ceil(getDayOfYear(now) / 7);
        const sliderHash = state.sliders.flicking * 10000 + state.sliders.tracking * 100 + state.sliders.switching;
        const platformHash = state.platform === 'kovaaks' ? 7 : 13;
        const diffHash = state.difficulty === 'beginner' ? 3 : state.difficulty === 'intermediate' ? 5 : 11;
        return year * 100000 + weekNum * 1000 + sliderHash + platformHash + diffHash;
    }

    function getCategoryName(scenario) {
        const db = getScenarios(state.platform);
        if (db.flicking && db.flicking.some(s => s.name === scenario.name)) return 'flicking';
        if (db.tracking && db.tracking.some(s => s.name === scenario.name)) return 'tracking';
        if (db.switching && db.switching.some(s => s.name === scenario.name)) return 'switching';
        return 'flicking';
    }

    // ============================================================
    // UI Rendering
    // ============================================================

    /** Render the weekly sidebar */
    function renderWeekSidebar() {
        const now = new Date();
        const todayIndex = now.getDay();
        const year = now.getFullYear();

        let html = '';
        for (let i = 0; i < 7; i++) {
            const routine = generateRoutine(i, year);
            const all = [...routine.warmup, ...routine.main, ...routine.challenge, ...routine.cooldown];
            const isToday = i === todayIndex;

            html += `
            <div class="week-item ${isToday ? 'active' : ''}" data-day="${i}" onclick="window.__switchDay(${i})">
                <span class="week-item__icon">${DAY_ICONS[i]}</span>
                <span class="week-item__day">${DAYS[i].slice(0, 3)}</span>
                <span class="week-item__count">${all.length}</span>
                ${isToday ? '<span class="week-item__badge">Today</span>' : ''}
            </div>`;
        }
        els.weekList.innerHTML = html;
    }

    /** Render today's quests as a card grid */
    function renderTodayGrid(dayIndex) {
        if (dayIndex === undefined) dayIndex = new Date().getDay();
        const now = new Date();
        const year = now.getFullYear();
        const routine = generateRoutine(dayIndex, year);

        // Update header
        els.todayIcon.textContent = DAY_ICONS[dayIndex];
        const dayDate = new Date(now);
        dayDate.setDate(dayDate.getDate() + (dayIndex - now.getDay()));
        els.currentDate.textContent = dayDate.toLocaleDateString('en-US', {
            weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
        });

        // Highlight sidebar
        $$('.week-item').forEach(item => {
            item.classList.toggle('active', parseInt(item.dataset.day) === dayIndex);
        });

        // Build grid HTML
        let html = '';
        const sections = [
            { key: 'warmup', label: '🔥 Warmup', cls: 'warmup', icon: '🔥' },
            { key: 'main', label: '⚔️ Main Training', cls: 'main', icon: '⚔️' },
            { key: 'challenge', label: '💀 Challenge', cls: 'challenge', icon: '💀' },
            { key: 'cooldown', label: '🧊 Cooldown', cls: 'cooldown', icon: '🧊' },
        ];

        let num = 1;
        sections.forEach(section => {
            const scenarios = routine[section.key];
            if (!scenarios || !scenarios.length) return;

            html += `
            <div class="quest-section quest-section--${section.cls}">
                <div class="quest-section__icon">${section.icon}</div>
                <span class="quest-section__label">${section.label}</span>
                <div class="quest-section__line"></div>
            </div>`;

            scenarios.forEach(s => {
                const cat = getCategoryName(s);
                html += `
                <div class="quest-card" title="${s.desc || ''}">
                    <div class="quest-card__number">QUEST ${String(num).padStart(2, '0')}</div>
                    <div class="quest-card__name">${s.name}</div>
                    <div class="quest-card__meta">
                        <span class="quest-card__tag quest-card__tag--${cat}">${cat}</span>
                        <span class="quest-card__duration">${s.duration || 3}m</span>
                    </div>
                    ${s.desc ? `<div class="quest-card__desc">${s.desc}</div>` : ''}
                </div>`;
                num++;
            });
        });

        els.questGrid.innerHTML = html;

    }

    /** Allow clicking sidebar days to preview */
    window.__switchDay = function (dayIndex) {
        renderTodayGrid(dayIndex);
    };

    function renderAll() {
        renderWeekSidebar();
        renderTodayGrid();
    }

    // ============================================================
    // Subscribe Gate
    // ============================================================
    function checkSubscription() {
        try {
            isSubscribed = localStorage.getItem(SUB_KEY) === 'true';
        } catch (e) { isSubscribed = false; }

        if (isSubscribed) {
            unlockSliders();
        } else {
            els.subscribeGate.classList.remove('hidden');
            els.slidersPanel.classList.add('hidden');
        }
    }

    function unlockSliders() {
        els.subscribeGate.classList.add('hidden');
        els.slidersPanel.classList.remove('hidden');
        isSubscribed = true;
        try { localStorage.setItem(SUB_KEY, 'true'); } catch (e) { }
    }

    // Subscribe button — opens YouTube, marks as done after a delay
    els.subscribeBtn.addEventListener('click', (e) => {
        // Link opens naturally via <a> tag
        // After 3 seconds, auto-unlock (they've seen the page)
        setTimeout(() => {
            unlockSliders();
            showToast('Training Priority unlocked! 💖 Thank you!');
        }, 2000);
    });

    els.subscribeDoneBtn.addEventListener('click', () => {
        unlockSliders();
        showToast('Training Priority unlocked! Thank you for subscribing! 🎉');
    });

    // ============================================================
    // Interactions
    // ============================================================
    function showToast(msg) {
        els.toastText.textContent = msg;
        els.toast.classList.add('show');
        setTimeout(() => els.toast.classList.remove('show'), 2500);
    }

    // Copy today's playlist
    els.copyAllBtn.addEventListener('click', () => {
        // Determine which day is currently showing
        const activeDay = document.querySelector('.week-item.active');
        const dayIndex = activeDay ? parseInt(activeDay.dataset.day) : new Date().getDay();
        const now = new Date();
        const routine = generateRoutine(dayIndex, now.getFullYear());
        const all = [...routine.warmup, ...routine.main, ...routine.challenge, ...routine.cooldown];
        const text = all.map((s, i) => `${i + 1}. ${s.name}`).join('\n');

        navigator.clipboard.writeText(text).then(() => {
            showToast('Playlist copied to clipboard!');
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            showToast('Playlist copied!');
        });
    });

    // Platform Toggle
    els.platformBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            els.platformBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.platform = btn.dataset.platform;
            saveState();
            renderAll();
        });
    });

    // Difficulty Toggle
    els.diffBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            els.diffBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.difficulty = btn.dataset.diff;
            saveState();
            renderAll();
        });
    });

    // Sliders (ternary)
    function setupSliders() {
        const sliders = {
            flicking: els.sliderFlicking,
            tracking: els.sliderTracking,
            switching: els.sliderSwitching,
        };

        Object.entries(sliders).forEach(([key, slider]) => {
            slider.addEventListener('input', () => {
                const newVal = parseInt(slider.value, 10);
                const others = Object.keys(sliders).filter(k => k !== key);
                const currentOthersTotal = others.reduce((sum, k) => sum + state.sliders[k], 0);
                const remaining = 100 - newVal;

                if (currentOthersTotal === 0) {
                    others.forEach(k => { state.sliders[k] = Math.round(remaining / others.length); });
                } else {
                    others.forEach(k => {
                        state.sliders[k] = Math.max(0, Math.round((state.sliders[k] / currentOthersTotal) * remaining));
                    });
                }

                const total = newVal + others.reduce((sum, k) => sum + state.sliders[k], 0);
                if (total !== 100) { state.sliders[others[0]] += 100 - total; }
                state.sliders[key] = newVal;

                updateSliderUI();
                saveState();
                renderAll();
            });
        });
    }

    function updateSliderUI() {
        els.sliderFlicking.value = state.sliders.flicking;
        els.sliderTracking.value = state.sliders.tracking;
        els.sliderSwitching.value = state.sliders.switching;
        els.valFlicking.textContent = state.sliders.flicking + '%';
        els.valTracking.textContent = state.sliders.tracking + '%';
        els.valSwitching.textContent = state.sliders.switching + '%';
        els.distFlicking.style.width = state.sliders.flicking + '%';
        els.distTracking.style.width = state.sliders.tracking + '%';
        els.distSwitching.style.width = state.sliders.switching + '%';
    }

    // Theme Toggle
    els.themeToggle.addEventListener('click', () => {
        const idx = THEMES.indexOf(state.theme);
        state.theme = THEMES[(idx + 1) % THEMES.length];
        document.documentElement.setAttribute('data-theme', state.theme);
        saveState();
    });

    // Profile Name
    els.profileName.addEventListener('input', () => {
        state.profileName = els.profileName.value;
        saveState();
    });

    // Share Config
    els.shareBtn.addEventListener('click', () => {
        const params = new URLSearchParams({
            p: state.platform,
            d: state.difficulty,
            f: state.sliders.flicking,
            t: state.sliders.tracking,
            s: state.sliders.switching,
            th: state.theme,
        });
        const url = window.location.origin + window.location.pathname + '?' + params.toString();

        navigator.clipboard.writeText(url).then(() => {
            showToast('Share link copied!');
        }).catch(() => {
            showToast('Share link: ' + url);
        });
    });

    // ============================================================
    // Persistence
    // ============================================================
    function saveState() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) { }
    }

    function loadState() {
        const params = new URLSearchParams(window.location.search);
        if (params.has('f') || params.has('p')) {
            if (params.has('p')) state.platform = params.get('p');
            if (params.has('d')) state.difficulty = params.get('d');
            if (params.has('f')) state.sliders.flicking = parseInt(params.get('f'), 10) || 34;
            if (params.has('t')) state.sliders.tracking = parseInt(params.get('t'), 10) || 33;
            if (params.has('s')) state.sliders.switching = parseInt(params.get('s'), 10) || 33;
            if (params.has('th')) state.theme = params.get('th');
            window.history.replaceState({}, '', window.location.pathname);
            return;
        }

        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) { state = { ...state, ...JSON.parse(saved) }; }
        } catch (e) { }
    }

    function applyStateToUI() {
        els.platformBtns.forEach(b => b.classList.toggle('active', b.dataset.platform === state.platform));
        els.diffBtns.forEach(b => b.classList.toggle('active', b.dataset.diff === state.difficulty));
        updateSliderUI();
        els.profileName.value = state.profileName;
        document.documentElement.setAttribute('data-theme', state.theme);
    }

    // ============================================================
    // Init
    // ============================================================
    function init() {
        loadState();
        applyStateToUI();
        checkSubscription();
        setupSliders();
        renderAll();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
