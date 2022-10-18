import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'black',
    height: '100%',
  },
  container: {},
  box: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: 'black',
    color: 'white',
    padding: 10,
    margin: 0,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.7,
  },
  title: {
    color: 'white',
    fontSize: 15,
  },
  textInput: {
    color: 'white',
    backgroundColor: 'gray',
    margin: 2,
    borderRadius: 10,
    fontSize: 20,
  },
  date: {
    color: 'gray',
  },
  refreshBtn: {
    color: 'green',
    right: 0,
    textAlign: 'right',
  },
  removeBtn:{
    color: 'red',
    right: 0,
    textAlign: 'right',
  },
  price: {
    color: 'white',
    fontSize: 20,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'white',
    margin: 10,
  },
  btn: {
    margin: 5,
    borderRadius: 10,
    with: '50%',
    fontSize: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default styles;
