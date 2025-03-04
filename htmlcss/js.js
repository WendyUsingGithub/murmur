/* subscribe button rotates when hover and click */

let subscribe_icon = document.getElementById("subscribe-icon");
let subscribe_icon_vertical = document.getElementById("subscribe-icon-vertical");
let subscribe_icon_horizontal = document.getElementById("subscribe-icon-horizontal");
let subscribe_text = document.getElementById("subscribe-text");
let subscribe_button = document.getElementById("subscribe-button");
let subscribe_deg = 0;
let subscribe_state = 0;
let click = 0;

if(subscribe_button)
{
  subscribe_button.addEventListener("mouseenter", function()
  {
    subscribe_deg = subscribe_deg + 90;
    subscribe_icon.style.transform = "rotate(" + subscribe_deg + "deg)";
    subscribe_icon.style.transition = "all 0.3s ease-in-out";
    subscribe_text.style.color = "let(--murmur-gray)";
    subscribe_icon_vertical.style.background = "let(--murmur-gray)";
    subscribe_icon_horizontal.style.background = "let(--murmur-gray)";
  });
}

if(subscribe_button)
{
  subscribe_button.addEventListener("click", function()
  {
    subscribe_deg = subscribe_deg + 135;
    subscribe_icon.style.transform = "rotate(" + subscribe_deg + "deg)";
    subscribe_icon.style.transition = "all 0.45s ease-in-out";

    if(subscribe_state == 0)
    {
      subscribe_state = 1;
    }
    else
    {
      subscribe_state = 0; 
    }

    click = 1;
  });  
}

if(subscribe_button)
{
  subscribe_button.addEventListener("mouseleave", function()
  {
    if(click == 0)
    {
      subscribe_deg = subscribe_deg - 90;
      subscribe_icon.style.transform = "rotate(" + subscribe_deg + "deg)";
      subscribe_icon.style.transition = "all 0.3s ease-in-out";
    }

    subscribe_text.style.color = "let(--murmur-black)";
    subscribe_icon_vertical.style.background = "let(--murmur-black)";
    subscribe_icon_horizontal.style.background = "let(--murmur-black)";
    click = 0;
  });
}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */

let prevScrollpos = window.scrollY;
window.onscroll = function()
{
  let currentScrollPos = window.scrollY;
  if (prevScrollpos >= currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  }
  else {
    document.getElementById("navbar").style.top = "-5.4rem";
  }
  prevScrollpos = currentScrollPos;
}

/* leave comment auto size adjust */

const leave_comment = document.getElementById("leave-comment");
if(leave_comment)
leave_comment.addEventListener("input", function () {
  console.log(this.style.height);
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
});


/* leave comment icon style */

const submit_icon = document.getElementById("submit-icon");

function updateOnFocus() {
  if (leave_comment.value.trim() === "") {
    submit_icon.classList.add("empty");
  } else {
    submit_icon.classList.add("active");
  }
}

function updateOnInput() {
  if (leave_comment.value.trim() === "") {
    submit_icon.classList.remove("active");
    submit_icon.classList.add("empty");
  } else {
    submit_icon.classList.add("active");
  }
}

function updateOnBlur() {
    submit_icon.classList.remove("active");
    submit_icon.classList.remove("empty");
}

leave_comment.addEventListener("focus", function () {
  updateOnFocus();
});

leave_comment.addEventListener("input", function () {
  updateOnInput();
});

leave_comment.addEventListener("blur", function () {
  updateOnBlur();
});