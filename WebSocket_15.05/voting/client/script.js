
let socket = new WebSocket("ws://localhost:3000/voting");
socket.onmessage = function (event) {
    let receivedResults = JSON.parse(event.data);
    document.getElementById("pizza").innerText = receivedResults.pizza;
    document.getElementById("pasta").innerText = receivedResults.pasta;
};

function onMessage(event) { }
function vote(value) {
    socket.send(value);
}