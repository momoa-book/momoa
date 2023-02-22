import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );
  return data;
};

export default () => {
  const { status, data, error } = useQuery('users', fetchUsers);
  return { status, data, error };
};
