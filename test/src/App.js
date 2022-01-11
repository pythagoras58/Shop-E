import React from "react";
import { BaseRouter } from "./routes";
import Layout from "./components/Layout";
import { BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Layout>
            <BaseRouter />
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
