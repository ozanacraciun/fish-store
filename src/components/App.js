import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  state = {
    fishes: {},
    order: {}
  };
static propTypes = {
  match: PropTypes.object
};

  componentDidMount() {
    const { params } = this.props.match;
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
        this.setState({order: JSON.parse(localStorageRef)})
    }
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate() {
    console.log(this.state.order);
    localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
}

  componentWillUnmount() {
      base.removeBinding(this.ref);
  }

  addFish = fish => {
    //Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    //Add a new fish to the fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // set the new fishes to state
    this.setState({ fishes });
  };

  updateFish =(key, updatedFish) => {
    //take a copy of the current state
    const fishes = { ...this.state.fishes};
    // update that state
    fishes[key] = updatedFish;
    //set that to state
    this.setState({fishes});
  }

  deleteFish = key => {
    //take a copy of state
    const fishes = {...this.state.fishes};
    //update the state
    fishes[key] = null;
    //update state
    this.setState({ fishes });
  }

  loadSampleFishes = () => {
    console.log(sampleFishes);
    this.setState({ fishes: sampleFishes });
  };

  addToOrder = key => {
    //take a copy of state
    const order = { ...this.state.order };
    //update the nr
    order[key] = order[key] + 1 || 1;
    //call setState to update our state object
    this.setState({ order });
  };

  removeFromOrder = key => {
    //take a copy of state
    const order = { ...this.state.order };
    //remove item from order
    delete order[key]; 
    //call setState to update our state object
    this.setState({ order });
  };

  render() {
    const { fishes } = this.state;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(fishes).map(key => {
              return (
                <Fish
                  key={key}
                  index={key}
                  details={fishes[key]}
                  addToOrder={this.addToOrder}
                />
              );
            })}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder} />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
