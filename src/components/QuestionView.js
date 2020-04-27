import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Form, Button, Col, ProgressBar, Badge } from 'react-bootstrap'
import NavigationBar from './NavigationBar'
import '../css/questionView.css'
import { handleAnswer } from '../actions/shared';

class QuestionView extends Component {
    state = {
        selectValue : null
    }
    handleChange = (e) => {
        this.setState({
            selectValue: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(handleAnswer(this.props.authedUser, this.props.match.params.id, this.state.selectValue))
    }
    render() {
        if(this.props.error) {
            return (
                <Container>
                    <Col>
                        <h1>404</h1>
                        <p>Sorry This is page not found</p>
                    </Col>
                </Container>
            )
        }

        let quest = this.props.q ? this.props.q : ''
        let answerMarkOpOne = this.props.q ? this.props.q.optionOne.votes.includes(this.props.authedUser) : null
        let answerMarkOpTwo = this.props.q ? this.props.q.optionTwo.votes.includes(this.props.authedUser) : null
        return (
            <div>
                <NavigationBar />
                <Container>
                    {answerMarkOpOne === true || answerMarkOpTwo === true ? (
                        <Col xs={6} md={6}>
                            <Card>
                                <Card.Img variant="top" src={this.props.author.avatarURL} />
                                <Card.Body>
                                    <Card.Title>Asked by {this.props.author.name}</Card.Title>
                                    <Card.Text>
                                        Results:
                                    </Card.Text>
                                    <div>
                                        <div className="cell">
                                            <div>
                                                {answerMarkOpOne ? (
                                                    <Badge pill variant="warning">
                                                        Your Vote
                                                    </Badge>
                                                ) : ' '}
                                            </div>
                                            Would you rather {quest ? quest.optionOne.text : ''}
                                            <ProgressBar now={quest ? (quest.optionOne.votes.length / (quest.optionOne.votes.length + quest.optionTwo.votes.length)) * 100 : ''}
                                                label={`${quest ? (quest.optionOne.votes.length / (quest.optionOne.votes.length + quest.optionTwo.votes.length)) * 100 : ''}%`} />
                                            <p>{quest ? `${quest.optionOne.votes.length} out of ${quest.optionTwo.votes.length + quest.optionOne.votes.length}` : ' '}</p>
                                        </div>
                                        <div className="cell">
                                            <div>
                                                {answerMarkOpTwo ? (
                                                    <Badge pill variant="warning">
                                                        Your Vote
                                                    </Badge>
                                                ) : ' '}
                                            </div>
                                            Would you rather {quest ? quest.optionTwo.text : ''}
                                            <ProgressBar now={quest ? (quest.optionOne.votes.length / (quest.optionOne.votes.length + quest.optionTwo.votes.length)) * 100 : ''}
                                                label={`${this.props.q ? (quest.optionTwo.votes.length / (quest.optionOne.votes.length + quest.optionTwo.votes.length)) * 100 : ''}%`} />
                                            <p>{quest ? `${quest.optionTwo.votes.length} out of ${quest.optionTwo.votes.length + quest.optionOne.votes.length}` : ' '}</p>
                                        </div>
                                    </div>

                                </Card.Body>
                            </Card>
                        </Col>
                    ) : (
                            <Col xs={6} md={6}>
                                <Card>
                                    <Card.Img variant="top" src={this.props.author.avatarURL} />
                                    <Card.Body>
                                        <Card.Title>{this.props.author.name} asks</Card.Title>
                                        <Card.Text>
                                            Would you rather
                                        </Card.Text>
                                        <Form.Group>
                                        <div className="mb-3">
                                            <Form.Check
                                                type="radio"
                                                name="select"
                                                label={quest ? quest.optionOne.text : ''}
                                                onChange={this.handleChange}
                                                value="optionOne"
                                            />

                                            <Form.Check
                                                type="radio"
                                                name="select"
                                                label={quest ? quest.optionTwo.text : ''}
                                                onChange={this.handleChange}
                                                value="optionTwo"
                                            />
                                        </div>
                                        </Form.Group>
                                        <Button variant="primary" block onClick={this.onSubmit}>Submit</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )}
                </Container>
            </div>
        )
    }
}

function mapStateToProps({ users, questions, authedUser }, { match }) {
    if(questions[match.params.id] === undefined) {
        const error = true;
        return {
            error
        }
    }

    let q = questions[match.params.id]
    let author = q ? users[q.author] : ''
    return {
        q: questions[match.params.id],
        author,
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionView)