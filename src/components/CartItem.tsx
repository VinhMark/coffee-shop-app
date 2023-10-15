import {
  StyleSheet,
  Text,
  View,
  ImageProps,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import {Image} from 'react-native';
import CustomIcon from './CustomIcon';

interface CartItemProps {
  id: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  roasted: string;
  prices: any;
  type: string;
  incrementCartItemQuantity: any;
  decrementCartItemQuantity: any;
  calculateCartPrice: any;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  imagelink_square,
  special_ingredient,
  roasted,
  prices,
  type,
  incrementCartItemQuantity,
  decrementCartItemQuantity,
  calculateCartPrice,
}) => {
  return (
    <View style={styles.container}>
      {prices.length !== 1 ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.itemLinearGradient}>
          <View style={styles.cartItemRow}>
            <Image source={imagelink_square} style={styles.itemImage} />

            {/* Info */}
            <View style={styles.info}>
              <View>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subTitle}> {special_ingredient}</Text>
              </View>

              <View style={styles.roastedContainer}>
                <Text style={styles.roastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
          {/* Prices */}
          {prices.map((data: any, index: number) => (
            <View key={index.toString()} style={styles.sizeRowContainer}>
              <View style={styles.sizeValueContainer}>
                {/* size */}
                <View style={styles.sizeBox}>
                  <Text
                    style={[
                      styles.sizeText,
                      {
                        fontSize:
                          type === 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                      },
                    ]}>
                    {data.size}
                  </Text>
                </View>

                {/* price */}
                <Text style={styles.sizeCurrency}>
                  {data.currency}
                  <Text style={styles.sizePrice}>{data.price}</Text>
                </Text>
              </View>

              {/* quantity */}
              <View style={styles.sizeValueContainer}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    decrementCartItemQuantity(id, data.size);
                    calculateCartPrice();
                  }}>
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityText}>{data.quantity}</Text>
                </View>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => {
                    incrementCartItemQuantity(id, data.size);
                    calculateCartPrice();
                  }}>
                  <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.itemSingleLinearGradient}>
          <View>
            <Image source={imagelink_square} style={styles.itemImageSingle} />
          </View>

          <View style={styles.itemSingleInfoContainer}>
            <View>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>{special_ingredient}</Text>
            </View>

            <View style={styles.singleSizeValueContainer}>
              <View style={styles.sizeBox}>
                <Text
                  style={[
                    styles.sizeText,
                    {
                      fontSize:
                        type === 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                    },
                  ]}>
                  {prices[0].size}
                </Text>
              </View>

              {/* price */}
              <Text style={styles.sizeCurrency}>
                {prices[0].currency}
                <Text style={styles.sizePrice}>{prices[0].price}</Text>
              </Text>
            </View>

            {/* quantity */}
            <View style={styles.singleQuantityContainer}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  decrementCartItemQuantity(id, prices[0].size);
                  calculateCartPrice();
                }}>
                <CustomIcon
                  name="minus"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantityText}>{prices[0].quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  incrementCartItemQuantity(id, prices[0].size);
                  calculateCartPrice();
                }}>
                <CustomIcon
                  name="add"
                  color={COLORS.primaryWhiteHex}
                  size={FONTSIZE.size_10}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.space_30,
    marginBottom: SPACING.space_12,
  },
  itemLinearGradient: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_15 + SPACING.space_12,
  },
  cartItemRow: {
    flexDirection: 'row',
    gap: SPACING.space_12,
    flex: 1,
  },
  itemImage: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_15,
  },
  info: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  subTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
  },
  roastedContainer: {
    height: 50,
    width: 50 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  roastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  sizeRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_20,
  },
  sizeValueContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  sizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    height: 40,
    width: 100,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryLightGreyHex,
  },
  sizeCurrency: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  sizePrice: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  icon: {
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  quantityContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
    paddingVertical: SPACING.space_4,
  },
  quantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  itemSingleLinearGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.space_12,
    gap: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  itemImageSingle: {
    height: 150,
    width: 150,
    borderRadius: BORDERRADIUS.radius_15,
  },
  itemSingleInfoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  singleSizeValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  singleQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: SPACING.space_10,
  },
});
