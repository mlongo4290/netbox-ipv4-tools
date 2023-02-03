const long2ip = long => {
    let a = (long & (0xff << 24)) >>> 24;
    let b = (long & (0xff << 16)) >>> 16;
    let c = (long & (0xff << 8)) >>> 8;
    let d = long & 0xff;
    return [a, b, c, d].join('.');
}

const ip2long = ip => {
    let b = [];
    for(let i in [0,1,2,3])
    {
        if(ip.length == 0)
            break;
        if(i > 0)
        {
            if(ip[0] != '.')
                throw new Error('Invalid IP');
            ip = ip.substring(1);
        }
        let [n, c] = atob(ip);
        ip = ip.substring(c);
        b.push(n);
    }

    if(ip.length != 0)
        throw new Error('Invalid IP');

    switch(b.length)
    {
        case 1:
            //Long input notation
            if(b[0] > 0xFFFFFFFF)
                throw new Error('Invalid IP');
            return b[0] >>> 0;
        case 2:
            //Class A notation
            if(b[0] > 0xFF || b[1] > 0xFFFFFF)
                throw new Error('Invalid IP');
            return (b[0] << 24 | b[1]) >>> 0;
        case 3:
            //Class B notation
            if(b[0] > 0xFF || b[1] > 0xFF || b[2] > 0xFFFF)
                throw new Error('Invalid IP');
            return (b[0] << 24 | b[1] << 16 | b[2]) >>> 0;
        case 4:
            //Dotted quad notation 
            if(b[0] > 0xFF || b[1] > 0xFF || b[2] > 0xFF || b[3] > 0xFF)
                throw new Error('Invalid IP');
            return (b[0] << 24 | b[1] << 16 | b[2] << 8 | b[3]) >>> 0;
        default:
            throw new Error('Invalid IP');
    }
}

const chr = b => {
    return b.charCodeAt(0);
}

const chr0 = chr('0');
const chra = chr('a');
const chrA = chr('A');

const atob = s => {
    let n = 0;
    let base = 10;
    let dmax = '9';
    let i = 0;
    if(s.length > 1 && s[i] == '0')
    {
        if(s[i+1] == 'x' || s[i+1] == 'X')
        {
            i += 2;
            base = 16;
        }
        else if('0' <= s[i+1] && s[i+1] <= '9')
        {
            i++;
            base = 8;
            dmax = '7';
        }
    }
    let start = i;
    while(i < s.length)
    {
        if('0' <= s[i] && s[i] <= dmax)
            n = (n*base + (chr(s[i])-chr0)) >>> 0;
        else if(base == 16)
        {
            if('a' <= s[i] && s[i] <= 'f')
                n = (n*base + (10+chr(s[i])-chra)) >>> 0;
            else if('A' <= s[i] && s[i] <= 'F')
                n = (n*base + (10+chr(s[i])-chrA)) >>> 0;
            else
                break;
        }
        else
            break;
        if(n > 0xFFFFFFFF)
            throw new Error('too large');
        i++;
    }
    if(i == start)
        throw new Error('empty octet');
    return [n, i];
}

class Netmask {
    constructor(net, mask) {
        if(typeof net != "string")
            throw new Error("Missing `net' parameter");
        if(!mask)
            //try to find the mask in the net (i.e.: 1.2.3.4/24 or 1.2.3.4/255.255.255.0)
            [net, mask] = net.split('/');
        if(!mask)
            mask = 32;
        if(typeof mask == 'string' && mask.indexOf('.') > -1)
        {
            //Compute bitmask, the netmask as a number of bits in the network portion of the address for this block (eg.: 24)
            try
            {
                this.maskLong = ip2long(mask);
            }
            catch(error)
            {
                throw new Error("Invalid mask: #{mask}");
            }
            for(let i = 32; i >= 0; i++)
            {
                if(this.maskLong == (0xffffffff << (32 - i)) >>> 0)
                {
                    this.bitmask = i;
                    break;
                }
            }
        }
        else if (mask || mask == 0)
        {
            //The mask was passed as bitmask, compute the mask as long from it
            this.bitmask = parseInt(mask, 10);
            this.maskLong = 0;
            if (this.bitmask > 0)
                this.maskLong = (0xffffffff << (32 - this.bitmask)) >>> 0;
        }
        else
            throw new Error("Invalid mask: empty");

        try
        {
            this.netLong = (ip2long(net) & this.maskLong) >>> 0;
        }
        catch(error)
        {
            throw new Error("Invalid net address: #{net}");
        }

        if(this.bitmask > 32)
        {
            throw new Error("Invalid mask for ip4: #{mask}");
        }

        //The number of IP address in the block (eg.: 254)
        this.size = Math.pow(2, 32 - this.bitmask);
        //The address of the network block as a string (eg.: 216.240.32.0)
        this.base = long2ip(this.netLong);
        //The netmask as a string (eg.: 255.255.255.0)
        this.mask = long2ip(this.maskLong);
        //The host mask, the opposite of the netmask (eg.: 0.0.0.255)
        this.hostmask = long2ip(~this.maskLong);
        //The first usable address of the block
        this.first = this.bitmask <= 30 ? long2ip(this.netLong + 1) : this.base;
        //The last  usable address of the block
        this.last = this.bitmask <= 30 ? long2ip(this.netLong + this.size - 2) : long2ip(this.netLong + this.size - 1);
        //The block's broadcast address: the last address of the block (eg.: 192.168.1.255)
        this.broadcast = this.bitmask <= 30 ? long2ip(this.netLong + this.size - 1) : "";
    }

    //Returns true if the given ip or netmask is contained in the block
    contains = ip => {
        if (typeof ip == 'string' && (ip.indexOf('/') > 0 || ip.split('.').length != 4))
            ip = new Netmask(ip);

        if (ip instanceof Netmask)
            return this.contains(ip.base) && this.contains((ip.broadcast || ip.last));
        else
            return (ip2long(ip) & this.maskLong) >>> 0 == (this.netLong & this.maskLong) >>> 0;
    }

    //Returns the Netmask object for the block which follow this one
    next = (count=1) =>{
        return new Netmask(long2ip(this.netLong + (this.size * count)), this.mask);
    }

    forEach = fn => {
        //this implementation is not idiomatic but avoids large memory allocations (2 arrays, one for range and one for the results) in cases when then netmask is large
        let long = ip2long(this.first);
        let lastLong = ip2long(this.last);
        let index = 0;
        while(long <= lastLong)
        {
            fn(long2ip(long), long, index);
            index++;
            long++;
        }
        return;
    }

    //Returns the complete netmask formatted as `base/bitmask`
    toString = () =>
    {
        return this.base + "/" + this.bitmask;
    }
}
//exports.ip2long = ip2long
//exports.long2ip = long2ip
//exports.Netmask = Netmask
