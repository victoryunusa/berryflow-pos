import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { PrimeReactProvider } from "primereact/api";

//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";

//core
import "primereact/resources/primereact.min.css";
import "./index.css";
import App from "./App";
import { store } from "./app/store";
import { getCountries } from "./features/countries/countriesSlice";
import { getSuppliers } from "./features/suppliers/suppliersSlice";
import { getCategories } from "./features/category/categoriesSlice";
import { getMeasurementUnits } from "./features/units/unitsSlice";
import { getStates } from "./features/states/statesSlice";
import { getAreas } from "./features/area/areaSlice";
import { getTables } from "./features/table/tableSlice";
import { getTaxes } from "./features/tax/taxSlice";
import { getDiscountCodes } from "./features/discount/discountSlice";
import { getProfile } from "./features/user/userSlice";
import { getBranches } from "./features/branch/branchSlice";
import { getBillingTypes } from "./features/master_actions/billingTypeSlice";
import { getInvoicePrintTypes } from "./features/master_actions/invoicePrintTypeSlice";
import { getRoles } from "./features/role/roleSlice";

document.title = "Berryflow - Africa's leading B2B Spend Management platform";

store.dispatch(getCountries());
store.dispatch(getBillingTypes());
store.dispatch(getInvoicePrintTypes());
store.dispatch(getStates());
store.dispatch(getSuppliers());
store.dispatch(getCategories());
store.dispatch(getMeasurementUnits());
store.dispatch(getAreas());
store.dispatch(getTables());
store.dispatch(getTaxes());
store.dispatch(getDiscountCodes());
store.dispatch(getProfile());
store.dispatch(getBranches());
store.dispatch(getRoles());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PrimeReactProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PrimeReactProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
