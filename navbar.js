function NavBar(){

    const ctx = React.useContext(UserContext);

    React.useEffect(() => {
        // Buscar el usuario logueado por su logstatus
        const loggedUser = ctx.users.find(user => user.logstatus === true);
        if (loggedUser && loggedUser.firebaseKey) {
            ctx.setLoggedUserKey(loggedUser.firebaseKey);
        } else if (!loggedUser) {
            ctx.setLoggedUserKey(null);
        }
        },[ctx.users]);

    function logout(){
        if (!ctx.loggedUserKey) {
            return;
        }

        const db = firebase.database();
        db.ref('users/' + ctx.loggedUserKey).update({
            logstatus:false
        }, (error) => {
            if (error) {
                console.error('Error al cerrar sesión:', error);
                alert('Error al cerrar sesión: ' + error.message);
            } else {
                ctx.setLoggedUserKey(null);
            }
        });
    }


    return(
        <>
            <nav class="navbar navbar-expand-lg bg-warning">
            
                <a class="navbar-brand" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home" aria-selected="false" href="#" title='Nice bank but a little unsecure' style={{ fontFamily:'Arial, Bold', fontSize:'40px' }}>BadBank</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="CreateAccount-tab" data-bs-toggle="tab" data-bs-target="#CreateAccount-tab-pane" type="button" role="tab" aria-controls="CreateAccount-tab-pane" aria-selected="false" href="#/CreateAccount/" title='Submit your data and create easily your account' style={{ color: 'black' }}>Create Account</a>
                    </li>

                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="login-tab" data-bs-toggle="tab" data-bs-target="#login-tab-pane" type="button" role="tab" aria-controls="CreateAccount-tab-pane" aria-selected="false" href="#/login/" title='Submit your data and create easily your account' style={{ color: 'black' }}>Login</a>
                    </li>

                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="deposit-tab" data-bs-toggle="tab" data-bs-target="#deposit-tab-pane" type="button" role="tab" aria-controls="deposit-tab-pane" aria-selected="false" href="#/deposit/" title='Make deposit in your account easely' style={{ color: 'black' }}>Deposit</a>
                    </li>

                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="withdraw-tab" data-bs-toggle="tab" data-bs-target="#withdraw-tab-pane" type="button" role="tab" aria-controls="withdraw-tab-pane" aria-selected="false" href="#/withdraw/" title='Withdraw your money in few steps' style={{ color: 'black' }}>Withdraw</a>
                    </li>

                    <li class="nav-item" role="presentation">
                        <a class="nav-link" id="alldata-tab" data-bs-toggle="tab" data-bs-target="#alldata-tab-pane" type="button" role="tab" aria-controls="alldata-tab-pane" aria-selected="false" href="#/alldata/" title='See all the users suscribed and all the operations done' style={{ color: 'black' }}>All Data</a>
                    </li>
                </ul>
                </div>

                <div>
                    {ctx.loggedUserKey ? 'Logged User:' : ''}
                </div>
    
                <div style={{fontWeight: 'bold', marginLeft: '10px'}} title='Logged user'>
                    {ctx.loggedUserKey ? (ctx.users.find(user => user.firebaseKey === ctx.loggedUserKey)?.email || '') : ''}
                </div>
                
                {ctx.loggedUserKey ? (                 
                    <button type="submit" className="btn btn-light" onClick={logout} style={{background: 'black', color: 'white', marginLeft: '20px'}} title='to logout'>Logout</button>
                ) : ''
                }
            </nav>
        </>
    );
}
