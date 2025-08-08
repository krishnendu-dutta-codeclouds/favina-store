import { Provider } from 'react-redux';
import { store } from './redux/store';
import { GlobalStyles } from './assets/styles/globalStyles';
import { HashRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CartSidebar from './components/cart/CartSidebar';
import ScrollToTop from './components/common/ScrollToTop';
import { ImagePathContext } from './context/ImagePathContext';
import { CartQuantityProvider } from './context/CartQuantityContext';

const BASE_PATH = '/';

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <ImagePathContext.Provider value={BASE_PATH}>
        <CartQuantityProvider>
          <Router>
            <ScrollToTop />
            <Header />
            <main>
              <AppRoutes />
            </main>
            <Footer />
            <CartSidebar />
          </Router>
        </CartQuantityProvider>
      </ImagePathContext.Provider>
    </Provider>
  );
};

export default App;