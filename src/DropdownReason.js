import { View,Text } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './Styles';

const DropdownReason = ({ onSelectItem })=>{

  const emojisWithIcons = [
    {title: 'Tea', icon: 'emoticon-happy-outline'},
    {title: 'Clothe', icon: 'emoticon-cool-outline'},
    {title: 'Sweets', icon: 'emoticon-sad-outline'},
    {title: 'Si-fi', icon: 'emoticon-cry-outline'},
    {title: 'Haircut', icon: 'emoticon-angry-outline'},
    {title: 'Medicine', icon: 'emoticon-excited-outline'},
    {title: 'Food', icon: 'emoticon-kiss-outline'},
    {title: 'Debt', icon: 'emoticon-angry-outline'},
    {title: 'others', icon : 'emoticon-kiss-outline'},
    {title: 'Mobile-Top-up', icon: 'emoticon-wink-outline'},
  ];
  return (
  <SelectDropdown
    data={emojisWithIcons}
    onSelect={(selectedItem, index) => {
        onSelectItem(selectedItem.title); // Pass the selected expense type to the parent component
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View style={styles.dropdownButtonStyle}>
          {selectedItem && (
            <Icon name={selectedItem.icon} style={styles.dropdownButtonIconStyle} />
          )}
          <Text style={styles.dropdownButtonTxtStyle}>
            {(selectedItem && selectedItem.title) || 'Select Expense Type'}
          </Text>
          <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: 'gray'})}}>
          <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
          <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
    dropdownStyle={styles.dropdownMenuStyle}
  />
  )
}

export default DropdownReason;