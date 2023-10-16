import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImageBackgroundInfo from './ImageBackgroundInfo';
import LinearGradient from 'react-native-linear-gradient';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

interface FavoriteItemProps {
  id: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  type: string;
  igredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  description: string;
  favorite: boolean;
  toggleFavoriteItem: any;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({
  id,
  name,
  imagelink_square,
  special_ingredient,
  type,
  igredients,
  average_rating,
  ratings_count,
  roasted,
  description,
  favorite,
  toggleFavoriteItem,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackgroundInfo
        enableBackHandler={false}
        imagelink_portrait={imagelink_square}
        type={type}
        id={id}
        favorite={favorite}
        name={name}
        special_ingredient={special_ingredient}
        ingredients={igredients}
        average_rating={average_rating}
        ratings_count={ratings_count}
        roasted={roasted}
        toggleFavorite={toggleFavoriteItem}
      />
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.backgroundContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </LinearGradient>
    </View>
  );
};

export default FavoriteItem;

const styles = StyleSheet.create({
  container: {
    margin: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
  backgroundContainer: {
    gap: SPACING.space_10,
    padding: SPACING.space_20,
  },
  descriptionTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
});
