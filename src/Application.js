import React, {Component} from 'react';
import CalcButton from './CalcButton';
import './css/style.css';

class Application extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accArgument: 0,
            curOperator: "",
            isSignPositive: true,
            isDisplayShowingResult: true,
            curDisplayText: "0"
        }
    }

    handleAllClear = (e) => {
        //console.log("Event is", e);
        //console.log("All Clear Button has been pressed");
        this.setState({
            accArgument: 0,
            curOperator: "",
            isSignPositive: true,
            isDisplayShowingResult: true,
            curDisplayText: "0"
        })
    }

    handleToggleSign = (target) => {
        //console.log("Event is", e);
        //console.log("Toggle Sign Button has been pressed");
        if (this.state.curDisplayText === "0" || this.state.curDisplayText === "0.") {
            this.setState({
                isSignPositive: true
            });
        }
        else {
            this.setState({
                isSignPositive: !this.state.isSignPositive
            });
        }
    }

    handlePercentage = (target) => {
        //console.log("Event is", e);
        //console.log("Percentage Button has been pressed");
        if (this.state.curDisplayText === "0" || this.state.curDisplayText === "0.") {
            // Ignore percentage character if no current non-zero argument.
            return;
        }
        else {
            // Divide argument by 100  ==>  Convert to number, divide by 100, convert to text ???
            var result = 0;
            var isResultSignPositive = true;

            result = Number(this.state.curDisplayText);
            if (!this.state.isSignPositive) { result = -1 * result; }

            result = result / 100;

            if (Math.sign(result) < 0)
            {
                isResultSignPositive = false;           
            }
            else {
                isResultSignPositive = true;
            }
            result = Math.abs(result);

            this.setState({
                curDisplayText: String(result),
                isSignPositive: isResultSignPositive
            });  
        }
    }

    handleDigitInput = (target) => {
        //console.log("Event is", e);
        //console.log("Digits Button has been pressed: " + target);
        var curDisplayText = this.state.curDisplayText;

        console.log("isDisplayShowingResult: " + this.state.isDisplayShowingResult);

        if (curDisplayText === "0" || this.state.isDisplayShowingResult) {
            console.log("Replace display by digit...")
            // Replace display by digit.
            this.setState({
                curDisplayText: target,
                isSignPositive: true,
                isDisplayShowingResult: false
            });
        }
        else {
            console.log("Add digit to display...")
            // Add digit to display.
            this.setState({
                curDisplayText: this.state.curDisplayText + target,
                isDisplayShowingResult: false
            });
        }
    }

    handleDotInput = (target) => {
        //console.log("Event is", e);
        //console.log("Dot Button has been pressed: " + target);

        if (!this.state.isDisplayShowingResult) {
            if (this.state.curDisplayText.indexOf('.') !== -1) {
                // Ignore dot character if already pressed before.
                return;
            }
            else {
                // No dot character pressed before.
                if (this.state.curDisplayText === "") {
                    // Add prefix "0" with dot character.
                    this.setState({
                        curDisplayText: "0."
                    });
                }
                else {
                    // Add dot character.
                    this.setState({
                        curDisplayText: this.state.curDisplayText + "."
                    });
                }
            }
        }
    }

    handleOperatorInput = (target) => {
        //console.log("Event is", e);
        //console.log("Operator or Equal Button has been pressed: " + target);
        var result = 0;
        var isResultSignPositive = true;
        var newOperator = target;
        if (target === "=") { newOperator = ""; }
        var accArgument = Number(this.state.accArgument);
        var curArgument = Number(this.state.curDisplayText);
        if (!this.state.isSignPositive) { curArgument = -1 * curArgument; }

        console.log("current operator: " + this.state.curOperator);
        // Calculate result using previously stored operator.
        if (this.state.curOperator === "/") {
            // Divide accArgument by curArgument. Store result in accArgument.
            result = accArgument / curArgument;
            console.log("Result: " + result + " <<<<<< " + accArgument + " / " + curArgument);
        }
        else {
            if (this.state.curOperator === "X") {
                // Multiply accArgument and curArgument. Store result in accArgument.
                result = accArgument * curArgument;
                console.log("Result: " + result + " <<<<<< " + accArgument + " * " + curArgument);
            }
            else {
                if (this.state.curOperator === "+") {
                    // Add accArgument and curArgument. Store result in accArgument.
                    result = accArgument + curArgument;
                    console.log("Result: " + result + " <<<<<< " + accArgument + " + " + curArgument);
                }
                else {
                    if (this.state.curOperator === "-") {
                        // Subtract curArgument from accArgument. Store result in accArgument.
                        result = accArgument - curArgument;
                        console.log("Result: " + result + " <<<<<< " + accArgument + " - " + curArgument);
                    }
                    else {
                        // No current operator. Store curArgument as result in accArgument.
                        result = curArgument;
                        console.log("Result: " + result + " <<<<<< " + curArgument);
                    }
                }
            }
        }

        // Determine new sign and curArgument based on result.
        if (Math.sign(result) < 0) {
            isResultSignPositive = false;           
        }
        else {
            isResultSignPositive = true;
        }
        curArgument = Math.abs(result);
        
        this.setState({
            accArgument: String(result),
            isSignPositive: isResultSignPositive,
            curDisplayText: curArgument,
            curOperator: newOperator,
            isDisplayShowingResult: true
        });
    }

    render() {
        let {curDisplayText} = this.state;

        var curSign;
        if (this.state.isSignPositive) {
            curSign = "";
        }
        else {
            curSign = "-";
        }

        return (
            <div className="container">
                <div className="Row1">
                    {curSign}{curDisplayText}
                </div>

                <div className="Row2">
                    <CalcButton 
                        buttonText={"AC"}
                        buttonFunction={"AC"}
                        onButtonPressed={this.handleAllClear}
                        className="special"
                    />
                    <CalcButton 
                        buttonText="&plusmn;"
                        buttonFunction={"+"}
                        onButtonPressed={this.handleToggleSign}
                        className="special"
                    />
                    <CalcButton 
                        buttonText={"%"}
                        buttonFunction={"%"}
                        onButtonPressed={this.handlePercentage}
                        className="special"
                    />
                    <CalcButton 
                        buttonText="&divide;"
                        buttonFunction={"/"}
                        onButtonPressed={this.handleOperatorInput}
                        className="operator"
                    />
                </div>

                <div className="Row3">
                    <CalcButton 
                        buttonText={"7"}
                        buttonFunction={"7"}
                        onButtonPressed={this.handleDigitInput}
                        className="digit"
                    />
                    <CalcButton 
                        buttonText={"8"}
                        buttonFunction={"8"}
                        onButtonPressed={this.handleDigitInput}
                        className="digit"
                    />
                    <CalcButton 
                        buttonText={"9"}
                        buttonFunction={"9"}
                        onButtonPressed={this.handleDigitInput}
                        className="digit"
                    />
                    <CalcButton 
                        buttonText="&times;"
                        buttonFunction={"X"}
                        onButtonPressed={this.handleOperatorInput}
                        className="operator"
                    />
                </div>

                <div className="Row4">
                    <CalcButton 
                        buttonText={"4"}
                        buttonFunction={"4"}
                        onButtonPressed={this.handleDigitInput}
                        className="digit"
                    />
                    <CalcButton 
                        buttonText={"5"}
                        buttonFunction={"5"}
                        onButtonPressed={this.handleDigitInput}
                        className="digit"
                    />
                    <CalcButton 
                        buttonText={"6"}
                        buttonFunction={"6"}
                        onButtonPressed={this.handleDigitInput}
                        className="digit"
                    />
                    <CalcButton 
                        buttonText={"-"}
                        buttonFunction={"-"}
                        onButtonPressed={this.handleOperatorInput}
                        className="operator"
                    />
                </div>

                <div className="Row5">
                    <CalcButton 
                        buttonText={"1"}
                        buttonFunction={"1"}
                        onButtonPressed={this.handleDigitInput}
                        className="digit"
                    />
                    <CalcButton 
                        buttonText={"2"}
                        buttonFunction={"2"}
                        onButtonPressed={this.handleDigitInput}
                        className="digit"
                    />
                    <CalcButton 
                        buttonText={"3"}
                        buttonFunction={"3"}
                        onButtonPressed={this.handleDigitInput}
                        className="digit"
                    />
                    <CalcButton 
                        buttonText={"+"}
                        buttonFunction={"+"}
                        onButtonPressed={this.handleOperatorInput}
                        className="operator"
                    />
                </div>

                <div className="Row6">
                    <CalcButton 
                        buttonText={"0"}
                        buttonFunction={"0"}
                        onButtonPressed={this.handleDigitInput}
                        className="digitBig"
                    />
                    <CalcButton 
                        buttonText="&sdot;"
                        buttonFunction={"."}
                        onButtonPressed={this.handleDotInput}
                        className="digit"
                    />
                    <CalcButton 
                        buttonText={"="}
                        buttonFunction={"="}
                        onButtonPressed={this.handleOperatorInput}
                        className="operator"
                    />
                </div>

            </div>
        );
    }
}

export default Application;
