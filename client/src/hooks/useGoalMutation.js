import { QueryClient, useMutation, useQueryClient } from 'react-query';
import axios from '../utils/axios';

const setGoal = async (items) => {
  const res = await axios.post(`http://localhost:5000/api/writegoal`, items);
  return res.data;
};

export const useGoalMutation = () => {
  return useMutation(setGoal);
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
