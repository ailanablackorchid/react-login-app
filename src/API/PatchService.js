export default class PatchService {
  static async updateUser(formData, token) {
    const { id, first_name, last_name, email } = formData;
    const response = fetch(`https://reqres.in/api/users/${id}`, {
      method: "PATCH",
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
