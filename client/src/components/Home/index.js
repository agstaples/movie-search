import React from "react";

import { Form } from "../../components/MovieSearch";

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row pt-5">
          <div className="col-12">
            <h1 className="text-center">MovieSearch</h1>
          </div>
          <Form />
        </div>
      </div>
    );
  }
}

export default Home;
