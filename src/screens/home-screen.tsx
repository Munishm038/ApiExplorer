import React, {useEffect, useState} from 'react';
import {View, FlatList, TextInput, Text, StyleSheet} from 'react-native';
import {ApiListItem} from '../components/api-list-item';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/app-navigator';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useApiList from '../hooks/use-api-list';

export const HomeScreen = () => {
  const {data, error, loading, loadData} = useApiList();
  const [filtered, setFiltered] = useState<typeof data>([]);
  const [search, setSearch] = useState('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSearch = (text: string) => {
    setSearch(text);
    const filtered = data.filter(d =>
      d.name.toLowerCase().includes(text.toLowerCase().trim()),
    );
    setFiltered(filtered);
  };

  useEffect(() => {
    setFiltered(data);
    return () => {};
  }, [data.length]);

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
        refreshing={loading}
        onRefresh={loadData}
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
