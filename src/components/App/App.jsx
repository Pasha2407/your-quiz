import { Route, Routes } from "react-router-dom";
import { Layout } from "components/Layout/Layout";
import { Home } from "pages/Home/Home";
import { Result } from "pages/Result/Result";
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="result" element={<Result />} />
      </Route>
    </Routes>
  );
};
