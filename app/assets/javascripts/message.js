$(function(){

  var reloadMessages = function() {
    last_message_id = $('.chat__textbox:last').data("message-id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(chat){
      if (chat.length !== 0) {
        var insertHTML = '';
        $.each(chat, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.chat').append(insertHTML);
        $('.chat').animate({ scrollTop: $('.chat')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".submit_btn").prop('disabled', false);
      } 
    })
    .fail(function() {
      console.log('error');
    });
  };

  var buildHTML = function(message) {
    if (message.text && message.image) {
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
            <img class="file_image" src=${message.image} >
          </div>
        </div>`
    } else if (message.text) {
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
    } else if (message.image) {
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
            <img class="file_image" src=${message.image} >
          </div>
        </div>`
    };
    return html;
  };

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
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 3000);
  }
});