// Libraries
import { useParams} from 'react-router-dom';

// Components
import DynamicDetails from '../DynamicDetails';

export default function AthleteDetails() {
  const { id } = useParams();
  return (
    <main>
      <DynamicDetails type={'athlete'} id={id} />
    </main>
  );
}
