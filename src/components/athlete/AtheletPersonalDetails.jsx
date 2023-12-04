// Libraries
import { format } from 'date-fns';

// Vite handles .env differently from create-react-app
const BASE_URL = import.meta.env.VITE_BASE_URL; // Set the base URL

export default function AtheletPersonalDetails({ data }) {
  console.log('🚀 ~ file: AtheletPersonalDetails.jsx:16 ~ data:', data);
  const imgSrc = data
    ? `${BASE_URL}/${data.photoUrl}` ||
      (data.gender === 'male'
        ? '/images/boy.png'
        : data.gender === 'female'
        ? '/images/girl.png'
        : '/images/unknown.png')
    : null;

  return (
    <div>
      {/* Athlete full name */}
      <h2 className="mt-24 font-bold text-xl">{data.name}</h2>
      {/* Profile photo */}
      <div className=" absolute top-4 right-[0.5rem] w-28 h-28 overflow-hidden">
        <img
          className="w-full h-full object-center object-cover rounded-lg "
          src={imgSrc}
          alt="avatar"
        />
      </div>
      {/* Personal details */}
      <div className="outline-dashed outline-2 outline-pink-300 p-2 grid grid-cols-[1fr_2fr] my-2">
        <div className=" font-bold">Active</div>
        <div>{data.active ? '✅' : '❌'}</div>
        <div className=" font-bold">Gender</div>
        <div>{data.gender}</div>
        <div className=" font-bold">Birthdate</div>
        <div>
          {data.birthdate ? format(new Date(data.birthdate), 'yyyy-MM-dd') : ''}
        </div>
        <div className=" font-bold">Mobile</div>
        <div>{data.mobile}</div>
        <div className=" font-bold">Email</div>
        <div>{data.email}</div>
        <div className=" font-bold">School</div>
        <div>{data.school}</div>
        <div className=" font-bold">Father</div>
        <div>{data.father}</div>
        <div className=" font-bold">Mother</div>
        <div>{data.mother}</div>
      </div>
    </div>
  );
}
