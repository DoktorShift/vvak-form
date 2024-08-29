function showSummary() {
    const summaryModal = document.getElementById('summary-modal');
    const summaryContent = document.getElementById('summary-content');
    summaryContent.innerHTML = '';  // Clear previous content

    const formData = new FormData(document.querySelector('form'));

    let currentTab = 1;
    let transactionData = '';

    formData.forEach((value, key) => {
        if (value.trim() !== '') {  // Check if the field is not empty
            if (key.includes(`zeitpunkt-${currentTab}`)) {
                if (transactionData) {
                    transactionData += `</div>`; // Close previous card
                    currentTab++;
                }
                transactionData += `<div class="card"><h3>Transaktion ${currentTab}</h3>`;
                transactionData += `<br><strong>Transaktionsdetails</strong><br>`;
            }

            if (key.includes(`zeitpunkt-${currentTab}`)) {
                transactionData += `<strong>Uhrzeit:</strong> ${value}<br>`;
            } else if (key.includes(`krypto-platform-${currentTab}`)) {
                transactionData += `<strong>Krypto-Börse:</strong> ${value}<br>`;
            } else if (key.includes(`waehrung-${currentTab}`)) {
                transactionData += `<strong>Verwendete Kryptowährung:</strong> ${value}<br>`;
            } else if (key.includes(`betrag-landeswaehrung-${currentTab}`)) {
                if (!transactionData.includes('<strong>Vermögensübertragung/Stehlgut</strong>')) {
                    transactionData += `<br><strong>Vermögensübertragung/Stehlgut</strong><br>`;
                }
                transactionData += `<strong>Gesendeter Betrag in Landeswährung:</strong> ${value}<br>`;
            } else if (key.includes(`währung-landeswaehrung-${currentTab}`)) {
                transactionData += `<strong>Währung:</strong> ${value}<br>`;
            } else if (key.includes(`betrag-krypto-${currentTab}`)) {
                transactionData += `<strong>Gesendeter Betrag in der Kryptowährung:</strong> ${value}<br>`;
            } else if (key.includes(`krypto-adresse-${currentTab}`)) {
                if (!transactionData.includes('<strong>Täterspezifische Daten</strong>')) {
                    transactionData += `<br><strong>Täterspezifische Daten</strong><br>`;
                }
                transactionData += `<strong>Krypto-Adresse des Beschuldigten:</strong> ${value}<br>`;
            } else if (key.includes(`tx-hash-${currentTab}`)) {
                transactionData += `<strong>TX-Hash (Individualkennung der Transaktion):</strong> ${value}<br>`;
            } else if (key.includes(`krypto-adresse-geschaedigter-${currentTab}`)) {
                if (!transactionData.includes('<strong>Geschädigtendaten</strong>')) {
                    transactionData += `<br><strong>Geschädigtendaten</strong><br>`;
                }
                transactionData += `<strong>Krypto-Adresse des Geschädigten:</strong> ${value}<br>`;
            } else if (key.includes(`e-mail-adresse-geschaedigter-${currentTab}`)) {
                transactionData += `<strong>E-Mail:</strong> ${value}<br>`;
            } else if (key.includes(`benutzername-geschaedigter-${currentTab}`)) {
                transactionData += `<strong>Benutzername:</strong> ${value}<br>`;
            } else if (key.includes(`beschreibung-${currentTab}`)) {
                if (!transactionData.includes('<strong>Beschreibung und Hinweise</strong>')) {
                    transactionData += `<br><strong>Beschreibung und Hinweise</strong><br>`;
                }
                transactionData += `<strong>Beschreibung der Kontaktaufnahme:</strong> ${value}<br>`;
            } else if (key.includes(`weitere-hinweise-${currentTab}`)) {
                transactionData += `<strong>Weitere Hinweise (Wallets, Anbieter, Apps, Kontaktdaten etc.):</strong> ${value}<br>`;
            }
        }
    });

    if (transactionData) {
        transactionData += `</div>`;  // Close last card
    }

    summaryContent.innerHTML = transactionData;  // Append all transaction data
    summaryModal.style.display = 'block';  // Show the summary modal
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    let yOffset = 20;

    const summaryContent = document.getElementById('summary-content');
    const cards = summaryContent.querySelectorAll('.card');

    cards.forEach((card, cardIndex) => {
        if (cardIndex > 0) {
            doc.addPage();
            yOffset = 20;
        }

        // Render the transaction title as a separate "card"
        doc.setFontSize(18);
        doc.setTextColor(0, 51, 102);
        doc.setFont("helvetica", "bold");
        doc.text(20, yOffset, card.querySelector('h3').textContent);
        yOffset += 12;

        doc.setDrawColor(0, 51, 102);  // Dark blue border
        doc.setLineWidth(0.5);
        doc.rect(15, yOffset - 10, 180, 0.5, 'S');  // Line under the title
        yOffset += 5;

        const cardContent = card.querySelectorAll('strong');
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0);

        cardContent.forEach((element, index) => {
            let text = element.textContent + " " + element.nextSibling.textContent.trim();
            const splitText = doc.splitTextToSize(text, 170);

            if (index === 0 || 
                text.startsWith('Transaktionsdetails:') || 
                text.startsWith('Vermögensübertragung/Stehlgut:') || 
                text.startsWith('Täterspezifische Daten:') || 
                text.startsWith('Geschädigtendaten:') || 
                text.startsWith('Beschreibung und Hinweise:')) {
                yOffset += 6;
                doc.setFont("helvetica", "bold");
            } else {
                doc.setFont("helvetica", "normal");
            }

            splitText.forEach(line => {
                if (yOffset > 280) {  // Start a new page if space is running out
                    doc.addPage();
                    yOffset = 20;
                }
                doc.text(20, yOffset, line);
                yOffset += 7;
            });
        });

        // Draw a box around the transaction card for clear separation
        doc.setDrawColor(0, 51, 102);  // Dark blue border
        doc.setLineWidth(0.5);
        doc.rect(15, yOffset - (cardContent.length * 8 + 20), 180, (cardContent.length * 8 + 20), 'S');

        yOffset += 10;
    });

    doc.save('KryptoTransaktion.pdf');
}
