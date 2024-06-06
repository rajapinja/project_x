import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

const CustomTooltip = ({ visible, content, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
            <Text>{content}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default CustomTooltip;
