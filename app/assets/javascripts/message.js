$(function() {

  function buildHTML(message) {
    //条件分岐
    var content = message.content ?`${message.content}`:"";
    var image = message.image ? `<img src= "${message.image}">`:"";
    //messageのhtml
    var html = `<div class ="message" data-message-id="${message.id}">
                  <div class ="upper-message">
                    <div class ="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class ="upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class ="text-message">
                    <p class ="text-message__content">
                        ${content}
                    </p>
                        ${image}
                  </div>
                </div>`

    return html;       
  }
  //フォーム送信時にイベントの発火
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    //formDataを取得
    var formData = new FormData(this);
    //urlを取得
    var url = $(this).attr('action');
    //リクエスト
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    //非同期通信成功時
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.form__submit').prop('disabled', false);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},);
    })   
    //非同期通信失敗時
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    });
  });
  var reloadMessages = function () {
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data('message-id');
      $.ajax({
        url: 'api/messages',
        type: 'GET',
        dataType: 'json',
        data:{id: last_message_id}
      })
      .done(function(messages){
        var insertHTML = '';
        messages.forEach(function(message) {
          insertHTML = buildHTML(message);
        }) 
        $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight},'fast');
      })
      .fail(function() {
        alert ('自動更新に失敗しました');
      });
    }
  };
  setInterval(reloadMessages, 7000);
});
