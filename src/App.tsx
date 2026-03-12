import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import MovieDetail from "./pages/MovieDetail";
import Browse from "./pages/Browse";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Threads from "./pages/Threads";
import SeriesDetail from "./pages/SeriesDetail";
import PartDetail from "./pages/PartDetail";
import Community from "./pages/Community";
import CommunityDetail from "./pages/CommunityDetail";
import Submit from "./pages/Submit";

function BetaBanner() {
  const location = useLocation();
  if (location.pathname === "/submit") return null;
  return (
    <div className="bg-black px-6 py-2 flex items-center justify-center gap-3">
      <span className="font-mono text-[10px] uppercase tracking-[3px] text-white">
        ⚠ Beta
      </span>
      <p className="font-garamond italic text-sm text-white text-center">
        We watch. We write. We archive. Come in...
      </p>
    </div>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const showLayout = location.pathname !== "/submit";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {showLayout && <Navbar />}
      <BetaBanner />
      <main className="flex-1">{children}</main>
      {showLayout && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/threads" element={<Threads />} />
          <Route path="/threads/:seriesSlug" element={<SeriesDetail />} />
          <Route
            path="/threads/:seriesSlug/:partSlug"
            element={<PartDetail />}
          />
          <Route path="/community" element={<Community />} />
          <Route path="/community/:slug" element={<CommunityDetail />} />
          <Route path="/submit" element={<Submit />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
