import { BrowserRouter, Routes, Route } from "react-router-dom";
import Protected from "./Protected";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/settings/Settings";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Invoice from "./pages/sales/Invoice";
import Cards from "./pages/Cards";
import Transactions from "./pages/sales/Transactions";
import Alert from "./components/common/Alert";
import SelectBranchLayout from "./layouts/SelectBranchLayout";
import SelectBranch from "./pages/SelectBranch";
import Suppliers from "./pages/suppliers/Suppliers";
import PurchaseOrders from "./pages/sales/PurchaseOrder/PurchaseOrders";
import Quotations from "./pages/sales/Quotations";
import DigitalMenuOrders from "./pages/sales/DigitalMenuOrders";
import Orders from "./pages/sales/Orders";
import Accounts from "./pages/business_account/Accounts";
import Notifications from "./pages/Notifications";
import BusinessRegister from "./pages/business_account/BusinessRegister";
import MonthlyTargets from "./pages/business_account/MonthlyTargets";
import Staff from "./pages/users/Staff";
import Customers from "./pages/users/Customers";
import Roles from "./pages/users/Roles";
import Permissions from "./pages/users/Permissions";
import Tax from "./pages/codes/Tax";
import DiscountCodes from "./pages/codes/DiscountCodes";
import Coupon from "./pages/codes/Coupon";
import Products from "./pages/stock/Products";
import Ingredients from "./pages/stock/Ingredients";
import Categories from "./pages/stock/Categories";
import StockTransfer from "./pages/stock/StockTransfer";
import StockReturn from "./pages/stock/StockReturn";
import ProductLabel from "./pages/stock/ProductLabel";
import AddOnGroups from "./pages/stock/AddOnGroups";
import DownloadReports from "./pages/reports/DownloadReports";
import BestSellers from "./pages/reports/BestSellers";
import DayWiseSales from "./pages/reports/DayWiseSales";
import CategoryReport from "./pages/reports/CategoryReport";
import ProductQuantityAlert from "./pages/reports/ProductQuantityAlert";
import IngredientQuantityAlert from "./pages/reports/IngredientQuantityAlert";
import BranchStockChart from "./pages/reports/BranchStockChart";
import KitchenDisplay from "./pages/restaurant/KitchenDisplay";
import WaiterDisplay from "./pages/restaurant/WaiterDisplay";
import QrMenu from "./pages/restaurant/QrMenu";
import Tables from "./pages/restaurant/Tables";
import RoomService from "./pages/restaurant/RoomService";
import BillingCounterDashboard from "./pages/BillingCounterDashboard";
import MeasurementUnits from "./pages/settings/Items/MeasurementUnits";
import VerifyEmail from "./components/auth/VerifyEmail";
import KYB from "./pages/kyb/KYB";
import OnboardingLayout from "./layouts/OnboardingLayout";
import Area from "./pages/restaurant/Area";
import AddProduct from "./pages/stock/product/AddProduct";
import Branches from "./pages/branches/Branches";
import NewPurchaseOrder from "./pages/sales/PurchaseOrder/NewPurchaseOrder";
import Company from "./pages/settings/Items/Company";
import BillingCounters from "./pages/settings/Items/BillingCounters";
import PaymentMethods from "./pages/settings/Items/PaymentMethods";
import Site from "./pages/settings/Items/Site";
import Printers from "./pages/settings/Items/Printers";
import AddBranch from "./pages/branches/AddBranch";
import WelcomeLayout from "./layouts/WelcomeLayout";
import Welcome from "./pages/setup/Welcome";
import Branch from "./pages/setup/Branch";

function App() {
  return (
    <BrowserRouter>
      {/* Alert component */}
      <Alert />
      <Routes>
        <Route
          path="/"
          element={
            <Protected>
              <MainLayout />
            </Protected>
          }
        >
          <Route
            index
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />

          <Route
            path="/billing_counter"
            element={
              <Protected>
                <BillingCounterDashboard />
              </Protected>
            }
          />
          <Route
            path="/settings"
            element={
              <Protected>
                <Settings />
              </Protected>
            }
          />
          {/* Tax related routes */}
          <Route
            path="settings/tax"
            element={
              <Protected>
                <Tax />
              </Protected>
            }
          />
          <Route
            path="/settings/measurement_units"
            element={
              <Protected>
                <MeasurementUnits />
              </Protected>
            }
          />

          <Route
            path="/settings/branches"
            element={
              <Protected>
                <Branches />
              </Protected>
            }
          />

          <Route
            path="/settings/branches/add"
            element={
              <Protected>
                <AddBranch />
              </Protected>
            }
          />

          <Route
            path="/settings/company"
            element={
              <Protected>
                <Company />
              </Protected>
            }
          />

          <Route
            path="/settings/site"
            element={
              <Protected>
                <Site />
              </Protected>
            }
          />
          <Route
            path="/settings/printers"
            element={
              <Protected>
                <Printers />
              </Protected>
            }
          />
          <Route
            path="/settings/billing_counters"
            element={
              <Protected>
                <BillingCounters />
              </Protected>
            }
          />

          <Route
            path="/settings/payment_methods"
            element={
              <Protected>
                <PaymentMethods />
              </Protected>
            }
          />

          <Route
            path="/settings/kitchen_displays"
            element={
              <Protected>
                <Company />
              </Protected>
            }
          />

          <Route
            path="/sales/invoices"
            element={
              <Protected>
                <Invoice />
              </Protected>
            }
          />
          <Route
            path="/cards"
            element={
              <Protected>
                <Cards />
              </Protected>
            }
          />
          <Route
            path="/notifications"
            element={
              <Protected>
                <Notifications />
              </Protected>
            }
          />
          <Route
            path="/suppliers"
            element={
              <Protected>
                <Suppliers />
              </Protected>
            }
          />
          <Route
            path="/payments/acounts"
            element={
              <Protected>
                <Accounts />
              </Protected>
            }
          />
          <Route
            path="/payments/business_register"
            element={
              <Protected>
                <BusinessRegister />
              </Protected>
            }
          />
          <Route
            path="payments/transactions"
            element={
              <Protected>
                <Transactions />
              </Protected>
            }
          />
          <Route
            path="/payments/monthly_targets"
            element={
              <Protected>
                <MonthlyTargets />
              </Protected>
            }
          />

          {/* Sales related routes */}
          <Route
            path="sales/orders"
            element={
              <Protected>
                <Orders />
              </Protected>
            }
          />

          <Route
            path="sales/quotations"
            element={
              <Protected>
                <Quotations />
              </Protected>
            }
          />
          <Route
            path="sales/digital_menu_orders"
            element={
              <Protected>
                <DigitalMenuOrders />
              </Protected>
            }
          />
          {/* User related routes */}
          <Route
            path="users/staff"
            element={
              <Protected>
                <Staff />
              </Protected>
            }
          />
          <Route
            path="users/customers"
            element={
              <Protected>
                <Customers />
              </Protected>
            }
          />
          <Route
            path="users/roles"
            element={
              <Protected>
                <Roles />
              </Protected>
            }
          />
          <Route
            path="users/permissions"
            element={
              <Protected>
                <Permissions />
              </Protected>
            }
          />

          <Route
            path="codes/discount"
            element={
              <Protected>
                <DiscountCodes />
              </Protected>
            }
          />
          <Route
            path="codes/coupon"
            element={
              <Protected>
                <Coupon />
              </Protected>
            }
          />

          {/*Menu Related routes */}
          <Route
            path="menu/products"
            element={
              <Protected>
                <Products />
              </Protected>
            }
          />
          <Route
            path="menu/products/add"
            element={
              <Protected>
                <AddProduct />
              </Protected>
            }
          />
          <Route
            path="menu/categories"
            element={
              <Protected>
                <Categories />
              </Protected>
            }
          />
          <Route
            path="menu/addon_groups"
            element={
              <Protected>
                <AddOnGroups />
              </Protected>
            }
          />

          {/* Stock related routes */}

          <Route
            path="stock/ingredients"
            element={
              <Protected>
                <Ingredients />
              </Protected>
            }
          />

          <Route
            path="stock/purchase_orders"
            element={
              <Protected>
                <PurchaseOrders />
              </Protected>
            }
          />
          <Route
            path="stock/new_purchase_order"
            element={
              <Protected>
                <NewPurchaseOrder />
              </Protected>
            }
          />

          <Route
            path="stock/transfer"
            element={
              <Protected>
                <StockTransfer />
              </Protected>
            }
          />
          <Route
            path="stock/return"
            element={
              <Protected>
                <StockReturn />
              </Protected>
            }
          />
          <Route
            path="stock/product_label"
            element={
              <Protected>
                <ProductLabel />
              </Protected>
            }
          />
          <Route
            path="stock/addon_groups"
            element={
              <Protected>
                <AddOnGroups />
              </Protected>
            }
          />

          {/* Report related routes */}
          <Route
            path="reports/download"
            element={
              <Protected>
                <DownloadReports />
              </Protected>
            }
          />
          <Route
            path="reports/best_sellers"
            element={
              <Protected>
                <BestSellers />
              </Protected>
            }
          />
          <Route
            path="reports/day_wise_sales"
            element={
              <Protected>
                <DayWiseSales />
              </Protected>
            }
          />
          <Route
            path="reports/category"
            element={
              <Protected>
                <CategoryReport />
              </Protected>
            }
          />
          <Route
            path="reports/product_quantity_alert"
            element={
              <Protected>
                <ProductQuantityAlert />
              </Protected>
            }
          />
          <Route
            path="reports/ingredient_quantity_alert"
            element={
              <Protected>
                <IngredientQuantityAlert />
              </Protected>
            }
          />
          <Route
            path="reports/branch_stock_chart"
            element={
              <Protected>
                <BranchStockChart />
              </Protected>
            }
          />

          {/* Restaurant related routes */}
          <Route
            path="restaurant/kitchen_display"
            element={
              <Protected>
                <KitchenDisplay />
              </Protected>
            }
          />
          <Route
            path="restaurant/waiter_display"
            element={
              <Protected>
                <WaiterDisplay />
              </Protected>
            }
          />
          <Route
            path="restaurant/qr_menu"
            element={
              <Protected>
                <QrMenu />
              </Protected>
            }
          />
          <Route
            path="table/area"
            element={
              <Protected>
                <Area />
              </Protected>
            }
          />
          <Route
            path="table/tables"
            element={
              <Protected>
                <Tables />
              </Protected>
            }
          />
          <Route
            path="table/rooms"
            element={
              <Protected>
                <RoomService />
              </Protected>
            }
          />
        </Route>

        <Route element={<OnboardingLayout />}>
          <Route
            path="/business_verification"
            element={
              <Protected>
                <KYB />
              </Protected>
            }
          />
        </Route>

        <Route element={<WelcomeLayout />}>
          <Route
            path="/welcome"
            element={
              <Protected>
                <Welcome />
              </Protected>
            }
          />
          <Route
            path="/welcome/branch"
            element={
              <Protected>
                <Branch />
              </Protected>
            }
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/verify_email" element={<VerifyEmail />} />
        </Route>

        <Route element={<SelectBranchLayout />}>
          <Route
            path="select/branch"
            element={
              <Protected>
                <SelectBranch />
              </Protected>
            }
          />
        </Route>
        <Route path="*" element={<p>There&apos;s nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
