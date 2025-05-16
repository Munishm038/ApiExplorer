import React, {useEffect, useState} from 'react';
import {fetchApis} from '../services/api-service';
import {IApiVersion} from '../interfaces';

const useApiList = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<{name: string; version: IApiVersion}[]>([]);

  const loadData = () => {
    setLoading(true);
    setData([]);
    fetchApis()
      .then(res => {
        const parsed = Object.entries(res).map(([name, api]) => {
          const versionKey = api.preferred || Object.keys(api.versions)[0];
          const version = api.versions[versionKey];
          return {name, version};
        });
        setData(parsed);
      })
      .catch(err => {
        setError('Failed to fetch APIs.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  return {data, loading, error, loadData};
};

export default useApiList;
