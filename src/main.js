"use strict";
// import _ from "lodash";
import "./assets/css/style.less";
import "./assets/css/bootstrap.css";
import author from "./assets/data/author.json";
// import "./assets/js/bootstrap.js";
import { foo, cube } from "./assets/js/test.chunk";




var count = 0;
function component(a) {
    // var el = document.createElement("div");
    // el.innerHTML = _.join(["hello", author.name], "");
    // document.body.appendChild(el);
    console.error("error4");
    console.log(foo);
    cube();
    $.ajax({
        url: "/helloact/rankcj/getUserHistory",
        dataType: "json",
        type: "GET",
        xhrFields: {
            withCredentials: true
        },
        success: function(res) {
            console.log("res", res);
        }
    });

    document.getElementById("img").addEventListener("click",()=>{
        import(/* webpackChunkName: "demo"*/ './demo').then(module =>{
            var demo = module.default;
            demo();
        });
    },false)
}
component();


