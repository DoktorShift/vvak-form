// Funktion zum Anzeigen/Verbergen des "anderen" Feldes bei der Auswahl von "Andere"
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

// Funktion zum Aktualisieren des Labels für den gesendeten Betrag in der gewählten Kryptowährung
function updateCryptoLabel(waehrungSelectId, betragLabelId) {
    const waehrungSelect = document.getElementById(waehrungSelectId);
    const betragLabel = document.getElementById(betragLabelId);
    const selectedWaehrung = waehrungSelect.options[waehrungSelect.selectedIndex].text;

    betragLabel.textContent = selectedWaehrung;
}

// Event-Listener für das erste Dropdown-Menü für Kryptowährungen (wird erweitert bei neuen Transaktionen)
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('waehrung-1').addEventListener('change', function() {
        updateCryptoLabel('waehrung-1', 'crypto-label-1');
        toggleAndereWaehung(this, 'andere-kryptowaehrung-1');
    });

    document.getElementById('krypto-platform-1').addEventListener('change', function() {
        toggleAndereWaehung(this, 'andere-boerse-1');
    });
});

// Diese Funktion wird aufgerufen, wenn eine neue Transaktion hinzugefügt wird
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

        <!-- Weitere Abschnitte... -->
    `;
    document.getElementById('additional-tabs').appendChild(newTabContent);

    // Wechsle zum neuen Tab
    openTab({ currentTarget: newTabButton }, tabId);

    // Event-Listener für das neue Dropdown-Menü
    document.getElementById(`waehrung-${tabCounter}`).addEventListener('change', function() {
        updateCryptoLabel(`waehrung-${tabCounter}`, `crypto-label-${tabCounter}`);
        toggleAndereWaehung(this, `andere-kryptowaehrung-${tabCounter}`);
    });

    document.getElementById(`krypto-platform-${tabCounter}`).addEventListener('change', function() {
        toggleAndereWaehung(this, `andere-boerse-${tabCounter}`);
    });
}

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
