document.addEventListener("DOMContentLoaded", () => {
    const userButtons = document.querySelectorAll(".user-button");
    const samplesDiv = document.getElementById("samples");
    const sampleButtons = document.querySelectorAll(".sample-button");
    const resultDisplay = document.getElementById("averageResult");
    const tableContainer = document.getElementById("tableContainer");

    // Object to store scores for each user
    const userScores = JSON.parse(localStorage.getItem("userScores")) || {};

    let currentUser = null;
    
    // Handle user selection
    userButtons.forEach(button => {
        button.addEventListener("click", () => {
            currentUser = button.getAttribute("data-user");

            // Initialize scores for the selected user if not already set
            if (!userScores[currentUser]) {
                userScores[currentUser] = {
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                    5: null,
                    6: null
                };
            }

            // Update the total scores under the sample buttons for the selected user
            Object.keys(userScores[currentUser]).forEach(sampleNumber => {
                const scoreDisplay = document.getElementById(`score-${sampleNumber}`);
                const score = userScores[currentUser][sampleNumber];
                scoreDisplay.textContent = `Total: ${score !== null ? score : "N/A"}`;
            });

            // Display the samples row
            samplesDiv.style.display = "flex";

            // Display the currently selected user
            const resultDisplay = document.getElementById("averageResult");
            resultDisplay.textContent = `Selected User: ${currentUser}`;
        });
    });

    // Handle sample selection
    sampleButtons.forEach(button => {
        button.addEventListener("click", () => {
            if (!currentUser) {
                alert("Please select a user first!");
                return;
            }

            const sampleNumber = button.getAttribute("data-sample");

            // Create the table dynamically
            tableContainer.innerHTML = `
                <h3>${currentUser} - Sample ${sampleNumber}</h3>
                <table>
                    <tr>
                        <td>Sample</td>
                        <td>${sampleNumber}</td>
                    </tr>
                    <tr>
                        <td>Fragrance</td>
                        <td><input type="number" id="fragrance" min="1" max="10"></td>
                    </tr>
                    <tr>
                        <td>Flavor</td>
                        <td><input type="number" id="flavor" min="1" max="10"></td>
                    </tr>
                    <tr>
                        <td>Body</td>
                        <td><input type="number" id="body" min="1" max="10"></td>
                    </tr>
                    <tr>
                        <td>Aftertaste</td>
                        <td><input type="number" id="aftertaste" min="1" max="10"></td>
                    </tr>
                    <tr>
                        <td>Balance</td>
                        <td><input type="number" id="balance" min="-10" max="5"></td>
                    </tr>
                    <tr>
                        <td>Total</td>
                        <td><input type="number" id="total" readonly></td>
                    </tr>
                </table>
                <button id="calculateTotal">Calculate Total</button>
            `;

            // Show the table
            tableContainer.style.display = "block";

            // Add functionality to calculate the total
            document.getElementById("calculateTotal").addEventListener("click", () => {
                const fragrance = parseInt(document.getElementById("fragrance").value) || 0;
                const flavor = parseInt(document.getElementById("flavor").value) || 0;
                const body = parseInt(document.getElementById("body").value) || 0;
                const aftertaste = parseInt(document.getElementById("aftertaste").value) || 0;
                const balance = parseInt(document.getElementById("balance").value) || 0;

                // Ensure the balance score is within the allowed range
                if (balance < -10 || balance > 5) {
                    alert("Balance must be between -10 and +5.");
                    return;
                }

                // Calculate the total score
                const total = fragrance + flavor + body + aftertaste + balance;
                document.getElementById("total").value = total;

                // Save the total score for the selected user and sample
                userScores[currentUser][sampleNumber] = total;

                // Update the total score display for the sample
                const scoreDisplay = document.getElementById(`score-${sampleNumber}`);
                scoreDisplay.textContent = `Total: ${total}`;

                // Save the updated userScores object to localStorage
                localStorage.setItem("userScores", JSON.stringify(userScores));
            });
        });
    });
});
    

