import { useQuery } from 'react-query';
import axios from '../utils/axios';

const fetchSheet = async () => {
  const { data } = await axios.get(`http://localhost:5000/api/getsheetid`);
  return data;
};

export default () => {
  const { status, data, error } = useQuery('sheets', fetchSheet, {
    refetchOnWindowFocus: false, // window focus 이동 후에 refetch 하지 않음
    placeholderData: '',
  });
  return { status, data, error };
};
