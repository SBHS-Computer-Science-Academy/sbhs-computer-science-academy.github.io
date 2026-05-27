// State: which course is open (null = home), and which year tab is active within it
const state = { courseId: null, yearId: null };

// ── Helpers ───────────────────────────────────────────────────────────────────

function imgFile(name) {
  return name.replaceAll(" ", "").replaceAll(",", "").replace("and", "") + ".png";
}

function initials(name) {
  const parts = name.split(/[\s,]+/).filter(Boolean);
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase();
}

// Whether a course's every year is external (no local student data)
function isFullyExternal(course) {
  return course.years.every(y => y.externalUrl);
}

// The year to show by default: prefer current, else first
function defaultYear(course) {
  return (course.years.find(y => y.current) || course.years[0]).id;
}

// ── Navigation ────────────────────────────────────────────────────────────────

function goHome() {
  state.courseId = null;
  state.yearId = null;
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function openCourse(courseId) {
  const course = SHOWCASE.courses.find(c => c.id === courseId);
  state.courseId = courseId;
  state.yearId = defaultYear(course);
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function switchYear(yearId) {
  state.yearId = yearId;
  render();
}

// ── Rendering ─────────────────────────────────────────────────────────────────

function render() {
  document.getElementById("app").innerHTML =
    state.courseId ? renderCourseView() : renderHomeView();
  attachEvents();
}

// Home: grid of all courses
function renderHomeView() {
  const cards = SHOWCASE.courses.map(renderCourseCard).join("");
  return `<section class="course-section"><div class="course-grid">${cards}</div></section>`;
}

function renderCourseCard(course) {
  const yearBadges = course.years
    .map(y => `<span class="year-badge${y.current ? " year-badge--current" : ""}">${y.label}</span>`)
    .join("");

  // Fully external courses: render as a plain link (or multi-year external picker)
  if (isFullyExternal(course)) {
    const href = course.years.length === 1 ? course.years[0].externalUrl : "#";
    return `
      <a class="course-card course-card--external" href="${href}"
         target="_blank" rel="noopener noreferrer">
        <div class="course-card__icon"><i class="bi ${course.icon}"></i></div>
        <div class="course-card__body">
          <div class="course-card__name">${course.name}</div>
          <div class="course-card__desc">${course.desc}</div>
          <div class="course-card__years">${yearBadges}</div>
          <span class="course-card__cta">View projects <i class="bi bi-box-arrow-up-right"></i></span>
        </div>
      </a>`;
  }

  const totalProjects = course.years.reduce((sum, y) => sum + (y.students ? y.students.length : 0), 0);

  return `
    <button class="course-card" data-course="${course.id}">
      <div class="course-card__icon"><i class="bi ${course.icon}"></i></div>
      <div class="course-card__body">
        <div class="course-card__name">${course.name}</div>
        <div class="course-card__desc">${course.desc}</div>
        <div class="course-card__years">${yearBadges}</div>
        <span class="course-card__cta">${totalProjects} projects <i class="bi bi-arrow-right"></i></span>
      </div>
    </button>`;
}

// Course view: breadcrumb + year tabs + student grid
function renderCourseView() {
  const course = SHOWCASE.courses.find(c => c.id === state.courseId);
  const year = course.years.find(y => y.id === state.yearId);

  const breadcrumb = `
    <nav class="breadcrumb-bar" aria-label="breadcrumb">
      <button class="breadcrumb-back" id="back-btn">
        <i class="bi bi-arrow-left"></i> Back
      </button>
      <span class="breadcrumb-path">
        <span class="breadcrumb-link" id="bc-home">All Courses</span>
        <i class="bi bi-chevron-right"></i>
        <span class="breadcrumb-current">${course.name}</span>
      </span>
    </nav>`;

  const yearTabsHtml = course.years.map(y => {
    const active = y.id === state.yearId ? " active" : "";
    if (y.externalUrl) {
      return `<a class="year-btn" href="${y.externalUrl}" target="_blank" rel="noopener noreferrer">
        ${y.label} <i class="bi bi-box-arrow-up-right" style="font-size:.7em"></i>
      </a>`;
    }
    return `<button class="year-btn${active}" data-year="${y.id}">${y.label}</button>`;
  }).join("");

  const courseHeader = `
    <div class="course-header">
      <div class="course-header__icon"><i class="bi ${course.icon}"></i></div>
      <div>
        <h2 class="course-header__title">${course.name}</h2>
        <p class="course-header__meta">${course.desc}</p>
      </div>
    </div>
    <div class="year-tabs">${yearTabsHtml}</div>`;

  let content;
  if (year.externalUrl) {
    content = `<div class="external-note">
      <i class="bi bi-box-arrow-up-right"></i>
      <p>This year's projects are hosted externally.</p>
      <a class="project-external-link" href="${year.externalUrl}" target="_blank" rel="noopener noreferrer">
        Open ${year.label} projects
      </a>
    </div>`;
  } else {
    const studentCount = year.students.length;
    const studentCards = year.students.map(s => renderStudentCard(s, year.imgBase)).join("");
    content = `
      <p class="student-count">${studentCount} project${studentCount !== 1 ? "s" : ""}</p>
      <div class="student-grid">${studentCards}</div>`;
  }

  return `${breadcrumb}<div class="course-view">${courseHeader}${content}</div>`;
}

function renderStudentCard(student, imgBase) {
  const imgSrc = imgBase + imgFile(student.name);
  const ini = initials(student.name);
  const href = student.url;

  const linkHtml = href
    ? `<a class="student-card__link" href="${href}" target="_blank" rel="noopener noreferrer">
         View Project <i class="bi bi-box-arrow-up-right"></i>
       </a>`
    : `<span class="student-card__link student-card__link--none">No link available</span>`;

  return `
    <div class="student-card">
      <div class="student-card__thumb" data-initials="${ini}">
        <img src="${imgSrc}" alt="${student.name}" loading="lazy"
             onerror="this.parentElement.classList.add('no-img'); this.remove()">
      </div>
      <div class="student-card__info">
        <div class="student-card__name">${student.name}</div>
        ${linkHtml}
      </div>
    </div>`;
}

// ── Events ────────────────────────────────────────────────────────────────────

function attachEvents() {
  document.querySelectorAll(".course-card[data-course]").forEach(card => {
    card.addEventListener("click", () => openCourse(card.dataset.course));
  });

  document.querySelectorAll(".year-btn[data-year]").forEach(btn => {
    btn.addEventListener("click", () => switchYear(btn.dataset.year));
  });

  document.getElementById("back-btn")?.addEventListener("click", goHome);
  document.getElementById("bc-home")?.addEventListener("click", goHome);
  document.getElementById("home-btn").addEventListener("click", goHome);
}

// ── Boot ──────────────────────────────────────────────────────────────────────
render();
