import {useRef, useState} from "react";

export default function Login() {
    const [eamilIsInvalid, setEamilIsInvalid] = useState(false)
    
    
    const email = useRef();
    const password = useRef();

    function handleSubmit(e) {
        e.preventDefault()
        const enteredEmail = email.current.value
        const enteredPassword = password.current.value

        const emailIsValid = enteredEmail.includes('@')

        if(!emailIsValid){
            setEamilIsInvalid(true);
            return;
        }

        setEamilIsInvalid(false)
        console.log('Sending HTTP request....')
    }

    // function handleInputChange(identifier, value) {
    //     setEnteredValues(prevState => ({
    //         ...prevState,
    //         [identifier]: value
    //     }))
    // }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input id="email"
                           type="email"
                           name="email"
                           ref={email}
                        // value={enteredValues.email}
                        // onChange={(e) => {
                        //     handleInputChange('email', e.target.value)
                        // }}
                    />
                    <div className="control-error">{eamilIsInvalid && <p>Please email vaild...</p>}</div>
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input id="password"
                           type="password"
                           name="password"
                           ref={password}
                        // value={enteredValues.password}
                        // onChange={(e) => {
                        //     handleInputChange('password', e.target.value)
                        // }}
                    />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
