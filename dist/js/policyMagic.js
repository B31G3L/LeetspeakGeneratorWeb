document.addEventListener('DOMContentLoaded', function() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'true';
    if (darkModeEnabled) {
      document.getElementById("darkMode").checked = darkModeEnabled
    }

    document.getElementById("darkMode").addEventListener("change", () => {
        if (document.getElementById("darkMode").checked) {
          storage.setItem("darkMode", true)
        } else {
          storage.setItem("darkMode", false)
        }
      });
  });


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("myBtn").style.display = "block";
  } else {
    document.getElementById("myBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
}