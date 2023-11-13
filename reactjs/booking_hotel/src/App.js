import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import './index.css'
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import ErrorComponent from "./pages/Error";
import ErrorComponent1 from "./pages/ErrorPage";
import Parameter from "./pages/search/testParam";

const listRouter = [
  {
    name: "Home",
    path: '/',
    element: <Home />

  },
  {
    name: "Search",
    path: '/search',
    element: <Search />

  },
  {
    name: "Detail",
    path: '/detail',
    element: <Detail />

  },
  {
    name: "MatchAll",
    path: '*',
    element: <ErrorComponent />

  },
  {
    name: "Param",
    path: '/search/:id',
    element: <Parameter />

  },
]

function App() {

  const renderRouter = (listRouter) => {
    return listRouter.map((router) => {
      return <Route key={router.path} errorElement={<ErrorComponent1 />} path={router.path} element={router.element} />
    })
  }

  return (
    <BrowserRouter>

      <Routes>

        {renderRouter(listRouter)}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
