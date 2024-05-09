import * as HeIcons from "react-icons/fa6";
import * as Icon from "react-icons/si";

export const subMenusList = [
  // {
  //   name: "Sales",
  //   path: "/sales",
  //   icon: <HeIcons.FaCartShopping size={16} className="min-w-max" />,
  //   subNav: [
  //     {
  //       title: "Orders",
  //       path: "/sales/orders",
  //     },
  //     {
  //       title: "Digital Menu Orders",
  //       path: "/sales/digital_menu_orders",
  //     },

  //     // {
  //     //   title: "Invoices",
  //     //   path: "/sales/invoices",
  //     // },
  //     // {
  //     //   title: "Quotations",
  //     //   path: "/sales/quotations",
  //     // },
  //   ],
  // },
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
    name: "Inventory",
    path: "/inventory",
    icon: <HeIcons.FaBagShopping size={16} className="min-w-max" />,
    subNav: [
      {
        title: "Suppliers",
        path: "/inventory/suppliers",
      },
      {
        title: "Items",
        path: "/inventory/items",
      },
      {
        title: "Purchase Orders",
        path: "/inventory/purchase_orders",
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
    name: "Manage",
    path: "/manage",
    icon: <HeIcons.FaGear size={16} className="min-w-max" />,
    subNav: [
      // {
      //   title: "Company",
      //   path: "/manage/company",
      // },
      // {
      //   title: "Site",
      //   path: "/manage/site",
      // },
      {
        title: "Users",
        path: "/manage/users",
      },
      {
        title: "Roles",
        path: "/manage/roles",
      },
      // {
      //   title: "Permissions",
      //   path: "/manage/permissions",
      // },
      {
        title: "Branches",
        path: "/manage/branches",
      },
      {
        title: "Discount",
        path: "/manage/discount",
      },
      {
        title: "Coupon",
        path: "/manage/coupon",
      },
      {
        title: "Taxes",
        path: "/manage/tax",
      },
      {
        title: "Billing Counters",
        path: "/manage/billing_counters",
      },
      {
        title: "Measurement Units",
        path: "/manage/measurement_units",
      },
      {
        title: "Payment Methods",
        path: "/manage/payment_methods",
      },
      {
        title: "Printers",
        path: "/manage/printers",
      },
      {
        title: "Kitchen Displays",
        path: "/manage/kitchen_displays",
      },
    ],
  },
];
