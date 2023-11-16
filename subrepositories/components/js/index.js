
/********************
 *      NAVBAR      *
 ********************/
const navbar = document.getElementById('navbar');
const navbarItems = document.querySelectorAll('.navbar__menu li');
const navbarHamburger = document.getElementById('navbar-hamburger');
const navbarLogo = document.querySelector('.navbar__logo');


// Clicking menu element
function handleMenuItemClick(event) {
    // remove 'active' class from all menu items
    navbarItems.forEach((item) => {
        item.classList.remove('active');
    });

    // add 'active' class to the parent <li> of the clicked menu item
    event.target.closest('li').classList.add('active');

    // mobile: close the navbar after clicking on a menu item
    if ( window.innerWidth <= 991 ) {
        navbar.classList.remove('open');
    }
}


// Attach click event listener to each menu item
navbarItems.forEach((item) => {
    item.addEventListener('click', handleMenuItemClick);
});


// Mobile: open/close menu
navbarHamburger.addEventListener('click', function() {
    if ( navbar.classList.contains('open') ) {
        navbar.classList.remove('open');
    } else {
        navbar.classList.add('open');
    }
});


// Mobile: close menu when clicking on navbar logo
navbarLogo.addEventListener('click', function() {
    if ( window.innerWidth <= 991 ) {
      navbar.classList.remove('open');
    }

    // remove 'active' class from all menu items
    navbarItems.forEach((item) => {
        item.classList.remove('active');
    });
});


// Mobile: close menu on window resize
window.addEventListener('resize', function() {
    if ( window.innerWidth > 991 ) {
        navbar.classList.remove('open');
    }
});


// Wait until content has loaded
document.addEventListener('DOMContentLoaded', function() {

    // Show the navigation bar
    const navbar = document.getElementById("navbar");
    navbar.style.display = "block";


    // Check if there is an anchor in the URL when the page loads
    const url = window.location.href;
    const anchorIndex = url.indexOf('#');

    if ( anchorIndex !== -1 ) {
      const anchor = url.slice(anchorIndex); // Get the anchor part of the URL
      const targetItem = document.querySelector(`.navbar__menu li a[href="${anchor}"]`);
      
      if ( targetItem ) {
        targetItem.closest('li').classList.add('active');
      }
    } else {
        const firstElement = document.querySelectorAll('.navbar__menu li')[0];
        firstElement.classList.add('active');
        history.replaceState(null, null, firstElement.querySelector('a').getAttribute('href'));
    }


    // Lazy load images
    const lazyLoadImages = document.querySelectorAll('.lazy-load');

    const imgObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if ( entry.isIntersecting ) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.classList.remove('lazy-load');
                imgObserver.unobserve(lazyImage);
            }
        });
    });

    lazyLoadImages.forEach(image => {
        imgObserver.observe(image);
    });


    // Adding active class to nav element if user scrolled to it
    const sections = document.querySelectorAll('.component-container');
    const navbarLinks = document.querySelectorAll('.navbar__menu li a');

    function onScroll() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if ( scrollPosition >= sectionTop && scrollPosition <= sectionBottom ) {
                activateNavbarLink(section.id);
            }
        });
    }

    function activateNavbarLink(targetId) {
        navbarLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            const li = link.parentElement;

            if ( href === targetId ) {
                li.classList.add('active');
                history.replaceState(null, null, '#'+targetId);
            } else {
                li.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);

    // Initial check on page load
    onScroll();

});