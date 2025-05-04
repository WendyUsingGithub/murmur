import PropTypes from "prop-types";

import { useNavigate } from "react-router-dom";


function usePageTransition(path) {
  const navigate = useNavigate();
  navigate(path);
  return;
}

export default usePageTransition;