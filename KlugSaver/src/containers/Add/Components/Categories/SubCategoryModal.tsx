import React from 'react';
import { View, Text, Modal, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ICategory } from '../../../../typings';
import { getTheme } from '../../../../theme/utils';

export interface ISubCategoryModal {
  category?: ICategory;
  onPickSubCategory: (item: string) => void;
  open: boolean;
  onClose: () => void;
}

export const SubCategoryModal = ({ category, onPickSubCategory, open, onClose }: ISubCategoryModal) => {
  const items = !!category ? category.subCategories : [];

  if (!items || !items.length || !open) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={open}
    >
      <View style={styles.container}>
        <View style={styles.backButtonContainer}>
          <TouchableHighlight onPress={onClose}>
            <Icon name="close" size={30} color={getTheme().underlayColor} />
          </TouchableHighlight>
          <Text style={styles.titleText}>{category!.title}</Text>
        </View>
        {
          items.map((item, index) => (
            <TouchableHighlight
              key={index}
              onPress={() => onPickSubCategory(item)}
              style={styles.buttonContainer}
              underlayColor={getTheme().backgroundMainColor}
            >
              <View style={[styles.buttonStyle, { backgroundColor: category!.color }]}>
                <Text style={styles.buttonText}>{item}</Text>
              </View>
            </TouchableHighlight>
          ))
        }
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingTop: 30,
    flexWrap: 'wrap'
  },
  backButtonContainer: {
    width: '90%',
    paddingBottom: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1
  },
  titleText: {
    marginLeft: 30,
    fontSize: 18,
    color: getTheme().textSecondaryColor,
    marginBottom: 2 
  },
  buttonContainer: {
    height: 90,
    width: '50%'
  },
  buttonText: {
    color: getTheme().backgroundMainColor
  },
  buttonStyle: {
    flex: 1,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 15,
    borderRadius: 10,
    padding: 10
  }
});