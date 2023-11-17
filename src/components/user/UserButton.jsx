/* eslint-disable react/prop-types */
// Libraries
import { Link } from 'react-router-dom';

export default function UserButton({ data, small }) {
  const imgSrc =
  data.photoURL ||
  (data.gender === 'male'
    ? '/images/man.png'
    : data.gender === 'female'
    ? '/images/woman.png'
    : '/images/unknown.png');

  const image = (
    <img
      className="w-full h-full object-cover object-center rounded-md"
      src={imgSrc}
      alt="profile"
    />
  );

  return (
    <Link to={`/user/${data._id}`} className="no-underline text-slate-700">
      { data.active ? (
        <div className="h-10 outline-dashed outline-1 outline-pink-300 flex justify-between items-center p-1">
          {data.username}
          <div className="w-8 h-8">{image}</div>
        </div>
      ) : (
        <div className="h-10 outline-dashed outline-1 outline-slate-300 bg-gray-300 opacity-50 flex justify-between items-center p-1">
          {data.username}
          <div className="w-8 h-8">{image}</div>
        </div>
      )}
    </Link>
  );
}
