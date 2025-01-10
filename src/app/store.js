import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import accountReducer from "../features/account/accountSlice";
import activeRegisterReducer from "../features/pos/businessRegisterSlice";
import { alertReducer } from "../features/alert/alertSlice";
import cartReducer from "../features/pos/cartSlice";
import countriesReducer from "../features/countries/countriesSlice";
import currenciesReducer from "../features/currencies/currenciesSlice";
import subscriptionPlanReducer from "../features/subscription_plan/subscriptionPlanSlice";
import gatewaysReducer from "../features/payment_gateways/paymentGatewaySlice";

import statesReducer from "../features/states/statesSlice";
import suppliersReducer from "../features/suppliers/suppliersSlice";
import categoriesReducer from "../features/category/categoriesSlice";
import unitsReducer from "../features/units/unitsSlice";
import ingredientsReducer from "../features/ingredients/ingredientsSlice";
import ordersReducer from "../features/order/orderSlice";
import productsReducer from "../features/products/productSlice";
import productReducer from "../features/products/singleProductSlice";
import variantOptionsReducer from "../features/variant_option/variantOptionSlice";
import addonGroupReducer from "../features/addon_group/addonGroupSlice";
import areasReducer from "../features/area/areaSlice";
import tablesReducer from "../features/table/tableSlice";
import taxesReducer from "../features/tax/taxSlice";
import transactionsReducer from "../features/transactions/transactionSlice";
import discountsReducer from "../features/discount/discountSlice";
import userReducer from "../features/user/userSlice";
import branchesReducer from "../features/branch/branchSlice";
import billingTypesReducer from "../features/master_actions/billingTypeSlice";
import accountTypesReducer from "../features/master_actions/accountTypeSlice";
import transactionTypesReducer from "../features/master_actions/transactionTypeSlice";
import orderTypesReducer from "../features/master_actions/orderTypeSlice";
import billCounterReducer from "../features/bill_counter/billCounterSlice";
import businessRegisterReducer from "../features/business_register/businessRegisterSlice";
import billinCounterStatReducer from "../features/business_register/billingCounterStatSlice";
import invoicePrintTypesReducer from "../features/master_actions/invoicePrintTypeSlice";
import vendorReducer from "../features/vendor/vendorSlice";
import purchaseOrderItemsReducer from "../features/purchase/purchaseCartSlice";
import invoiceItemsReducer from "../features/invoice/invoiceCartSlice";
import variantItemsReducer from "../features/products/productVariantSlice";
import addonItemsReducer from "../features/addon_group/addonProductSlice";
import productIngredientReducer from "../features/products/productIngedientSlice";
import rolesReducer from "../features/role/roleSlice";
import usersReducer from "../features/users/usersSlice";
import purchaseOrderReducer from "../features/purchase/purchaseOrderSlice";
import invoicesReducer from "../features/invoice/invoiceSlice";
import customersReducer from "../features/customer/customerSlice";
import permissionsReducer from "../features/permissions/permissionsSlice";
import paymentMethodReducer from "../features/payment_method/paymentMethodSlice";
import modulesReducer from "../features/master_actions/modulesSlice";

export * from "../features/alert/alertSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountReducer,
    active_register: activeRegisterReducer,
    user: userReducer,
    alert: alertReducer,
    cart: cartReducer,
    account_types: accountTypesReducer,
    transaction_types: transactionTypesReducer,
    billing_types: billingTypesReducer,
    order_types: orderTypesReducer,
    bill_counters: billCounterReducer,
    billing_counter_stats: billinCounterStatReducer,
    business_registers: businessRegisterReducer,
    invoice_print_types: invoicePrintTypesReducer,
    countries: countriesReducer,
    currencies: currenciesReducer,
    subscription_plans: subscriptionPlanReducer,
    suppliers: suppliersReducer,
    categories: categoriesReducer,
    units: unitsReducer,
    ingredients: ingredientsReducer,
    orders: ordersReducer,
    products: productsReducer,
    product: productReducer,
    variant_options: variantOptionsReducer,
    addon_groups: addonGroupReducer,
    product_ingredient_items: productIngredientReducer,
    states: statesReducer,
    areas: areasReducer,
    tables: tablesReducer,
    transactions: transactionsReducer,
    taxes: taxesReducer,
    discounts: discountsReducer,
    branches: branchesReducer,
    vendor: vendorReducer,
    purchase_order_items: purchaseOrderItemsReducer,
    invoice_items: invoiceItemsReducer,
    variant_items: variantItemsReducer,
    addon_items: addonItemsReducer,
    roles: rolesReducer,
    users: usersReducer,
    purchase_orders: purchaseOrderReducer,
    invoices: invoicesReducer,
    customers: customersReducer,
    permissionsList: permissionsReducer,
    payment_methods: paymentMethodReducer,
    modules: modulesReducer,
    gateways: gatewaysReducer,
  },
});
