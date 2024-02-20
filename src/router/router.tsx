import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Reviews from '../pages/Reviews/Reviews';
import { Login } from '../pages/Login/Login';
import Locations from '../pages/Locations/Locations';
import PersistLogin from '../components/PersistLogin/PersistLogin';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/lugares" element={<Locations />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
