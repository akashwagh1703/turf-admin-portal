import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext.jsx";

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Role-based menu configuration
  const menuItems = [
    {
      label: "Dashboard",
      path: "/dashboard",
      roles: ["admin", "manager", "staff"],
    },
    { label: "Roles & Permissions", path: "/roles", roles: ["admin"] },
    { label: "Turfs", path: "/turfs", roles: ["admin", "manager"] },
    {
      label: "Bookings",
      path: "/bookings",
      roles: ["admin", "manager", "staff"],
    },
    {
      label: "Availability & Pricing",
      path: "/availability",
      roles: ["manager", "staff"],
    },
    { label: "Users", path: "/users", roles: ["admin"] },
    {
      label: "Reports",
      path: "/reports",
      roles: ["admin", "manager"],
    },
    {
      label: "Revenue & Plans",
      path: "/revenue-plans",
      roles: ["admin", "manager"],
    },
    { label: "Content & Settings", path: "/settings", roles: ["admin"] },
  ];
  // console.log(user?.role)

  // Filter menu items based on user role
  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(user?.role.toLowerCase())
  );

  return (
    <div className="app-layout d-flex">
      <aside className="sidebar d-flex flex-column p-3 position-fixed h-100">
        <h5 className="mb-4">Turf Admin</h5>
        <nav className="nav nav-pills flex-column gap-1">
          {filteredMenu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                "nav-link rounded " + (isActive ? "active" : "")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="content flex-grow-1">
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container fluid>
            <Navbar.Brand className="ms-0">
              Welcome{user ? `, ${user.name}` : ""}
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                <NavDropdown title={user?.role || "Account"} align="end">
                  <NavDropdown.Item onClick={() => navigate("/dashboard")}>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <main className="p-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
