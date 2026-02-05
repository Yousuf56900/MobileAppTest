const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
    paddingHorizontal: 12,
  },
  search: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginVertical: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
    fontSize: 16,
  },
})

export default styles