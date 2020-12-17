var lang = false;
var smil = false;
var symb = false;

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");
        this.elements.smileContainer = document.createElement("div");
        this.elements.symbolContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard-hidden");
        this.elements.keysContainer.classList.add("keyboard-keys");
        this.elements.smileContainer.classList.add("keyboard-hidden", "keyboard-smiles");
        this.elements.symbolContainer.classList.add("keyboard-hidden", "keyboard-symbols");
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.smileContainer.appendChild(this._createSmiles());
        this.elements.symbolContainer.appendChild(this._createSymbols());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard-key");
        this.elements.smiles = this.elements.smileContainer.querySelectorAll(".keyboard-smile");
        this.elements.symbols = this.elements.symbolContainer.querySelectorAll(".keyboard-symbol");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        this.elements.main.appendChild(this.elements.smileContainer);
        this.elements.main.appendChild(this.elements.symbolContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".keyboard-area").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createSmiles() {
        const fragment = document.createDocumentFragment();
        var smiles = [];

        smiles = [
            "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😈", "😉", "😊",
            "😌", "😙", "😚", "😛", "😨", "😩", "😪", "😋", "😘", "😧", "😶",
            "😍", "😎", "😏", "😐", "😑", "😒", "😓", "😔", "😕", "😖", "😗",
            "😜", "😝", "😞", "😟", "😠", "😡", "😢", "😣", "😤", "😥", "😦",
            "😫", "😬", "😭", "😮", "😯", "😰", "😱", "😲", "😳", "😴", "😵", 
            "😷", "😸", "😹", "😺", "😻", "😼", "😽", "😾", "🙀", "🙁", "🙂",
            "🙄", "🙅", "🙆", "🙇", "🙈", "🙉", "🙊", "🙋", "🙌", "🙍", "🙎"
        ];
        
        smiles.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["😊", "😶", "😗", "😦", "😵", "🙂"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-smile");

            keyElement.textContent = key.toLowerCase();

            keyElement.addEventListener("click", () => {
                this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                this._triggerEvent("oninput");
            });

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _createSymbols() {
        const fragment = document.createDocumentFragment();
        var smiles = [];

        smiles = [
            "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "№",
            ";", ":", "?", "(", ")", "_", "+", "-", "=", "/", ",",
            ".", "[", "]", "{", "}", "<", ">", "©", "®", "™", "‰",
            "π", "§", "°", "µ", "¶", "‾", "×", "÷", "±", "¬", "≈",
            "≠", "≡", "√", "∞", "∑", "∏", "∂", "∫", "∀", "€", "¢", 
            "£", "¤", "¥", "ƒ", "₽", "☃", "❄", "★", "⚝"
        ];
        
        smiles.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["№", ",", "‰", "≈", "¢"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-symbol");

            keyElement.textContent = key.toLowerCase();

            keyElement.addEventListener("click", () => {
                this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                this._triggerEvent("oninput");
            });

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();

        var keyLayout = [];

        if ( lang === false ) {
            keyLayout = [
                "~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete",
                "tab", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}", "|",
                "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Go",
                "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?", "done",
                "smile", "number-l", "language", "space", ".com", "number-r"
            ];
        } else if ( lang === true ) {
            keyLayout = [
                "ё", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "_", "+", "delete",
                "tab", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ", "/",
                "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "Go",
                "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ".", "done",
                "smile", "number-l", "language", "space", ".com", "number-r"
            ];
        }
        

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["delete", "|", "Go", "done", "/"].indexOf(key) !== -1;
            const keyElementSmall = ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "delete", "ё", "_", "+"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard-key");

            switch (key) {
                case "delete":
                    keyElement.classList.add("keyboard-key-wide", "button-right", "ignore");
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard-key-wide-center", "keyboard-key-no-active", "button-left", "ignore");
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard-key-active", this.properties.capsLock);
                    });

                    break;

                case "Go":
                    keyElement.classList.add("keyboard-key-wide-center", "button-right", "ignore");
                    keyElement.textContent = key;

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard-key-wide-extra");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "tab":
                    keyElement.classList.add("keyboard-key-wide", "button-left", "ignore");
                    keyElement.textContent = key.toLowerCase();
    
                    keyElement.addEventListener("click", () => {
                        this.properties.value += "   ";
                        this._triggerEvent("oninput");
                    });
    
                    break;

                case "done":
                    keyElement.classList.add("keyboard-key-wide-bottom", "button-right", "ignore");
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;

                case "shift":
                    keyElement.classList.add("keyboard-key-wide-bottom", "button-left", "ignore");
                    keyElement.textContent = key.toLowerCase();
    
                    keyElement.addEventListener("mousedown", () => {
                        this._toggleCapsLock();
                    });
                    keyElement.addEventListener("mouseup", () => {
                        this._toggleCapsLock();
                    });
    
                    break;  

                case "language":
                    keyElement.classList.add("keyboard-key-dark", "button-left");
                    keyElement.innerHTML = createIconHTML("language");
    
                    keyElement.addEventListener("click", () => {
                        lang === true? lang = false : lang = true;

                        this.elements.main.remove();
                        this.elements.keysContainer.remove();

                        Keyboard.init();
                        this.eventHandlers.oninput = oninput;
                        this.eventHandlers.onclose = onclose;
                        this.elements.main.classList.remove("keyboard-hidden");
                        this._triggerEvent("oninput");
                    });
    
                    break;    

                case "smile":
                    keyElement.classList.add("keyboard-key-dark", "button-left");
                    keyElement.innerHTML = createIconHTML("sentiment_satisfied_alt");

                    keyElement.addEventListener("click", () => {
                        switch (smil) {
                            case true:
                                this.elements.smileContainer.classList.add("keyboard-hidden");
                                smil = false;
                                break;
                            case false:
                                this.elements.smileContainer.classList.remove("keyboard-hidden");
                                smil = true;
                                break;
                        }
                        this.elements.symbolContainer.classList.add("keyboard-hidden");
                        symb = false;
                    });
        
                    break;    

                case "number-l":
                    keyElement.classList.add("keyboard-key-dark", "button-left", "ignore");
                    keyElement.textContent = ".?123";

                    keyElement.addEventListener("click", () => {
                        switch (symb) {
                            case true:
                                this.elements.symbolContainer.classList.add("keyboard-hidden");
                                symb = false;
                                break;
                            case false:
                                this.elements.symbolContainer.classList.remove("keyboard-hidden");
                                symb = true;
                                break;
                        }
                        this.elements.smileContainer.classList.add("keyboard-hidden");
                        smil = false;
                    });
            
                    break; 
                    
                case "number-r":
                    keyElement.classList.add("keyboard-key-dark", "button-right", "ignore");
                    keyElement.textContent = ".?123";

                    keyElement.addEventListener("click", () => {
                        switch (symb) {
                            case true:
                                this.elements.symbolContainer.classList.add("keyboard-hidden");
                                symb = false;
                                break;
                            case false:
                                this.elements.symbolContainer.classList.remove("keyboard-hidden");
                                symb = true;
                                break;
                        }
                        this.elements.smileContainer.classList.add("keyboard-hidden");
                        smil = false;
                    });
                
                    break;

                case ".com":
                    keyElement.classList.add("ignore");
                    keyElement.textContent = ".com";

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                    });
                    
                    break;
    
                    
                default:
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                        this.elements.smileContainer.classList.add("keyboard-hidden");
                        smil = false;
                        this.elements.symbolContainer.classList.add("keyboard-hidden");
                        symb = false;
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
            if (keyElementSmall) { 
                keyElement.classList.add("keyboard-key-small");
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                if(!key.classList.contains('ignore')) {
                    key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
                }
            }
        }
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard-hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard-hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
