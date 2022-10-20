import mysql from 'mysql2/promise';
import { MYSQL_HOST, MYSQL_PORT, WP_DATABASE, WP_USER, WP_PASSWORD } from '$env/static/private';
import type { boxType } from '../../types';

type DB_CONFIG = {
	host: string;
	port: number;
	database: string;
	user: string;
	password: string;
};

const WP_DB_CONFIG: DB_CONFIG = {
	host: MYSQL_HOST,
	port: parseInt(MYSQL_PORT),
	database: WP_DATABASE,
	user: WP_USER,
	password: WP_PASSWORD
};

export const getUserBoxes = async (userID: string) => {
	const WP_CONN = await mysql.createConnection(WP_DB_CONFIG);
	try {
		const query = `SELECT id, box_name, box_length, box_width, box_height FROM WjQ_sfa_box_size WHERE user_id=?`;
		const [rows] = await WP_CONN.execute(query, [userID]);

		return rows;
	} catch (err) {
		console.log(err);
	} finally {
		await WP_CONN.end();
	}
};