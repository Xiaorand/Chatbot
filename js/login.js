const loginId = new userReg("txtLoginId", async function (val) {
  if (!val) {
    return "账号不能为空！";
  }
});

const loginPwd = new userReg("txtLoginPwd", async function (val) {
  if (!val) {
    return "密码不能为空！";
  }
});

console.log(baseUrl);

const form = document.querySelector(".user-form");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const result = await userReg.checkAll(loginId, loginPwd);
  if (!result) {
    return;
  }
  const allInfo = new FormData(form);
  const data = Object.fromEntries(allInfo.entries());
  const response = await API.login(data);
  if (response.code === 0) {
    alert("登录成功！");
    location.href = "/Chatbot/" + "../index.html";
  } else {
    loginId.p.innerText = "密码或账号错误！";
    loginPwd.txtId.value = "";
    loginId.txtId.value = "";
  }
});
