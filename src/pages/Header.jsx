// Libraries

// Config

// Contexts

// Components

// Modals

export default function Header() {
  return (
    <div className="grid grid-cols-[3rem_auto] bg-slate-800">
      <h2> Header </h2>
      {/* <div className="flex">
        <Link to={'/'}>
          <img src="/images/athlelite.png" alt="Team Athlelite" className="" />
        </Link>
      </div>

      <div className="flex justify-around">
        <NavLink
          to="/"
          className={
            'flex items-end pb-1 no-underline text-slate-400 hover:text-slate-200'
          }
        >
          Home
        </NavLink>

       {(isLoggedIn && ['admin', 'coach'].includes(userInfo.role )) && <NavLink
          to="/admin"
          className={
            'flex items-end pb-1 no-underline text-slate-400 hover:text-slate-200'
          }
        >
          Admin
        </NavLink>}

       {(isLoggedIn && userInfo.role === 'parent' ) && <NavLink
          to="/children"
          className={
            'flex items-end pb-1 no-underline text-slate-400 hover:text-slate-200'
          }
        >
          My Children
        </NavLink>}

        <NavLink
          to="/about"
          className={
            'flex items-end pb-1 no-underline  text-slate-400 hover:text-slate-200'
          }
        >
          About
        </NavLink>
        <div className="flex justify-center items-end pb-1">
          {!isLoggedIn && <Auth />}
          {isLoggedIn && (
            <button onClick={showModal} className="pb-1">
              <img
                src={user.photoURL}
                alt="Avatar"
                className="w-8 h-8 rounded-full border hover:border-red-500"
              />
            </button>
          )}
        </div>
      </div>
      <SignOutModal show={show} hideModal={hideModal} handleSignOut={handleSignOut}/> */}
    </div>
  );
}
