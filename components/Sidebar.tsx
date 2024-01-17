import React from 'react'

interface SidebarProps {

}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div className="bg-white-800 bg-gray-200 p-20 h-100 w-32 align-center ">
      <nav className="">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/Board">Board</a>
          </li>
          <li>
            <a href="/Setting">Setting</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;