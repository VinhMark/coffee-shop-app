import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  Text,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import {TouchableOpacity} from 'react-native';
import CustomIcon from '../components/CustomIcon';
import {TextInput} from 'react-native';
import CoffeeCard from '../components/CoffeeCard';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] === undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }

  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  if (category === 'All') {
    return data;
  } else {
    let coffeeList = data.filter((item: any) => item.name === category);
    return coffeeList;
  }
};

const HomeScreen = ({navigation}: any) => {
  const {CoffeeList, BeanList, calculateCartPrice, addToCart, clearData} =
    useStore((state: any) => state);

  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList),
  );
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList),
  );

  const listRef: any = useRef<FlatList>();
  const tabBarHeight = useBottomTabBarHeight();

  const searchCoffee = (search: string) => {
    if (search !== '') {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });

      setCategoryIndex({index: 0, category: categories[0]});
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toUpperCase()),
        ),
      ]);
    }
  };

  const resetSearchCoffee = () => {
    listRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });

    setSearchText('');
    setCategoryIndex({index: 0, category: categories[0]});
    setSortedCoffee([...CoffeeList]);
  };

  const addToCartHandler = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });

    // Total price in cart
    calculateCartPrice();
  };

  return (
    <View style={styles.screenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}>
        {/* App Header */}
        <HeaderBar />

        <Text style={styles.screenTitle}>
          Find the best {'\n'}coffee for you
        </Text>

        {/* Search input */}
        <View style={styles.inputContainerComponent}>
          <TouchableOpacity onPress={() => searchCoffee(searchText)}>
            <CustomIcon
              style={styles.inputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find your coffee..."
            value={searchText}
            onChangeText={text => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.textInputContainer}
          />

          {searchText.length > 0 ? (
            <TouchableOpacity onPress={resetSearchCoffee}>
              <CustomIcon
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
                style={styles.inputIcon}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>

        {/* Categories scroll */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryScrollView}>
          {categories.map((item, index) => (
            <View key={index} style={styles.categoryViewContainer}>
              <TouchableOpacity
                onPress={() => {
                  listRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({index, category: categories[index]});
                  setSortedCoffee([
                    ...getCoffeeList(categories[index], CoffeeList),
                  ]);
                }}
                style={styles.categoryScrollViewItem}>
                <Text
                  style={[
                    styles.categoryText,
                    categoryIndex.index === index
                      ? styles.categoryTextActive
                      : {},
                  ]}>
                  {item}
                </Text>
                {categoryIndex.index === index ? (
                  <View style={styles.activeCategory} />
                ) : null}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee list */}
        <FlatList
          ref={listRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.emptyListContainer}>
              <Text style={styles.categoryText}>No Coffee Available</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.flatListContainer}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                });
              }}>
              <CoffeeCard
                id={item.id}
                name={item.name}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={addToCartHandler}
              />
            </TouchableOpacity>
          )}
        />

        <Text style={styles.coffeeBeansTitle}>Coffee beans</Text>
        {/* Beans list */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[
            styles.flatListContainer,
            {marginBottom: tabBarHeight},
          ]}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.push('Details', {
                  index: item.index,
                  id: item.id,
                  type: item.type,
                });
              }}>
              <CoffeeCard
                id={item.id}
                name={item.name}
                index={item.index}
                type={item.type}
                roasted={item.roasted}
                imagelink_square={item.imagelink_square}
                special_ingredient={item.special_ingredient}
                average_rating={item.average_rating}
                price={item.prices[2]}
                buttonPressHandler={addToCartHandler}
              />
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  screenTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  inputContainerComponent: {
    flexDirection: 'row',
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  inputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  textInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  categoryScrollView: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  categoryViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  categoryScrollViewItem: {
    alignItems: 'center',
  },
  categoryTextActive: {
    color: COLORS.primaryOrangeHex,
  },
  categoryText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  activeCategory: {
    width: SPACING.space_10,
    height: SPACING.space_10,
    borderRadius: SPACING.space_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  flatListContainer: {
    gap: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  emptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36,
  },
  coffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
});
