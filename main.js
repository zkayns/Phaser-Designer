let obj={
    data: [
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
        "....................",
    ],
    pixelWidth: 1,
    pixelHeight: 1,
    palette: [
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000",
        "#000000"
    ]
};
let selectedColor="0";
let colorKeys=[
    "Digit0", 
    "Digit1", 
    "Digit2", 
    "Digit3", 
    "Digit4", 
    "Digit5", 
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "KeyA",
    "KeyB",
    "KeyC",
    "KeyD",
    "KeyE",
    "KeyF"
];
function update() {
    $("#spriteTable").children().each((i, e)=>e.remove());
    for (let y in new Uint8Array($("#height").val())) {
        $("#spriteTable").append(`<tr id='pixelRow${y}'></tr>`);
        for (let x in new Uint8Array($("#width").val())) {
            $(`#pixelRow${y}`).append(`<td class='pixel' id='pixel_${x}_${y}'></td>`);
            $(`#pixel_${x}_${y}`)
                .css("background-color", obj.palette[parseInt(obj.data[y][x], 16)]??"rgba(0, 0, 0, 0)")
                .on("click", (e)=>{
                    obj.data[e.target.id.split("_")[2]]=[...obj.data[e.target.id.split("_")[2]]].toSpliced(e.target.id.split("_")[1], 1, selectedColor).join("");
                    update();
                })
                .on("contextmenu", (e)=>{
                    e.preventDefault();
                    obj.data[e.target.id.split("_")[2]]=[...obj.data[e.target.id.split("_")[2]]].toSpliced(e.target.id.split("_")[1], 1, ".").join("");
                    update();
                });
        };
    };
    $("#output").html(JSON.stringify(obj, null, "\t"));
};
update();
$("#width").on("change", (e)=>{
    obj.data=obj.data.map(i=>i.slice(0, e.target.value).padEnd(e.target.value, ".")); 
    update();
});
$("#height").on("change", (e)=>{
    obj.data=obj.data.slice(0, e.target.value); 
    while (obj.data.length<e.target.value) obj.data.push(".".repeat(obj.data[0].length));
    update();
});
$("#pixelWidth").on("change", (e)=>{
    obj.pixelWidth=parseInt(e.target.value);
    update();
});
$("#pixelHeight").on("change", (e)=>{
    obj.pixelHeight=parseInt(e.target.value);
    update();
});
$("#paletteTable input[type=color]").on("change", (e)=>{
    obj.palette[e.target.id.split("col")[1]-1]=e.target.value;
    $(e.target.parentElement).css("background-color", e.target.value);
    update();
});
$(":root").on("keydown", (e)=>{
    if (colorKeys.includes(e.code)) selectedColor=colorKeys.indexOf(e.code).toString(16);
    if (e.code=="ShiftRight") console.log(obj);
});
