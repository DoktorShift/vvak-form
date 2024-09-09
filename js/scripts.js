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
            <input type="text" id="krypto-adresse-${tabCounter}" name="krypto-adresse-${tabCounter}[]" required placeholder="Beispiel: bc1qhflsyynztk8787" onchange="generateExplorerLink('waehrung-${tabCounter}', this.value, 'btc-explorer-link-${tabCounter}')">
            <!-- Platz für den Explorer-Link -->
            <div id="btc-explorer-link-${tabCounter}"></div>
            
            <label for="tx-hash-${tabCounter}">TX-Hash (Individualkennung der Transaktion)</label>
            <input type="text" id="tx-hash-${tabCounter}" name="tx-hash-${tabCounter}[]" placeholder="Beispiel: 4b8b1d5b3e2b...">
        </div>

        <div class="form-section">
            <div class="section-title">Geschädigtendaten</div>
            <label for="krypto-adresse-geschaedigter-${tabCounter}">Krypto-Adresse des Geschädigten</label>
            <input type="text" id="krypto-adresse-geschaedigter-${tabCounter}" name="krypto-adresse-geschaedigter-${tabCounter}" placeholder="Beispiel: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa" onchange="generateExplorerLink('waehrung-${tabCounter}', this.value, 'btc-explorer-link-geschaedigter-${tabCounter}')">
            <!-- Platz für den Explorer-Link -->
            <div id="btc-explorer-link-geschaedigter-${tabCounter}"></div>

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
    
    // Sicherheitsabfrage vor dem Löschen
    if (!confirm("Sind Sie sicher, dass Sie diese Transaktion löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.")) {
        return;
    }

    // Entfernen des Tabs und des zugehörigen Inhalts
    document.getElementById(tabId).remove();
    event.currentTarget.parentNode.remove();

    // Reihenfolge der Tabs neu ordnen
    const tabs = document.querySelectorAll('.tab-link');
    tabs.forEach((tab, index) => {
        const newTabId = `tab-${index + 1}`;
        const oldTabId = tab.getAttribute('onclick').match(/'(.*?)'/)[1];

        tab.setAttribute('onclick', `openTab(event, '${newTabId}')`);
        tab.innerHTML = `Transaktion ${index + 1} <span class="tab-close" onclick="removeTab(event, '${newTabId}')">&times;</span>`;

        // Aktualisieren der Tab-Inhalte
        const tabContent = document.getElementById(oldTabId);
        tabContent.id = newTabId;

        // Aktualisieren der IDs und Namen der Eingabefelder innerhalb des Tabs
        const inputs = tabContent.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            const name = input.name.replace(/\d+/, index + 1);
            const id = input.id.replace(/\d+/, index + 1);
            input.name = name;
            input.id = id;
        });
    });

    tabCounter = tabs.length;

    // Öffne den ersten Tab, wenn der entfernte Tab aktiv war
    if (document.querySelector('.tab-link.active')) {
        openTab({ currentTarget: document.querySelector('.tab-link.active') }, document.querySelector('.tab-content.active').id);
    } else if (tabs.length > 0) {
        openTab({ currentTarget: tabs[0] }, `tab-1`);
    }
}

function showSummary() {
    const summaryModal = document.getElementById('summary-modal');
    const summaryContent = document.getElementById('summary-content');
    summaryContent.innerHTML = '';  // Clear previous content

    let transactionData = '';
    let currentTab = 1;

    while (document.getElementById(`tab-${currentTab}`)) {
        transactionData += `<div class="card"><h3>Transaktion ${currentTab}</h3>`;

        const time = document.getElementById(`zeitpunkt-${currentTab}`).value;
        const platform = document.getElementById(`krypto-platform-${currentTab}`).value;
        const currency = document.getElementById(`waehrung-${currentTab}`).value;
        const amountFiat = document.getElementById(`betrag-landeswaehrung-${currentTab}`).value;
        const fiatCurrency = document.getElementById(`währung-landeswaehrung-${currentTab}`).value;
        const amountCrypto = document.getElementById(`betrag-krypto-${currentTab}`).value;
        const suspectAddress = document.getElementById(`krypto-adresse-${currentTab}`).value;
        const txHash = document.getElementById(`tx-hash-${currentTab}`).value;
        const victimAddress = document.getElementById(`krypto-adresse-geschaedigter-${currentTab}`).value;
        const victimEmail = document.getElementById(`e-mail-adresse-geschaedigter-${currentTab}`).value;
        const victimUsername = document.getElementById(`benutzername-geschaedigter-${currentTab}`).value;
        const description = document.getElementById(`beschreibung-${currentTab}`).value;
        const additionalInfo = document.getElementById(`weitere-hinweise-${currentTab}`).value;

        transactionData += `<br><strong>Transaktionsdetails</strong><br>`;
        if (time) transactionData += `<strong>Uhrzeit:</strong> ${time}<br>`;
        if (platform) transactionData += `<strong>Krypto-Börse:</strong> ${platform}<br>`;
        if (currency) transactionData += `<strong>Verwendete Kryptowährung:</strong> ${currency}<br>`;

        transactionData += `<br><strong>Vermögensübertragung/Stehlgut</strong><br>`;
        if (amountFiat) transactionData += `<strong>Gesendeter Betrag in Landeswährung:</strong> ${amountFiat}<br>`;
        if (fiatCurrency) transactionData += `<strong>Währung:</strong> ${fiatCurrency}<br>`;
        if (amountCrypto) transactionData += `<strong>Gesendeter Betrag in der Kryptowährung:</strong> ${amountCrypto}<br>`;

        transactionData += `<br><strong>Täterspezifische Daten</strong><br>`;
        if (suspectAddress) transactionData += `<strong>Krypto-Adresse des Beschuldigten:</strong> ${suspectAddress}<br>`;
        if (txHash) transactionData += `<strong>TX-Hash (Individualkennung der Transaktion):</strong> ${txHash}<br>`;

        transactionData += `<br><strong>Geschädigtendaten</strong><br>`;
        if (victimAddress) transactionData += `<strong>Krypto-Adresse des Geschädigten:</strong> ${victimAddress}<br>`;
        if (victimEmail) transactionData += `<strong>E-Mail:</strong> ${victimEmail}<br>`;
        if (victimUsername) transactionData += `<strong>Benutzername:</strong> ${victimUsername}<br>`;

        transactionData += `<br><strong>Beschreibung und Hinweise</strong><br>`;
        if (description) transactionData += `<strong>Beschreibung der Kontaktaufnahme:</strong> ${description}<br>`;
        if (additionalInfo) transactionData += `<strong>Weitere Hinweise (Wallets, Anbieter, Apps, Kontaktdaten etc.):</strong> ${additionalInfo}<br>`;

        transactionData += `</div>`;  // Close the card

        currentTab++;
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

function generateExplorerLink(cryptoSelectId, address, linkContainerId) {
    const crypto = document.getElementById(cryptoSelectId).value;
    let url = '';

    if (crypto === 'bitcoin') {
        url = `<a href="https://mempool.space/address/${address}" target="_blank">Bitcoin Explorer</a>`;
    } else if (crypto === 'ethereum') {
        url = `<a href="https://etherscan.io/address/${address}" target="_blank">Ethereum Explorer</a>`;
    } else if (crypto === 'litecoin') {
        url = `<a href="https://blockchair.com/litecoin/address/${address}" target="_blank">Litecoin Explorer</a>`;
    } else if (crypto === 'ripple') {
        url = `<a href="https://xrpscan.com/account/${address}" target="_blank">Ripple Explorer</a>`;
    } else if (crypto === 'usdt' || crypto === 'usdc') {
        // Prüfen, ob die Adresse eine Ethereum-Adresse (0x) oder Tron-Adresse (T) ist
        if (address.startsWith('0x')) {
            url = `<a href="https://etherscan.io/address/${address}" target="_blank">Ethereum Explorer</a>`;
        } else if (address.startsWith('T')) {
            url = `<a href="https://tronscan.org/#/address/${address}" target="_blank">Tron Explorer</a>`;
        }
    } else if (crypto === 'andere') {
        // Adressvalidierung für andere Kryptowährungen
        if (address.startsWith('q') || address.startsWith('bitcoincash:')) {
            url = `<a href="https://blockchair.com/bitcoin-cash/address/${address}" target="_blank">Bitcoin Cash Explorer</a>`;
        } else if (address.startsWith('X')) {
            url = `<a href="https://blockchair.com/dash/address/${address}" target="_blank">Dash Explorer</a>`;
        } else if (address.startsWith('D')) {
            url = `<a href="https://blockchair.com/dogecoin/address/${address}" target="_blank">Dogecoin Explorer</a>`;
        } else if (address.startsWith('t1') || address.startsWith('t3')) {
            url = `<a href="https://blockchair.com/zcash/address/${address}" target="_blank">Zcash Explorer</a>`;
        } else if (address.startsWith('4')) {
            url = `<a href="https://xmrchain.net/" target="_blank">Monero Explorer</a>`;
        } else if (address.startsWith('addr1')) {
            url = `<a href="https://cardanoscan.io/address/${address}" target="_blank">Cardano Explorer</a>`;
        } else if (address.startsWith('1')) {
            url = `<a href="https://polkascan.io/polkadot/account/${address}" target="_blank">Polkadot Explorer</a>`;
        } else {
            url = 'Unbekannte Adresse';
        }
    }

    if (url) {
        document.getElementById(linkContainerId).innerHTML = url;
    } else {
        document.getElementById(linkContainerId).innerHTML = ''; // Clear the link if no valid URL
    }
}
