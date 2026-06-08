import { apiFreelanceSlice as api } from './api/apiSlice';
const injectedRtkApi = api.injectEndpoints({
    endpoints: (build) => ({
        createServiceV2ApiV1SellerServicesCreatePost: build.mutation<
            CreateServiceV2ApiV1SellerServicesCreatePostApiResponse,
            CreateServiceV2ApiV1SellerServicesCreatePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/seller-services/create/`,
                method: 'POST',
                body: queryArg.bodyCreateServiceV2ApiV1SellerServicesCreatePost,
            }),
        }),
        myServicesApiV1SellerServicesGet: build.query<
            MyServicesApiV1SellerServicesGetApiResponse,
            MyServicesApiV1SellerServicesGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/seller-services/`,
                params: {
                    search: queryArg.search,
                    status: queryArg.status,
                },
            }),
        }),
        sellerServiceDetailApiV1SellerServicesServiceIdGet: build.query<
            SellerServiceDetailApiV1SellerServicesServiceIdGetApiResponse,
            SellerServiceDetailApiV1SellerServicesServiceIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/seller-services/${queryArg.serviceId}/`,
            }),
        }),
        updateServiceApiV1SellerServicesServiceIdUpdatePut: build.mutation<
            UpdateServiceApiV1SellerServicesServiceIdUpdatePutApiResponse,
            UpdateServiceApiV1SellerServicesServiceIdUpdatePutApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/seller-services/${queryArg.serviceId}/update/`,
                method: 'PUT',
                body: queryArg.bodyUpdateServiceApiV1SellerServicesServiceIdUpdatePut,
            }),
        }),
        updateServiceApiV1SellerServicesServiceIdDeleteDelete: build.mutation<
            UpdateServiceApiV1SellerServicesServiceIdDeleteDeleteApiResponse,
            UpdateServiceApiV1SellerServicesServiceIdDeleteDeleteApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/seller-services/${queryArg.serviceId}/delete/`,
                method: 'DELETE',
            }),
        }),
        sellerDashboardApiV1SellerServicesDashboardGet: build.query<
            SellerDashboardApiV1SellerServicesDashboardGetApiResponse,
            SellerDashboardApiV1SellerServicesDashboardGetApiArg
        >({
            query: () => ({ url: `/api/v1/seller-services/dashboard` }),
        }),
        getOrderCancelReasonsApiV1SellerServicesOrderCancelReasonsGet:
            build.query<
                GetOrderCancelReasonsApiV1SellerServicesOrderCancelReasonsGetApiResponse,
                GetOrderCancelReasonsApiV1SellerServicesOrderCancelReasonsGetApiArg
            >({
                query: (queryArg) => ({
                    url: `/api/v1/seller-services/order-cancel-reasons`,
                    params: {
                        cancel_type: queryArg.cancelType,
                    },
                }),
            }),
        myServiceStatusCountApiV1SellerServicesStatusCountGet: build.query<
            MyServiceStatusCountApiV1SellerServicesStatusCountGetApiResponse,
            MyServiceStatusCountApiV1SellerServicesStatusCountGetApiArg
        >({
            query: () => ({ url: `/api/v1/seller-services/status-count` }),
        }),
        setPauseServiceApiV1SellerServicesServiceIdPausePut: build.mutation<
            SetPauseServiceApiV1SellerServicesServiceIdPausePutApiResponse,
            SetPauseServiceApiV1SellerServicesServiceIdPausePutApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/seller-services/${queryArg.serviceId}/pause`,
                method: 'PUT',
                body: queryArg.pauseServiceRequest,
            }),
        }),
        getAdminUnseenServicesCountApiV1SellerServicesUnseenCountGet:
            build.query<
                GetAdminUnseenServicesCountApiV1SellerServicesUnseenCountGetApiResponse,
                GetAdminUnseenServicesCountApiV1SellerServicesUnseenCountGetApiArg
            >({
                query: () => ({ url: `/api/v1/seller-services/unseen/count` }),
            }),
        getCategoriesApiV1CategoriesGet: build.query<
            GetCategoriesApiV1CategoriesGetApiResponse,
            GetCategoriesApiV1CategoriesGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/categories/`,
                params: {
                    parent_id: queryArg.parentId,
                    direction: queryArg.direction,
                    category_id: queryArg.categoryId,
                },
            }),
        }),
        createCategoryApiV1CategoriesPost: build.mutation<
            CreateCategoryApiV1CategoriesPostApiResponse,
            CreateCategoryApiV1CategoriesPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/categories/`,
                method: 'POST',
                params: {
                    direction: queryArg.direction,
                    title: queryArg.title,
                },
            }),
        }),
        getCategoryApiV1CategoriesCategoryIdGet: build.query<
            GetCategoryApiV1CategoriesCategoryIdGetApiResponse,
            GetCategoryApiV1CategoriesCategoryIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/categories/${queryArg.categoryId}/`,
            }),
        }),
        deleteCategoryApiV1CategoriesCategoryIdDelete: build.mutation<
            DeleteCategoryApiV1CategoriesCategoryIdDeleteApiResponse,
            DeleteCategoryApiV1CategoriesCategoryIdDeleteApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/categories/${queryArg.categoryId}/`,
                method: 'DELETE',
            }),
        }),
        getChildCategoriesApiV1CategoriesCategoriesChildrenGet: build.query<
            GetChildCategoriesApiV1CategoriesCategoriesChildrenGetApiResponse,
            GetChildCategoriesApiV1CategoriesCategoriesChildrenGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/categories/categories/children/`,
                params: {
                    parent_category_id: queryArg.parentCategoryId,
                },
            }),
        }),
        getPriceDeliveryApiV1CategoriesPriceDeliveryCategoryIdGet: build.query<
            GetPriceDeliveryApiV1CategoriesPriceDeliveryCategoryIdGetApiResponse,
            GetPriceDeliveryApiV1CategoriesPriceDeliveryCategoryIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/categories/price-delivery/${queryArg.categoryId}`,
            }),
        }),
        getServiceCategoriesApiV1CategoriesCategoriesListGet: build.query<
            GetServiceCategoriesApiV1CategoriesCategoriesListGetApiResponse,
            GetServiceCategoriesApiV1CategoriesCategoriesListGetApiArg
        >({
            query: () => ({ url: `/api/v1/categories/categories-list` }),
        }),
        getCategoriesWithDirectionsApiV1CategoriesCategoriesWithDirectionsGet:
            build.query<
                GetCategoriesWithDirectionsApiV1CategoriesCategoriesWithDirectionsGetApiResponse,
                GetCategoriesWithDirectionsApiV1CategoriesCategoriesWithDirectionsGetApiArg
            >({
                query: () => ({
                    url: `/api/v1/categories/categories-with-directions`,
                }),
            }),
        getAllDirectionsApiV1CategoriesAllDirectionsGet: build.query<
            GetAllDirectionsApiV1CategoriesAllDirectionsGetApiResponse,
            GetAllDirectionsApiV1CategoriesAllDirectionsGetApiArg
        >({
            query: () => ({ url: `/api/v1/categories/all-directions` }),
        }),
        getSellersApiV1UsersSellersGet: build.query<
            GetSellersApiV1UsersSellersGetApiResponse,
            GetSellersApiV1UsersSellersGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/sellers`,
                params: {
                    search: queryArg.search,
                    limit: queryArg.limit,
                    offset: queryArg.offset,
                    direction: queryArg.direction,
                    position: queryArg.position,
                    sorted_by: queryArg.sortedBy,
                },
            }),
        }),
        createSellerApiV1UsersSellersPost: build.mutation<
            CreateSellerApiV1UsersSellersPostApiResponse,
            CreateSellerApiV1UsersSellersPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/sellers`,
                method: 'POST',
                body: queryArg.sellerSoffCreate,
            }),
        }),
        getSellersServiceApiV1UsersSellersServiceGet: build.query<
            GetSellersServiceApiV1UsersSellersServiceGetApiResponse,
            GetSellersServiceApiV1UsersSellersServiceGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/sellers/service`,
                params: {
                    search: queryArg.search,
                    direction: queryArg.direction,
                    category_id: queryArg.categoryId,
                    price: queryArg.price,
                    limit: queryArg.limit,
                    offset: queryArg.offset,
                },
            }),
        }),
        checkFreelancerApiV1UsersCheckFreelanceGet: build.query<
            CheckFreelancerApiV1UsersCheckFreelanceGetApiResponse,
            CheckFreelancerApiV1UsersCheckFreelanceGetApiArg
        >({
            query: () => ({ url: `/api/v1/users/check-freelance` }),
        }),
        getPositionsApiV1UsersPositionsGet: build.query<
            GetPositionsApiV1UsersPositionsGetApiResponse,
            GetPositionsApiV1UsersPositionsGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/positions`,
                params: {
                    search: queryArg.search,
                    direction: queryArg.direction,
                },
            }),
        }),
        getSellerWalletApiV1UsersWalletGet: build.query<
            GetSellerWalletApiV1UsersWalletGetApiResponse,
            GetSellerWalletApiV1UsersWalletGetApiArg
        >({
            query: () => ({ url: `/api/v1/users/wallet` }),
        }),
        getFreelanceProfileApiV1UsersSoffSellerIdFreelanceProfileGet:
            build.query<
                GetFreelanceProfileApiV1UsersSoffSellerIdFreelanceProfileGetApiResponse,
                GetFreelanceProfileApiV1UsersSoffSellerIdFreelanceProfileGetApiArg
            >({
                query: (queryArg) => ({
                    url: `/api/v1/users/${queryArg.soffSellerId}/freelance-profile`,
                }),
            }),
        getFreelancerSettingsApiV1UsersSettingsGet: build.query<
            GetFreelancerSettingsApiV1UsersSettingsGetApiResponse,
            GetFreelancerSettingsApiV1UsersSettingsGetApiArg
        >({
            query: () => ({ url: `/api/v1/users/settings` }),
        }),
        updateFreelancerSettingsApiV1UsersUserSettingsPut: build.mutation<
            UpdateFreelancerSettingsApiV1UsersUserSettingsPutApiResponse,
            UpdateFreelancerSettingsApiV1UsersUserSettingsPutApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/user/settings`,
                method: 'PUT',
                body: queryArg.userSettingsUpdate,
            }),
        }),
        updateFreelancerSettingsApiV1UsersUserSettingsPatch: build.mutation<
            UpdateFreelancerSettingsApiV1UsersUserSettingsPatchApiResponse,
            UpdateFreelancerSettingsApiV1UsersUserSettingsPatchApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/user/settings`,
                method: 'PATCH',
                body: queryArg.userSettingsUpdatePatch,
            }),
        }),
        updateUserFieldsApiV1UsersSoffSellerIdUpdatePatch: build.mutation<
            UpdateUserFieldsApiV1UsersSoffSellerIdUpdatePatchApiResponse,
            UpdateUserFieldsApiV1UsersSoffSellerIdUpdatePatchApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/${queryArg.soffSellerId}/update/`,
                method: 'PATCH',
                body: queryArg.userProfileUpdate,
            }),
        }),
        hasServicePortfolioApiV1UsersCheckServicePortfolioGet: build.query<
            HasServicePortfolioApiV1UsersCheckServicePortfolioGetApiResponse,
            HasServicePortfolioApiV1UsersCheckServicePortfolioGetApiArg
        >({
            query: () => ({ url: `/api/v1/users/check/service-portfolio` }),
        }),
        setUserNotificationApiV1UsersToggleNotificationPost: build.mutation<
            SetUserNotificationApiV1UsersToggleNotificationPostApiResponse,
            SetUserNotificationApiV1UsersToggleNotificationPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/toggle-notification`,
                method: 'POST',
                body: queryArg.notificationUpdateRequest,
            }),
        }),
        checkSellerWalletApiV1UsersSellerWalletSoffSellerIdGet: build.query<
            CheckSellerWalletApiV1UsersSellerWalletSoffSellerIdGetApiResponse,
            CheckSellerWalletApiV1UsersSellerWalletSoffSellerIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/seller-wallet/${queryArg.soffSellerId}`,
            }),
        }),
        updateExtraPhoneNumberApiV1UsersUpdatePhonePatch: build.mutation<
            UpdateExtraPhoneNumberApiV1UsersUpdatePhonePatchApiResponse,
            UpdateExtraPhoneNumberApiV1UsersUpdatePhonePatchApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/update-phone/`,
                method: 'PATCH',
                body: queryArg.bodyUpdateExtraPhoneNumberApiV1UsersUpdatePhonePatch,
            }),
        }),
        getProfileProgressApiV1UsersProgressFreelancerGet: build.query<
            GetProfileProgressApiV1UsersProgressFreelancerGetApiResponse,
            GetProfileProgressApiV1UsersProgressFreelancerGetApiArg
        >({
            query: () => ({ url: `/api/v1/users/progress/freelancer` }),
        }),
        getUsersListApiV1UsersFreelancersListGet: build.query<
            GetUsersListApiV1UsersFreelancersListGetApiResponse,
            GetUsersListApiV1UsersFreelancersListGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/users/freelancers/list`,
                params: {
                    search: queryArg.search,
                    limit: queryArg.limit,
                    offset: queryArg.offset,
                    direction: queryArg.direction,
                    position: queryArg.position,
                    sort_by: queryArg.sortBy,
                    order: queryArg.order,
                },
            }),
        }),
        telegramLoginApiV1AuthTelegramPost: build.mutation<
            TelegramLoginApiV1AuthTelegramPostApiResponse,
            TelegramLoginApiV1AuthTelegramPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/auth/telegram/`,
                method: 'POST',
                body: queryArg.telegramUser,
            }),
        }),
        loginApiV1AuthLoginPost: build.mutation<
            LoginApiV1AuthLoginPostApiResponse,
            LoginApiV1AuthLoginPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/auth/login`,
                method: 'POST',
                body: queryArg.bodyLoginApiV1AuthLoginPost,
            }),
        }),
        requestBuyerLoginCodeApiV1AuthBuyerLoginRequestCodePost: build.mutation<
            RequestBuyerLoginCodeApiV1AuthBuyerLoginRequestCodePostApiResponse,
            RequestBuyerLoginCodeApiV1AuthBuyerLoginRequestCodePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/auth/buyer-login/request-code`,
                method: 'POST',
                body: queryArg.loginInput,
            }),
        }),
        verifyBuyerLoginCodeApiV1AuthBuyerLoginVerifyCodePost: build.mutation<
            VerifyBuyerLoginCodeApiV1AuthBuyerLoginVerifyCodePostApiResponse,
            VerifyBuyerLoginCodeApiV1AuthBuyerLoginVerifyCodePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/auth/buyer-login/verify-code`,
                method: 'POST',
                params: {
                    user_id: queryArg.userId,
                    code: queryArg.code,
                },
            }),
        }),
        requestSellerLoginCodeApiV1AuthSellerLoginRequestCodePost:
            build.mutation<
                RequestSellerLoginCodeApiV1AuthSellerLoginRequestCodePostApiResponse,
                RequestSellerLoginCodeApiV1AuthSellerLoginRequestCodePostApiArg
            >({
                query: (queryArg) => ({
                    url: `/api/v1/auth/seller-login/request-code`,
                    method: 'POST',
                    body: queryArg.loginInput,
                }),
            }),
        verifySellerLoginCodeApiV1AuthSellerLoginVerifyCodePost: build.mutation<
            VerifySellerLoginCodeApiV1AuthSellerLoginVerifyCodePostApiResponse,
            VerifySellerLoginCodeApiV1AuthSellerLoginVerifyCodePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/auth/seller-login/verify-code`,
                method: 'POST',
                params: {
                    user_id: queryArg.userId,
                    code: queryArg.code,
                },
            }),
        }),
        loginViaGoogleApiV1AuthGoogleGet: build.query<
            LoginViaGoogleApiV1AuthGoogleGetApiResponse,
            LoginViaGoogleApiV1AuthGoogleGetApiArg
        >({
            query: () => ({ url: `/api/v1/auth/google` }),
        }),
        googleCallbackApiV1AuthGoogleCallbackGet: build.query<
            GoogleCallbackApiV1AuthGoogleCallbackGetApiResponse,
            GoogleCallbackApiV1AuthGoogleCallbackGetApiArg
        >({
            query: () => ({ url: `/api/v1/auth/google/callback` }),
        }),
        sendVerificationCodeApiV1ApiAuthSendCodePost: build.mutation<
            SendVerificationCodeApiV1ApiAuthSendCodePostApiResponse,
            SendVerificationCodeApiV1ApiAuthSendCodePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/api/auth/send-code`,
                method: 'POST',
                body: queryArg.phoneRequest,
            }),
        }),
        verifyCodeApiV1ApiAuthVerifyCodePost: build.mutation<
            VerifyCodeApiV1ApiAuthVerifyCodePostApiResponse,
            VerifyCodeApiV1ApiAuthVerifyCodePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/api/auth/verify-code`,
                method: 'POST',
                body: queryArg.verifyCodeRequest,
            }),
        }),
        uploadImageApiV1UploadPost: build.mutation<
            UploadImageApiV1UploadPostApiResponse,
            UploadImageApiV1UploadPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/upload/`,
                method: 'POST',
                body: queryArg.bodyUploadImageApiV1UploadPost,
            }),
        }),
        uploadFileApiV1UploadFilePost: build.mutation<
            UploadFileApiV1UploadFilePostApiResponse,
            UploadFileApiV1UploadFilePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/upload/file`,
                method: 'POST',
                body: queryArg.bodyUploadFileApiV1UploadFilePost,
            }),
        }),
        getMyOrdersApiV1OrderGet: build.query<
            GetMyOrdersApiV1OrderGetApiResponse,
            GetMyOrdersApiV1OrderGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/`,
                params: {
                    status: queryArg.status,
                    order_status: queryArg.orderStatus,
                    order_type: queryArg.orderType,
                    page: queryArg.page,
                    limit: queryArg.limit,
                },
            }),
        }),
        getMyOrdersApiV1OrderSellerGet: build.query<
            GetMyOrdersApiV1OrderSellerGetApiResponse,
            GetMyOrdersApiV1OrderSellerGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/seller`,
                params: {
                    status: queryArg.status,
                },
            }),
        }),
        getOrderApiV1OrderSellerOrderIdGet: build.query<
            GetOrderApiV1OrderSellerOrderIdGetApiResponse,
            GetOrderApiV1OrderSellerOrderIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/seller/${queryArg.orderId}`,
            }),
        }),
        getOrderApiV1OrderOrderIdGet: build.query<
            GetOrderApiV1OrderOrderIdGetApiResponse,
            GetOrderApiV1OrderOrderIdGetApiArg
        >({
            query: (queryArg) => ({ url: `/api/v1/order/${queryArg.orderId}` }),
        }),
        getOrderNotesApiV1OrderOrderNoteOrderIdGet: build.query<
            GetOrderNotesApiV1OrderOrderNoteOrderIdGetApiResponse,
            GetOrderNotesApiV1OrderOrderNoteOrderIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/order-note/${queryArg.orderId}`,
            }),
        }),
        updateOrderNoteStatusApiV1OrderOrderNoteNoteIdPatch: build.mutation<
            UpdateOrderNoteStatusApiV1OrderOrderNoteNoteIdPatchApiResponse,
            UpdateOrderNoteStatusApiV1OrderOrderNoteNoteIdPatchApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/order-note/${queryArg.noteId}/`,
                method: 'PATCH',
                body: queryArg.bodyUpdateOrderNoteStatusApiV1OrderOrderNoteNoteIdPatch,
            }),
        }),
        sendServiceOrderFileApiV1OrderOrderIdSendFilePost: build.mutation<
            SendServiceOrderFileApiV1OrderOrderIdSendFilePostApiResponse,
            SendServiceOrderFileApiV1OrderOrderIdSendFilePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/${queryArg.orderId}/send-file`,
                method: 'POST',
                body: queryArg.bodySendServiceOrderFileApiV1OrderOrderIdSendFilePost,
            }),
        }),
        editServiceOrderFileApiV1OrderOrderIdEditFilePatch: build.mutation<
            EditServiceOrderFileApiV1OrderOrderIdEditFilePatchApiResponse,
            EditServiceOrderFileApiV1OrderOrderIdEditFilePatchApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/${queryArg.orderId}/edit-file`,
                method: 'PATCH',
                body: queryArg.bodyEditServiceOrderFileApiV1OrderOrderIdEditFilePatch,
            }),
        }),
        getOrderFileApiV1OrderOrderIdFileGet: build.query<
            GetOrderFileApiV1OrderOrderIdFileGetApiResponse,
            GetOrderFileApiV1OrderOrderIdFileGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/${queryArg.orderId}/file`,
            }),
        }),
        getOrderFilesApiV1OrderOrderIdFilesGet: build.query<
            GetOrderFilesApiV1OrderOrderIdFilesGetApiResponse,
            GetOrderFilesApiV1OrderOrderIdFilesGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/${queryArg.orderId}/files`,
            }),
        }),
        getOrderFileByIdApiV1OrderOrderIdFileFileIdGet: build.query<
            GetOrderFileByIdApiV1OrderOrderIdFileFileIdGetApiResponse,
            GetOrderFileByIdApiV1OrderOrderIdFileFileIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/${queryArg.orderId}/file/${queryArg.fileId}`,
            }),
        }),
        deleteOrderFileApiV1OrderOrderIdFileFileIdDelete: build.mutation<
            DeleteOrderFileApiV1OrderOrderIdFileFileIdDeleteApiResponse,
            DeleteOrderFileApiV1OrderOrderIdFileFileIdDeleteApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/${queryArg.orderId}/file/${queryArg.fileId}`,
                method: 'DELETE',
            }),
        }),
        orderStatusDoingApiV1OrderOrderStatusDoingGet: build.query<
            OrderStatusDoingApiV1OrderOrderStatusDoingGetApiResponse,
            OrderStatusDoingApiV1OrderOrderStatusDoingGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/order-status-doing/`,
                params: {
                    is_seller: queryArg.isSeller,
                },
            }),
        }),
        updateOrderStatusApiV1OrderOrderIdStatusPost: build.mutation<
            UpdateOrderStatusApiV1OrderOrderIdStatusPostApiResponse,
            UpdateOrderStatusApiV1OrderOrderIdStatusPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/${queryArg.orderId}/status`,
                method: 'POST',
                body: queryArg.bodyUpdateOrderStatusApiV1OrderOrderIdStatusPost,
                headers: {
                    authorization: queryArg.authorization,
                },
            }),
        }),
        newApprovedOrdersCountApiV1OrderApprovedGet: build.query<
            NewApprovedOrdersCountApiV1OrderApprovedGetApiResponse,
            NewApprovedOrdersCountApiV1OrderApprovedGetApiArg
        >({
            query: () => ({ url: `/api/v1/order/approved/` }),
        }),
        customerOrderApiV1OrderCustomOrderPost: build.mutation<
            CustomerOrderApiV1OrderCustomOrderPostApiResponse,
            CustomerOrderApiV1OrderCustomOrderPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/custom-order`,
                method: 'POST',
                body: queryArg.bodyCustomerOrderApiV1OrderCustomOrderPost,
            }),
        }),
        customerOrdersApiV1OrderCustomerOrdersGet: build.query<
            CustomerOrdersApiV1OrderCustomerOrdersGetApiResponse,
            CustomerOrdersApiV1OrderCustomerOrdersGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/customer-orders/`,
                params: {
                    page: queryArg.page,
                    page_size: queryArg.pageSize,
                    category_id: queryArg.categoryId,
                    direction: queryArg.direction,
                },
            }),
        }),
        customOrderCountApiV1OrderCountCustomOrderGet: build.query<
            CustomOrderCountApiV1OrderCountCustomOrderGetApiResponse,
            CustomOrderCountApiV1OrderCountCustomOrderGetApiArg
        >({
            query: () => ({ url: `/api/v1/order/count/custom-order` }),
        }),
        directOrderApiV1OrderDirectOrderPost: build.mutation<
            DirectOrderApiV1OrderDirectOrderPostApiResponse,
            DirectOrderApiV1OrderDirectOrderPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/order/direct-order`,
                method: 'POST',
                body: queryArg.bodyDirectOrderApiV1OrderDirectOrderPost,
            }),
        }),
        generatePaymentLinksApiV1PaymentCreateServiceOrderPost: build.mutation<
            GeneratePaymentLinksApiV1PaymentCreateServiceOrderPostApiResponse,
            GeneratePaymentLinksApiV1PaymentCreateServiceOrderPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/payment/create-service-order/`,
                method: 'POST',
                body: queryArg.bodyGeneratePaymentLinksApiV1PaymentCreateServiceOrderPost,
            }),
        }),
        verifyCardOrderApiV1PaymentVerifyCardOrderPost: build.mutation<
            VerifyCardOrderApiV1PaymentVerifyCardOrderPostApiResponse,
            VerifyCardOrderApiV1PaymentVerifyCardOrderPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/payment/verify-card-order/`,
                method: 'POST',
                body: queryArg.paymentVerifySchema,
            }),
        }),
        checkOrderPaymentStatusApiV1PaymentCheckOrderTransactionIdPost:
            build.mutation<
                CheckOrderPaymentStatusApiV1PaymentCheckOrderTransactionIdPostApiResponse,
                CheckOrderPaymentStatusApiV1PaymentCheckOrderTransactionIdPostApiArg
            >({
                query: (queryArg) => ({
                    url: `/api/v1/payment/check-order/${queryArg.transactionId}/`,
                    method: 'POST',
                }),
            }),
        approveOrderPaymentApiV1PaymentApproveOrderTransactionIdPost:
            build.mutation<
                ApproveOrderPaymentApiV1PaymentApproveOrderTransactionIdPostApiResponse,
                ApproveOrderPaymentApiV1PaymentApproveOrderTransactionIdPostApiArg
            >({
                query: (queryArg) => ({
                    url: `/api/v1/payment/approve-order/${queryArg.transactionId}/`,
                    method: 'POST',
                    body: queryArg.bodyApproveOrderPaymentApiV1PaymentApproveOrderTransactionIdPost,
                }),
            }),
        checkUserBalanceApiV1PaymentGetUserWalletPost: build.mutation<
            CheckUserBalanceApiV1PaymentGetUserWalletPostApiResponse,
            CheckUserBalanceApiV1PaymentGetUserWalletPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/payment/get-user-wallet/`,
                method: 'POST',
                body: queryArg.bodyCheckUserBalanceApiV1PaymentGetUserWalletPost,
            }),
        }),
        deductUserBalanceApiV1PaymentDeductUserWalletPost: build.mutation<
            DeductUserBalanceApiV1PaymentDeductUserWalletPostApiResponse,
            DeductUserBalanceApiV1PaymentDeductUserWalletPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/payment/deduct-user-wallet/`,
                method: 'POST',
                body: queryArg.bodyDeductUserBalanceApiV1PaymentDeductUserWalletPost,
            }),
        }),
        paymeWebhookApiV1PaymentWebhookPaymePost: build.mutation<
            PaymeWebhookApiV1PaymentWebhookPaymePostApiResponse,
            PaymeWebhookApiV1PaymentWebhookPaymePostApiArg
        >({
            query: () => ({
                url: `/api/v1/payment/webhook/payme`,
                method: 'POST',
            }),
        }),
        createPortfolioApiV1PortfolioCreatePost: build.mutation<
            CreatePortfolioApiV1PortfolioCreatePostApiResponse,
            CreatePortfolioApiV1PortfolioCreatePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/portfolio/create`,
                method: 'POST',
                body: queryArg.bodyCreatePortfolioApiV1PortfolioCreatePost,
            }),
        }),
        myPortfolioApiV1PortfolioGet: build.query<
            MyPortfolioApiV1PortfolioGetApiResponse,
            MyPortfolioApiV1PortfolioGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/portfolio/`,
                params: {
                    search: queryArg.search,
                    status: queryArg.status,
                    category_id: queryArg.categoryId,
                },
            }),
        }),
        getPortfolioApiV1PortfolioPortfolioIdGet: build.query<
            GetPortfolioApiV1PortfolioPortfolioIdGetApiResponse,
            GetPortfolioApiV1PortfolioPortfolioIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/portfolio/${queryArg.portfolioId}`,
            }),
        }),
        portfolioUpdateApiV1PortfolioUpdatePortfolioIdPatch: build.mutation<
            PortfolioUpdateApiV1PortfolioUpdatePortfolioIdPatchApiResponse,
            PortfolioUpdateApiV1PortfolioUpdatePortfolioIdPatchApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/portfolio/update/${queryArg.portfolioId}`,
                method: 'PATCH',
                body: queryArg.bodyPortfolioUpdateApiV1PortfolioUpdatePortfolioIdPatch,
            }),
        }),
        portfolioDeleteApiV1PortfolioDeletePortfolioIdDelete: build.mutation<
            PortfolioDeleteApiV1PortfolioDeletePortfolioIdDeleteApiResponse,
            PortfolioDeleteApiV1PortfolioDeletePortfolioIdDeleteApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/portfolio/delete/${queryArg.portfolioId}`,
                method: 'DELETE',
            }),
        }),
        portfolioStatusCountApiV1PortfolioStatusCountGet: build.query<
            PortfolioStatusCountApiV1PortfolioStatusCountGetApiResponse,
            PortfolioStatusCountApiV1PortfolioStatusCountGetApiArg
        >({
            query: () => ({ url: `/api/v1/portfolio/status-count/` }),
        }),
        getUnseenPortfolioCountApiV1PortfolioUnseenCountGet: build.query<
            GetUnseenPortfolioCountApiV1PortfolioUnseenCountGetApiResponse,
            GetUnseenPortfolioCountApiV1PortfolioUnseenCountGetApiArg
        >({
            query: () => ({ url: `/api/v1/portfolio/unseen/count` }),
        }),
        getPositionByIdApiV1CustomerPositionsPositionIdGet: build.query<
            GetPositionByIdApiV1CustomerPositionsPositionIdGetApiResponse,
            GetPositionByIdApiV1CustomerPositionsPositionIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/customer/positions/${queryArg.positionId}/`,
            }),
        }),
        customerServiceApiV1CustomerGet: build.query<
            CustomerServiceApiV1CustomerGetApiResponse,
            CustomerServiceApiV1CustomerGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/customer/`,
                params: {
                    category_id: queryArg.categoryId,
                    search: queryArg.search,
                    direction: queryArg.direction,
                    limit: queryArg.limit,
                    offset: queryArg.offset,
                },
            }),
        }),
        getServiceApiV1CustomerSlugGet: build.query<
            GetServiceApiV1CustomerSlugGetApiResponse,
            GetServiceApiV1CustomerSlugGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/customer/${queryArg.slug}/`,
            }),
        }),
        createOrderNoteApiV1CustomerOrderNotePost: build.mutation<
            CreateOrderNoteApiV1CustomerOrderNotePostApiResponse,
            CreateOrderNoteApiV1CustomerOrderNotePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/customer/order-note/`,
                method: 'POST',
                body: queryArg.bodyCreateOrderNoteApiV1CustomerOrderNotePost,
            }),
        }),
        getUserPortfoliosApiV1CustomerPortfoliosSoffSellerIdGet: build.query<
            GetUserPortfoliosApiV1CustomerPortfoliosSoffSellerIdGetApiResponse,
            GetUserPortfoliosApiV1CustomerPortfoliosSoffSellerIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/customer/portfolios/${queryArg.soffSellerId}`,
            }),
        }),
        getSellerServicesApiV1CustomerServicesSoffSellerIdGet: build.query<
            GetSellerServicesApiV1CustomerServicesSoffSellerIdGetApiResponse,
            GetSellerServicesApiV1CustomerServicesSoffSellerIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/customer/services/${queryArg.soffSellerId}`,
            }),
        }),
        getServiceFeedbacksApiV1CustomerServiceFeedbacksGet: build.query<
            GetServiceFeedbacksApiV1CustomerServiceFeedbacksGetApiResponse,
            GetServiceFeedbacksApiV1CustomerServiceFeedbacksGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/customer/service/feedbacks/`,
                params: {
                    service_id: queryArg.serviceId,
                    user_id: queryArg.userId,
                    order_id: queryArg.orderId,
                    page: queryArg.page,
                },
            }),
        }),
        getLast5ServicesApiV1CustomerLastGet: build.query<
            GetLast5ServicesApiV1CustomerLastGetApiResponse,
            GetLast5ServicesApiV1CustomerLastGetApiArg
        >({
            query: () => ({ url: `/api/v1/customer/last` }),
        }),
        getTopFreelancerCategoriesApiV1CustomerTopCategoriesSoffSellerIdGet:
            build.query<
                GetTopFreelancerCategoriesApiV1CustomerTopCategoriesSoffSellerIdGetApiResponse,
                GetTopFreelancerCategoriesApiV1CustomerTopCategoriesSoffSellerIdGetApiArg
            >({
                query: (queryArg) => ({
                    url: `/api/v1/customer/top-categories/${queryArg.soffSellerId}`,
                    params: {
                        limit: queryArg.limit,
                    },
                }),
            }),
        searchGoogleStyleApiV1CustomerSearchPageGet: build.query<
            SearchGoogleStyleApiV1CustomerSearchPageGetApiResponse,
            SearchGoogleStyleApiV1CustomerSearchPageGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/customer/search-page`,
                params: {
                    search: queryArg.search,
                    limit: queryArg.limit,
                },
            }),
        }),
        topServicesApiV1CustomerPopularServicesGet: build.query<
            TopServicesApiV1CustomerPopularServicesGetApiResponse,
            TopServicesApiV1CustomerPopularServicesGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/customer/popular-services`,
                params: {
                    limit: queryArg.limit,
                    direction: queryArg.direction,
                },
            }),
        }),
        createChatApiV1ChatsCreatePost: build.mutation<
            CreateChatApiV1ChatsCreatePostApiResponse,
            CreateChatApiV1ChatsCreatePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/chats/create`,
                method: 'POST',
                body: queryArg.bodyCreateChatApiV1ChatsCreatePost,
            }),
        }),
        sendMessageApiV1ChatsMessagePost: build.mutation<
            SendMessageApiV1ChatsMessagePostApiResponse,
            SendMessageApiV1ChatsMessagePostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/chats/message`,
                method: 'POST',
                body: queryArg.bodySendMessageApiV1ChatsMessagePost,
            }),
        }),
        markMessageReadApiV1ChatsMessagesMessageIdReadPatch: build.mutation<
            MarkMessageReadApiV1ChatsMessagesMessageIdReadPatchApiResponse,
            MarkMessageReadApiV1ChatsMessagesMessageIdReadPatchApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/chats/messages/${queryArg.messageId}/read`,
                method: 'PATCH',
            }),
        }),
        getChatApiV1ChatsChatIdGet: build.query<
            GetChatApiV1ChatsChatIdGetApiResponse,
            GetChatApiV1ChatsChatIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/chats/${queryArg.chatId}`,
                params: {
                    page: queryArg.page,
                    per_page: queryArg.perPage,
                },
            }),
        }),
        updateMessageApiV1ChatsMessagesPut: build.mutation<
            UpdateMessageApiV1ChatsMessagesPutApiResponse,
            UpdateMessageApiV1ChatsMessagesPutApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/chats/messages`,
                method: 'PUT',
                body: queryArg.bodyUpdateMessageApiV1ChatsMessagesPut,
            }),
        }),
        deleteMessageApiV1ChatsMessagesDelete: build.mutation<
            DeleteMessageApiV1ChatsMessagesDeleteApiResponse,
            DeleteMessageApiV1ChatsMessagesDeleteApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/chats/messages`,
                method: 'DELETE',
                body: queryArg.bodyDeleteMessageApiV1ChatsMessagesDelete,
            }),
        }),
        getChatListApiV1ChatsGet: build.query<
            GetChatListApiV1ChatsGetApiResponse,
            GetChatListApiV1ChatsGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/chats/`,
                params: {
                    search: queryArg.search,
                    page: queryArg.page,
                    limit: queryArg.limit,
                },
            }),
        }),
        getUnreadCountApiV1ChatsUnreadCountGet: build.query<
            GetUnreadCountApiV1ChatsUnreadCountGetApiResponse,
            GetUnreadCountApiV1ChatsUnreadCountGetApiArg
        >({
            query: () => ({ url: `/api/v1/chats/unread_count/` }),
        }),
        customerServiceApiV1AdminGet: build.query<
            CustomerServiceApiV1AdminGetApiResponse,
            CustomerServiceApiV1AdminGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/`,
                params: {
                    status: queryArg.status,
                    search: queryArg.search,
                    limit: queryArg.limit,
                    offset: queryArg.offset,
                },
            }),
        }),
        updateServiceApiV1AdminServiceIdUpdatePut: build.mutation<
            UpdateServiceApiV1AdminServiceIdUpdatePutApiResponse,
            UpdateServiceApiV1AdminServiceIdUpdatePutApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/${queryArg.serviceId}/update/`,
                method: 'PUT',
                body: queryArg.bodyUpdateServiceApiV1AdminServiceIdUpdatePut,
            }),
        }),
        allPortfolioApiV1AdminPortfolioGet: build.query<
            AllPortfolioApiV1AdminPortfolioGetApiResponse,
            AllPortfolioApiV1AdminPortfolioGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/portfolio/`,
                params: {
                    search: queryArg.search,
                    status: queryArg.status,
                    category_id: queryArg.categoryId,
                },
            }),
        }),
        adminPortfolioUpdateApiV1AdminPortfolioPortfolioIdUpdatePatch:
            build.mutation<
                AdminPortfolioUpdateApiV1AdminPortfolioPortfolioIdUpdatePatchApiResponse,
                AdminPortfolioUpdateApiV1AdminPortfolioPortfolioIdUpdatePatchApiArg
            >({
                query: (queryArg) => ({
                    url: `/api/v1/admin/portfolio/${queryArg.portfolioId}/update/`,
                    method: 'PATCH',
                    body: queryArg.bodyAdminPortfolioUpdateApiV1AdminPortfolioPortfolioIdUpdatePatch,
                }),
            }),
        getModerationCountApiV1AdminModerationCountGet: build.query<
            GetModerationCountApiV1AdminModerationCountGetApiResponse,
            GetModerationCountApiV1AdminModerationCountGetApiArg
        >({
            query: () => ({ url: `/api/v1/admin/moderation/count` }),
        }),
        getOrdersForAdminApiV1AdminOrderListGet: build.query<
            GetOrdersForAdminApiV1AdminOrderListGetApiResponse,
            GetOrdersForAdminApiV1AdminOrderListGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/order-list`,
                params: {
                    status: queryArg.status,
                    order_id: queryArg.orderId,
                    order_title: queryArg.orderTitle,
                    search: queryArg.search,
                    category: queryArg.category,
                    direction: queryArg.direction,
                    order_type: queryArg.orderType,
                    start_date: queryArg.startDate,
                    end_date: queryArg.endDate,
                    deadline_start_date: queryArg.deadlineStartDate,
                    deadline_end_date: queryArg.deadlineEndDate,
                    is_new: queryArg.isNew,
                    page: queryArg.page,
                    page_size: queryArg.pageSize,
                },
            }),
        }),
        viewChatApiV1AdminAdminChatChatIdGet: build.query<
            ViewChatApiV1AdminAdminChatChatIdGetApiResponse,
            ViewChatApiV1AdminAdminChatChatIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/admin-chat/${queryArg.chatId}`,
            }),
        }),
        completedOrdersStatsApiV1AdminCompletedOrdersGet: build.query<
            CompletedOrdersStatsApiV1AdminCompletedOrdersGetApiResponse,
            CompletedOrdersStatsApiV1AdminCompletedOrdersGetApiArg
        >({
            query: () => ({ url: `/api/v1/admin/completed-orders` }),
        }),
        getLatestOrdersApiV1AdminLastOrdersGet: build.query<
            GetLatestOrdersApiV1AdminLastOrdersGetApiResponse,
            GetLatestOrdersApiV1AdminLastOrdersGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/last-orders`,
                params: {
                    page: queryArg.page,
                    limit: queryArg.limit,
                    status: queryArg.status,
                },
            }),
        }),
        getOrderOffersForAdminApiV1AdminOrdersOrderIdOffersGet: build.query<
            GetOrderOffersForAdminApiV1AdminOrdersOrderIdOffersGetApiResponse,
            GetOrderOffersForAdminApiV1AdminOrdersOrderIdOffersGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/orders/${queryArg.orderId}/offers`,
                params: {
                    page: queryArg.page,
                    page_size: queryArg.pageSize,
                },
            }),
        }),
        getChatsApiV1AdminChatsGet: build.query<
            GetChatsApiV1AdminChatsGetApiResponse,
            GetChatsApiV1AdminChatsGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/chats`,
                params: {
                    search: queryArg.search,
                    page: queryArg.page,
                    page_size: queryArg.pageSize,
                },
            }),
        }),
        rejectOffersApiV1AdminOfferRejectedPost: build.mutation<
            RejectOffersApiV1AdminOfferRejectedPostApiResponse,
            RejectOffersApiV1AdminOfferRejectedPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/offer-rejected`,
                method: 'POST',
                body: queryArg.bodyRejectOffersApiV1AdminOfferRejectedPost,
            }),
        }),
        deleteMessageApiV1AdminMessageDeleteMessageIdDelete: build.mutation<
            DeleteMessageApiV1AdminMessageDeleteMessageIdDeleteApiResponse,
            DeleteMessageApiV1AdminMessageDeleteMessageIdDeleteApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/message_delete/${queryArg.messageId}`,
                method: 'DELETE',
            }),
        }),
        orderCancelApiV1AdminOrderCancelOrderIdPost: build.mutation<
            OrderCancelApiV1AdminOrderCancelOrderIdPostApiResponse,
            OrderCancelApiV1AdminOrderCancelOrderIdPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/order-cancel/${queryArg.orderId}`,
                method: 'POST',
            }),
        }),
        updateOrderCancelReasonApiV1AdminOrderCancelReasonCancelReasonIdPut:
            build.mutation<
                UpdateOrderCancelReasonApiV1AdminOrderCancelReasonCancelReasonIdPutApiResponse,
                UpdateOrderCancelReasonApiV1AdminOrderCancelReasonCancelReasonIdPutApiArg
            >({
                query: (queryArg) => ({
                    url: `/api/v1/admin/order-cancel-reason/${queryArg.cancelReasonId}`,
                    method: 'PUT',
                    body: queryArg.bodyUpdateOrderCancelReasonApiV1AdminOrderCancelReasonCancelReasonIdPut,
                }),
            }),
        ordersChartApiV1AdminOrdersChartGet: build.query<
            OrdersChartApiV1AdminOrdersChartGetApiResponse,
            OrdersChartApiV1AdminOrdersChartGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/orders-chart/`,
                params: {
                    year: queryArg.year,
                    month: queryArg.month,
                },
            }),
        }),
        getSellerIncomeApiV1AdminSellerSoffSellerIdIncomeGet: build.query<
            GetSellerIncomeApiV1AdminSellerSoffSellerIdIncomeGetApiResponse,
            GetSellerIncomeApiV1AdminSellerSoffSellerIdIncomeGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/seller/${queryArg.soffSellerId}/income`,
                params: {
                    start_date: queryArg.startDate,
                    end_date: queryArg.endDate,
                },
            }),
        }),
        getSellerServicesApiV1AdminSellerSoffSellerIdServicesGet: build.query<
            GetSellerServicesApiV1AdminSellerSoffSellerIdServicesGetApiResponse,
            GetSellerServicesApiV1AdminSellerSoffSellerIdServicesGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/seller/${queryArg.soffSellerId}/services`,
                params: {
                    status: queryArg.status,
                    search: queryArg.search,
                    limit: queryArg.limit,
                    offset: queryArg.offset,
                },
            }),
        }),
        getSellerPortfoliosApiV1AdminSellerSoffSellerIdPortfoliosGet:
            build.query<
                GetSellerPortfoliosApiV1AdminSellerSoffSellerIdPortfoliosGetApiResponse,
                GetSellerPortfoliosApiV1AdminSellerSoffSellerIdPortfoliosGetApiArg
            >({
                query: (queryArg) => ({
                    url: `/api/v1/admin/seller/${queryArg.soffSellerId}/portfolios`,
                    params: {
                        search: queryArg.search,
                        status: queryArg.status,
                        category_id: queryArg.categoryId,
                        limit: queryArg.limit,
                        offset: queryArg.offset,
                    },
                }),
            }),
        getSellerOrderCountsApiV1AdminSellerSoffSellerIdOrderCountsGet:
            build.query<
                GetSellerOrderCountsApiV1AdminSellerSoffSellerIdOrderCountsGetApiResponse,
                GetSellerOrderCountsApiV1AdminSellerSoffSellerIdOrderCountsGetApiArg
            >({
                query: (queryArg) => ({
                    url: `/api/v1/admin/seller/${queryArg.soffSellerId}/order-counts`,
                }),
            }),
        getSellerChatListApiV1AdminSellerSoffSellerIdChatsGet: build.query<
            GetSellerChatListApiV1AdminSellerSoffSellerIdChatsGetApiResponse,
            GetSellerChatListApiV1AdminSellerSoffSellerIdChatsGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/admin/seller/${queryArg.soffSellerId}/chats`,
                params: {
                    search: queryArg.search,
                    limit: queryArg.limit,
                    offset: queryArg.offset,
                },
            }),
        }),
        createOfferApiV1OfferPost: build.mutation<
            CreateOfferApiV1OfferPostApiResponse,
            CreateOfferApiV1OfferPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/offer/`,
                method: 'POST',
                body: queryArg.bodyCreateOfferApiV1OfferPost,
            }),
        }),
        getOrderOffersApiV1OfferOrderIdGet: build.query<
            GetOrderOffersApiV1OfferOrderIdGetApiResponse,
            GetOrderOffersApiV1OfferOrderIdGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/offer/${queryArg.orderId}/`,
                params: {
                    page: queryArg.page,
                    limit: queryArg.limit,
                },
            }),
        }),
        selectOfferApiV1OfferSelectOfferPost: build.mutation<
            SelectOfferApiV1OfferSelectOfferPostApiResponse,
            SelectOfferApiV1OfferSelectOfferPostApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/offer/select-offer`,
                method: 'POST',
                body: queryArg.bodySelectOfferApiV1OfferSelectOfferPost,
            }),
        }),
        getOrderOffersCountApiV1OfferOrderIdOffersCountGet: build.query<
            GetOrderOffersCountApiV1OfferOrderIdOffersCountGetApiResponse,
            GetOrderOffersCountApiV1OfferOrderIdOffersCountGetApiArg
        >({
            query: (queryArg) => ({
                url: `/api/v1/offer/${queryArg.orderId}/offers-count/`,
            }),
        }),
    }),
    overrideExisting: false,
});
export { injectedRtkApi as petApi };
export type CreateServiceV2ApiV1SellerServicesCreatePostApiResponse =
    /** status 201 Successful Response */ ServiceCreateResponse;
export type CreateServiceV2ApiV1SellerServicesCreatePostApiArg = {
    bodyCreateServiceV2ApiV1SellerServicesCreatePost: BodyCreateServiceV2ApiV1SellerServicesCreatePost;
};
export type MyServicesApiV1SellerServicesGetApiResponse =
    /** status 200 Successful Response */ ServiceRead[];
export type MyServicesApiV1SellerServicesGetApiArg = {
    search?: string;
    status?: string;
};
export type SellerServiceDetailApiV1SellerServicesServiceIdGetApiResponse =
    /** status 200 Successful Response */ ServiceDetailSchema;
export type SellerServiceDetailApiV1SellerServicesServiceIdGetApiArg = {
    serviceId: number;
};
export type UpdateServiceApiV1SellerServicesServiceIdUpdatePutApiResponse =
    /** status 200 Successful Response */ ServiceCreateResponse;
export type UpdateServiceApiV1SellerServicesServiceIdUpdatePutApiArg = {
    /** ID of the service to update */
    serviceId: number;
    bodyUpdateServiceApiV1SellerServicesServiceIdUpdatePut: BodyUpdateServiceApiV1SellerServicesServiceIdUpdatePut;
};
export type UpdateServiceApiV1SellerServicesServiceIdDeleteDeleteApiResponse =
    /** status 200 Successful Response */ any;
export type UpdateServiceApiV1SellerServicesServiceIdDeleteDeleteApiArg = {
    /** ID of the service to update */
    serviceId: number;
};
export type SellerDashboardApiV1SellerServicesDashboardGetApiResponse =
    /** status 200 Successful Response */ object;
export type SellerDashboardApiV1SellerServicesDashboardGetApiArg = void;
export type GetOrderCancelReasonsApiV1SellerServicesOrderCancelReasonsGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetOrderCancelReasonsApiV1SellerServicesOrderCancelReasonsGetApiArg =
    {
        cancelType?: string;
    };
export type MyServiceStatusCountApiV1SellerServicesStatusCountGetApiResponse =
    /** status 200 Successful Response */ any;
export type MyServiceStatusCountApiV1SellerServicesStatusCountGetApiArg = void;
export type SetPauseServiceApiV1SellerServicesServiceIdPausePutApiResponse =
    /** status 200 Successful Response */ any;
export type SetPauseServiceApiV1SellerServicesServiceIdPausePutApiArg = {
    serviceId: number;
    pauseServiceRequest: PauseServiceRequest;
};
export type GetAdminUnseenServicesCountApiV1SellerServicesUnseenCountGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetAdminUnseenServicesCountApiV1SellerServicesUnseenCountGetApiArg =
    void;
export type GetCategoriesApiV1CategoriesGetApiResponse =
    /** status 200 Successful Response */ ServiceCategoryChildRead[];
export type GetCategoriesApiV1CategoriesGetApiArg = {
    parentId?: number;
    /** Category direction filter */
    direction?: CategoryDirectionEnum;
    categoryId?: number;
};
export type CreateCategoryApiV1CategoriesPostApiResponse =
    /** status 200 Successful Response */ ServiceCategoryRead;
export type CreateCategoryApiV1CategoriesPostApiArg = {
    direction: CategoryDirectionEnum;
    title: string;
};
export type GetCategoryApiV1CategoriesCategoryIdGetApiResponse =
    /** status 200 Successful Response */ ServiceCategoryRead;
export type GetCategoryApiV1CategoriesCategoryIdGetApiArg = {
    categoryId: number;
};
export type DeleteCategoryApiV1CategoriesCategoryIdDeleteApiResponse =
    /** status 200 Successful Response */ any;
export type DeleteCategoryApiV1CategoriesCategoryIdDeleteApiArg = {
    categoryId: number;
};
export type GetChildCategoriesApiV1CategoriesCategoriesChildrenGetApiResponse =
    /** status 200 Successful Response */ ServiceCategoryRead[];
export type GetChildCategoriesApiV1CategoriesCategoriesChildrenGetApiArg = {
    parentCategoryId: number;
};
export type GetPriceDeliveryApiV1CategoriesPriceDeliveryCategoryIdGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetPriceDeliveryApiV1CategoriesPriceDeliveryCategoryIdGetApiArg = {
    categoryId: number;
};
export type GetServiceCategoriesApiV1CategoriesCategoriesListGetApiResponse =
    /** status 200 Successful Response */ {
        [key: string]: ParentCategorySchema[];
    };
export type GetServiceCategoriesApiV1CategoriesCategoriesListGetApiArg = void;
export type GetCategoriesWithDirectionsApiV1CategoriesCategoriesWithDirectionsGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetCategoriesWithDirectionsApiV1CategoriesCategoriesWithDirectionsGetApiArg =
    void;
export type GetAllDirectionsApiV1CategoriesAllDirectionsGetApiResponse =
    /** status 200 Successful Response */ object[];
export type GetAllDirectionsApiV1CategoriesAllDirectionsGetApiArg = void;
export type GetSellersApiV1UsersSellersGetApiResponse =
    /** status 200 Successful Response */ SellerListResponse;
export type GetSellersApiV1UsersSellersGetApiArg = {
    /** Mutaxassisni izlash */
    search?: string;
    limit?: number;
    offset?: number;
    direction?: PositionDirectionEnum;
    position?: string[];
    sortedBy?: SellerSortEnum;
};
export type CreateSellerApiV1UsersSellersPostApiResponse =
    /** status 200 Successful Response */ SellerSoffRead;
export type CreateSellerApiV1UsersSellersPostApiArg = {
    sellerSoffCreate: SellerSoffCreate;
};
export type GetSellersServiceApiV1UsersSellersServiceGetApiResponse =
    /** status 200 Successful Response */ object;
export type GetSellersServiceApiV1UsersSellersServiceGetApiArg = {
    /** Xizmat, mutaxassis ismi yoki status bo‘yicha qidirish */
    search?: string;
    /** Ota kategoriya (direction enum) */
    direction?: CategoryDirectionEnum;
    /** Bola kategoriya ID */
    categoryId?: number;
    /** Narx filtri */
    price?: number;
    limit?: number;
    offset?: number;
};
export type CheckFreelancerApiV1UsersCheckFreelanceGetApiResponse =
    /** status 200 Successful Response */ any;
export type CheckFreelancerApiV1UsersCheckFreelanceGetApiArg = void;
export type GetPositionsApiV1UsersPositionsGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetPositionsApiV1UsersPositionsGetApiArg = {
    search?: string;
    direction?: PositionDirectionEnum;
};
export type GetSellerWalletApiV1UsersWalletGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetSellerWalletApiV1UsersWalletGetApiArg = void;
export type GetFreelanceProfileApiV1UsersSoffSellerIdFreelanceProfileGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetFreelanceProfileApiV1UsersSoffSellerIdFreelanceProfileGetApiArg =
    {
        soffSellerId: number;
    };
export type GetFreelancerSettingsApiV1UsersSettingsGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetFreelancerSettingsApiV1UsersSettingsGetApiArg = void;
export type UpdateFreelancerSettingsApiV1UsersUserSettingsPutApiResponse =
    /** status 200 Successful Response */ any;
export type UpdateFreelancerSettingsApiV1UsersUserSettingsPutApiArg = {
    userSettingsUpdate: UserSettingsUpdate;
};
export type UpdateFreelancerSettingsApiV1UsersUserSettingsPatchApiResponse =
    /** status 200 Successful Response */ any;
export type UpdateFreelancerSettingsApiV1UsersUserSettingsPatchApiArg = {
    userSettingsUpdatePatch: UserSettingsUpdatePatch;
};
export type UpdateUserFieldsApiV1UsersSoffSellerIdUpdatePatchApiResponse =
    /** status 200 Successful Response */ any;
export type UpdateUserFieldsApiV1UsersSoffSellerIdUpdatePatchApiArg = {
    soffSellerId: number;
    userProfileUpdate: UserProfileUpdate;
};
export type HasServicePortfolioApiV1UsersCheckServicePortfolioGetApiResponse =
    /** status 200 Successful Response */ any;
export type HasServicePortfolioApiV1UsersCheckServicePortfolioGetApiArg = void;
export type SetUserNotificationApiV1UsersToggleNotificationPostApiResponse =
    /** status 200 Successful Response */ NotificationUpdateResponse;
export type SetUserNotificationApiV1UsersToggleNotificationPostApiArg = {
    notificationUpdateRequest: NotificationUpdateRequest;
};
export type CheckSellerWalletApiV1UsersSellerWalletSoffSellerIdGetApiResponse =
    /** status 200 Successful Response */ any;
export type CheckSellerWalletApiV1UsersSellerWalletSoffSellerIdGetApiArg = {
    /** Soff seller ID */
    soffSellerId: number;
};
export type UpdateExtraPhoneNumberApiV1UsersUpdatePhonePatchApiResponse =
    /** status 200 Successful Response */ any;
export type UpdateExtraPhoneNumberApiV1UsersUpdatePhonePatchApiArg = {
    bodyUpdateExtraPhoneNumberApiV1UsersUpdatePhonePatch: BodyUpdateExtraPhoneNumberApiV1UsersUpdatePhonePatch;
};
export type GetProfileProgressApiV1UsersProgressFreelancerGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetProfileProgressApiV1UsersProgressFreelancerGetApiArg = void;
export type GetUsersListApiV1UsersFreelancersListGetApiResponse =
    /** status 200 Successful Response */ UsersListResponse;
export type GetUsersListApiV1UsersFreelancersListGetApiArg = {
    /** Freelancerni izlash */
    search?: string;
    limit?: number;
    offset?: number;
    /** Position direction bo'yicha filter (comma-separated) */
    direction?: PositionDirectionEnum[];
    /** Position title bo'yicha filter (comma-separated) */
    position?: string[];
    /** Tartiblash: average_rating yoki last_active */
    sortBy?: FreelancerSortEnum;
    /** Tartib: asc yoki desc */
    order?: string;
};
export type TelegramLoginApiV1AuthTelegramPostApiResponse =
    /** status 200 Successful Response */ any;
export type TelegramLoginApiV1AuthTelegramPostApiArg = {
    telegramUser: TelegramUser;
};
export type LoginApiV1AuthLoginPostApiResponse =
    /** status 200 Successful Response */ any;
export type LoginApiV1AuthLoginPostApiArg = {
    bodyLoginApiV1AuthLoginPost: BodyLoginApiV1AuthLoginPost;
};
export type RequestBuyerLoginCodeApiV1AuthBuyerLoginRequestCodePostApiResponse =
    /** status 200 Successful Response */ any;
export type RequestBuyerLoginCodeApiV1AuthBuyerLoginRequestCodePostApiArg = {
    loginInput: LoginInput;
};
export type VerifyBuyerLoginCodeApiV1AuthBuyerLoginVerifyCodePostApiResponse =
    /** status 200 Successful Response */ Token;
export type VerifyBuyerLoginCodeApiV1AuthBuyerLoginVerifyCodePostApiArg = {
    userId: number;
    code: string;
};
export type RequestSellerLoginCodeApiV1AuthSellerLoginRequestCodePostApiResponse =
    /** status 200 Successful Response */ any;
export type RequestSellerLoginCodeApiV1AuthSellerLoginRequestCodePostApiArg = {
    loginInput: LoginInput;
};
export type VerifySellerLoginCodeApiV1AuthSellerLoginVerifyCodePostApiResponse =
    /** status 200 Successful Response */ Token;
export type VerifySellerLoginCodeApiV1AuthSellerLoginVerifyCodePostApiArg = {
    userId: number;
    code: string;
};
export type LoginViaGoogleApiV1AuthGoogleGetApiResponse =
    /** status 200 Successful Response */ any;
export type LoginViaGoogleApiV1AuthGoogleGetApiArg = void;
export type GoogleCallbackApiV1AuthGoogleCallbackGetApiResponse =
    /** status 200 Successful Response */ any;
export type GoogleCallbackApiV1AuthGoogleCallbackGetApiArg = void;
export type SendVerificationCodeApiV1ApiAuthSendCodePostApiResponse =
    /** status 200 Successful Response */ any;
export type SendVerificationCodeApiV1ApiAuthSendCodePostApiArg = {
    phoneRequest: PhoneRequest;
};
export type VerifyCodeApiV1ApiAuthVerifyCodePostApiResponse =
    /** status 200 Successful Response */ any;
export type VerifyCodeApiV1ApiAuthVerifyCodePostApiArg = {
    verifyCodeRequest: VerifyCodeRequest;
};
export type UploadImageApiV1UploadPostApiResponse =
    /** status 200 Successful Response */ any;
export type UploadImageApiV1UploadPostApiArg = {
    bodyUploadImageApiV1UploadPost: BodyUploadImageApiV1UploadPost;
};
export type UploadFileApiV1UploadFilePostApiResponse =
    /** status 200 Successful Response */ any;
export type UploadFileApiV1UploadFilePostApiArg = {
    bodyUploadFileApiV1UploadFilePost: BodyUploadFileApiV1UploadFilePost;
};
export type GetMyOrdersApiV1OrderGetApiResponse =
    /** status 200 Successful Response */ PaginatedOrderSchemasResponse;
export type GetMyOrdersApiV1OrderGetApiArg = {
    /** Filter by order status doing (detailed status). Multiple values can be provided comma-separated (e.g., status=pending,approved,order_accepted) */
    status?: string;
    /** Filter by order status (open, accepted, rejected, completed) */
    orderStatus?: OrderStatusEnum;
    /** Filter by order type (ready_service/custom_order) */
    orderType?: OrderTypeEnum;
    /** Page number */
    page?: number;
    /** Number of items per page */
    limit?: number;
};
export type GetMyOrdersApiV1OrderSellerGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetMyOrdersApiV1OrderSellerGetApiArg = {
    /** Buyurtma statusi bo'yicha filter */
    status?: OrderStatusDoingEnum;
};
export type GetOrderApiV1OrderSellerOrderIdGetApiResponse =
    /** status 200 Successful Response */ OrderSchemas;
export type GetOrderApiV1OrderSellerOrderIdGetApiArg = {
    orderId: number;
};
export type GetOrderApiV1OrderOrderIdGetApiResponse =
    /** status 200 Successful Response */ OrderSchemas;
export type GetOrderApiV1OrderOrderIdGetApiArg = {
    orderId: number;
};
export type GetOrderNotesApiV1OrderOrderNoteOrderIdGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetOrderNotesApiV1OrderOrderNoteOrderIdGetApiArg = {
    orderId: number;
};
export type UpdateOrderNoteStatusApiV1OrderOrderNoteNoteIdPatchApiResponse =
    /** status 200 Successful Response */ any;
export type UpdateOrderNoteStatusApiV1OrderOrderNoteNoteIdPatchApiArg = {
    noteId: number;
    bodyUpdateOrderNoteStatusApiV1OrderOrderNoteNoteIdPatch: BodyUpdateOrderNoteStatusApiV1OrderOrderNoteNoteIdPatch;
};
export type SendServiceOrderFileApiV1OrderOrderIdSendFilePostApiResponse =
    /** status 200 Successful Response */ any;
export type SendServiceOrderFileApiV1OrderOrderIdSendFilePostApiArg = {
    orderId: number;
    bodySendServiceOrderFileApiV1OrderOrderIdSendFilePost: BodySendServiceOrderFileApiV1OrderOrderIdSendFilePost;
};
export type EditServiceOrderFileApiV1OrderOrderIdEditFilePatchApiResponse =
    /** status 200 Successful Response */ any;
export type EditServiceOrderFileApiV1OrderOrderIdEditFilePatchApiArg = {
    orderId: number;
    bodyEditServiceOrderFileApiV1OrderOrderIdEditFilePatch: BodyEditServiceOrderFileApiV1OrderOrderIdEditFilePatch;
};
export type GetOrderFileApiV1OrderOrderIdFileGetApiResponse =
    /** status 200 Successful Response */ FileResponse;
export type GetOrderFileApiV1OrderOrderIdFileGetApiArg = {
    orderId: number;
};
export type GetOrderFilesApiV1OrderOrderIdFilesGetApiResponse =
    /** status 200 Successful Response */ OrderFileResponse[];
export type GetOrderFilesApiV1OrderOrderIdFilesGetApiArg = {
    orderId: number;
};
export type GetOrderFileByIdApiV1OrderOrderIdFileFileIdGetApiResponse =
    /** status 200 Successful Response */ FileResponse;
export type GetOrderFileByIdApiV1OrderOrderIdFileFileIdGetApiArg = {
    orderId: number;
    fileId: number;
};
export type DeleteOrderFileApiV1OrderOrderIdFileFileIdDeleteApiResponse =
    /** status 200 Successful Response */ any;
export type DeleteOrderFileApiV1OrderOrderIdFileFileIdDeleteApiArg = {
    orderId: number;
    fileId: number;
};
export type OrderStatusDoingApiV1OrderOrderStatusDoingGetApiResponse =
    /** status 200 Successful Response */ any;
export type OrderStatusDoingApiV1OrderOrderStatusDoingGetApiArg = {
    /** Is seller or not */
    isSeller?: boolean;
};
export type UpdateOrderStatusApiV1OrderOrderIdStatusPostApiResponse =
    /** status 200 Successful Response */ any;
export type UpdateOrderStatusApiV1OrderOrderIdStatusPostApiArg = {
    orderId: number;
    authorization?: string;
    bodyUpdateOrderStatusApiV1OrderOrderIdStatusPost: BodyUpdateOrderStatusApiV1OrderOrderIdStatusPost;
};
export type NewApprovedOrdersCountApiV1OrderApprovedGetApiResponse =
    /** status 200 Successful Response */ any;
export type NewApprovedOrdersCountApiV1OrderApprovedGetApiArg = void;
export type CustomerOrderApiV1OrderCustomOrderPostApiResponse =
    /** status 200 Successful Response */ any;
export type CustomerOrderApiV1OrderCustomOrderPostApiArg = {
    bodyCustomerOrderApiV1OrderCustomOrderPost: BodyCustomerOrderApiV1OrderCustomOrderPost;
};
export type CustomerOrdersApiV1OrderCustomerOrdersGetApiResponse =
    /** status 200 Successful Response */ PaginatedCustomOrderResponse;
export type CustomerOrdersApiV1OrderCustomerOrdersGetApiArg = {
    /** Page number */
    page?: number;
    /** Items per page */
    pageSize?: number;
    /** Filter by category ID */
    categoryId?: number;
    /** Filter by category direction */
    direction?: CategoryDirectionEnum;
};
export type CustomOrderCountApiV1OrderCountCustomOrderGetApiResponse =
    /** status 200 Successful Response */ any;
export type CustomOrderCountApiV1OrderCountCustomOrderGetApiArg = void;
export type DirectOrderApiV1OrderDirectOrderPostApiResponse =
    /** status 200 Successful Response */ any;
export type DirectOrderApiV1OrderDirectOrderPostApiArg = {
    bodyDirectOrderApiV1OrderDirectOrderPost: BodyDirectOrderApiV1OrderDirectOrderPost;
};
export type GeneratePaymentLinksApiV1PaymentCreateServiceOrderPostApiResponse =
    /** status 200 Successful Response */ any;
export type GeneratePaymentLinksApiV1PaymentCreateServiceOrderPostApiArg = {
    bodyGeneratePaymentLinksApiV1PaymentCreateServiceOrderPost: BodyGeneratePaymentLinksApiV1PaymentCreateServiceOrderPost;
};
export type VerifyCardOrderApiV1PaymentVerifyCardOrderPostApiResponse =
    /** status 200 Successful Response */ any;
export type VerifyCardOrderApiV1PaymentVerifyCardOrderPostApiArg = {
    paymentVerifySchema: PaymentVerifySchema;
};
export type CheckOrderPaymentStatusApiV1PaymentCheckOrderTransactionIdPostApiResponse =
    /** status 200 Successful Response */ any;
export type CheckOrderPaymentStatusApiV1PaymentCheckOrderTransactionIdPostApiArg =
    {
        transactionId: number;
    };
export type ApproveOrderPaymentApiV1PaymentApproveOrderTransactionIdPostApiResponse =
    /** status 200 Successful Response */ any;
export type ApproveOrderPaymentApiV1PaymentApproveOrderTransactionIdPostApiArg =
    {
        transactionId: number;
        bodyApproveOrderPaymentApiV1PaymentApproveOrderTransactionIdPost: BodyApproveOrderPaymentApiV1PaymentApproveOrderTransactionIdPost;
    };
export type CheckUserBalanceApiV1PaymentGetUserWalletPostApiResponse =
    /** status 200 Successful Response */ any;
export type CheckUserBalanceApiV1PaymentGetUserWalletPostApiArg = {
    bodyCheckUserBalanceApiV1PaymentGetUserWalletPost: BodyCheckUserBalanceApiV1PaymentGetUserWalletPost;
};
export type DeductUserBalanceApiV1PaymentDeductUserWalletPostApiResponse =
    /** status 200 Successful Response */ any;
export type DeductUserBalanceApiV1PaymentDeductUserWalletPostApiArg = {
    bodyDeductUserBalanceApiV1PaymentDeductUserWalletPost: BodyDeductUserBalanceApiV1PaymentDeductUserWalletPost;
};
export type PaymeWebhookApiV1PaymentWebhookPaymePostApiResponse =
    /** status 200 Successful Response */ any;
export type PaymeWebhookApiV1PaymentWebhookPaymePostApiArg = void;
export type CreatePortfolioApiV1PortfolioCreatePostApiResponse =
    /** status 201 Successful Response */ PortfolioSchemas;
export type CreatePortfolioApiV1PortfolioCreatePostApiArg = {
    bodyCreatePortfolioApiV1PortfolioCreatePost: BodyCreatePortfolioApiV1PortfolioCreatePost;
};
export type MyPortfolioApiV1PortfolioGetApiResponse =
    /** status 200 Successful Response */ PortfolioViewSchemas[];
export type MyPortfolioApiV1PortfolioGetApiArg = {
    search?: string;
    status?: string;
    categoryId?: number;
};
export type GetPortfolioApiV1PortfolioPortfolioIdGetApiResponse =
    /** status 200 Successful Response */ PortfolioDetailSchemas;
export type GetPortfolioApiV1PortfolioPortfolioIdGetApiArg = {
    portfolioId: number;
};
export type PortfolioUpdateApiV1PortfolioUpdatePortfolioIdPatchApiResponse =
    /** status 200 Successful Response */ PortfolioSchemas;
export type PortfolioUpdateApiV1PortfolioUpdatePortfolioIdPatchApiArg = {
    portfolioId: number;
    bodyPortfolioUpdateApiV1PortfolioUpdatePortfolioIdPatch: BodyPortfolioUpdateApiV1PortfolioUpdatePortfolioIdPatch;
};
export type PortfolioDeleteApiV1PortfolioDeletePortfolioIdDeleteApiResponse =
    /** status 200 Successful Response */ any;
export type PortfolioDeleteApiV1PortfolioDeletePortfolioIdDeleteApiArg = {
    /** ID of the portfolio to delete */
    portfolioId: number;
};
export type PortfolioStatusCountApiV1PortfolioStatusCountGetApiResponse =
    /** status 200 Successful Response */ any;
export type PortfolioStatusCountApiV1PortfolioStatusCountGetApiArg = void;
export type GetUnseenPortfolioCountApiV1PortfolioUnseenCountGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetUnseenPortfolioCountApiV1PortfolioUnseenCountGetApiArg = void;
export type GetPositionByIdApiV1CustomerPositionsPositionIdGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetPositionByIdApiV1CustomerPositionsPositionIdGetApiArg = {
    /** Position ID */
    positionId: number;
};
export type CustomerServiceApiV1CustomerGetApiResponse =
    /** status 200 Successful Response */ CustomerServiceListResponse;
export type CustomerServiceApiV1CustomerGetApiArg = {
    categoryId?: number;
    search?: string;
    direction?: CategoryDirectionEnum;
    limit?: number;
    offset?: number;
};
export type GetServiceApiV1CustomerSlugGetApiResponse =
    /** status 200 Successful Response */ ServiceDetailWithSimilarResponse;
export type GetServiceApiV1CustomerSlugGetApiArg = {
    slug: string;
};
export type CreateOrderNoteApiV1CustomerOrderNotePostApiResponse =
    /** status 200 Successful Response */ any;
export type CreateOrderNoteApiV1CustomerOrderNotePostApiArg = {
    bodyCreateOrderNoteApiV1CustomerOrderNotePost: BodyCreateOrderNoteApiV1CustomerOrderNotePost;
};
export type GetUserPortfoliosApiV1CustomerPortfoliosSoffSellerIdGetApiResponse =
    /** status 200 Successful Response */ CustomerPortfolioSchemas[];
export type GetUserPortfoliosApiV1CustomerPortfoliosSoffSellerIdGetApiArg = {
    /** Seller ID */
    soffSellerId: number;
};
export type GetSellerServicesApiV1CustomerServicesSoffSellerIdGetApiResponse =
    /** status 200 Successful Response */ CustomerServiceSchemas[];
export type GetSellerServicesApiV1CustomerServicesSoffSellerIdGetApiArg = {
    /** Seller ID */
    soffSellerId: number;
};
export type GetServiceFeedbacksApiV1CustomerServiceFeedbacksGetApiResponse =
    /** status 200 Successful Response */ FeedbackListSchema;
export type GetServiceFeedbacksApiV1CustomerServiceFeedbacksGetApiArg = {
    serviceId?: number;
    userId?: number;
    orderId?: number;
    page?: number;
};
export type GetLast5ServicesApiV1CustomerLastGetApiResponse =
    /** status 200 Successful Response */ CustomerServiceSchemas[];
export type GetLast5ServicesApiV1CustomerLastGetApiArg = void;
export type GetTopFreelancerCategoriesApiV1CustomerTopCategoriesSoffSellerIdGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetTopFreelancerCategoriesApiV1CustomerTopCategoriesSoffSellerIdGetApiArg =
    {
        soffSellerId: number;
        limit?: number;
    };
export type SearchGoogleStyleApiV1CustomerSearchPageGetApiResponse =
    /** status 200 Successful Response */ object;
export type SearchGoogleStyleApiV1CustomerSearchPageGetApiArg = {
    /** Qidiruv so'zi */
    search?: string;
    limit?: number;
};
export type TopServicesApiV1CustomerPopularServicesGetApiResponse =
    /** status 200 Successful Response */ any;
export type TopServicesApiV1CustomerPopularServicesGetApiArg = {
    /** Nechta service qaytarilsin */
    limit?: number;
    direction?: CategoryDirectionEnum;
};
export type CreateChatApiV1ChatsCreatePostApiResponse =
    /** status 200 Successful Response */ any;
export type CreateChatApiV1ChatsCreatePostApiArg = {
    bodyCreateChatApiV1ChatsCreatePost: BodyCreateChatApiV1ChatsCreatePost;
};
export type SendMessageApiV1ChatsMessagePostApiResponse =
    /** status 200 Successful Response */ any;
export type SendMessageApiV1ChatsMessagePostApiArg = {
    bodySendMessageApiV1ChatsMessagePost: BodySendMessageApiV1ChatsMessagePost;
};
export type MarkMessageReadApiV1ChatsMessagesMessageIdReadPatchApiResponse =
    /** status 200 Successful Response */ any;
export type MarkMessageReadApiV1ChatsMessagesMessageIdReadPatchApiArg = {
    messageId: number;
};
export type GetChatApiV1ChatsChatIdGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetChatApiV1ChatsChatIdGetApiArg = {
    chatId: number;
    page?: number;
    perPage?: number;
};
export type UpdateMessageApiV1ChatsMessagesPutApiResponse =
    /** status 200 Successful Response */ any;
export type UpdateMessageApiV1ChatsMessagesPutApiArg = {
    bodyUpdateMessageApiV1ChatsMessagesPut: BodyUpdateMessageApiV1ChatsMessagesPut;
};
export type DeleteMessageApiV1ChatsMessagesDeleteApiResponse =
    /** status 200 Successful Response */ any;
export type DeleteMessageApiV1ChatsMessagesDeleteApiArg = {
    bodyDeleteMessageApiV1ChatsMessagesDelete: BodyDeleteMessageApiV1ChatsMessagesDelete;
};
export type GetChatListApiV1ChatsGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetChatListApiV1ChatsGetApiArg = {
    search?: string;
    /** Page number */
    page?: number;
    /** Number of items per page */
    limit?: number;
};
export type GetUnreadCountApiV1ChatsUnreadCountGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetUnreadCountApiV1ChatsUnreadCountGetApiArg = void;
export type CustomerServiceApiV1AdminGetApiResponse =
    /** status 200 Successful Response */ AdminServiceListResponse;
export type CustomerServiceApiV1AdminGetApiArg = {
    /** Xizmat statusi bo‘yicha filter */
    status?: ServiceStatusEnum;
    /** Xizmat nomi (title) bo‘yicha qidiruv */
    search?: string;
    /** Maximum number of items to return */
    limit?: number;
    /** Number of items to skip */
    offset?: number;
};
export type UpdateServiceApiV1AdminServiceIdUpdatePutApiResponse =
    /** status 200 Successful Response */ ServiceCreateResponse;
export type UpdateServiceApiV1AdminServiceIdUpdatePutApiArg = {
    /** ID of the service to update */
    serviceId: number;
    bodyUpdateServiceApiV1AdminServiceIdUpdatePut: BodyUpdateServiceApiV1AdminServiceIdUpdatePut;
};
export type AllPortfolioApiV1AdminPortfolioGetApiResponse =
    /** status 200 Successful Response */ PortfolioListAdminResponse;
export type AllPortfolioApiV1AdminPortfolioGetApiArg = {
    search?: string;
    status?: string;
    categoryId?: number;
};
export type AdminPortfolioUpdateApiV1AdminPortfolioPortfolioIdUpdatePatchApiResponse =
    /** status 200 Successful Response */ PortfolioSchemas;
export type AdminPortfolioUpdateApiV1AdminPortfolioPortfolioIdUpdatePatchApiArg =
    {
        portfolioId: number;
        bodyAdminPortfolioUpdateApiV1AdminPortfolioPortfolioIdUpdatePatch: BodyAdminPortfolioUpdateApiV1AdminPortfolioPortfolioIdUpdatePatch;
    };
export type GetModerationCountApiV1AdminModerationCountGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetModerationCountApiV1AdminModerationCountGetApiArg = void;
export type GetOrdersForAdminApiV1AdminOrderListGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetOrdersForAdminApiV1AdminOrderListGetApiArg = {
    status?: string;
    orderId?: string;
    orderTitle?: string;
    search?: string;
    category?: number;
    /** Filter by category direction */
    direction?: CategoryDirectionEnum;
    /** Filter by 'ready_service', 'custom_order', or 'direct_order' */
    orderType?: string;
    /** Start date for date range filter (format: YYYY-MM-DD, e.g., 2025-12-12) */
    startDate?: string;
    /** End date for date range filter (format: YYYY-MM-DD, e.g., 2025-12-12) */
    endDate?: string;
    /** Start date for deadline range filter (format: YYYY-MM-DD, e.g., 2025-12-12) */
    deadlineStartDate?: string;
    /** End date for deadline range filter (format: YYYY-MM-DD, e.g., 2025-12-12) */
    deadlineEndDate?: string;
    /** Filter by is_new status (true for new orders, false for old orders) */
    isNew?: boolean;
    page?: number;
    pageSize?: number;
};
export type ViewChatApiV1AdminAdminChatChatIdGetApiResponse =
    /** status 200 Successful Response */ any;
export type ViewChatApiV1AdminAdminChatChatIdGetApiArg = {
    chatId: number;
};
export type CompletedOrdersStatsApiV1AdminCompletedOrdersGetApiResponse =
    /** status 200 Successful Response */ any;
export type CompletedOrdersStatsApiV1AdminCompletedOrdersGetApiArg = void;
export type GetLatestOrdersApiV1AdminLastOrdersGetApiResponse =
    /** status 200 Successful Response */ PaginatedOrderResponse;
export type GetLatestOrdersApiV1AdminLastOrdersGetApiArg = {
    page?: number;
    limit?: number;
    /** Order status bo‘yicha filterlash */
    status?: OrderStatusEnum;
};
export type GetOrderOffersForAdminApiV1AdminOrdersOrderIdOffersGetApiResponse =
    /** status 200 Successful Response */ AdminOfferListResponse;
export type GetOrderOffersForAdminApiV1AdminOrdersOrderIdOffersGetApiArg = {
    orderId: number;
    page?: number;
    pageSize?: number;
};
export type GetChatsApiV1AdminChatsGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetChatsApiV1AdminChatsGetApiArg = {
    search?: string;
    page?: number;
    pageSize?: number;
};
export type RejectOffersApiV1AdminOfferRejectedPostApiResponse =
    /** status 200 Successful Response */ any;
export type RejectOffersApiV1AdminOfferRejectedPostApiArg = {
    bodyRejectOffersApiV1AdminOfferRejectedPost: BodyRejectOffersApiV1AdminOfferRejectedPost;
};
export type DeleteMessageApiV1AdminMessageDeleteMessageIdDeleteApiResponse =
    /** status 200 Successful Response */ any;
export type DeleteMessageApiV1AdminMessageDeleteMessageIdDeleteApiArg = {
    messageId: number;
};
export type OrderCancelApiV1AdminOrderCancelOrderIdPostApiResponse =
    /** status 200 Successful Response */ any;
export type OrderCancelApiV1AdminOrderCancelOrderIdPostApiArg = {
    orderId: number;
};
export type UpdateOrderCancelReasonApiV1AdminOrderCancelReasonCancelReasonIdPutApiResponse =
    /** status 200 Successful Response */ any;
export type UpdateOrderCancelReasonApiV1AdminOrderCancelReasonCancelReasonIdPutApiArg =
    {
        cancelReasonId: number;
        bodyUpdateOrderCancelReasonApiV1AdminOrderCancelReasonCancelReasonIdPut: BodyUpdateOrderCancelReasonApiV1AdminOrderCancelReasonCancelReasonIdPut;
    };
export type OrdersChartApiV1AdminOrdersChartGetApiResponse =
    /** status 200 Successful Response */ any;
export type OrdersChartApiV1AdminOrdersChartGetApiArg = {
    year?: number;
    month?: number;
};
export type GetSellerIncomeApiV1AdminSellerSoffSellerIdIncomeGetApiResponse =
    /** status 200 Successful Response */ SellerIncomeResponse;
export type GetSellerIncomeApiV1AdminSellerSoffSellerIdIncomeGetApiArg = {
    /** Seller SOFF ID */
    soffSellerId: number;
    /** Start date for date range filter (format: YYYY-MM-DD) */
    startDate?: string;
    /** End date for date range filter (format: YYYY-MM-DD) */
    endDate?: string;
};
export type GetSellerServicesApiV1AdminSellerSoffSellerIdServicesGetApiResponse =
    /** status 200 Successful Response */ AdminServiceListResponse;
export type GetSellerServicesApiV1AdminSellerSoffSellerIdServicesGetApiArg = {
    /** Seller SOFF ID */
    soffSellerId: number;
    /** Xizmat statusi bo'yicha filter */
    status?: ServiceStatusEnum;
    /** Xizmat nomi (title) bo'yicha qidiruv */
    search?: string;
    /** Maximum number of items to return */
    limit?: number;
    /** Number of items to skip */
    offset?: number;
};
export type GetSellerPortfoliosApiV1AdminSellerSoffSellerIdPortfoliosGetApiResponse =
    /** status 200 Successful Response */ PortfolioListAdminResponse;
export type GetSellerPortfoliosApiV1AdminSellerSoffSellerIdPortfoliosGetApiArg =
    {
        /** Seller SOFF ID */
        soffSellerId: number;
        /** Search portfolios by title */
        search?: string;
        /** Filter by portfolio status (active, pending, rejected) */
        status?: string;
        /** Filter by category ID */
        categoryId?: number;
        /** Maximum number of items to return */
        limit?: number;
        /** Number of items to skip */
        offset?: number;
    };
export type GetSellerOrderCountsApiV1AdminSellerSoffSellerIdOrderCountsGetApiResponse =
    /** status 200 Successful Response */ SellerOrderCountsResponse;
export type GetSellerOrderCountsApiV1AdminSellerSoffSellerIdOrderCountsGetApiArg =
    {
        /** Seller SOFF ID */
        soffSellerId: number;
    };
export type GetSellerChatListApiV1AdminSellerSoffSellerIdChatsGetApiResponse =
    /** status 200 Successful Response */ SellerChatListResponse;
export type GetSellerChatListApiV1AdminSellerSoffSellerIdChatsGetApiArg = {
    /** Seller SOFF ID */
    soffSellerId: number;
    /** Search chats by opponent name */
    search?: string;
    /** Maximum number of items to return */
    limit?: number;
    /** Number of items to skip */
    offset?: number;
};
export type CreateOfferApiV1OfferPostApiResponse =
    /** status 200 Successful Response */ OfferResponseSchema;
export type CreateOfferApiV1OfferPostApiArg = {
    bodyCreateOfferApiV1OfferPost: BodyCreateOfferApiV1OfferPost;
};
export type GetOrderOffersApiV1OfferOrderIdGetApiResponse =
    /** status 200 Successful Response */ PaginatedOfferResponseCustomer;
export type GetOrderOffersApiV1OfferOrderIdGetApiArg = {
    orderId: number;
    /** Page number */
    page?: number;
    /** Number of items per page */
    limit?: number;
};
export type SelectOfferApiV1OfferSelectOfferPostApiResponse =
    /** status 200 Successful Response */ any;
export type SelectOfferApiV1OfferSelectOfferPostApiArg = {
    bodySelectOfferApiV1OfferSelectOfferPost: BodySelectOfferApiV1OfferSelectOfferPost;
};
export type GetOrderOffersCountApiV1OfferOrderIdOffersCountGetApiResponse =
    /** status 200 Successful Response */ any;
export type GetOrderOffersCountApiV1OfferOrderIdOffersCountGetApiArg = {
    orderId: number;
};
export type ServiceCreateResponse = {
    created_at: string;
    updated_at: string;
    id: number;
};
export type ValidationError = {
    loc: string[];
    msg: string;
    type: string;
};
export type HttpValidationError = {
    detail?: ValidationError[];
};
export type BodyCreateServiceV2ApiV1SellerServicesCreatePost = {
    title: string;
    category_id: number;
    image: Blob;
    description: string;
    videos?: string[];
    order_requirement_description: string;
    order_requirement_file?: Blob;
    price: number;
    delivery_days: number;
    right_to_change: number;
    service_item: string[];
    questions?: string[];
    answers?: string[];
    portfolio_id?: number[];
};
export type VideoSchema = {
    video_url?: string;
};
export type SellerStatusEnum = 'oddiy_askar' | 'ritser' | 'baron';
export type SoffSeller = {
    full_name?: string;
    photo_url?: string;
    status?: SellerStatusEnum;
    last_active?: string;
    soff_seller_id: number;
    total_feedbacks_count?: number;
};
export type CategoryDirectionEnum =
    | 'scientific_work'
    | 'three_d'
    | 'dizayn'
    | 'web'
    | 'document'
    | 'marketing'
    | 'seo_traffic'
    | 'audio_video'
    | 'business';
export type ServiceCategoryRead = {
    id: number;
    title: string;
    parent_id?: number;
    direction: CategoryDirectionEnum;
};
export type ServiceRead = {
    id: number;
    title: string;
    views: number;
    status: string;
    video?: VideoSchema;
    is_paused?: boolean;
    delivery_days: number;
    right_to_change: number;
    price?: number;
    description: string;
    slug?: string;
    created_at?: string;
    poster?: string;
    user?: SoffSeller;
    admin_cancel_reason?: string;
    category?: ServiceCategoryRead;
    avg_rating?: number;
    order_count?: number;
    feedback_count?: number;
    orders_count?: number;
    earnings?: number;
};
export type CategoryServiceSchema = {
    id: number;
    title: string;
    direction?: CategoryDirectionEnum;
    parent_id?: number;
    parent_title?: string;
};
export type OrderRequirementResponse = {
    order_requirement_description?: string;
    order_requirement_file?: string;
};
export type ServiceVideos = {
    video_url?: string;
};
export type SellerService = {
    id: number;
    soff_seller_id: number;
    full_name?: string;
    photo_url?: string;
    status?: SellerStatusEnum;
    last_active?: string;
};
export type ServiceFaqSchema = {
    question: string;
    answer: string;
};
export type ServiceCategorySchemas = {
    id: number;
    title: string;
    direction: CategoryDirectionEnum;
    parent_id?: number;
    parent_title?: string;
};
export type PortfolioStatusEnum = 'active' | 'pending' | 'rejected' | 'deleted';
export type PortfolioImageSchemas = {
    id: number;
    image?: string;
};
export type PortfolioVideoSchemas = {
    id: number;
    video_url?: string;
};
export type PortfolioSchemas = {
    id: number;
    title: string;
    category?: ServiceCategorySchemas;
    media_files?: string[];
    status: PortfolioStatusEnum;
    description: string;
    views?: number;
    portfolio_images?: PortfolioImageSchemas[];
    created_at?: string;
    admin_cancel_reason?: string;
    videos?: PortfolioVideoSchemas[];
};
export type ServiceDetailSchema = {
    id: number;
    title: string;
    description: string;
    views: number;
    is_paused?: boolean;
    delivery_days: number;
    right_to_change: number;
    price?: number;
    slug?: string;
    created_at?: string;
    poster?: string;
    category?: CategoryServiceSchema;
    order_requirements?: OrderRequirementResponse;
    status: string;
    admin_cancel_reason?: string;
    videos?: ServiceVideos[];
    user: SellerService;
    service_items?: string[];
    faqs?: ServiceFaqSchema[];
    portfolio?: PortfolioSchemas[];
};
export type BodyUpdateServiceApiV1SellerServicesServiceIdUpdatePut = {
    title: string;
    category_id: number;
    image?: Blob;
    video?: string[];
    description: string;
    order_requirement_description: string;
    order_requirement_file?: Blob;
    price: number;
    delivery_days: number;
    right_to_change: number;
    service_item: string[];
    questions?: string[];
    answers?: string[];
    status?: string;
    portfolio_id?: number[];
};
export type PauseServiceRequest = {
    is_paused: boolean;
};
export type ServiceDeliveryPriceOptionRead = {
    price: any[];
};
export type ServiceCategoryChildRead = {
    direction: string;
    title: string;
    id: number;
    service_delivery_price_options?: ServiceDeliveryPriceOptionRead[];
};
export type ParentCategorySchema = {
    id: number;
    title: string;
    children?: string[];
};
export type PositionDirectionEnum =
    | 'scientific_work'
    | 'three_d'
    | 'dizayn'
    | 'web'
    | 'document'
    | 'marketing'
    | 'seo_traffic'
    | 'audio_video'
    | 'business';
export type SellerPosition = {
    title: string;
    position_direction?: PositionDirectionEnum;
};
export type SellerRead = {
    soff_seller_id: number;
    full_name?: string;
    last_active?: string;
    photo_url?: string;
    position?: SellerPosition;
    status?: string;
    average_rating?: number;
    completed_orders_count?: number;
    total_feedbacks_count?: number;
    location?: string;
};
export type SellerListResponse = {
    count: number;
    results: SellerRead[];
};
export type SellerSortEnum = 'rating' | 'activity';
export type UserRoleEnum = 'Buyer' | 'Seller' | 'Moderator' | 'Superadmin';
export type SellerSoffRead = {
    phone_number?: string;
    email?: string;
    soff_seller_id: number;
    full_name?: string;
    photo_url?: string;
    role: UserRoleEnum;
    username?: string;
    position_id?: string;
};
export type SellerSoffCreate = {
    phone_number?: string;
    email?: string;
    soff_seller_id: number;
    full_name: string;
    photo_url?: string;
    role?: UserRoleEnum;
    username?: string;
    position?: number;
};
export type UserSettingsUpdate = {
    accepting_orders: boolean;
    weekends_off: boolean;
};
export type UserSettingsUpdatePatch = {
    accepting_orders?: boolean;
    weekends_off?: boolean;
};
export type UserProfileUpdate = {
    full_name?: string;
    photo_url?: string;
    bio?: string;
    position_id?: number;
    telegram_id?: string;
    phone?: string;
    email?: string;
};
export type NotificationUpdateResponse = {
    get_notification: boolean;
    message: string;
};
export type NotificationUpdateRequest = {
    get_notification: boolean;
};
export type BodyUpdateExtraPhoneNumberApiV1UsersUpdatePhonePatch = {
    phone: string;
};
export type UsersList = {
    id: number;
    seller_id?: number;
    photo_url?: string;
    full_name?: string;
    has_service: boolean;
    has_portfolio: boolean;
    position?: object;
    average_rating: number;
    last_active?: string;
    location?: string;
    progress_jobs_count: number;
    completed_orders_count: number;
    feedbacks_count: number;
    success_rate: number;
    services: object[];
    services_length: number;
};
export type UsersListResponse = {
    count: number;
    results: UsersList[];
};
export type FreelancerSortEnum = 'average_rating' | 'last_active';
export type TelegramUser = {
    id: number;
    first_name?: string;
    last_name?: string;
    username: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
};
export type BodyLoginApiV1AuthLoginPost = {
    grant_type?: string;
    username: string;
    password: string;
    scope?: string;
    client_id?: string;
    client_secret?: string;
};
export type LoginInput = {
    /** UZB telefon raqami, masalan: +998901234567 */
    phone_number?: string;
    email?: string;
};
export type Token = {
    access_token: string;
    refresh_token: string;
    token_type: string;
};
export type PhoneRequest = {
    phone: string;
};
export type VerifyCodeRequest = {
    phone: string;
    code: string;
};
export type BodyUploadImageApiV1UploadPost = {
    file: Blob;
};
export type BodyUploadFileApiV1UploadFilePost = {
    file: Blob;
};
export type OrderTypeEnum = 'ready_service' | 'custom_order';
export type OrderLanguageEnum = 'uzb' | 'rus' | 'eng';
export type OrderCategory = {
    direction?: CategoryDirectionEnum;
    title: string;
};
export type ServiceOrder = {
    id?: number;
    title?: string;
    slug?: string;
    description?: string;
    poster?: string;
    price?: number;
    delivery_days?: number;
    right_to_change?: number;
    created_at?: string;
};
export type OrderStatusDoingEnum =
    | 'pending'
    | 'approved'
    | 'requirement_file_rejected'
    | 'requirement_file'
    | 'order_accepted'
    | 'order_file_sent'
    | 'rejected'
    | 'completed'
    | 'cancelled'
    | 'requirement_process'
    | 'requirement_approved';
export type OrderStatusDoingSchemas = {
    status?: OrderStatusDoingEnum;
    order_accepted_date?: string;
    reason?: string;
};
export type SellerServiceOrder = {
    id: number;
    full_name?: string;
    photo_url?: string;
    last_active?: string;
    soff_seller_id?: number;
};
export type ServiceOrderRequirementSchema = {
    order_requirement_description?: string;
    order_requirement_file?: string;
};
export type FeedbackResponse = {
    rating: number;
    comment?: string;
};
export type OfferSeller = {
    photo_url?: string;
};
export type OrderSchemas = {
    id: number;
    created_at: string;
    order_type: OrderTypeEnum;
    user_id: number;
    deadline_date?: string;
    title?: string;
    budget?: number;
    description?: string;
    language?: OrderLanguageEnum;
    category?: OrderCategory;
    service?: ServiceOrder;
    order_status_doing?: OrderStatusDoingSchemas;
    user?: SellerServiceOrder;
    chat_id?: number;
    reason?: string[];
    order_requirement?: ServiceOrderRequirementSchema[];
    feedback?: FeedbackResponse;
    unread_messages_count?: number;
    file?: string;
    offers_count: number;
    approved_transaction_amount?: number;
    offers?: OfferSeller[];
};
export type PaginatedOrderSchemasResponse = {
    total: number;
    page: number;
    limit: number;
    results: OrderSchemas[];
};
export type OrderStatusEnum = 'open' | 'accepted' | 'rejected' | 'completed';
export type OrderNoteStatusEnum = 'pending' | 'accepted' | 'rejected';
export type BodyUpdateOrderNoteStatusApiV1OrderOrderNoteNoteIdPatch = {
    action: OrderNoteStatusEnum;
    text?: string;
};
export type BodySendServiceOrderFileApiV1OrderOrderIdSendFilePost = {
    file?: Blob;
    files?: Blob[];
};
export type BodyEditServiceOrderFileApiV1OrderOrderIdEditFilePatch = {
    file?: Blob;
    files?: Blob[];
};
export type FileInfo = {
    url?: string;
    size?: number;
    created_at?: string;
    status?: string;
};
export type FileResponse = {
    message: string;
    file?: string;
    files?: FileInfo[];
};
export type OrderFileResponse = {
    id?: number;
    order_id: number;
    file_url: string;
    filename?: string;
    is_main_file: boolean;
    created_at?: string;
};
export type BodyUpdateOrderStatusApiV1OrderOrderIdStatusPost = {
    status: OrderStatusDoingEnum;
    reason?: string;
    comment?: string;
    rating?: number;
    cancel_reason_id?: number;
};
export type BodyCustomerOrderApiV1OrderCustomOrderPost = {
    title: string;
    category_id: number;
    description: string;
    language: OrderLanguageEnum;
    budget: number;
    deadline_date: string;
    file?: Blob;
    contact_phonenumber?: string;
};
export type OrderOfferSeller = {
    money?: number;
    comment?: string;
    rejected_reason?: string;
};
export type CustomOrderResponse = {
    id: number;
    user_id: number;
    accepted_by_id?: number;
    order_type: OrderTypeEnum;
    status: OrderStatusEnum;
    title: string;
    category_id: number;
    description: string;
    language: OrderLanguageEnum;
    budget: number;
    deadline_date?: string;
    created_at: string;
    deal_amount?: number;
    completed_at?: string;
    user_chat_id?: number;
    executor_chat_id?: number;
    category?: OrderCategory;
    offer?: OrderOfferSeller;
    other_offers_count?: number;
    min_budget?: number;
};
export type PaginatedCustomOrderResponse = {
    total_count: number;
    user_get_notification?: boolean;
    items: CustomOrderResponse[];
};
export type BodyDirectOrderApiV1OrderDirectOrderPost = {
    title: string;
    category_id: number;
    description: string;
    language: OrderLanguageEnum;
    budget: number;
    deadline_date: string;
    seller_id: number;
    file?: Blob;
    contact_phonenumber?: string;
};
export type BodyGeneratePaymentLinksApiV1PaymentCreateServiceOrderPost = {
    service_id?: number;
    payment_type?: string;
    card_number?: string;
    expire_date?: string;
    order_id?: number;
    from_balance?: boolean;
    order_requirement_description?: string;
    order_requirement_file?: Blob;
};
export type PaymentVerifySchema = {
    transaction_id: number;
    code: number;
};
export type BodyApproveOrderPaymentApiV1PaymentApproveOrderTransactionIdPost = {
    secret_key: string;
};
export type BodyCheckUserBalanceApiV1PaymentGetUserWalletPost = {
    secret_key: string;
    soff_seller_id: number;
};
export type BodyDeductUserBalanceApiV1PaymentDeductUserWalletPost = {
    amount: number;
    soff_seller_id: number;
    secret_key: string;
};
export type BodyCreatePortfolioApiV1PortfolioCreatePost = {
    title: string;
    category_id: number;
    videos?: string[];
    image?: Blob[];
    description: string;
};
export type PortfolioViewSchemas = {
    id: number;
    title: string;
    category?: ServiceCategorySchemas;
    media_files?: string[];
    status: PortfolioStatusEnum;
    videos?: PortfolioVideoSchemas[];
    description: string;
    cover_image?: string;
    views?: number;
    portfolio_images?: PortfolioImageSchemas[];
    created_at?: string;
    admin_cancel_reason?: string;
};
export type PortfolioDetailSchemas = {
    id: number;
    title: string;
    category?: ServiceCategorySchemas;
    media_files?: string[];
    status: PortfolioStatusEnum;
    description: string;
    views?: number;
    portfolio_images?: PortfolioImageSchemas[];
    created_at?: string;
    admin_cancel_reason?: string;
    videos?: PortfolioVideoSchemas[];
};
export type BodyPortfolioUpdateApiV1PortfolioUpdatePortfolioIdPatch = {
    title?: string;
    category_id?: number;
    description?: string;
    videos?: string[];
    image?: Blob[];
    old_image_ids?: number[];
    status?: string;
};
export type ServiceItemSchema = {
    service_item?: string;
};
export type CustomerServiceSchemas = {
    id: number;
    title: string;
    description: string;
    views?: number;
    status?: string;
    video?: VideoSchema;
    slug: string;
    created_at?: string;
    poster?: string;
    category?: CategoryServiceSchema;
    order_requirements?: OrderRequirementResponse[];
    price?: number;
    delivery_days?: number;
    right_to_change?: number;
    service_items?: ServiceItemSchema[];
    faqs?: ServiceFaqSchema[];
    user?: SellerService;
    avg_rating?: number;
    order_count?: number;
    feedback_count?: number;
};
export type CustomerServiceListResponse = {
    total_service: number;
    items: CustomerServiceSchemas[];
};
export type UserShortRead = {
    id: number;
    full_name: string;
    image?: string;
};
export type CommentUserRead = {
    id: number;
    user: UserShortRead;
    content?: string;
    rating?: number;
    created_at: string;
};
export type ServiceReadBase = {
    id: number;
    title: string;
    views: number;
    status: string;
    video?: VideoSchema;
    is_paused?: boolean;
    delivery_days: number;
    right_to_change: number;
    price?: number;
    description: string;
    slug?: string;
    created_at?: string;
    poster?: string;
    user?: SoffSeller;
    admin_cancel_reason?: string;
    category?: ServiceCategoryRead;
    avg_rating?: number;
    order_count?: number;
    feedback_count?: number;
    orders_count?: number;
    earnings?: number;
    comments: CommentUserRead[];
    rating?: number;
};
export type PortfolioRead = {
    id: number;
    title: string;
    cover_image?: string[];
    portfolio_images?: PortfolioImageSchemas[];
    category?: ServiceCategoryRead;
    videos?: VideoSchema[];
    description: string;
};
export type ServiceItemSchemaList = {
    service_item?: string;
};
export type ServiceDetailWithSimilarResponse = {
    service: ServiceReadBase;
    similar_services: ServiceRead[];
    seller_portfolio: PortfolioRead[];
    order_requirements?: OrderRequirementResponse[];
    faqs?: ServiceFaqSchema[];
    user?: SellerService[];
    service_items?: ServiceItemSchemaList[];
};
export type BodyCreateOrderNoteApiV1CustomerOrderNotePost = {
    order_id: number;
    content?: string;
    file?: Blob;
};
export type CustomerPortfolioSchemas = {
    id: number;
    title: string;
    category?: ServiceCategorySchemas;
    media_files?: string[];
    videos?: PortfolioVideoSchemas[];
    status: PortfolioStatusEnum;
    description: string;
    views?: number;
    portfolio_images?: PortfolioImageSchemas[];
    created_at?: string;
};
export type ServiceDetailINfoSchema = {
    slug: string;
    title: string;
};
export type UserFeedbackDetailSchema = {
    soff_seller_id: number;
    full_name: string;
    photo_url?: string;
};
export type ServiceFeedbackListSchema = {
    service?: ServiceDetailINfoSchema;
    quality?: number;
    comment?: string;
    created_at?: string;
    user: UserFeedbackDetailSchema;
};
export type FeedbackListSchema = {
    total: number;
    items?: ServiceFeedbackListSchema[];
};
export type BodyCreateChatApiV1ChatsCreatePost = {
    participant_id: number;
};
export type BodySendMessageApiV1ChatsMessagePost = {
    chat_id: number;
    content?: string;
    file?: Blob;
};
export type BodyUpdateMessageApiV1ChatsMessagesPut = {
    message_id: number;
    /** Yangi xabar matni */
    content: string;
};
export type BodyDeleteMessageApiV1ChatsMessagesDelete = {
    message_id: number;
};
export type AdminSeller = {
    id: number;
    soff_seller_id: number;
    full_name?: string;
    photo_url?: string;
    status?: SellerStatusEnum;
    last_active?: string;
    accepting_orders?: boolean;
    weekends_off?: boolean;
};
export type AdminServiceSchemas = {
    id: number;
    title: string;
    description: string;
    views?: number;
    status?: string;
    videos?: VideoSchema[];
    slug: string;
    created_at?: string;
    poster?: string;
    category?: CategoryServiceSchema;
    order_requirements?: OrderRequirementResponse[];
    price?: number;
    delivery_days?: number;
    right_to_change?: number;
    service_items?: ServiceItemSchema[];
    faqs?: ServiceFaqSchema[];
    user?: AdminSeller;
};
export type AdminServiceListResponse = {
    total_service: number;
    limit: number;
    offset: number;
    next: boolean;
    previous: boolean;
    items: AdminServiceSchemas[];
};
export type ServiceStatusEnum = 'pending' | 'approved' | 'rejected' | 'deleted';
export type BodyUpdateServiceApiV1AdminServiceIdUpdatePut = {
    title: string;
    category_id: number;
    image?: Blob;
    description: string;
    order_requirement_description: string;
    order_requirement_file?: Blob;
    price: number;
    delivery_days: number;
    right_to_change: number;
    admin_cancel_reason?: string;
    service_item: string[];
    questions?: string[];
    answers?: string[];
    status?: string;
    portfolio_id?: number[];
    video?: string[];
};
export type SellerService2 = {
    id: number;
    soff_seller_id: number;
    full_name?: string;
    photo_url?: string;
    status?: SellerStatusEnum;
    last_active?: string;
};
export type AdminPortfolioSchemas = {
    id: number;
    title: string;
    category?: ServiceCategorySchemas;
    media_files?: string[];
    status: PortfolioStatusEnum;
    description: string;
    views?: number;
    videos?: PortfolioVideoSchemas[];
    portfolio_images?: PortfolioImageSchemas[];
    created_at?: string;
    admin_cancel_reason?: string;
    user?: SellerService2;
};
export type PortfolioListAdminResponse = {
    total_portfolio: number;
    limit: number;
    offset: number;
    next: boolean;
    previous: boolean;
    items: AdminPortfolioSchemas[];
};
export type BodyAdminPortfolioUpdateApiV1AdminPortfolioPortfolioIdUpdatePatch =
    {
        title?: string;
        category_id?: number;
        description?: string;
        image?: Blob[];
        old_image_ids?: number[];
        status?: string;
        video?: string[];
        admin_cancel_reason?: string;
    };
export type UserListSchema = {
    soff_seller_id: number;
    full_name?: string;
    photo_url?: string;
    contact?: string;
};
export type ServiceListSchema = {
    id: number;
    title: string;
    price: number;
    slug: string;
};
export type OrderStatusDoingSchema = {
    status?: string;
    freelancer_id?: number;
};
export type OrderCategory2 = {
    title: string;
    direction: CategoryDirectionEnum;
};
export type OrderListAdmin = {
    id: number;
    title: string;
    status: string;
    budget: number;
    user: UserListSchema;
    accepted_by?: UserListSchema;
    service?: ServiceListSchema;
    order_status_doing?: OrderStatusDoingSchema;
    chat_id?: number;
    created_at: string;
    deadline_date?: string;
    cancelled_by?: string;
    category?: OrderCategory2;
    offers_count?: number;
    is_paid?: boolean;
    order_type?: string;
    is_new?: boolean;
};
export type PaginatedOrderResponse = {
    total: number;
    orders: OrderListAdmin[];
};
export type AdminSellerPosition = {
    title: string;
};
export type AdminSellerOrder = {
    soff_seller_id: number;
    full_name: string;
    photo_url?: string;
    position?: AdminSellerPosition;
    avg_rating?: number;
    feedback_count?: number;
};
export type AdminOfferResponse = {
    id: number;
    seller: AdminSellerOrder;
    money: number;
    comment: string;
    status: string;
};
export type AdminOfferListResponse = {
    offers_count: number;
    offers: AdminOfferResponse[];
};
export type BodyRejectOffersApiV1AdminOfferRejectedPost = {
    offer_id: number;
    rejected_reason?: string;
};
export type BodyUpdateOrderCancelReasonApiV1AdminOrderCancelReasonCancelReasonIdPut =
    {
        status?: string;
        refund_amount?: number;
    };
export type SellerIncomeResponse = {
    total_income: number;
    monthly_income: number;
    today_income: number;
    current_balance: number;
};
export type SellerOrderCountsResponse = {
    all: number;
    successful: number;
    cancelled: number;
    rejected: number;
    in_progress: number;
};
export type SellerChatListItem = {
    chat_id: number;
    opponent_id: number;
    opponent_name?: string;
    opponent_photo_url?: string;
    last_message?: object;
    unread_count: number;
};
export type SellerChatListResponse = {
    total: number;
    limit: number;
    offset: number;
    next: boolean;
    previous: boolean;
    items: SellerChatListItem[];
};
export type OfferResponseSchema = {
    id: number;
    order_id: number;
    seller_id: number;
    money: number;
    comment: string;
};
export type BodyCreateOfferApiV1OfferPost = {
    order_id: number;
    money: number;
    comment: string;
};
export type SellerPosition2 = {
    title: string;
};
export type SellerOrder = {
    soff_seller_id: number;
    full_name: string;
    photo_url?: string;
    position?: SellerPosition2;
    avg_rating?: number;
    feedback_count?: number;
};
export type OfferResponseCustomer = {
    id: number;
    seller: SellerOrder;
    money: number;
    comment: string;
};
export type PaginatedOfferResponseCustomer = {
    total: number;
    page: number;
    limit: number;
    results: OfferResponseCustomer[];
};
export type BodySelectOfferApiV1OfferSelectOfferPost = {
    offer_id: number;
};
export const {
    useCreateServiceV2ApiV1SellerServicesCreatePostMutation,
    useMyServicesApiV1SellerServicesGetQuery,
    useSellerServiceDetailApiV1SellerServicesServiceIdGetQuery,
    useUpdateServiceApiV1SellerServicesServiceIdUpdatePutMutation,
    useUpdateServiceApiV1SellerServicesServiceIdDeleteDeleteMutation,
    useSellerDashboardApiV1SellerServicesDashboardGetQuery,
    useGetOrderCancelReasonsApiV1SellerServicesOrderCancelReasonsGetQuery,
    useMyServiceStatusCountApiV1SellerServicesStatusCountGetQuery,
    useSetPauseServiceApiV1SellerServicesServiceIdPausePutMutation,
    useGetAdminUnseenServicesCountApiV1SellerServicesUnseenCountGetQuery,
    useGetCategoriesApiV1CategoriesGetQuery,
    useCreateCategoryApiV1CategoriesPostMutation,
    useGetCategoryApiV1CategoriesCategoryIdGetQuery,
    useDeleteCategoryApiV1CategoriesCategoryIdDeleteMutation,
    useGetChildCategoriesApiV1CategoriesCategoriesChildrenGetQuery,
    useGetPriceDeliveryApiV1CategoriesPriceDeliveryCategoryIdGetQuery,
    useGetServiceCategoriesApiV1CategoriesCategoriesListGetQuery,
    useGetCategoriesWithDirectionsApiV1CategoriesCategoriesWithDirectionsGetQuery,
    useGetAllDirectionsApiV1CategoriesAllDirectionsGetQuery,
    useGetSellersApiV1UsersSellersGetQuery,
    useCreateSellerApiV1UsersSellersPostMutation,
    useGetSellersServiceApiV1UsersSellersServiceGetQuery,
    useCheckFreelancerApiV1UsersCheckFreelanceGetQuery,
    useGetPositionsApiV1UsersPositionsGetQuery,
    useGetSellerWalletApiV1UsersWalletGetQuery,
    useGetFreelanceProfileApiV1UsersSoffSellerIdFreelanceProfileGetQuery,
    useGetFreelancerSettingsApiV1UsersSettingsGetQuery,
    useUpdateFreelancerSettingsApiV1UsersUserSettingsPutMutation,
    useUpdateFreelancerSettingsApiV1UsersUserSettingsPatchMutation,
    useUpdateUserFieldsApiV1UsersSoffSellerIdUpdatePatchMutation,
    useHasServicePortfolioApiV1UsersCheckServicePortfolioGetQuery,
    useSetUserNotificationApiV1UsersToggleNotificationPostMutation,
    useCheckSellerWalletApiV1UsersSellerWalletSoffSellerIdGetQuery,
    useUpdateExtraPhoneNumberApiV1UsersUpdatePhonePatchMutation,
    useGetProfileProgressApiV1UsersProgressFreelancerGetQuery,
    useGetUsersListApiV1UsersFreelancersListGetQuery,
    useTelegramLoginApiV1AuthTelegramPostMutation,
    useLoginApiV1AuthLoginPostMutation,
    useRequestBuyerLoginCodeApiV1AuthBuyerLoginRequestCodePostMutation,
    useVerifyBuyerLoginCodeApiV1AuthBuyerLoginVerifyCodePostMutation,
    useRequestSellerLoginCodeApiV1AuthSellerLoginRequestCodePostMutation,
    useVerifySellerLoginCodeApiV1AuthSellerLoginVerifyCodePostMutation,
    useLoginViaGoogleApiV1AuthGoogleGetQuery,
    useGoogleCallbackApiV1AuthGoogleCallbackGetQuery,
    useSendVerificationCodeApiV1ApiAuthSendCodePostMutation,
    useVerifyCodeApiV1ApiAuthVerifyCodePostMutation,
    useUploadImageApiV1UploadPostMutation,
    useUploadFileApiV1UploadFilePostMutation,
    useGetMyOrdersApiV1OrderGetQuery,
    useGetMyOrdersApiV1OrderSellerGetQuery,
    useGetOrderApiV1OrderSellerOrderIdGetQuery,
    useGetOrderApiV1OrderOrderIdGetQuery,
    useGetOrderNotesApiV1OrderOrderNoteOrderIdGetQuery,
    useUpdateOrderNoteStatusApiV1OrderOrderNoteNoteIdPatchMutation,
    useSendServiceOrderFileApiV1OrderOrderIdSendFilePostMutation,
    useEditServiceOrderFileApiV1OrderOrderIdEditFilePatchMutation,
    useGetOrderFileApiV1OrderOrderIdFileGetQuery,
    useGetOrderFilesApiV1OrderOrderIdFilesGetQuery,
    useGetOrderFileByIdApiV1OrderOrderIdFileFileIdGetQuery,
    useDeleteOrderFileApiV1OrderOrderIdFileFileIdDeleteMutation,
    useOrderStatusDoingApiV1OrderOrderStatusDoingGetQuery,
    useUpdateOrderStatusApiV1OrderOrderIdStatusPostMutation,
    useNewApprovedOrdersCountApiV1OrderApprovedGetQuery,
    useCustomerOrderApiV1OrderCustomOrderPostMutation,
    useCustomerOrdersApiV1OrderCustomerOrdersGetQuery,
    useCustomOrderCountApiV1OrderCountCustomOrderGetQuery,
    useDirectOrderApiV1OrderDirectOrderPostMutation,
    useGeneratePaymentLinksApiV1PaymentCreateServiceOrderPostMutation,
    useVerifyCardOrderApiV1PaymentVerifyCardOrderPostMutation,
    useCheckOrderPaymentStatusApiV1PaymentCheckOrderTransactionIdPostMutation,
    useApproveOrderPaymentApiV1PaymentApproveOrderTransactionIdPostMutation,
    useCheckUserBalanceApiV1PaymentGetUserWalletPostMutation,
    useDeductUserBalanceApiV1PaymentDeductUserWalletPostMutation,
    usePaymeWebhookApiV1PaymentWebhookPaymePostMutation,
    useCreatePortfolioApiV1PortfolioCreatePostMutation,
    useMyPortfolioApiV1PortfolioGetQuery,
    useGetPortfolioApiV1PortfolioPortfolioIdGetQuery,
    usePortfolioUpdateApiV1PortfolioUpdatePortfolioIdPatchMutation,
    usePortfolioDeleteApiV1PortfolioDeletePortfolioIdDeleteMutation,
    usePortfolioStatusCountApiV1PortfolioStatusCountGetQuery,
    useGetUnseenPortfolioCountApiV1PortfolioUnseenCountGetQuery,
    useGetPositionByIdApiV1CustomerPositionsPositionIdGetQuery,
    useCustomerServiceApiV1CustomerGetQuery,
    useGetServiceApiV1CustomerSlugGetQuery,
    useCreateOrderNoteApiV1CustomerOrderNotePostMutation,
    useGetUserPortfoliosApiV1CustomerPortfoliosSoffSellerIdGetQuery,
    useGetSellerServicesApiV1CustomerServicesSoffSellerIdGetQuery,
    useGetServiceFeedbacksApiV1CustomerServiceFeedbacksGetQuery,
    useGetLast5ServicesApiV1CustomerLastGetQuery,
    useGetTopFreelancerCategoriesApiV1CustomerTopCategoriesSoffSellerIdGetQuery,
    useSearchGoogleStyleApiV1CustomerSearchPageGetQuery,
    useTopServicesApiV1CustomerPopularServicesGetQuery,
    useCreateChatApiV1ChatsCreatePostMutation,
    useSendMessageApiV1ChatsMessagePostMutation,
    useMarkMessageReadApiV1ChatsMessagesMessageIdReadPatchMutation,
    useGetChatApiV1ChatsChatIdGetQuery,
    useUpdateMessageApiV1ChatsMessagesPutMutation,
    useDeleteMessageApiV1ChatsMessagesDeleteMutation,
    useGetChatListApiV1ChatsGetQuery,
    useGetUnreadCountApiV1ChatsUnreadCountGetQuery,
    useCustomerServiceApiV1AdminGetQuery,
    useUpdateServiceApiV1AdminServiceIdUpdatePutMutation,
    useAllPortfolioApiV1AdminPortfolioGetQuery,
    useAdminPortfolioUpdateApiV1AdminPortfolioPortfolioIdUpdatePatchMutation,
    useGetModerationCountApiV1AdminModerationCountGetQuery,
    useGetOrdersForAdminApiV1AdminOrderListGetQuery,
    useViewChatApiV1AdminAdminChatChatIdGetQuery,
    useCompletedOrdersStatsApiV1AdminCompletedOrdersGetQuery,
    useGetLatestOrdersApiV1AdminLastOrdersGetQuery,
    useGetOrderOffersForAdminApiV1AdminOrdersOrderIdOffersGetQuery,
    useGetChatsApiV1AdminChatsGetQuery,
    useRejectOffersApiV1AdminOfferRejectedPostMutation,
    useDeleteMessageApiV1AdminMessageDeleteMessageIdDeleteMutation,
    useOrderCancelApiV1AdminOrderCancelOrderIdPostMutation,
    useUpdateOrderCancelReasonApiV1AdminOrderCancelReasonCancelReasonIdPutMutation,
    useOrdersChartApiV1AdminOrdersChartGetQuery,
    useGetSellerIncomeApiV1AdminSellerSoffSellerIdIncomeGetQuery,
    useGetSellerServicesApiV1AdminSellerSoffSellerIdServicesGetQuery,
    useGetSellerPortfoliosApiV1AdminSellerSoffSellerIdPortfoliosGetQuery,
    useGetSellerOrderCountsApiV1AdminSellerSoffSellerIdOrderCountsGetQuery,
    useGetSellerChatListApiV1AdminSellerSoffSellerIdChatsGetQuery,
    useCreateOfferApiV1OfferPostMutation,
    useGetOrderOffersApiV1OfferOrderIdGetQuery,
    useSelectOfferApiV1OfferSelectOfferPostMutation,
    useGetOrderOffersCountApiV1OfferOrderIdOffersCountGetQuery,
} = injectedRtkApi;
