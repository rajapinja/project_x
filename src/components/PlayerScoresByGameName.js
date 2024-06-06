import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const PlayerScoresByGameName = ({ playerScores }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
       <View style={styles.dataRow}>
            <Text style={styles.dataCellName}>{item.name}</Text>          
            <Text style={styles.dataCellName}>{item.game_name}</Text>
            <Text style={styles.dataCellName}>{item.total_score}</Text>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={styles.rowWrapper}>
                <FlatList
                    style={styles.flatListWrapper}
                    data={playerScores}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                    ListHeaderComponent={() => (
                        <View style={styles.headerRow}>
                            <Text style={styles.headerCell}>Player Name</Text>
                            <Text style={styles.headerCell}>Gane Name</Text>
                            <Text style={styles.headerCell}>Score</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View style={styles.container}>
                            <Text>No Game- Player scores found</Text>
                        </View>
                    )}
                />
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
},
  dataCell: {
    flex: 1,
    textAlign: 'center',
},
dataCellName: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0c2f96',
    fontSize: 16,
},
dataCellBold: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
},
flatListWrapper: {
    flex: 1,
    marginBottom: 10,
},
rowWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Allow content to wrap
}
});

export default PlayerScoresByGameName;
