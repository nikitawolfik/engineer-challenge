import Navbar from "components/Navbar";
import Header from "components/Header";
import Table from "components/Table";
import { SWRConfig } from "swr";

import "./index.css";

const App = () => {
  return (
    <div>
      <SWRConfig
        value={{
          fetcher: (resource, init) =>
            fetch(`${process.env.REACT_APP_API_PATH}${resource}`, init).then(
              (res) => res.json()
            ),
        }}
      >
        <Navbar />
        <div className="w-full p-8">
          <Header />
          <Table />
        </div>
      </SWRConfig>
    </div>
  );
};

export default App;
