$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="chat__textbox" data-message-id=${message.id}>
          <div class="chat__textbox__info">
            <div class="chat__textbox__info_name">
              ${message.user_name}
            </div>
            <div class="chat__textbox__info_daytime">
              ${message.created_at}
            </div>
          </div>
          <div class="chat__textbox__text">
            <p class="file">
              ${message.text}
            </p>
          </div>
          <img class="file_image" src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
      `<div class="chat__textbox" data-message-id=${message.id}>
          <div class="chat__textbox__info">
            <div class="chat__textbox__info_name">
              ${message.user_name}
            </div>
            <div class="chat__textbox__info_daytime">
              ${message.created_at}
            </div>
          </div>
          <div class="chat__textbox__text">
            <p class="file">
              ${message.text}
            </p>
          </div>
        </div>`
      return html;
    };
  }
$('#new_message').on('submit', function(e){
  e.preventDefault();
  var formData = new FormData(this)
  var url = $(this).attr('action')
  $.ajax({
    url: url,
    type: 'POST',
    data: formData,
    dataType: 'json',
    processData: false,
    contentType: false
  })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat').append(html);
    $('.chat').animate({ scrollTop: $('.chat')[0].scrollHeight});
    $('form')[0].reset();
    $('.submit_btn').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
  });
})
});