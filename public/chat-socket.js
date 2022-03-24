

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjksImNyZWF0ZWRBdCI6IjIwMjItMDMtMjFUMTY6MjM6NDQuNjk1WiIsInVwZGF0ZWRBdCI6IjIwMjItMDMtMjFUMTY6MjM6NDQuNjk1WiIsIm5hbWUiOiJJbGhhbSIsImVtYWlsIjoiaWxoYW1AYWRtaW4uY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkVTNKVFdLelF6TEpabktXd0JUZ1U0ZUZ0Lm56SXlZRTdqWjk4U203VHVuZnFWcndwYzdBcC4iLCJyb2xlIjoiYWRtaW4iLCJzYWx0IjozLCJmcm9tX2Zsb29yIjoxLCJ0b19mbG9vciI6MTIsInNjcmVlbiI6bnVsbCwic3VjY2VzcyI6ZmFsc2UsInN0YXJ0IjoidGltZXIiLCJzdGFydF90aW1lIjpudWxsLCJzcGVlZCI6MCwicG9zaXRpb24iOjAsImlhdCI6MTY0ODA2MDE4NSwiZXhwIjoxNjQ4MTQ2NTg1fQ.5EUw1nOBI_XyHun1JaewF62Y9TO0NkeUUhicsTZ9YfY'
const socket = io('http://localhost:8080', {
  auth: {
    token: token
  }
});

const message = document.getElementById("message");
const messages = document.getElementById("messages");

const handleSubmitNewMessage = () => {
  socket.emit("message", {
    data: { text: message.value, m_type: "text" }
  });
};

socket.on("message", (data) => {
  if (data.m_type === "text") {
    handleNewMessage(data.text);
  }
});

socket.on("getUnRead", (data) => {
  console.log(data);
});

socket.on("getChats", (data) => {
  console.log(data);
});

socket.on("onlineList", (data) => {
  console.log(data);
});
