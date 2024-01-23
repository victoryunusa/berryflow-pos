import * as HeIcons from "react-icons/fa6";
import * as Icon from "react-icons/si";

export const subMenusList = [
  {
    name: "Sales",
    path: "/sales",
    icon: <HeIcons.FaCartShopping size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Orders",
        path: "/sales/orders",
      },
      {
        title: "Digital Menu Orders",
        path: "/sales/digital_menu_orders",
      },

      // {
      //   title: "Invoices",
      //   path: "/sales/invoices",
      // },
      // {
      //   title: "Quotations",
      //   path: "/sales/quotations",
      // },
    ],
  },
  {
    name: "Payments",
    path: "/payments",
    icon: <HeIcons.FaMoneyBillTransfer size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Accounts",
        path: "/payments/acounts",
      },
      {
        title: "Business Registers",
        path: "/payments/business_register",
      },

      {
        title: "Transactions",
        path: "/payments/transactions",
      },
      // {
      //   title: "Monthly Targets",
      //   path: "/payments/monthly_targets",
      // },
    ],
  },
  {
    name: "People",
    path: "/users",
    icon: <HeIcons.FaUsersGear size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Staff",
        path: "/users/staff",
      },
      {
        title: "Customers",
        path: "/users/customers",
      },
      {
        title: "Roles",
        path: "/users/roles",
      },
      {
        title: "Permissions",
        path: "/users/permissions",
      },
    ],
  },
  {
    name: "Marketing",
    path: "/codes",
    icon: <HeIcons.FaPercent size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Discount",
        path: "/codes/discount",
      },
      {
        title: "Coupon",
        path: "/codes/coupon",
      },
    ],
  },
  {
    name: "Menu",
    path: "/menu",
    icon: <HeIcons.FaBowlFood size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Products",
        path: "/menu/products",
      },

      {
        title: "Categories",
        path: "/menu/categories",
      },

      {
        title: "Add-on Groups",
        path: "/menu/addon_groups",
      },
    ],
  },
  {
    name: "Purchases",
    path: "/stock",
    icon: <HeIcons.FaBowlFood size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Ingredients",
        path: "/stock/ingredients",
      },
      {
        title: "Purchase Orders",
        path: "/stock/purchase_orders",
      },
      // {
      //   title: "Stock Transfer",
      //   path: "/stock/transfer",
      // },
      // {
      //   title: "Stock Return",
      //   path: "/stock/return",
      // },
      // {
      //   title: "Product Label",
      //   path: "/stock/product_label",
      // },
    ],
  },

  {
    name: "Restaurant",
    path: "/restaurant",
    icon: <HeIcons.FaBellConcierge size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Kitchen Display",
        path: "/restaurant/kitchen_display",
      },
      {
        title: "Waiter Display",
        path: "/restaurant/waiter_display",
      },
      {
        title: "QR Menu",
        path: "/restaurant/qr_menu",
      },
    ],
  },
  {
    name: "Area & Table Management",
    path: "/table",
    icon: <Icon.SiTablecheck size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Area (Floor Plan)",
        path: "/table/area",
      },
      {
        title: "Tables",
        path: "/table/tables",
      },
      {
        title: "Room Service",
        path: "/table/rooms",
      },
    ],
  },
  {
    name: "Reports",
    path: "/reports",
    icon: <HeIcons.FaChartPie size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Download Reports",
        path: "/reports/download",
      },
      {
        title: "Best Sellers",
        path: "/reports/best_sellers",
      },
      {
        title: "Day Wise Sales",
        path: "/reports/day_wise_sales",
      },
      {
        title: "Category Report",
        path: "/reports/category",
      },
      {
        title: "Product Qunatity Alert",
        path: "/reports/product_quantity_alert",
      },
      {
        title: "Ingredient Qunatity Alert",
        path: "/reports/ingredient_quantity_alert",
      },
      {
        title: "Branch Stock Chart",
        path: "/reports/branch_stock_chart",
      },
    ],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <HeIcons.FaGear size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Company",
        path: "/settings/company",
      },
      {
        title: "Site",
        path: "/settings/site",
      },
      {
        title: "Branches",
        path: "/settings/branches",
      },
      {
        title: "Taxes",
        path: "/settings/tax",
      },
      {
        title: "Billing Counters",
        path: "/settings/billing_counters",
      },
      {
        title: "Measurement Units",
        path: "/settings/measurement_units",
      },
      {
        title: "Payment Methods",
        path: "/settings/payment_methods",
      },
      {
        title: "Printers",
        path: "/settings/printers",
      },
      {
        title: "Kitchen Displays",
        path: "/settings/kitchen_displays",
      },
    ],
  },
];
