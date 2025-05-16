import axios from 'axios';
import {IApiList} from '../interfaces/api-info';

export const fetchApis = async (): Promise<IApiList> => {
  const res = await axios.get('https://api.apis.guru/v2/list.json');
  return res.data;
};
