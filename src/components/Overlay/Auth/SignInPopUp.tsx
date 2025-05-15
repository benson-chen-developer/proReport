import React, { Dispatch, SetStateAction, useState } from 'react'
import { Logo } from '../../Outlier/Sidebar/Logo';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { GoogleIcon } from '../../../assets/OAuthIcons';
import Divider from '@mui/material/Divider';
import { loginUser } from '../../../Context/controller/AuthController';
import { useAuthContext } from '../../../Context/authStore';

export const SignInPopUp = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");

    const {setUser} = useAuthContext();

    const validateInputs = async () => {
        let valid = true;
      
        // Reset errors
        setEmailErrorMessage("");
        setPasswordErrorMessage("");
      
        // Email validation
        if (!email) {
            setEmailErrorMessage("Email is required");
            valid = false;
        }
      
        // Password length validation
        if (!password) {
            setPasswordErrorMessage("Password is required");
            valid = false;
        }
      
        if (valid) {
            try{
                const user = await loginUser(email, password);
                setUser(user);
                console.log('logiun', user)
            } catch(err){
                console.log('err', err)
                alert(err);
            }
        }
    };
      

    const grey1 = "#A2A2A2";
    const grey2 = "#2B2B2B";

    return (
        <div
            style={{
                width: '65vw',
                height: 'auto',
                padding:'2rem 0px',
                background: '#1F1F1F',
                borderRadius: 20, border:'2px solid #2B2B2B',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', justifyContent:'center'
            }}
        >
            <div style={{ width: '90%' }}>
                <Logo showBeta={false} size='small'/>

                <h2 style={{color:'#fff', fontWeight:'bold'}}>
                    Login
                </h2>

                <InputField 
                    value={email} 
                    setValue={setEmail} 
                    label="Email"
                    placeholder="Enter Email"
                />
                <div style={{color:'red', fontSize:'.8rem', marginTop:'5px', marginLeft:'3px'}}>
                    {emailErrorMessage}
                </div>

                <InputField 
                    value={password} 
                    setValue={setPassword} 
                    label="Password"
                    placeholder="Password"
                />
                <div style={{color:'red', fontSize:'.8rem', marginTop:'5px', marginLeft:'3px'}}>
                    {passwordErrorMessage}
                </div>

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        color: '#000',
                        background:'#fff',
                        '&:hover': {
                            backgroundColor: '#dddddd'
                        },
                        marginTop:'1rem'
                    }}
                    onClick={validateInputs}
                >
                    Sign In
                </Button>
                
                {/* ----- Or ----- */}
                <Divider sx={{
                    marginTop:'1rem',
                    color:'#A2A2A2',
                    fontSize:'.9rem',
                    '&::before, &::after': {
                        borderColor: '#353535', // color of the lines on both sides
                    },
                }}>
                    or
                </Divider>


                <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => alert('Sign in with Google')}
                    sx={{
                        color: '#fff',
                        border: '1px solid #3d3d3d',
                        '&:hover': {
                            backgroundColor: '#191919'
                        },
                        marginTop:'1rem'
                    }}
                    startIcon={<GoogleIcon size={20} />}
                >
                    Sign in with Google
                </Button>

            </div>
        </div>
    )
}

interface Props {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
    label: string,
    placeholder: string
}
export const InputField: React.FC<Props> = ({value, setValue, label, placeholder}) => {
    return (
        <div style={{marginTop:'1rem'}}>
            <label style={{ color: '#A2A2A2', fontSize: '.9rem', alignSelf: 'flex-start', marginLeft:'3px', marginBottom: '8px', display: 'block' }}>
                {label}
            </label>

            <input
                type={placeholder.toLowerCase().includes('password') ? 'password' : 'text'}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                style={{
                    minHeight: '2.75rem',
                    width: '100%',
                    fontSize: '.9rem',
                    borderRadius: '.5rem',
                    border: '2px solid #353535',
                    background: '#191919',
                    color: '#fff',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    boxSizing: 'border-box',
                    boxShadow: 'none',
                }}
            />
        </div>
    )
}

