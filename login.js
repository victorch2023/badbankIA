function Login(){
    const [status, setStatus]       = React.useState('');
    const [email, setEmail]         = React.useState('');
    const [password, setPassword]   = React.useState('');
    const ctx = React.useContext(UserContext);
    const [logged, setLogged]       = React.useState('');

    React.useEffect(() => {
    if (!ctx.loggedUserKey){
        setLogged(false)
    } else {
        setLogged(true)
    };
    },[ctx]);

    function validate(field, label){
        if (!field){
            setStatus('Error: ' + label);
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    function verify(){
        const foundUser = ctx.users.find(user => user.email === email && user.password === password);
        if (!foundUser || !foundUser.firebaseKey){
            setStatus('Error in data');
            setTimeout(() => setStatus(''), 3000);
            return false;
        }

        const userKey = foundUser.firebaseKey;
        console.log('User key: ' + userKey);
        
        const db = firebase.database();
        db.ref('users/' + userKey).update({
            logstatus:true
        }, (error) => {
            if (error) {
                setStatus('Error al iniciar sesión: ' + error.message);
                setTimeout(() => setStatus(''), 3000);
                console.error('Error al actualizar logstatus:', error);
            } else {
                ctx.setLoggedUserKey(userKey);
                setEmail('');
                setPassword('');
                setLogged(true);
            }
        });
    }

    function handleLogin(){

        console.log(email, password);
        
        if (!validate(email,    'email'))       return;
        if (!validate(password, 'password'))    return;
        verify();

    }

    function loginFB (){
        FB.login(function(response){
            console.log(response);

            if (response.status === 'connected'){
                FB.api('/me',{fields:'name,email'},function(response){
                    console.log(response);
                    const foundUser = ctx.users.find(user => user.email === response.email);
                    if (!foundUser || !foundUser.firebaseKey){
                        setStatus('Error in data');
                        setTimeout(() => setStatus(''), 3000);
                        return false;
                    }
            
                    const userKey = foundUser.firebaseKey;
                    console.log('User key: ' + userKey);
            
                    const db = firebase.database();
                    db.ref('users/' + userKey).update({
                        logstatus:true
                    }, (error) => {
                        if (error) {
                            setStatus('Error al iniciar sesión con Facebook: ' + error.message);
                            setTimeout(() => setStatus(''), 3000);
                            console.error('Error al actualizar logstatus:', error);
                        } else {
                            ctx.setLoggedUserKey(userKey);
                            setEmail('');
                            setPassword('');
                            setLogged(true);
                        }
                    });
                })
            }

        },{scope:'public_profile,email'})
    }


    function logout(){
        if (!ctx.loggedUserKey) {
            setLogged(false);
            return;
        }

        const db = firebase.database();
        db.ref('users/' + ctx.loggedUserKey).update({
            logstatus:false
        }, (error) => {
            if (error) {
                setStatus('Error al cerrar sesión: ' + error.message);
                setTimeout(() => setStatus(''), 3000);
                console.error('Error al actualizar logstatus:', error);
            } else {
                ctx.setLoggedUserKey(null);
                setLogged(false);
            }
        });
    }

        return(
            <Card
                bgcolor="primary"
                header="Login"
                status={status}
                body={!logged ? (                
                    <>
                    Email address<br/>
                    <input type="input" className="form-control" id="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.currentTarget.value)} /><br/>
                    Password<br/>
                    <input type="password" className="form-control" id="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.currentTarget.value)} /><br/>
                    <button type="submit" className="btn btn-light" onClick={handleLogin}>Login</button><br/><br/>
                    <button type="submit" className="btn btn-light" onClick={loginFB} title='Only email needed'>Login with Facebook</button>
                    </>              
                ) : (
                    <>
                    <h5>User Logged!</h5>
                    <button type="submit" className="btn btn-light" onClick={logout}>Logout</button>
                    </>
                )}
            />)
}
