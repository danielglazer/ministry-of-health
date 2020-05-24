// require('dotenv').config();
import bunyan from 'bunyan';
import bFormat from 'bunyan-format';

const format = (std: NodeJS.WriteStream) =>
	std.isTTY ? bFormat({ outputMode: 'short' }) : std;

export default bunyan.createLogger({
	name: 'clinics-dynamic-data-interface',
	src: true,
	streams: [
		{
			level: 'debug',
			stream: format(process.stdout),      // log INFO and above to stdout
		},
		{
			level: 'info',
			path: 'log.json'  // log ERROR and above to a file
		}]
});
