import {
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { getTwelveData, setNewData } from '../../store/twelveData/actions';

let apiCall = {
  action: 'subscribe',
  params: {
    symbols: 'AAPL',
  },
};

export default function MyApp() {
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.twelveData);
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    const addedSymbols = Object.keys(data).toString();
    if (addedSymbols) {
      apiCall.params.symbols = addedSymbols;
    }
  }, [data]);

  useEffect(() => {
    var ws = new WebSocket(
      'wss://ws.twelvedata.com/v1/quotes/price?apikey=9a9ba629df204491913bcf9069077593',
    );
    ws.onopen = () => {
      ws.send(JSON.stringify(apiCall));
    };
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);
      try {
        if (json.event === 'price') {
          dispatch(setNewData(json));
        }
        if (json.event === 'subscribe-status') {
          console.log('subscribe-status', json);
        }
      } catch (err) {
        console.log(err);
      }
    };
    ws.onerror = e => {
      // an error occurred
      console.log('error', e);
    };
    ws.onclose = e => {
      // connection closed
      console.log('close', e, e.reason);
    };
  }, [dispatch]);

  const onAddSymbol = () => {
    if (symbol) {
      dispatch(getTwelveData(symbol));
    }
  };

  const refreshData = refreshSymbol => {
    setSymbol(refreshSymbol);
    onAddSymbol();
  };

  return (
    <View style={styles.mainContainer}>
      <TextInput
        style={styles.textInput}
        onChangeText={setSymbol}
        value={symbol}
        placeholder="Type relevant symbol"
      />
      <Button style={styles.btn} title="Add Symbol" onPress={onAddSymbol} />
      <View>
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            {Object.entries(data).map(values => {
              if (values[1] && values[1][0]) {
                const date = values[1][0].timestamp
                  ? moment(values[1][0].timestamp, 'X').format(
                      'YYYY-MM-DD HH:mm:ss',
                    )
                  : values[1][0].datetime;
                return (
                  <View style={styles.box}>
                    <View>
                      <Text style={styles.title}>{values[0]}</Text>
                      <Text style={styles.date}>{date}</Text>
                    </View>
                    <View>
                      <Text style={styles.price}>
                        {values[1][0].close || values[1][0].price}
                      </Text>
                      <TouchableHighlight
                        style={styles.refresh}
                        onPress={() => refreshData(values[0])}>
                        <View>
                          {/* Icon goes here and then remove Text */}
                          {/* <Icon /> */}
                          <Text style={styles.refreshBtn}>Refresh</Text>
                        </View>
                      </TouchableHighlight>
                    </View>
                  </View>
                );
              }
              return null;
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

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
    // fontStyle: 'bold',
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