$(function() {

  function buildHTML(message) {
    //条件分岐
    var messageContent = message.content ? message.content :"";
    var image = message.image_url ? `<img src= "${message.image_url}">`:"";
    //messageのhtml
    var html = `<div class ="message">
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
                        ${messageContent}
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
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
    })
    //非同期通信失敗時
    .fail(function() {
      alert('メッセージ送信に失敗しました');
    });
  });
});