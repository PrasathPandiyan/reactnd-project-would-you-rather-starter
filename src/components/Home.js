import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import QuestionList from './QuestionList';
class Home extends Component {

    state = {
        toggle: 1,
    };

    componentWillMount() {
        console.log('I am here');
        if (!this.props.authedUser) {
            this.props.history.push('/login');
        }
    }
    clickTab(selectedTab) {
        if(!(selectedTab === this.state.toggle)) {
            this.setState({toggle: selectedTab})
        }
    }
    render() {
        const { loading , unansweredQuestions, answeredQuestions} = this.props;
        return (
            <Fragment>
                {loading === true
                    ? null
                    : (
                        <Fragment>
                            <ul className='tabrow'>
                                <li className={this.state.toggle === 1 ? 'selected active': ''}
                                    onClick={() => { this.clickTab(1)}}
                                ><a href="#">Unanswered</a>
                                </li>
                                <li className={this.state.toggle === 2 ? 'selected active': ''}
                                    onClick={() => { this.clickTab(2)}}
                                ><a href="#">Answered</a></li>
                            </ul>
                            <div>
                                {this.state.toggle === 1 ?
                                    (<QuestionList questions={unansweredQuestions} />) : ''
                                }
                                {this.state.toggle === 2 ?
                                    (<QuestionList questions={answeredQuestions} />) : ''
                                }
                            </div>
                        </Fragment>
                    )}
            </Fragment>

        )
    }
}

function mapStateToProps (state) {
    const { authedUser, questions, users } = state;
    const answeredQuestions = Object.keys(users[authedUser].answers)
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
    const unansweredQuestions = Object.keys(questions).filter(question => !answeredQuestions.includes(question))
        .sort((a,b) => questions[b].timestamp - questions[a].timestamp);
    return {
        authedUser,
        loading: Object.keys(questions).length === 0,
        questions,
        answeredQuestions,
        unansweredQuestions

    }
}

export default connect(mapStateToProps)(Home)