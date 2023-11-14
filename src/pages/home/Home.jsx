// Libraries
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Home() {

  return (
    <main>
      <h1>Home</h1>
      <NavLink
          to="/admin"
          className={
            'flex items-end pb-1 no-underline text-slate-400 hover:text-slate-200'
          }
        >
          Admin
        </NavLink>
    </main>
  );
}
