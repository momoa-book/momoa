import { useQuery } from 'react-query';
import axios from '../utils/axios';

const fetchMypage = async () => {
  const { data } = await axios.get(`http://localhost:5000/api/getpersonalinfo`);
  return data;
};

export default () => {
  const { status, data, error } = useQuery('mypages', fetchMypage, {
    refetchOnWindowFocus: false, // window focus 이동 후에 refetch 하지 않음
    placeholderData: '',
  });
  return { status, data, error };
};
