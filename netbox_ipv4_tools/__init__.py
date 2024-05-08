from netbox.plugins import PluginConfig

class NetBoxIPV4ToolsConfig(PluginConfig):
    name = 'netbox_ipv4_tools'
    verbose_name = ' NetBox IPv4 Tools'
    description = 'Work with ipv4 in NetBox'
    version = '1.0.4'
    base_url = 'ipv4-tools'

config = NetBoxIPV4ToolsConfig