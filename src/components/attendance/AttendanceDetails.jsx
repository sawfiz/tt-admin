// Libraries
import { useParams } from 'react-router-dom';

// Components
import DynamicDetails from '../DynamicDetails';

export default function AttendanceDetails() {
  const { id } = useParams();
  console.log(
    '🚀 ~ file: AttendanceDetails.jsx:10 ~ AttendanceDetails ~ id:',
    id
  );
  return (
    <main>
      <DynamicDetails type={'attendance'} id={id} />
    </main>
  );
}
