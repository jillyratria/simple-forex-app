import React, { Component } from 'react';
import './new.css';

class New extends Component {
  render() {
    const { valueNewCurrency, currencyList, selectValueNewCurrency, showAddNewCurrencyForm, addNewCurrency, changeDisplayAddNewCurrencyForm} = this.props;
    return (
      <div className="box">
        <div className="orangeBox add">
          <div className="orangeBox__title add__title">
            <p>NEW</p>
          </div>
          <div className="orangeBox__body add__body">
            {
              showAddNewCurrencyForm ? (
                <div className="add__body-form">
                  <select value={valueNewCurrency} className="add__body-select" onChange={selectValueNewCurrency}>
                    {currencyList.map(option => {
                      return <option value={option} key={option} >{option}</option>
                    })}
                  </select>
                  <button className="orangeBox__button" onClick={addNewCurrency}>Add</button>
                </div>
              ) : (
                  <button className="orangeBox__button" onClick={changeDisplayAddNewCurrencyForm}>Add New Currency</button>
                )
            }
          </div>
        </div>
      </div>
    )
  }
}

export default New