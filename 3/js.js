document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.querySelector('.send-button');
    const geolocationButton = document.querySelector('.geolocation-button');
    const messagesContainer = document.getElementById('messagesContainer');
    
    const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');
  
    socket.addEventListener('open', function (event) {
      console.log('Соединение установлено');
    });
  
    socket.addEventListener('message', function (event) {
      const message = event.data;
      if (!message.includes('https://www.openstreetmap.org/') && !message.startsWith('Сервер:')) {
        appendMessage(message);
      }
    });
  
    socket.addEventListener('close', function (event) {
      console.log('Соединение закрыто');
    });
  
    socket.addEventListener('error', function (event) {
      console.error('Ошибка соединения');
    });
  
    sendButton.addEventListener('click', function () {
      const message = messageInput.value;
      if (message) {
        appendMessage(message);
        socket.send(message);
        messageInput.value = '';
      }
    });
  
    geolocationButton.addEventListener('click', function () {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const { latitude, longitude } = position.coords;
          const geolocationLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;
          appendMessage(geolocationLink);
          socket.send(geolocationLink);
        }, function (error) {
            if (error.code === error.PERMISSION_DENIED) {
              appendMessage('Пользователь не разрешил доступ к гео-локации');
            } else {
              console.error('Ошибка получения геолокации:', error.message);
            }
          });
      } else {
        console.error('Геолокация не поддерживается');
      }
    });
  
    function appendMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message');
  
      if (message.startsWith('Сервер:')) {
        messageElement.classList.add('server-message');
      } else {
        messageElement.classList.add('sender-message');
      }
  
      const messageBubble = document.createElement('div');
      messageBubble.classList.add('message-bubble');
      messageBubble.textContent = message;
      messageElement.appendChild(messageBubble);
  
      messagesContainer.appendChild(messageElement);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  });

