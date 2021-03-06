import ATP_map from './atp_js/atp_map';
import MapForm_interactions from './atp_js/mapform_interactions'
import Form_view from './atp_js/forms-view'
// import websocket_utils from './atp_js/shape_request_ws'
let $ = require('jquery')

// $(document).ready(function(){
//     $(".nav-item.active").removeClass("active")
//     $(".nav-item a[href*='" + location.pathname + "']").parent().addClass("active");
// });

// $('#realtime_datepicker').datetimepicker({
//     timepicker: true,
//     datepicker: true,
//     formatDate:'Y-m-d',
//     allowTimes: ['00:00', '12:00'],
//     allowDates: ['2020-12-23','2020-12-25'], 
// })

$(() => {
    $(".nav-item.active").removeClass("active");
    // if (location.pathname.includes("load") {
    //     $('.nav-item a[href="/"]').parent().addClass("active");
    // }
    $(".nav-item a[href*='" + location.pathname + "']").parent().addClass("active");

    $(".hamburger").on("click", () => {
        $(".sidebar").toggleClass("open")
    });
    
    $(".toggle-topbar").on("click", () => {
        $(".topbar ul").toggle("slow");
        $(".toggle-topbar .arrow").toggleClass("down");
    });

    $(".loaded-data-info thead").on("click", () => {
        $(".loaded-data-info tbody").toggle("slow");
        $(".toggle-loaded-info .arrow").toggleClass("down");
    });

    $(`input[type=checkbox]#${location.pathname.split('/')[1]}`).prop("checked", "true")

    $(".flexpart-selection-input").on("change", function (this:any) {
        if (this.checked) {
            $(".flexpart-selection-input:checked ~ .flexpart-selection-label").get(0).scrollIntoView({
                behavior: 'smooth',
                alignToTop: 'false'
          });
        }
    })

    let atp_map;
    if ($(".archive-form").length) {
        atp_map = new ATP_map('mapid', [50.82, 4.35], 8, false);
    } else if ($(".flexextract-form").length) {
        atp_map = new ATP_map('mapid', [50.82, 4.35], 8, false, true);
    } else if ($(".flexpart-preloaded-form").length) {
        atp_map = new ATP_map('mapid', [50.82, 4.35], 8, true, true);
    }
    else {
        atp_map = new ATP_map('mapid', [50.82, 4.35], 8, true);
    }
    let form_view = new Form_view();
    form_view.initEvents();
    let mapform = new MapForm_interactions(atp_map, form_view);
    mapform.initEvents();

    // let map_form = new Form_view(my_atp_map);
    // map_form.initEvents();

    
}) 

