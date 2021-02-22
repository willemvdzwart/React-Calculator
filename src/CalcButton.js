import React, {Component} from 'react';

class CalcButton extends Component {

    render() {
        return (
            <div>
                <button className={this.props.className} onClick={() => this.props.onButtonPressed(this.props.buttonFunction)}>
                    <span className="innerButtonText">
                        {this.props.buttonText}
                    </span>
                </button>
            </div>
        ) 
    }
}

export default CalcButton;
