// Components
import DynamicList from '../DynamicList';

// Utilities
import { httpRequest } from '../../utils/apiServices';

export default function ManageCoaches() {
  const role = 'coach'
  return (
    <main>
      <h2>Manage Coaches</h2>
      <DynamicList
        fetchDataFunction={() =>
          httpRequest('GET', '/api/users', null, role)
        }
        dataKey="users"
        role={role}
        showButtons={true}
        showFilter={true}
      />
    </main>
  );
}
