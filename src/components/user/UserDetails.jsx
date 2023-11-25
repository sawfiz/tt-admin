// Libraries
import { useParams} from 'react-router-dom';

// Components
import DynamicDetails from '../DynamicDetails';

export default function UserDetails() {
  const { id } = useParams();

  return (
    <main>
    <DynamicDetails type={'user'} id={id} />
    </main>
  );
}
