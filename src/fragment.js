import PropTypes from "prop-types";

export default function Fragment({ state, filterOn, children }) {
  let parts = filterOn.split(".");
  let cur = parts.reduce((cur, next) => (cur ? cur[next] : cur), state);

  if (cur) {
    return children;
  } else {
    return null;
  }
}

Fragment.propTypes = {
  children: PropTypes.node,
  filterOn: PropTypes.string,
  state: PropTypes.object,
};
