import { QueryClient, useMutation, useQueryClient } from 'react-query';
import axios from '../utils/axios';

const addItems = async (items) => {
  const res = await axios.post(`http://localhost:5000/api/writeinfo`, items);
  return res.data;
};

export const useItemMutation = () => {
  return useMutation(addItems);
};

// export const useItemMutation = () => {
//   const queryClient = useQueryClient();
//   return useMutation(addItems, {
//     onSuccess: (data) => {
//       queryClient.setQueryData('', ()=>{
//         return {
//           ...olddata,
//           newData:[...oldData, data],
//         }
//       })
//     }
//   });
// };