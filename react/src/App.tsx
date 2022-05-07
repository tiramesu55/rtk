import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import OrganizationForm from './features/organizations/Organizations'
// import PostsList from "./features/users/PostsList";
// import AddPostForm from "./features/users/AddPostForm";
// import SinglePostPage from "./features/users/SinglePostPage";
// import EditPostForm from "./features/users/EditPostForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

      <Route index element={<OrganizationForm />} />

    </Route>
  </Routes>

  );
}

export default App;
