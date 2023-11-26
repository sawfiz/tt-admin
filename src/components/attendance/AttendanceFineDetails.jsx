// Libraries
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function AttendanceFineDetails({ data }) {
  console.log(
    '🚀 ~ file: AttendanceFineDetails.jsx:5 ~ AttendanceFineDetails ~ data:',
    data
  );
  return (
    <div>
      <h2 className="mt-24 font-bold text-xl">
        {format(new Date(data.date), 'yyyy-MM-dd')}
      </h2>

      <div className="outline-dashed outline-2 outline-pink-300 p-2 grid grid-cols-[1fr_2fr] my-2">
        <div className=" font-bold">Venue</div>
        <div>{data.venue}</div>
        <div className=" font-bold">Coaches</div>
        <div>
          {data.coaches.map((coach) => (
            <div key={coach._id}>
              <Link to={`/users/${coach._id}`}>{coach.name}</Link>
            </div>
          ))}
        </div>
        <div className=" font-bold">Athletes</div>
        <div>
          {data.athletes.map((athlete) => (
            <div key={athlete._id}>
              <Link to={`/athletes/${athlete._id}`}>{athlete.name}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
