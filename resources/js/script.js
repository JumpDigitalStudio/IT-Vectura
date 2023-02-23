// Variable initialization
const page = document.querySelector('.page');
const mobile = page.querySelector('.mobile');
let isMobile;

// Client size initialization
const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;

// Device definition
const deviceType = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	BlackBerry: function () {
		return navigator.userAgent.match(/BlackBerry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i);
	},
	any: function () {
		return (
			deviceType.Android() ||
			deviceType.BlackBerry() ||
			deviceType.iOS() ||
			deviceType.Opera() ||
			deviceType.Windows()
		);
	}
};

// Device setting
if (deviceType.any() || windowWidth <= 767) {
	isMobile = true;
}
else {
	isMobile = false;
};

// Preloader
window.addEventListener("load", () => {
	document.body.classList.add('loaded-hiding');

	window.setTimeout(function () {
		document.body.classList.add('loaded');
		document.body.classList.remove('loaded-hiding');
	}, 500);
});

// Main functionallity
document.addEventListener("DOMContentLoaded", () => {

	// Functions
	function add(elem, modifier) {
		elem.classList.add(modifier);
	};
	function rem(elem, modifier) {
		elem.classList.remove(modifier);
	};
	function tog(elem, modifier) {
		elem.classList.toggle(modifier);
	};

	$("#modal").iziModal({
		width: 600,
		borderBottom: true,
		padding: 30,
		radius: 20,
		zindex: 100,
	});

	$("#license").iziModal({
		width: 600,
		borderBottom: true,
		padding: 30,
		radius: 20,
		zindex: 100,
	});

	$(document).on('click', '.btn-modal', function (event) {
		event.preventDefault();
		$('#modal').iziModal('open');
	});

	$(document).on('click', '.btn-license', function (event) {
		event.preventDefault();
		$('#license').iziModal('open');
	});

	if (document.querySelector('.page__header')) {
		const header = document.querySelector('.page__header');
		const hMenuBtn = header.querySelector('.header__mobile-menu');

		window.addEventListener("scroll", () => {

			let windowScroll = window.pageYOffset;
			let scroll = Math.round(windowScroll);

			const intro = document.querySelector('.intro');
			introHeight = getComputedStyle(intro).height;

			let scrollPoint1 = 50;
			let scrollPoint2 = Math.round(introHeight.slice(0, -2)) - 80;

			scroll >= scrollPoint1 ? add(header, 'stick-dark') : rem(header, 'stick-dark');
			scroll >= scrollPoint2 ? add(header, 'stick-light') : rem(header, 'stick-light');
		});

		if (window.pageYOffset > 100) {
			add(header, 'stick-dark');
		}
		const intro = document.querySelector('.intro');
		introHeight = getComputedStyle(intro).height;
		if (window.pageYOffset > introHeight.slice(0, -2)) {
			add(header, 'stick-light');
		}

		// Mobile functions
		if (page.querySelector('.mobile')) {
			// Mobile menu and components
			const mMenuBtn = mobile.querySelector('.mobile__button');
			const mMenu = mobile.querySelector('.mobile__nav-list');
			const mMenuLinks = mobile.querySelectorAll('.mobile__nav-li');

			// On header button click
			hMenuBtn.addEventListener('click', function (e) {
				e.preventDefault();

				add(page, 'lock');
				add(mobile, 'active');
			});

			// On mobile button click
			mMenuBtn.addEventListener('click', function (e) {
				e.preventDefault();

				rem(page, 'lock');
				rem(mobile, 'active');

				mMenuLinks.forEach((link) => {
					rem(link, 'active');
				});
			});

			// On menu element click
			mMenu.addEventListener('click', function (e) {
				let target = e.target;

				if (target.classList.contains('mobile__nav-li')) {
					if (!target.classList.contains('active')) {
						for (let i = 0; i < mMenuLinks.length; i++) {
							rem(mMenuLinks[i], 'active');
						}
						add(target, 'active');
					}
					else {
						for (let i = 0; i < mMenuLinks.length; i++) {
							rem(mMenuLinks[i], 'active');
						}
					}
				}
			});

			// Функции оверлея
			if (page.querySelector('.blackout')) {
				const blackout = page.querySelector('.blackout');

				blackout.addEventListener('click', function (e) {
					e.preventDefault();

					rem(page, 'lock');
					rem(mobile, 'active');

					mMenuLinks.forEach((link) => {
						rem(link, 'active');
					});
				});
			}
		};
	};

	// Navigation
	if (document.querySelectorAll('.scr-list')) {
		const getSectionId = (link) => link.getAttribute('href').replace('#', '');

		const navLists = document.querySelectorAll('.scr-list');

		navLists.forEach(
			(lists) => lists.addEventListener('click', (event) => {

				if (event.target.classList.contains('scr-link')) {
					event.preventDefault();

					if (isMobile === true) {
						rem(page, 'lock');
						rem(mobile, 'active');

						window.scrollTo({
							top: document.getElementById(getSectionId(event.target)).offsetTop - 40,
							behavior: 'smooth',
						});
					} else {
						window.scrollTo({
							top: document.getElementById(getSectionId(event.target)).offsetTop - 70,
							behavior: 'smooth',
						});
					}
				}
			}),
		);
	};

	// Props open
	if (document.querySelector('.props__button')) {
		// Start on page load
		$('.props__main').slideToggle(300);

		// Onclick
		$(".props__button").click(function () {
			$('.props').toggleClass('prop-open');
			$('.props__main').slideToggle(300);
		});
	};
});