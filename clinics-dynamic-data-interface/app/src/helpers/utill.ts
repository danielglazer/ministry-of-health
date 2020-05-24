import fs from 'fs';
import net from 'net';
import axios from 'axios';

import { config, computedConfig } from '../../config/config';
import logger from '../logs/logger';
import { validateEntity, validateAllEntities } from '../validators/validators';
import { error } from 'console';


export function newFileListener(path: string) {
	logger.info(`New file was added:  ${path}`);
	try {
		let entityArr = readNewFile(path);
		let jsonData = entityArr.map((entity) => buildClinicUpdate(entity));
		// clear jsonData from emptyobjects
		jsonData = jsonData.filter(entity => Object.keys(entity).length > 0);
		// clear invalid entities
		jsonData = jsonData.filter(entity => validateEntity(path, entity));

		if (validateAllEntities(path, jsonData)) {
			sendToDP(jsonData);
		}
	} catch (err) {
		logger.error(`Error: File delete attempt failed. see here ${err}`);
	}


	try {
		fs.unlinkSync(path); // delete the file
		logger.info(`File deleted`);

	} catch (err) {
		logger.error(`Error: File delete attempt failed. see here ${err}`);
	}
}

function readNewFile(path: string): string[][] {
	let file = fs.readFileSync(path, 'utf8');
	logger.info(`File data:\n${file}\n`);
	let lines = file.split('\r\n');
	const arrayOfArrays = lines.map((line) => line.split(config.lineSplitSeparator));
	// dealing with a problem in a new line at the end of file
	if (arrayOfArrays[lines.length - 1].length == 1 && arrayOfArrays[lines.length - 1][0] == '')
		arrayOfArrays.pop()
	return arrayOfArrays;
}

function buildClinicUpdate(entity: string[]): any {
	let clinicUpdate: any = {};
	clinicUpdate.Time_stemp = dayAndTimeToISOString(entity[computedConfig.dayIndex],
		entity[computedConfig.timeIndex]);
	config.dataFields.forEach(function (field, index) {
		if (index != computedConfig.dayIndex && index != computedConfig.timeIndex)
			clinicUpdate[field] = entity[index];
	});

	if (!parseInt(clinicUpdate.Num_Avi, 10)) {
		logger.error("Error: In clinicUpdate Num_Avi( " +
			clinicUpdate.Num_Avi + " ) isn't integer");
		return {};
	}
	if (!parseInt(clinicUpdate.Emer_Dept_hmo_GK, 10)) {
		logger.error("Error: In clinicUpdate Emer_Dept_hmo_GK ( " +
			clinicUpdate.Emer_Dept_hmo_GK + " ) isn't integer");
		return {};
	}
	clinicUpdate.Num_Avi = parseInt(clinicUpdate.Num_Avi);
	clinicUpdate.Emer_Dept_hmo_GK = parseInt(clinicUpdate.Emer_Dept_hmo_GK);
	return clinicUpdate;
}

export function dayAndTimeToISOString(day: string, time: string): string {
	const revisedDay = day.split(config.daySourceSeparator).
		reverse().join(config.dayTargetSeparator); // reverse date values then replace separator
	const revisedTime = time + ':00'; //add second to times
	return revisedDay + 'T' + revisedTime + 'Z'; // concat to ISO format
}

export function sendToDP(jsonArr: any[]) {
	logger.info(`\nResult message:\n`);
	logger.info(jsonArr);


	// let client = new net.Socket();
	// client.connect(config.port, config.host);
	// let msg = JSON.stringify(jsonArr);
	// client.write('POST: /HTTP/1.1 \n Host: 10.105.2.1\nContent-Length ' + msg.length,
	// 	(error) => logger.error(`Error sent back from DP: ${error}`));
	// client.write(msg);

	// client.end();
	logger.info('Data sent');
}


// export function sendToDPAxios(jsonArr: any[]) {
// 	logger.info(`\nResult message:\n`);
// 	logger.info(jsonArr);

// 	axios({
// 		method: 'POST',
// 		url: `http://${config.host}:${config.port}/`,
// 		data: JSON.stringify(jsonArr)
// 	}).then((response) => logger.info(response)).catch((err) => logger.error(err))
// 	// let client = new net.Socket();
// 	// client.connect(config.port, config.host);
// 	// let msg = JSON.stringify(jsonArr);
// 	// client.write('POST: /HTTP/1.1 \n Host: 10.105.2.1\nContent-Length ' + msg.length,
// 	// 	(error) => logger.error(`Error sent back from DP: ${error}`));
// 	// client.write(msg);

// 	// client.end();
// 	logger.info('Data sent');
// }
