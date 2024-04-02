import React, { useState } from 'react';
import axios from 'axios';
import {
    Container,
    FormContainer,
    Title,
    InputField,
    Button,
    LinkToLogin
} from './CreateAccount.styled';

const CreateAccount = ({ history }) => {
    const [account, setAccount] = useState({
        fName: '',
        lName: '',
        email: '',
        password: '',
        premium: '',
        passwordConfirm: ''
    });

    const [invalidFName, setInvalidFName] = useState('');
    const [invalidLName, setInvalidLName] = useState('');
    const [invalidEmail, setInvalidEmail] = useState('');
    const [invalidPassword, setInvalidPassword] = useState('');
    const [invalidPasswordConfirm, setInvalidPasswordConfirm] = useState('');
    const [invalidStatus, setInvalidStatus] = useState('');

    const handleChange = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
    };

    const validForm = () => {
        let valid = true;

        if (account.fName.trim() === '') {
            setInvalidFName('Invalid first name.');
            valid = false;
        } else {
            setInvalidFName('');
        }

        if (account.lName.trim() === '') {
            setInvalidLName('Invalid last name.');
            valid = false;
        } else {
            setInvalidLName('');
        }

        if (account.email.trim() === '') {
            setInvalidEmail('Invalid email.');
            valid = false;
        } else {
            setInvalidEmail('');
        }

        if (account.password.trim() === '' || account.passwordConfirm.trim() === '') {
            setInvalidPassword('Invalid password.');
            valid = false;
        } else {
            setInvalidPassword('');
        }

        if (account.password !== account.passwordConfirm) {
            setInvalidPasswordConfirm('Passwords do not match.');
            valid = false;
        } else {
            setInvalidPasswordConfirm('');
        }

        if (account.premium.trim() === '') {
            setInvalidStatus('Invalid account status');
            valid = false;
        } else {
            setInvalidStatus('');
        }

        return valid;
    };

    const handleClick = async (e) => {
        e.preventDefault();
        if (validForm()) {
            try {
                await axios.post('http://localhost:8800/createaccount', account);
                history.push('/');
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <Container>
            <FormContainer>
                <Title>Create an Account</Title>
                <InputField
                    type="text"
                    placeholder="First Name *"
                    name="fName"
                    value={account.fName}
                    onChange={handleChange}
                />
                {invalidFName && <div>{invalidFName}</div>}
                <InputField
                    type="text"
                    placeholder="Last Name *"
                    name="lName"
                    value={account.lName}
                    onChange={handleChange}
                />
                {invalidLName && <div>{invalidLName}</div>}
                <InputField
                    type="text"
                    placeholder="Email *"
                    name="email"
                    value={account.email}
                    onChange={handleChange}
                />
                {invalidEmail && <div>{invalidEmail}</div>}
                <InputField
                    type="password"
                    placeholder="Enter new password *"
                    name="password"
                    value={account.password}
                    onChange={handleChange}
                />
                {invalidPassword && <div>{invalidPassword}</div>}
                <InputField
                    type="password"
                    placeholder="Confirm new password *"
                    name="passwordConfirm"
                    value={account.passwordConfirm}
                    onChange={handleChange}
                />
                {invalidPasswordConfirm && <div>{invalidPasswordConfirm}</div>}
                <InputField
                    type="text"
                    placeholder="Premium (y or n) *"
                    name="premium"
                    value={account.premium}
                    onChange={handleChange}
                />
                {invalidStatus && <div>{invalidStatus}</div>}
                <Button onClick={handleClick}>Create Account</Button>
                <LinkToLogin to="/">Already have an account? Login here.</LinkToLogin>
            </FormContainer>
        </Container>
    );
};

export default CreateAccount;
