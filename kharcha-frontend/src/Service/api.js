import axios from "axios";

const getUrl=(path)=>{
    return path
}

const api={
    axios:axios,
    getUrl:getUrl,

    get: async (path, config) => {
        const url = getUrl(path);
        try {
          config = config || {};
          const res = await axios.get(url, config);
          return res;
        } catch (err) {
          console.log(err);
          const res = err.response;
          return res;
        }
      },
}
export default api;