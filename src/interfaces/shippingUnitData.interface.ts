export interface IShippingUnitData {
	username?: string;
	password?: string;
}

export interface IShippingUnitNTLData {
	username: string;
	password: string;
	partner_id: number;
}

export interface IShippingUnitNTLResponse {
	username: string;
	password: string;
	partner_id: number;
	partner_name: string;
}

export interface IShippingUnitNTLCalcFee {
	cod_amount?: number;
	weight: number;
	payment_method_id?: number;
	s_province: string;
	s_district: string;
	r_province: string;
	r_district: string;
	service_id?: number;
}

export interface IShippingUnitNTNLOrderCreate {
	partner_id: number;
	ref_code?: string;
	package_no?: number;
	s_name: string;
	s_phone: string;
	s_address: string;
	r_name: string;
	r_phone: string;
	r_address: string;
	r_email?: string;
	cod_amount?: number;
	service_id: number;
	payment_method_id: number;
	weight: number;
	lenth?: number;
	width?: number;
	height?: number;
	cargo_type_id: number;
	cargo_content?: string;
	cargo_value?: number;
	note?: string;
	utm_source: string;
}
