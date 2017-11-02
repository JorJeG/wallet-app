module.exports = {
	/**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
	apps: [

		{
			name: 'DEVELOPMENT',
			script: './source/app.js',
			watch: true,
			instance_var: '0',
			env: {
				NODE_PATH: '.'
			},
		},

		{
			name: 'PRODUCTION',
			script: './source/app.js',
			exec_mode: 'cluster',
			instance_var: '1',
			instances: 2,
			env: {
				NODE_ENV: 'production',
				NODE_PATH: '.',
			},
		}

	],

};
