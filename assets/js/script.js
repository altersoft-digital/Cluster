const questions = document.querySelectorAll(".questions__question-box");
if (questions) {
  questions.forEach((question) => {
    question.addEventListener("click", () => {
      const active = document.querySelector(".questions__question-box.active");
      if (active && active !== question) {
        active.classList.toggle("active");
        active.nextElementSibling.style.maxHeight = 0;
      }
      question.classList.toggle("active");
      const answer = question.nextElementSibling;
      if (question.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = 0;
      }
    });
  });

  if (document.querySelector(".questions__question-box.active")) {
    let first = document.querySelector(".questions__question-box.active");
    let second = first.nextElementSibling;
    second.style.maxHeight = second.scrollHeight + "px";
  }
}
const daysTag = document.querySelector(".calendar__days"),
  currentDate = document.querySelector(".calendar__date"),
  prevNextIcon = document.querySelectorAll(".arrow-box"),
  daysTagEventsEl = document.querySelector(".event-numbers"),
  currentDateEventsEl = document.querySelector(".event-date"),
  prevNextIconEventsEl = document.querySelectorAll(".arrow-box");
let from = 10;
let to = 22;

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[currMonth];
const renderCalendar = (from = null, to = null) => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    if (daysTag !== null) {
      liTag += `<li class="calendar__day inactive">${
        lastDateofLastMonth - i + 1
      }</li>`;
    } else if (daysTagEventsEl) {
      liTag += `<li class="events__calendar--number inactive">${
        lastDateofLastMonth - i + 1
      }</li>`;
    }
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched

    let isToday;
    if (daysTag) {
      isToday =
        (i == from && months[currMonth] === month) ||
        (i == to && months[currMonth] === month)
          ? "calendar__day active"
          : "calendar__day";
    } else if (daysTagEventsEl) {
      isToday =
        i === date.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? "events__calendar--number active"
          : "events__calendar--number";
    }
    if (daysTag !== null) {
      for (let y = 0; y <= to - from; y++) {
        if (
          from + y == i &&
          i !== to &&
          i !== from &&
          months[currMonth] === month
        ) {
          isToday = "calendar__day during";
        }
      }
    }
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    if (daysTag) {
      liTag += `<li class="calendar__day inactive">${
        i - lastDayofMonth + 1
      }</li>`;
    } else if (daysTagEventsEl) {
      liTag += `<li class="events__calendar--number inactive">${
        i - lastDayofMonth + 1
      }</li>`;
    }
  }
  if (daysTag) {
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
  } else if (daysTagEventsEl) {
    currentDateEventsEl.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTagEventsEl.innerHTML = liTag;
    prevNextIcon.forEach((btn) => {
      if (
        btn.id === "prev" &&
        currMonth > new Date().getMonth() &&
        !btn.classList.contains("active")
      ) {
        btn.classList.add("active");
      } else if (
        btn.id === "prev" &&
        currMonth === new Date().getMonth() &&
        btn.classList.contains("active") &&
        currYear === new Date().getFullYear()
      ) {
        btn.classList.remove("active");
      }
    });
  }
};
if (currentDate) {
  renderCalendar(from, to);
} else if (currentDateEventsEl) {
  renderCalendar();
}

prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1

    if (icon.id === "prev" && currMonth !== new Date().getMonth()) {
      currMonth = currMonth - 1;
    } else if (icon.id === "next") {
      currMonth = currMonth + 1;
    } else if (
      icon.id === "prev" &&
      currMonth === new Date().getMonth() &&
      currYear > new Date().getFullYear()
    ) {
      currMonth = currMonth - 1;
    }
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    if (currentDate) {
      renderCalendar(from, to);
    } else if (currentDateEventsEl) {
      renderCalendar();
    }
  });
});

function whichIsActive(id, c) {
  const activeEl = document.querySelector("." + c);
  const thisEl = document.getElementById(id);
  if (activeEl !== thisEl) {
    activeEl.classList.remove(c);
    thisEl.classList.add(c);
    if (
      id === "copyright" &&
      activeEl == thisEl.previousSibling.previousElementSibling
    ) {
      setPosition(activeEl, "unset", "0");
    } else if (
      id === "terms" &&
      activeEl == thisEl.nextSibling.nextElementSibling
    ) {
      setPosition(thisEl, "unset", "0");
    } else if (
      id === "terms" &&
      activeEl == thisEl.previousSibling.previousElementSibling
    ) {
      setPosition(thisEl, "0", "unset");
    } else if (
      id === "policy" &&
      activeEl == document.getElementById("terms")
    ) {
      setPosition(activeEl, "0", "unset");
    }
    // if (
    //   activeEl.nextSibling === thisEl ||
    //   activeEl.nextSibling.nextSibling === thisEl
    // ) {
    //   activeEl.classList.add("inacitve-to-right");
    //   thisEl.classList.add("active-to-right");
    //   setTimeout(() => {
    //     activeEl.classList.remove("inacitve-to-right");
    //     thisEl.classList.remove("active-to-right");
    //   }, 500);
    // } else {
    //   activeEl.classList.add("inacitve-to-left");
    //   thisEl.classList.add("active-to-left");
    //   setTimeout(() => {
    //     activeEl.classList.remove("inacitve-to-left");
    //     thisEl.classList.remove("active-to-left");
    //   }, 500);
    // }
  }
}

function setPosition(el, left, right) {
  el.querySelector("span").style.left = left;
  el.querySelector("span").style.right = right;
}
if (document.querySelector(".mySwiper")) {
  const swiper = new Swiper(".mySwiper", {
    // Optional parameters
    // loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
if (document.querySelector(".mySwiperReviews")) {
  const swiper2 = new Swiper(".mySwiperReviews", {
    // Optional parameters
    slidesPerView: 2,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    spaceBetween: 24,
    // If we need pagination
    pagination: {
      el: ".swiper-pagination-reviews",
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 0px
      0: {
        slidesPerView: 1,
      },
      // when window width is >= 600px
      600: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      // when window width is >= 900px
      900: {
        slidesPerView: 1,
      },
      // when window width is >= 1400px
      1000: {
        slidesPerView: 2,
      },
    },
  });
}
const toggleActive = (el) =>
  document.getElementById(el).classList.toggle("active");

// STICKY HEADER

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the header
let mainHeader = document.querySelector(".header");

// Get the offset position of the navbar
let sticky = mainHeader.offsetTop;

// Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset > sticky) {
    if (
      !mainHeader.classList.contains("sticky") &&
      !mainHeader.classList.contains("active")
    ) {
      mainHeader.classList.add("sticky");
    }
  } else {
    if (mainHeader.classList.contains("sticky")) {
      mainHeader.classList.remove("sticky");
    }
  }
}
