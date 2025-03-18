function submitScore() {
    let name = document.getElementById("name").value;
    let scores = [
        document.getElementById("score1").value,
        document.getElementById("score2").value,
        document.getElementById("score3").value,
        document.getElementById("score4").value,
        document.getElementById("score5").value,
        document.getElementById("score6").value
    ];

    if (!name || scores.some(score => score === "")) {
        alert("Please enter your name and all six scores.");
        return;
    }

    let data = { name: name, scores: scores };

    fetch("https://script.google.com/macros/s/AKfycbxCkGtvM5hpj4RR7K0mDhvPQFr8lgcQTH5-6JMoviHcvxeY5h8OvmfxsIiUpoEGnY89Jg/exec", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById("response").innerText = "Scores saved!";
    })
    .catch(error => {
        document.getElementById("response").innerText = "Error saving scores.";
    });
}
