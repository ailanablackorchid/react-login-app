export default class PostService {
  static async getAll(per_page) {
    const response = fetch(`https://reqres.in/api/users?per_page=${per_page}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        return response;
      });
    return response;
  }
}
