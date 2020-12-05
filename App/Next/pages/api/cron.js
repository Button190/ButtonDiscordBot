//https://github.com/kelektiv/node-cron


var cronInitialized;


//return an answer just to make it visible on the front end.
export default (req, res) => {
	
	if ( ! cronInitialized ) {
		
		const CronJob = require('cron').CronJob;
		
		console.log('Before job instantiation');
		const job = new CronJob('0 */1 * * * *', function() {
			const d = new Date();
			console.log('Every Minute:', d);
		},
		null,
		true, // autorun, if set to false - requires at the bottom: //job.start();
		'America/Los_Angeles'
		);
		//job.start();
		
		
		console.log('After job instantiation');
		
		
		cronInitialized = true;

		res.statusCode = 200
		res.json({ status: '200', message: 'Cron initialized'})

	}else{

        res.statusCode = 200
		res.json({ status: '200', message: 'Cron was already online!' })
		
	}
}