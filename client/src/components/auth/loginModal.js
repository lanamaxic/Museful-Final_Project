import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { login } from '../../actions/auth';
import { clearErrors } from '../../actions/errorAction';

//DEV
import { v4 as uuid } from 'uuid';

//STYLE
import {
  Alert,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from 'reactstrap';

export class loginModal extends Component {
  state = {
    modal: false,
    email: '',
    password: '',
    //PASSWORD 2 = CONFIRMATION?
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'LOGIN_FAIL') {
        this.setState({ msg: error.msg.errors });
      } else {
        this.setState({ msg: null });
      }
    }
    //If authenticated close modal
    if (this.state.modal) {
      if (isAuthenticated) {
        this.toggle();
      }
    }
  }

  toggle = () => {
    //Clear Errors
    this.props.clearErrors();

    this.setState({
      modal: !this.state.modal,
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <Fragment>
        <button className='btnI' onClick={this.toggle}>
          Login
        </button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className='modalI'>
            Login
          </ModalHeader>
          <ModalBody>
            {this.state.msg
              ? this.state.msg.map((error) => (
                  <Alert key={uuid()} color='danger'>
                    {error.msg}
                  </Alert>
                ))
              : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name'
                  onChange={this.onChange}
                  className='mb-3'
                />
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  onChange={this.onChange}
                  className='mb-3'
                />
                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  className='mb-3'
                  onChange={this.onChange}
                />
                <Button color='dark' style={{ marginTop: '2rem' }} block>
                  <Link to='/dashboard'>Register</Link>
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { login, clearErrors })(loginModal);
