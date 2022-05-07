import Layout from "./components/Layout";
import { Routes, Route } from 'react-router-dom';
import OrganizationForm from './features/organizations/Organizations'

import AddUserForm from "./features/users/addUser";
import ListUsers from "./features/users/allUsers";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

      <Route index element={<OrganizationForm />} />

      <Route path="user">
          <Route index element={<ListUsers />} />
          <Route path="add" element = {<AddUserForm />} />
       </Route>

    </Route>
  </Routes>

  );
}

export default App;
