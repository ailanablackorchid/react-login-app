export default class PostService {
  static async login(formData) {
    const { email, password } = formData;
    const response = fetch("https://reqres.in/api/login", {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      error: function (result, status) {
        console.log(result);
      },
    });
    return response;
  }
  static async createUser(formData, token) {
    const { id, first_name, last_name, email } = formData;
    const response = fetch("https://reqres.in/api/users", {
      method: "POST",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${token}`,
      },
      body: JSON.stringify({
        email: email,
        first_name: first_name,
        last_name: last_name,
      }),
      error: function (result, status) {
        console.log(result);
      },
    });
    return response;
  }
}
