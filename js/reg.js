const loginId = new userReg("txtLoginId", async function (val) {
  if (!val) {
    return "账号不能为空！";
  }
  const response = await API.exist(val);
  if (response.data) {
    return "该账号已存在！";
  }
});

const nickname = new userReg("txtNickname", async function (val) {
  if (!val) {
    return "昵称不能为空！";
  }
});

const loginPwd = new userReg("txtLoginPwd", async function (val) {
  if (!val) {
    return "密码不能为空！";
  }
});

const loginConfirmPwd = new userReg("txtLoginPwdConfirm", async function (val) {
  if (!val) {
    return "密码不能为空！";
  }
  if (val !== loginPwd.txtId.value) {
    return "两次密码不一致！";
  }
});

const form = document.querySelector(".user-form");
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const result = await userReg.checkAll(
    loginId,
    nickname,
    loginPwd,
    loginConfirmPwd
  );
  if (!result) {
    return;
  }
  const allInfo = new FormData(form);
  const data = Object.fromEntries(allInfo.entries());
  const response = await API.reg(data);
  if (response.code === 0) {
    alert("注册成功！");
    location.href = baseUrl + "../login.html";
  }
});
