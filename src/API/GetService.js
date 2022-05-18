export default class GetService {
  static async getUserList(current_page) {
    const response = fetch(`https://reqres.in/api/users?page=${current_page}`, {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
      },
      error: function (result, status) {
        console.log(result);
      },
    });
    return response;
  }
}
