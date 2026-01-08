// =======================================
// CUSTOM KITCHEN FURNITURE WEBSITE
// Main JavaScript File
// =======================================

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // ===== MOBILE NAVIGATION =====
  const navToggle = document.querySelector(".nav-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (navToggle && mobileMenu) {
    navToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");

      // Update toggle icon
      const icon = navToggle.textContent;
      navToggle.textContent = icon === "☰" ? "✕" : "☰";
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll(".nav-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.remove("active");
        navToggle.textContent = "☰";
      });
    });
  }

  // ===== STICKY HEADER ON SCROLL =====
  const header = document.querySelector(".header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // ===== ACTIVE NAV LINK =====
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    }
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      if (href !== "#" && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);

        if (target) {
          const headerHeight = header ? header.offsetHeight : 0;
          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset -
            headerHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // ===== FAQ ACCORDION =====
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
      question.addEventListener("click", function () {
        // Close other open items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item && otherItem.classList.contains("active")) {
            otherItem.classList.remove("active");
          }
        });

        // Toggle current item
        item.classList.toggle("active");
      });
    }
  });

  // ===== FORM VALIDATION =====
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      let isValid = true;
      const requiredFields = form.querySelectorAll("[required]");

      // Clear previous errors
      form.querySelectorAll(".form-group").forEach((group) => {
        group.classList.remove("error");
      });

      // Validate required fields
      requiredFields.forEach((field) => {
        const formGroup = field.closest(".form-group");
        const value = field.value.trim();

        if (!value) {
          isValid = false;
          if (formGroup) {
            formGroup.classList.add("error");
            const errorMsg = formGroup.querySelector(".form-error");
            if (errorMsg) {
              errorMsg.textContent = "This field is required";
            }
          }
        }

        // Email validation
        if (field.type === "email" && value) {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(value)) {
            isValid = false;
            if (formGroup) {
              formGroup.classList.add("error");
              const errorMsg = formGroup.querySelector(".form-error");
              if (errorMsg) {
                errorMsg.textContent = "Please enter a valid email address";
              }
            }
          }
        }

        // Phone validation
        if (field.type === "tel" && value) {
          const phonePattern = /^[\d\s\-\+\(\)]+$/;
          if (!phonePattern.test(value)) {
            isValid = false;
            if (formGroup) {
              formGroup.classList.add("error");
              const errorMsg = formGroup.querySelector(".form-error");
              if (errorMsg) {
                errorMsg.textContent = "Please enter a valid phone number";
              }
            }
          }
        }
      });

      if (isValid) {
        // Show success message
        showFormSuccess(form);

        // Reset form
        form.reset();

        // In production, you would send data to server here
        console.log("Form submitted successfully");
      } else {
        // Scroll to first error
        const firstError = form.querySelector(".form-group.error");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  });

  // ===== SHOW FORM SUCCESS MESSAGE =====
  function showFormSuccess(form) {
    const successMessage = document.createElement("div");
    successMessage.className = "alert alert-success fade-in";
    successMessage.innerHTML = `
      <strong>Thank you!</strong> Your message has been sent successfully. 
      We'll get back to you within 24 hours.
    `;

    // Insert before form
    form.parentNode.insertBefore(successMessage, form);

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });

    // Remove success message after 5 seconds
    setTimeout(() => {
      successMessage.remove();
    }, 5000);
  }

  // ===== GALLERY FILTER =====
  const filterButtons = document.querySelectorAll("[data-filter]");
  const galleryItems = document.querySelectorAll("[data-category]");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter");

        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        this.classList.add("active");

        // Filter items
        galleryItems.forEach((item) => {
          const category = item.getAttribute("data-category");

          if (filter === "all" || category === filter) {
            item.style.display = "block";
            setTimeout(() => {
              item.classList.add("fade-in");
            }, 10);
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // ===== ANIMATE ON SCROLL =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  const animateElements = document.querySelectorAll(
    ".card, .feature-item, .process-step, .testimonial"
  );
  animateElements.forEach((el) => observer.observe(el));

  // ===== COUNTER ANIMATION =====
  const counters = document.querySelectorAll(".stat-number");

  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.textContent.replace(/\D/g, ""));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.textContent =
                  Math.floor(current).toLocaleString() + "+";
                requestAnimationFrame(updateCounter);
              } else {
                counter.textContent = target.toLocaleString() + "+";
              }
            };

            updateCounter();
            counterObserver.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // ===== TESTIMONIAL SLIDER (if multiple testimonials) =====
  const testimonialSlider = document.querySelector(".testimonial-slider");

  if (testimonialSlider) {
    let currentSlide = 0;
    const slides = testimonialSlider.querySelectorAll(".testimonial");
    const totalSlides = slides.length;

    if (totalSlides > 1) {
      // Hide all slides except first
      slides.forEach((slide, index) => {
        if (index !== 0) slide.style.display = "none";
      });

      // Create navigation dots
      const dotsContainer = document.createElement("div");
      dotsContainer.className = "slider-dots";
      dotsContainer.style.cssText =
        "display: flex; justify-content: center; gap: 0.5rem; margin-top: 1.5rem;";

      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement("button");
        dot.className = "slider-dot";
        dot.style.cssText =
          "width: 12px; height: 12px; border-radius: 50%; border: 2px solid var(--color-primary); background: transparent; cursor: pointer; transition: all 0.3s;";
        if (i === 0) dot.style.background = "var(--color-primary)";

        dot.addEventListener("click", () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }

      testimonialSlider.appendChild(dotsContainer);

      function goToSlide(n) {
        slides[currentSlide].style.display = "none";
        currentSlide = n;
        slides[currentSlide].style.display = "block";

        // Update dots
        const dots = dotsContainer.querySelectorAll(".slider-dot");
        dots.forEach((dot, index) => {
          dot.style.background =
            index === currentSlide ? "var(--color-primary)" : "transparent";
        });
      }

      // Auto-advance slides
      setInterval(() => {
        goToSlide((currentSlide + 1) % totalSlides);
      }, 5000);
    }
  }

  // ===== LOAD MORE FUNCTIONALITY =====
  const loadMoreButtons = document.querySelectorAll("[data-load-more]");

  loadMoreButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetSelector = this.getAttribute("data-load-more");
      const hiddenItems = document.querySelectorAll(
        `${targetSelector} [data-hidden]`
      );

      // Show next batch of items (e.g., 3 items)
      for (let i = 0; i < 3 && i < hiddenItems.length; i++) {
        hiddenItems[i].removeAttribute("data-hidden");
        hiddenItems[i].style.display = "block";
        hiddenItems[i].classList.add("fade-in");
      }

      // Hide button if no more items
      const remainingHidden = document.querySelectorAll(
        `${targetSelector} [data-hidden]`
      );
      if (remainingHidden.length === 0) {
        this.style.display = "none";
      }
    });
  });

  // ===== PRICE CALCULATOR (for pricing page) =====
  const priceCalculator = document.querySelector("#price-calculator");

  if (priceCalculator) {
    const kitchenSize = priceCalculator.querySelector("#kitchen-size");
    const cabinetStyle = priceCalculator.querySelector("#cabinet-style");
    const countertop = priceCalculator.querySelector("#countertop");
    const estimatedPrice = priceCalculator.querySelector("#estimated-price");

    function calculatePrice() {
      let basePrice = 0;

      // Kitchen size
      if (kitchenSize) {
        const size = kitchenSize.value;
        if (size === "small") basePrice = 8000;
        else if (size === "medium") basePrice = 15000;
        else if (size === "large") basePrice = 25000;
        else if (size === "xlarge") basePrice = 40000;
      }

      // Cabinet style multiplier
      if (cabinetStyle) {
        const style = cabinetStyle.value;
        if (style === "modern") basePrice *= 1.2;
        else if (style === "traditional") basePrice *= 1.0;
        else if (style === "luxury") basePrice *= 1.5;
      }

      // Countertop addition
      if (countertop) {
        const top = countertop.value;
        if (top === "granite") basePrice += 2000;
        else if (top === "quartz") basePrice += 3500;
        else if (top === "marble") basePrice += 5000;
      }

      if (estimatedPrice && basePrice > 0) {
        estimatedPrice.textContent = `$${basePrice.toLocaleString()}`;
      }
    }

    // Add event listeners
    [kitchenSize, cabinetStyle, countertop].forEach((element) => {
      if (element) {
        element.addEventListener("change", calculatePrice);
      }
    });
  }

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.innerHTML = "↑";
  backToTop.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: var(--color-primary);
    color: var(--color-white);
    font-size: 1.5rem;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: var(--shadow-md);
    z-index: 999;
    transition: var(--transition);
  `;

  document.body.appendChild(backToTop);

  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      backToTop.style.display = "flex";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  backToTop.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
    this.style.boxShadow = "var(--shadow-lg)";
  });

  backToTop.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "var(--shadow-md)";
  });

  // ===== LAZY LOADING IMAGES =====
  const lazyImages = document.querySelectorAll("img[data-src]");

  if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.getAttribute("data-src");
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }

  // ===== COOKIE CONSENT (optional) =====
  const cookieConsent = localStorage.getItem("cookieConsent");

  if (!cookieConsent) {
    const consentBanner = document.createElement("div");
    consentBanner.className = "cookie-consent";
    consentBanner.style.cssText = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: var(--color-black);
      color: var(--color-white);
      padding: 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
      z-index: 9999;
      flex-wrap: wrap;
    `;

    consentBanner.innerHTML = `
      <p style="margin: 0; flex: 1; min-width: 200px;">
        We use cookies to improve your experience on our site. Review our
        <a href="cookie.html" style="color: var(--color-white); text-decoration: underline;">Cookie Policy</a>
        and choose your preference.
      </p>
      <div style="display: flex; gap: 0.75rem; flex-wrap: wrap; justify-content: flex-end;">
        <button class="btn btn-outline" onclick="declineCookies()" style="flex-shrink: 0;">
          Decline
        </button>
        <button class="btn btn-primary" onclick="acceptCookies()" style="flex-shrink: 0;">
          Accept
        </button>
      </div>
    `;

    document.body.appendChild(consentBanner);
  }
});

// ===== ACCEPT COOKIES FUNCTION =====
function acceptCookies() {
  localStorage.setItem("cookieConsent", "accepted");
  const banner = document.querySelector(".cookie-consent");
  if (banner) {
    banner.style.animation = "slideDown 0.3s ease reverse";
    setTimeout(() => banner.remove(), 300);
  }
}

// ===== DECLINE COOKIES FUNCTION =====
function declineCookies() {
  localStorage.setItem("cookieConsent", "declined");
  const banner = document.querySelector(".cookie-consent");
  if (banner) {
    banner.style.animation = "slideDown 0.3s ease reverse";
    setTimeout(() => banner.remove(), 300);
  }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format phone number
function formatPhoneNumber(phoneNumber) {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phoneNumber;
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

console.log("Kitchen Furniture Website - JavaScript Loaded Successfully");
