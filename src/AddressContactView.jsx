import React, { Component } from 'react';
import ReactGoogleMap from './ReactGoogleMap.jsx'
import './style.scss'

class AddressContactView extends Component {
  constructor() {
    super()
    this.state = {
      isShow: false,
      currentStore: -1,
      latCenter: null,
      lngCenter: null
    }
  }

  handleClick = () => {
    this.setState({
      isShow: !this.state.isShow
    })
  }

  handleItemClick = (storeId) => {
    if (storeId === - 1)
      this.setState({
        currentStore: storeId,
        latCenter: null,
        lngCenter: null
      })
    else if (storeId === 0) {
      this.setState({
        currentStore: storeId,
        latCenter: 10.846553,
        lngCenter: 106.643971
      })
    } else if (storeId === 1)
      this.setState({
        currentStore: storeId,
        latCenter: 10.845113,
        lngCenter: 106.624355
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Click Me</button>
        {
          this.state.isShow &&
          (<div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <span className="close" onClick={this.handleClick}>&times;</span>
              </div>
              <div className="modal-body">
                <div className="map"><ReactGoogleMap latCenter={this.state.latCenter} lngCenter={this.state.lngCenter} /></div>
                <div className="shop-list">
                  <div className="map-list">
                    <h3>Shop List</h3>
                    <ul>
                      <li>
                        <div className={"map-el " + (this.state.currentStore === 0 ? "active" : "")} data-key="16" onClick={() => this.handleItemClick(0)}>
                          <div className="map-num"><span>1</span></div>
                          <div className="map-info">
                            <span className="map-address">Store Ngã 3 Cây Trâm</span>

                          </div>
                        </div>
                      </li>
                      <li>
                        <div className={"map-el " + (this.state.currentStore === 1 ? "active" : "")} data-key="16" onClick={() => this.handleItemClick(1)}>
                          <div className="map-num"><span>2</span></div>
                          <div className="map-info">
                            <span className="map-address">Store Chợ An Sương</span>

                          </div>
                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>)
        }
      </div>
    );
  }
}

export default AddressContactView;