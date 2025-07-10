import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { SignupPage } from "./pages/SignupPage";
import { LoginPage } from "./pages/LoginPage";
import { EditProfilePage } from "./pages/EditProfilePage";
import { AddItemPage } from "./pages/AddItemPage";
import { PublicProfilePage } from "./pages/PublicProfilePage";
import { EditItemPage } from "./pages/EditItemPage";
import { ItemListPage } from "./pages/ItemListPage";
import { ItemDetailPage } from "./pages/ItemDetailPage";
import { ProfilePage } from "./pages/ProfilePage";
import { MessagesPage } from "./pages/MessagesPage";
import { ReportedPage } from "./pages/ReportedPage";
import { NotFound } from "./pages/NotFound";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/add-item" element={<AddItemPage />} />
            <Route path="/edit-item/:id" element={<EditItemPage />} />
            <Route path="/users/:userId" element={<PublicProfilePage />} />
            <Route path="/items" element={<ItemListPage />} />
            <Route path="/items/:id" element={<ItemDetailPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/reported" element={<ReportedPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
