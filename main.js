(function () {
'use strict';

/* ── CONFIG ──────────────────────────────────── */
const ROOM_W = 22;
const ROOM_H = 15;
const SPEED  = 5.8;   // tiles / sec
const IRANGE = 1.8;   // interaction reach beyond object edge (tiles)

/* ── ROOMS ───────────────────────────────────── */
// BUG FIX: hub sign moved to ty=4 (was ty=5 which overlapped player spawn at ty=7)
// West/East hub doors widened to th=3 so they're easy to find and walk through
const ROOMS = {
    hub: {
        name: 'HEADQUARTERS',
        floorA: '#1e2258', floorB: '#252a68',
        wall:   '#0c0e2a', wallTop: '#f8e820',
        accent: '#f8e820',
        objBg: '#fffde0', objBorder: '#d4b800',
        doors: [
            { tx:10, ty:0,  tw:2, th:1, to:'journey',  sx:10.5, sy:13.2, label:'JOURNEY'  },
            { tx:10, ty:14, tw:2, th:1, to:'contact',  sx:10.5, sy: 1.8, label:'CONTACT'  },
            { tx:0,  ty:6,  tw:1, th:3, to:'about',    sx:20.2, sy: 7.5, label:'ABOUT'    },
            { tx:21, ty:6,  tw:1, th:3, to:'projects', sx: 1.8, sy: 7.5, label:'PROJECTS' },
        ],
        objects: [
            // ty=4 keeps sign away from west/east doors (ty=6-8) and player spawn (ty=9)
            { tx:9, ty:4, tw:4, th:2, emoji:'🌟', label:'ARYAMAN\nMODI', panel:'hero' },
        ],
    },

    about: {
        name: 'ABOUT',
        floorA: '#1060c8', floorB: '#1868d4',
        wall:   '#082268', wallTop: '#70e8ff',
        accent: '#70e8ff',
        objBg: '#e0f4ff', objBorder: '#0090c8',
        doors: [
            { tx:21, ty:6, tw:1, th:3, to:'hub', sx:1.8, sy:7.5, label:'HUB' },
        ],
        objects: [
            { tx:3,  ty:3, tw:3, th:2, emoji:'📚', label:'SKILLS',    panel:'skills'    },
            { tx:9,  ty:3, tw:4, th:2, emoji:'🎓', label:'EDUCATION', panel:'education' },
            { tx:15, ty:3, tw:4, th:2, emoji:'💼', label:'WORK',      panel:'work'      },
            { tx:7,  ty:9, tw:4, th:2, emoji:'⚡', label:'INTERESTS', panel:'interests' },
        ],
    },

    projects: {
        name: 'PROJECTS',
        floorA: '#4a1098', floorB: '#5218a8',
        wall:   '#200858', wallTop: '#e060ff',
        accent: '#e060ff',
        objBg: '#f0e0ff', objBorder: '#9020d0',
        doors: [
            { tx:0, ty:6, tw:1, th:3, to:'hub', sx:20.2, sy:7.5, label:'HUB' },
        ],
        objects: [
            { tx:2,  ty:2, tw:3, th:3, emoji:'🤖', label:'HOOT AI',        panel:'p-hoot'     },
            { tx:7,  ty:2, tw:3, th:3, emoji:'🔗', label:'VALID NFT',      panel:'p-nft'      },
            { tx:13, ty:2, tw:3, th:3, emoji:'🤝', label:'MY BEVO',        panel:'p-mybevo'   },
            { tx:4,  ty:9, tw:3, th:3, emoji:'👾', label:'SPACE\nINVADERS',panel:'p-space'    },
            { tx:12, ty:9, tw:3, th:3, emoji:'📄', label:'RESEARCH',       panel:'p-research' },
        ],
    },

    journey: {
        name: 'JOURNEY',
        floorA: '#6a3818', floorB: '#784020',
        wall:   '#301408', wallTop: '#ff9020',
        accent: '#ff9020',
        objBg: '#fff4d8', objBorder: '#c06000',
        doors: [
            { tx:10, ty:14, tw:2, th:1, to:'hub', sx:10.5, sy:1.8, label:'HUB' },
        ],
        objects: [
            { tx:2,  ty:3, tw:3, th:6, emoji:'🏢', label:'2026\nDELL', panel:'j-dell' },
            { tx:7,  ty:3, tw:3, th:6, emoji:'💻', label:'2024–25',    panel:'j-2425' },
            { tx:12, ty:3, tw:3, th:6, emoji:'🔧', label:'2023–24',    panel:'j-2324' },
            { tx:17, ty:3, tw:3, th:6, emoji:'🏆', label:'2021–23',    panel:'j-2123' },
        ],
    },

    contact: {
        name: 'CONTACT',
        floorA: '#188838', floorB: '#209040',
        wall:   '#083818', wallTop: '#50ff70',
        accent: '#50ff70',
        objBg: '#e0ffec', objBorder: '#009830',
        doors: [
            { tx:10, ty:0, tw:2, th:1, to:'hub', sx:10.5, sy:13.2, label:'HUB' },
        ],
        objects: [
            { tx:3,  ty:4, tw:4, th:5, emoji:'🐙', label:'GITHUB',   url:'https://github.com/aryamanm535' },
            { tx:9,  ty:4, tw:4, th:5, emoji:'💼', label:'LINKEDIN', url:'https://www.linkedin.com/in/aryamanmodi5' },
            { tx:15, ty:4, tw:4, th:5, emoji:'📧', label:'EMAIL',    url:'mailto:aryamanmodi@utexas.edu' },
        ],
    },
};

/* ── PANEL CONTENT ───────────────────────────── */
const PANELS = {
    hero: {
        title: 'Aryaman Modi',
        html: `
            <p class="p-sub">ECE Junior @ UT Austin &nbsp;·&nbsp; Incoming Dell SWE Intern</p>
            <p class="p-bio">Building at the intersection of AI, blockchain, and systems. I love hard problems, fast cars, and elegant code.</p>
            <p class="p-bio">Walk through the four doors to explore my projects, journey, about info, and contact.</p>
            <div class="p-links">
                <a href="https://github.com/aryamanm535" target="_blank">GitHub →</a>
                <a href="https://www.linkedin.com/in/aryamanmodi5" target="_blank">LinkedIn →</a>
                <a href="mailto:aryamanmodi@utexas.edu">Email →</a>
            </div>`,
    },
    skills: {
        title: 'Skills',
        html: `<div class="p-tags">
            <span>C/C++</span><span>Java</span><span>Python</span><span>JavaScript</span>
            <span>TypeScript</span><span>Solidity</span><span>React</span><span>Next.js</span>
            <span>SQL</span><span>MongoDB</span><span>Git</span><span>Docker</span>
        </div>`,
    },
    education: {
        title: 'Education',
        html: `
            <p class="p-sub">Electrical &amp; Computer Engineering</p>
            <p class="p-item"><strong>University of Texas at Austin</strong> — Junior</p>
            <p class="p-item">Multiple Math Olympiad Medalist — <em>AIMO, HKIMO, IPM</em></p>
            <p class="p-item">Captain, FIRST Tech Challenge robotics — <em>3rd place</em></p>`,
    },
    work: {
        title: 'Work Experience',
        html: `<ul class="p-list">
            <li><strong>Incoming SWE Intern</strong> — Dell Technologies, Global Operations · Summer 2026</li>
            <li><strong>SDE</strong> — X Digital Capital Solutions · 2024</li>
            <li><strong>IT Assistant</strong> — University of Texas at Austin · 2024–Present</li>
            <li><strong>Aerodynamics Engineer</strong> — Longhorn Racing · 2023–24</li>
            <li><strong>SWE Intern</strong> — Yodaplus Technologies · 2023</li>
        </ul>`,
    },
    interests: {
        title: 'Interests',
        html: `
            <p class="p-bio">Trading · Formula One · Football · Go-Karting</p>
            <p class="p-bio">Math competitions · Aerodynamics research · Robotics · Building things from scratch</p>`,
    },
    'p-hoot': {
        title: 'Hoot: AI Stock Coach', badges: 'NEW · HACKATHON',
        html: `
            <p class="p-bio">Educational finance platform that explains stock price movements via AI-generated insights grounded in real headlines. Drag across chart windows to get sourced explanations, then practice with quizzes and a conversational owl-themed chatbot tutor.</p>
            <div class="p-tags"><span>Next.js</span><span>TypeScript</span><span>Gemini API</span><span>Groq</span><span>Recharts</span><span>Yahoo Finance</span></div>
            <a class="p-btn" href="https://github.com/aryamanm535/hootAI" target="_blank">View on GitHub →</a>`,
    },
    'p-nft': {
        title: 'ValidNFT — XDC Staking Marketplace',
        html: `
            <p class="p-bio">Primary project from my internship at X Digital Capital Solutions. Re-designed contract logic to a per-collection model for gas optimization and developed full-stack workflows for the marketplace.</p>
            <div class="p-tags"><span>Solidity</span><span>Node.js</span><span>React</span><span>MongoDB</span><span>Ethers.js</span></div>
            <a class="p-btn" href="https://github.com/aryamanm535/ValidNFT" target="_blank">View on GitHub →</a>`,
    },
    'p-mybevo': {
        title: 'MyBevo — Comprehensive AI Assistant',
        html: `
            <p class="p-bio">Comprehensive AI assistant for students at UT Austin. A resume genie that generates, analyzes, and ranks resumes across colleges, plus a chatbot answering university-wide questions from dining menus to room availability.</p>
            <div class="p-tags"><span>Node.js</span><span>React</span><span>Tailwind</span><span>JavaScript</span></div>`,
    },
    'p-space': {
        title: 'Space Invaders — Embedded Systems',
        html: `
            <p class="p-bio">Hardware and software project on an MSPM0G3507 microcontroller. Developed the full embedded software in C — managing user input, sprite movement, game logic, and collision detection on bare metal.</p>
            <div class="p-tags"><span>C</span><span>Embedded Systems</span><span>Hardware</span></div>
            <a class="p-btn" href="https://www.youtube.com/watch?v=mgJ2n2XCgT4" target="_blank">Watch Demo →</a>`,
    },
    'p-research': {
        title: 'Published Aerodynamics Research', badges: 'PUBLISHED',
        html: `
            <p class="p-bio">Co-authored research on a split dihedral/anhedral rear wing arrangement on an F1 car. Simulation analysis proved a 19% centripetal force increase.</p>
            <p class="p-item">DOI: 10.13140/RG.2.2.20228.81283/2</p>
            <div class="p-tags"><span>Research</span><span>ANSYS Fluent</span><span>Aerodynamics</span></div>
            <a class="p-btn" href="https://ijournals.in/wp-content/uploads/2022/10/12.IJSHRE-101015-Aryaman.pdf" target="_blank">Read Paper →</a>`,
    },
    'j-dell': {
        title: 'Dell Technologies — Incoming',
        html: `
            <p class="p-sub">Summer 2026 · Global Operations SWE Intern</p>
            <p class="p-bio">Joining Dell's Global Operations engineering team — building software that powers enterprise operations at scale.</p>`,
    },
    'j-2425': {
        title: '2024 – 2025',
        html: `<ul class="p-list">
            <li>Built a secure NFT marketplace and optimized smart contracts at <strong>X Digital Capital Solutions</strong>.</li>
            <li>Resolving networking issues and automating workflows with GenAI as an <strong>IT Assistant at UT Austin</strong>.</li>
            <li>Developing <strong>MyBevo</strong>, an AI-powered resume generator and university chatbot.</li>
            <li>Exploring decentralized tech at <strong>Texas Blockchain</strong>.</li>
        </ul>`,
    },
    'j-2324': {
        title: '2023 – 2024',
        html: `<ul class="p-list">
            <li>Developed a hospital CRM and deployed microservices at <strong>Yodaplus Technologies</strong>.</li>
            <li>Improved vehicle downforce using SolidWorks &amp; ANSYS as Aerodynamics Engineer for <strong>Longhorn Racing</strong>.</li>
            <li>Explored <strong>embedded systems and hardware</strong>, building Space Invaders on bare metal.</li>
        </ul>`,
    },
    'j-2123': {
        title: '2021 – 2023',
        html: `<ul class="p-list">
            <li>Won Silver Medals at <strong>HKIMO/AIMO</strong> and moderated math competitions.</li>
            <li>Published a research paper on F1 rear wing aerodynamics.</li>
            <li>Built a <strong>sudoku solver</strong>, the <strong>'Blip' programming language</strong>, and a <strong>Monty Hall simulator</strong>.</li>
            <li>Captain of FIRST Tech Challenge robotics team — <em>3rd place</em>.</li>
        </ul>`,
    },
};

/* ── STATE ───────────────────────────────────── */
let TILE = 44;
let canvas, ctx, lastTime = 0;

const state = {
    room: 'hub',
    fadeAlpha: 0,
    fadingOut: false,
    pendingRoom: null, pendingX: 0, pendingY: 0,
    labelAlpha: 0, labelTimer: 0,
};

const player = {
    // BUG FIX: spawn at ty=9 (hub sign is at ty=4-5, can't overlap)
    x: 10.5 * 44, y: 9.0 * 44,
    facing: 'down',
    walkPhase: 0,
    moving: false,
};

let clickTarget  = null;
let nearObj      = null;
let interactAlpha = 0;
const KEYS = {};

/* ── SETUP ───────────────────────────────────── */
function setup() {
    canvas = document.getElementById('game');
    ctx    = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', () => {
        const old = TILE;
        resize();
        if (TILE !== old) {
            player.x = (player.x / old) * TILE;
            player.y = (player.y / old) * TILE;
        }
    });

    window.addEventListener('keydown', e => {
        KEYS[e.key] = true;
        if ((e.key === 'e' || e.key === 'E') && nearObj) {
            if (document.getElementById('p-overlay').style.display !== 'flex') interact(nearObj);
        }
        if (e.key === 'Escape') closePanel();
        // Prevent page scroll with arrow keys
        if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) e.preventDefault();
    });
    window.addEventListener('keyup', e => { KEYS[e.key] = false; });

    canvas.addEventListener('click', e => handleClick(e.clientX, e.clientY));
    canvas.addEventListener('touchstart', e => {
        e.preventDefault();
        handleClick(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    document.getElementById('p-close').addEventListener('click', closePanel);
    document.getElementById('p-overlay').addEventListener('click', e => {
        if (e.target.id === 'p-overlay') closePanel();
    });

    player.x = 10.5 * TILE;
    player.y = 9.0  * TILE;
    state.labelAlpha = 1;
    state.labelTimer = 3.0;

    requestAnimationFrame(ts => { lastTime = ts; requestAnimationFrame(loop); });
}

function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    TILE = Math.max(24, Math.floor(Math.min(canvas.width / ROOM_W, canvas.height / ROOM_H)));
}

function ox() { return (canvas.width  - ROOM_W * TILE) / 2; }
function oy() { return (canvas.height - ROOM_H * TILE) / 2; }

/* ── INPUT ───────────────────────────────────── */
function handleClick(cx, cy) {
    const rx = cx - ox(), ry = cy - oy();
    if (rx >= 0 && ry >= 0 && rx < ROOM_W * TILE && ry < ROOM_H * TILE) {
        clickTarget = { x: rx, y: ry };
    }
}

/* ── COLLISION ───────────────────────────────── */
function isSolid(tx, ty, roomId) {
    if (tx < 0 || ty < 0 || tx >= ROOM_W || ty >= ROOM_H) return true;
    const rd     = ROOMS[roomId];
    const onEdge = (tx === 0 || ty === 0 || tx === ROOM_W - 1 || ty === ROOM_H - 1);
    if (onEdge) {
        for (const d of rd.doors) {
            if (tx >= d.tx && tx < d.tx + d.tw && ty >= d.ty && ty < d.ty + d.th) return false;
        }
        return true;
    }
    for (const o of rd.objects) {
        if (tx >= o.tx && tx < o.tx + o.tw && ty >= o.ty && ty < o.ty + o.th) return true;
    }
    return false;
}

function blockedAt(px, py, roomId) {
    const h = TILE * 0.26, m = 2;
    return [
        [px - h + m, py - h + m],
        [px + h - m, py - h + m],
        [px - h + m, py + h - m],
        [px + h - m, py + h - m],
    ].some(([cx, cy]) => isSolid(Math.floor(cx / TILE), Math.floor(cy / TILE), roomId));
}

/* ── INTERACT ────────────────────────────────── */
function interact(obj) {
    if (obj.url) { window.open(obj.url, '_blank'); return; }
    if (obj.panel) {
        const p = PANELS[obj.panel];
        if (!p) return;
        document.getElementById('p-title').textContent  = p.title;
        document.getElementById('p-badges').textContent = p.badges || '';
        document.getElementById('p-body').innerHTML     = p.html;
        document.getElementById('p-overlay').style.display = 'flex';
    }
}

function closePanel() {
    document.getElementById('p-overlay').style.display = 'none';
}

/* ── UPDATE ──────────────────────────────────── */
function update(dt) {
    if (state.fadingOut) {
        state.fadeAlpha = Math.min(1, state.fadeAlpha + dt * 3.5);
        if (state.fadeAlpha >= 1) {
            state.room      = state.pendingRoom;
            player.x        = state.pendingX * TILE;
            player.y        = state.pendingY * TILE;
            player.facing   = 'down';
            clickTarget     = null;
            state.fadingOut = false;
            state.labelAlpha = 1;
            state.labelTimer = 2.5;
        }
        return;
    }
    if (state.fadeAlpha > 0) state.fadeAlpha = Math.max(0, state.fadeAlpha - dt * 3.5);

    if (state.labelTimer > 0) {
        state.labelTimer -= dt;
        if (state.labelTimer < 0.8) state.labelAlpha = Math.max(0, state.labelTimer / 0.8);
    }

    // Keyboard
    let dx = 0, dy = 0;
    if (KEYS['ArrowLeft']  || KEYS['a'] || KEYS['A']) { dx -= 1; player.facing = 'left';  }
    if (KEYS['ArrowRight'] || KEYS['d'] || KEYS['D']) { dx += 1; player.facing = 'right'; }
    if (KEYS['ArrowUp']    || KEYS['w'] || KEYS['W']) { dy -= 1; player.facing = 'up';    }
    if (KEYS['ArrowDown']  || KEYS['s'] || KEYS['S']) { dy += 1; player.facing = 'down';  }
    if (dx !== 0 && dy !== 0) { dx *= 0.707; dy *= 0.707; }

    // Click-to-move
    if (dx === 0 && dy === 0 && clickTarget) {
        const cdx = clickTarget.x - player.x;
        const cdy = clickTarget.y - player.y;
        const dist = Math.hypot(cdx, cdy);
        if (dist < 5) {
            clickTarget = null;
        } else {
            dx = cdx / dist; dy = cdy / dist;
            if (Math.abs(cdx) > Math.abs(cdy)) player.facing = cdx > 0 ? 'right' : 'left';
            else                                 player.facing = cdy > 0 ? 'down'  : 'up';
        }
    } else if (dx !== 0 || dy !== 0) {
        clickTarget = null;
    }

    player.moving = (dx !== 0 || dy !== 0);

    if (player.moving) {
        const spd = SPEED * TILE;
        const nx  = player.x + dx * spd * dt;
        const ny  = player.y + dy * spd * dt;
        if (!blockedAt(nx, player.y, state.room)) player.x = nx;
        if (!blockedAt(player.x, ny, state.room)) player.y = ny;
        player.walkPhase += dt * 10;
    }

    // Door entry
    const tx = Math.floor(player.x / TILE), ty = Math.floor(player.y / TILE);
    for (const d of ROOMS[state.room].doors) {
        if (tx >= d.tx && tx < d.tx + d.tw && ty >= d.ty && ty < d.ty + d.th) {
            state.fadingOut   = true;
            state.fadeAlpha   = 0;
            state.pendingRoom = d.to;
            state.pendingX    = d.sx;
            state.pendingY    = d.sy;
            break;
        }
    }

    // Nearest interactable object
    let minDist = Infinity;
    nearObj = null;
    for (const o of ROOMS[state.room].objects) {
        const cx     = (o.tx + o.tw / 2) * TILE;
        const cy     = (o.ty + o.th / 2) * TILE;
        const dist   = Math.hypot(player.x - cx, player.y - cy);
        const thresh = ((o.tw + o.th) / 2 + IRANGE) * TILE;
        if (dist < thresh && dist < minDist) { minDist = dist; nearObj = o; }
    }
    interactAlpha += ((nearObj ? 1 : 0) - interactAlpha) * Math.min(1, dt * 9);
}

/* ── DRAW ────────────────────────────────────── */
function draw(ts) {
    const W  = canvas.width, H = canvas.height;
    const OX = ox(), OY = oy();
    const rd = ROOMS[state.room];

    // Background (outside room)
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, W, H);

    // ── Checkerboard floor ──
    ctx.fillStyle = rd.floorB;
    ctx.fillRect(OX, OY, ROOM_W * TILE, ROOM_H * TILE);
    ctx.fillStyle = rd.floorA;
    for (let ty = 0; ty < ROOM_H; ty++) {
        for (let tx = 0; tx < ROOM_W; tx++) {
            if ((tx + ty) % 2 === 0) {
                ctx.fillRect(OX + tx * TILE, OY + ty * TILE, TILE, TILE);
            }
        }
    }

    // Tile border lines (very subtle)
    ctx.strokeStyle = 'rgba(0,0,0,0.18)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= ROOM_W; x++) {
        ctx.beginPath(); ctx.moveTo(OX + x*TILE, OY); ctx.lineTo(OX + x*TILE, OY + ROOM_H*TILE); ctx.stroke();
    }
    for (let y = 0; y <= ROOM_H; y++) {
        ctx.beginPath(); ctx.moveTo(OX, OY + y*TILE); ctx.lineTo(OX + ROOM_W*TILE, OY + y*TILE); ctx.stroke();
    }

    // ── Helper: is tile a door ──
    function isDoor(tx, ty) {
        return rd.doors.some(d => tx >= d.tx && tx < d.tx + d.tw && ty >= d.ty && ty < d.ty + d.th);
    }

    // ── Walls ──
    function drawWall(tx, ty) {
        const x = OX + tx * TILE, y = OY + ty * TILE;
        // Main body
        ctx.fillStyle = rd.wall;
        ctx.fillRect(x, y, TILE, TILE);
        // Colored accent stripe at top
        ctx.fillStyle = rd.wallTop;
        ctx.globalAlpha = 0.55;
        ctx.fillRect(x, y, TILE, Math.max(5, TILE * 0.18));
        ctx.globalAlpha = 1;
        // Bright top highlight
        ctx.fillStyle = 'rgba(255,255,255,0.22)';
        ctx.fillRect(x, y, TILE, 2);
        // Right dark edge (3D)
        ctx.fillStyle = 'rgba(0,0,0,0.35)';
        ctx.fillRect(x + TILE - 3, y, 3, TILE);
        // Bottom dark edge
        ctx.fillRect(x, y + TILE - 3, TILE, 3);
    }

    for (let x = 0; x < ROOM_W; x++) {
        if (!isDoor(x, 0))        drawWall(x, 0);
        if (!isDoor(x, ROOM_H-1)) drawWall(x, ROOM_H-1);
    }
    for (let y = 1; y < ROOM_H - 1; y++) {
        if (!isDoor(0, y))        drawWall(0, y);
        if (!isDoor(ROOM_W-1, y)) drawWall(ROOM_W-1, y);
    }

    // ── Doors ──
    for (const d of rd.doors) {
        const x = OX + d.tx * TILE, y = OY + d.ty * TILE;
        const pw = d.tw * TILE, ph = d.th * TILE;

        // Door floor (black void / opening)
        ctx.fillStyle = '#000';
        ctx.fillRect(x, y, pw, ph);

        // Bright frame
        ctx.strokeStyle = rd.accent;
        ctx.lineWidth   = 3;
        ctx.strokeRect(x + 1.5, y + 1.5, pw - 3, ph - 3);
        // Outer black outline
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 0.5, y + 0.5, pw - 1, ph - 1);

        // Label
        ctx.fillStyle    = rd.accent;
        ctx.globalAlpha  = 0.9;
        ctx.font         = `bold ${Math.max(8, TILE * 0.19)}px 'Space Mono', monospace`;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(d.label, x + pw / 2, y + ph / 2);
        ctx.globalAlpha = 1;
    }

    // ── Objects (Pokemon sign style) ──
    for (const obj of rd.objects) {
        const ox2 = OX + obj.tx * TILE, oy2 = OY + obj.ty * TILE;
        const ow  = obj.tw * TILE, oh = obj.th * TILE;
        const isNear = obj === nearObj;
        const g      = isNear ? interactAlpha : 0;

        // Drop shadow
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(ox2 + 5, oy2 + 5, ow, oh);

        // Background fill (light parchment style)
        ctx.fillStyle = isNear ? '#ffffff' : (rd.objBg || '#fffde0');
        ctx.fillRect(ox2, oy2, ow, oh);

        // Colored border (Pokemon-ey double border)
        const bdrColor = rd.objBorder || rd.accent;
        // Outer black
        ctx.strokeStyle = '#111';
        ctx.lineWidth   = 3;
        ctx.strokeRect(ox2 + 1.5, oy2 + 1.5, ow - 3, oh - 3);
        // Inner accent
        ctx.strokeStyle = isNear ? rd.accent : bdrColor;
        ctx.lineWidth   = isNear ? 3 : 2;
        ctx.strokeRect(ox2 + 4, oy2 + 4, ow - 8, oh - 8);

        // Glow when near
        if (g > 0.05) {
            ctx.save();
            ctx.shadowColor = rd.accent;
            ctx.shadowBlur  = 18 * g;
            ctx.strokeStyle = rd.accent;
            ctx.lineWidth   = 1;
            ctx.strokeRect(ox2, oy2, ow, oh);
            ctx.restore();
        }

        // Emoji icon
        const iconSize = Math.max(14, TILE * 0.55);
        ctx.font         = `${iconSize}px serif`;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obj.emoji, ox2 + ow / 2, oy2 + oh * 0.38);

        // Label (dark text, multiline)
        const lines     = obj.label.split('\n');
        const labelSize = Math.max(7, TILE * 0.2);
        ctx.font      = `bold ${labelSize}px 'Inter', sans-serif`;
        ctx.fillStyle = '#111';
        lines.forEach((line, i) => {
            const off = (i - (lines.length - 1) / 2) * (labelSize * 1.4);
            ctx.fillText(line, ox2 + ow / 2, oy2 + oh * 0.72 + off);
        });

        // Pokémon-style "!" bubble when nearby
        if (isNear && interactAlpha > 0.05) {
            const pulse = 0.7 + 0.3 * Math.sin(ts * 0.006);
            ctx.globalAlpha = interactAlpha * pulse;
            const bx = ox2 + ow / 2, by = oy2 - TILE * 0.38;
            const br = Math.max(9, TILE * 0.22);
            // Yellow circle
            ctx.fillStyle = '#FFE800';
            ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fill();
            // Black outline
            ctx.strokeStyle = '#111'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.stroke();
            // "!" text
            ctx.fillStyle    = '#111';
            ctx.font         = `bold ${Math.max(10, TILE * 0.28)}px 'Inter', sans-serif`;
            ctx.textAlign    = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('!', bx, by + 1);
            ctx.globalAlpha = 1;
        }
    }

    // ── Player ──
    drawPlayer(OX + player.x, OY + player.y, ts);

    // ── Room name label ──
    if (state.labelAlpha > 0) {
        const label  = ROOMS[state.room].name;
        const accent = ROOMS[state.room].accent;
        const fs     = Math.max(13, TILE * 0.38);
        ctx.font     = `bold ${fs}px 'Inter', sans-serif`;
        const tw2    = ctx.measureText(label).width;
        const lx     = W / 2 - tw2 / 2 - 20;
        const ly     = OY + TILE * 0.7;

        ctx.globalAlpha = state.labelAlpha;
        // Black box
        ctx.fillStyle = '#000';
        ctx.fillRect(lx - 2, ly - fs * 0.85, tw2 + 44, fs * 1.55);
        // Accent border
        ctx.strokeStyle = accent;
        ctx.lineWidth   = 3;
        ctx.strokeRect(lx - 2, ly - fs * 0.85, tw2 + 44, fs * 1.55);
        ctx.fillStyle    = accent;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, W / 2, ly + fs * 0.12);
        ctx.globalAlpha = 1;
    }

    // ── Controls hint (hub only) ──
    if (state.room === 'hub') {
        const hintFs = Math.max(8, TILE * 0.18);
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(OX, OY + ROOM_H * TILE - hintFs * 2, ROOM_W * TILE, hintFs * 2);
        ctx.fillStyle    = 'rgba(255,255,255,0.5)';
        ctx.font         = `${hintFs}px 'Space Mono', monospace`;
        ctx.textAlign    = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText('WASD / arrows / click to move   ·   E to interact', OX + 8, OY + ROOM_H * TILE - hintFs);
    }

    // ── Minimap ──
    drawMinimap(W, OY);

    // ── Fade overlay ──
    if (state.fadeAlpha > 0) {
        ctx.fillStyle = `rgba(0,0,0,${state.fadeAlpha})`;
        ctx.fillRect(0, 0, W, H);
    }
}

/* ── PLAYER SPRITE (Pokémon protagonist style) ── */
function drawPlayer(px, py, ts) {
    const s   = TILE * 0.42;
    const bob = player.moving ? Math.sin(player.walkPhase) * s * 0.09 : 0;
    const lp  = player.walkPhase;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.ellipse(px, py + s * 1.15, s * 0.48, s * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shoes
    ctx.fillStyle = '#222';
    ctx.beginPath();
    ctx.ellipse(px - s * 0.21, py + s + Math.sin(lp) * s * 0.22, s * 0.2, s * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(px + s * 0.21, py + s - Math.sin(lp) * s * 0.22, s * 0.2, s * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pants (blue)
    ctx.fillStyle = '#2255bb';
    ctx.fillRect(px - s * 0.27, py + s * 0.28 + bob, s * 0.23, s * 0.6);
    ctx.fillRect(px + s * 0.04, py + s * 0.28 + bob, s * 0.23, s * 0.6);

    // Body / shirt (Pokemon-red)
    ctx.fillStyle = '#dd2020';
    ctx.fillRect(px - s * 0.38, py - s * 0.12 + bob, s * 0.76, s * 0.46);
    // White collar
    ctx.fillStyle = '#fff';
    ctx.fillRect(px - s * 0.2, py - s * 0.12 + bob, s * 0.4, s * 0.16);

    // Head (skin)
    ctx.fillStyle = '#f0c878';
    ctx.beginPath();
    ctx.arc(px, py - s * 0.38 + bob, s * 0.31, 0, Math.PI * 2);
    ctx.fill();

    // Cap (top half, red)
    ctx.fillStyle = '#dd2020';
    ctx.beginPath();
    ctx.arc(px, py - s * 0.38 + bob, s * 0.31, Math.PI, 2 * Math.PI);
    ctx.fill();

    // Cap brim (facing forward/sideways)
    if (player.facing !== 'up') {
        ctx.fillStyle = '#cc1010';
        const capY = py - s * 0.38 + bob;
        const brimDir = player.facing === 'left' ? -1 : 1;
        ctx.fillRect(px - s * 0.36, capY - s * 0.03, s * 0.72, s * 0.1);
        // Brim tip
        ctx.beginPath();
        ctx.ellipse(px + brimDir * s * 0.38, capY + s * 0.02, s * 0.14, s * 0.07, 0, 0, Math.PI * 2);
        ctx.fill();
    }

    // Eyes
    if (player.facing !== 'up') {
        ctx.fillStyle = '#222';
        const eyeY = py - s * 0.33 + bob;
        ctx.beginPath(); ctx.arc(px - s * 0.1, eyeY, s * 0.055, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(px + s * 0.1, eyeY, s * 0.055, 0, Math.PI * 2); ctx.fill();
        // Highlights
        ctx.fillStyle = '#fff';
        ctx.beginPath(); ctx.arc(px - s * 0.08, eyeY - s * 0.02, s * 0.02, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(px + s * 0.12, eyeY - s * 0.02, s * 0.02, 0, Math.PI * 2); ctx.fill();
    }

    // Direction dot (green, directional indicator)
    const dirs = { up:[0,-1], down:[0,1], left:[-1,0], right:[1,0] };
    const [fdx, fdy] = dirs[player.facing];
    ctx.fillStyle = '#00FF88';
    ctx.beginPath();
    ctx.arc(px + fdx * s * 0.35, py + fdy * s * 0.35 + bob * 0.4, s * 0.1, 0, Math.PI * 2);
    ctx.fill();
}

/* ── MINIMAP ─────────────────────────────────── */
function drawMinimap(W, OY) {
    const sz  = 84, pad = 12;
    const mx  = W - sz - pad, my = OY + pad;
    const cw  = sz / 3, ch = sz / 3;

    // Background
    ctx.fillStyle   = 'rgba(0,0,0,0.85)';
    ctx.fillRect(mx - 4, my - 4, sz + 8, sz + 8);
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth   = 1.5;
    ctx.strokeRect(mx - 4, my - 4, sz + 8, sz + 8);

    const CELLS = [
        { id:'journey',  col:1, row:0 },
        { id:'about',    col:0, row:1 },
        { id:'hub',      col:1, row:1 },
        { id:'projects', col:2, row:1 },
        { id:'contact',  col:1, row:2 },
    ];
    const ABBR = { hub:'HUB', about:'ABT', projects:'PRJ', journey:'JRN', contact:'CNT' };

    for (const c of CELLS) {
        const rx     = mx + c.col * cw, ry = my + c.row * ch;
        const active = c.id === state.room;
        const acc    = ROOMS[c.id].accent;

        ctx.fillStyle = active ? acc + '44' : 'rgba(255,255,255,0.06)';
        ctx.fillRect(rx + 1, ry + 1, cw - 2, ch - 2);
        ctx.strokeStyle = active ? acc : 'rgba(255,255,255,0.15)';
        ctx.lineWidth   = active ? 2 : 0.75;
        ctx.strokeRect(rx + 1, ry + 1, cw - 2, ch - 2);
        ctx.fillStyle    = active ? acc : 'rgba(255,255,255,0.35)';
        ctx.font         = `bold ${Math.max(6, cw * 0.31)}px 'Space Mono', monospace`;
        ctx.textAlign    = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(ABBR[c.id], rx + cw / 2, ry + ch / 2);
    }

    // Player dot on minimap
    const roomCells = { hub:[1,1], about:[0,1], projects:[2,1], journey:[1,0], contact:[1,2] };
    const [pc, pr]  = roomCells[state.room];
    const dotX = mx + pc * cw + (player.x / (ROOM_W * TILE)) * cw;
    const dotY = my + pr * ch + (player.y / (ROOM_H * TILE)) * ch;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(dotX, dotY, 2.5, 0, Math.PI * 2); ctx.fill();
}

/* ── GAME LOOP ───────────────────────────────── */
function loop(ts) {
    const dt = Math.min((ts - lastTime) / 1000, 0.05);
    lastTime = ts;
    update(dt);
    draw(ts);
    requestAnimationFrame(loop);
}

window.addEventListener('DOMContentLoaded', setup);
})();
