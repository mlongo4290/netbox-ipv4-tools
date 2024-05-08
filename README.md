## netbox-ipv4-tools

Work with ipv4 in NetBox.
This project includes code from [netmask](https://github.com/rs/node-netmask) (rewritten in Vanilla Javascript), which is licensed under the MIT license: [original license](https://github.com/rs/node-netmask/blob/master/LICENSE.md)

This plugin offers a place to retrieve
 - A table with the CIDR to netmask conversion, inluding the wildcard bits and the total hosts available per CIDR
 - A tool to convert a CIDR into an IP range including information such the usable host count, the netmask in decimal dotted format and the wildcard bits

## Install

The plugin is available as a Python package and can be installed with pip.

Run `pip install netbox-ipv4-tools` in your virtual env.

Create a file named `local_requirements.txt` (if not already existing) in the NetBox root directory (alongside `requirements.txt`) and list the `netbox-ipv4-tools` package:

```no-highlight
# echo netbox-ipv4-tools >> local_requirements.txt
```

Once installed, the plugin needs to be enabled in your `configuration.py`

```python
# In your configuration.py
PLUGINS = ["netbox_ipv4_tools"]
```

First run `source /opt/netbox/venv/bin/activate` to enter the Python virtual environment.


Then run 
```bash
cd /opt/netbox/netbox
pip3 install netbox-ipv4-tools
python3 manage.py collectstatic --no-input
```

### Versions
This plugin requires netbox >= 4.0.0

### Thanks
Thanks to [rs](https://github.com/rs) for the work on [netmask](https://github.com/rs/node-netmask)  
Thanks to [mattieserver](https://github.com/mattieserver) and his project [netbox-topology-view](https://github.com/mattieserver/netbox-topology-views). I used his work to get a working plugin and to publish it to pypi
