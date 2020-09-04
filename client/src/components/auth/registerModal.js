import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { register } from '../../actions/auth';
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

export class registerModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    //PASSWORD 2 = CONFIRMATION?
    msg: null,
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;

    if (error !== prevProps.error) {
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
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

    const { name, email, password } = this.state;

    //Create User Object
    const newUser = {
      name,
      email,
      password,
    };

    //Attempt to register
    this.props.register(newUser);
  };

  render() {
    return (
      <Fragment>
        <button className='regBtn' onClick={this.toggle}>
          Login
        </button>
        <Modal isOpen={this.props.isOpen} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle} className='modalI'>
            Please fill out the fields below.
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

export default connect(mapStateToProps, { register, clearErrors })(
  registerModal,
);
