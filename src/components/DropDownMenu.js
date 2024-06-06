import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';

const DropDownMenu = ({ options, onSelect }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setShowOptions(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowOptions(true)} style={styles.button}>
        <Text style={styles.buttonText}>Select an Option</Text>
      </TouchableOpacity>
      
      <Modal
        visible={showOptions}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowOptions(false)}
      >
        <View style={styles.modalContainer}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={styles.option}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: '#DDDDDD',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    width: '100%',
    alignItems: 'center',
  },
});




export default DropDownMenu;