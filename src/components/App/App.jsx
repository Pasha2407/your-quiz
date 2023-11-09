import { Route, Routes } from "react-router-dom";
import { Layout } from "components/Layout/Layout";
import { Home } from "components/pages/Home/Home";
import { Result } from "components/pages/Result/Result";
export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
    </div>
  );
};
