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
        cidr_input.classList.remove("is-invalid");
        try
        {
            let cidr = new Netmask(cidr_input["value"]);

            document.querySelector("#td-mask").innerHTML = cidr.mask;
            document.querySelector("#td-wildcard").innerHTML= cidr.hostmask;
            document.querySelector("#td-network").innerHTML = cidr.base;
            document.querySelector("#td-broadcast").innerHTML = cidr.broadcast;
            document.querySelector("#td-first").innerHTML = cidr.first;
            document.querySelector("#td-last").innerHTML = cidr.last;
            document.querySelector("#td-size").innerHTML = cidr.size;
            card_result.classList.remove("d-none");
        }
        catch
        {
            cidr_input.classList.add("is-invalid");
        }
    });
});