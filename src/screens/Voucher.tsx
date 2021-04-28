import React, {FC, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import ApplyInput from '../components/Voucher/ApplyInput';
import Balance from '../components/Voucher/Balance';
import VoucherDetails from '../components/Voucher/VoucherDetails';
import {Colors} from '../constants/styleConstants';
import {commonStyles} from '../styles/styles';
import {addVoucher, getVoucherData} from '../store/actions/voucher';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {useTranslation} from 'react-i18next';

/*  let voucherData:any;
getItem(AsyncKeys.GET_USER_VOUCHERS).then(data => voucherData = data);
  */
const Voucher: FC = () => {
  const dispatch = useDispatch();
  const {t}: any = useTranslation();
  const {transaction, voucherData, user}: any = useSelector(
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
  console.log('transaction', transaction)
  return (
    <Container style={{backgroundColor: Colors.sacandAppBackgroundColor}}>
      <Header title={t('Voucher')}/>
      <Content noPadding>
        <View style={styles.container}>
          <Balance
            name={userData.name}
            value={(transaction === undefined || transaction.length === 0) ? '0' : user}
            date={transaction !== undefined ? transaction.slice(-1).pop().date : ''}
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
        {transaction.length <= 0 ? null : (
          <View style={styles.listContainer}>
            {transaction.map((item, index) => (
              <VoucherDetails
                {...item}
                key={index}
                isLast={index === transaction.length - 1}
              />
            ))}
          </View>
        )}
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
