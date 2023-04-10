$(document).ready(function () {
    $("#landing-all-cards").hide();
    $("#landing-pad-api").on("click",function(){
        $("#landing-all-cards").show();
        $("#falcon-all-cards").hide();
        $("#falcon-history-details").hide();
        $("#landing-pad-details").hide();
    });
    $("#falcon-api").on("click",function(){
        $("#falcon-all-cards").show(); 
        $("#landing-all-cards").hide();
        $("#landing-pad-details").hide();
        $("#falcon-history-details").hide();
    });
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
        $(".navbar-btn").hide();
    });
    $(".back-btn").on("click", function () {
        $("#sidebar, #content").toggleClass("active");
        $(".navbar-btn").show();
    });
    $(".history-drop-menu").on("click", function () {
        $(".history-menu-list").toggle(200);
        $(".history-drop-menu").toggleClass("arrow-change");
    });
    $(".landing-drop-menu").on("click", function () {
        // $("#all-cards").show();
        $(".landing-menu-list").toggle(200);
        $(".landing-drop-menu").toggleClass("arrow-change");
        
    });
});
$(document).ready(function () {
    // ==============Falcon History api=============
    $.ajax({
        url: "https://api.spacexdata.com/v3/history/?limit=4&offset=0",
        type: "get",
        success: function (response) {
            let card_str = ""
            response.map(item => {
                card_str += `<div class="card">
                           <div class=card-dtl>
                             <h3>${item.title}</h3>
                             <p>ID: ${item.id}</p>
                           </div>
                           
                           <button class="dtl-btn" data-toggle="modal" data-target="#falcon-history-details" id="falcon_history_${item.id}" data-id="${item.id}">Details</button>
                            
                           </div>`
            });
            $("#falcon-history-data").html(card_str);
        }
    })
    $(document).on("click", "button[id^=falcon_history_]", function () {
        let id = $(this).attr("data-id");

        $.ajax({

            url: "https://api.spacexdata.com/v3/history/" + id,
            type: "get",
            success: function (response) {

                $(".title").text(response.title);
                $(".falcon-id").text(response.id);
                $(".event-date-utc").text(response.event_date_utc);
                $(".event-date-unix").text(response.event_date_unix);
                $(".flight-number").text(response.flight_number);
                $(".falcon-details").text(response.details);
                $(".reddit").attr("href", response.links.reddit);
                $(".article").attr("href", response.links.article);
                $(".wikipedia").attr("href", response.links.wikipedia);
                $("#falcon-history-details").show(300);
                $("#falcon-history-details").addClass("detail-style");
                $("#history_some_details").addClass("some-details");
            }
        })

    })
    //-------------------- ONE-EVENT------------------//
    $("#one-event").on("click", function (e) {
        e.preventDefault();
        $.ajax({

            url: "https://api.spacexdata.com/v3/history/?limit=1&offset=0",
            type: "get",
            success: function (response) {
                let card1_str = ""
                response.map(item => {
                    card1_str += `<div class="card">
                           <div class=card-dtl>
                             <h3>${item.title}</h3>
                             <p>ID: ${item.id}</p>
                           </div>
                           
                           <button class="dtl-btn" id="falcon_history_${item.id}" data-id="${item.id}">Details</button>
                            
                           </div>`
                });
                $("#falcon-history-data").html(card1_str);
            }
        })
    });
    // --------------ALL-EVENTS----------------//
    $("#all-events").on("click", function (e) {
        e.preventDefault();
        $.ajax({

            url: "https://api.spacexdata.com/v3/history",
            type: "get",
            success: function (response) {
                let all_card_str = ""
                response.map(item => {
                    all_card_str += `<div class="card">
                           <div class=card-dtl>
                             <h3>${item.title}</h3>
                             <p>ID: ${item.id}</p>
                           </div>
                           
                           <button class="dtl-btn" id="falcon_history_${item.id}" data-id="${item.id}">Details</button>
                            
                           </div>`
                });
                $("#falcon-history-data").html(all_card_str);
            }
        })
    });
    // ===========Landing Pads api link===========
    $.ajax({
        url: "https://api.spacexdata.com/v3/landpads/?limit=4&offset=0",
        type: "get",
        success: function (response) {
            let card_str = ""
            response.map(item => {
                card_str += `<div class="card">
                               <div class=card-dtl>
                                 <h3>${item.full_name}</h3>
                                 <p>ID: ${item.id}</p>
                               </div>
                               
                               <button class="dtl-btn" data-toggle="modal" data-target="#landing-pad-details" id="landing_pad_detail_${item.id}" data-id="${item.id}">Details</button>
                                
                               </div>`
            });
            $("#landing-pad-data").html(card_str);
        }
    })
    $(document).on("click", "button[id^=landing_pad_detail_]", function () {
        let id = $(this).attr("data-id");

        $.ajax({

            url: "https://api.spacexdata.com/v3/landpads/" + id,
            type: "get",
            success: function (response) {

                $(".full_name").text(response.full_name);
                $(".id").text(response.id);
                $(".status").text(response.status);
                $(".name").text(response.location.name);
                $(".region").text(response.location.region);
                $(".latitude").text(response.location.latitude);
                $(".longitude").text(response.location.longitude);
                $(".landing_type").text(response.landing_type);
                $(".attempted_landings").text(response.attempted_landings);
                $(".successful_landings").text(response.successful_landings);
                $(".wikipedia").attr("href", response.wikipedia);
                $(".pad-details").text(response.details);
                $("#landing-pad-details").show(300);
                $("#landing-pad-details").addClass("detail-style");
                $("#some_landing_pad_details").addClass("some-details");
            }
        })
    });
    // ---------------ONE-LANDING----------------//
    $("#one-landing").on("click", function (e) {
        e.preventDefault();
        $.ajax({

            url: "https://api.spacexdata.com/v3/landpads/?limit=1&offset=0",
            type: "get",
            success: function (response) {
                let one_card_str = ""
                response.map(item => {
                    one_card_str += `<div class="card">
                           <div class=card-dtl>
                             <h3>${item.full_name}</h3>
                             <p>ID: ${item.id}</p>
                           </div>
                           <button class="dtl-btn" id="landing_pad_detail_${item.id}" data-id="${item.id}">Details</button> 
                           </div>`
                });
                $("#landing-pad-data").html(one_card_str);
            }
        })
    });
    // ---------------ALL-LANDINGS-----------------//
    $("#all-landings").on("click", function (e) {
        e.preventDefault();
        $.ajax({

            url: "https://api.spacexdata.com/v3/landpads",
            type: "get",
            success: function (response) {
                let one_card_str = ""
                response.map(item => {
                    one_card_str += `<div class="card">
                           <div class=card-dtl>
                             <h3>${item.full_name}</h3>
                             <p>ID: ${item.id}</p>
                           </div>
                           <button class="dtl-btn" id="landing_pad_detail_${item.id}" data-id="${item.id}">Details</button> 
                           </div>`
                });
                $("#landing-pad-data").html(one_card_str);
            }
        })
    });
});
