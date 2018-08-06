import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { createQuestion } from '../actions/shared';

class NewQuestion extends Component {

    state= {
        optionTwo: '',
        optionOne: '',
    };
    onChange1 = (e) => {
       this.setState({optionOne: e.target.value})
    };
    onChange2 = (e) => {
        this.setState({optionTwo: e.target.value})
    };
    onClick = (e) => {
        const { authedUser, dispatch, user } = this.props;
        e.preventDefault();
        dispatch(createQuestion
        ({author: authedUser, optionOneText: this.state.optionOne, optionTwoText: this.state.optionTwo}, user)).then(
        this.props.history.push(`/home/${authedUser}`));
    };
   render() {
       return (
           <div className='tweet'>
             <div className='col-md-12'>
                 <div className='col-md-9 col-md-offset-3 content'>
                    <input type="text" id="optionOne" className='inputText'name="optionOne" onChange={this.onChange1} value={this.state.optionOne}/>
                 </div>
                 <div className='col-md-9 col-md-offset-3 content'>
                    <input type="text" id="optionTwo" className='inputText' name="optionTwo" onChange={this.onChange2} value={this.state.optionTwo}/>
                 </div>
                <div className='btnHead'>
                    <button onClick={this.onClick} className="btn"> Submit Poll </button>
                </div>
             </div>
           </div>
        )
       }
}

function mapStateToProps ({authedUser, users}) {
    return {
        authedUser,
        user: users[authedUser],
    }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))