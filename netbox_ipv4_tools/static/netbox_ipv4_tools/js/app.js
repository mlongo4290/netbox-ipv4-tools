document.addEventListener("DOMContentLoaded", () => {
    let cidr_input = document.querySelector('#cidr');
    let btn_cidr_range = document.querySelector('#btn_cidr_range');
    let card_result = document.querySelector('#card-result');

    cidr_input.addEventListener("keypress", ev => {
        let keycode = (ev.keyCode ? ev.keyCode : ev.which);
        if (keycode == '13') {
            btn_cidr_range.trigger("click");
        }
    });

    btn_cidr_range.addEventListener("click", () => {
        card_result.classList.add("d-none");
        try
        {
            let cidr = ipaddr.parseCIDR(cidr_input["value"]);

            let prefix = cidr.toString();
            let prefix_length = cidr[1];

            let network = ipaddr.IPv4.networkAddressFromCIDR(prefix);
            let broadcast = ipaddr.IPv4.broadcastAddressFromCIDR(prefix);
            let mask = ipaddr.IPv4.subnetMaskFromPrefixLength(prefix_length);

            let wildcard = [];
            mask["octets"].forEach(b => {
                wildcard.push(255 - b);
            });
            wildcard = wildcard.join(".")

            let hosts = Math.pow(2,32-prefix_length) - 2;

            document.querySelector("#td-mask").innerHTML = mask.toString();
            document.querySelector("#td-wildcard").innerHTML= wildcard;
            document.querySelector("#td-network").innerHTML = network.toString();
            document.querySelector("#td-broadcast").innerHTML = broadcast.toString();
            document.querySelector("#td-hosts").innerHTML = hosts;
            card_result.classList.remove("d-none");
        }
        catch
        {
            
        }
    });
});