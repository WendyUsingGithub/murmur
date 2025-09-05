import PropTypes from "prop-types";
import {useState, useEffect} from "react";
import axios from "axios";
import AuthContext from "./AuthContext.jsx"

export function Auth({children}) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await axios.get("http://1.34.178.127:5555/auth", {withCredentials: true});
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        console.log("User ", user.name);
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

Auth.propTypes = {
  children: PropTypes.node.isRequired
};

export default Auth;