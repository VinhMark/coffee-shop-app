import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimated from '../components/EmptyListAnimated';
import FavoriteItem from '../components/FavoriteItem';

const FavoritesScreen = ({navigation}: any) => {
  const {FavoriteList, deleteFavoriteList, addToFavoriteList} = useStore(
    (state: any) => state,
  );
  const tabBarHeight = useBottomTabBarHeight();

  const toggleFavoriteHandle = (
    favorite: boolean,
    type: string,
    id: string,
  ) => {
    if (favorite) {
      deleteFavoriteList(type, id);
    } else {
      addToFavoriteList(type, id);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <View
          style={[
            styles.scrollViewInnerContainer,
            {marginBottom: tabBarHeight},
          ]}>
          <View style={styles.itemContainer}>
            <HeaderBar title="Favorites" />
            {FavoriteList.length === 0 && (
              <EmptyListAnimated title="No Favorites" />
            )}
            {FavoriteList.length > 0 && (
              <View style={styles.listContainer}>
                {FavoriteList.map((data: any) => (
                  <TouchableOpacity
                    key={data.id}
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}>
                    <FavoriteItem
                      {...data}
                      toggleFavoriteItem={toggleFavoriteHandle}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  scrollViewInnerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemContainer: {
    flex: 1,
  },
  listContainer: {},
});
