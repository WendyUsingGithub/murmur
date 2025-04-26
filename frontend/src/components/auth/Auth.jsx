import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import axios from "axios";
import AuthContext from "./AuthContext.jsx"
import Loader from "../loader/Loader.jsx"

export function Auth({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get("http://localhost:3001/auth", {withCredentials: true});
        setUser(res.data);
        console.log("res data", res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
        console.log("user", user);
      }
    }
    checkAuth();
  }, []);

  return (
    <Loader loading={loading}>
      <AuthContext.Provider value={{user, setUser}}>
        {children}
      </AuthContext.Provider>
    </Loader>
  );
}

Auth.propTypes = {
  children: PropTypes.node.isRequired
};

export default Auth;