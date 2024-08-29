let tabCounter = 1;

function openTab(event, tabId) {
    // Verstecke alle Tabs
    const tabContent = document.querySelectorAll('.tab-content');
    tabContent.forEach(tab => tab.classList.remove('active'));

    // Entferne active-Klasse von allen Tab-Links
    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(tab => tab.classList.remove('active'));

    // Zeige den ausgewählten Tab und aktiviere den Link
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function addTab() {
    tabCounter++;
    const tabId = `tab-${tabCounter}`;
    const tabTitle = `Transaktion ${tabCounter}`;

    // Neuen Tab-Button hinzufügen
    const newTabButton = document.createElement('button');
    newTabButton.className = 'tab-link';
    newTabButton.innerHTML = `${tabTitle} <span class="tab-close" onclick="removeTab(event, '${tabId}')">&times;</span>`;
    newTabButton.setAttribute('onclick', `openTab(event, '${tabId}')`);

    const addButton = document.querySelector('.tabs .add-button');
    addButton.parentNode.insertBefore(newTabButton, addButton);

    // Neuen Tab-Inhalt hinzufügen
    const newTabContent = document.createElement('div');
    newTabContent.className = 'tab-content';
    newTabContent.id = tabId;
    newTabContent.innerHTML = `
        <div class="form-section">
            <div class="section-title">Transaktionsdetails</div>
            <label for="zeitpunkt-${tabCounter}">Zeitpunkt der Transaktion</label>
            <input type="datetime-local" id="zeitpunkt-${tabCounter}" name="zeitpunkt-${tabCounter}" required>
            
            <label for="krypto-platform-${tabCounter}">Krypto-Börse</label>
            <select id="krypto-platform-${tabCounter}" name="krypto-platform-${tabCounter}" required onchange="toggleAndereWaehung(this, 'andere-boerse-${tabCounter}')">
                <option value="" disabled selected>Wählen Sie eine Börse</option>
                <option value="binance">Binance</option>
                <option value="coinbase">Coinbase</option>
                <option value="kraken">Kraken</option>
                <option value="crypto.com">Crypto.com</option>
                <option value="kucoin">KuCoin</option>
                <option value="huobi">Huobi</option>
                <option value="okx">OKX</option>
                <option value="bitfinex">Bitfinex</option>
                <option value="gemini">Gemini</option>
                <option value="bitstamp">Bitstamp</option>
                <option value="bybit">Bybit</option>
                <option value="bitget">Bitget</option>
                <option value="gateio">Gate.io</option>
                <option value="andere">Andere</option>
            </select>
            <input type="text" id="andere-boerse-${tabCounter}" name="andere-boerse-${tabCounter}" placeholder="Bitte Börse oder Name des Wallets angeben" style="display: none;">

            <label for="waehrung-${tabCounter}">Verwendete Kryptowährung</label>
            <select id="waehrung-${tabCounter}" name="waehrung-${tabCounter}[]" required onchange="toggleAndereWaehung(this, 'andere-kryptowaehrung-${tabCounter}'); updateCryptoLabel('waehrung-${tabCounter}', 'crypto-label-${tabCounter}');">
                <option value="" disabled selected>Wählen Sie eine Kryptowährung</option>
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="litecoin">Litecoin (LTC)</option>
                <option value="ripple">Ripple (XRP)</option>
                <option value="usdt">Tether (USDT)</option>
                <option value="usdc">USD Coin (USDC)</option>
                <option value="andere">Andere Kryptowährung</option>
            </select>
            <input type="text" id="andere-kryptowaehrung-${tabCounter}" name="andere-kryptowaehrung-${tabCounter}[]" placeholder="Bitte Kryptowährung angeben" style="display: none;">
        </div>

        <div class="form-section">
            <div class="section-title">Vermögensübertragung/Stehlgut</div>
            <label for="betrag-landeswaehrung-${tabCounter}">Gesendeter Betrag in Landeswährung</label>
            <input type="text" id="betrag-landeswaehrung-${tabCounter}" name="betrag-landeswaehrung-${tabCounter}" required placeholder="Beispiel: 500 EUR">

            <label for="währung-landeswaehrung-${tabCounter}">Währung</label>
            <select id="währung-landeswaehrung-${tabCounter}" name="währung-landeswaehrung-${tabCounter}" required>
                <option value="eur">Euro (EUR)</option>
                <option value="usd">US-Dollar (USD)</option>
            </select>

            <label for="betrag-krypto-${tabCounter}">Gesendeter Betrag in <span id="crypto-label-${tabCounter}">ausgewählter Kryptowährung</span></label>
            <input type="text" id="betrag-krypto-${tabCounter}" name="betrag-krypto-${tabCounter}" placeholder="Beispiel: 0.025 BTC">
        </div>

        <div class="form-section">
            <div class="section-title">Täterspezifische Daten</div>

            <label for="krypto-adresse-${tabCounter}">Krypto-Adresse des Beschuldigten</label>
            <input type="text" id="krypto-adresse-${tabCounter}" name="krypto-adresse-${tabCounter}[]" required placeholder="Beispiel: bc1qhflsyynztk8787">
            
            <label for="tx-hash-${tabCounter}">TX-Hash (Individualkennung der Transaktion)</label>
            <input type="text" id="tx-hash-${tabCounter}" name="tx-hash-${tabCounter}[]" placeholder="Beispiel: 4b8b1d5b3e2b...">
        </div>

        <div class="form-section">
            <div class="section-title">Geschädigtendaten</div>
            <label for="krypto-adresse-geschaedigter-${tabCounter}">Krypto-Adresse des Geschädigten</label>
            <input type="text" id="krypto-adresse-geschaedigter-${tabCounter}" name="krypto-adresse-geschaedigter-${tabCounter}" placeholder="Beispiel: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa">

            <label for="e-mail-adresse-geschaedigter-${tabCounter}">E-Mail-Adresse des Geschädigten</label>
            <input type="text" id="e-mail-adresse-geschaedigter-${tabCounter}" name="e-mail-adresse-geschaedigter-${tabCounter}" placeholder="Beispiel: email@gmail.com">

            <label for="benutzername-geschaedigter-${tabCounter}">Benutzername des Geschädigten</label>
            <input type="text" id="benutzername-geschaedigter-${tabCounter}" name="benutzername-geschaedigter-${tabCounter}" placeholder="Beispiel: Mein Benutzername">
        </div>

        <div class="form-section">
            <div class="section-title">Beschreibung und Hinweise</div>
            <label for="beschreibung-${tabCounter}">Beschreibung der Kontaktaufnahme</label>
            <textarea id="beschreibung-${tabCounter}" name="beschreibung-${tabCounter}" placeholder="Beschreiben Sie, wie der Kontakt hergestellt wurde, und weitere relevante Informationen."></textarea>

            <label for="weitere-hinweise-${tabCounter}">Weitere Hinweise (Wallets, Anbieter, Apps etc.)</label>
            <textarea id="weitere-hinweise-${tabCounter}" name="weitere-hinweise-${tabCounter}" placeholder="Geben Sie zusätzliche Informationen an, die für die Untersuchung hilfreich sein könnten."></textarea>
        </div>
    `;

    document.getElementById('additional-tabs').appendChild(newTabContent);

    // Öffne neuen Tab
    openTab({ currentTarget: newTabButton }, tabId);
}

function removeTab(event, tabId) {
    event.stopPropagation();
    document.getElementById(tabId).remove();
    event.currentTarget.parentNode.remove();

    // Öffne den ersten Tab, wenn der entfernte Tab aktiv war
    if (document.querySelector('.tab-link.active')) {
        openTab({ currentTarget: document.querySelector('.tab-link.active') }, document.querySelector('.tab-content.active').id);
    } else {
        openTab({ currentTarget: document.querySelector('.tab-link') }, 'tab-1');
    }
}

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

function toggleAndereWaehung(selectElement, otherInputId) {
    const otherInput = document.getElementById(otherInputId);
    if (selectElement.value === 'andere') {
        otherInput.style.display = 'block';
        otherInput.required = true;
    } else {
        otherInput.style.display = 'none';
        otherInput.required = false;
    }
}

function updateCryptoLabel(selectId, labelId) {
    const selectElement = document.getElementById(selectId);
    const labelElement = document.getElementById(labelId);
    labelElement.textContent = selectElement.options[selectElement.selectedIndex].textContent;
}
