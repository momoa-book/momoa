import { useQuery } from 'react-query';
import axios from '../utils/axios';

const fetchUsers = async () => {
  const { data } = await axios.get(`http://localhost:5000/api/getsheetid`);
  return data;
};

export default () => {
  const { status, data, error } = useQuery('users', fetchUsers, {
    refetchOnMount: true, // mount 이후에 refetch하지 않음
    refetchOnWindowFocus: false, // window focus 이동 후에 refetch 하지 않음
    placeholderData: [],
  });
  return { status, data, error };
};
