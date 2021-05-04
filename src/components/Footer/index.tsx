import { connect } from "react-redux";

import { Store } from "store/types";

import Footer from "./Footer";

const mapStateToProps = ({ auth }: Store) => ({
  auth,
});

export default connect(mapStateToProps)(Footer);
