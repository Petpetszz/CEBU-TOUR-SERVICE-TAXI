document.addEventListener("DOMContentLoaded", function () {
    const announcements = [
        "🚖 Welcome to Cebu Tour Service Taxi! Book your ride now!",
        "🌴 Explore Cebu with our affordable tour packages!",
        "📞 Contact us for inquiries and bookings!"
    ];

    const announcementText = document.getElementById("announcementText");
    if (!announcementText) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        announcementText.textContent = announcements[0];
        return;
    }

    let index = 0;
    const speed = 50;
    const delayBetweenAnnouncements = 2000;

    function typeWriter(message, charIndex) {
        charIndex = charIndex || 0;
        if (charIndex < message.length) {
            announcementText.textContent += message.charAt(charIndex);
            setTimeout(function () {
                typeWriter(message, charIndex + 1);
            }, speed);
        } else {
            setTimeout(nextAnnouncement, delayBetweenAnnouncements);
        }
    }

    function nextAnnouncement() {
        index = (index + 1) % announcements.length;
        announcementText.textContent = "";
        typeWriter(announcements[index]);
    }

    typeWriter(announcements[index]);
});

// Navbar Shrink
window.addEventListener("scroll", function () {
    var navbar = document.querySelector(".navbar");
    if (!navbar) return;
    if (window.scrollY > 50) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

document.addEventListener("DOMContentLoaded", function () {
    /* Mobile nav: after collapse opens, keep menu in view (pairs with overflow-anchor:none in CSS). */
    var navCollapse = document.getElementById("navbarNav");
    if (!navCollapse) return;

    var mqMobileNav = window.matchMedia("(max-width: 991.98px)");

    navCollapse.addEventListener("shown.bs.collapse", function () {
        if (!mqMobileNav.matches) return;
        var rect = navCollapse.getBoundingClientRect();
        if (rect.top < 2) {
            navCollapse.scrollIntoView({ block: "nearest", behavior: "auto" });
        }
    });
});

// Customer reviews slideshow — stable height so the page does not jump when text length changes
function syncCustomerReviewsCarouselMinHeight() {
    var carousel = document.getElementById("customerReviewsCarousel");
    if (!carousel) return;
    var inner = carousel.querySelector(".carousel-inner");
    var items = carousel.querySelectorAll(".carousel-item");
    if (!inner || items.length === 0) return;

    var width = carousel.getBoundingClientRect().width;
    if (width < 40) {
        width = inner.offsetWidth || carousel.offsetWidth;
    }

    var maxH = 0;
    items.forEach(function (item) {
        var clone = item.cloneNode(true);
        clone.classList.remove(
            "carousel-item-next",
            "carousel-item-prev",
            "carousel-item-start",
            "carousel-item-end"
        );
        clone.classList.add("active");
        clone.style.cssText =
            "display:block;position:absolute;left:-99999px;top:0;width:" +
            width +
            "px;visibility:hidden;pointer-events:none;float:none;transform:none;margin:0;";
        document.body.appendChild(clone);
        var h = clone.offsetHeight;
        if (h > maxH) {
            maxH = h;
        }
        document.body.removeChild(clone);
    });

    if (maxH > 0) {
        inner.style.minHeight = Math.ceil(maxH) + "px";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    var reviewsEl = document.getElementById("customerReviewsCarousel");
    if (!reviewsEl || typeof bootstrap === "undefined" || !bootstrap.Carousel) {
        return;
    }
    var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    new bootstrap.Carousel(reviewsEl, {
        interval: prefersReducedMotion ? false : 5000,
        wrap: true,
        ride: prefersReducedMotion ? false : "carousel"
    });

    syncCustomerReviewsCarouselMinHeight();
    requestAnimationFrame(function () {
        syncCustomerReviewsCarouselMinHeight();
    });

    var resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(syncCustomerReviewsCarouselMinHeight, 150);
    });

    window.addEventListener("load", syncCustomerReviewsCarouselMinHeight);

    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(syncCustomerReviewsCarouselMinHeight);
    }
});

// Load more / show fewer testimonials (toggle when everything is visible)

document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial-card");
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (!loadMoreBtn || testimonials.length === 0) return;

    const visibleCount = 4;

    if (testimonials.length <= visibleCount) {
        loadMoreBtn.style.display = "none";
        return;
    }

    function hasHiddenReviews() {
        return Array.from(testimonials).some(function (t) {
            return t.style.display === "none";
        });
    }

    function syncReviewButton() {
        loadMoreBtn.textContent = hasHiddenReviews() ? "Load more reviews" : "Show fewer reviews";
        loadMoreBtn.setAttribute("aria-expanded", hasHiddenReviews() ? "false" : "true");
    }

    testimonials.forEach(function (testimonial, index) {
        if (index >= visibleCount) testimonial.style.display = "none";
    });
    syncReviewButton();

    loadMoreBtn.addEventListener("click", function () {
        if (hasHiddenReviews()) {
            var hiddenTestimonials = Array.from(testimonials).filter(function (t) {
                return t.style.display === "none";
            });
            hiddenTestimonials.slice(0, 4).forEach(function (t) {
                t.style.display = "flex";
                t.classList.add("testimonial-card--revealed");
            });
        } else {
            testimonials.forEach(function (t, index) {
                if (index >= visibleCount) {
                    t.style.display = "none";
                    t.classList.remove("testimonial-card--revealed");
                }
            });
        }
        syncReviewButton();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const fabRow = document.querySelector(".floating-contacts__fab-row");
    const toggleButton = document.querySelector(".floating-contacts .toggle-button");
    const contactOptions = document.querySelector(".contact-options");
    if (!toggleButton || !contactOptions) return;

    const chatIcon = toggleButton.querySelector(".fa-comment-dots");
    const closeIcon = toggleButton.querySelector(".fa-times");
    if (!chatIcon || !closeIcon) return;

    const trigger = fabRow || toggleButton;

    function syncFloatingContactsUi(open) {
        contactOptions.classList.toggle("show", open);
        trigger.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) {
            chatIcon.style.display = "none";
            closeIcon.style.display = "block";
            toggleButton.style.backgroundColor = "#dc3545";
        } else {
            chatIcon.style.display = "block";
            closeIcon.style.display = "none";
            toggleButton.style.backgroundColor = "#6c757d";
        }
    }

    function toggleFloatingContacts() {
        syncFloatingContactsUi(!contactOptions.classList.contains("show"));
    }

    trigger.addEventListener("click", toggleFloatingContacts);

    if (fabRow) {
        fabRow.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggleFloatingContacts();
            }
        });
    }

    syncFloatingContactsUi(false);
});

/** Tour package cards: obvious staggered reveal (AOS on grid columns is easy to miss). */
function initTourCardScrollReveals() {
    if (!document.body.classList.contains("home")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var wrap = document.querySelector("#tours .tour-cards-row");
    if (!wrap || wrap.getAttribute("data-reveal-init") === "1") return;
    wrap.setAttribute("data-reveal-init", "1");

    document.documentElement.classList.add("js-tour-reveal");

    var cards = wrap.querySelectorAll(".tour-card--scroll-reveal");
    if (cards.length === 0) return;

    var staggerMs = 95;
    var io = new IntersectionObserver(
        function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                if (el.classList.contains("is-revealed")) return;
                obs.unobserve(el);
                var i = parseInt(el.getAttribute("data-reveal-i") || "0", 10);
                el.style.transitionDelay = i * staggerMs + "ms";
                el.classList.add("is-revealed");
                window.setTimeout(function () {
                    el.style.transitionDelay = "";
                }, 1100 + i * staggerMs);
                if (typeof AOS !== "undefined") {
                    window.requestAnimationFrame(function () {
                        AOS.refresh();
                    });
                }
            });
        },
        { root: null, rootMargin: "0px 0px -7% 0px", threshold: 0.12 }
    );

    cards.forEach(function (c, i) {
        c.setAttribute("data-reveal-i", String(i));
        io.observe(c);
    });
}

// Animate On Scroll — sections only; tour grid uses initTourCardScrollReveals
document.addEventListener("DOMContentLoaded", function () {
    initTourCardScrollReveals();

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 780,
            easing: "ease-out-cubic",
            once: true,
            mirror: false,
            offset: 80,
            anchorPlacement: "top-bottom",
            disable: function () {
                return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            }
        });
        AOS.refresh();
    }
});

window.addEventListener("load", function () {
    if (typeof AOS !== "undefined") AOS.refresh();
});

// Material-style ripple on primary CTAs (skips reduced motion)
document.addEventListener("DOMContentLoaded", function () {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var rippleSelector =
        '.btn-cts-primary, .btn-cts-outline, .btn-cts-nav-cta, .btn-contact-wa, .contact-page-hero__book-btn, button[data-action="whatsapp"], button[data-action="email"]';
    document.querySelectorAll(rippleSelector).forEach(function (btn) {
        btn.classList.add("btn-ripple-host");
        btn.addEventListener(
            "click",
            function (ev) {
                if (ev.button !== 0) return;
                var rect = btn.getBoundingClientRect();
                var ripple = document.createElement("span");
                ripple.className = "ripple";
                var size = Math.max(rect.width, rect.height) * 2.4;
                ripple.style.width = ripple.style.height = size + "px";
                ripple.style.left = ev.clientX - rect.left - size / 2 + "px";
                ripple.style.top = ev.clientY - rect.top - size / 2 + "px";
                btn.appendChild(ripple);
                setTimeout(function () {
                    ripple.remove();
                }, 700);
            },
            { passive: true }
        );
    });
});

// Booking form (book.html): pre-fill tour from ?tour= slug, build WhatsApp / mailto payloads
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("bookingForm");
    if (!form) return;

    const tourSelect = document.getElementById("bookingTour");
    const vehicleSelect = document.getElementById("bookingVehicle");
    const vehicleBlock = document.getElementById("bookingVehicleBlock");
    const vehiclePriceEl = document.getElementById("bookingVehiclePrice");
    const params = new URLSearchParams(window.location.search);
    const tourParam = params.get("tour");
    if (tourParam && tourSelect) {
        const allowed = Array.from(tourSelect.options).some(function (o) {
            return o.value === tourParam;
        });
        if (allowed) tourSelect.value = tourParam;
    }
    const vehicleParam = params.get("vehicle");
    if (vehicleParam && vehicleSelect) {
        const okV = ["sedan", "suv", "van"].indexOf(vehicleParam) !== -1;
        if (okV) vehicleSelect.value = vehicleParam;
    }

    const whatsappNumber = "639993720079";

    function bookingTourDetail() {
        if (!tourSelect || !tourSelect.value) return null;
        return TOUR_DETAILS && TOUR_DETAILS[tourSelect.value] ? TOUR_DETAILS[tourSelect.value] : null;
    }

    function syncVehicleUI() {
        if (!vehicleSelect || !vehicleBlock) return;
        var d = bookingTourDetail();
        var hasPrices = !!(d && d.vehiclePrices);
        vehicleBlock.classList.toggle("d-none", !hasPrices);
        if (!hasPrices) {
            vehicleSelect.value = "";
            if (vehiclePriceEl) vehiclePriceEl.textContent = "";
            return;
        }
        if (!vehicleSelect.value || !d.vehiclePrices[vehicleSelect.value]) {
            var defaultVeh = d.vehiclePrices.sedan ? "sedan" : Object.keys(d.vehiclePrices)[0];
            vehicleSelect.value = defaultVeh || "";
        }
        if (vehiclePriceEl) {
            var v = vehicleSelect.value;
            if (v && d.vehiclePrices[v]) {
                var pretty = v.toUpperCase() === "SUV" ? "SUV" : v.charAt(0).toUpperCase() + v.slice(1);
                vehiclePriceEl.textContent =
                    pretty + " price: " + tourFmtPhp(d.vehiclePrices[v]) + " (private driver + fuel)";
            } else {
                vehiclePriceEl.textContent = "";
            }
        }
    }

    if (tourSelect) {
        tourSelect.addEventListener("change", syncVehicleUI);
    }
    if (vehicleSelect) {
        vehicleSelect.addEventListener("change", syncVehicleUI);
    }
    syncVehicleUI();

    function collectBookingText() {
        const data = new FormData(form);
        var tourLine = "";
        if (tourSelect && tourSelect.selectedIndex >= 0 && tourSelect.value) {
            tourLine = tourSelect.options[tourSelect.selectedIndex].text;
        } else {
            tourLine = String(data.get("tour") || "");
        }
        var isTransfer = tourSelect && tourSelect.value === "transfer";
        var vehicleLine = "";
        var vehiclePriceLine = "";
        if (!isTransfer && vehicleSelect && vehicleSelect.value) {
            var vi = vehicleSelect.selectedIndex;
            var vd = bookingTourDetail();
            var selectedPrice = vd && vd.vehiclePrices ? vd.vehiclePrices[vehicleSelect.value] : null;
            vehicleLine =
                "Vehicle: " +
                (vi >= 0 ? vehicleSelect.options[vi].text : vehicleSelect.value) +
                " (" +
                vehicleSelect.value +
                ")";
            if (selectedPrice) {
                vehiclePriceLine = "Vehicle price: " + tourFmtPhp(selectedPrice);
            }
        }
        const lines = [
            isTransfer
                ? "Hello! I would like to request a transfer booking."
                : "Hello! I would like to request a tour booking.",
            "",
            (isTransfer ? "Transfer / service: " : "Tour: ") + tourLine
        ];
        if (vehicleLine) {
            lines.push(vehicleLine);
        }
        if (vehiclePriceLine) {
            lines.push(vehiclePriceLine);
        }
        lines.push(
            "Preferred date: " + (data.get("date") || ""),
            "Preferred time: " + (data.get("time") || ""),
            "Passengers: " + (data.get("pax") || ""),
            "",
            "Name: " + (data.get("name") || ""),
            "Phone: " + (data.get("phone") || ""),
            "Email: " + (data.get("email") || ""),
            "Pickup / hotel: " + (data.get("pickup") || ""),
            "",
            "Notes / special requests:",
            (data.get("notes") || "").trim() || "(none)"
        );
        return lines.join("\n");
    }

    function buildWaOpenUrl(plainText) {
        var waBase = "https://wa.me/" + whatsappNumber + "?text=";
        var maxTotal = 2000;
        var tail =
            "\n\n(Message shortened for WhatsApp — send full notes by email if needed.)";
        function urlLen(msg) {
            return (waBase + encodeURIComponent(msg)).length;
        }
        if (urlLen(plainText) <= maxTotal) {
            return waBase + encodeURIComponent(plainText);
        }
        var lo = 0;
        var hi = plainText.length;
        var best = plainText.slice(0, Math.min(200, plainText.length)).trimEnd() + tail;
        while (lo <= hi) {
            var mid = (lo + hi) >> 1;
            var cand = plainText.slice(0, mid).trimEnd() + tail;
            if (urlLen(cand) <= maxTotal) {
                best = cand;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return waBase + encodeURIComponent(best);
    }

    function buildMailtoHref(subject, body) {
        var head =
            "mailto:info@cebutourservicetaxi.com?subject=" +
            encodeURIComponent(subject) +
            "&body=";
        var maxTotal = 1950;
        var tail = "\n\n(Trimmed for email length limits — we can follow up for details.)";
        function urlLen(b) {
            return (head + encodeURIComponent(b)).length;
        }
        if (urlLen(body) <= maxTotal) {
            return head + encodeURIComponent(body);
        }
        var lo = 0;
        var hi = body.length;
        var best = body.slice(0, Math.min(300, body.length)).trimEnd() + tail;
        while (lo <= hi) {
            var mid = (lo + hi) >> 1;
            var cand = body.slice(0, mid).trimEnd() + tail;
            if (urlLen(cand) <= maxTotal) {
                best = cand;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return head + encodeURIComponent(best);
    }

    var waBtn = form.querySelector('[data-action="whatsapp"]');
    if (waBtn) {
        waBtn.addEventListener("click", function () {
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            window.open(buildWaOpenUrl(collectBookingText()), "_blank", "noopener,noreferrer");
        });
    }

    var emailBtn = form.querySelector('[data-action="email"]');
    if (emailBtn) {
        emailBtn.addEventListener("click", function () {
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            var tourLabel = "Tour";
            if (tourSelect && tourSelect.selectedIndex >= 0) {
                tourLabel = tourSelect.options[tourSelect.selectedIndex].text;
            }
            var isTransferMail = tourSelect && tourSelect.value === "transfer";
            var subject = (isTransferMail ? "Transfer booking request: " : "Tour booking request: ") + tourLabel;
            var body = collectBookingText();
            window.location.href = buildMailtoHref(subject, body);
        });
    }
});

// Tour content for home cards + detail modal (shared)
var TOUR_DETAILS = {
        simala: {
            title: "Simala & Carcar lechon",
            priceLine: "Sedan ₱4,500 · SUV ₱5,500 · Van ₱7,000 (vehicle, fuel & driver)",
            vehiclePrices: { sedan: 4500, suv: 5500, van: 7000 },
            lead:
                "Private van, fuel, and driver for the day. Shrine and other entrance or parking fees are on guest account. Below is a typical full-day flow—your driver adjusts for traffic, weather, and your pace.",
            itinerary: [
                {
                    label: "Pick-up (Cebu / Mactan)",
                    text: "Meet your driver at the hotel or agreed point, quick briefing, then drive south toward Sibonga."
                },
                {
                    label: "Simala Shrine",
                    text: "Time at the hilltop church complex for photos and quiet visit. Modest dress; follow local guidelines."
                },
                {
                    label: "Carcar",
                    text: "Optional stop for lechon, snacks, or a short walk through the heritage town center."
                },
                {
                    label: "Return",
                    text: "Scenic drive back to your drop-off. Many groups plan roughly 8–10 hours door-to-door including stops."
                }
            ],
            notes: [
                "Bring small bills for entrance fees, snacks, and pasalubong.",
                "Weekends and holidays can be busy—an earlier start usually helps.",
                "You can tweak the order of stops with your driver when it is safe and practical."
            ],
            bookParam: "simala"
        },
        "whale-shark": {
            title: "Oslob whale shark · Tumalog Falls · Sumilon Island",
            priceLine: "Sedan ₱5,000 · SUV ₱6,000 · Van ₱7,500 (vehicle, fuel & driver)",
            vehiclePrices: { sedan: 5000, suv: 6000, van: 7500 },
            lead:
                "Private vehicle and driver for the round trip. Oslob activity fees, local briefing, optional snorkel rental, and add-ons (e.g. Tumalog Falls, Sumilon Island boat) are separate and paid according to local rules.",
            itinerary: [
                {
                    label: "Pre-dawn / early pick-up",
                    text: "Early departure from Metro Cebu or Mactan so you reach Oslob with time in the queue system used on the day of your visit."
                },
                {
                    label: "Oslob briefing & activity",
                    text: "Register on site, listen to safety and wildlife guidelines, then enjoy the guided water encounter (snorkel / view from boat per local operations)."
                },
                {
                    label: "Optional add-ons",
                    text: "If time and energy allow, your driver can help with Tumalog Falls, coastal viewpoints, or a Sumilon Island trip—extras on guest account."
                },
                {
                    label: "Return to hotel",
                    text: "Relaxing drive back to Cebu City or Mactan; arrival time depends on traffic and how long you stay in Oslob."
                }
            ],
            notes: [
                "Whale shark encounters are weather- and regulation-dependent; local authorities may change rules without notice.",
                "Bring dry clothes, reef-safe sunscreen where allowed, and cash for fees.",
                "This outline is flexible—confirm timing with your driver the day before."
            ],
            bookParam: "whale-shark"
        },
        safari: {
            title: "Cebu Safari & Adventure Park",
            priceLine: "Sedan ₱4,000 · SUV ₱5,000 · Van ₱7,000 (vehicle, fuel & driver)",
            vehiclePrices: { sedan: 4000, suv: 5000, van: 7000 },
            lead:
                "Private transfer with driver and fuel to northern Cebu. Park tickets, optional rides, and meals inside the park are purchased separately at the venue.",
            itinerary: [
                {
                    label: "Morning pick-up",
                    text: "Hotel pick-up and scenic upland drive toward the park entrance."
                },
                {
                    label: "Park day",
                    text: "Explore wildlife exhibits, shows, and attractions at your own pace following the park schedule."
                },
                {
                    label: "Lunch & breaks",
                    text: "Food courts or restaurants inside the park (guest account) whenever you want to pause."
                },
                {
                    label: "Return",
                    text: "Meet your driver at the agreed exit time for the drive back to your hotel or drop-off point."
                }
            ],
            notes: [
                "Check the park’s official hours and show timetable before your date.",
                "Comfortable shoes, hat, and water are recommended.",
                "Large bags may be restricted—pack light for security checks."
            ],
            bookParam: "safari"
        },
        canyoneering: {
            title: "Kawasan canyoneering / Moalboal Sardines Run",
            priceLine: "Sedan ₱5,000 · SUV ₱6,000 · Van ₱7,500 (vehicle, fuel & driver)",
            vehiclePrices: { sedan: 5000, suv: 6000, van: 7500 },
            lead:
                "Private transport for a combined south day: Kawasan canyoneering plus Moalboal sardines run. Local canyoneering guides, gear, environmental fees, boat hire, and marine fees are arranged and paid on site.",
            itinerary: [
                {
                    label: "Pick-up & drive south",
                    text: "Early start from your hotel toward Badian; travel time depends on traffic and your pick-up zone."
                },
                {
                    label: "Jump-off & safety briefing",
                    text: "Meet your accredited guide team, gear up (life vest, helmet, etc.), and review safety rules before entering the canyon."
                },
                {
                    label: "Canyoneering run",
                    text: "Guided jumps, swims, and walks through turquoise pools—pace follows the guide and group ability."
                },
                {
                    label: "Moalboal sardines run",
                    text: "Proceed to Moalboal coast for sardines and reef snorkeling when sea conditions and local rules allow."
                },
                {
                    label: "Finish & return",
                    text: "Change into dry clothes, light snack if you like, then private drive back to Cebu / Mactan."
                }
            ],
            notes: [
                "Moderate fitness is recommended; disclose health concerns to guides before starting.",
                "Protect phones with waterproof gear; follow guide instructions at all times.",
                "Boat, marine, and guide fees are separate and can vary by day and operator.",
                "Itinerary length varies by operator slot, traffic, and river/sea conditions."
            ],
            bookParam: "canyoneering"
        },
        "city-mountain": {
            title: "Cebu city & mountain tour",
            priceLine: "Sedan ₱4,500 · SUV ₱5,500 · Van ₱7,000 (vehicle, fuel & driver)",
            vehiclePrices: { sedan: 4500, suv: 5500, van: 7000 },
            lead:
                "Full-day private car or van with driver, fuel included. Below is a typical route guests request—order and timing flex with traffic, weather, and venue hours. Entrance fees and meals are on guest account unless quoted otherwise.",
            itinerary: [
                { label: "Magellan's Cross", text: "Historic cross pavilion and nearby basilica grounds." },
                { label: "Sto. Niño Church", text: "Major pilgrimage church; modest dress recommended." },
                { label: "Fort San Pedro", text: "Spanish-era fort and gardens." },
                { label: "Heritage Park", text: "Cebu heritage displays and walk-through." },
                { label: "Museo Sugbo", text: "Provincial museum in the former Carcel Street prison." },
                { label: "Taoist Temple", text: "Hillside temple with city views and short climb." },
                { label: "Lunch (optional)", text: "Meal break at a restaurant your driver can suggest." },
                { label: "Temple of Leah", text: "Roman-inspired monument and ridge-line views." },
                { label: "Sirao Garden", text: "Flower farm and garden photo stops when open." },
                { label: "Little Kyoto", text: "Japanese-themed garden area (subject to opening)." },
                { label: "Tops of Cebu", text: "Scenic overlook; snacks or drinks optional." },
                { label: "10,000 Roses", text: "LED rose field / café strip—hours vary by operator." }
            ],
            notes: [
                "Not every stop fits one day if you linger long—prioritize with your driver at pick-up.",
                "Mountain roads and viewpoints may close in bad weather; your driver will suggest swaps.",
                "Venue fees, parking, and meals are usually paid on site.",
                "Little Kyoto, Sirao, and 10,000 Roses schedules change—confirm same-day when possible."
            ],
            bookParam: "city-mountain"
        },
        pescador: {
            title: "Moalboal Sardines Run",
            priceLine: "Sedan ₱5,000 · SUV ₱6,000 · Van ₱7,500 (vehicle, fuel & driver)",
            vehiclePrices: { sedan: 5000, suv: 6000, van: 7500 },
            lead:
                "Private land transfer to Moalboal area. Boat hire, marine fees, snorkel gear, and coastal snorkeling (including the famous sardine run) are coordinated with local boatmen and paid separately.",
            itinerary: [
                {
                    label: "Early pick-up",
                    text: "Long drive from Cebu City / Mactan toward Moalboal; early start helps for sea conditions and boat schedules."
                },
                {
                    label: "Coastal / boat briefing",
                    text: "Meet your boat team, life jackets on, and short safety talk before heading out along the Moalboal coast for the sardine run and nearby reefs (Pescador Island and other spots when conditions allow)."
                },
                {
                    label: "Snorkel & sardine run",
                    text: "In-water time at the sardine shoal and reef areas subject to weather, currents, and local rules for the day."
                },
                {
                    label: "Return transfer",
                    text: "Rinse off, change clothes, then drive back to your hotel or agreed drop-off."
                }
            ],
            notes: [
                "Marine activities are never guaranteed—rough seas can cancel or shorten water time.",
                "Reef-safe practices help protect corals; avoid standing on shallow rock or coral.",
                "Bring towels, sun protection, and cash for boat and marine fees."
            ],
            bookParam: "pescador"
        }
};

function tourFmtPhp(n) {
    return "₱" + Number(n).toLocaleString("en-PH");
}

function tourBookingHref(tourParam, vehicle) {
    var href = "book.html?tour=" + encodeURIComponent(tourParam);
    if (vehicle) {
        href += "&vehicle=" + encodeURIComponent(vehicle);
    }
    return href;
}

var TOUR_VEHICLE_META = {
    sedan: { label: "Sedan", image: "images/vios1.webp" },
    suv: { label: "SUV", image: "images/vios2.webp" },
    van: { label: "Van", image: "images/vios3.webp" }
};

/** Vehicle radios + preview inside #tourDetailModal (not on grid cards). */
function mountTourDetailVehicleUI(wrapEl, mountEl, d, bookA) {
    if (!wrapEl || !mountEl) {
        return;
    }
    while (mountEl.firstChild) {
        mountEl.removeChild(mountEl.firstChild);
    }
    if (!d || !d.vehiclePrices) {
        wrapEl.classList.add("d-none");
        if (bookA) {
            bookA.href = "book.html?tour=" + encodeURIComponent(d.bookParam);
        }
        return;
    }
    wrapEl.classList.remove("d-none");

    var keys = ["sedan", "suv", "van"];
    var namePrefix = "veh-modal";

    var group = document.createElement("div");
    group.className = "tour-detail-modal__vehicle-options";
    group.setAttribute("role", "radiogroup");
    group.setAttribute("aria-label", "Vehicle type and price");

    var preview = document.createElement("div");
    preview.className = "tour-detail-modal__vehicle-preview";
    var img = document.createElement("img");
    img.className = "tour-detail-modal__vehicle-preview-img";
    img.decoding = "async";
    img.loading = "lazy";
    img.alt = "";
    preview.appendChild(img);

    var caption = document.createElement("p");
    caption.className = "tour-detail-modal__vehicle-caption small text-muted mb-0";

    function applyVehicle(veh) {
        var meta = TOUR_VEHICLE_META[veh];
        if (!meta || !d.vehiclePrices[veh]) {
            return;
        }
        img.src = meta.image;
        img.alt = meta.label + " — sample vehicle";
        caption.textContent =
            "Selected: " + meta.label + " — " + tourFmtPhp(d.vehiclePrices[veh]) + " · vehicle, fuel & driver";
        if (bookA) {
            bookA.setAttribute("href", tourBookingHref(d.bookParam, veh));
        }
        group.querySelectorAll(".tour-detail-modal__vehicle-opt").forEach(function (lab) {
            var inp = lab.querySelector("input");
            lab.classList.toggle("is-selected", inp && inp.value === veh);
        });
    }

    keys.forEach(function (key, idx) {
        var meta = TOUR_VEHICLE_META[key];
        var lab = document.createElement("label");
        lab.className = "tour-detail-modal__vehicle-opt";
        var inp = document.createElement("input");
        inp.type = "radio";
        inp.name = namePrefix;
        inp.value = key;
        inp.className = "tour-detail-modal__vehicle-input visually-hidden";
        if (idx === 0) {
            inp.checked = true;
        }
        var ui = document.createElement("span");
        ui.className = "tour-detail-modal__vehicle-opt-ui";
        var l1 = document.createElement("span");
        l1.className = "tour-detail-modal__vehicle-opt-label";
        l1.textContent = meta.label;
        var l2 = document.createElement("span");
        l2.className = "tour-detail-modal__vehicle-opt-price";
        l2.textContent = tourFmtPhp(d.vehiclePrices[key]);
        ui.appendChild(l1);
        ui.appendChild(l2);
        lab.appendChild(inp);
        lab.appendChild(ui);
        group.appendChild(lab);
    });

    group.addEventListener("change", function (e) {
        var t = e.target;
        if (t && t.name === namePrefix && t.checked) {
            applyVehicle(t.value);
        }
    });

    mountEl.appendChild(group);
    mountEl.appendChild(preview);
    mountEl.appendChild(caption);

    var first = keys[0];
    var checkedInp = group.querySelector("input[name='" + namePrefix + "']:checked");
    applyVehicle((checkedInp && checkedInp.value) || first);
}

// Home — tour details modal (#tourDetailModal)
document.addEventListener("DOMContentLoaded", function () {
    var toursSection = document.getElementById("tours");
    var modalEl = document.getElementById("tourDetailModal");
    if (!modalEl || typeof bootstrap === "undefined" || !bootstrap.Modal) {
        return;
    }

    var titleEl = document.getElementById("tourDetailModalTitle");
    var priceEl = modalEl.querySelector(".tour-detail-modal__price");
    var leadEl = modalEl.querySelector(".tour-detail-modal__lead");
    var vehicleWrap = modalEl.querySelector(".tour-detail-modal__vehicle-wrap");
    var vehicleMount = modalEl.querySelector(".tour-detail-modal__vehicle-mount");
    var ol = modalEl.querySelector(".tour-detail-modal__itinerary");
    var notesUl = modalEl.querySelector(".tour-detail-modal__notes");
    var bookA = modalEl.querySelector(".tour-detail-modal__book");

    function clearList(el) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    }

    function openTourDetail(tourId) {
        var d = TOUR_DETAILS[tourId];
        if (!d || !titleEl || !ol) {
            return;
        }

        titleEl.textContent = d.title;
        if (priceEl) {
            priceEl.textContent = d.priceLine;
        }
        if (leadEl) {
            leadEl.textContent = d.lead;
        }

        mountTourDetailVehicleUI(vehicleWrap, vehicleMount, d, bookA);

        clearList(ol);
        d.itinerary.forEach(function (step) {
            var li = document.createElement("li");
            li.className = "tour-detail-modal__step";
            var strong = document.createElement("strong");
            strong.textContent = step.label;
            li.appendChild(strong);
            if (step.text) {
                var p = document.createElement("p");
                p.className = "mb-0 small text-muted";
                p.textContent = step.text;
                li.appendChild(p);
            }
            ol.appendChild(li);
        });

        if (notesUl) {
            clearList(notesUl);
            d.notes.forEach(function (note) {
                var li = document.createElement("li");
                li.textContent = note;
                notesUl.appendChild(li);
            });
        }

        var inst = bootstrap.Modal.getOrCreateInstance(modalEl);
        inst.show();
    }

    if (toursSection) {
        toursSection.addEventListener("click", function (e) {
            var detailsBtn = e.target.closest(".tour-card__details-btn");
            if (!detailsBtn) {
                return;
            }
            var btnTour = detailsBtn.getAttribute("data-tour-id");
            if (btnTour) {
                openTourDetail(btnTour);
            }
        });
    }
});

// Guest gallery — infinite horizontal marquee (add paths to GUEST_GALLERY_IMAGES)
var GUEST_GALLERY_IMAGES = [
    "images/guest1.jpg",
    "images/guest2.jpg",
    "images/guest3.jpg",
    "images/guest4.jpg",
    "images/guest5.jpg",
    "images/guest6.jpg",
    "images/guest7.jpg",
    "images/guest8.jpg",
    "images/guest9.jpg",
    "images/guest10.jpg",
    "images/guest11.jpg",
    "images/guest12.jpg",
    "images/guest13.jpg",
    "images/guest14.jpg",
    "images/guest15.jpg",
    "images/guest16.jpg",
    "images/guest17.jpg"
];

function initGuestGalleryMarquee() {
    var track = document.getElementById("guestGalleryTrack");
    if (!track || GUEST_GALLERY_IMAGES.length === 0) {
        return;
    }

    function appendFigures(paths, parent) {
        paths.forEach(function (src) {
            var fig = document.createElement("figure");
            fig.className = "guest-gallery__cell guest-gallery__cell--marquee mb-0";
            var img = document.createElement("img");
            img.src = src;
            img.alt = "";
            img.setAttribute("role", "presentation");
            /* Eager: duplicate strip is mostly “off-screen”; lazy can delay loads and break marquee pacing */
            img.loading = "eager";
            img.decoding = "auto";
            img.width = 400;
            img.height = 400;
            img.addEventListener(
                "error",
                function () {
                    if (fig.parentNode) {
                        fig.parentNode.removeChild(fig);
                    }
                    onImgOrLayout();
                },
                { once: true }
            );
            fig.appendChild(img);
            parent.appendChild(fig);
        });
    }

    track.innerHTML = "";
    track.classList.remove("guest-gallery__track--reduced");

    var viewport = track.closest(".guest-gallery__viewport");
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
        appendFigures(GUEST_GALLERY_IMAGES, track);
        track.classList.add("guest-gallery__track--reduced");
        if (viewport) {
            viewport.classList.add("guest-gallery__viewport--reduced");
        }
        return;
    }

    var setA = document.createElement("div");
    setA.className = "guest-gallery__set";
    var setB = document.createElement("div");
    setB.className = "guest-gallery__set";
    appendFigures(GUEST_GALLERY_IMAGES, setA);
    appendFigures(GUEST_GALLERY_IMAGES, setB);
    track.appendChild(setA);
    track.appendChild(setB);

    function ensureMarqueeCoversViewport() {
        var vp = track.closest(".guest-gallery__viewport");
        if (!vp || !setA.parentNode || !setB.parentNode) {
            return;
        }
        var stride = setB.offsetLeft;
        if (!stride || stride < 2) {
            return;
        }
        /* If one copy is shorter than the viewport, two sets leave empty space on the right — add more copies of the same strip */
        var need = vp.clientWidth + stride + 48;
        var guard = 0;
        while (track.scrollWidth < need && guard < 14) {
            track.appendChild(setA.cloneNode(true));
            guard++;
        }
    }

    function syncMarqueeLoopPx() {
        if (!setA || !setB) {
            return;
        }
        /* One full “1→N” stride = width of first set + flex gap before second set (not total track / 2) */
        var loopPx = setB.offsetLeft;
        if (!loopPx || loopPx < 2) {
            var w = setA.offsetWidth;
            var gStr = getComputedStyle(track).gap || "0";
            var g = parseFloat(gStr);
            if (!isFinite(g) || g < 0) {
                g = 0;
            }
            if (w > 0) {
                loopPx = w + g;
            }
        }
        if (loopPx >= 2) {
            track.style.setProperty("--guest-marquee-shift", loopPx + "px");
        }
        ensureMarqueeCoversViewport();
    }

    var ro;
    if (typeof ResizeObserver !== "undefined") {
        ro = new ResizeObserver(function () {
            requestAnimationFrame(syncMarqueeLoopPx);
        });
        ro.observe(track);
        ro.observe(setA);
        ro.observe(setB);
    }

    function onImgOrLayout() {
        requestAnimationFrame(syncMarqueeLoopPx);
    }

    track.querySelectorAll("img").forEach(function (im) {
        if (im.complete) {
            return;
        }
        im.addEventListener("load", onImgOrLayout, { passive: true });
    });

    window.addEventListener(
        "load",
        function () {
            /* Some browsers leave a “blank tile” without firing error on undecodable frames */
            track.querySelectorAll("img").forEach(function (im) {
                if (im.naturalWidth < 1) {
                    var deadFig = im.closest("figure");
                    if (deadFig && deadFig.parentNode) {
                        deadFig.parentNode.removeChild(deadFig);
                    }
                }
            });
            onImgOrLayout();
        },
        { passive: true }
    );
    requestAnimationFrame(function () {
        requestAnimationFrame(syncMarqueeLoopPx);
    });

    var seconds = Math.min(85, Math.max(24, Math.round(GUEST_GALLERY_IMAGES.length * 3.5)));
    track.style.setProperty("--guest-marquee-sec", seconds + "s");
}

document.addEventListener("DOMContentLoaded", function () {
    initGuestGalleryMarquee();
});


