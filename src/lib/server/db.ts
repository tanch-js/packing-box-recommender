import mysql from 'mysql2/promise';
import {
	MYSQL_HOST,
	MYSQL_PORT,
	MYSQL_USER,
	MYSQL_DATABASE,
	MYSQL_PASSWORD,
	WP_DATABASE,
	WP_USER,
	WP_PASSWORD
} from '$env/static/private';
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

const JS_DB_CONFIG: DB_CONFIG = {
	host: MYSQL_HOST,
	port: parseInt(MYSQL_PORT),
	database: MYSQL_DATABASE,
	user: MYSQL_USER,
	password: MYSQL_PASSWORD
};

const FULL_ORDER_QUERY_BASE = `SELECT 
SD.SubmissionID, SD.OrderID, RD.ShippingID, PD.PackageID, PD.ParcelIX,
ID.ItemID, ID.ItemIX, timeSt as OrderTimeStamp,
CONCAT(SenderFirstName, ' ', SenderLastName) as SenderName,
SenderFirstName, SenderLastName, SenderPhoneNo, SenderEmail, user_id as UserID,
DATE(user_registered) as UserRegisteredDate,
PickupDate, PickupTime, DropoffPickupButton, DropoffDate, DropoffTime,
PickupPostalCode, PickupAddress, PickupUnitNo, PickupSurcharge, PickupContactNo,
PayOrScheduled, ShipmentPaymentStatus, ShipmentPaymentAmount,
AddInfo as CustomerRemarks,
RecName, RecEmail, RecPhoneNo, RecCountry, RecCity, RecState, RecZipCode,
RecAddress1, RecAddress2, RecAddress3, totalIndivRecCost as FormTotalShipmentQuote,
RD.RuralSurcharge, RD.CustomValue as ShipmentCustomValue,
InsuranceButton, insuranceButton='with insurance' as IsInsured, LastFailFedExReason as FedExStatus,
AccountNumber, DutiesPaidBy, ShippingPurpose, DirectSignature,
ImportTaxCharge, ImportDutyCharge, DutyHandlingFee, TotalDutiesAndTaxes,
VImportTaxCharge, VImportDutyCharge, VDutyHandlingFee, VTotalDutiesAndTaxes,
ServiceType, InitialFedExQuote, ActualFedExCharge, RD.IsCancelled,
PkgContent, PkgTypeUsed, VerificationDatetime, HoldShipmentReason,
VerifiedPackingCost, VerifiedFragilePackingCost, VerifiedParcelWeight,
VerifiedParcelVolumetricWeight, VerifiedInsuranceAmount as VerifiedInsurancePremium, 
VerifiedShippingCost, VerifiedOthersCost, VerifiedQuote,
PackingOrNotButton='Need Packing' as NeedsPacking,
FragilePackingServiceButton='on' as NeedsFragilePacking,
VerifiedParcelLength, VerifiedParcelWidth, VerifiedParcelHeight,
ParcelLength, ParcelWidth, ParcelHeight, ParcelWeight,
ParcelInsuranceAmount as FormInsurancePremium, ParcelQuote,
ShipButton, RegularPackingCost, FragilePackingCost,
OpsComments, TopupButton, isParcelRemoved,
TrackingNo, FedExResponseDateTime, FedExDeliveryStatusTime,
ItemCategory, ItemDescription, ItemQuantity, ItemPrice, ItemTotalPrice, ItemWeight
FROM formtblsenderdata SD
LEFT JOIN justship_WPXQX2.WjQ_users U ON SD.user_id = U.ID
JOIN formtblrecipientdata RD on SD.orderID = RD.orderID
LEFT JOIN
(SELECT shippingID, sum(paymentAmount) as ShipmentPaymentAmount, 
IF(COUNT(paymentStatus = 'Succeeded') > 0, 'Succeeded', null) as ShipmentPaymentStatus
FROM tblshipmentpayment
GROUP BY shippingID
) AS SP ON RD.shippingID = SP.shippingID
JOIN formtblparceldata PD ON RD.shippingID = PD.shippingID
LEFT JOIN tblfedexresponse FR ON FR.PkgID = PD.packageID
JOIN formtblitemdata ID ON ID.packageID = PD.packageID`;

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

export const getValidPackingOrdersForDay = async (date: string) => {
	const JS_DB = await mysql.createConnection(JS_DB_CONFIG);
	try {
		const query = `${FULL_ORDER_QUERY_BASE} WHERE
    IsCancelled = 0
    AND IF(payOrScheduled = 'pay', ShipmentPaymentStatus = 'Succeeded', 1)
    AND PackingOrNotButton = 'Need Packing'
    AND IF(dropoffPickupButton = 'PU', pickupDate = ?, 1)
    AND IF(dropoffPickupButton = 'DO', dropoffDate = ?, 1)
    ORDER BY SD.OrderID DESC, RD.ShippingID, PD.ParcelIX, ID.ItemIX;`;
		const [rows] = await JS_DB.execute(query, [date, date]);
		return rows;
	} catch (err) {
		console.log(err);
	} finally {
		await JS_DB.end();
	}
};
