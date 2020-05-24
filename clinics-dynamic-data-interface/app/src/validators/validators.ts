import Ajv from 'ajv';

import logger from '../logs/logger';
import * as arraySchema from '../validators/clinicsUpdate.schema.json';
import * as entitySchema from '../validators/clinicUpdate.schema.json';

const ajvArray = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
const arrayValidation = ajvArray.compile(arraySchema);

export function validateAllEntities(path: string, data: any) {
	if (!arrayValidation(data)) {
		logger.error(`invalidFile: The file named ${path}, with the data ${JSON.stringify(data)}
		 failed validation. see reason here ${arrayValidation.errors}`);
		return false;
	} else {
		logger.info(`Succsess: The file named: ${path} passed validation`);
		return true;
	}
}

const ajvEntity = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}
const entityValidation = ajvEntity.compile(entitySchema);

export function validateEntity(path: string, data: any): Boolean {
	if (!entityValidation(data)) {
		logger.error(`Error: In the file named: ${path}, the entity ${JSON.stringify(data)}
		 failed validation. see reason here ${JSON.stringify(entityValidation.errors)}`);
		return false;
	} else {
		// logger.info(`In the file named: ${path}, the entity ${data} passed validation\n`);
		return true;
	}
}

