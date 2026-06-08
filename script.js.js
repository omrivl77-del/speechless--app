// ניווט דף פתיחה
function goToPricing() {
  document.getElementById('splashScreen').classList.remove('active');
  document.getElementById('pricingScreen').classList.add('active');
}

// ניווט כניסה לאפליקציה מהמינויים
function startApp(tierName) {
  document.getElementById('tierDisplay').textContent = tierName;
  document.getElementById('profileTierText').textContent = tierName;
  
  document.getElementById('pricingScreen').classList.remove('active');
  document.getElementById('mainAppScreen').classList.add('active');
}

// ניווט גלובלי בין הטאבים
function changeSection(targetId) {
  const sections = document.querySelectorAll('.view-section');
  sections.forEach(sec => sec.classList.remove('active'));
  
  const sideBtns = document.querySelectorAll('.side-btn');
  const bottomBtns = document.querySelectorAll('.nav-tab-btn');
  sideBtns.forEach(b => b.classList.remove('active'));
  bottomBtns.forEach(b => b.classList.remove('active'));
  
  const targetSection = document.getElementById('sec-' + targetId) || document.getElementById('tab-' + targetId);
  if (targetSection) targetSection.classList.add('active');
  
  const sideTarget = document.getElementById('btn-side-' + targetId);
  if (sideTarget) sideTarget.classList.add('active');
  
  document.getElementById('appMainViewport').scrollTop = 0;
  
  if (targetId === 'dashboard') document.getElementById('btn-bottom-home').classList.add('active');
  if (targetId === 'orators' || targetId === 'bibi-experience' || targetId === 'bibi-practice') {
    document.getElementById('btn-bottom-orators').classList.add('active');
  }
}

function redirectToUpgradeSection() {
  closeLockedModal();
  changeSection('buy-tier');
}

function goToBibiPractice() {
  changeSection('bibi-practice');
}

function openBibiDemo() {
  changeSection('bibi-experience');
}

// נתוני הניתוח המדעיים המדויקים לפי הסרטון של ה-New York Times מנאום הקונגרס 2015
const bibiTimelineData = {
  1: "📊 ניתוח AI פתיחה (04:40): נתניהו מתחיל לדבר רק לאחר דקה ארוכה של מחיאות כפיים מהקהל. שים לב כיצד הוא פותח בטקטיקה של 'חיבוק היריב' – הוא מודה ומחמיא אישית לנשיא אובמה (למרות המחלוקת המדינית הקשה ביניהם באותה תקופה). מבחינה רטורית, זהו מהלך קלאסי שנועד להוריד את המגננה של הקהל העוין באולם וליצור בסיס ראשוני של הסכמה הדדית.",
  2: "📊 ניתוח AI מחוות ידיים (22:05): כאן נתניהו עובר לדבר ישירות על סכנות המשטר האיראני. שים לב למחוות הידיים האגרסיביות אך המבוקרות שלו – שימוש ב'יד פתוחה דוחפת' (Push gesture) קדימה בכל פעם שהוא אומר מילת שלילה, ומבט יציב ורוקע אל עבר חברי הקונגרס. תנועות אלו משדרות נחרצות מוחלטת ומעבירות את השומעים למצב הקשבה דרוך.",
  3: "📊 ניתוח AI טונציה והפסקות (41:15): רגע השיא הדרמטי והחזק ביותר של הנאום בו הוא מציג את המשפט המפורסם: 'Even if Israel has to stand alone, Israel will stand'. נתניהו מוריד את קפתח הדיבור (Tempo) למינימום המוחלט, ומבצע הפסקה (Pause) מלאה של כמעט 3 שניות בין חלקי המשפט. השקט המתוזמן הזה מייצר מתח פסיכולוגי עצום שגורם לכל האולם לקום על הרגליים."
};

function showTimelineNode(nodeId) {
  const outputBox = document.getElementById('timelineOutputBox');
  outputBox.innerHTML = bibiTimelineData[nodeId];
  outputBox.style.backgroundColor = "rgba(255,255,255,0.25)";
}

// סימולציית העלאת קבצים וניהול צ'אט
function runMockUpload(type) {
  const progressCont = document.getElementById(type + 'ProgressCont');
  const progressFill = document.getElementById(type + 'ProgressFill');
  
  progressCont.style.display = 'block';
  let percent = 0;
  
  const timer = setInterval(() => {
    if (percent >= 100) {
      clearInterval(timer);
      setTimeout(() => {
        progressCont.style.display = 'none';
        injectAIResponse(type);
      }, 400);
    } else {
      percent += 10;
      progressFill.style.width = percent + '%';
    }
  }, 80);
}

function injectAIResponse(type) {
  const feed = document.getElementById(type + 'ChatFeed');
  
  const userMsg = document.createElement('div');
  userMsg.className = 'bubble user';
  userMsg.textContent = type === 'base' ? '🎥 הועלה סרטון תרגול בסיסי (15 שניות)' : '🎥 הועלה סרטון תרגול - התאמה לנאומי נתניהו';
  feed.appendChild(userMsg);
  feed.scrollTop = feed.scrollHeight;
  
  setTimeout(() => {
    const aiMsg = document.createElement('div');
    aiMsg.className = 'bubble ai';
    
    if (type === 'base') {
      aiMsg.innerHTML = `<strong>🤖 סריקת AI הושלמה:</strong><br>
      • קצב דיבור: 135 מילים בדקה (מעולה).<br>
      • שפת גוף: נצפתה תנועתיות יתר של הידיים.<br>
      • מילים מיותרות: השתמשת פעמיים ב-"אהה".`;
    } else {
      aiMsg.innerHTML = `<strong>🤖 ניתוח התאמה לקו הרטורי של נתניהו:</strong><br>
      • <strong>הפסקות דיבור (Pauses):</strong> רמה גבוהה! ביצעת עצירה דרמטית מתוזמנת היטב של 2.5 שניות כמו ביבי.<br>
      • <strong>טונציה ודיקציה:</strong> המנוע זיהה חדות חיובית במילים המודגשות.<br>
      • <strong>ציון התאמה כללי לביבי:</strong> 88% - עבודה מעולה!`;
    }
    
    feed.appendChild(aiMsg);
    feed.scrollTop = feed.scrollHeight;
    
    const inputField = document.getElementById(type + 'Input');
    inputField.removeAttribute('disabled');
    inputField.placeholder = "שאל את ה-AI שאלות נוספות על הניתוח שלך...";
  }, 1200);
}

function openLockedModal(oratorName) {
  document.getElementById('lockedModalTitle').textContent = 'תרגול בסגנון ' + oratorName;
  document.getElementById('lockedOratorModal').classList.add('active');
}

function closeLockedModal() {
  document.getElementById('lockedOratorModal').classList.remove('active');
}