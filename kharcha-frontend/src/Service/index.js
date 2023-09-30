import utils from "./utils";
import Swal from "./swal";
import api from "./api"
import Log from "./log";

const Client = {
  /**
   * This property will allow to send API request
   */
  api,
  /**
   * This property exposes many helpful functions
   */
  utils,
  /**
   * This property will allow to trigger a beautiful alert that supports react component to be rendered
   */
  alert: Swal,

  Log,
};

export default Client;
