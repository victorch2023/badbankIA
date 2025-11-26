function Init () {
    const ctx = React.useContext(UserContext);

    React.useEffect(() => {
        console.log('hola');

        // Verificar que Firebase esté disponible
        if (typeof firebase === 'undefined' || !firebase.database) {
            console.error('Firebase no está disponible');
            return;
        }

        const db = firebase.database();

        db.ref('users').on('value', dbUsers => {
            const newUsers = [];
            let loggedUserKey = null;
            dbUsers.forEach(dbUser => {
                const userData = dbUser.val();
                // Guardar la clave de Firebase junto con los datos del usuario
                const userWithKey = {
                    ...userData,
                    firebaseKey: dbUser.key
                };
                if (userData.logstatus === true){
                    loggedUserKey = dbUser.key;
                }
                newUsers.push(userWithKey);
            });
            ctx.setUsers(newUsers);
            // Actualizar la clave del usuario logueado si existe
            if (loggedUserKey) {
                ctx.setLoggedUserKey(loggedUserKey);
            } else {
                ctx.setLoggedUserKey(null);
            }
        }, error => {
            console.error('Error al cargar usuarios:', error);
            ctx.setUsers([]);
        });

        db.ref('ops').on('value', dbOps => {
            const newOps = [];
            dbOps.forEach(dbOp => {
                const opData = dbOp.val();
                newOps.push(opData);
            });
            ctx.setOps(newOps);
        }, error => {
            console.error('Error al cargar operaciones:', error);
            ctx.setOps([]);
        });

        },[]);

}
