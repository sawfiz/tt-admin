// Components
import DynamicList from '../DynamicList';

// Utilities
import { httpRequest } from '../../utils/apiServices';

const ManageVisitors = () => {
  return (
    <main>
      <h2>Manage Visitors</h2>
      <DynamicList
        fetchDataFunction={() => httpRequest('GET', '/api/users', null, 'visitor')}
        dataKey="users"
        showButtons={true}
        showFilter={true}
      />
    </main>
  );
};

export default ManageVisitors;
