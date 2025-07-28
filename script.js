document.addEventListener("DOMContentLoaded", () => {
	const setupScrollAnimation = (selector, threshold = 0.1) => {
		const elements = document.querySelectorAll(selector);

		if (elements.length === 0) {
			return; 
		}

		const observer = new IntersectionObserver(
			(entries, observerInstance) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("is-visible");
						observerInstance.unobserve(entry.target); 
					}
				});
			},
			{ threshold: threshold }
		);

		elements.forEach((el) => observer.observe(el));
	};
	const setupLottieAnimationControl = (lottiePlayerId, threshold = 0.5) => {
		const lottiePlayer = document.getElementById(lottiePlayerId);

		if (!lottiePlayer) {
			return; 
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					// Pastikan elemen adalah Lottie player dan memiliki metode yang dibutuhkan
					if (entry.target.tagName === 'LOTTIE-PLAYER') {
						if (entry.isIntersecting) {
							// Putar animasi saat masuk viewport
							if (typeof entry.target.play === 'function') {
								entry.target.play();
								// console.log(`Playing Lottie: ${lottiePlayerId}`);
							}
						} else {
							// Hentikan animasi saat keluar viewport
							// Ini penting untuk performa, terutama jika Lottie tidak autoplay.
							if (typeof entry.target.stop === 'function') {
								entry.target.stop();
								// console.log(`Stopping Lottie: ${lottiePlayerId}`);
							}
						}
					}
				});
			},
			{ threshold: threshold } // Pemicu saat X% Lottie terlihat
		);
		observer.observe(lottiePlayer);
	};
	const cards = document.querySelectorAll(".card");
	const cardObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("card-visible");
					cardObserver.unobserve(entry.target); // Hanya animasikan sekali
				}
			});
		},
		{ threshold: 0.3 } 
	);
	cards.forEach((card) => cardObserver.observe(card));
	setupScrollAnimation(".content-section.scroll-anim-target", 0.1);
	setupLottieAnimationControl("lottie-animation-mobile", 0.7);
	setupLottieAnimationControl("lottie-animation-web", 0.7);
	setupLottieAnimationControl("lottie-animation-team", 0.7);
	const heroLottie = document.getElementById("lottie-animation");
	if (heroLottie && typeof heroLottie.play === 'function') {
		heroLottie.play();
	}

    // Hide loading overlay
    const loadingOverlay = document.getElementById("loading-overlay");
    // Add the animationDuration constant as requested
    const animationDuration = 5000; // 5 seconds

    if (loadingOverlay) {
        // Delay hiding the overlay by animationDuration
        setTimeout(() => {
            loadingOverlay.classList.add("hidden");
            // Optional: Remove the element from DOM after transition to free up resources
            loadingOverlay.addEventListener('transitionend', () => {
                loadingOverlay.remove();
            });
        }, animationDuration);
    }
});