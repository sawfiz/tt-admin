// Libraries
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export default function AttendanceButton(data, dataKey) {
  console.log(
    '🚀 ~ file: AttendanceButton.jsx:5 ~ AttendanceButton ~ data:',
    data
  );
  return (
    <Link
      to={`/${data.dataKey}/${data.data._id}`}
      className="no-underline text-slate-700"
    >
      <div className="h-10 outline-dashed outline-1 outline-pink-300 flex justify-between items-center p-1">
        {format(new Date(data.data.date), 'yyyy-MM-dd')}
        <div className="">{data.data.venue}</div>
      </div>
    </Link>
  );
}
