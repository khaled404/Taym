import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import ApplyInput from '../components/Voucher/ApplyInput';
import Balance from '../components/Voucher/Balance';
import VoucherDetails from '../components/Voucher/VoucherDetails';
import {Colors} from '../constants/styleConstants';
import {commonStyles} from '../styles/styles';
import {getVoucherData, addVoucher} from '../store/actions/voucher';
import {axiosAPI} from '../constants/Config';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {AsyncKeys, getItem} from '../constants/helpers';
import {useTranslation} from 'react-i18next';

/*  let voucherData:any;
getItem(AsyncKeys.GET_USER_VOUCHERS).then(data => voucherData = data);
  */
const Voucher: FC = () => {
  const dispatch = useDispatch();
  const {t}: any = useTranslation();
  const {transaction, voucherData}: any = useSelector(
    (state: RootState) => state.voucher,
  );
  const {userData}: any = useSelector((state: RootState) => state.auth);
  const [state, setstate] = useState({
    code: '',
    loader: false,
  });
  useEffect(() => {
    dispatch(getVoucherData());
  }, []);

  const addVouchers = () => {
    setstate(old => ({...old, loader: true}));
    dispatch(
      addVoucher(state.code, success => {
        setstate(old => ({...old, loader: false, code: ''}));
        success;
      }),
    );
  };

  return (
    <Container style={{backgroundColor: Colors.sacandAppBackgroundColor}}>
      <Header title={t('Voucher')} />
      <Content noPadding>
        <View style={styles.container}>
          <Balance
            name={userData.name}
            value={transaction.length == 0 ? '0' : voucherData.user}
            date="EX . 22 January 2021"
          />
          <ApplyInput
            onPress={() => addVouchers()}
            options={{
              onChangeText: value => {
                setstate(old => ({...old, code: value}));
              },
              value: state.code,
              onSubmitEditing: addVouchers,
            }}
          />
        </View>
        <View style={styles.listContainer}>
          {!transaction
            ? null
            : transaction.map((item, index) => (
                <VoucherDetails
                  {...item}
                  key={index}
                  isLast={index === transaction.length - 1}
                />
              ))}
        </View>
      </Content>
    </Container>
  );
};

export default Voucher;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  listContainer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    ...commonStyles.boxShadow,
  },
});
