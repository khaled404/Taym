import React, {FC, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Container} from '../components/containers/Containers';
import {Colors, Pixel} from '../constants/styleConstants';
import {useTranslation} from 'react-i18next';
import Header from '../components/header/Header';
import {SwipeListView} from 'react-native-swipe-list-view';
import NotificationItem from '../components/Notification/NotificationItem';
import {TrashIcon} from '../../assets/Icons/Icons';

const Notifications: FC = () => {
  const {t} = useTranslation();
  const [rowSlideOpen, setRowSlideOpen] = useState(0);
  const [listData, setListData] = useState(
    Array(5)
      .fill('')
      .map((_, i) => ({
        id: i,
        key: `${i}`,
        title: t('Fresh Market Order 1247'),
        content: t(
          'Banana Item Is unfortunately Out Of Stock And We Suggest You Another Items Please Check It',
        ),
        seen: false,
      })),
  );

  const deleteRow = (rowMap: {}, rowKey: number) => {
    closeRow(rowMap, rowKey);
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.id === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => deleteRow(rowMap, data.item.id)}>
        <TrashIcon />
      </TouchableOpacity>
    </View>
  );
  const onRowDidOpen = rowKey => {
    setRowSlideOpen(rowKey);
  };
  const onLeftActionStatusChange = rowKey => {
    console.log('onLeftActionStatusChange', rowKey);
  };

  const onRightActionStatusChange = rowKey => {
    console.log('onRightActionStatusChange', rowKey);
  };

  const onRightAction = rowKey => {
    console.log('onRightAction', rowKey);
  };

  const onLeftAction = rowKey => {
    console.log('onLeftAction', rowKey);
  };

  return (
    <Container style={styles.container}>
      <Header title={t('Notifications')} />
      <SwipeListView
        data={listData}
        renderItem={(data, rowMap) => {
          return (
            <NotificationItem
              {...data.item}
              slideOpen={rowSlideOpen == Number(data.item.id)}
              isLast={data.index === listData.length - 1}
            />
          );
        }}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={75}
        rightOpenValue={-75}
        onRowDidOpen={onRowDidOpen}
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
        onLeftActionStatusChange={onLeftActionStatusChange}
        onRightActionStatusChange={onRightActionStatusChange}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.sacandAppBackgroundColor,
    flex: 1,
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.sacandAppBackgroundColor,
    paddingBottom: Pixel(50),
  },
  backTextWhite: {
    color: '#FFF',
  },
  orderItemsList: {
    marginVertical: 5,
    paddingVertical: 5,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: '#FF5023',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#FF5023',
    right: 0,
  },
});

export default Notifications;
