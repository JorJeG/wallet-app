module.exports = {
	/**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
	apps: [

		// First application
		{
			name: 'DEVELOPMENT',
			script: './source/app.js',
			watch: true,
			instance_var: '0',
			env: {
				COMMON_VARIABLE: 'true',
				NODE_PATH: '.'
			},
		},

		// First application
		{
			name: 'PRODUCTION',
			script: './source/app.js',
			exec_mode: 'cluster',
			instance_var: '1',
			instances: 4,
			env: {
				COMMON_VARIABLE: 'true',
				NODE_ENV: 'production',
				NODE_PATH: '.',
			},
		}

	],

};
