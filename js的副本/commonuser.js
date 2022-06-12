class userReg {
  constructor(txtId, checkfn) {
    this.txtId = document.querySelector("#" + txtId);
    this.p = this.txtId.nextElementSibling;
    this.checkfn = checkfn;
    this.txtId.addEventListener("blur", () => {
      this.check();
    });
  }
  async check() {
    const err = await this.checkfn(this.txtId.value);
    if (err) {
      this.p.innerText = err;
      return false;
    } else {
      this.p.innerText = "";
      return true;
    }
  }
  static async checkAll(...allUsers) {
    const all = allUsers.map((u) => u.check());
    const result = await Promise.all(all);
    return result.every((r) => r);
  }
}
