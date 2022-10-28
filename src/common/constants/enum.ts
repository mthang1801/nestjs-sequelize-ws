export enum Status {
	ACTIVE = 'A',
	INACTIVE = 'I',
	LOCKED = 'L'
}

export enum BooleanStatus {
	NO = 0,
	YES = 1
}

export enum AuthProvider {
	GOOGLE = 'GOOGLE',
	FACEBOOK = 'FACEBOOK',
	SYSTEM = 'SYSTEM'
}

export enum AuthTokenType {
	REGISTER = 1,
	RECOVERY_ACCOUNT = 2,
	SIGN_IN = 3
}

export enum PlatformEnum {
	'Haravan' = 1,
	'Lazada' = 2,
	'Tiki' = 3,
	'Shopee' = 4,
	'KiotViet' = 5,
	'Yes24h' = 6,
	'Sendo' = 7,
	'POS' = 8,
	'Website' = 9
}

export enum RoleEnum {
	'Admin' = 'Admin',
	'Manager' = 'Manager',
	'Moderator' = 'Moderator',
	'Customer' = 'Customer',
	'User' = 'User'
}

export enum IsDeactiveAccountEnum {
	'False' = 0,
	'True' = 1
}

export enum HttpMethodsEnum {
	'POST' = 'POST',
	'GET' = 'GET',
	'PUT' = 'PUT',
	'DELETE' = 'DELETE'
}

export enum HttpMessageResponseByMethodsEnum {
	'POST' = 'Tạo thành công.',
	'GET' = 'Lấy dữ liệu thành công.',
	'PUT' = 'Cập nhật thành công.',
	'DELETE' = 'Xoá thành công.'
}

export enum UserStatusEnum {
	'Active' = '1',
	'Disabled' = '0'
}

export enum AccountTypeEnum {
	'SYSTEM' = 1,
	'GOOGLE' = 2,
	'FACEBOOK' = 3
}

export enum UserGenderEnum {
	'Male' = 'Male',
	'Female' = 'Female',
	'Others' = 'Others'
}

export enum TokenType {
	'ACCESS_TOKEN' = 'ACCESS_TOKEN'
}

export enum UserAccountStatusActionTypeEnum {
	'ACTIVATE_ACCOUNT' = '1',
	'REACTIVATE_ACCOUNT' = '2',
	'RECOVERY_ACCOUNT' = '3',
	'LOGIN_GOOGLE' = '4',
	'LOGIN_FACEBOOK' = '5'
}

export enum ProviderTypeEnum {
	'LOGIN_GOOGLE' = '4',
	'LOGIN_FACEBOOK' = '5'
}

export enum UserRoleEnum {
	'SellerAdmin' = 'Seller Admin',
	'NTAdmin' = 'NTAdmin'
}
export enum UserRoleCodeEnum {
	'SellerAdmin' = 'seller_admin',
	'NTAdmin' = 'nt_admin'
}

export enum AttributeTypeEnum {
	'TextOrNumber' = '1',
	'Radio' = '2',
	'Checkbox' = '3'
}

export enum AttributeFilterTypeEnum {
	'Checkbox' = '1',
	'DataSelector' = '2',
	'NumberSlide' = '3',
	'Color' = '4'
}

export enum CustomerRankingEnum {
	'Normal' = '0',
	'Bad' = '1',
	'Silver' = '2',
	'Gold' = '3',
	'Platinum' = '4',
	'Diamond' = '5'
}

export enum CustomerAddressTypesEnum {
	'Home' = '1',
	'Organization' = '2'
}

export enum CustomerTypeEnum {
	'Normal' = '1',
	'Wholesale' = '2',
	'Retail' = '3',
	'Supplier' = '4'
}

export enum AttributePurposeEnum {
	'ProductSearchViaFilters' = '1',
	'VariationsAsSeperateProducts' = '2',
	'VariationAsOneProduct' = '3',
	'Brand,Author,Etc' = '4'
}

export enum ModuleFunctionActionTypesEnum {
	'VIEWS' = '__VIEWS',
	'CREATE' = '__CREATE',
	'UPDATE' = '__UPDATE',
	'IMPORT' = '__IMPORT',
	'EXPORT' = '__EXPORT'
}

export enum ProductTypeEnum {
	'Normal' = '1',
	'IMEI' = '2',
	'Combo' = '3',
	'Service' = '4'
}

export enum ProductStatusEnum {
	'Mới' = '1',
	'Đang bán' = '2',
	'Hết hàng' = '3',
	'Ngừng bán' = '4',
	'Đặt trước' = '5'
}

export enum ProductLevelEnum {
	'Configure' = '1',
	'Variation' = '2',
	'Independence' = '3'
}

export enum PathUrlObjectTypeEnum {
	'PRODUCT' = 'PRODUCT',
	'CUSTOMER' = 'CUSTOMER'
}

export enum OrderStatusEnum {
	'Mới' = 1,
	'Thanh toán thất bại' = 2,
	'Đã xác nhận' = 3,
	'Thanh toán thành công' = 4,
	'Chờ đóng gói' = 5,
	'Đã đóng gói' = 6,
	'Chờ lấy hàng' = 7,
	'Đang vận chuyển' = 8,
	'Đang giao hàng' = 9,
	'Giao thành công' = 10,
	'Lỗi giao hàng' = 11,
	'Chờ giao lại' = 12,
	'Đang chuyển hoàn' = 13,
	'Đã chuyển hoàn' = 14,
	'Hoàn thành' = 15,
	'Đã Huỷ' = 16,
	'Yêu cầu huỷ' = 17
}

export enum GroupOrderStatusEnum {
	InProgress = 'InProgress',
	Confirmed = 'Confirmed',
	Packaged = 'Packaged',
	Shipping = 'Shipping',
	ShippingFailure = 'ShippingFailure',
	Closed = 'Closed'
}

export enum PaymentStatusEnum {
	'Chưa thanh toán' = '1',
	'Thanh toán một phần' = '2',
	'Đã thanh toán' = '3'
}

export enum ShippingStatusEnum {
	'Chờ lấy hàng' = '0',
	'Đang vận chuyển' = '1',
	'Đang giao hàng' = '2',
	'Giao thành công' = '3',
	'Lỗi giao hàng' = '4',
	'Chờ giao lại' = '5',
	'Đang chuyển hoàn' = '6',
	'Đã chuyển hoàn' = '7'
}

export enum CarriageForward {
	'Shop trả' = '1',
	'Người nhận trả' = '2'
}

export enum DeliveryRequest {
	'Cho xem hàng, không cho thử' = 1,
	'Cho xem hàng, cho thử' = 2,
	'Không cho xem hàng' = 3
}

export enum DiscountTypeEnum {
	'Fixed' = '1',
	'Percentage' = '2'
}

export enum ExceptionCodeEnum {
	'JsonWebTokenError' = 408,
	"TokenExpiredError" = 408
}

export enum ShippingUnitIdsEnum {
	'NTL' = 1
}

export enum NTLPaymentMethodEnum {
	'Sender pay by Cash when pick up / walk-in payment' = 10,
	'Payment by Sender according to contract' = 11,
	'Receiver pay by Cash when delivery' = 20
}

export enum ShippingUnitServiceEnum {
	'Express Delivery' = 10,
	'Premium Service' = 11,
	'Road Transportation' = 20,
	'Mixed Express' = 21
}

export enum WarehouseStaffLevelEnum {
	'Quản lý' = 1,
	'Nhân viên' = 2
}

export enum PaymentMethodEnum {
	'Tiền mặt' = 1,
	'COD' = 2,
	'Swipe' = 3,
	'Transfer' = 4, 
	"Tiền dư" = 5
}

export enum InventoryReceiptStatusEnum {
	'Chờ kiểm hàng' = 1,
	'Đang kiểm hàng' = 2,
	'Đã kiểm hàng' = 3
}

export enum voucherTypeEnum {
	'Giảm theo số tiền' = 1,
	'Giảm theo %' = 2
}
