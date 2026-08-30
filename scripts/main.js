// NM MicroLearn - Main JavaScript
document.addEventListener("DOMContentLoaded", function() {
  // Nav scroll effect
  const nav = document.getElementById("mainNav");
  if (nav) {
    window.addEventListener("scroll", () => {
      nav.classList.toggle("scrolled", window.scrollY > 20);
    });
  }

  // Animated counter
  const counters = document.querySelectorAll(".stat-num");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));

  function animateCounter(el, target) {
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = target.toLocaleString() + "+"; clearInterval(timer); }
      else { el.textContent = Math.floor(start).toLocaleString(); }
    }, 16);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // Portal card hover glow
  document.querySelectorAll(".portal-card").forEach(card => {
    card.addEventListener("mousemove", e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", x + "px");
      card.style.setProperty("--mouse-y", y + "px");
    });
  });

  // Animate progress bars
  const progressBars = document.querySelectorAll(".progress-fill");
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || bar.style.width;
        bar.style.width = "0";
        setTimeout(() => { bar.style.width = width; }, 100);
        progressObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  progressBars.forEach(b => progressObserver.observe(b));

  // Notification bell click
  const bellBtns = document.querySelectorAll(".notif-btn");
  bellBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const dot = btn.querySelector(".notif-dot");
      if (dot) dot.style.display = "none";
    });
  });

  // Apply button interactions
  document.querySelectorAll(".apply-btn").forEach(btn => {
    btn.addEventListener("click", function(e) {
      e.stopPropagation();
      const original = this.textContent;
      this.textContent = "Applied!";
      this.style.opacity = "0.7";
      setTimeout(() => { this.textContent = original; this.style.opacity = "1"; }, 2000);
    });
  });

  // Tab switching
  document.querySelectorAll("[data-tab-target]").forEach(btn => {
    btn.addEventListener("click", function() {
      const target = this.dataset.tabTarget;
      const parent = this.closest("[data-tabs]");
      if (!parent) return;
      parent.querySelectorAll("[data-tab-target]").forEach(b => b.classList.remove("active-tab"));
      this.classList.add("active-tab");
      parent.querySelectorAll("[data-tab]").forEach(pane => {
        pane.style.display = pane.dataset.tab === target ? "block" : "none";
      });
    });
  });

  // Modal
  document.querySelectorAll("[data-modal-open]").forEach(btn => {
    btn.addEventListener("click", function() {
      const id = this.dataset.modalOpen;
      const modal = document.getElementById(id);
      if (modal) { modal.style.display = "flex"; setTimeout(() => modal.classList.add("modal-show"), 10); }
    });
  });
  document.querySelectorAll("[data-modal-close]").forEach(btn => {
    btn.addEventListener("click", function() {
      const modal = this.closest(".modal-overlay");
      if (modal) { modal.classList.remove("modal-show"); setTimeout(() => modal.style.display = "none", 300); }
    });
  });
  document.querySelectorAll(".modal-overlay").forEach(m => {
    m.addEventListener("click", function(e) {
      if (e.target === this) { this.classList.remove("modal-show"); setTimeout(() => this.style.display = "none", 300); }
    });
  });
});
