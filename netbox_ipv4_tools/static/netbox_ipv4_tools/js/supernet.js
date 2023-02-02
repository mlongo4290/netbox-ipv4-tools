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
                let cidr = ipaddr.parseCIDR(c);

                let prefix = cidr.toString();
                let prefix_length = cidr[1];
                let network = ipaddr.IPv4.networkAddressFromCIDR(prefix);

                let binary_network = "";
                for(let i = 0; i < 4; i++)
                {
                    let b = network["octets"][i].toString(2);
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
            catch
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
        let supernet_netmask = ipaddr.IPv4.subnetMaskFromPrefixLength(supernet_length);
        let wildcard = [];
        supernet_netmask["octets"].forEach(b => {
            wildcard.push(255 - b);
        });
        wildcard = wildcard.join(".");

        let hosts = Math.pow(2,32-supernet_length) - 2;

        document.querySelector("#td-address").innerHTML = supernet.join(".") + "/" + supernet_length;
        document.querySelector("#td-mask").innerHTML = supernet_netmask.toString();
        document.querySelector("#td-wildcard").innerHTML= wildcard;
        document.querySelector("#td-hosts").innerHTML = hosts;
        card_result.classList.remove("d-none");
    });
});