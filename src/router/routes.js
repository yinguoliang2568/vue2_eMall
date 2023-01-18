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
        // 因为不一定有params参数，所所以使用？
        path: "/Search/:keyword?",
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