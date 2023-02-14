import { NavLink } from "react-router-dom";

export default function SiteHeader() {
  return (
    <>
      <nav
        id="site-header"
        className="py-4 bg-white border p-2 px-5 rounded-md mb-0"
      >
        <ul className="list-inline flex">
          <li className="mr-6">
            <NavLink
              className="text-blue-500 hover:text-blue-800"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink
              className="text-blue-500 hover:text-blue-800"
              to="/categories"
              end
            >
              Categories
            </NavLink>
          </li>
          <li className="mr-6">
            <NavLink
              className="text-white p-2 rounded-md bg-purple-500 hover:text-purple-200 hover:bg-purple-700"
              to="/auth"
            >
              Login
            </NavLink>
          </li>
        </ul>
      </nav>

      <p className="text-right m-0">
        <a
          href="https://github.com/richellyitalo?tab=repositories&q=csgo-information"
          rel="noreferrer"
          target="_blank"
          className="text-sm text-purple-700 hover:text-yellow-600 hover:no-underline"
        >
          by @richellyitalo
        </a>
      </p>
    </>
  );
}
