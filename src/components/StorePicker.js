import React, { Fragment } from "react";
import { getFunName} from "../helpers";
import PropTypes from "prop-types";

class StorePicker extends React.Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func
        })
    }
    myInput = React.createRef();

    goToStore = event => {
        event.preventDefault();
        const storeName = this.myInput.current.value;
        this.props.history.push(`/store/${storeName}`);
    };

      render() {
        return (
            <form className="store-selector" onSubmit={this.goToStore}>
                <h2>Please eneter a store</h2>
                <input 
                    type="text" 
                    ref={this.myInput}
                    required 
                    placeholder="Store Name" 
                    defaultValue={getFunName()} 
                />
                <button type="submit">Visit Store -></button>
            </form>
        );
  }
}

export default StorePicker;
