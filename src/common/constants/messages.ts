export default {
	res: {
		http: {
			unauth: 'Không thể truy cập',
			bad: 'Dữ liệu không hợp lệ',
			ok: 'Xử lý thành công',
			error: 'Xảy ra lỗi hệ thống',
			created: 'Tạo dữ liệu thành công',
			updated: 'Cập nhật dữ liệu thành công',
			deleted: 'Xoá dữ liệu thành công',
			nocontent: 'Xử lý thành công',
			notfound: 'Không tìm thấy'
		},
		common: {
			getSuccess: 'Lấy dữ liệu thành công',
			getFailed: 'Lấy dữ liệu không thành công',
			createSuccess: 'Tạo dữ liệu thành công',
			createFailed: 'Tạo dữ liệu thất bại, vui lòng thử lại',
			updateSuccess: 'Cập nhật dữ liệu thành công',
			updateFailed: 'Cập nhật dữ liệu thất bại',
			deleteSuccess: 'Xóa dữ liệu thành công',
			deleteFailed: 'Xóa dữ liệu thất bại',
			importFailed: 'Lỗi nhập file.'
		},

		not_found: {},
		invalid: {}
	},
	email: {
		activateAccount: {
			subject: '[OMS]  [Kích hoạt tài khoản]',
			context: {
				greeting: (fullName) => `Xin chào ${fullName}`,
				body: (url) =>
					`<p>Bạn vừa tạo tài khoản thành công, vui lòng kích hoạt bằng cách nhấn vào đường dẫn dưới đây để hoàn tất quá trình đăng ký tài khoản.</p><p><a href='${url}'>Kích hoạt tại đây.</a></p>`,
				footer: '<p><strong>Cảm ơn bạn đã chọn OMS. Trân trọng.</strong>'
			}
		},
		reactivateAccount: {
			subject: '[OMS]  [Kích hoạt lại tài khoản]',
			context: {
				greeting: (fullName) => `Xin chào ${fullName}`,
				body: (url) =>
					`<p>Bạn vừa yêu cầu kích hoạt lại tài khoản, vui lòng kích hoạt bằng cách nhấn vào đường dẫn dưới đây để hoàn tất quá trình tái kích hoạt.</p><p><a href='${url}'>Kích hoạt tại đây.</a></p>`,
				footer: '<p><strong>Cảm ơn bạn đã chọn OMS. Trân trọng.</strong>'
			}
		},
		recoveryAccount: {
			subject: '[OMS]  [Khôi phục tài khoản]',
			context: {
				greeting: (fullName) => `Xin chào ${fullName}`,
				body: (url) =>
					`<p>Tài khoản của bạn vừa được yêu cầu khôi phục, vui lòng kích hoạt bằng cách nhấn vào đường dẫn dưới đây để tiến hành cập nhật mật khẩu mới.</p><p><a href='${url}'>Khôi phục tài khoản tại đây.</a></p>Lưu ý: Nếu không phải là bạn, vui lòng bỏ qua email này.<p>`,
				footer: '<p><strong>Cảm ơn bạn đã chọn OMS. Trân trọng.</strong>'
			},
			updatePwdReceveryAccount:
				'Khôi phục tài khoản thành công, bạn có thể sử dụng mật khẩu mới để đăng nhập.'
		}
	},
	auth: {
		userSignUpSuccess:
			'Tạo tài khoản thành công, vui lòng kiểm tra email để kích hoạt (Mã kích hoạt có thời hạn trong 3h.)',
		userReactiveAccountSuccess:
			'Yêu cầu kích hoạt lại tài khoản thành công, vui lòng kiểm tra email. (Mã kích hoạt có thời hạn trong 3h.)',
		activateSuccess: 'Kích hoạt tài khoản thành công.',
		authTokenExpire:
			'Mã kích hoạt đã hết hạn sử dụng, vui lòng kích hoạt lại.',
		userNotFound: 'Tài khoản hoặc mật khẩu không đúng.',
		wrongPassword: 'Tài khoản hoặc mật khẩu không đúng.',
		recoveryAccount:
			'Yêu Cầu khôi phục tài khoản thành công, vui lòng kiểm tra email. (Mã kích hoạt có thời hạn trong 3h.)',
		statusDisable: 'Tài khoản đã bị vô hiệu hoá, không thể kích hoạt.',
		accountHasNotBeenActivated:
			'Tài khoản chưa được kích hoạt, vui lòng kích hoạt tài khoản',
		accountHasBeenActivated: 'Tài khoản đã được kích hoạt',
		signinProviderError:
			'Đăng nhập không thành công. Mã tham chiều của tài khoản Provider không đúng',
		updatePasswordSuccess: 'Cập nhật mật khẩu thành công.',
		invalidToken: 'Truy cập không hợp lệ.',
		accountSignupExist: 'Tài khoản đã tồn tại'
	},
	roles: {
		codeDuplicate: 'Tên vai trò đã được sử dụng',
		roleError: 'Chọn quyền không đúng với role hiện tại',
		forbidenRole: 'Không đủ quyền để thực hiện.',
		functDuplicate: 'Chức năng này đã tồn tại.',
		createInvalidFunct:
			'Chức năng bị trùng method và API router hoặc bị trùng tên hiển thị với các chức năng khác.',
		notFoundItem: 'Không tìm thấy chức năng này',
		invalidRole : "Vai trò người dùng không hợp lệ"
	},
	attributes: {
		duplicateError: 'Mã thuộc tính đã tồn tại',
		invalidData: 'Dữ liệu truyền vào không hợp lệ',
		attributeCodeExist: 'Code đã tồn tại',
		attributeNotFound: 'Không tìm thấy dữ liệu.'
	},
	customers: {
		hasExistPhoneOrEmail: 'Đã tồn tại số điện thoại hoặc email.',
		conflictBetweenIdAndPhone: 'Không thể cập nhật số điện thoại',
		conflictBetweenIdAndEmail: 'Không thể cập nhật số email',
		notFound: 'Không tìm thấy khách hàng'
	},
	warehouses: {
		hasExistPhoneOrEmail: 'Đã tồn tại số điện thoại hoặc email.',
		hasCode: 'Đã tồn tại mã kho'
	},
	responseStatus: {
		notFound: (moduleName) => `Không tìm thấy ${moduleName}`
	},
	product: {
		skuOrBarcodeExist: 'Sản phẩm đã tồn tại sku hoặc mã vạch.',
		barcodeExist: 'Sản phẩm đã tồn tại mã vạch.',
		skuExist: 'Sản phẩm đã tồn tại SKU.',
		productChildrenShouldNotVariation:
			'Sản phẩm con không thể có variation',
		productParentShouldNotAsVariation:
			'Sản phẩm cha không thể trở thành sản phẩm con',
		parentProductNotFound: 'Không tìm thấy SP cha.',
		productNotFound: 'Sản phẩm không tồn tại.'
	},
	shippingUnit: {
		notFound: 'Không tìm thấy đơn vị vận chuyển',
		inactive: 'Đơn vị vận chuyển đang ngừng hoạt động',
		isNotJson: 'Dữ liệu truyền vào phải là JSON',
		notEnoughtProperty: 'Dữ liệu truyền vào không đủ'
	},
	order: {
		notFound: 'Không tìm thấy đơn hàng.',
		cancelFail: 'Huỷ đơn không thành công',
		orderStatusNotMatch: 'Trạng thái không hợp lệ',
		unableUpdateCustomerInfo: 'Không thể thay đổi thông tin khách hàng',
		unableUpdateOrderPayment: 'Không thể thay đổi thông tin thanh toán',
		paymentError: 'Số tiền thanh toán không chính xác',
		unableToUpdate: 'Không thể cập nhật sản phẩm',
		currentAndTargetOrderStatusConflict: 'Trạng thái đơn không phù hợp',
		moneyAmountConflict: 'Số tiền không chính xác'
	},
	catalog: {
		hasExist: 'Ngành hàng đã tồn tại',
		unAuthorized: 'Không có quyền thực hiện',
		notFound : "Không tìm thấy ngành hàng"
	},
	category: {
		notFound: 'Không tìm thấy danh mục',
		URLhasExist: 'URL đã tồn tại',
		invalidURL: 'URL không hợp lệ',
		invalidParentCat: 'Danh mục cha không phù hợp.'
	}
};
