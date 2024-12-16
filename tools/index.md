---
nav: "tools"
---

<script src="../js/md5.js"></script>
<script>
    function encode() {
        $("#component_to_code").val(encodeURIComponent($("#component_to_code").val()));
        updateCount();
    }
    function decode() {
        $("#component_to_code").val(decodeURIComponent($("#component_to_code").val().replace(/\+/g, " ")));
        updateCount();
    }
    function base64encode() {
        $("#component_to_code").val(btoa($("#component_to_code").val()));
        updateCount();
    }
    function base64decode() {
        $("#component_to_code").val(atob($("#component_to_code").val()));
        updateCount();
    }

    async function hash(type) {
        if (type == "md5") {
            $("#component_to_code").val(MD5($("#component_to_code").val()));
        } else {
            const hash = await digestMessage($("#component_to_code").val(), type);
            $("#component_to_code").val(hash);
        }
        updateCount();
    }

    function updateCount() {
        $("#characterCount").val($("#component_to_code").val().length);
    }

    async function digestMessage(message, type) {
        const encoder = new TextEncoder();
        const data = encoder.encode(message);
        const hashBuffer = await window.crypto.subtle.digest(type, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");

        return hashHex;
    }
    $(document).ready(function () {
        $("#component_to_code").on("input", function () {
            $("#characterCount").val($("#component_to_code").val().length);
        }).trigger("input");
    });
</script>
<style>
    .no-resize {
        resize: none;
    }
</style>
<!-- Content -->
<div class="col-12" style="padding-top: 60px">
    <h5>Web Dev tools</h5>
    <p>
    Apply different encodings and hashes to a string. Type the string in
    the box below and hit the button for the action you'd like to
    perform on it. You can <code>URL</code> encode and decode,
    <code>Base64</code> encode and decode, hash to <code>MD5</code>,
    <code>SHA-1</code>, <code>SHA-256</code>, <code>SHA-384</code> &amp;
    <code>SHA-512</code>. All hashing is done locally on your browser.
    </p>
    <div class="form-group">
    <textarea
        id="component_to_code"
        cols="30"
        rows="10"
        class="form-control no-resize"
    ></textarea>
    </div>
    <div class="row">
    <div class="col-sm-9">
        <div class="form-group">
        <button class="btn btn-primary" onclick="encode()">
            URL Encode
        </button>
        <button class="btn btn-primary" onclick="decode()">
            URL Decode
        </button>
        <button class="btn btn-primary" onclick="base64encode()">
            Base64 Encode
        </button>
        <button class="btn btn-primary" onclick="base64decode()">
            Base64 Decode
        </button>
        <div class="btn-group">
            <button
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-expanded="false"
            >
            Hash
            </button>
            <div class="dropdown-menu">
            <button class="dropdown-item" onclick="hash('md5')">
                MD5
            </button>
            <button class="dropdown-item" onclick="hash('SHA-1')">
                SHA-1
            </button>
            <button class="dropdown-item" onclick="hash('SHA-256')">
                SHA-256
            </button>
            <button class="dropdown-item" onclick="hash('SHA-384')">
                SHA-384
            </button>
            <button class="dropdown-item" onclick="hash('SHA-512')">
                SHA-512
            </button>
            </div>
        </div>
        </div>
    </div>
    <div class="col-sm-3 row">
        <label for="characterCount" class="col-6 col-form-label"
        >Length</label
        >
        <div class="col-6">
        <input class="form-control" id="characterCount" />
        </div>
    </div>
    </div>
</div>
