const userModel = {};

userModel.getById = function(conn, id) {

    const result = new Promise((resolve, reject) => {

        const q = `SELECT * FROM users WHERE id='${id}'`;
        conn.query(q, (err, user) => {
            //If an error has ocurred
            if(err) {
                reject({ status: 500, msg: 'An error has ocurred in this query' })
            }
            //If not exists user
            if(!user) {
                reject({ status: 404, msg: 'This resource not exists in database' })
            }

            //Resolve to return user
            resolve(user[0])
        });
        
    });

    return result;
}

module.exports = userModel;