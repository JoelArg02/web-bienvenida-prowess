import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { AuthProvider } from "@/context/authContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div id="__next">
        <Header />
        <div className="main-content">
          <div className="content-wrap">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </div>
    </AuthProvider>
  );
}

export default MyApp;
