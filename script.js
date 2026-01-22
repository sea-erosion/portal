/* ===== DOM取得 ===== */
const toggle = document.querySelector(".menu-toggle");
const navWrapper = document.getElementById("navWrapper");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsArea = document.getElementById("logResults");

/* ===== ハンバーガーメニュー ===== */
if (toggle && navWrapper) {
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    navWrapper.classList.toggle("open");
    toggle.setAttribute(
      "aria-expanded",
      toggle.classList.contains("active")
    );
  });

  // メニュー外クリックで閉じる
  document.addEventListener("click", (e) => {
    if (!navWrapper.contains(e.target) && !toggle.contains(e.target)) {
      navWrapper.classList.remove("open");
      toggle.classList.remove("active");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

/* ===== 日報検索処理 ===== */
function searchLogs() {
  if (!resultsArea) return;

  const q = searchInput.value.trim();
  resultsArea.innerHTML = "";

  if (!q) {
    resultsArea.innerHTML =
      `<p class="text-muted">検索条件を入力してください。</p>`;
    return;
  }

  const hits = dailyLogs.filter(log =>
    log.date.includes(q) ||
    log.title.includes(q)
  );

  if (hits.length === 0) {
    resultsArea.innerHTML =
      `<p class="log-restricted">該当する日報は存在しません。</p>`;
    return;
  }

  hits.forEach(log => {
    const card = document.createElement("div");
    card.className = "log-card";

    card.innerHTML = `
      <div class="log-date">
        ${log.date} / 権限Lv.${log.level}
      </div>
      <div class="log-title">${log.title}</div>
      ${
        log.restricted
          ? `<div class="log-restricted">
               ※ 権限不足により詳細は閲覧できません。
             </div>`
          : `<p>${log.summary}</p>`
      }
    `;

    resultsArea.appendChild(card);
  });
}

/* ===== 検索イベント ===== */
if (searchBtn && searchInput) {
  searchBtn.addEventListener("click", searchLogs);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      searchLogs();
    }
  });
}
