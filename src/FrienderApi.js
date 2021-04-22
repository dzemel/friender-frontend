import axios from "axios";
const BASE_URL = "http://localhost:3001";

/** API Class.
 *
 * Static class used to make API request to the backend and CRUD the db
 *
 */
class FrienderApi {
  // the token for interactive with the API will be stored here.
  static token;
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderApi.token}` };
    const params = method === "get" ? data : {};
    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response?.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  // Individual API routes

  /** Get details on a company by handle. */
  static async getCurrentUser(first_name) {
    let res = await this.request(`user/${first_name}`);
    return res.user;
  }
  /** Get token for login from username, password. */
  static async login(data) {
    let res = await this.request(`user/login`, data, "post");
    return res.token;
  }
  /** Signup for site. */
  static async signup(data) {
    let res = await this.request(`user/register`, data, "post");
    return res.token;
  }
}
export default FrienderApi;
