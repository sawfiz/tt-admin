/* eslint-disable react/prop-types */
// Libraries
import { Link } from 'react-router-dom';

export default function AthleteButton({ data, small }) {
  const imgSrc =
  data.photoURL ||
  (data.gender === 'male'
    ? '/images/boy.png'
    : data.gender === 'female'
    ? '/images/girl.png'
    : '/images/unknown.png');

  const image = (
    <img
      className="w-full h-full object-cover object-center rounded-md"
      src={imgSrc}
      alt="profile"
    />
  );

  return (
    <Link to={`/athlete/${data._id}`} className="no-underline text-slate-700">
      {small ? (
        <div className="h-10 outline-dashed outline-1 outline-pink-300 flex justify-between items-center p-1">
          {data.name}
          <div className="w-8 h-8">{image}</div>
        </div>
      ) : (
        <div className="h-48 outline-dashed outline-2 outline-pink-300 flex flex-col justify-around items-center">
          <div className="w-32 h-32"> {image}</div>
          {data.name}
        </div>
      )}
    </Link>
  );
}
