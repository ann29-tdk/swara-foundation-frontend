import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Layout from './components/Layout';
import Donate from './pages/Donate';
import { Auth0Provider } from '@auth0/auth0-react';
import { RequireAuth } from './components/RequireAuth';
import { Toaster } from 'sonner';
import AdminPanel from './pages/Admin/AdminPanel';
import Media from './pages/Media';
import OurWork from './pages/OurWork';

function App() {
  return (
    <Auth0Provider
      domain="dev-muwfwfnberurulc5.us.auth0.com"
      clientId="iagrYgAp73mePK3kjbdDupakgkaYn80N"
      authorizationParams={{
        redirect_uri: window.location.origin + '/admin',
      }}
    >
      <Toaster position="top-center" expand={true} richColors/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="our-work" element={<OurWork/>} />
            <Route path="media" element={<Media/>} />
            <Route path="donate" element={<Donate />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route
            path="/admin/*"
            element={
              <RequireAuth>
                <AdminPanel/>
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </Auth0Provider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
