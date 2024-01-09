import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { useSelector } from "react-redux";
import './index.css'
import Dashboard from "./pages/Dashboard/Dashboard";
import Header from "./components/Header/Header";
import MainPage from "./pages/MainPage/MainPage";
import SigninPage from "./pages/SigninPage/SigninPage";
import Movies from "./pages/Movies/Movies";
import Order from "./pages/Order/Order";
import MovieShowing from "./pages/MovieShowing/MovieShowing";
import AddMovieShowing from "./pages/MovieShowing/AddMovieShowing/AddMovieShowing";
const adminRouters = [
  {
    name: "Admin",
    path: '/admin',
    element: <MovieShowing />
  },
  {
    name: "Dashboard",
    path: '/admin/dashboard',
    element: <Dashboard />
  },
  {
    name: "Dashboard",
    path: '/admin/movies-showing',
    element: <MovieShowing />
  },
  {
    name: "MovieShowing",
    path: '/admin/movie-showing/add',
    element: <AddMovieShowing />
  },
  {
    name: "Movies",
    path: '/admin/movies',
    element: <Movies />
  },
  {
    name: "Order",
    path: '/admin/orders',
    element: <Order />
  },
]

function App() {
  const { isAuthn, username, email, avatar } = useSelector(state => state.authn);
  const renderRouter = (listRouter) => {
    return listRouter.map((router) => {
      return <Route key={router.path} path={router.path} element={<MainPage>
        {router.element}
      </MainPage>
      } />
    })
  }

  return (
    <BrowserRouter>
      {isAuthn ? <Header
        username={username}
        email={email}
        avatar={avatar}
      /> : <></>}
      <Routes>
        {renderRouter(adminRouters, isAuthn)}
        <Route path='/admin/signin' element=<SigninPage /> />
        <Route path='/' element={isAuthn ? <MainPage>
          <MovieShowing />
        </MainPage>
          : <SigninPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

