import { useMutation, useQueryClient } from 'react-query';
import axios from '../utils/axios';

const setApprove = async (items) => {
  const res = await axios.post(
    `http://localhost:5000/api/inviteapproval`,
    items
  );
  return res.data;
};

export const useApproveMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(setApprove, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('mypages', data);
    },
  });
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
