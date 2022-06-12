(async function () {
  const response = await API.profile();
  const user = response.data;

  if (!user) {
    alert("请先登入！");
    location.href = "../login.html";
    return;
  }

  const doms = {
    nickname: $("#nickname"),
    loginId: $("#loginId"),
    close: $(".close"),
    chatContainer: $(".chat-container"),
    msgContainer: $(".msg-container"),
    txtMsg: $("#txtMsg"),
  };

  function insertInfo() {
    doms.loginId.innerText = user.loginId;
    doms.nickname.innerText = user.nickname;
  }
  insertInfo();

  function logout() {
    doms.close.onclick = async function () {
      alert("成功退出登录！");
      await API.logout();
      location.href = "../login.html";
    };
  }
  logout();

  function interface(userinfo) {
    const div = $$$("div");
    div.className = userinfo.from ? "chat-item me" : "chat-item";

    const img = $$$("img");
    img.className = "chat-avatar";
    img.src = userinfo.from ? "./asset/avatar.png" : "./asset/robot-avatar.jpg";

    const content = $$$("div");
    content.className = "chat-content";
    content.innerText = userinfo.content;

    const date = $$$("div");
    date.className = "chat-date";
    date.innerText = formatDate(userinfo.createdAt);

    div.appendChild(img);
    div.appendChild(content);
    div.appendChild(date);

    doms.chatContainer.appendChild(div);
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hour = date.getHours().toString().padStart(2, "0");
    const minute = date.getMinutes().toString().padStart(2, "0");
    const second = date.getSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }

  function setScroll() {
    doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight;
  }

  async function insertHistory() {
    const response = await API.history();
    const datas = response.data;
    for (const item of datas) {
      interface(item);
    }
    setScroll();
  }
  insertHistory();

  async function sendMessage() {
    const content = doms.txtMsg.value.trim();
    if (!content) {
      return;
    }
    interface({
      content,
      createdAt: Date.now(),
      from: user.loginId,
      to: null,
    });
    setScroll();
    doms.txtMsg.value = "";
    const response = await API.message(content);
    interface({
      from: null,
      to: user.loginId,
      content: response.data.content,
      createdAt: Date.now(),
    });
    setScroll();
  }

  doms.msgContainer.onsubmit = function (e) {
    e.preventDefault();
    sendMessage();
  };
})();
