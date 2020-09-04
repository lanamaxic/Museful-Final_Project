import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

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

const RegisterModalF = ({ clearErrors, register }) => {
  //STATEMANAGEMENT
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  console.log(error);
  const handleNameInput = (e) => {
    setName(e.target.value);
  };

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  ////LIFECYCLES
  useEffect(() => {
    if (error) {
      //Check for register error
      if (error.id === 'REGISTER_FAIL') {
        setMsg(error.msg.errors);
      } else {
        setMsg(null);
      }
    }
    //If authenticated close modal
    if (modal) {
      if (isAuthenticated) {
        toggle();
      }
    }
  }, [error, isAuthenticated]);

  //FUNCTIONS
  const toggle = () => {
    //Clear Errors
    clearErrors();
    setModal(!modal);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //Create User Object
    const newUser = {
      name,
      email,
      password,
    };

    //Attempt to register
    register(newUser);
  };
  console.log(msg);
  return (
    <Fragment>
      <button className='btnI' onClick={toggle}>
        <span className='textPara'>Register</span>
      </button>
      {isAuthenticated ? (
        <Redirect to='/dashboard' />
      ) : (
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle} className='modalI'>
            Register
          </ModalHeader>
          <ModalBody>
            {msg
              ? msg.map((error) => (
                  <Alert key={uuid()} color='danger'>
                    {error.msg}
                  </Alert>
                ))
              : null}
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <Label for='name'>Name</Label>
                <Input
                  type='name'
                  name='name'
                  id='name'
                  placeholder='Name'
                  value={name}
                  onChange={handleNameInput}
                  className='mb-3'
                />
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email'
                  value={email}
                  onChange={handleEmailInput}
                  className='mb-3'
                />
                <Label for='password'>Password</Label>
                <Input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='Password'
                  value={password}
                  className='mb-3'
                  onChange={handlePasswordInput}
                />
                <Button
                  // onClick={onSubmit}
                  color='dark'
                  style={{ marginTop: '2rem' }}
                  block
                >
                  <Link to='/dashboard'>Register</Link>
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      )}
    </Fragment>
  );
};

RegisterModalF.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModalF
);
