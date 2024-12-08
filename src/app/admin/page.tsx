const AdminPage = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>
        Welcome to the admin dashboard. Here you can manage users, view reports,
        and configure settings.
      </p>
      <div>
        <h2>Manage Users</h2>
        <button>Add User</button>
        <button>Remove User</button>
      </div>
      <div>
        <h2>View Reports</h2>
        <button>Generate Report</button>
      </div>
      <div>
        <h2>Settings</h2>
        <button>Configure Settings</button>
      </div>
    </div>
  );
};

export default AdminPage;
