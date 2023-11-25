// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// Styling
import { Button, Modal } from 'react-bootstrap';

export default function UserPersonalDetails({
  id,
  data,
  type,
  handleShowDeleteModal,
}) {
  const imgSrc =
    data.photoURL ||
    (data.gender === 'male'
      ? '/images/man.png'
      : data.gender === 'female'
      ? '/images/woman.png'
      : '/images/unknown.png');

  return (
    <div>
    {/* user full name */}
    <h2 className="mt-24 font-bold text-xl">{data.name}</h2>
    {/* Profile photo */}
    <div className=" absolute top-4 right-[0.5rem] w-28 h-28 overflow-hidden">
      <img
        className="w-full h-full object-center object-cover rounded-lg "
        src={imgSrc}
        alt="profile"
      />
    </div>
    {/* Personal details */}
    <div className="outline-dashed outline-2 outline-pink-300 p-2 grid grid-cols-[1fr_2fr] my-2">
      <div className=" font-bold">Active</div>
      <div>{data.active ? '✅' : '❌'}</div>
      <div className=" font-bold">Username</div>
      <div>{data.username}</div>
      <div className=" font-bold">Mobile</div>
      <div>{data.mobile}</div>
      <div className=" font-bold">Email</div>
      <div>{data.email}</div>
      <div className=" font-bold">Gender</div>
      <div>{data.gender}</div>
      <div className=" font-bold">Role</div>
      <div>{data.role}</div>
    </div>

    {/* Buttons */}
    <div className="flex justify-around">
      <Link to={`/user/update/${id}`}>
        <Button variant="primary">Update</Button>
      </Link>
      <Button variant="danger" onClick={handleShowDeleteModal}>
        Delete
      </Button>
    </div>
  </div>
  );
}
