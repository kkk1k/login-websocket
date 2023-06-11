// 웹소켓 서버에 연결 // 백엔드 서버 주소 받기
let url = "ws://127.0.0.1:8000/ws/socket-server/";
const socket = new WebSocket(url);
// let socket = new WebSocket("ws://127.0.0.1.8000/ws/socket-server/");

// 연결이 성공적으로 수립되었을 때 호출되는 이벤트 핸들러
socket.onopen = function (event) {
  console.log("WebSocket connection established.");
};

// 서버로부터 메시지를 수신했을 때 호출되는 이벤트 핸들러
// socket.onmessage = function(event){
//   const message = event;
//   displayMessage(message);
// }

socket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  displayMessageChatbot(data.message);
};

// socket.onmessage = function(e){
//    let data = JSON.parse(e.data)
//    displayMessage(data)
// }

// socket.onmessage = function (event) {
//   const message = event.data;
//   // displayMessage(message);
//   console.log(message)
// };

// 에러가 발생했을 때 호출되는 이벤트 핸들러
socket.onerror = function (error) {
  console.error("WebSocket error:", error);
};

// 연결이 종료되었을 때 호출되는 이벤트 핸들러
socket.onclose = function (event) {
  console.log("WebSocket connection closed.");
};

// 채팅창에 메시지 표시 함수 (김한경)
function displayMessage(message) {
  const chatBox = document.getElementById("chatBox");
  const messageElement = document.createElement("tr");
  messageElement.innerHTML += ` 
  <td class="col-3">
    <div class="d-flex align-items-center">
      <div class="avatar avatar-md">
        <img src="assets/static/images/faces/5.jpg" />
      </div>
      <p class="font-bold ms-3 mb-0">김한경</p>
    </div>
  </td>
  <td class="col-auto">
    <p class="mb-0">${message}</p>
  </td>`;
  chatBox.appendChild(messageElement);
  //   document.getElementById("chatBox").innerHTML
}

// 채팅창에 메시지 표시 함수 (Chatbot)
function displayMessageChatbot(message) {
  const chatBox = document.getElementById("chatBox");
  const messageElement = document.createElement("tr");
  messageElement.innerHTML += ` 
  <td class="col-3">
    <div class="d-flex align-items-center">
      <div class="avatar avatar-md">
        <img src="assets/static/images/faces/6.jpg" />
      </div>
      <p class="font-bold ms-3 mb-0">Chatbot</p>
    </div>
  </td>
  <td class="col-auto">
    <p class="mb-0">${message}</p>
  </td>`;
  chatBox.appendChild(messageElement);
  //   document.getElementById("chatBox").innerHTML
}

// 메시지 전송 함수
function sendMessage() {
  const messageInput = document.getElementById("message");
  const message = messageInput.value;

  const data = {
    type: "message",
    message: message,
  };

  displayMessage(message); // Call the display message function
  messageInput.value = "";
  socket.send(JSON.stringify(data)); // Send the message as JSON
}

function enterkey() {
  if (window.event.keyCode == 13) {
    // 엔터키가 눌렸을 때
    event.preventDefault();
    displayMessage(message);
  }
}
