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

  const resAPI = await fetch('https://reqres.in/api/users?page=2')
  const dataAPI = await resAPI.json()
  
  //Run cors
  await cors(req, res)  
  
  // Rest of the API logic
  res.statusCode = 200
  res.json({
    data: dataAPI.data,
    body: req.body,
    query: req.query,
    cookies: req.cookies,
  })
}
