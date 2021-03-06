import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {Container, Content} from '../components/containers/Containers';
import Header from '../components/header/Header';
import {Colors} from '../constants/styleConstants';
import {commonStyles} from '../styles/styles';
import SettingsItem from '../components/Settings/SettingsItem';
import LangSwitcher from '../components/Settings/LangSwitcher';
import NotificationBtn from '../components/Settings/NotificationBtn';
import {useTranslation} from 'react-i18next';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';

const Settings: FC = () => {
  const {t} = useTranslation();
  const {isLogin} = useSelector((state: RootState) => state.auth);
  return (
    <Container style={{backgroundColor: Colors.sacandAppBackgroundColor}}>
      <Header title={t('Settings')} />
      <Content noPadding>
        <View style={styles.container}>
          {isLogin && (
            <SettingsItem
              title={t('Addresses')}
              btnTitle={t('Check Out  >')}
              btnAction={'MyAddresses'}
            />
          )}
          {/* <SettingsItem
            title={t('My Cards')}
            btnTitle={t('Check Out  >')}
            btnAction={'MyCards'}
          /> */}
          <LangSwitcher />
          {/* <NotificationBtn /> */}
        </View>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  settingsItemContainer: {
    ...commonStyles.rowBox,
    justifyContent: 'space-between',
  },
});

export default Settings;
