import { StyleSheet, Text, View } from 'react-native';
import Touchable from '../touchables/Touchable';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { commonStyles } from '../../styles/styles';
import { Colors, Fonts, Pixel } from '../../constants/styleConstants';
import FavoriteItem from './FavoriteItem';
import { useNavigation } from "@react-navigation/native";

interface IFavoriteList {
    data: Array<{ title: string; image: string }>;
    inHome?: Boolean;
}

const FavoriteList: FC<IFavoriteList> = ({ data, inHome }) => {
    const { t } = useTranslation();
    const { navigate } = useNavigation();
    return (
        <>
            {inHome && <View style={styles.sectionTitleContainer}>
                <Text style={styles.sectionTitle}>{t('Favorite')}</Text>
                <Touchable onPress={() => navigate('Favorite')}>
                    <Text style={styles.viewAllBtnText}>{t('View All')}</Text>
                </Touchable>
            </View>}
            <View style={styles.listContainer}>
                {data.map((item, index) => {
                    if (index <= 5) {
                        return <FavoriteItem {...item} key={index} index={index} />;
                    }
                })}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    sectionTitleContainer: {
        justifyContent: 'space-between',
        ...commonStyles.rowBox,
        marginBottom: Pixel(20),
    },
    sectionTitle: {
        fontFamily: Fonts.black,
        fontSize: Pixel(50),
        color: Colors.colorSacand,
    },
    viewAllBtnText: {
        fontFamily: Fonts.regular,
        fontSize: Pixel(30),
        color: Colors.dark,
    },
    listContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        marginTop: 7,
        paddingBottom: 15,
    },
});
export default FavoriteList;
