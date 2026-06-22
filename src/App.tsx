import { Routes, Route } from 'react-router-dom';
import RootLayout from './components/layouts/RootLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';

import Dashboard from './pages/Dashboard';
import Pages from './pages/content/pages';
import Posts from './pages/content/posts';
import Categories from './pages/content/categories';
import MediaLibrary from './pages/MediaLibrary';
import Users from './pages/team/users';
import RolesAndPermissions from './pages/team/RolesAndPermissions';
import Analytics from './pages/Analytics';
import Domains from './pages/Domains';
import Settings from './pages/Settings';
import Templates from './pages/Templates';
import ContentEditor from './pages/editors/ContentEditor';
import TemplateEditor from './pages/editors/TemplateEditor';

export default function App() {
  return (
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="pages" element={<Pages />} />
        <Route path="posts" element={<Posts />} />
        <Route path="categories" element={<Categories />} />
        <Route path="templates" element={<Templates />} />
        <Route path="media" element={<MediaLibrary />} />
        <Route path="users" element={<Users />} />
        <Route path="roles" element={<RolesAndPermissions />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="domains" element={<Domains />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="content-editor" element={<ContentEditor />} />
      <Route path="template-editor" element={<TemplateEditor />} />
      <Route path="*" element={
        <div className="h-screen flex items-center justify-center text-gray-500 bg-gray-50">
          Page not found
        </div>
      } />
    </Routes>
  );
}
