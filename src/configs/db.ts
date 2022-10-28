import { configService } from './configService';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
	configService.DatabaseConfig().master.database,
	null,
	null,
	{
		timezone: '+07:00',
		dialect: 'mysql',
		logging: false,
		replication: {
			write: {
				host: configService.DatabaseConfig().master.host,
				username: configService.DatabaseConfig().master.username,
				database: configService.DatabaseConfig().master.database,
				password: configService.DatabaseConfig().master.password,
				port: configService.DatabaseConfig().master.port
			},
			read: [
				{
					host: configService.DatabaseConfig().slave.host,
					username: configService.DatabaseConfig().slave.username,
					database: configService.DatabaseConfig().slave.database,
					password: configService.DatabaseConfig().slave.password,
					port: configService.DatabaseConfig().slave.port
				}
			]
		}
	}
);


export const ListeningConnectedDatabase = async (app) => {
  const PORT = configService.AppConfig().port;
  sequelize
    .authenticate()
    .then(async () => {
      await app.listen(PORT, async () => {
        console.log(`Application is running on: ${await app.getUrl()}`);
        console.table({
          Master: {
            host: configService.DatabaseConfig().master.host,
            database: configService.DatabaseConfig().master.database,
          },
          Slave: {
            host: configService.DatabaseConfig().slave.host,
            database: configService.DatabaseConfig().slave.database,
          },
        });
      });
    })
    .catch((err) => console.log(err));
};
