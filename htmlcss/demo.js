
let post_tag_arr = document.getElementsByClassName("post-tag");
let post_tag_suggestions_arr = document.getElementsByClassName("post-tag-suggestion");
let post_tags = document.getElementsByClassName("post-tags");
let post_tag_suggestions = document.getElementsByClassName("post-tag-suggestions");
let tag_picker = document.getElementsByClassName("tag-picker");


for (let i = 0; i < post_tag_suggestions_arr.length; i++)
{
  post_tag_suggestions_arr[i].addEventListener("click", function()
  {
    $(this).animate({opacity: 0}, 0);
    $(this).hide(1000);
    setTimeout(function() 
    {
      this.classList.add('post-tag-suggestion');
      this.classList.remove('post-tag');
      (this.children)[0].innerText = "-";
      (this.children)[1].innerText = "+";
      post_tags[0].removeChild(this);
      post_tag_suggestions[0].appendChild(this);
      $(this).show();
      autoSizeTags(tag_picker[0]);
      $(this).animate({opacity: 1}, 500);
    }.bind(this), 1050);
  });
}