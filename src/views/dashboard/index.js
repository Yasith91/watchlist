import {
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import {
  getTwelveData,
  setNewData,
  removeData,
} from '../../store/twelveData/actions';
import styles from './dashboard.styles';

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
  const [refreshSocket, setRefreshSocket] = useState(false);

  useEffect(() => {
    const addedSymbols = Object.keys(data).toString();
    if (addedSymbols) {
      apiCall.params.symbols = addedSymbols;
    }
  }, [data]);

  useEffect(() => {
    let ws = new WebSocket(
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
    setRefreshSocket(false);
  }, [dispatch, refreshSocket]);

  const onAddSymbol = () => {
    if (symbol) {
      dispatch(getTwelveData(symbol));
      setRefreshSocket(true);
    }
  };

  const refreshData = refreshSymbol => {
    setSymbol(refreshSymbol);
    onAddSymbol();
  };

  const removeDataClick = refreshSymbol => {
    setRefreshSocket(true);
    dispatch(removeData(refreshSymbol));
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
                      <TouchableHighlight
                        style={styles.refresh}
                        onPress={() => removeDataClick(values[0])}>
                        <View>
                          {/* Icon goes here and then remove Text */}
                          {/* <Icon /> */}
                          <Text style={styles.removeBtn}>Remove</Text>
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
