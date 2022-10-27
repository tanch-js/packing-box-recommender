import puppeteer from 'puppeteer';
import { JS_PASSWORD } from '$env/static/private';
import type { pickupDataType } from '../../types';

export const getCompletedPickups = async (): Promise<pickupDataType[]> => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(
		'https://woocenter.azurewebsites.net/Identity/Account/Login?ReturnUrl=%2FTask%2FIndex',
		{ timeout: 0 }
	);
	await page.type('#Input_UserName', 'hello@justship.sg');
	await page.type('#Input_Password', JS_PASSWORD);

	await page.click('.btn-success');

	await page.waitForNavigation();

	await page.click('input[value="CompletedTasks"]');
	await page.waitForResponse('https://woocenter.azurewebsites.net/Task/ListTask');
	await page.waitForNetworkIdle();
	const dataIds = await page.$$eval('button[data-id]', async (buttons) => {
		return buttons.map((button) => button.dataset.id).filter((value) => value != -1);
	});

	const dailyPackages = [];
	for (const id of dataIds) {
		const images: string[] = [];
		await page.click(`button[data-id="${id}"]`);
		page.on('response', (response) => {
			if (response.url().endsWith('.jpeg')) {
				images.push(response.url());
			}
		});
		await page.waitForNetworkIdle();
		const name = await page.$eval('input.ac-name-2', (ele) => ele.value);
		const orderID = await page.$eval("input[name='ExternalKey']", (ele) => ele.value);
		await page.$$eval('button[data-dismiss="modal"]', (nodeList) => {
			for (const ele of nodeList) {
				if (ele.offsetParent !== null) {
					ele.click();
					break;
				}
			}
		});
		dailyPackages.push({ name, orderID, images: [...images] });
		await page.waitForNetworkIdle();
	}
	await browser.close();
	return dailyPackages;
};
