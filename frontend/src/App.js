import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isTokenValid } from './redux/userRelated/userSlice';
import Homepage from './pages/Homepage';
import ChooseUser from './pages/ChooseUser';
import Logout from './pages/Logout';
import Profile from './pages/Profile';
import AuthenticationPage from './pages/AuthenticationPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeDashboard from './pages/employee/EmployeeDashboard';

import AddEmployee from './pages/admin/employeeRelated/AddEmployee';
import ShowEmployees from './pages/admin/employeeRelated/ShowEmployees';
import ViewEmployee from './pages/admin/employeeRelated/ViewEmployee';

import AddTask from './pages/admin/taskRelated/AddTask';
import ShowTasks from './pages/admin/taskRelated/ShowTasks';
import ViewTask from './pages/admin/taskRelated/ViewTask';

const App = () => {
  const dispatch = useDispatch();
  const { currentRole, currentToken, isLoggedIn } = useSelector(state => state.user);

  useEffect(() => {
    if (currentToken) {
      dispatch(isTokenValid());
    }
  }, [dispatch, currentToken]);

  return (
    <BrowserRouter>
      {!isLoggedIn && currentRole === null && (
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Home" element={<Homepage />} />
          <Route path='*' element={<Navigate to="/" />} />
          <Route path="/Choose" element={<ChooseUser />} />

          <Route path="/Employeelogin" element={<AuthenticationPage mode="Login" role="Employee" />} />
          <Route path="/Adminregister" element={<AuthenticationPage mode="Register" role="Admin" />} />
          <Route path="/Adminlogin" element={<AuthenticationPage mode="Login" role="Admin" />} />
        </Routes>
      )}
      {isLoggedIn && currentRole === "Admin" && (
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/Home" element={<AdminDashboard />} />
          <Route path='*' element={<Navigate to="/" />} />
          <Route path="/Profile" element={<Profile role="Admin" />} />

          <Route path="/Admin/employee/add" element={<AddEmployee />} />
          <Route path="/Admin/employees" element={<ShowEmployees />} />
          <Route path="/Admin/employee/view/:id" element={<ViewEmployee />} />

          <Route path="/Admin/task/add" element={<AddTask />} />
          <Route path="/Admin/tasks" element={<ShowTasks />} />
          <Route path="/Admin/task/view/:id" element={<ViewTask />} />

          <Route path="/Dashboard" element={<AdminDashboard />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      )}
      {isLoggedIn && currentRole === "Employee" && (
        <Routes>
          <Route path="/" element={<EmployeeDashboard />} />
          <Route path="/Home" element={<EmployeeDashboard />} />
          <Route path='*' element={<Navigate to="/" />} />
          <Route path="/Profile" element={<Profile role="Employee" />} />

          <Route path="/Dashboard" element={<EmployeeDashboard />} />

          <Route path="/Logout" element={<Logout />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;