var API = (function () {
  const DUYI_URL = "https://study.duyiedu.com";
  const TOKEN_KEY = "token";

  function get(url) {
    const headers = {};
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(DUYI_URL + url, { headers });
  }

  function post(url, bodyObj) {
    const headers = {
      "Content-Type": "application/json",
    };
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.authorization = `Bearer ${token}`;
    }
    return fetch(DUYI_URL + url, {
      method: "POST",
      headers,
      body: JSON.stringify(bodyObj),
    });
  }

  async function reg(infor) {
    const response = await post("/api/user/reg", infor);
    return await response.json();
  }

  async function login(infor) {
    const response = await post("/api/user/login", infor);
    const result = await response.json();
    if (result.code === 0) {
      const token = response.headers.get("authorization");
      localStorage.setItem(TOKEN_KEY, token);
    }
    return result;
  }

  async function exist(logId) {
    const response = await get("/api/user/exists?loginId=" + logId);
    return await response.json();
  }

  async function profile() {
    const response = await get("/api/user/profile");
    return await response.json();
  }

  async function message(content) {
    const response = await post("/api/chat", {
      content,
    });
    return await response.json();
  }

  async function history() {
    const response = await get("/api/chat/history");
    return await response.json();
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  return {
    reg,
    login,
    exist,
    profile,
    message,
    history,
    logout,
  };
})();
