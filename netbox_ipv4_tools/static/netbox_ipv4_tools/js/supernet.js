document.addEventListener("DOMContentLoaded", () => {
    let cidr_input = document.querySelector('#cidr');
    let btn_cidr_supernet = document.querySelector('#btn_cidr_supernet');
    let card_result = document.querySelector('#card-result');

    btn_cidr_supernet.addEventListener("click", () => {
        card_result.classList.add("d-none");
        cidr_input.classList.remove("is-invalid");

        let supernet_binary = "";
        let supernet_length = 32;
        let cidrs = cidr_input["value"].split(/[\n,\s]+/g);
        cidrs.every(c => {
            c = c.trim();
            if(!c)
                return false;
            try
            {
                let cidr = new Netmask(c);
                let network = cidr.base.split(".").map(b => {return parseInt(b)});
                let binary_network = "";
                for(let i = 0; i < 4; i++)
                {
                    let b = network[i].toString(2);
                    b = "00000000".substr(b.length) + b;
                    binary_network += b;
                }

                if(supernet_binary.length == 0)
                {
                    supernet_binary = binary_network;
                }
                else
                {
                    let local_length = 0;
                    for(let i = 0; i < 32; i++)
                    {
                        
                        if(supernet_binary[i] != binary_network[i])
                        {
                            done = true;
                            break;
                        }

                        local_length++;
                    }

                    if(local_length < supernet_length)
                    {
                        supernet_length = local_length;
                    }
                }
                return true;
            }
            catch(error)
            {
                cidr_input.classList.add("is-invalid");
                return false;
            }
        });
        
        let supernet = ["", "", "", ""];
        let x = -1;
        for(let i = 0; i < 32; i++)
        {
            if(i%8 == 0)
            {
                x++;
            }
            if(i < supernet_length)
            {
                supernet[x] += supernet_binary[i];
            }
            else
            {
                supernet[x] += "0";
            }
        }
        
        for(let i = 0; i < 4; i++)
        {
            supernet[i] = parseInt(supernet[i], 2);
        }
        supernet = new Netmask(supernet.join(".") + "/" + supernet_length);
        document.querySelector("#td-address").innerHTML = supernet.toString();
        document.querySelector("#td-mask").innerHTML = supernet.mask;
        document.querySelector("#td-wildcard").innerHTML= supernet.hostmask;
        document.querySelector("#td-network").innerHTML = supernet.base;
        document.querySelector("#td-broadcast").innerHTML = supernet.broadcast;
        document.querySelector("#td-first").innerHTML = supernet.first;
        document.querySelector("#td-last").innerHTML = supernet.last;
        document.querySelector("#td-hosts").innerHTML = supernet.size;
        card_result.classList.remove("d-none");
    });
});