// import { config } from "../../config/config";
// import { dayAndTimeToISOString } from "../helpers/utill";

// export default class ClinicUpdate {
// 	public Time_stemp?: string;
// 	public Num_Avi?: string;
// 	public Emer_Dept_hmo_GK?: string;
// 	public Status_Clinic?: string;
// 	public Status_Pharmacy?: string;
// 	public Status_Family_Doctor?: string;
// 	public Status_Nurse?: string;
// 	public Status_Pediatrician?: string;
// 	public Status_Gynecologist?: string;

// 	constructor(entity: string[]) {
// 		let fields: string[] = config.dataFields;

// 		// set Time_stemp property value
// 		const dayIndex = fields.findIndex((field) => field === "Day");
// 		fields.splice(dayIndex, 1);
// 		const timeIndex = fields.findIndex((field) => field === "Time");
// 		fields.splice(timeIndex, 1);
// 		this.Time_stemp = dayAndTimeToISOString(entity[dayIndex], entity[timeIndex]);
// 		// this['Emer_Dept_hmo_GK'] = 'a';
// 		fields.forEach((field, index) => (this[field] = entity[index]));
// 	}
// }

// export default interface ClinicUpdate {
// 	Time_stemp?: string;
// 	Num_Avi?: string;
// 	Emer_Dept_hmo_GK?: string;
// 	Status_Clinic?: string;
// 	Status_Pharmacy?: string;
// 	Status_Family_Doctor?: string;
// 	Status_Nurse?: string;
// 	Status_Pediatrician?: string;
// 	Status_Gynecologist?: string;
// }
