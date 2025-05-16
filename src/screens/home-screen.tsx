import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';
import {fetchApis} from '../services/api-service';
import {ApiListItem} from '../components/api-list-item';
import {IApiList, IApiVersion} from '../interfaces';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/app-navigator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const HomeScreen = () => {
  const [data, setData] = useState<{name: string; version: IApiVersion}[]>([]);
  const [filtered, setFiltered] = useState<typeof data>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadApis = async () => {
      try {
        const apiData: IApiList = await fetchApis();
        const parsed = Object.entries(apiData).map(([name, api]) => {
          const versionKey = api.preferred || Object.keys(api.versions)[0];
          const version = api.versions[versionKey];
          return {name, version};
        });
        setData(parsed);
        setFiltered(parsed);
      } catch (e) {
        setError('Failed to fetch APIs.');
      } finally {
        setLoading(false);
      }
    };

    loadApis();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = data.filter(d =>
      d.name.toLowerCase().includes(text.toLowerCase().trim()),
    );
    setFiltered(filtered);
  };

  if (loading) return <ActivityIndicator style={{flex: 1}} />;
  if (error) return <Text style={styles.errorText}>{error}</Text>;

  return (
    <View style={{flex: 1}}>
      <TextInput
        style={styles.input}
        placeholder="Search APIs"
        value={search}
        onChangeText={handleSearch}
      />
      <FlatList
        data={filtered}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <ApiListItem
            title={item.name}
            description={item.version.info.description}
            onPress={() =>
              navigation.navigate('Details', {
                name: item.name,
                version: item.version,
              })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    marginHorizontal: wp('4%'),
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    padding: wp('3%'),
    borderRadius: wp('2%'),
    fontSize: wp('4%'),
  },
  errorText: {
    textAlign: 'center',
    marginTop: hp('3%'),
    color: 'red',
    fontSize: wp('4%'),
  },
});
