export const config = {
	// input file configurations
	"lineSplitSeparator": ";",
	"daySourceSeparator": "/",
	"dayTargetSeparator": "-",
	// output entity fields
	"dataFields": [
		"Day",
		"Time",
		"Num_Avi",
		"Emer_Dept_hmo_GK",
		"Status_Clinic",
		"Status_Pharmacy",
		"Status_Family_Doctor",
		"Status_Nurse",
		"Status_Pediatrician",
		"Status_Gynecologist"
	],
	// # connections to remote machine configurations
	"port": 5000,
	"host": '127.0.0.1',
	// testing related
	"dirPath": "app/src/ex-files"
};


export const computedConfig = {
	"dayIndex": config.dataFields.findIndex((field) => field === "Day"),
	"timeIndex": config.dataFields.findIndex((field) => field === "Time"),
}
