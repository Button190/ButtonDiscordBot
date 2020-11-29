// http://localhost:3001/api/query?query=SELECT%20*%20FROM%20%20USERS%20WHERE%20username%20=%20%3F;&value=CJonick

import { v4 as uuidv4 } from 'uuid';
import excuteQuery from '../../lib/mysql-db';
import moment from 'moment';
import crypto from 'crypto';
import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    //origin: "*",
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST'],
  })
)

export default async (req, res) => {
  res.statusCode = 200
  
  //Run cors
  await cors(req, res)  
  
  // Execute query

  try {
      const result = await excuteQuery({
          query: req.query.query,
          values: req.query.value,
      });

      res.json({
        response: result,
      })

  } catch (error) {
    res.json({
      response: error,
    })
  }


}


// export async function createUser({ email, password }) {
//   const salt = crypto.randomBytes(16).toString('hex');
//   const hash = crypto
//       .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
//       .toString('hex');
//   const user = {
//       id: uuidv4(),
//       createdAt: moment().format( 'YYYY-MM-DD HH:mm:ss'),
//       email,
//       hash,
//       salt,
//   };

//   try {
//       const result = await excuteQuery({
//           query: 'INSERT INTO users (id, createdAt, email, hash, salt) VALUES(?, ?, ?, ?, ?)',
//           values: [user.id, user.createdAt.toString(), user.email, user.hash, user.salt],
//       });
//       console.log( result );
//   } catch ( error ) {
//       console.log( error );
//   }

//   return user;
// }


// export async function findUser({ email }) {
//   try {
//       const result = await excuteQuery({
//           query: 'SELECT * FROM users WHERE email = ?',
//           values: [ email ],
//       });
//       return result[0];
//   } catch (error) {
//       console.log(error);
//   }
// }

// export async function validatePassword(user, inputPassword) {
//   const inputHash = crypto
//       .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
//       .toString('hex');
//   const passwordsMatch = user.hash === inputHash;
//   return passwordsMatch;
// }






