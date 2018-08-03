import React, { Component } from 'react';
import './detail.css';

class Detail extends Component{
  render(){
    const {currency, currentValue, baseCurrency} = this.props;
    const {id, name, rate} = currency;

    return (
      <div className="detail">
        <div className="detail__header">
          <p className="detail__header-number">
            {
              Number(currentValue * rate).toFixed(2)
            }
          </p>
          <p className="detail__header-id">
            {id}
          </p>
        </div>
        <div className="detail__body">
          <p className="detail__body-name">
            {name}
          </p>
          <p className="detail__body-rate">{Number(rate).toFixed(2)} <span className="detail__body-per"> / {baseCurrency}</span></p>           
          
        </div>
        
      </div>
    )
  }
}

export default Detail