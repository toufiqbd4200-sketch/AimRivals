// ============================================================
// Rivals Aim-Trainer — Scenario Database
// by Kaiser Everhart
// ============================================================
// Each scenario: { name, category, sub, difficulty, duration, desc, warmup }
//   category: "flicking" | "tracking" | "switching"
//   sub:      flicking  → "static" | "dynamic"
//             tracking  → "precise" | "reactive"
//             switching → "speed" | "evasive"
//   difficulty: "beginner" | "intermediate" | "advanced"
//   duration: suggested minutes
//   warmup: true if suitable as warmup scenario
// ============================================================

const SCENARIOS = {

  // ======================== KOVAAK'S ========================
  kovaaks: {

    // ---------- FLICKING ----------
    flicking: [
      // Static — Beginner
      { name: "1w4ts Voltaic",               sub: "static",  difficulty: "beginner",     duration: 3, desc: "Click 4 static targets, great fundamentals starter", warmup: true },
      { name: "1w2ts reload",                sub: "static",  difficulty: "beginner",     duration: 3, desc: "Two-target static clicking with reloads", warmup: true },
      { name: "ww3t Voltaic",                sub: "static",  difficulty: "beginner",     duration: 3, desc: "Three-wall static target clicking", warmup: true },
      { name: "6 Sphere Hipfire Voltaic",    sub: "static",  difficulty: "beginner",     duration: 3, desc: "Six sphere targets, hipfire precision", warmup: true },
      // Static — Intermediate
      { name: "1w4ts reload 30% smaller",    sub: "static",  difficulty: "intermediate", duration: 4, desc: "Smaller targets force precision on static clicks", warmup: false },
      { name: "ww2t reload",                 sub: "static",  difficulty: "intermediate", duration: 4, desc: "Two-wall clicking with reload pressure", warmup: false },
      { name: "Aimerz+ ww2t Hard S1",        sub: "static",  difficulty: "intermediate", duration: 4, desc: "Hard two-wall static clicking drill", warmup: false },
      { name: "VT 1w2ts Pokespeed",          sub: "static",  difficulty: "intermediate", duration: 4, desc: "Speed-focused static pokeball clicking", warmup: false },
      // Static — Advanced
      { name: "1w6ts Voltaic",               sub: "static",  difficulty: "advanced",     duration: 5, desc: "Six targets per wall, extreme precision required", warmup: false },
      { name: "ww6t Voltaic",                sub: "static",  difficulty: "advanced",     duration: 5, desc: "Six-target wall-width clicking at speed", warmup: false },
      { name: "Pokeball Frenzy TI",          sub: "static",  difficulty: "advanced",     duration: 5, desc: "Rapid pokeball variations with tiny targets", warmup: false },

      // Dynamic — Beginner
      { name: "Pasu Voltaic Easy",           sub: "dynamic", difficulty: "beginner",     duration: 3, desc: "Moving target clicking, smooth linear paths", warmup: true },
      { name: "B180 Voltaic Easy",           sub: "dynamic", difficulty: "beginner",     duration: 3, desc: "180° flicks to moving targets", warmup: true },
      { name: "Popcorn Voltaic Easy",        sub: "dynamic", difficulty: "beginner",     duration: 3, desc: "Popping targets that appear briefly", warmup: true },
      // Dynamic — Intermediate
      { name: "Pasu Voltaic",                sub: "dynamic", difficulty: "intermediate", duration: 4, desc: "Standard Pasu — clicking moving targets with precision", warmup: false },
      { name: "B180 Voltaic",                sub: "dynamic", difficulty: "intermediate", duration: 4, desc: "Standard 180° dynamic flicks", warmup: false },
      { name: "Popcorn Voltaic",             sub: "dynamic", difficulty: "intermediate", duration: 4, desc: "Standard Popcorn — quick-disappearing targets", warmup: false },
      { name: "VT Pasu Rasp Advanced",       sub: "dynamic", difficulty: "intermediate", duration: 4, desc: "Raspberry Pasu variant with faster movement", warmup: false },
      // Dynamic — Advanced
      { name: "Pasu Voltaic Advanced",       sub: "dynamic", difficulty: "advanced",     duration: 5, desc: "Fast erratic movement patterns to click", warmup: false },
      { name: "B180 Voltaic Advanced",       sub: "dynamic", difficulty: "advanced",     duration: 5, desc: "Advanced 180° flicks, tiny fast targets", warmup: false },
      { name: "Popcorn Voltaic Advanced",    sub: "dynamic", difficulty: "advanced",     duration: 5, desc: "Blink-speed popcorn targets", warmup: false },
      { name: "AngelClick VT",               sub: "dynamic", difficulty: "advanced",     duration: 5, desc: "Angelic-speed dynamic clicking challenge", warmup: false },
    ],

    // ---------- TRACKING ----------
    tracking: [
      // Precise/Smooth — Beginner
      { name: "Smoothbot Voltaic Easy",      sub: "precise",  difficulty: "beginner",     duration: 3, desc: "Smooth slow bot tracking, build mouse control", warmup: true },
      { name: "PGTI Voltaic Easy",           sub: "precise",  difficulty: "beginner",     duration: 3, desc: "Precise ground-tracking with gentle movements", warmup: true },
      { name: "Air Angelic 4 Voltaic Easy",  sub: "precise",  difficulty: "beginner",     duration: 3, desc: "Aerial target tracking at easy pace", warmup: true },
      // Precise/Smooth — Intermediate
      { name: "Controlsphere",               sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Sphere tracking requiring constant mouse control", warmup: false },
      { name: "PGTI Voltaic",                sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Standard precise ground tracking", warmup: false },
      { name: "Smoothbot Voltaic",           sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Standard smooth bot tracking", warmup: false },
      { name: "Whisphere",                   sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Whisper-speed sphere tracking precision", warmup: false },
      // Precise/Smooth — Advanced
      { name: "Extra Controlsphere",         sub: "precise",  difficulty: "advanced",     duration: 5, desc: "Extended controlsphere with harder patterns", warmup: false },
      { name: "Whisphere Extra Small & Slow", sub: "precise", difficulty: "advanced",     duration: 5, desc: "Tiny sphere tracking, extreme precision", warmup: false },
      { name: "PGTI Voltaic Advanced",       sub: "precise",  difficulty: "advanced",     duration: 5, desc: "Advanced ground tracking with fast direction changes", warmup: false },
      { name: "Smoothbot Voltaic Advanced",  sub: "precise",  difficulty: "advanced",     duration: 5, desc: "Advanced smooth tracking with unpredictable bots", warmup: false },

      // Reactive — Beginner
      { name: "Air Voltaic Easy",            sub: "reactive", difficulty: "beginner",     duration: 3, desc: "Air target tracking with gentle reactivity", warmup: true },
      { name: "Ground Plaza Voltaic Easy",   sub: "reactive", difficulty: "beginner",     duration: 3, desc: "Ground-level reactive tracking", warmup: true },
      { name: "FuglaaXYZ Voltaic Easy",      sub: "reactive", difficulty: "beginner",     duration: 3, desc: "XYZ-axis reactive tracking fundamentals", warmup: true },
      // Reactive — Intermediate
      { name: "Air Voltaic",                 sub: "reactive", difficulty: "intermediate", duration: 4, desc: "Standard air reactive tracking", warmup: false },
      { name: "Ground Plaza Sparky v3",      sub: "reactive", difficulty: "intermediate", duration: 4, desc: "Sparky ground tracking with quick direction shifts", warmup: false },
      { name: "Air Angelic",                 sub: "reactive", difficulty: "intermediate", duration: 4, desc: "Angelic aerial tracking with moderate reactivity", warmup: false },
      { name: "FuglaaXYZ Voltaic",           sub: "reactive", difficulty: "intermediate", duration: 4, desc: "Standard XYZ reactive tracking", warmup: false },
      // Reactive — Advanced
      { name: "Air Invincible",              sub: "reactive", difficulty: "advanced",     duration: 5, desc: "Invincible-speed air tracking challenge", warmup: false },
      { name: "Ground Plaza Sparky v3 OW",   sub: "reactive", difficulty: "advanced",     duration: 5, desc: "OW variant with extreme reactivity", warmup: false },
      { name: "Air no UFO no SKYBOTS",       sub: "reactive", difficulty: "advanced",     duration: 5, desc: "Pure air tracking, no assists", warmup: false },
      { name: "FuglaaXYZ Voltaic Advanced",  sub: "reactive", difficulty: "advanced",     duration: 5, desc: "Advanced XYZ reactive tracking at high speed", warmup: false },
    ],

    // ---------- SWITCHING ----------
    switching: [
      // Speed — Beginner
      { name: "patTS Voltaic Easy",          sub: "speed",   difficulty: "beginner",     duration: 3, desc: "Pattern-based target switching warmup", warmup: true },
      { name: "psalmTS Voltaic Easy",        sub: "speed",   difficulty: "beginner",     duration: 3, desc: "psalm-style speed switching fundamentals", warmup: true },
      { name: "voxTS Voltaic Easy",          sub: "speed",   difficulty: "beginner",     duration: 3, desc: "Vox target switching at comfortable pace", warmup: true },
      // Speed — Intermediate
      { name: "voxTS Voltaic",               sub: "speed",   difficulty: "intermediate", duration: 4, desc: "Standard vox target switching drill", warmup: false },
      { name: "voxTS Viscose Varied",        sub: "speed",   difficulty: "intermediate", duration: 4, desc: "Varied viscose switching patterns", warmup: false },
      { name: "FloatTS Angelic",             sub: "speed",   difficulty: "intermediate", duration: 4, desc: "Floating targets with angelic-speed switching", warmup: false },
      { name: "xenTargetSwitch",             sub: "speed",   difficulty: "intermediate", duration: 4, desc: "Xen-style rapid target switching", warmup: false },
      // Speed — Advanced
      { name: "voxTS rAim",                  sub: "speed",   difficulty: "advanced",     duration: 5, desc: "rAim variant — extreme speed switching", warmup: false },
      { name: "VT skyTS Advanced",           sub: "speed",   difficulty: "advanced",     duration: 5, desc: "Advanced sky target switching", warmup: false },
      { name: "patTS Voltaic Advanced",      sub: "speed",   difficulty: "advanced",     duration: 5, desc: "Advanced pattern-based switching", warmup: false },

      // Evasive — Beginner
      { name: "kinTS Voltaic Easy",          sub: "evasive", difficulty: "beginner",     duration: 3, desc: "Kinetic evasive switching warmup", warmup: true },
      { name: "B180T Voltaic Easy",          sub: "evasive", difficulty: "beginner",     duration: 3, desc: "180° evasive target switching basics", warmup: true },
      // Evasive — Intermediate
      { name: "B180T Voltaic",               sub: "evasive", difficulty: "intermediate", duration: 4, desc: "Standard 180° evasive switching", warmup: false },
      { name: "canTS Logic",                 sub: "evasive", difficulty: "intermediate", duration: 4, desc: "Logical evasive switching patterns", warmup: false },
      { name: "canTS",                       sub: "evasive", difficulty: "intermediate", duration: 4, desc: "Can-style evasive target switching", warmup: false },
      { name: "Controlsphere TS",            sub: "evasive", difficulty: "intermediate", duration: 4, desc: "Controlsphere with switching overlay", warmup: false },
      // Evasive — Advanced
      { name: "WhisphereTS 180",             sub: "evasive", difficulty: "advanced",     duration: 5, desc: "180° whisphere evasive switching", warmup: false },
      { name: "fuglaab180t",                 sub: "evasive", difficulty: "advanced",     duration: 5, desc: "Fuglaa 180° evasive switching at max difficulty", warmup: false },
      { name: "kinTS Voltaic Advanced",      sub: "evasive", difficulty: "advanced",     duration: 5, desc: "Advanced kinetic evasive switching", warmup: false },
    ],
  },

  // ======================== AIMLABS ========================
  aimlabs: {

    // ---------- FLICKING ----------
    flicking: [
      // Static — Beginner
      { name: "Gridshot (Ultimate)",          sub: "static",  difficulty: "beginner",     duration: 2, desc: "The classic — 3 targets on a grid, click fast", warmup: true },
      { name: "Sixshot (Ultimate)",           sub: "static",  difficulty: "beginner",     duration: 2, desc: "6 targets appear, flick through them all", warmup: true },
      { name: "Spidershot (Precision)",       sub: "static",  difficulty: "beginner",     duration: 2, desc: "Targets connected by lines, precision flicking", warmup: true },
      { name: "Microshot (Precision)",        sub: "static",  difficulty: "beginner",     duration: 3, desc: "Tiny targets for micro-adjustment flicks", warmup: true },
      { name: "Dotshot",                      sub: "static",  difficulty: "beginner",     duration: 2, desc: "Simple dot targets for building flick fundamentals", warmup: true },
      // Static — Intermediate
      { name: "Gridshot (Speed)",             sub: "static",  difficulty: "intermediate", duration: 3, desc: "Faster gridshot — less reaction time allowed", warmup: false },
      { name: "Micro Gridshot",               sub: "static",  difficulty: "intermediate", duration: 3, desc: "Tiny grid targets, precision + speed combo", warmup: false },
      { name: "Sixshot (Speed)",              sub: "static",  difficulty: "intermediate", duration: 3, desc: "Speed variant — targets disappear faster", warmup: false },
      { name: "Micro Sixshot",                sub: "static",  difficulty: "intermediate", duration: 3, desc: "Micro-sized six targets, extreme precision", warmup: false },
      { name: "Spidershot (Speed)",           sub: "static",  difficulty: "intermediate", duration: 3, desc: "Fast spidershot — web of precision targets", warmup: false },
      { name: "Microshot (Speed)",            sub: "static",  difficulty: "intermediate", duration: 3, desc: "Speed micro-adjustment clicking", warmup: false },
      { name: "Headshot (Precision)",         sub: "static",  difficulty: "intermediate", duration: 3, desc: "Head-level static targets, tactical precision", warmup: false },
      { name: "Pentashot",                    sub: "static",  difficulty: "intermediate", duration: 3, desc: "5 targets in pentagon formation", warmup: false },
      // Static — Advanced
      { name: "Micro Gridshot (Speed)",       sub: "static",  difficulty: "advanced",     duration: 4, desc: "Extreme speed + tiny targets grid challenge", warmup: false },
      { name: "Headshot (Speed)",             sub: "static",  difficulty: "advanced",     duration: 4, desc: "Fast disappearing head-level targets", warmup: false },
      { name: "Microshot Ultimate",           sub: "static",  difficulty: "advanced",     duration: 4, desc: "Ultimate micro clicking — pixel-perfect shots", warmup: false },
      { name: "Micro-Microshot",              sub: "static",  difficulty: "advanced",     duration: 4, desc: "Even tinier targets, ultimate precision test", warmup: false },
      { name: "Spidershot (Ultimate)",        sub: "static",  difficulty: "advanced",     duration: 4, desc: "Ultimate spidershot — fastest + smallest", warmup: false },
      { name: "Multishot (Ultimate)",         sub: "static",  difficulty: "advanced",     duration: 4, desc: "Multiple simultaneous target flicking", warmup: false },

      // Dynamic — Beginner
      { name: "Motionshot (Standard)",        sub: "dynamic", difficulty: "beginner",     duration: 2, desc: "Moving targets to flick at, gentle speeds", warmup: true },
      { name: "Scattershot (Standard)",       sub: "dynamic", difficulty: "beginner",     duration: 2, desc: "Targets scatter outward, click before they escape", warmup: true },
      { name: "Orbshot",                      sub: "dynamic", difficulty: "beginner",     duration: 2, desc: "Orbital targets moving in circular paths", warmup: true },
      // Dynamic — Intermediate
      { name: "Motionshot (Ultimate)",        sub: "dynamic", difficulty: "intermediate", duration: 3, desc: "Fast-moving targets, react and flick", warmup: false },
      { name: "Scattershot (Ultimate)",       sub: "dynamic", difficulty: "intermediate", duration: 3, desc: "Ultra-fast scatter, test reaction speed", warmup: false },
      { name: "Burst Flick (Ultimate)",       sub: "dynamic", difficulty: "intermediate", duration: 3, desc: "Burst-fire flicking to moving targets", warmup: false },
      { name: "Headshot (Standard)",          sub: "dynamic", difficulty: "intermediate", duration: 3, desc: "Dynamic head-level flicking practice", warmup: false },
      { name: "Blinkshot",                    sub: "dynamic", difficulty: "intermediate", duration: 3, desc: "Targets blink in and out — snap to them fast", warmup: false },
      // Dynamic — Advanced
      { name: "Motionshot (Speed)",           sub: "dynamic", difficulty: "advanced",     duration: 4, desc: "Maximum speed moving target flicks", warmup: false },
      { name: "Burst Flick Advanced",         sub: "dynamic", difficulty: "advanced",     duration: 4, desc: "Advanced burst flicking with erratic movement", warmup: false },
      { name: "Angleshot",                    sub: "dynamic", difficulty: "advanced",     duration: 4, desc: "Dynamic angle flicking across the screen", warmup: false },
      { name: "Valentino Flick",              sub: "dynamic", difficulty: "advanced",     duration: 4, desc: "Rapid multi-angle dynamic flick challenge", warmup: false },
    ],

    // ---------- TRACKING ----------
    tracking: [
      // Smooth — Beginner
      { name: "Strafetrack (Standard)",       sub: "precise",  difficulty: "beginner",     duration: 3, desc: "Track strafing target at comfortable pace", warmup: true },
      { name: "Arctrack (Standard)",          sub: "precise",  difficulty: "beginner",     duration: 3, desc: "Track target moving in arc patterns", warmup: true },
      { name: "Microstartrack (Standard)",    sub: "precise",  difficulty: "beginner",     duration: 3, desc: "Small star-pattern tracking", warmup: true },
      { name: "Circletrack",                  sub: "precise",  difficulty: "beginner",     duration: 3, desc: "Circular motion tracking fundamentals", warmup: true },
      { name: "Orbittrack",                   sub: "precise",  difficulty: "beginner",     duration: 3, desc: "Slow orbital target tracking", warmup: true },
      // Smooth — Intermediate
      { name: "Strafetrack (Ultimate)",       sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Fast strafe tracking with direction changes", warmup: false },
      { name: "Arctrack (Ultimate)",          sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Ultimate arc tracking — faster arcs", warmup: false },
      { name: "Circleshot",                   sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Track and click circular motion targets", warmup: false },
      { name: "Freetrack",                    sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Free-moving target tracking practice", warmup: false },
      { name: "Smoothtrack",                  sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Emphasis on smooth mouse movement tracking", warmup: false },
      { name: "Angletrack VALORANT",          sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Track targets through angle positions", warmup: false },
      { name: "Verticaltrack",               sub: "precise",  difficulty: "intermediate", duration: 4, desc: "Vertical-axis tracking practice", warmup: false },
      // Smooth — Advanced
      { name: "Strafetrack (Speed)",          sub: "precise",  difficulty: "advanced",     duration: 5, desc: "Maximum speed strafing targets", warmup: false },
      { name: "Arctrack Advanced",            sub: "precise",  difficulty: "advanced",     duration: 5, desc: "Erratic arc patterns at high speed", warmup: false },
      { name: "Precisiontrack",              sub: "precise",  difficulty: "advanced",     duration: 5, desc: "Extreme precision small target tracking", warmup: false },
      { name: "Multitrack (Ultimate)",        sub: "precise",  difficulty: "advanced",     duration: 5, desc: "Track multiple targets simultaneously", warmup: false },

      // Reactive — Beginner
      { name: "Reactivetrack (Standard)",     sub: "reactive", difficulty: "beginner",     duration: 3, desc: "Targets change direction — react and follow", warmup: true },
      { name: "Motiontrack (Standard)",       sub: "reactive", difficulty: "beginner",     duration: 3, desc: "Track moving targets with gentle reactivity", warmup: true },
      { name: "Swaptrack",                    sub: "reactive", difficulty: "beginner",     duration: 3, desc: "Target swaps positions — retarget and track", warmup: true },
      // Reactive — Intermediate
      { name: "Reactivetrack (Ultimate)",     sub: "reactive", difficulty: "intermediate", duration: 4, desc: "Fast reactive tracking with many direction changes", warmup: false },
      { name: "Motiontrack (Ultimate)",       sub: "reactive", difficulty: "intermediate", duration: 4, desc: "Ultimate motion tracking challenge", warmup: false },
      { name: "Freetrack Reactive",           sub: "reactive", difficulty: "intermediate", duration: 4, desc: "Free-form reactive tracking mixed patterns", warmup: false },
      { name: "Bouncetrack",                  sub: "reactive", difficulty: "intermediate", duration: 4, desc: "Track bouncing targets off walls", warmup: false },
      { name: "Erratictrack",                 sub: "reactive", difficulty: "intermediate", duration: 4, desc: "Erratic unpredictable movement tracking", warmup: false },
      // Reactive — Advanced
      { name: "Reactivetrack (Speed)",        sub: "reactive", difficulty: "advanced",     duration: 5, desc: "Maximum speed reactive tracking", warmup: false },
      { name: "Motiontrack (Speed)",          sub: "reactive", difficulty: "advanced",     duration: 5, desc: "Fastest motion tracking variant", warmup: false },
      { name: "Spaztrack",                    sub: "reactive", difficulty: "advanced",     duration: 5, desc: "Extremely erratic spastic movement tracking", warmup: false },
      { name: "Twitch Reactive",              sub: "reactive", difficulty: "advanced",     duration: 5, desc: "Twitchy high-speed reactive tracking", warmup: false },
    ],

    // ---------- SWITCHING ----------
    switching: [
      // Speed — Beginner
      { name: "Decisionshot (Standard)",      sub: "speed",   difficulty: "beginner",     duration: 2, desc: "Decide and switch between targets quickly", warmup: true },
      { name: "Switchtrack (Standard)",       sub: "speed",   difficulty: "beginner",     duration: 3, desc: "Switch between tracking targets", warmup: true },
      { name: "Multilinetrace (Standard)",    sub: "speed",   difficulty: "beginner",     duration: 3, desc: "Trace lines between multiple targets", warmup: true },
      { name: "Targetswitch",                 sub: "speed",   difficulty: "beginner",     duration: 2, desc: "Basic alternating target switch drill", warmup: true },
      // Speed — Intermediate
      { name: "Decisionshot (Ultimate)",      sub: "speed",   difficulty: "intermediate", duration: 3, desc: "Ultimate decision-making under pressure", warmup: false },
      { name: "Switchtrack (Ultimate)",       sub: "speed",   difficulty: "intermediate", duration: 4, desc: "Fast switching between tracking targets", warmup: false },
      { name: "Multilinetrace (Ultimate)",    sub: "speed",   difficulty: "intermediate", duration: 4, desc: "Ultimate multi-target line tracing", warmup: false },
      { name: "Multishot (Standard)",         sub: "speed",   difficulty: "intermediate", duration: 3, desc: "Switch between multiple shot targets", warmup: false },
      { name: "Valo Hold Switch",             sub: "speed",   difficulty: "intermediate", duration: 3, desc: "VALORANT-style hold + switch practice", warmup: false },
      { name: "Strafeswitch",                 sub: "speed",   difficulty: "intermediate", duration: 4, desc: "Strafing targets, switch between them", warmup: false },
      // Speed — Advanced
      { name: "Decisionshot (Speed)",         sub: "speed",   difficulty: "advanced",     duration: 4, desc: "Maximum speed decision switching", warmup: false },
      { name: "Switchtrack (Speed)",          sub: "speed",   difficulty: "advanced",     duration: 5, desc: "Speed switching between fast trackers", warmup: false },
      { name: "Multilinetrace (Speed)",       sub: "speed",   difficulty: "advanced",     duration: 5, desc: "Fastest multi-target tracing", warmup: false },
      { name: "Rapidswitch",                  sub: "speed",   difficulty: "advanced",     duration: 4, desc: "Rapid-fire target switching at max pace", warmup: false },

      // Evasive — Beginner
      { name: "Detection (Standard)",         sub: "evasive", difficulty: "beginner",     duration: 3, desc: "Detect and switch to evasive targets", warmup: true },
      { name: "Motionswitch",                 sub: "evasive", difficulty: "beginner",     duration: 3, desc: "Switch between moving evasive targets", warmup: true },
      // Evasive — Intermediate
      { name: "Detection (Ultimate)",         sub: "evasive", difficulty: "intermediate", duration: 4, desc: "Ultimate evasive target detection switching", warmup: false },
      { name: "Scatterswitch",                sub: "evasive", difficulty: "intermediate", duration: 4, desc: "Scattering evasive targets to switch between", warmup: false },
      { name: "Bounceswitch",                 sub: "evasive", difficulty: "intermediate", duration: 4, desc: "Switch between bouncing evasive targets", warmup: false },
      { name: "Ghostswitch",                  sub: "evasive", difficulty: "intermediate", duration: 4, desc: "Ghost targets appear/disappear — switch to them", warmup: false },
      // Evasive — Advanced
      { name: "Detection (Speed)",            sub: "evasive", difficulty: "advanced",     duration: 5, desc: "Speed evasive detection — hardest variant", warmup: false },
      { name: "Phantomswitch",                sub: "evasive", difficulty: "advanced",     duration: 5, desc: "Phantom evasive targets, extreme difficulty", warmup: false },
      { name: "Chaosswitch",                  sub: "evasive", difficulty: "advanced",     duration: 5, desc: "Chaotic evasive switching frenzy", warmup: false },
    ],
  },
};

// Export for use in app.js
if (typeof module !== 'undefined') module.exports = SCENARIOS;
