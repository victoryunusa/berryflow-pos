import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { alertReducer } from "../features/alert/alertSlice";
import countriesReducer from "../features/countries/countriesSlice";
import statesReducer from "../features/states/statesSlice";
import suppliersReducer from "../features/suppliers/suppliersSlice";
import categoriesReducer from "../features/category/categoriesSlice";
import unitsReducer from "../features/units/unitsSlice";
import ingredientsReducer from "../features/ingredients/ingredientsSlice";
import areasReducer from "../features/area/areaSlice";
import tablesReducer from "../features/table/tableSlice";
import taxesReducer from "../features/tax/taxSlice";
import discountsReducer from "../features/discount/discountSlice";
import userReducer from "../features/user/userSlice";
import branchesReducer from "../features/branch/branchSlice";
import billingTypesReducer from "../features/master_actions/billingTypeSlice";
import invoicePrintTypesReducer from "../features/master_actions/invoicePrintTypeSlice";
import vendorReducer from "../features/vendor/vendorSlice";
import purchaseOrderItemsReducer from "../features/purchase/purchaseCartSlice";
import rolesReducer from "../features/role/roleSlice";
import usersReducer from "../features/users/usersSlice";
import purchaseOrderReducer from "../features/purchase/purchaseOrderSlice";
import customersReducer from "../features/customer/customerSlice";
import permissionsReducer from "../features/permissions/permissionsSlice";
import paymentMethodReducer from "../features/payment_method/paymentMethodSlice";
import modulesReducer from "../features/master_actions/modulesSlice";

export * from "../features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    alert: alertReducer,
    billing_types: billingTypesReducer,
    invoice_print_types: invoicePrintTypesReducer,
    countries: countriesReducer,
    suppliers: suppliersReducer,
    categories: categoriesReducer,
    units: unitsReducer,
    ingredients: ingredientsReducer,
    states: statesReducer,
    areas: areasReducer,
    tables: tablesReducer,
    taxes: taxesReducer,
    discounts: discountsReducer,
    branches: branchesReducer,
    vendor: vendorReducer,
    purchase_order_items: purchaseOrderItemsReducer,
    roles: rolesReducer,
    users: usersReducer,
    purchase_orders: purchaseOrderReducer,
    customers: customersReducer,
    permissionsList: permissionsReducer,
    payment_methods: paymentMethodReducer,
    modules: modulesReducer,
  },
});
