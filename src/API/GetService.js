export default class GetService {
  static async getUserList(current_page, token) {
    const response = fetch(`https://reqres.in/api/users?page=${current_page}`, {
      method: "GET",
      mode: "cors",
      cache: "default",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer${token}`,
      },
      error: function (result, status) {
        return result;
      },
    });
    return response;
  }
}
