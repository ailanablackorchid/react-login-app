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
}
