import { useMutation, useQueryClient } from 'react-query';
import axios from '../utils/axios';

const shareInfo = async (items) => {
  const res = await axios.post(`http://localhost:5000/api/shareSheet`, items);
  return res.data;
};

export const useShareMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(shareInfo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('mypages', data);
    },
  });
};
