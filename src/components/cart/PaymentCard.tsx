import React, {FC} from "react";
import {useTranslation} from "react-i18next";
import {FlatList, StyleSheet, View} from "react-native";
import CategoryStoreItem from "./CategoryStoreItem";
import {Pixel} from "../../constants/styleConstants";

interface IPaymentCardsList {
    data: Array<{ id: string; title: string; image: string; }>;
}

const PaymentCardsList: FC<IPaymentCardsList> = ({data}) => {
    const {t} = useTranslation();
    return (
        <View style={styles.categoryStoresList}>
            <FlatList
                data={data}
                renderItem={({item, index}) => <CategoryStoreItem isLast={index === data.length - 1}
                                                                  index={index} {...item}/>}
                keyExtractor={(item) => item.id}
                horizontal
            />

        </View>
    );
};

const styles = StyleSheet.create({
    categoryStoresList: {
        marginTop: Pixel(25),
    }
});

export default PaymentCardsList;
