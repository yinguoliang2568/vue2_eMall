export default [
    { path: "/home", component: () =>
            import ("@/views/Home"), name: "Home" },
    { path: "/Login", component: () =>
            import ("@/views/Login"), name: "Login" },
    {
        path: "/Register",
        component: () =>
            import ("@/views/Register"),
        name: "Register",
    },
    {
        path: "/Search",
        component: () =>
            import ("@/views/Search"),
        name: "Search",
    },
    {
        path: "/",
        redirect: "/home",
    },
    { path: "/*", component: () =>
            import ("@/views/404") },
];