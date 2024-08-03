import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import { alertReducer } from "../features/alert/alertSlice";
import cartReducer from "../features/pos/cartSlice";
import countriesReducer from "../features/countries/countriesSlice";
import statesReducer from "../features/states/statesSlice";
import suppliersReducer from "../features/suppliers/suppliersSlice";
import categoriesReducer from "../features/category/categoriesSlice";
import unitsReducer from "../features/units/unitsSlice";
import ingredientsReducer from "../features/ingredients/ingredientsSlice";
import productsReducer from "../features/products/productSlice";
import productReducer from "../features/products/singleProductSlice";
import variantOptionsReducer from "../features/variant_option/variantOptionSlice";
import areasReducer from "../features/area/areaSlice";
import tablesReducer from "../features/table/tableSlice";
import taxesReducer from "../features/tax/taxSlice";
import discountsReducer from "../features/discount/discountSlice";
import userReducer from "../features/user/userSlice";
import branchesReducer from "../features/branch/branchSlice";
import billingTypesReducer from "../features/master_actions/billingTypeSlice";
import billCounterReducer from "../features/bill_counter/billCounterSlice";
import businessRegisterReducer from "../features/business_register/businessRegisterSlice";
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
    cart: cartReducer,
    billing_types: billingTypesReducer,
    bill_counters: billCounterReducer,
    business_registers: businessRegisterReducer,
    invoice_print_types: invoicePrintTypesReducer,
    countries: countriesReducer,
    suppliers: suppliersReducer,
    categories: categoriesReducer,
    units: unitsReducer,
    ingredients: ingredientsReducer,
    products: productsReducer,
    product: productReducer,
    variant_options: variantOptionsReducer,
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
