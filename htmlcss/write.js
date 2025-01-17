/******************** publish post accordin ********************/

let prepare_publish_button = document.getElementById("prepare-publish-button");
let prepare_publish_accordin = document.getElementById("prepare-publish-accordin");

prepare_publish_button.addEventListener("click", function()
{
  if (prepare_publish_accordin.style.maxHeight) {
    prepare_publish_accordin.style.maxHeight = null;
  } else {
    prepare_publish_accordin.style.maxHeight = "calc(100vh - 20rem)";
  } 
});

/******************** date picker ********************/

const daysContainer = document.querySelector(".days");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const todayBtn = document.querySelector(".today");
const year_month = document.querySelector(".show-month");

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();
const currentDay = date.getDate();
let month = currentMonth;
let year = currentYear;

function renderCalendar()
{
  date.setDate(1);

  const lastDate = new Date(year, month + 1, 0);
  const lastDay = lastDate.getDate();
  const lastDayIndex = lastDate.getDay();

  const prevLastDate = new Date(year, month, 0);
  const prevLastDay = prevLastDate.getDate();
  const prevLastDateIndex = prevLastDate.getDay();

  const nextDays = 7 - lastDayIndex - 1;
  
  year_month.innerHTML = months[month];

  let chosen_date = document.getElementById("choose-date-text");
  chosen_date.innerHTML = currentYear + " . " + (currentMonth + 1) + " . " + currentDay;

  let calendar_content = document.getElementById("calendar-content");
  while (calendar_content.hasChildNodes()) {
    calendar_content.removeChild(calendar_content.lastChild);
  }

  /* prev month days */
  for (let i = prevLastDateIndex; i >= 0; i--) {
    let tmp = document.createElement("div");
    tmp.classList.add("day", "prev");
    tmp.textContent = prevLastDay - i;
    calendar_content.appendChild(tmp);

    tmp.addEventListener("click", function() 
    {
      let chosen_date = document.getElementById("choose-date-text");
      chosen_date.innerHTML = year + " . " + (month + 1) + " . " + this.textContent;
    })
  }

  /* this month days */
  for (let i = 1; i <= lastDay; i++) {
    let tmp = document.createElement("div");
    tmp.classList.add("day");
    tmp.textContent = i;
    if (i == currentDay && month == currentMonth && year == currentYear) {
      tmp.classList.add("today");
    }
    calendar_content.appendChild(tmp);

    tmp.addEventListener("click", function()
    {
      let chosen_date = document.getElementById("choose-date-text");
      chosen_date.innerHTML = year + " . " + (month + 1) + " . " + this.textContent;
    })
  }

  /* next month days */
  for (let i = 1; i <= nextDays; i++) {
    let tmp = document.createElement("div");
    tmp.classList.add("day", "next");
    tmp.textContent = i;
    calendar_content.appendChild(tmp);

    tmp.addEventListener("click", function()
    {
      let chosen_date = document.getElementById("choose-date-text");
      chosen_date.innerHTML = year + " . " + (month + 1) + " . " + this.textContent;
    })
  }
}

/* go to next month */
if(nextBtn)
{
  nextBtn.addEventListener("click", function()
  {
    month++;
    if (month == 12) {
      month = 0;
      year++;
    }
    renderCalendar();
  });
}

/* go to prev month */
if(prevBtn)
{
  prevBtn.addEventListener("click", function()
    {
      month--;
      if (month == -1) {
        month = 11;
        year--;
      }
      renderCalendar();
  });
}

/* go to today */
if(year_month)
{
  year_month.addEventListener("click", function()
  {
    month = date.getMonth();
    year = date.getFullYear();
    renderCalendar();
  });
}

renderCalendar();

/********************  tag picker ********************/

let post_tags = document.getElementsByClassName("post-tags");
let post_tag_arr = document.getElementsByClassName("post-tag");
let post_tag_suggestions = document.getElementsByClassName("post-tag-suggestions");
let post_tag_suggestions_arr = document.getElementsByClassName("post-tag-suggestion");
let tag_picker = document.getElementsByClassName("tag-picker");
let input_tag = document.getElementById("input-tag");

for (let i = 0; i < post_tag_arr.length; i++)
{
  post_tag_arr[i].addEventListener("click", post_tag2suggestion.bind(post_tag_arr[i]));
}
for (let i = 0; i < post_tag_suggestions_arr.length; i++)
{
  post_tag_suggestions_arr[i].addEventListener("click", post_suggestion2tag.bind(post_tag_suggestions_arr[i]));
}

prepare_publish_button.addEventListener('click', function()
{
  // autoSizeTags(post_tags[0]);
  // autoSizeTags(post_tag_suggestions[0]);
});

/* create a tag : "t" for post_tag, "s" for post_suggestion_tag */
function create_tag(type, text)
{
  if(type == "t")
  {
    let tag = document.createElement("div");
    let icon_tag = document.createElement("div");
    let icon_tag_remove = document.createElement("div");
    let text_tag = document.createElement("div");
    let height_before = 0;
    let height_after = 0;
    let time = 700;


    tag.classList.add('post-tag');
    icon_tag.classList.add('icon');
    icon_tag_remove.classList.add('icon-hover');
    text_tag.classList.add('text');

    icon_tag.innerText = "#";
    icon_tag_remove.innerText = "-";
    text_tag.innerText = text;

    tag.appendChild(icon_tag);
    tag.appendChild(icon_tag_remove);
    tag.appendChild(text_tag);

    $(tag).animate({opacity: 0}, 0);
    $(tag).hide();

    post_tags[0].appendChild(tag);
    tag.addEventListener("click", post_tag2suggestion.bind(tag));

    height_before = $(post_tags).height();
    $(tag).show(700);
    setTimeout(function() 
    {
      height_after = $(post_tags).height();
      if(height_after != height_before) {
        $(tag).stop();
      }
    }, 100);
    $(tag).animate({opacity: 1}, 200);
  }
  else if(type == "s")
  {
    let suggestion_tag = document.createElement("div");
    let icon_tag = document.createElement("div");
    let icon_tag_remove = document.createElement("div");
    let text_tag = document.createElement("div");
    
    suggestion_tag.classList.add('post-tag-suggestion');
    icon_tag.classList.add('icon');
    icon_tag_remove.classList.add('icon-hover');
    text_tag.classList.add('text');

    icon_tag.innerText = "-";
    icon_tag_remove.innerText = "+";
    text_tag.innerText = text;

    suggestion_tag.appendChild(icon_tag);
    suggestion_tag.appendChild(icon_tag_remove);
    suggestion_tag.appendChild(text_tag);

    $(suggestion_tag).animate({opacity: 0}, 0);
    $(suggestion_tag).hide();

    suggestion_tag.addEventListener("click", post_suggestion2tag.bind(suggestion_tag));
    post_tag_suggestions[0].appendChild(suggestion_tag);
    
    $(suggestion_tag).show(700);
    $(suggestion_tag).animate({opacity: 1}, 200);
  }
}

/* delete a tag, create a suggestion_tag */
function post_tag2suggestion()
{
  $(this).animate({opacity: 0}, 0);
  height_before = $(post_tags).height();
  $(this).hide(700);
  setTimeout(function() 
  {
    post_tags[0].removeChild(this);
    create_tag("s", (this.children)[2].innerText);
  }.bind(this), 750);
}

/* delete a suggestion_tag, create a tag */
function post_suggestion2tag()
{
  $(this).animate({opacity: 0}, 0);
  $(this).hide(700);
  setTimeout(function() 
  {
    post_tag_suggestions[0].removeChild(this);
    create_tag("t", (this.children)[2].innerText);
  }.bind(this), 750);
}

/* create a tag by key-in */
input_tag.addEventListener("keyup", function(e)
{
  if (e.key == 'Enter') {
    create_tag("t", input_tag.value);
    setTimeout(function() 
    {
      input_tag.value = "";
    }.bind(this), 100);
  }
});

// function autoSizeTags(tagsarea)
// {
//   tagsarea.style.overflowY = 'hidden';
//   scrollHeight = tagsarea.scrollHeight;
// }

/********************  markdown textarea ********************/

let textarea_md = document.getElementById("textarea-md");

window.addEventListener('resize', windowResizeEvt);

textarea_md.oninput = function()
{
  autoSize(textarea_md);
};

function autoSize(textarea)
{
  let scrollHeight = textarea.scrollHeight;
  let textareaHeight = 0;

  textarea.style.overflowY = 'hidden';
  textareaHeight = scrollHeight;
  if(textareaHeight < window.innerHeight) {
    textareaHeight = window.innerHeight;
  }
  textarea.style.height = textareaHeight + 'px';
}

function autoSizeEvt(e) {
  autoSize(e.target);
}

function windowResizeEvt(e) {
  resizeAllTextareas();
}

function resizeAllTextareas() {
  let taArray = getTextareasArray();
  taArray.forEach(function (ta) {
      autoSize(ta);
  });
}

function getTextareasArray() {
  let taArray = [];
  let taList = document.getElementsByTagName('textarea-md');
  for (let i = 0; i < taList.length; i++) {
      taArray.push(taList[i]);
  }
  return taArray;
}

let taArray = getTextareasArray();
taArray.forEach(function (ta) {
  autoSize(ta);
  ta.addEventListener('input', autoSizeEvt);
});

function getInputValue() {
  // Selecting the input element and get its value 
  let inputVal = document.getElementsByClassName("inputClass")[0].value;
  // Displaying the value
  alert(inputVal);
}


const regex_h1 = /^#\s[^#].*$/gm;
const regex_h2 = /^##\s[^#].*$/gm;
const regex_bold = /\*\*[^\*\n]+\*\*/gm;
const regex_italics = /[^\*]\*[^\*\n]+\*/gm;
const regex_highlight = /==[^==\n]+==/gm;
const regex_hyperlinks = /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm;
const regex_list = /^(\s*(\-|\d\.) [^\n]+)+$/gm;
const regex_unorderedlist = /^\-\s.*$/;
const regex_orderedlist = /^\d\.\s.*$/;



// const textinput = document.querySelector("#txtinput")
// let textpreview = document.querySelector("#txtpreview")

let textinput = document.getElementById("textarea-md");
let textpreview = document.getElementById("preview-md");


let preview_button = document.getElementById("preview-button");
let md_state = "input";

preview_button.addEventListener("click", (e) =>
{
  // $(textinput).animate({opacity: 0}, 500);
  // $(textinput).hide();
  // $(textpreview).animate({opacity: 1}, 500);

  if(md_state == "input") {
    $(textinput).animate({opacity: 0}, 500);
    $(textinput).hide();
    $(textpreview).show();
    $(textpreview).animate({opacity: 1}, 500);
    md_state = "preview";
  }
  else {
    $(textpreview).animate({opacity: 0}, 500);
    $(textpreview).hide();
    $(textinput).show();
    $(textinput).animate({opacity: 1}, 500);
    md_state = "input";
  }
});

document.addEventListener("keyup", function(e)
{
  if (e.key == 'Escape') {
    if(md_state == "input") {
      $(textinput).animate({opacity: 0}, 500);
      $(textinput).hide();
      $(textpreview).show();
      $(textpreview).animate({opacity: 1}, 500);
      md_state = "preview";
    }
    else {
      $(textpreview).animate({opacity: 0}, 500);
      $(textpreview).hide();
      $(textinput).show();
      $(textinput).animate({opacity: 1}, 500);
      md_state = "input";
    }
  }
});

textinput.addEventListener('input', (e) => {
  let content = e.target.value
  //textpreview.innerHTML = content


  //here we will do the conversion
  if (regex_h1.test(content)) {
    const matches = content.match(regex_h1) // returns array [] of all heading 1

    matches.forEach((element) => {
      const extractedText = element.slice(1)
      // each element is sliced from index 1
      // Example string : # Hi , then string will be ' Hi' because at index 1 is whitespace.
      content = content.replace(element, `<h1>${extractedText}</h1>`)
      // then replace the matched string with formatted HTML whose text content is extracted text.
      // finally reassign this replaced string.
    })
  }
  textpreview.innerHTML = content
  if (regex_h2.test(content)) {
    const matches = content.match(regex_h2)
    matches.forEach(element => {
      const extractedtext = element.slice(2)
      content = content.replace(element, `<h2>${extractedtext}</h2>`)
    });
  }
  textpreview.innerHTML = content

  if (regex_bold.test(content)) {
    const matches = content.match(regex_bold)
    matches.forEach(element => {
      const extractedtext = element.slice(2, -2)
      content = content.replace(element, `<strong>${extractedtext}</strong>`)
    });
  }
  textpreview.innerHTML = content

  if (regex_italics.test(content)) {
    const matches = content.match(regex_italics)
    matches.forEach((element) => {
      const extractedText = element.slice(2, -1)
      //sliced from index 2 till the (total length - 1)
      // Example : *abhik* , index 2 is a because the regex for italics says there should be 1 more character before star, so the new string is started from a
      // total length is 8  therefore 8 - 1  is 7. So the new string is from index 2 to 7 which is abhik
      content = content.replace(element, `<em>${extractedText}</em>`)
    })
  }
  textpreview.innerHTML = content

  if (regex_highlight.test(content)) {
    const matches = content.match(regex_highlight)
    matches.forEach(element => {
      const extractedtext = element.slice(2, -2)
      content = content.replace(element, `<span class='highlight'>${extractedtext}</span>`)
    });
  }
  textpreview.innerHTML = content

  if (regex_hyperlinks.test(content)) {
    const matches = content.match(regex_hyperlinks)
    matches.forEach(element => {
      const text = element.match(/^\[.*\]/)[0].slice(1, -1)
      const url = element.match(/\]\(.*\)/)[0].slice(2, -1)
      // const extractedtext=element.slice(2,-2)
      content = content.replace(element, `<a href="${url}">${text}</a>`)
    });
  }
  textpreview.innerHTML = content

  if (regex_list.test(content)) {
    const matches = content.match(regex_list)

    matches.forEach((list) => {
      const listArray = list.split('\n')
      // ['- hi', '- bye', '', '1. hdhd', '2. jdjdj']
      const formattedList = listArray
        .map((currentValue, index, array) => {
          if (regex_unorderedlist.test(currentValue)) {
            currentValue = `<li>${currentValue.slice(2)}</li>`

            if (!regex_unorderedlist.test(array[index - 1])) {
              //array[index-1] will be false if it is null,undefined or < 0
              // unorderedList.test(array[index - 1]) will return true only if the the array element at index - 1 is ul element
              // !unorderedList.test(array[index - 1]) will return true if the unorderedList.test(array[index - 1]) returns false
              currentValue = '<ul>' + currentValue
              // this means if the previous element of the list element in the array  is not a list element or this list element is the 1st element of the array  then add a starting ul tag
            }
            if (!regex_unorderedlist.test(array[index + 1])) {
              //array[index+1] will be false if it is null,undefined or > length of the array
              // unorderedList.test(array[index + 1]) will return true only if the the array element at index+1 is ul element
              // !unorderedList.test(array[index + 1]) will return true if the unorderedList.test(array[index + 1]) returns false
              currentValue = currentValue + '</ul>'
              // this means if the next element of the list element in the array  is not a list element or this list element is the last element of the array  then append a closing ul tag
            }
          }
          //Similarly create ol
          if (regex_orderedlist.test(currentValue)) {
            currentValue = `<li>${currentValue.slice(2)}</li>`

            if (!regex_orderedlist.test(array[index - 1])) {
              currentValue = '<ol>' + currentValue
            }

            if (!regex_orderedlist.test(array[index + 1])) {
              currentValue = currentValue + '</ol>'
            }
          }

          return currentValue
        })
        .join('')

      content = content.replace(list, formattedList)
    })
  }
  textpreview.innerHTML = content
  content = content
    .split('\n')
    .map((line) => {
      if (!line.startsWith('<') && line !== '') {
        // if line is not empty & does not start with html tag
        return line.replace(line, `<p>${line}</p>`)
      } else {
        return line
      }
    })
    .join('\n')

})



// /* markdown */

// // const regex_h1 = /^#[^#].*$/gm;
// const regex_h1 = /^#\s[.]*$/;

// const regex_h2 = /^##[^#].*$/gm;
// const regex_bold = /\*\*[^\*\n]+\*\*/gm;
// const regex_italics = /[^\*]\*[^\*\n]+\*/gm;
// const regex_highlight = /==[^==\n]+==/gm;
// const regex_hyperlinks = /\[[\w|\(|\)|\s|\*|\?|\-|\.|\,]*(\]\(){1}[^\)]*\)/gm;
// const regex_list = /^(\s*(\-|\d\.) [^\n]+)+$/gm;
// const regex_unorderedlist = /^\-\s.*$/;
// const regex_orderedlist = /^\d\.\s.*$/;



// let textarea_preview = document.getElementById("textarea-preview");
// let preview_button = document.getElementById("preview-button");

// preview_button.addEventListener("click", (e) =>
// {
//   $(textarea_md).animate({opacity: 0}, 500);
//   $(textarea_md).hide();
//   $(preview_button).animate({opacity: 1}, 500);
//   console.log(textarea_preview);
// });

// textarea_md.addEventListener('keyup', (e) =>
// {
//     let content = e.target.value
//     // console.log("textarea_md.addEventListener");
//     // console.log(content);
//     // console.log(regex_h1.test(content));

//     // console.log(content);

//     // //here we will do the conversion
//     // if (regex_h1.test(content)) {
//     //   console.log("???");
//     // }
//     // else {
//     //   console.log("$$$$$");
//     // }
//     // console.log(regex_h1.test(content));
//     //   console.log("???");
//       const matches = content.match(regex_h1) // returns array [] of all heading 1

//       matches.forEach((element) => {
//         const extractedText = element.slice(1)
//         // each element is sliced from index 1
//         // Example string : # Hi , then string will be ' Hi' because at index 1 is whitespace.
//         content = content.replace(element, `<h1>${extractedText}</h1>`)
//         // then replace the matched string with formatted HTML whose text content is extracted text.
//         // finally reassign this replaced string.
//       });
//       preview_button.innerHTML = content;
//       console.log(preview_button);
    
// });


//   // if (regex_h2.test(content)) {
//   //   const matches = content.match(regex_h2)
//   //   matches.forEach(element => {
//   //     const extractedtext = element.slice(2)
//   //     content = content.replace(element, `<h2>${extractedtext}</h2>`)
//   //   });
//   // }
//   // textpreview.innerHTML = content

//   // if (regex_bold.test(content)) {
//   //   const matches = content.match(regex_bold)
//   //   matches.forEach(element => {
//   //     const extractedtext = element.slice(2, -2)
//   //     content = content.replace(element, `<strong>${extractedtext}</strong>`)
//   //   });
//   // }
//   // textpreview.innerHTML = content

//   // if (regex_italics.test(content)) {
//   //   const matches = content.match(regex_italics)
//   //   matches.forEach((element) => {
//   //     const extractedText = element.slice(2, -1)
//   //     //sliced from index 2 till the (total length - 1)
//   //     // Example : *abhik* , index 2 is a because the regex for italics says there should be 1 more character before star, so the new string is started from a
//   //     // total length is 8  therefore 8 - 1  is 7. So the new string is from index 2 to 7 which is abhik
//   //     content = content.replace(element, `<em>${extractedText}</em>`)
//   //   })
//   // }
//   // textpreview.innerHTML = content

//   // if (regex_highlight.test(content)) {
//   //   const matches = content.match(regex_highlight)
//   //   matches.forEach(element => {
//   //     const extractedtext = element.slice(2, -2)
//   //     content = content.replace(element, `<span class='highlight'>${extractedtext}</span>`)
//   //   });
//   // }
//   // textpreview.innerHTML = content

//   // if (regex_hyperlinks.test(content)) {
//   //   const matches = content.match(regex_hyperlinks)
//   //   matches.forEach(element => {
//   //     const text = element.match(/^\[.*\]/)[0].slice(1, -1)
//   //     const url = element.match(/\]\(.*\)/)[0].slice(2, -1)
//   //     // const extractedtext=element.slice(2,-2)
//   //     content = content.replace(element, `<a href="${url}">${text}</a>`)
//   //   });
//   // }
//   // textpreview.innerHTML = content

//   // if (regex_list.test(content)) {
//   //   const matches = content.match(regex_list)

//   //   matches.forEach((list) => {
//   //     const listArray = list.split('\n')
//   //     // ['- hi', '- bye', '', '1. hdhd', '2. jdjdj']
//   //     const formattedList = listArray
//   //       .map((currentValue, index, array) => {
//   //         if (regex_unorderedlist.test(currentValue)) {
//   //           currentValue = `<li>${currentValue.slice(2)}</li>`

//   //           if (!regex_unorderedlist.test(array[index - 1])) {
//   //             //array[index-1] will be false if it is null,undefined or < 0
//   //             // unorderedList.test(array[index - 1]) will return true only if the the array element at index - 1 is ul element
//   //             // !unorderedList.test(array[index - 1]) will return true if the unorderedList.test(array[index - 1]) returns false
//   //             currentValue = '<ul>' + currentValue
//   //             // this means if the previous element of the list element in the array  is not a list element or this list element is the 1st element of the array  then add a starting ul tag
//   //           }
//   //           if (!regex_unorderedlist.test(array[index + 1])) {
//   //             //array[index+1] will be false if it is null,undefined or > length of the array
//   //             // unorderedList.test(array[index + 1]) will return true only if the the array element at index+1 is ul element
//   //             // !unorderedList.test(array[index + 1]) will return true if the unorderedList.test(array[index + 1]) returns false
//   //             currentValue = currentValue + '</ul>'
//   //             // this means if the next element of the list element in the array  is not a list element or this list element is the last element of the array  then append a closing ul tag
//   //           }
//   //         }
//   //         //Similarly create ol
//   //         if (regex_orderedlist.test(currentValue)) {
//   //           currentValue = `<li>${currentValue.slice(2)}</li>`

//   //           if (!regex_orderedlist.test(array[index - 1])) {
//   //             currentValue = '<ol>' + currentValue
//   //           }

//   //           if (!regex_orderedlist.test(array[index + 1])) {
//   //             currentValue = currentValue + '</ol>'
//   //           }
//   //         }

//   //         return currentValue
//   //       })
//   //       .join('')

//   //     content = content.replace(list, formattedList)
//   //   })
//   // }
//   // textpreview.innerHTML = content

//   // content = content
//   //   .split('\n')
//   //   .map((line) => {
//   //     if (!line.startsWith('<') && line !== '') {
//   //       // if line is not empty & does not start with html tag
//   //       return line.replace(line, `<p>${line}</p>`)
//   //     } else {
//   //       return line
//   //     }
//   //   })
//   //   .join('\n')
//   //   }
//   //   })