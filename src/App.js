import React, {Component} from 'react';

import axios from 'axios';
import Currency from './currency';
import Base from './base';
import Detail from './detail';
import New from './new';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.activeCurrencies = [
      'USD',
      'CAD',
      'IDR',
      'GBP',
      'CHF',
      'SGD',
      'INR',
      'MYR',
      'JPY',
      'KRW',
    ];

    this.state = {
      rates: {},
      currentValue: 1.00,
      baseCurrency: 'USD',
      currencies: [],
      showChangeCurrentValue: false,
      showAddNewCurrencyForm: false,
      valueNewCurrency: 'AUD',
    };
  }

  componentDidMount() {
    this.setCurrenciesList();
  }

  setCurrenciesList() {
    const currency = Currency;
    let currencies = [];

    axios
      .get(
        `https://exchangeratesapi.io/api/latest?base=` + this.state.baseCurrency
      )
      .then(res => {
        const {rates} = res.data;
        if (Object.keys(rates).length) {
          for (let i = 0; i < this.activeCurrencies.length; i++) {
            let obj = {
              id: this.activeCurrencies[i],
              rate: rates[this.activeCurrencies[i]],
              name: currency[this.activeCurrencies[i]],
            };
            currencies.push(obj);
          }
        }
        this.setState({currencies: currencies, rates: rates});
      })
      .catch((err) => {alert(err)})
  }

  removeOnListCurrencies(idx) {
    const {currencies} = this.state;
    if (idx > -1) {
      currencies.splice(idx, 1);
      this.activeCurrencies.splice(idx, 1);
      this.setState({currencies: currencies});
    }
  }

  changeDisplayChangeCurrentValue(){
    this.setState({showChangeCurrentValue: !this.state.showChangeCurrentValue})
  }

  changeValue(event) {
    const currentValue = parseInt(event.target.value, 10);
    if (currentValue > 0) {
      this.setState({currentValue: currentValue});
    } else {
      this.setState({currentValue: 1});
    }
  }

  changeDisplayAddNewCurrencyForm(){
    this.setState({ showAddNewCurrencyForm: !this.state.showAddNewCurrencyForm })
  }

  selectValueNewCurrency(event){
    this.setState({ valueNewCurrency: event.target.value });
  }

  addNewCurrency(){
    const {valueNewCurrency, currencies, rates} = this.state
    const currency = Currency
    if (this.activeCurrencies.includes(valueNewCurrency)) {
      alert('Currency is already added');
    } else{
      let obj = {
        id: valueNewCurrency,
        rate: rates[valueNewCurrency],
        name: currency[valueNewCurrency],
      };
      this.activeCurrencies.push(obj.id)
      currencies.push(obj)
      this.setState(
        { currencies: currencies }
      )
      this.changeDisplayAddNewCurrencyForm()
    }
  }

  render() {
    const { currentValue, baseCurrency, currencies, showChangeCurrentValue, showAddNewCurrencyForm, valueNewCurrency} = this.state;
    const currency = Currency;
    const currencyList = Object.keys(currency);

    return (
      <div className="App">
        <h1 className="title">
          Foreign Exchange Currency App
          </h1>
        <div className="body">
          <Base
            currency={currency}
            currentValue={currentValue}
            baseCurrency={baseCurrency}
            showChangeCurrentValue={showChangeCurrentValue}
            changeValue={this.changeValue.bind(this)}
            changeDisplayChangeCurrentValue={this.changeDisplayChangeCurrentValue.bind(this)}
          />            
          {currencies.length > 0 &&
            currencies.map((currency, index) => {
              return (
                <div key={index} className="box">
                  <Detail
                    index={index}
                    currency={currency}
                    currentValue={currentValue}
                    baseCurrency={baseCurrency}
                  />
                  <div
                    className="remove"
                    onClick={() => this.removeOnListCurrencies(index)}>
                    x
                  </div>
                </div>
              );
            })}
          <New
            valueNewCurrency={valueNewCurrency}
            currencyList={currencyList}
            selectValueNewCurrency={this.selectValueNewCurrency.bind(this)}
            showAddNewCurrencyForm={showAddNewCurrencyForm}
            addNewCurrency={this.addNewCurrency.bind(this)}
            changeDisplayAddNewCurrencyForm={this.changeDisplayAddNewCurrencyForm.bind(this)}
            />
          
        </div>
      </div>
    );
  }
}

export default App;
