import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUsers = async () => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );
  return data;
};

export default () => {
  const { status, data, error } = useQuery('users', fetchUsers, {
    refetchOnMount: false, // mount 이후에 refetch하지 않음
    refetchOnWindowFocus: false, // window focus 이동 후에 refetch 하지 않음
  });
  return { status, data, error };
};
