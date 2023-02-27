// Variable initialization
let isMobile = false;
let scrollPoint1;
let scrollPoint2;

// Components initialization
const site = document.querySelector('html');
let page;
let blackout;
let intro;
let introHeight;

let header;
let hMenuBtn;

let mobile;
let mMenuBtn;
let mMenuNavigation;
let mMenuLinks;

// Device client size initialization
const windowHeight = document.documentElement.clientHeight;
const windowWidth = document.documentElement.clientWidth;
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

// Device definition
deviceType.any() || windowWidth <= 767 ? isMobile = true : isMobile = false;

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

// Main functionallity
document.addEventListener("DOMContentLoaded", () => {

	// All components
	if (document.querySelector('.page')) {
		page = document.querySelector('.page');
	};
	if (document.querySelector('.blackout')) {
		blackout = document.querySelector('.blackout');
	};
	if (document.querySelector('.intro')) {
		intro = document.querySelector('.intro');
		introHeight = getComputedStyle(intro).height;
	};
	if (document.querySelector('.header')) {
		header = document.querySelector('.header');
		hMenuBtn = header.querySelector('.header__mobile');
	};
	if (document.querySelector('.mobile')) {
		mobile = document.querySelector('.mobile');
		mMenuBtn = mobile.querySelector('.mobile__button');
		mMenuNavigation = mobile.querySelector('.mobile__nav-body');
		mMenuLinks = mobile.querySelectorAll('.mobile__item');
	};
	if (document.querySelectorAll('.modal')) {
		if (isMobile === true) {
			$("#modal").iziModal({
				width: 600,
				borderBottom: true,
				padding: 20,
				radius: 20,
				zindex: 100,
				transitionIn: 'fadeInUp',
				transitionOut: 'fadeOutDown'
			});
			$("#license").iziModal({
				width: 600,
				borderBottom: true,
				padding: 20,
				zindex: 100,
				transitionIn: 'fadeInUp',
				transitionOut: 'fadeOutDown'
			});
			$("#components").iziModal({
				width: 600,
				borderBottom: true,
				padding: 20,
				zindex: 100,
				transitionIn: 'fadeInUp',
				transitionOut: 'fadeOutDown'
			});
		} else {
			$("#modal").iziModal({
				width: 600,
				borderBottom: true,
				padding: 30,
				radius: 20,
				zindex: 100,
				transitionIn: 'fadeInUp',
				transitionOut: 'fadeOutDown'
			});
			$("#license").iziModal({
				width: 600,
				borderBottom: true,
				padding: 30,
				zindex: 100,
				transitionIn: 'fadeInUp',
				transitionOut: 'fadeOutDown'
			});

			$("#components").iziModal({
				width: 600,
				borderBottom: true,
				padding: 20,
				radius: 20,
				zindex: 100,
				transitionIn: 'fadeInUp',
				transitionOut: 'fadeOutDown'
			});
		};
		$(document).on('click', '.btn-modal', function (event) {
			event.preventDefault();
			$('#modal').iziModal('open');
		});
		$(document).on('click', '.btn-license', function (event) {
			event.preventDefault();
			$('#license').iziModal('open');
		});
		$(document).on('click', '.btn-components', function (event) {
			event.preventDefault();
			$('#components').iziModal('open');
		});
	};

	// Header + mobile + blackout
	if (header) {
		// Set state on window load
		if (window.pageYOffset > 50) add(header, 'theme-dark');
		if (window.pageYOffset > introHeight.slice(0, -2)) add(header, 'theme-light');

		// Change state on scroll
		window.addEventListener("scroll", () => {
			scrollPoint1 = 50;
			introHeight = getComputedStyle(intro).height;

			if (isMobile === true) {
				scrollPoint2 = Math.round(introHeight.slice(0, -2)) - 100;
			} else {
				scrollPoint2 = Math.round(introHeight.slice(0, -2)) - 75;
			}

			let scroll = Math.round(window.pageYOffset);
			scroll >= scrollPoint1 ? add(header, 'theme-dark') : rem(header, 'theme-dark');
			scroll >= scrollPoint2 ? add(header, 'theme-light') : rem(header, 'theme-light');

			scroll >= scrollPoint2 ? add(site, 'theme-light') : rem(site, 'theme-light');
		});
	};
	if (mobile) {
		// Open mobile menu from header
		hMenuBtn.addEventListener('click', function (e) {
			e.preventDefault();

			add(page, 'lock');
			add(mobile, 'open');
		});

		// On mobile button click
		mMenuBtn.addEventListener('click', function (e) {
			e.preventDefault();

			rem(page, 'lock');
			rem(mobile, 'open');

			mMenuLinks.forEach((link) => {
				rem(link, 'active');
			});
		});

		// On menu catalog click
		mMenuNavigation.addEventListener('click', function (e) {
			let target = e.target;

			if (target.classList.contains('mobile__item_type-category')) {
				if (!target.classList.contains('open')) {
					for (let i = 0; i < mMenuLinks.length; i++) {
						rem(mMenuLinks[i], 'open');
					}
					add(target, 'open');
				}
				else {
					for (let i = 0; i < mMenuLinks.length; i++) {
						rem(mMenuLinks[i], 'open');
					}
				}
			};
		});
	};
	if (blackout && mobile) {
		blackout.addEventListener('click', function (e) {
			e.preventDefault();

			rem(page, 'lock');
			rem(mobile, 'open');

			mMenuLinks.forEach((link) => {
				rem(link, 'active');
			});
		});
	};

	// Page navigation
	if (document.querySelectorAll('.scr-list')) {
		const getSectionId = (link) => link.getAttribute('href').replace('#', '');
		const navLists = document.querySelectorAll('.scr-list');

		navLists.forEach(
			(lists) => lists.addEventListener('click', (event) => {
				if (event.target.classList.contains('scr-link')) {
					event.preventDefault();
					if (isMobile === true) {
						rem(page, 'lock');
						rem(mobile, 'open');

						window.scrollTo({
							top: document.getElementById(getSectionId(event.target)).offsetTop - 30,
							behavior: 'smooth',
						});
					} else {
						window.scrollTo({
							top: document.getElementById(getSectionId(event.target)).offsetTop - 40,
							behavior: 'smooth',
						});
					};
				}
			}),
		);
	};

	// Commerce props show/hide
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