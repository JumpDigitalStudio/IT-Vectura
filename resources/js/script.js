window.onload = function () {

	document.body.classList.add('loaded-hiding');

	window.setTimeout(function () {
		document.body.classList.add('loaded');
		document.body.classList.remove('loaded-hiding');
	}, 500);
};

// const scroll = new LocomotiveScroll({
// 	el: document.querySelector('.page'),
// 	smooth: true,
// 	tablet: { smooth: true },
// 	smartphone: { smooth: true },
// });

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

	// Navigation
	if (document.querySelectorAll('.scr-list')) {
		const getSectionId = (link) => link.getAttribute('href').replace('#', '');

		const navLists = document.querySelectorAll('.scr-list');

		navLists.forEach(
			(lists) => lists.addEventListener('click', (event) => {

				if (event.target.classList.contains('scr-link')) {
					event.preventDefault();

					window.scrollTo({
						top: document.getElementById(getSectionId(event.target)).offsetTop - 50,
						behavior: 'smooth',
					});
				}
			}),
		);
	};

	if (document.querySelector('.mod')) {
		$("#request-modal").iziModal({
			width: 675,
			padding: 30,
			radius: 20,
			zindex: 100,
			focusInput: true,
			closeOnEscape: true,
			overlayColor: 'rgba(0, 0, 0, 0.53)',
			transitionIn: 'fadeInDown',
			transitionOut: 'fadeOutDown',
		});

		$("#licensing-modal").iziModal({
			width: 700,
			top: 20,
			bottom: 20,
			padding: 30,
			radius: 20,
			zindex: 100,
			focusInput: true,
			closeOnEscape: true,
			overlayColor: 'rgba(0, 0, 0, 0.53)',
			transitionIn: 'fadeInDown',
			transitionOut: 'fadeOutDown',
		});

		// Modal
		$(document).on('click', '.req-btn', function (event) {
			event.preventDefault();
			$('#request-modal').iziModal('open');
		});

		$(document).on('click', '.lic-btn', function (event) {
			event.preventDefault();
			$('#licensing-modal').iziModal('open');
		});
	};

	if (document.querySelector('.intro')) {
		const intro = document.querySelector('.intro');
		introHeight = getComputedStyle(intro).height;
	};

	if (document.querySelector('.page__header')) {
		const header = document.querySelector('.page__header');

		let scrollPoint1 = 100;
		let scrollPoint2;

		window.addEventListener("scroll", () => {

			let windowScroll = window.pageYOffset;
			let scroll = Math.round(windowScroll);

			scrollPoint2 = Math.round(introHeight.slice(0, -2)) - 100;

			scroll >= scrollPoint1 ? add(header, 'stick-dark') : rem(header, 'stick-dark');
			scroll >= scrollPoint2 ? add(header, 'stick-light') : rem(header, 'stick-light');
		});

		if (window.pageYOffset > 100) {
			add(header, 'stick-dark');
		}
		if (window.pageYOffset > introHeight.slice(0, -2)) {
			add(header, 'stick-light');
		}
	};

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