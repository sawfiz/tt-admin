// Components
import DynamicList from '../DynamicList';

// Utilities
import { httpRequest } from '../../utils/apiServices';

export default function ManageParents() {
  return (
    <main>
      <h2>Manage Parents</h2>
      <DynamicList
        fetchDataFunction={() => httpRequest('GET', '/api/users', null, 'parent')}
        dataKey="users"
        showButtons={true}
        showFilter={true}
      />
    </main>
  );
}
