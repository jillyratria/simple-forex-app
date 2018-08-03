import React, { Component } from 'react';
import './base.css';

class Base extends Component {
  render() {
    const {currency, currentValue, baseCurrency, showChangeCurrentValue, changeValue, changeDisplayChangeCurrentValue} = this.props;
    return (
      <div className="box">
        <div className="orangeBox base">
          <div className="orangeBox__title base__title">
            <p>BASE</p>
          </div>
          <div className="orangeBox__body base__body">
            <p>Value:</p>
            <div className="base__body-wrapper">
              {
                showChangeCurrentValue ? (
                  <input
                    className="base__body-input-value"
                    type="number"
                    min={1}
                    value={currentValue}
                    onChange={changeValue}
                  />
                ) : (
                    <p className="base__body-value">{Number(currentValue).toFixed(2)}</p>
                  )
              }
              <button className="orangeBox__button" onClick={changeDisplayChangeCurrentValue}>{showChangeCurrentValue ? 'Close' : 'Change'}</button>
            </div>

            <p>Currency:</p>
            <p className="base__body-currency">
              {baseCurrency} ({currency[baseCurrency]})
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default Base