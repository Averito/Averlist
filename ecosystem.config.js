module.exports = {
	apps : [
		{
			name: "Averlist Client",
			script: "npm",
			args: "run client:start",
			exec_mode: 'fork',
			log_date_format: "DD-MM HH:mm:ss Z",
			log_type: "json",
		},
		{
			name: "Averlist Server",
			script: "npm",
			args: "run server:prod",
			exec_mode: 'cluster',
			log_date_format: "DD-MM HH:mm:ss Z",
			log_type: "json",
		}
	]
}