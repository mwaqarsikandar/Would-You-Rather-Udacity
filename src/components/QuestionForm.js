import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavigationBar from './NavigationBar';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Container, Col, Form } from 'react-bootstrap'
import { handleSaveQuestion } from '../actions/shared'

class QuestionForm extends Component {
    state = {
        optionone: null,
        optiontwo: null
    }
    handleChange1 = (e) => {
        this.setState({
            optionone: e.target.value
        })
    }
    handleChange2 = (e) => {
        this.setState({
            optiontwo: e.target.value
        })
    }
    toonSubmit = (e) => {
        e.preventDefault()
        this.props.dispatch(handleSaveQuestion(this.props.authedUser, this.state.optionone, this.state.optiontwo))
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                <NavigationBar />
                <Container>
                <Col xs={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Would you Rather...</Card.Title>
                            <Form>
                                <Form.Group controlId="users">
                                <Form.Control onChange={this.handleChange1} type="text" placeholder="Option 1" />
                                <span>Or</span>
                                <Form.Control onChange={this.handleChange2} type="text" placeholder="Option 2" />
                                </Form.Group>
                                <Button variant="primary" onClick={this.toonSubmit} block>Add</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Container>
            </div>
        )
    }
}

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default connect(mapStateToProps)(QuestionForm)