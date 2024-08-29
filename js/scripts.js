let tabCounter = 1;

function openTab(event, tabId) {
    const tabContent = document.querySelectorAll('.tab-content');
    tabContent.forEach(tab => tab.classList.remove('active'));

    const tabLinks = document.querySelectorAll('.tab-link');
    tabLinks.forEach(tab => tab.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

function addTab() {
    tabCounter++;
    const tabId = `tab-${tabCounter}`;
    const tabTitle = `Transaktion ${tabCounter}`;

    const newTabButton = document.createElement('button');
    newTabButton.className = 'tab-link';
    newTabButton.innerHTML = `${tabTitle} <span class="tab-close" onclick="removeTab(event, '${tabId}')">&times;</span>`;
    newTabButton.setAttribute('onclick', `openTab(event, '${tabId}')`);

    const addButton = document.querySelector('.tabs .add-button');
    addButton.parentNode.insertBefore(newTabButton, addButton);

    const newTabContent = document.createElement('div');
    newTabContent.className = 'tab-content';
    newTabContent.id = tabId;
    newTabContent.innerHTML = `
        <div class="form-section">
            <div class="section-title">Transaktionsdetails</div>
            <label for="zeitpunkt-${tabCounter}">Zeitpunkt der Transaktion
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Datum und Uhrzeit, zu der die Transaktion durchgeführt wurde.</span>
                </div>
            </label>
            <input type="datetime-local" id="zeitpunkt-${tabCounter}" name="zeitpunkt-${tabCounter}" required>
            
            <label for="krypto-platform-${tabCounter}">Krypto-Börse
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Die Handelsplattform oder Börse, über die die Transaktion ausgeführt wurde. Falls ein privates Wallet (unhosted Wallet) verwendet wurde, bitte Name unter "Andere" angeben.</span>
                </div>
            </label>
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

            <label for="waehrung-${tabCounter}">Verwendete Kryptowährung
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Wählen Sie die Kryptowährung aus, die der Täter verwendet hat.</span>
                </div>
            </label>
            <select id="waehrung-${tabCounter}" name="waehrung-${tabCounter}[]" required onchange="toggleAndereWaehung(this, 'andere-kryptowaehrung-${tabCounter}'); updateCryptoLabel('waehrung-${tabCounter}', 'betrag-krypto-${tabCounter}');">
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

        <!-- Vermögensübertragung/Stehlgut -->
        <div class="form-section">
            <div class="section-title">Vermögensübertragung/Stehlgut</div>
            <label for="betrag-landeswaehrung-${tabCounter}">Gesendeter Betrag in Landeswährung
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Der Betrag in lokaler Währung, der gesendet wurde.</span>
                </div>
            </label>
            <input type="text" id="betrag-landeswaehrung-${tabCounter}" name="betrag-landeswaehrung-${tabCounter}" required placeholder="Beispiel: 500 EUR">

            <label for="währung-landeswaehrung-${tabCounter}">Währung</label>
            <select id="währung-landeswaehrung-${tabCounter}" name="währung-landeswaehrung-${tabCounter}" required>
                <option value="eur">Euro (EUR)</option>
                <option value="usd">US-Dollar (USD)</option>
            </select>

            <label for="betrag-krypto-${tabCounter}">Gesendeter Betrag in <span id="crypto-label-${tabCounter}">ausgewählter Kryptowährung</span>
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Der Betrag in der ausgewählten Kryptowährung, der gesendet wurde (z.B. 0.025 BTC).</span>
                </div>
            </label>
            <input type="text" id="betrag-krypto-${tabCounter}" name="betrag-krypto-${tabCounter}" placeholder="Beispiel: 0.025 BTC">
        </div>

        <div class="form-section">
            <div class="section-title">Täterspezifische Daten</div>

            <label for="krypto-adresse-${tabCounter}">Krypto-Adresse des Beschuldigten
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Geben Sie die Adresse ein, an welche die Kryptowährung gesendet wurde.</span>
                </div>
            </label>
            <input type="text" id="krypto-adresse-${tabCounter}" name="krypto-adresse-${tabCounter}[]" required placeholder="Beispiel: bc1qhflsyynztk8787">
            
            <label for="tx-hash-${tabCounter}">TX-Hash (Individualkennung der Transaktion)
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Dies ist die eindeutige Kennung der Transaktion. Falls von einer zentralen Börse versendet wurde, kann diese auch Transaktions-ID heißen.</span>
                </div>
            </label>
            <input type="text" id="tx-hash-${tabCounter}" name="tx-hash-${tabCounter}[]" placeholder="Beispiel: 4b8b1d5b3e2b...">
        </div>

        <div class="form-section">
            <div class="section-title">Geschädigtendaten</div>
            <label for="krypto-adresse-geschaedigter-${tabCounter}">Krypto-Adresse des Geschädigten
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Falls von einer zentralen Börse versendet wurde, kann das Feld freigelassen werden.</span>
                </div>
            </label>
            <input type="text" id="krypto-adresse-geschaedigter-${tabCounter}" name="krypto-adresse-geschaedigter-${tabCounter}" placeholder="Beispiel: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa">

            <label for="e-mail-adresse-geschaedigter-${tabCounter}">E-Mail-Adresse des Geschädigten
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Die E-Mail-Adresse, die der Geschädigte verwendet hat, um sich auf der Plattform/Börse einzuloggen.</span>
                </div>
            </label>
            <input type="text" id="e-mail-adresse-geschaedigter-${tabCounter}" name="e-mail-adresse-geschaedigter-${tabCounter}" placeholder="Beispiel: email@gmail.com">

            <label for="benutzername-geschaedigter-${tabCounter}">Benutzername des Geschädigten
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Der Benutzername des Geschädigten auf der Plattform/Börse.</span>
                </div>
            </label>
            <input type="text" id="benutzername-geschaedigter-${tabCounter}" name="benutzername-geschaedigter-${tabCounter}" placeholder="Beispiel: Mein Benutzername">
        </div>

        <div class="form-section">
            <div class="section-title">Beschreibung und Hinweise</div>
            <label for="beschreibung-${tabCounter}">Beschreibung der Kontaktaufnahme
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Beschreiben Sie, wie der Kontakt zwischen dem Täter und dem Geschädigten zustande kam.</span>
                </div>
            </label>
            <textarea id="beschreibung-${tabCounter}" name="beschreibung-${tabCounter}" placeholder="Beschreiben Sie, wie der Kontakt hergestellt wurde, und weitere relevante Informationen."></textarea>

            <label for="weitere-hinweise-${tabCounter}">Weitere Hinweise (Wallets, Anbieter, Apps etc.)
                <div class="tooltip-icon">
                    <img src="https://e7.pngegg.com/pngimages/87/647/png-clipart-product-design-brand-logo-font-tooltip-angle-text-thumbnail.png" alt="Tooltip">
                    <span class="tooltiptext">Geben Sie zusätzliche Informationen an, die für die Ermittlungen hilfreich sein könnten.</span>
                </div>
            </label>
            <textarea id="weitere-hinweise-${tabCounter}" name="weitere-hinweise-${tabCounter}" placeholder="Geben Sie zusätzliche Informationen an, die für die Untersuchung hilfreich sein könnten."></textarea>
        </div>
    `;
    document.getElementById('additional-tabs').appendChild(newTabContent);

    openTab({ currentTarget: newTabButton }, tabId);
}

function removeTab(event, tabId) {
    event.stopPropagation();

    const confirmRemoval = confirm('Möchten Sie diesen Tab wirklich löschen?');
    if (!confirmRemoval) return;

    const tabButton = event.currentTarget.closest('.tab-link');
    const tabContent = document.getElementById(tabId);

    tabButton.remove();
    tabContent.remove();

    const firstTab = document.querySelector('.tabs .tab-link');
    if (firstTab) {
        firstTab.classList.add('active');
        document.querySelector('.tab-content').classList.add('active');
    }

    reindexTabs();
}

function reindexTabs() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');
    tabCounter = tabLinks.length;

    tabLinks.forEach((tab, index) => {
        const newIndex = index + 1;
        tab.innerHTML = `Transaktion ${newIndex} <span class="tab-close" onclick="removeTab(event, 'tab-${newIndex}')">&times;</span>`;
        tab.setAttribute('onclick', `openTab(event, 'tab-${newIndex}')`);
    });

    tabContents.forEach((content, index) => {
        const newIndex = index + 1;
        content.id = `tab-${newIndex}`;
        content.querySelectorAll('label, input, select, textarea').forEach(element => {
            const attrName = element.getAttribute('for') || element.getAttribute('id') || element.getAttribute('name');
            if (attrName) {
                element.setAttribute('for', attrName.replace(/\d+/, newIndex));
                element.setAttribute('id', attrName.replace(/\d+/, newIndex));
                element.setAttribute('name', attrName.replace(/\d+/, newIndex));
            }
        });
    });
}

function toggleAndereWaehung(selectElement, andereInputId) {
    const andereInput = document.getElementById(andereInputId);
    if (selectElement.value === 'andere') {
        andereInput.style.display = 'block';
        andereInput.setAttribute('required', 'required');
    } else {
        andereInput.style.display = 'none';
        andereInput.removeAttribute('required');
    }
}

function updateCryptoLabel(waehrungSelectId, betragInputId) {
    const waehrungSelect = document.getElementById(waehrungSelectId);
    const betragLabel = document.getElementById(`crypto-label-${waehrungSelectId.split('-')[1]}`);
    const selectedWaehrung = waehrungSelect.options[waehrungSelect.selectedIndex].text;

    betragLabel.textContent = selectedWaehrung;
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

        doc.setFontSize(18);
        doc.setTextColor(0, 51, 102);
        doc.setFont("helvetica", "bold");
        doc.text(20, yOffset, card.querySelector('h3').textContent);
        yOffset += 12;

        const cardContent = card.querySelectorAll('strong');
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(0);

        cardContent.forEach((element) => {
            let text = element.textContent + " " + element.nextSibling.textContent.trim();
            const splitText = doc.splitTextToSize(text, 170);

            if (text.startsWith('Transaktionsdetails:') || 
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
                if (yOffset > 280) {
                    doc.addPage();
                    yOffset = 20;
                }
                doc.text(20, yOffset, line);
                yOffset += 7;
            });
        });
    });

    doc.save('KryptoTransaktion.pdf');
}

document.getElementById('krypto-platform-1').addEventListener('change', function() {
    const andereBoerseFeld = document.getElementById('andere-boerse-1');
    
    if (this.value === 'andere') {
        andereBoerseFeld.style.display = 'block';
        andereBoerseFeld.setAttribute('required', 'required');
    } else {
        andereBoerseFeld.style.display = 'none';
        andereBoerseFeld.removeAttribute('required');
    }
});

function autoSave() {
    localStorage.setItem('cryptoForm', JSON.stringify(Object.fromEntries(new FormData(document.querySelector('form')))));
}
setInterval(autoSave, 5000);

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('cryptoForm')) {
        const savedData = JSON.parse(localStorage.getItem('cryptoForm'));
        for (const [key, value] of Object.entries(savedData)) {
            const element = document.querySelector(`[name="${key}"]`);
            if (element) {
                element.value = value;
            }
        }
    }
});
