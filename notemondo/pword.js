export class User {
  constructor(password) {
    this.password = password,
    this.authorized = false,
    this.attempts = 0
  }
  newPassword(pword){
    this.password = pword;
  }
  validateInput(){}
  checkLogin(userInput){
    let msg = '';
    console.log(this.attempts)

    if(this.attempts >= 2) {
      msg = 'Too many attempts. Goodbye.';
      this.attempts = 0;

      return msg;
    }

    let match = userInput == this.password
      ? true : false;

    if (!match) {
      this.authorized = false;
      msg = 'Access Denied.';
      this.attempts++;
      return msg;
    } else {
      this.authorized = true;
      msg = 'Access Granted';
      this.attempts = 0;
      return msg;
    }


  }
  updateAuth(){}
}

{User}