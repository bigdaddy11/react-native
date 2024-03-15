
// export default function httpCall({
//     param, 
//     method,
//     url,
// }){
//     return (
//         fetch(url, {
//             method: method,
//             headers: {
//                 "Content-Type": "application/json",
//                 "Access-Control-Allow-Origin": "*"
//             },
//             body: param,
//         })
//         .then((response) => {
//             return response();
//         })
//         .then((data) => {
//              return data;
//         })
//     );
// };

import axios from 'axios';
import { useCallback, useState } from 'react';

const httpCall = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    const { method, url, data, headers } = requestConfig;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios({
        url: url || '',
        method: method || 'GET',
        data: data || null,
        headers: headers || {},
      });
      const fetchedData = response.data;
      applyData(fetchedData);
    } catch (err) {
      setError(err.message || 'Error');
    }
    setIsLoading(false);
  }, []);
  
  return { isLoading, error, sendRequest };
};

export default httpCall;