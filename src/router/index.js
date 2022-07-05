import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);
let routes =[  
    {name:"/HomePage",path:"/HomePage",component:()=> import("../components/HomePage")},    
    // {name:"/HomePage2",path:"/",component:()=> import("../components/HomePage2")},    
    {name:"/LoginCode",path:"/",component:()=> import("../components/LoginCode")},    
    {name:"/ResError",path:"/ResError",component:()=> import("../components/ResError")},    
]
let router = new VueRouter({
    routes, 
});
export default router;
