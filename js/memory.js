const mieImg = ["arrabbiato", "bello", "piangere", "ridere", "amare", "amare1", "spavento", "shock", "arrabbiato", "bello",
    "piangere", "ridere", "amare", "amare1", "spavento", "shock"
];

let arrayComparison = [];
let iconsFind = [];
let tempo = 0;
let interval;
let find = $(".find");
let modal = $("#modal");
let memoryTimer;
let numeroClick = 0;


function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}
//Document Ready
$(() => {

    //Funzione inizio gioco
    function startGame() {
        numeroClick = 0;
        $(".numeroClick").text("Click: " + numeroClick);
        let cards = shuffle(mieImg);
        let container = $("#griglia");
        container.text("");
        cards.forEach((value) => {
            let wrapper = $("<div> </div>");
            let card = $("<img />").attr('src', "./img/" + value + ".png");
            card.src = "./img/" + value + ".png";
            card.addClass("icon");
            card.attr("draggable", false);
            card.on("click", displayIcon);
            card.appendTo(wrapper);
            wrapper.appendTo("#griglia");
        })
    }



    function displayIcon() {
        numeroClick++
        $(".numeroClick").text("Click: " + numeroClick)
        var icon = $(".icon");
        var icons = [...icon];
        $(this).parent().toggleClass("show disabled");
        $(this).toggleClass("show");

        arrayComparison.push(this);
        var len = arrayComparison.length;

        if (len === 2) {
            if (arrayComparison[0].src === arrayComparison[1].src) {
                $(arrayComparison[0]).parent().addClass("find disabled");
                $(arrayComparison[1]).parent().addClass("find disabled");
                $(arrayComparison[0]).addClass("find disabled");
                $(arrayComparison[1]).addClass("find disabled");
                iconsFind = [...iconsFind, ...arrayComparison]
                arrayComparison = [];
                if (iconsFind.length == mieImg.length) {
                    vittoria();
                }
            } else {

                icons.forEach(function (item) {
                    $(item).addClass('disabled');
                });

                setTimeout(function () {
                    $(arrayComparison[0]).parent().removeClass("show disabled");
                    $(arrayComparison[1]).parent().removeClass("show disabled");
                   
                    $(arrayComparison[0]).removeClass("show disabled");
                    $(arrayComparison[1]).removeClass("show disabled");
                   
                    icons.forEach(function (item) {
                        $(item).removeClass('disabled');
                        for (var i = 0; i < iconsFind.length; i++) {
                            $(iconsFind[i]).addClass("disabled");
                        }
                    });
                    arrayComparison = [];
                }, 700);
            }
        }
    }

    
    function vittoria() {
        $("#modal").addClass("active");
        $("numeroClick").text("Click: " + numeroClick);
        iconsFind = [];
        numeroClick = 0;
    }


    function playAgain() {
        $("#modal").removeClass("active");
        startGame();
    }

    // Aggiungiamo gli event Listener ai bottoni
    $(".ricarica").on("click", () => {
        location.reload();
    })

    $("input[value=Ricomincia]").on("click", startGame);

    $("#altraPar").on("click", playAgain);
    startGame();
})