import { Route, Routes } from "react-router-dom";
import { Layout } from "components/Layout/Layout";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("pages/Home/Home"));
const Result = lazy(() => import("pages/Result/Result"));

export const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="result" element={<Result />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
