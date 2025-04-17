
/* leave comment auto size adjust */

const leave_comment = document.getElementById("leave-comment");
if(leave_comment) {
  leave_comment.addEventListener("input", function () {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  });
}


/* leave comment icon style */

const submit_icon = document.getElementById("submit-icon");
const author = document.getElementById("author");
const post_tags = document.getElementById("post-tags");

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