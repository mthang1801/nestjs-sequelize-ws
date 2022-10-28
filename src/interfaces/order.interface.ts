export interface IReportOrderStatuses {
	inProgressCount: number;
	confirmedCount: number;
	packagedCount: number;
	shippingCount: number;
	failShipCount: number;
	completedCount: number;
	inProgressAmount: number;
	confirmedAmount: number;
	packagedAmount: number;
	shippingAmount: number;
	failShipAmount: number;
	completedAmount: number;
	newOrderCount: number;
	failPaymentCount: number;
	successPaymentCount: number;
	waitingPackagedCount: number;
	waitingForGoodsCount: number;
	transportingCount: number;
	deliveryCount: number;
	successfulDeliveryCount: number;
	errorDeliveryCount: number;
	waitingDeliveryAgainCount: number;
	movingBack: number;
}

export interface IOrderDateTime {
	delivery_date?: Date;
	confirmed_at?: Date;
	packaged_at?: Date;
	push_shipping_at?: Date;
	delivery_at?: Date;
	delivery_success_at?: Date;
	returned_at?: Date;
	canceled_at?: Date;
	closed_at?: Date;
}
